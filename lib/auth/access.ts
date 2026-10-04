// HMAC cookie helpers (docs/SPEC.md section 7). No database: a cookie is valid when it equals
// HMAC-SHA256(SESSION_SECRET, purpose), and the purpose includes the password, so changing a
// password invalidates every cookie issued with the old one.
import { createHmac, timingSafeEqual } from 'node:crypto';

export const ACCESS_COOKIE = 'fde_access';
export const ADMIN_COOKIE = 'fde_admin';
export const attemptCookieName = (attemptId: string) => `fde_att_${attemptId}`;

const DAY = 24 * 60 * 60;
export const ACCESS_MAX_AGE = 30 * DAY;
export const ADMIN_MAX_AGE = 8 * 60 * 60;

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error('SESSION_SECRET is missing or shorter than 32 characters.');
  return s;
}

export function hmac(message: string): string {
  return createHmac('sha256', secret()).update(message).digest('hex');
}

/** Timing-safe string comparison (length leaks nothing useful: all tokens are 64 hex chars). */
export function safeEqual(a: string | undefined | null, b: string): boolean {
  if (!a) return false;
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

/** Compares a typed password to the expected one without leaking timing, via their HMACs. */
export function passwordMatches(typed: string, expected: string | undefined): boolean {
  if (!expected) return false;
  return safeEqual(hmac(`pw:${typed}`), hmac(`pw:${expected}`));
}

export const accessToken = () => hmac(`site:${process.env.SITE_PASSWORD ?? ''}`);
export const adminToken = () => hmac(`admin:${process.env.ADMIN_PASSWORD ?? ''}`);
export const attemptToken = (attemptId: string) => hmac(`attempt:${attemptId}`);

export function hasAccess(cookie: string | undefined): boolean {
  return Boolean(process.env.SITE_PASSWORD) && safeEqual(cookie, accessToken());
}
export function isAdmin(cookie: string | undefined): boolean {
  return Boolean(process.env.ADMIN_PASSWORD) && safeEqual(cookie, adminToken());
}

export const cookieFlags = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge,
});
