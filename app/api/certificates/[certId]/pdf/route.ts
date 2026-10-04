import { getCertificate } from '@/lib/exam/attempts';
import { renderCertificatePdf } from '@/lib/certs/pdf';
import { getTrack, TEST_TRACK, TRACKS } from '@/lib/config/tracks';
import { normalizeCertificateId } from '@/lib/certs/id';
import { formatDate } from '@/lib/format';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ certId: string }> }) {
  const id = normalizeCertificateId((await params).certId);
  const cert = id ? await getCertificate(id) : undefined;
  if (!cert) return new Response('No certificate has this number.', { status: 404 });
  if (cert.revokedAt) {
    return new Response(`This certificate was revoked on ${formatDate(cert.revokedAt)} and is no longer valid.`, { status: 410 });
  }
  const track = getTrack(cert.trackId) ?? [...Object.values(TRACKS), TEST_TRACK].find((t) => t.id === cert.trackId);
  const pdf = await renderCertificatePdf({
    id: cert.id, fullName: cert.fullName, organization: cert.organization,
    trackName: track?.name ?? cert.trackId, scope: track?.scope ?? '',
    issuedAt: cert.issuedAt, expiresAt: cert.expiresAt,
  });
  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="FDE-School-${cert.id}.pdf"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
