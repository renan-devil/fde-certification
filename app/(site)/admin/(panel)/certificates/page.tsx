import type { Metadata } from 'next';
import Link from 'next/link';
import { listCertificates } from '@/lib/admin/queries';
import { sortRows } from '@/lib/admin/stats';
import { renameCertificate, resendCertificateEmail, restoreCertificate, revokeCertificate } from '@/lib/admin/actions';
import { trackName } from '@/lib/config/tracks';
import { certificateStatus } from '@/lib/certs/status';
import { emailEnabled } from '@/lib/env';
import { formatDate } from '@/lib/format';
import { SortHeader } from '@/components/SortHeader';

export const metadata: Metadata = { title: 'Certificates' };
type P = { q?: string; track?: string; sort?: string; dir?: string };

export default async function CertificatesPage({ searchParams }: { searchParams: Promise<P> }) {
  const params = await searchParams;
  const q = (params.q ?? '').toLowerCase();
  const rows = (await listCertificates()).map((c) => ({ ...c, status: certificateStatus(c).valid ? 'valid' : c.revokedAt ? 'revoked' : 'expired' }))
    .filter((c) => (!q || `${c.id} ${c.fullName} ${c.email} ${c.organization}`.toLowerCase().includes(q)) && (!params.track || c.trackId === params.track));
  const sorted = sortRows(rows, params.sort ?? 'issuedAt', params.sort ? params.dir : 'desc');
  const h = (col: string, label: string) => <SortHeader col={col} label={label} params={params} base="/admin/certificates" />;
  const email = emailEnabled();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-44">Certificates</h1>
        <a className="btn btn-secondary" href="/api/admin/export/certificates">Export CSV</a>
      </div>
      <form className="mt-4 flex flex-wrap items-end gap-3" method="get">
        <div><label className="label text-15" htmlFor="q">Search</label><input id="q" name="q" defaultValue={params.q} className="field" placeholder="Number, name, email" /></div>
        <div><label className="label text-15" htmlFor="track">Track</label>
          <select id="track" name="track" defaultValue={params.track ?? ''} className="field"><option value="">All</option><option value="exco">Exco</option><option value="manager">Manager</option><option value="fde">FDE</option><option value="test">Rehearsal</option></select></div>
        <button className="btn" type="submit">Filter</button>
        <Link href="/admin/certificates" className="link">Clear</Link>
      </form>
      <p className="mt-3 text-15 text-steel">{sorted.length} certificates</p>
      <div className="mt-2 overflow-x-auto">
        <table className="data text-15">
          <thead><tr>{h('id', 'Number')}{h('fullName', 'Name')}{h('organization', 'Organization')}{h('trackId', 'Track')}{h('issuedAt', 'Issued')}{h('expiresAt', 'Expires')}{h('status', 'Status')}<th>Actions</th></tr></thead>
          <tbody>
            {sorted.map((c) => (
              <tr key={c.id}>
                <td className="whitespace-nowrap font-mono text-13">{c.id}</td>
                <td>{c.fullName}<span className="block text-13 text-steel">{c.email}</span></td>
                <td>{c.organization}</td><td>{trackName(c.trackId)}</td>
                <td className="whitespace-nowrap">{formatDate(c.issuedAt)}</td><td className="whitespace-nowrap">{formatDate(c.expiresAt)}</td>
                <td className={c.status === 'valid' ? 'text-pass' : 'text-fail'}>{c.status}{c.revokedReason ? `: ${c.revokedReason}` : ''}</td>
                <td className="min-w-56 space-y-1">
                  <a className="link block" href={`/api/certificates/${c.id}/pdf`} target="_blank" rel="noopener">Download PDF</a>
                  {c.revokedAt ? (
                    <form action={restoreCertificate}><input type="hidden" name="id" value={c.id} /><button className="link" type="submit">Restore</button></form>
                  ) : (
                    <details><summary className="cursor-pointer">Revoke</summary>
                      <form action={revokeCertificate} className="mt-2 space-y-2"><input type="hidden" name="id" value={c.id} />
                        <input name="reason" required placeholder="Reason (required)" aria-label="Reason" className="field" />
                        <button className="btn btn-secondary" type="submit">Revoke</button></form>
                    </details>
                  )}
                  <details><summary className="cursor-pointer">Correct name</summary>
                    <form action={renameCertificate} className="mt-2 space-y-2"><input type="hidden" name="id" value={c.id} />
                      <input name="fullName" required defaultValue={c.fullName} aria-label="Name as printed" className="field" />
                      <button className="btn btn-secondary" type="submit">Save name</button></form>
                  </details>
                  {email && (
                    <form action={resendCertificateEmail}><input type="hidden" name="id" value={c.id} />
                      <button className="link" type="submit">Resend email</button>
                      {c.emailSentAt && <span className="block text-13 text-steel">Sent {formatDate(c.emailSentAt)}</span>}</form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
