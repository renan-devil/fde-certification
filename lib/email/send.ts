import 'server-only';
import { eq } from 'drizzle-orm';
import { emailEnabled } from '@/lib/env';
import { trackName } from '@/lib/config/tracks';
import { linkedInAddUrl, pdfUrl, verifyUrl } from '@/lib/certs/linkedin';
import { db, schema } from '@/lib/db/client';

type Cert = typeof schema.certificates.$inferSelect;

/** Sends one email through Resend's HTTP API. No-op (returns false) when email is not configured. */
export async function sendEmail(to: string, subject: string, text: string): Promise<boolean> {
  if (!emailEnabled()) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM,
      to: [to],
      subject,
      text,
      ...(process.env.EMAIL_REPLY_TO ? { reply_to: process.env.EMAIL_REPLY_TO } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend returned ${res.status}: ${await res.text()}`);
  return true;
}

export async function sendCertificateEmail(c: Cert): Promise<boolean> {
  const name = trackName(c.trackId);
  const text = [
    `Congratulations, ${c.fullName}: you passed ${name}.`,
    '',
    `Your certificate (PDF): ${pdfUrl(c.id)}`,
    `Verification link: ${verifyUrl(c.id)}`,
    `Add it to LinkedIn: ${linkedInAddUrl({ id: c.id, trackName: name, issuedAt: c.issuedAt, expiresAt: c.expiresAt })}`,
    '',
    process.env.EMAIL_REPLY_TO ? `Questions? Reply to this email or write to ${process.env.EMAIL_REPLY_TO}.` : 'Questions? Reply to this email.',
    '',
    'FDE School, by Devoteam and OSS Ventures',
  ].join('\n');
  const sent = await sendEmail(c.email, `Your FDE School certificate: ${name}`, text);
  if (sent) await db().update(schema.certificates).set({ emailSentAt: new Date() }).where(eq(schema.certificates.id, c.id));
  return sent;
}
