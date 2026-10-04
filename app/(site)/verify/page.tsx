import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { normalizeCertificateId } from '@/lib/certs/id';

export const metadata: Metadata = { title: 'Verify a certificate' };

async function lookup(form: FormData) {
  'use server';
  const raw = String(form.get('number') ?? '');
  const id = normalizeCertificateId(raw);
  redirect(`/verify/${encodeURIComponent(id ?? (raw.trim().toUpperCase() || 'unknown'))}`);
}

export default function VerifyPage() {
  return (
    <div>
      <h1 className="display text-44">Verify a certificate</h1>
      <p className="prose-width mt-3">Enter the number printed on the certificate to check that it is genuine and still valid.</p>
      <form action={lookup} className="mt-6 flex max-w-lg flex-wrap items-end gap-3">
        <div className="min-w-60 flex-1">
          <label htmlFor="number" className="label">Certificate number</label>
          <input id="number" name="number" required placeholder="FDE-2026-7K2Q9-XWM3P" autoCapitalize="characters" spellCheck={false} className="field font-mono" />
        </div>
        <button type="submit" className="btn">Check</button>
      </form>
    </div>
  );
}
