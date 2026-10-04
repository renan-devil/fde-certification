'use server';
import { eq, inArray, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from './guard';
import { db, schema } from '@/lib/db/client';
import { sendCertificateEmail } from '@/lib/email/send';
import { normalizeEmail } from '@/lib/exam/attempts';

const { attempts, attemptItems, certificates, certificateLookups, humans } = schema;

export async function voidAttempt(form: FormData) {
  await requireAdmin();
  const id = String(form.get('id'));
  const reason = String(form.get('reason') ?? '').trim() || 'Voided by an admin';
  // A voided attempt with a certificate keeps the certificate unless an admin revokes it.
  await db().update(attempts).set({ status: 'voided', voidReason: reason, finishedAt: new Date() }).where(eq(attempts.id, id));
  revalidatePath('/admin/attempts');
}

export async function revokeCertificate(form: FormData) {
  await requireAdmin();
  const reason = String(form.get('reason') ?? '').trim();
  if (!reason) return;
  await db().update(certificates).set({ revokedAt: new Date(), revokedReason: reason }).where(eq(certificates.id, String(form.get('id'))));
  revalidatePath('/admin/certificates');
}

export async function restoreCertificate(form: FormData) {
  await requireAdmin();
  await db().update(certificates).set({ revokedAt: null, revokedReason: null }).where(eq(certificates.id, String(form.get('id'))));
  revalidatePath('/admin/certificates');
}

export async function renameCertificate(form: FormData) {
  await requireAdmin();
  const name = String(form.get('fullName') ?? '').trim();
  if (!name) return;
  await db().update(certificates).set({ fullName: name }).where(eq(certificates.id, String(form.get('id'))));
  revalidatePath('/admin/certificates');
}

export async function resendCertificateEmail(form: FormData) {
  await requireAdmin();
  const [c] = await db().select().from(certificates).where(eq(certificates.id, String(form.get('id'))));
  if (c) await sendCertificateEmail(c).catch((e) => console.error('resend failed', e));
  revalidatePath('/admin/certificates');
}

async function deleteByEmails(where: ReturnType<typeof eq> | ReturnType<typeof like>) {
  const rows = await db().select({ id: attempts.id }).from(attempts).where(where);
  const ids = rows.map((r) => r.id);
  await db().transaction(async (tx) => {
    if (ids.length) {
      await tx.delete(certificates).where(inArray(certificates.attemptId, ids));
      await tx.delete(attemptItems).where(inArray(attemptItems.attemptId, ids));
      await tx.delete(attempts).where(inArray(attempts.id, ids));
    }
  });
  return ids.length;
}

export async function deleteTestData() {
  await requireAdmin();
  const n = await deleteByEmails(like(attempts.email, '%@example.com'));
  await db().delete(certificates).where(like(certificates.email, '%@example.com'));
  revalidatePath('/admin', 'layout');
  return n;
}

export async function deleteEverythingForEmail(form: FormData) {
  await requireAdmin();
  const email = normalizeEmail(String(form.get('email') ?? ''));
  if (!email || String(form.get('confirm') ?? '') !== email) return;
  await deleteByEmails(eq(attempts.email, email));
  await db().delete(certificates).where(eq(certificates.email, email));
  await db().delete(certificateLookups).where(eq(certificateLookups.email, email));
  await db().delete(humans).where(eq(humans.email, email));
  revalidatePath('/admin', 'layout');
}


export async function setHumanHidden(form: FormData) {
  await requireAdmin();
  await db().update(humans).set({ hidden: form.get('hidden') === 'true' }).where(eq(humans.id, String(form.get('id'))));
  revalidatePath('/admin/humans');
  revalidatePath('/humans');
}

export async function deleteHumanAdmin(form: FormData) {
  await requireAdmin();
  await db().delete(humans).where(eq(humans.id, String(form.get('id'))));
  revalidatePath('/admin/humans');
  revalidatePath('/humans');
}
