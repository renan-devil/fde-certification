import 'server-only';
import { createHash } from 'node:crypto';
import { questionSchema, type Question } from './schema';
import GAI from '@/content/questions/GAI.json';
import LLM from '@/content/questions/LLM.json';
import ONT from '@/content/questions/ONT.json';
import DAT from '@/content/questions/DAT.json';
import VAL from '@/content/questions/VAL.json';
import DEP from '@/content/questions/DEP.json';
import CHG from '@/content/questions/CHG.json';
import OPS from '@/content/questions/OPS.json';
import RSK from '@/content/questions/RSK.json';

let all: Question[] | null = null;
let byId: Map<string, Question> | null = null;

/** Every item in the bank, retired ones included (past attempts reference them). */
export function allQuestions(): Question[] {
  if (!all) {
    all = [GAI, LLM, ONT, DAT, VAL, DEP, CHG, OPS, RSK].flat().map((q) => questionSchema.parse(q));
    byId = new Map(all.map((q) => [q.id, q]));
  }
  return all;
}

export function getQuestion(id: string): Question | undefined {
  allQuestions();
  return byId!.get(id);
}

export function serveAll(): boolean {
  return process.env.BANK_SERVE === 'all';
}

/** Items that can be drawn: validated ones, or every non-retired one when BANK_SERVE=all. */
export function servedQuestions(): Question[] {
  const everything = serveAll();
  return allQuestions().filter((q) => q.status === 'validated' || (everything && q.status === 'draft'));
}

/** First 12 hex characters of a SHA-256 of the served items. */
export function bankVersion(): string {
  const served = [...servedQuestions()].sort((a, b) => a.id.localeCompare(b.id));
  return createHash('sha256').update(JSON.stringify(served)).digest('hex').slice(0, 12);
}
