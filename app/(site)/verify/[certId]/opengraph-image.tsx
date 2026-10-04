import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { getCertificate } from '@/lib/exam/attempts';
import { normalizeCertificateId } from '@/lib/certs/id';
import { TEST_TRACK, TRACKS } from '@/lib/config/tracks';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Verified certificate of the FDE School';

export default async function Image({ params }: { params: Promise<{ certId: string }> }) {
  const id = normalizeCertificateId(decodeURIComponent((await params).certId));
  const c = id ? await getCertificate(id) : undefined;
  const track = c && [...Object.values(TRACKS), TEST_TRACK].find((t) => t.id === c.trackId);
  const fonts = path.join(process.cwd(), 'assets', 'fonts');
  const logo = (f: string) => `data:image/png;base64,${readFileSync(path.join(process.cwd(), 'public', 'logos', f)).toString('base64')}`;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: 'Archivo' }}>
        <div style={{ height: 150, background: '#141313', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 64px' }}>
          <img src={logo('oss-ventures-on-dark.png')} height={56} width={Math.round(56 * 1600 / 381)} alt="" />
          <img src={logo('devoteam-on-dark.png')} height={44} width={Math.round(44 * 1600 / 472)} alt="" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '56px 64px' }}>
          <div style={{ fontSize: 30, color: c && !c.revokedAt ? '#1E7B4E' : '#B3261E' }}>{c && !c.revokedAt ? 'Verified certificate' : 'Certificate not valid'}</div>
          <div style={{ fontFamily: 'Archivo Condensed', fontSize: 92, color: '#141313', marginTop: 12 }}>{track?.name ?? 'FDE School'}</div>
          <div style={{ fontSize: 44, color: '#141313', marginTop: 8 }}>{c?.fullName ?? ''}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Archivo', data: readFileSync(path.join(fonts, 'Archivo-SemiBold.ttf')), weight: 600 },
        { name: 'Archivo Condensed', data: readFileSync(path.join(fonts, 'Archivo-CondensedBold.ttf')), weight: 700 },
      ],
    },
  );
}
