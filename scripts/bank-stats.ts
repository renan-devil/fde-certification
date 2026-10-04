// npm run bank:stats  Prints the coverage table (written and served items per cell against the blueprint).
import { checkBank, coverage, coverageTable } from '@/lib/bank/check';
import { readBankFiles } from './bank-files';

const { items } = checkBank(readBankFiles());
console.log(coverageTable(coverage(items, process.env.BANK_SERVE === 'all')));
console.log('(written/served (minimum/launch target))');
