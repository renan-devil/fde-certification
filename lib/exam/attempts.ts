import 'server-only';
import { and, desc, eq, gt, inArray, sql } from 'drizzle-orm';
import { db, schema, type Tx } from '@/lib/db/client';
import { getTrack, trackName, type Track } from '@/lib/config/tracks';
import { bankVersion, getQuestion, servedQuestions } from '@/lib/bank/load';
import type { OptionId } from '@/lib/bank/schema';
import { draw } from './draw';
import { score } from './score';
import { newCertificateId } from '@/lib/certs/id';
import { sendCertificateEmail } from '@/lib/email/send';

const { attempts, attemptItems, certificates } = schema;
export type Attempt = typeof attempts.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;

export const GRACE_MS = 30_000;

export const ORGANIZATION_TYPES = [
  { id: 'devoteam', label: 'Devoteam' },
  { id: 'oss', label: 'OSS Ventures' },
  { id: 'portfolio', label: 'OSS portfolio company' },
  { id: 'client', label: 'Client company' },
  { id: 'other', label: 'Other' },
] as const;

export const normalizeEmail = (e: string) => e.trim().toLowerCase();

export type StartInput = {
  trackId: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  organizationType: string;
};

export type StartOutcome =
  | { kind: 'started' | 'resume'; attemptId: string }
  | { kind: 'certified'; certId: string }
  | { kind: 'running_elsewhere' }
  | { kind: 'cooldown'; until: Date }
  | { kind: 'closed' };

/** Start checks in the order of docs/SPEC.md section 8, then an atomic insert. */
export async function startAttempt(input: StartInput, holdsCookie: (attemptId: string) => boolean): Promise<StartOutcome> {
  const track = getTrack(input.trackId);
  if (!track) return { kind: 'closed' };
  const email = normalizeEmail(input.email);

  // Lazy expiry first, so an abandoned attempt never blocks its owner.
  const previous = await db().select().from(attempts)
    .where(and(eq(attempts.email, email), eq(attempts.trackId, track.id)))
    .orderBy(desc(attempts.startedAt));
  for (const a of previous) if (a.status === 'in_progress') await finalizeIfDue(a);

  // 1. A valid certificate already exists.
  const [cert] = await db().select().from(certificates)
    .where(and(eq(certificates.email, email), eq(certificates.trackId, track.id),
      sql`${certificates.revokedAt} is null`, gt(certificates.expiresAt, new Date())))
    .limit(1);
  if (cert) return { kind: 'certified', certId: cert.id };

  const fresh = await db().select().from(attempts)
    .where(and(eq(attempts.email, email), eq(attempts.trackId, track.id)))
    .orderBy(desc(attempts.startedAt));

  // 2. An attempt is in progress.
  const running = fresh.find((a) => a.status === 'in_progress');
  if (running) return holdsCookie(running.id) ? { kind: 'resume', attemptId: running.id } : { kind: 'running_elsewhere' };

  // 3. Cooldown after a failed attempt (voided attempts do not count).
  const lastFinished = fresh.find((a) => (a.status === 'submitted' || a.status === 'expired') && a.finishedAt);
  if (lastFinished && lastFinished.passed === false && track.cooldownHours > 0) {
    const until = new Date(lastFinished.finishedAt!.getTime() + track.cooldownHours * 3600_000);
    if (until > new Date()) return { kind: 'cooldown', until };
  }

  // 4. The bank must fill the blueprint.
  const drawn = draw(track, servedQuestions());
  if (!drawn.ok) {
    await db().insert(schema.bankGaps).values({ trackId: track.id, detail: drawn.missing.join('; ') });
    return { kind: 'closed' };
  }

  const now = new Date();
  const attemptId = await db().transaction(async (tx) => {
    const [row] = await tx.insert(attempts).values({
      trackId: track.id,
      email,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      organization: input.organization.trim(),
      organizationType: input.organizationType,
      startedAt: now,
      deadlineAt: new Date(now.getTime() + track.durationMinutes * 60_000),
      totalCount: drawn.items.length,
      bankVersion: bankVersion(),
    }).returning({ id: attempts.id });
    await tx.insert(attemptItems).values(drawn.items.map((it, i) => ({
      attemptId: row.id, position: i + 1, questionId: it.questionId, optionOrder: it.optionOrder,
    })));
    return row.id;
  });
  return { kind: 'started', attemptId };
}

