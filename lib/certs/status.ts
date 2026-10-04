import { formatDate } from '@/lib/format';

type C = { revokedAt: Date | null; expiresAt: Date };

export function certificateStatus(c: C, now = new Date()): { valid: boolean; text: string } {
  if (c.revokedAt) return { valid: false, text: `This certificate was revoked on ${formatDate(c.revokedAt)}` };
  if (c.expiresAt <= now) return { valid: false, text: `This certificate expired on ${formatDate(c.expiresAt)}` };
  return { valid: true, text: 'Valid certificate' };
}
