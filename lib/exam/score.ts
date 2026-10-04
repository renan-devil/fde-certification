// Scoring (docs/SPEC.md section 9): one point per correct answer, no negative marking.
import { passThreshold } from '@/lib/config/tracks';
import type { DomainScores } from '@/lib/db/schema';

export type ScoredItem = { domain: string; selected: string | null; answer: string };

export function score(items: ScoredItem[], passMark: number) {
  const domainScores: DomainScores = {};
  let correct = 0;
  const marks = items.map((it) => {
    const ok = it.selected !== null && it.selected === it.answer;
    if (ok) correct++;
    const d = (domainScores[it.domain] ??= { correct: 0, total: 0 });
    d.total++;
    if (ok) d.correct++;
    return ok;
  });
  const total = items.length;
  const passed = correct >= passThreshold(passMark, total);
  const scorePct = total ? Math.round((correct / total) * 10000) / 100 : 0;
  return { correct, total, passed, scorePct, domainScores, marks };
}