export async function getAttempt(attemptId: string): Promise<Attempt | undefined> {
  if (!/^[0-9a-f-]{36}$/i.test(attemptId)) return undefined;
  const [a] = await db().select().from(attempts).where(eq(attempts.id, attemptId));
  return a;
}

/** Reads an attempt, finalizing it first when its deadline plus grace has passed. */
export async function getAttemptFresh(attemptId: string): Promise<Attempt | undefined> {
  const a = await getAttempt(attemptId);
  if (a && a.status === 'in_progress' && (await finalizeIfDue(a))) return getAttempt(attemptId);
  return a;
}

export function isPastGrace(a: Pick<Attempt, 'deadlineAt'>, now = new Date()): boolean {
  return now.getTime() > a.deadlineAt.getTime() + GRACE_MS;
}

/** Lazy expiry. Returns true when the attempt was finalized by this call. */
export async function finalizeIfDue(a: Attempt): Promise<boolean> {
  if (a.status !== 'in_progress' || !isPastGrace(a)) return false;
  return finalize(a.id, 'expired');
}

/** Finalizes all overdue attempts (used by admin pages before listing). */
export async function finalizeOverdue(): Promise<void> {
  const overdue = await db().select().from(attempts)
    .where(and(eq(attempts.status, 'in_progress'), sql`${attempts.deadlineAt} < now() - interval '30 seconds'`));
  for (const a of overdue) await finalize(a.id, 'expired');
}

/**
 * Marks items, scores, sets the status and issues the certificate on a pass. Idempotent: the
 * attempt row is locked and only an in-progress attempt is finalized. Returns true when it acted.
 */
export async function finalize(attemptId: string, how: 'submitted' | 'expired'): Promise<boolean> {
  const issued = await db().transaction(async (tx) => {
    const [a] = await tx.select().from(attempts).where(eq(attempts.id, attemptId)).for('update');
    if (!a || a.status !== 'in_progress') return null;
    const track = getTrack(a.trackId) ?? fallbackTrack(a.trackId);
    const items = await tx.select().from(attemptItems).where(eq(attemptItems.attemptId, attemptId)).orderBy(attemptItems.position);
    const result = score(items.map((it) => {
      const q = getQuestion(it.questionId);
      return { domain: q?.domain ?? it.questionId.slice(0, 3), selected: it.selectedOptionId, answer: q?.answer ?? '?' };
    }), track.passMark);

    const correctIds = items.filter((_, i) => result.marks[i]).map((it) => it.questionId);
    await tx.update(attemptItems).set({ isCorrect: correctIds.length ? inArray(attemptItems.questionId, correctIds) : sql`false` })
      .where(eq(attemptItems.attemptId, attemptId));
    const now = new Date();
    await tx.update(attempts).set({
      status: how,
      finishedAt: now,
      correctCount: result.correct,
      scorePct: result.scorePct.toFixed(2),
      passed: result.passed,
      domainScores: result.domainScores,
    }).where(eq(attempts.id, attemptId));

    if (!result.passed) return { cert: null };
    const cert = await issueCertificate(tx, a, track, result.scorePct, now);
    return { cert };
  });
  if (!issued) return false;
  if (issued.cert) await sendCertificateEmail(issued.cert).catch((e) => console.error('certificate email failed', e));
  return true;
}

function fallbackTrack(trackId: string): Track {
  // A track that was disabled after the attempt started (e.g. the rehearsal track): score at 100% pass mark, never certify.
  return { id: trackId, name: trackName(trackId), certPrefix: 'X', audience: '', scope: '', durationMinutes: 0,
    questionCount: 0, passMark: 1.01, cooldownHours: 0, validityMonths: 0,
    blueprint: { GAI: [0,0,0], LLM: [0,0,0], ONT: [0,0,0], DAT: [0,0,0], VAL: [0,0,0], DEP: [0,0,0], CHG: [0,0,0], OPS: [0,0,0], RSK: [0,0,0] } };
}

export function addMonths(d: Date, months: number): Date {
  const r = new Date(d);
  r.setUTCMonth(r.getUTCMonth() + months);
  return r;
}

