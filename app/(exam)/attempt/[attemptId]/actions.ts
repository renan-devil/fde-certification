'use server';
import { z } from 'zod';
import { holdsAttempt } from '@/lib/exam/guard';
import { reportFocusLoss, saveAnswer, submitAttempt, type AnswerMap } from '@/lib/exam/attempts';

const opt = z.enum(['a', 'b', 'c', 'd']).nullable();

export async function saveAnswerAction(attemptId: string, questionId: string, optionId: string | null, flagged: boolean) {
  if (!(await holdsAttempt(attemptId))) return { ok: false as const, reason: 'forbidden' as const };
  const o = opt.safeParse(optionId);
  if (!o.success) return { ok: false as const, reason: 'invalid' as const };
  return saveAnswer(attemptId, String(questionId), o.data, Boolean(flagged));
}

const answersSchema = z.record(z.string(), z.object({ o: opt, f: z.boolean() }));

export async function submitAction(attemptId: string, answers: AnswerMap) {
  if (!(await holdsAttempt(attemptId))) return { ok: false as const };
  const parsed = answersSchema.safeParse(answers);
  await submitAttempt(attemptId, parsed.success ? parsed.data : {});
  return { ok: true as const };
}

export async function focusLossAction(attemptId: string) {
  if (await holdsAttempt(attemptId)) await reportFocusLoss(attemptId);
}
