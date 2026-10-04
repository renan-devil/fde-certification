import { randomInt } from 'node:crypto';

/** Picks k items without replacement (partial Fisher-Yates with crypto.randomInt). */
export function sample<T>(items: readonly T[], k: number): T[] {
  const a = [...items];
  const n = Math.min(k, a.length);
  for (let i = 0; i < n; i++) {
    const j = randomInt(i, a.length);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

export function shuffle<T>(items: readonly T[]): T[] {
  return sample(items, items.length);
}