async function issueCertificate(tx: Tx, a: Attempt, track: Track, scorePct: number, now: Date): Promise<Certificate> {
  for (let i = 0; i < 5; i++) {
    const id = newCertificateId(track.certPrefix, now.getUTCFullYear());
    const rows = await tx.insert(certificates).values({
      id, attemptId: a.id, trackId: track.id, email: a.email,
      fullName: `${a.firstName} ${a.lastName}`.trim(), organization: a.organization,
      scorePct: scorePct.toFixed(2), issuedAt: now, expiresAt: addMonths(now, track.validityMonths),
    }).onConflictDoNothing({ target: certificates.id }).returning();
    if (rows[0]) return rows[0];
  }
  throw new Error('Could not generate a unique certificate number');
}

export type SaveResult = { ok: true } | { ok: false; reason: 'closed' | 'unknown_question' };

export async function saveAnswer(attemptId: string, questionId: string, optionId: OptionId | null, flagged: boolean): Promise<SaveResult> {
  const a = await getAttempt(attemptId);
  if (!a || a.status !== 'in_progress' || isPastGrace(a)) return { ok: false, reason: 'closed' };
  const res = await db().update(attemptItems)
    .set({ selectedOptionId: optionId, flagged, answeredAt: new Date() })
    .where(and(eq(attemptItems.attemptId, attemptId), eq(attemptItems.questionId, questionId)))
    .returning({ q: attemptItems.questionId });
  return res.length ? { ok: true } : { ok: false, reason: 'unknown_question' };
}

export type AnswerMap = Record<string, { o: OptionId | null; f: boolean }>;

/** Upserts the full answer map (only within deadline plus grace), then finalizes. */
export async function submitAttempt(attemptId: string, answers: AnswerMap): Promise<void> {
  const a = await getAttempt(attemptId);
  if (!a || a.status !== 'in_progress') return;
  if (!isPastGrace(a)) {
    const items = await db().select().from(attemptItems).where(eq(attemptItems.attemptId, attemptId));
    const now = new Date();
    for (const it of items) {
      const ans = answers[it.questionId];
      if (!ans) continue;
      if (ans.o === it.selectedOptionId && ans.f === it.flagged) continue;
      await db().update(attemptItems).set({ selectedOptionId: ans.o, flagged: ans.f, answeredAt: now })
        .where(and(eq(attemptItems.attemptId, attemptId), eq(attemptItems.questionId, it.questionId)));
    }
  }
  await finalize(attemptId, isPastGrace(a) ? 'expired' : 'submitted');
}

export async function reportFocusLoss(attemptId: string): Promise<void> {
  await db().update(attempts).set({ focusLostCount: sql`${attempts.focusLostCount} + 1` })
    .where(and(eq(attempts.id, attemptId), eq(attempts.status, 'in_progress')));
}

/** What the runner may see: no answers, no explanations. */
export type RunnerQuestion = { id: string; stem: string; options: { id: OptionId; text: string }[] };

export async function runnerData(a: Attempt) {
  const items = await db().select().from(attemptItems).where(eq(attemptItems.attemptId, a.id)).orderBy(attemptItems.position);
  const questions: RunnerQuestion[] = items.map((it) => {
    const q = getQuestion(it.questionId);
    return {
      id: it.questionId,
      stem: q?.stem ?? 'This question is no longer available.',
      options: (it.optionOrder as OptionId[]).map((o) => ({ id: o, text: q?.options[o] ?? '' })),
    };
  });
  const answers: AnswerMap = {};
  for (const it of items) answers[it.questionId] = { o: (it.selectedOptionId as OptionId | null) ?? null, f: it.flagged };
  return { questions, answers };
}

export async function certificateForAttempt(attemptId: string): Promise<Certificate | undefined> {
  const [c] = await db().select().from(certificates).where(eq(certificates.attemptId, attemptId));
  return c;
}

export async function getCertificate(id: string): Promise<Certificate | undefined> {
  const [c] = await db().select().from(certificates).where(eq(certificates.id, id));
  return c;
}

/** In-progress attempts on a track held by this browser (for "resume your exam"). */
export async function inProgressAttemptsAmong(ids: string[], trackId: string): Promise<Attempt[]> {
  if (!ids.length) return [];
  const rows = await db().select().from(attempts)
    .where(and(inArray(attempts.id, ids), eq(attempts.trackId, trackId), eq(attempts.status, 'in_progress')));
  const live: Attempt[] = [];
  for (const a of rows) if (!(await finalizeIfDue(a))) live.push(a);
  return live;
}
