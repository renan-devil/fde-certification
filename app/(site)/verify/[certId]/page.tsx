import type { Metadata } from 'next';
import Link from 'next/link';
import { cache } from 'react';
import { getCertificate } from '@/lib/exam/attempts';
import { normalizeCertificateId } from '@/lib/certs/id';
import { certificateStatus } from '@/lib/certs/status';
import { linkedInAddUrl } from '@/lib/certs/linkedin';
import { TEST_TRACK, TRACKS } from '@/lib/config/tracks';
import { formatDate } from '@/lib/format';

const load = cache(async (raw: string) => {
  const id = normalizeCertificateId(decodeURIComponent(raw));
  return id ? getCertificate(id) : undefined;
});
const trackOf = (id: string) => [...Object.values(TRACKS), TEST_TRACK].find((t) => t.id === id);

export async function generateMetadata({ params }: { params: Promise<{ certId: string }> }): Promise<Metadata> {
  const c = await load((await params).certId);
  if (!c) return { title: 'Certificate not found' };
  const title = `${c.fullName}: ${trackOf(c.trackId)?.name ?? c.trackId}`;
  return { title, description: 'Verified certificate of the FDE School, by Devoteam and OSS Ventures.', openGraph: { title, description: 'Verified certificate' } };
}

export default async function CertificatePage({ params }: { params: Promise<{ certId: string }> }) {
  const raw = (await params).certId;
  const c = await load(raw);
  if (!c) {
    return (
      <div>
        <h1 className="display text-44">Certificate not found</h1>
        <p className="mt-3">No certificate has this number. Check for typos: numbers look like <span className="font-mono">FDE-2026-7K2Q9-XWM3P</span>.</p>
        <Link href="/verify" className="link mt-4 inline-block">Try another number</Link>
      </div>
    );
  }
  const track = trackOf(c.trackId);
  const status = certificateStatus(c);
  const rows: [string, React.ReactNode][] = [
    ['Holder', c.fullName],
    ['Organization', c.organization],
    ['Track', track?.name ?? c.trackId],
    ['What it covers', track?.scope ? track.scope.charAt(0).toUpperCase() + track.scope.slice(1) + '.' : ''],
    ['Issued', formatDate(c.issuedAt)],
    ['Valid until', formatDate(c.expiresAt)],
    ['Certificate number', <span key="n" className="font-mono">{c.id}</span>],
  ];
  return (
    <div>
      <p className={`display text-34 ${status.valid ? 'text-pass' : 'text-fail'}`}>{status.text}</p>
      <h1 className="mt-2 text-27 font-semibold">{c.fullName}</h1>
      <dl className="mt-6 max-w-2xl border-t border-ink">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 border-b border-gauge py-3 sm:grid-cols-[200px_1fr]">
            <dt className="text-steel">{k}</dt><dd>{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-15 text-steel">Issued by the FDE School, by Devoteam and OSS Ventures. OSS Ventures maintains the certification standard.</p>
      {status.valid && (
        <div className="mt-6 flex flex-wrap gap-3">
          <a className="btn btn-secondary" href={`/api/certificates/${c.id}/pdf`} target="_blank" rel="noopener">View the PDF</a>
          <a className="btn btn-secondary" target="_blank" rel="noopener noreferrer"
            href={linkedInAddUrl({ id: c.id, trackName: track?.name ?? c.trackId, issuedAt: c.issuedAt, expiresAt: c.expiresAt })}>Add to LinkedIn</a>
        </div>
      )}
    </div>
  );
}
