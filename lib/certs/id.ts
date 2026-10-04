import { randomInt } from 'node:crypto';

// Crockford base32: no I, L, O or U.
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function chunk(): string {
  let s = '';
  for (let i = 0; i < 5; i++) s += ALPHABET[randomInt(ALPHABET.length)];
  return s;
}

/** <certPrefix>-<year>-<5 chars>-<5 chars>, e.g. FDE-2026-7K2Q9-XWM3P. */
export function newCertificateId(prefix: string, year: number): string {
  return `${prefix}-${year}-${chunk()}-${chunk()}`;
}

/** Normalizes typed input: uppercase, spaces and dashes ignored, then dashes re-inserted. */
export function normalizeCertificateId(input: string): string | null {
  const s = input.toUpperCase().replace(/[\s-]/g, '');
  const m = s.match(/^([A-Z]+?)(\d{4})([0-9A-Z]{5})([0-9A-Z]{5})$/);
  if (!m) return null;
  return `${m[1]}-${m[2]}-${m[3]}-${m[4]}`;
}
