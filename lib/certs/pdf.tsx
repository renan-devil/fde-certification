import 'server-only';
import path from 'node:path';
import { readFileSync } from 'node:fs';
import React from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer';
import QRCode from 'qrcode';
import { SITE } from '@/lib/config/site';
import { formatDate } from '@/lib/format';
import { verifyUrl } from './linkedin';

const FONTS = path.join(process.cwd(), 'assets', 'fonts');
const LOGOS = path.join(process.cwd(), 'public', 'logos');
let registered = false;

function register() {
  if (registered) return;
  Font.register({ family: 'Archivo', fonts: [
    { src: path.join(FONTS, 'Archivo-Regular.ttf'), fontWeight: 400 },
    { src: path.join(FONTS, 'Archivo-SemiBold.ttf'), fontWeight: 600 },
    { src: path.join(FONTS, 'Archivo-Bold.ttf'), fontWeight: 700 },
  ] });
  Font.register({ family: 'Archivo Condensed', src: path.join(FONTS, 'Archivo-CondensedBold.ttf'), fontWeight: 700 });
  Font.register({ family: 'Plex Mono', src: path.join(FONTS, 'IBMPlexMono-Medium.ttf'), fontWeight: 500 });
  Font.registerHyphenationCallback((w) => [w]);
  registered = true;
}

const dataUri = (file: string) => `data:image/png;base64,${readFileSync(path.join(LOGOS, file)).toString('base64')}`;

const INK = '#141313', STEEL = '#5B6470';
// A4 landscape: 842 × 595 pt.
const s = StyleSheet.create({
  page: { fontFamily: 'Archivo', color: INK, fontSize: 10, backgroundColor: '#FFFFFF' },
  band: { height: 119, backgroundColor: INK, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 48 },
  body: { flexDirection: 'row', paddingHorizontal: 48, paddingTop: 34, flexGrow: 1 },
  left: { width: 430 },
  small: { fontSize: 10, color: STEEL },
  track: { fontFamily: 'Archivo Condensed', fontWeight: 700, fontSize: 46, lineHeight: 1.05, marginTop: 6, marginBottom: 18 },
  name: { fontSize: 24, fontWeight: 600, marginTop: 4 },
  org: { fontSize: 13, color: STEEL, marginTop: 4 },
  sentence: { fontSize: 11, lineHeight: 1.5, marginTop: 18, width: 400 },
  footer: { position: 'absolute', bottom: 22, left: 48, right: 48, fontSize: 8.5, color: STEEL },
  sigs: { position: 'absolute', bottom: 52, left: 48, flexDirection: 'row' },
  sig: { width: 190, marginRight: 24, borderTopWidth: 0.75, borderTopColor: INK, paddingTop: 6 },
  block: { position: 'absolute', right: 48, bottom: 52, width: 300, borderWidth: 1, borderColor: INK, flexDirection: 'row' },
  cells: { flexGrow: 1 },
  cell: { borderBottomWidth: 1, borderBottomColor: INK, paddingHorizontal: 8, paddingVertical: 5 },
  cellLast: { paddingHorizontal: 8, paddingVertical: 5 },
  label: { fontSize: 7.5, color: STEEL },
  value: { fontSize: 10, marginTop: 1 },
  qr: { width: 104, borderLeftWidth: 1, borderLeftColor: INK, alignItems: 'center', justifyContent: 'center', padding: 6 },
});

export type PdfCert = { id: string; fullName: string; organization: string; trackName: string; scope: string; issuedAt: Date; expiresAt: Date };

function Certificate({ c, qr }: { c: PdfCert; qr: string }) {
  const url = verifyUrl(c.id);
  return (
    <Document title={`FDE School certificate ${c.id}`} author="FDE School">
      <Page size="A4" orientation="landscape" style={s.page}>
        <View style={s.band}>
          <Image src={dataUri('oss-ventures-on-dark.png')} style={{ height: 40, width: 40 * (1600 / 381) }} />
          <Image src={dataUri('devoteam-on-dark.png')} style={{ height: 32, width: 32 * (1600 / 472) }} />
        </View>
        <View style={s.body}>
          <View style={s.left}>
            <Text style={s.small}>Certificate</Text>
            <Text style={s.track}>{c.trackName}</Text>
            <Text style={s.small}>Awarded to</Text>
            <Text style={s.name}>{c.fullName}</Text>
            <Text style={s.org}>{c.organization}</Text>
            <Text style={s.sentence}>For passing the {c.trackName} examination of the FDE School, which tests {c.scope}.</Text>
          </View>
        </View>
        <View style={s.sigs}>
          {SITE.signatories.map((p) => (
            <View key={p.name} style={s.sig}>
              <Text style={{ fontSize: 10, fontWeight: 600 }}>{p.name}</Text>
              <Text style={{ fontSize: 8.5, color: STEEL, marginTop: 2 }}>{p.title}</Text>
            </View>
          ))}
        </View>
        <View style={s.block}>
          <View style={s.cells}>
            <View style={s.cell}><Text style={s.label}>Certificate number</Text><Text style={[s.value, { fontFamily: 'Plex Mono' }]}>{c.id}</Text></View>
            <View style={s.cell}><Text style={s.label}>Issued</Text><Text style={s.value}>{formatDate(c.issuedAt)}</Text></View>
            <View style={s.cell}><Text style={s.label}>Valid until</Text><Text style={s.value}>{formatDate(c.expiresAt)}</Text></View>
            <View style={s.cellLast}><Text style={s.label}>Verify at</Text><Text style={[s.value, { fontSize: 7.5 }]}>{url}</Text></View>
          </View>
          <View style={s.qr}><Image src={qr} style={{ width: 90, height: 90 }} /></View>
        </View>
        <Text style={s.footer}>{SITE.footerLine}</Text>
      </Page>
    </Document>
  );
}

export async function renderCertificatePdf(c: PdfCert): Promise<Buffer> {
  register();
  const qr = await QRCode.toDataURL(verifyUrl(c.id), { margin: 0, width: 360, color: { dark: INK, light: '#FFFFFF' } });
  return renderToBuffer(<Certificate c={c} qr={qr} />);
}
