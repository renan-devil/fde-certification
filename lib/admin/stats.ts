// Pure helpers for admin statistics (unit-tested).

export type QuestionStat = { questionId: string; served: number; correct: number; lastServed: Date | null };
export type QuestionFlag = 'too_hard' | 'too_easy' | null;

export const FLAG_MIN_SERVED = 10;

/** Once served 10+ times: below 25% correct, check the key or wording; above 95%, too easy for its tier. */
export function questionFlag(s: Pick<QuestionStat, 'served' | 'correct'>): QuestionFlag {
  if (s.served < FLAG_MIN_SERVED) return null;
  const rate = s.correct / s.served;
  if (rate < 0.25) return 'too_hard';
  if (rate > 0.95) return 'too_easy';
  return null;
}

export const FLAG_TEXT: Record<Exclude<QuestionFlag, null>, string> = {
  too_hard: 'Check the answer key or the wording',
  too_easy: 'Too easy for its tier',
};

export function median(xs: number[]): number | null {
  if (!xs.length) return null;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

/** CSV with a UTF-8 BOM so Excel shows accents. */
export function toCsv(rows: (string | number | boolean | null | undefined | Date)[][]): string {
  const cell = (v: unknown) => {
    if (v === null || v === undefined) return '';
    const s = v instanceof Date ? v.toISOString() : String(v);
    return /[",\n\r;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return '﻿' + rows.map((r) => r.map(cell).join(',')).join('\r\n') + '\r\n';
}

type Sortable = Record<string, unknown>;
/** Sorts rows by a key, nulls last. */
export function sortRows<T extends Sortable>(rows: T[], key: string | undefined, dir: string | undefined): T[] {
  if (!key) return rows;
  const sign = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => {
    const x = a[key], y = b[key];
    if (x == null && y == null) return 0;
    if (x == null) return 1;
    if (y == null) return -1;
    const xv = x instanceof Date ? x.getTime() : typeof x === 'string' && !isNaN(Number(x)) && x !== '' ? Number(x) : x;
    const yv = y instanceof Date ? y.getTime() : typeof y === 'string' && !isNaN(Number(y)) && y !== '' ? Number(y) : y;
    return (xv as number) < (yv as number) ? -sign : (xv as number) > (yv as number) ? sign : 0;
  });
}
