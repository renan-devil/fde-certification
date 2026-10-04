import { describe, expect, it } from 'vitest';
import { checkBank } from '@/lib/bank/check';
import { readBankFiles } from '@/scripts/bank-files';

describe('question bank', () => {
  it('passes bank:check with no errors', () => {
    const { findings, items } = checkBank(readBankFiles());
    expect(findings.filter((f) => f.level === 'error')).toEqual([]);
    expect(items.length).toBeGreaterThanOrEqual(320);
  });
});
