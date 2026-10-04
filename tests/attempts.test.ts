// Database tests: run against a local Postgres (DATABASE_URL), skipped when none is set.
import { beforeAll, describe, expect, it } from 'vitest';
import { eq } from 'drizzle-orm';

const hasDb = Boolean(process.env.DATABASE_URL);
process.env.BANK_SERVE = 'all';
process.env.ENABLE_TEST_TRACK = 'true';

describe.skipIf(!hasDb)('attempt lifecycle (database)', async () => {
  const { db, schema } = await import('@/lib/db/client');
  const A = await import('@/lib/exam/attempts');
  const email = `unit-${Date.now()}@example.com`;
  const base = { trackId: 'test', email, firstName: 'Hélène', lastName: 'Dupré', organization: 'Polymex Industries', organizationType: 'client' };
  let attemptId = '';

  beforeAll(async () => {
    const r = await A.startAttempt(base, () => false);
    expect(r.kind).toBe('started');
    if (r.kind === 'started') attemptId = r.attemptId;
  });

  it('a second start from another browser is refused, the same browser resumes', async () => {
    expect((await A.startAttempt(base, () => false)).kind).toBe('running_elsewhere');
    expect((await A.startAttempt(base, (id) => id === attemptId)).kind).toBe('resume');
  });

  it('saves only questions of the attempt', async () => {
    const { questions } = await A.runnerData((await A.getAttempt(attemptId))!);
    expect(questions).toHaveLength(5);
    expect(JSON.stringify(questions)).not.toMatch(/"answer"|explanation/);
    expect(await A.saveAnswer(attemptId, questions[0].id, 'a', false)).toEqual({ ok: true });
    expect((await A.saveAnswer(attemptId, 'GAI-9-999', 'a', false)).ok).toBe(false);
  });

  it('refuses saves after the deadline plus grace, then lazy expiry finalizes as expired, idempotently', async () => {
    await db().update(schema.attempts).set({ deadlineAt: new Date(Date.now() - 31_000) }).where(eq(schema.attempts.id, attemptId));
    const { questions } = await A.runnerData((await A.getAttempt(attemptId))!);
    expect(await A.saveAnswer(attemptId, questions[1].id, 'b', false)).toEqual({ ok: false, reason: 'closed' });
    const a = await A.getAttemptFresh(attemptId);
    expect(a?.status).toBe('expired');
    expect(a?.correctCount).not.toBeNull();
    const before = JSON.stringify(a);
    expect(await A.finalize(attemptId, 'submitted')).toBe(false);
    expect(JSON.stringify(await A.getAttempt(attemptId))).toBe(before);
  });

  it('a pass issues exactly one certificate and blocks new attempts', async () => {
    const e2 = `pass-${Date.now()}@example.com`;
    const r = await A.startAttempt({ ...base, email: e2 }, () => false);
    if (r.kind !== 'started') throw new Error(r.kind);
    const { getQuestion } = await import('@/lib/bank/load');
    const { questions } = await A.runnerData((await A.getAttempt(r.attemptId))!);
    const answers = Object.fromEntries(questions.map((q) => [q.id, { o: getQuestion(q.id)!.answer, f: false }]));
    await A.submitAttempt(r.attemptId, answers);
    await A.submitAttempt(r.attemptId, answers);
    const a = await A.getAttempt(r.attemptId);
    expect(a?.status).toBe('submitted');
    expect(a?.passed).toBe(true);
    const certs = await db().select().from(schema.certificates).where(eq(schema.certificates.attemptId, r.attemptId));
    expect(certs).toHaveLength(1);
    expect(certs[0].id).toMatch(/^TEST-\d{4}-/);
    expect((await A.startAttempt({ ...base, email: e2 }, () => false)).kind).toBe('certified');
  });
});
