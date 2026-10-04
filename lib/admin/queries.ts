import 'server-only';
import { desc, sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { finalizeOverdue } from '@/lib/exam/attempts';
import type { QuestionStat } from './stats';

export async function listAttempts() {
  await finalizeOverdue();
  return db().select().from(schema.attempts).orderBy(desc(schema.attempts.startedAt));
}

export async function listCertificates() {
  return db().select().from(schema.certificates).orderBy(desc(schema.certificates.issuedAt));
}

/** Times served, correct and last served per question, over finished, non-voided attempts. */
export async function questionStats(): Promise<QuestionStat[]> {
  await finalizeOverdue();
  const rows = await db().execute<{ question_id: string; served: string; correct: string; last_served: Date | string | null }>(sql`
    select i.question_id, count(*) as served, count(*) filter (where i.is_correct) as correct, max(a.started_at) as last_served
    from attempt_items i join attempts a on a.id = i.attempt_id
    where a.status in ('submitted', 'expired')
    group by i.question_id`);
  return rows.rows.map((r) => ({
    questionId: r.question_id, served: Number(r.served), correct: Number(r.correct),
    lastServed: r.last_served ? new Date(r.last_served) : null,
  }));
}

export async function recentBankGaps() {
  return db().select().from(schema.bankGaps).orderBy(desc(schema.bankGaps.at)).limit(20);
}
