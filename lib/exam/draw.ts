// Stratified random draw (docs/SPEC.md section 9). Pure apart from the random source.
import { DOMAINS, type Track } from '@/lib/config/tracks';
import { OPTION_IDS, type OptionId, type Question } from '@/lib/bank/schema';
import { sample, shuffle } from './random';

export type DrawnItem = { questionId: string; optionOrder: OptionId[] };
export type DrawResult = { ok: true; items: DrawnItem[] } | { ok: false; missing: string[] };

export function draw(track: Track, served: Question[]): DrawResult {
  const picked: Question[] = [];
  const missing: string[] = [];
  for (const d of DOMAINS) {
    for (const tier of [1, 2, 3] as const) {
      const n = track.blueprint[d][tier - 1];
      if (n <= 0) continue;
      const pool = served.filter((q) => q.domain === d && q.tier === tier);
      if (pool.length < n) {
        missing.push(`${d} tier ${tier}: ${pool.length} served, ${n} needed`);
        continue;
      }
      picked.push(...sample(pool, n));
    }
  }
  if (missing.length) return { ok: false, missing };
  return {
    ok: true,
    items: shuffle(picked).map((q) => ({
      questionId: q.id,
      optionOrder: q.keepOrder ? [...OPTION_IDS] : shuffle(OPTION_IDS),
    })),
  };
}
