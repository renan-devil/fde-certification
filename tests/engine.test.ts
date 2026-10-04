import { describe, expect, it } from 'vitest';
import { DOMAINS, PUBLIC_TRACKS, TEST_TRACK, TRACKS, blueprintSum, passThreshold } from '@/lib/config/tracks';
import { draw } from '@/lib/exam/draw';
import { score } from '@/lib/exam/score';
import type { Question } from '@/lib/bank/schema';
import { newCertificateId, normalizeCertificateId } from '@/lib/certs/id';
import { questionFlag, toCsv, median } from '@/lib/admin/stats';

function fakeBank(perCell: number, status: Question['status'] = 'validated'): Question[] {
  const out: Question[] = [];
  for (const d of DOMAINS) for (const tier of [1, 2, 3] as const) for (let i = 1; i <= perCell; i++) {
    out.push({ id: `${d}-${tier}-${String(i).padStart(3, '0')}`, domain: d, tier, stem: 'Stem text here', options: { a: 'A', b: 'B', c: 'C', d: 'D' },
      answer: 'a', explanation: 'Because of reasons.', source: 'Day 1', keepOrder: i % 5 === 0, status, author: 'test', reviewedBy: null });
  }
  return out;
}

describe('tracks', () => {
  it('every blueprint sums to its question count', () => {
    for (const t of [...PUBLIC_TRACKS, TEST_TRACK]) expect(blueprintSum(t)).toBe(t.questionCount);
  });
  it('pass thresholds are integers', () => {
    expect(passThreshold(0.7, 60)).toBe(42);
    expect(passThreshold(0.7, 120)).toBe(84);
    expect(passThreshold(0.75, 240)).toBe(180);
    expect(passThreshold(0.6, 5)).toBe(3);
  });
});

describe('draw', () => {
  const bank = fakeBank(50);
  for (const t of PUBLIC_TRACKS) {
    it(`${t.id}: exact blueprint counts, no duplicates, valid option orders`, () => {
      const r = draw(t, bank);
      if (!r.ok) throw new Error('draw refused');
      expect(r.items).toHaveLength(t.questionCount);
      expect(new Set(r.items.map((i) => i.questionId)).size).toBe(t.questionCount);
      for (const d of DOMAINS) for (const tier of [1, 2, 3]) {
        const n = r.items.filter((i) => i.questionId.startsWith(`${d}-${tier}-`)).length;
        expect(n).toBe(t.blueprint[d][tier - 1]);
      }
      for (const it of r.items) {
        expect([...it.optionOrder].sort()).toEqual(['a', 'b', 'c', 'd']);
        const q = bank.find((x) => x.id === it.questionId)!;
        if (q.keepOrder) expect(it.optionOrder).toEqual(['a', 'b', 'c', 'd']);
      }
    });
  }
  it('only draws served items (the caller filters) and refuses when a pool is too small', () => {
    const small = fakeBank(3);
    const r = draw(TRACKS.exco, small);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.missing.some((m) => m.startsWith('GAI tier 1'))).toBe(true);
    const r2 = draw(TRACKS.exco, []);
    expect(r2.ok).toBe(false);
  });
  it('shuffles: two draws differ', () => {
    const a = draw(TRACKS.fde, fakeBank(50)), b = draw(TRACKS.fde, fakeBank(50));
    if (!a.ok || !b.ok) throw new Error();
    expect(a.items.map((i) => i.questionId)).not.toEqual(b.items.map((i) => i.questionId));
  });
});

describe('score', () => {
  const items = (n: number, correct: number) =>
    Array.from({ length: n }, (_, i) => ({ domain: DOMAINS[i % 9], selected: i < correct ? 'a' : i % 2 ? null : 'b', answer: 'a' }));
  it('blank answers score zero, wrong answers cost nothing', () => {
    const r = score([{ domain: 'GAI', selected: null, answer: 'a' }, { domain: 'GAI', selected: 'b', answer: 'a' }], 0.7);
    expect(r.correct).toBe(0);
    expect(r.scorePct).toBe(0);
  });
  it('pass marks at the boundary', () => {
    expect(score(items(60, 41), 0.7).passed).toBe(false);
    expect(score(items(60, 42), 0.7).passed).toBe(true);
    expect(score(items(240, 179), 0.75).passed).toBe(false);
    expect(score(items(240, 180), 0.75).passed).toBe(true);
  });
  it('domain totals add up to the question count', () => {
    const r = score(items(120, 70), 0.7);
    expect(Object.values(r.domainScores).reduce((s, d) => s + d.total, 0)).toBe(120);
    expect(Object.values(r.domainScores).reduce((s, d) => s + d.correct, 0)).toBe(70);
  });
});

describe('certificates', () => {
  it('numbers use Crockford base32 and normalize on lookup', () => {
    const id = newCertificateId('FDE', 2026);
    expect(id).toMatch(/^FDE-2026-[0-9A-HJKMNP-TV-Z]{5}-[0-9A-HJKMNP-TV-Z]{5}$/);
    expect(normalizeCertificateId(id.toLowerCase().replace(/-/g, ' '))).toBe(id);
    expect(normalizeCertificateId('MGR-2026-7K2Q9-XWM3P')).toBe('MGR-2026-7K2Q9-XWM3P');
    expect(normalizeCertificateId('nonsense')).toBeNull();
  });
});

describe('admin statistics', () => {
  it('flags questions only after 10 servings', () => {
    expect(questionFlag({ served: 9, correct: 0 })).toBeNull();
    expect(questionFlag({ served: 10, correct: 2 })).toBe('too_hard');
    expect(questionFlag({ served: 20, correct: 20 })).toBe('too_easy');
    expect(questionFlag({ served: 20, correct: 12 })).toBeNull();
  });
  it('CSV starts with a BOM and quotes accents safely', () => {
    const csv = toCsv([['name'], ['Hélène Dupré'], ['a, "b"']]);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv).toContain('Hélène Dupré');
    expect(csv).toContain('"a, ""b"""');
  });
  it('median', () => {
    expect(median([3, 1, 2])).toBe(2);
    expect(median([4, 1, 2, 3])).toBe(2.5);
    expect(median([])).toBeNull();
  });
});
