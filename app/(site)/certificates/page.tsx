import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { and, eq, gt, sql } from 'drizzle-orm';
import { emailEnabled } from '@/lib/env';
import { db, schema } from '@/lib/db/client';
import { normalizeEmail } from '@/lib/exam/attempts';
import { sendEmail } from '@/lib/email/send';
import { pdfUrl, verifyUrl } from '@/lib/certs/linkedin';
import { trackName } from '@/lib/config/tracks';

export const metadata: Metadata = { title: 'Find my certificates' };
export const dynamic = 'force-dynamic';

async function request(form: FormData) {
  'use server';
  if (!emailEnabled()) return;
  const email = normalizeEmail(String(form.get('email') ?? ''));
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
  const { certificateLookups: l, certificates: c } = schema;
  const [{ n }] = await db().select({ n: sql<number>`count(*)::int` }).from(l)
    .where(and(eq(l.email, email), gt(l.requestedAt, new Date(Date.now() - 3600_000))));
  if (n >= 3) return;
  await db().insert(l).values({ email });
  const certs = await db().select().from(c).where(and(eq(c.email, email), sql`${c.revokedAt} is null`));
  if (!certs.length) return;
  const lines = certs.map((x) => `${trackName(x.trackId)} (${x.id})\n  PDF: ${pdfUrl(x.id)}\n  Verification: ${verifyUrl(x.id)}`);
  await sendEmail(email, 'Your FDE School certificates', `Here are your FDE School certificates.\n\n${lines.join('\n\n')}\n\nFDE School, by Devoteam and OSS Ventures`)
    .catch((e) => console.error('lookup email failed', e));
}

async function submit(form: FormData) {
  'use server';
  await request(form);
  const { redirect } = await import('next/navigation');
  redirect('/certificates?sent=1');
}

export default async function FindCertificates({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
  if (!emailEnabled()) notFound();
  const { sent } = await searchParams;
  return (
    <div>
      <h1 className="display text-44">Find my certificates</h1>
      <p className="prose-width mt-3">Enter the email you used for the exam. We&apos;ll email you links to your certificates.</p>
      <form action={submit} className="mt-6 flex max-w-lg flex-wrap items-end gap-3">
        <div className="min-w-60 flex-1"><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="field" /></div>
        <button className="btn" type="submit">Email my certificates</button>
      </form>
      {sent && <p role="status" className="mt-4">If certificates exist for this address, we&apos;ve emailed links to them.</p>}
    </div>
  );
}
