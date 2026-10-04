import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const QUESTIONS_DIR = path.join(process.cwd(), 'content', 'questions');

/** Reads every content/questions/*.json file, keyed by file name. */
export function readBankFiles(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of readdirSync(QUESTIONS_DIR).filter((f) => f.endsWith('.json')).sort()) {
    try {
      out[f] = JSON.parse(readFileSync(path.join(QUESTIONS_DIR, f), 'utf8'));
    } catch (e) {
      out[f] = `invalid JSON: ${(e as Error).message}`;
    }
  }
  return out;
}
