// A test-wise solver that knows nothing about the domain: it guesses from surface cues only
// (longest option, words repeated from the stem, absolute words in the other options).
// Items it answers correctly with a clear margin are flagged for rewriting (docs/SPEC.md section 17).
import { OPTION_IDS, type OptionId, type Question } from './schema';
import { normalizeStem } from './check';

const ABSOLUTE = /\b(always|never|all|every|only|completely|entirely|guarantee[sd]?|any|none|no one|nothing)\b/i;
const STOP = new Set('the a an of to in on for and or is are be with by your you it its that this what which when how why from as at than more most'.split(' '));

const words = (s: string) => new Set(normalizeStem(s).split(' ').filter((w) => w.length > 3 && !STOP.has(w)));

export function testwiseGuess(q: Question): { guess: OptionId | null; score: number; cues: string[] } {
  const stem = words(q.stem);
  const scores: Record<OptionId, number> = { a: 0, b: 0, c: 0, d: 0 };
  const why: Record<OptionId, string[]> = { a: [], b: [], c: [], d: [] };
  const lens = OPTION_IDS.map((o) => q.options[o].length);
  const maxLen = Math.max(...lens);
  if (lens.filter((l) => l === maxLen).length === 1 && !q.keepOrder) {
    const o = OPTION_IDS[lens.indexOf(maxLen)];
    if (maxLen >= 1.25 * ([...lens].sort((x, y) => y - x)[1])) { scores[o] += 2; why[o].push('clearly the longest'); }
    else { scores[o] += 1; why[o].push('longest'); }
  }
  const overlap = OPTION_IDS.map((o) => [...words(q.options[o])].filter((w) => stem.has(w)).length);
  const maxOv = Math.max(...overlap);
  if (maxOv > 0 && overlap.filter((v) => v === maxOv).length === 1) {
    const o = OPTION_IDS[overlap.indexOf(maxOv)];
    scores[o] += 1; why[o].push('repeats stem words');
  }
  const abs = OPTION_IDS.filter((o) => ABSOLUTE.test(q.options[o]));
  if (abs.length === 3) {
    const o = OPTION_IDS.find((x) => !abs.includes(x))!;
    scores[o] += 1; why[o].push('only option without absolute words');
  }
  const best = Math.max(...OPTION_IDS.map((o) => scores[o]));
  const leaders = OPTION_IDS.filter((o) => scores[o] === best);
  if (best < 2 || leaders.length > 1) return { guess: null, score: best, cues: [] };
  return { guess: leaders[0], score: best, cues: why[leaders[0]] };
}
