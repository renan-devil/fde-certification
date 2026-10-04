// npm run bank:check [-- --domain LLM]  Fails (exit 1) on any error. See docs/SPEC.md section 16.
import { checkBank, coverage, coverageFindings, coverageTable } from '@/lib/bank/check';
import { readBankFiles } from './bank-files';

const i = process.argv.indexOf('--domain');
const only = i > 0 ? process.argv[i + 1] : null;

const { findings, items } = checkBank(readBankFiles());
const rows = coverage(items, process.env.BANK_SERVE === 'all');
const all = [...findings, ...(only ? [] : coverageFindings(rows))].filter(
  (f) => !only || f.id.startsWith(only) || f.id.startsWith(`${only}.json`) || f.id === 'bank' || f.id.startsWith('tier'),
);

for (const f of all) console.log(`${f.level === 'error' ? 'ERROR' : 'warn '}  ${f.id}: ${f.message}`);
console.log(`\n${items.length} items read.`);
if (!only) console.log(`\n${coverageTable(rows)}\n(written/served (minimum/launch target))`);
const errors = all.filter((f) => f.level === 'error').length;
console.log(`\n${errors} errors, ${all.length - errors} warnings.`);
process.exit(errors ? 1 : 0);
