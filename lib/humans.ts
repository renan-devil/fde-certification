import 'server-only';
import { createHash, randomBytes } from 'node:crypto';
import { cookies } from 'next/headers';
import { and, asc, eq, gt, inArray, sql } from 'drizzle-orm';
import { z } from 'zod';
import { db, schema } from '@/lib/db/client';
import { ADMIN_COOKIE, cookieFlags, hmac, isAdmin, safeEqual } from '@/lib/auth/access';
import { normalizeEmail } from '@/lib/exam/attempts';
import { PUBLIC_TRACKS } from '@/lib/config/tracks';

const { humans, certificates } = schema;
export type Human = typeof humans.$inferSelect;

// Self-declared role in the FDE community. Certification is never self-declared: it comes from certificates.
export const COMMUNITY_ROLES = [
  { id: 'fde', label: 'Forward Deployed Engineer' },
  { id: 'fde_candidate', label: 'FDE School participant' },
  { id: 'manager', label: 'Manager running AI deployments' },
  { id: 'executive', label: 'Executive sponsor' },
  { id: 'trainer', label: 'Trainer' },
  { id: 'mentor', label: 'Mentor' },
  { id: 'other', label: 'Other' },
] as const;
export const fullName = (h: { firstName: string; lastName: string }) => `${h.firstName} ${h.lastName}`.trim();
export const roleLabel = (id: string) => COMMUNITY_ROLES.find((r) => r.id === id)?.label ?? id;

export const MAX_PHOTO_BYTES = 300_000;

export const humanSchema = z.object({
  firstName: z.string().trim().min(1, 'Enter your first name.').max(80),
  lastName: z.string().trim().max(80).default(''),
  organization: z.string().trim().min(1, 'Enter your organization.').max(120),
  communityRole: z.enum(COMMUNITY_ROLES.map((r) => r.id) as [string, ...string[]], { message: 'Choose your role.' }),
  bio: z.string().trim().max(400, 'Keep the description under 400 characters.').default(''),
  linkedinUrl: z.string().trim().max(300).refine((u) => u === '' || /^https:\/\/([a-z]+\.)?linkedin\.com\//i.test(u), 'Use a LinkedIn address starting with https://www.linkedin.com/').default(''),
  email: z.string().trim().email('Enter a valid email address.').max(200),
});

/** Decodes a data:image/jpeg|png|webp;base64 URL; null when empty, throws when invalid or too big. */
export function decodePhoto(dataUrl: string): { bytes: Buffer; type: string } | null {
  if (!dataUrl) return null;
  const m = dataUrl.match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!m) throw new Error('The picture must be a JPEG, PNG or WebP image.');
  const bytes = Buffer.from(m[2], 'base64');
  if (bytes.length > MAX_PHOTO_BYTES) throw new Error('The picture is too large. Try a smaller one.');
  return { bytes, type: m[1] };
}

function slugify(first: string, last: string): string {
  const base = `${first} ${last}`.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'member';
  return `${base}-${randomBytes(2).toString('hex')}`;
}

const tokenHash = (t: string) => createHash('sha256').update(t).digest('hex');
export const humanCookieName = (id: string) => `fde_hum_${id}`;
const humanCookieValue = (id: string) => hmac(`human:${id}`);

/** True when this browser created the profile, holds its private edit link, or is signed in as admin. */
export async function canEdit(h: Human, token?: string | null): Promise<boolean> {
  if (token && safeEqual(tokenHash(token), h.editTokenHash)) return true;
  const jar = await cookies();
  if (isAdmin(jar.get(ADMIN_COOKIE)?.value)) return true;
  return safeEqual(jar.get(humanCookieName(h.id))?.value, humanCookieValue(h.id));
}

export async function rememberEditor(id: string) {
  (await cookies()).set(humanCookieName(id), humanCookieValue(id), cookieFlags(365 * 24 * 3600));
}

export async function createHuman(data: z.infer<typeof humanSchema>, photo: { bytes: Buffer; type: string } | null) {
  const token = randomBytes(24).toString('hex');
  const [row] = await db().insert(humans).values({
    slug: slugify(data.firstName, data.lastName),
    firstName: data.firstName, lastName: data.lastName, organization: data.organization,
    communityRole: data.communityRole, bio: data.bio, linkedinUrl: data.linkedinUrl || null,
    email: normalizeEmail(data.email), photo: photo?.bytes ?? null, photoType: photo?.type ?? null,
    editTokenHash: tokenHash(token),
  }).returning();
  await rememberEditor(row.id);
  return { human: row, token };
}

export async function updateHuman(id: string, data: z.infer<typeof humanSchema>, photo: { bytes: Buffer; type: string } | null | 'keep' | 'remove') {
  await db().update(humans).set({
    firstName: data.firstName, lastName: data.lastName, organization: data.organization,
    communityRole: data.communityRole, bio: data.bio, linkedinUrl: data.linkedinUrl || null,
    email: normalizeEmail(data.email), updatedAt: new Date(),
    ...(photo === 'keep' ? {} : photo === 'remove' || photo === null ? { photo: null, photoType: null } : { photo: photo.bytes, photoType: photo.type }),
  }).where(eq(humans.id, id));
}

export async function deleteHuman(id: string) {
  await db().delete(humans).where(eq(humans.id, id));
}

/** Visible profiles, newest first, without photos (served separately). */
export async function listHumans(includeHidden = false) {
  const rows = await db().select({
    id: humans.id, slug: humans.slug, firstName: humans.firstName, lastName: humans.lastName,
    organization: humans.organization, communityRole: humans.communityRole, hasPhoto: sql<boolean>`${humans.photo} is not null`,
    email: humans.email, hidden: humans.hidden, createdAt: humans.createdAt,
  }).from(humans).where(includeHidden ? undefined : eq(humans.hidden, false)).orderBy(asc(humans.lastName), asc(humans.firstName));
  return rows;
}

export async function getHumanBySlug(slug: string): Promise<Human | undefined> {
  const [h] = await db().select().from(humans).where(eq(humans.slug, slug));
  return h;
}

export type Certification = { id: string; trackId: string; trackName: string };

/** Valid certificates issued to the profile's email: this is what "certified" means on a profile. */
export async function certificationsByEmail(emails: string[]): Promise<Map<string, Certification[]>> {
  const out = new Map<string, Certification[]>();
  if (!emails.length) return out;
  const rows = await db().select({ id: certificates.id, trackId: certificates.trackId, email: certificates.email }).from(certificates)
    .where(and(inArray(certificates.email, emails), sql`${certificates.revokedAt} is null`, gt(certificates.expiresAt, new Date())));
  const order = PUBLIC_TRACKS.map((t) => t.id);
  for (const r of rows) {
    const t = PUBLIC_TRACKS.find((x) => x.id === r.trackId);
    if (!t) continue; // rehearsal certificates do not count
    const list = out.get(r.email) ?? [];
    list.push({ id: r.id, trackId: r.trackId, trackName: t.name });
    list.sort((a, b) => order.indexOf(b.trackId) - order.indexOf(a.trackId));
    out.set(r.email, list);
  }
  return out;
}
