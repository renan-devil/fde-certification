// Pure bank checks (docs/SPEC.md section 16). Used by scripts/bank-check.ts and the unit tests.
import { DOMAINS, PUBLIC_TRACKS, TEST_TRACK, type Domain } from '@/lib/config/tracks';
import { OPTION_IDS, questionSchema, type Question } from './schema';

export type Finding = { level: 'error' | 'warning'; id: string; message: string };

export const LIMITS = { stem: 220, option: 110, explanation: 320 };

const BANNED: RegExp[] = [
  ...['Teknor', 'Decathlon', 'Pierre Fabre', 'Kiabi', 'Cognyx', 'Oplit', 'Mercateam', 'Fabriq', 'Flowlity',
    'Yoshu', 'Parsio', 'Steero', 'Kraaft', 'CompoundX', 'Bonx', 'Venso', 'Cinqo', 'joint venture']
    .map((t) => new RegExp(`\\b${t}\\b`, 'i')),
  /\bJV\b/,
  /\bDiscoverY\b/, // case-sensitive: the ordinary word "discovery" is fine
];

/** Minimum served items per cell (the largest draw of any public track) and the 1.5× launch target. */
export function cellRequirements(): Record<Domain, { min: number; target: number }[]> {
  const out = {} as Record<Domain, { min: number; target: number }[]>;
  for (const d of DOMAINS) {
    out[d] = [0, 1, 2].map((t) => {
      const min = Math.max(...PUBLIC_TRACKS.map((tr) => tr.blueprint[d][t]), TEST_TRACK.blueprint[d][t]);
      return { min, target: Math.ceil(min * 1.5) };
    });
  }
  return out;
}

export function normalizeStem(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9€%\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function jaccard(a: Set<string>, b: Set<string>): number {
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  return inter / (a.size + b.size - inter || 1);
}

export function isLongestStrict(q: Question): boolean {
  const key = q.options[q.answer].length;
  return OPTION_IDS.every((o) => o === q.answer || q.options[o].length < key);
}

export function isNegativeStem(stem: string): boolean {
  return /\b(NOT|EXCEPT)\b/.test(stem);
}

function pct(n: number, total: number) {
  return Math.round((n / total) * 1000) / 10;
}

export type CheckResult = { findings: Finding[]; items: Question[] };

/**
 * Validates raw items. `raw` maps a file name to its parsed JSON content.
 * `serve` mirrors BANK_SERVE: coverage below the minimum on served items is an error only
 * when the written (non-retired) bank cannot fill the blueprint; a served shortfall is a warning.
 */
export function checkBank(raw: Record<string, unknown>): CheckResult {
  const findings: Finding[] = [];
  const items: Question[] = [];
  const err = (id: string, message: string) => findings.push({ level: 'error', id, message });
  const warn = (id: string, message: string) => findings.push({ level: 'warning', id, message });

  // 1. Schema, unique ids, id prefix.
  const seen = new Set<string>();
  const byFile: Record<string, Question[]> = {};
  for (const [file, content] of Object.entries(raw)) {
    byFile[file] = [];
    if (!Array.isArray(content)) { err(file, 'file must contain a JSON array'); continue; }
    content.forEach((rawItem, i) => {
      const parsed = questionSchema.safeParse(rawItem);
      const id = (rawItem as { id?: string })?.id ?? `${file}[${i}]`;
      if (!parsed.success) {
        err(id, `schema: ${parsed.error.issues.map((x) => `${x.path.join('.')} ${x.message}`).join('; ')}`);
        return;
      }
      const q = parsed.data;
      if (seen.has(q.id)) err(q.id, 'duplicate id');
      seen.add(q.id);
      if (!q.id.startsWith(`${q.domain}-${q.tier}-`)) err(q.id, `id prefix does not match domain ${q.domain} and tier ${q.tier}`);
      if (!file.startsWith(q.domain)) err(q.id, `item of domain ${q.domain} is in file ${file}`);
      items.push(q);
      byFile[file].push(q);
    });
  }

  const live = items.filter((q) => q.status !== 'retired');

  for (const q of live) {
    // 3. Length limits.
    if (q.stem.length > LIMITS.stem) err(q.id, `stem is ${q.stem.length} characters (max ${LIMITS.stem})`);
    for (const o of OPTION_IDS) {
      if (q.options[o].length > LIMITS.option) err(q.id, `option ${o} is ${q.options[o].length} characters (max ${LIMITS.option})`);
    }
    if (q.explanation.length > LIMITS.explanation) err(q.id, `explanation is ${q.explanation.length} characters (max ${LIMITS.explanation})`);

    // 4. Options that refer to other options.
    for (const o of OPTION_IDS) {
      const t = q.options[o].trim();
      if (/^(all of|none of|both)\b/i.test(t)) err(q.id, `option ${o} starts with "All of", "None of" or "Both"`);
      if (/\b[A-D]\s+(and|or)\s+[A-D]\b/.test(t)) err(q.id, `option ${o} names other option letters`);
    }

    // 5. Banned terms anywhere.
    const text = [q.stem, ...OPTION_IDS.map((o) => q.options[o]), q.explanation, q.source].join(' \n ');
    for (const re of BANNED) if (re.test(text)) err(q.id, `banned term: ${re.source.replace(/\\b/g, '')}`);

    // 8. Negative stems written in lowercase.
    if (/\b(except)\b/.test(q.stem) || /\bwhich\b[^?]*\b(is|are|does|do|should)\s+not\b/i.test(q.stem) && !isNegativeStem(q.stem)) {
      warn(q.id, 'possible negative stem: write NOT or EXCEPT in capitals, or rephrase');
    }

    // Duplicate options inside an item.
    const opts = OPTION_IDS.map((o) => normalizeStem(q.options[o]));
    if (new Set(opts).size < 4) err(q.id, 'two options are identical');
  }

  // 2. Duplicate and near-duplicate stems.
  const words = live.map((q) => ({ q, set: new Set(normalizeStem(q.stem).split(' ').filter((w) => w.length > 2)) }));
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      const a = words[i], b = words[j];
      if (normalizeStem(a.q.stem) === normalizeStem(b.q.stem)) err(b.q.id, `duplicate stem of ${a.q.id}`);
      else if (jaccard(a.set, b.set) > 0.8) err(b.q.id, `near-duplicate stem of ${a.q.id}`);
    }
  }

  // 6. Answer letter balance, overall and per file (20+ items).
  const balance = (group: Question[], label: string) => {
    if (group.length < 20) return;
    for (const o of OPTION_IDS) {
      const share = group.filter((q) => q.answer === o).length / group.length;
      if (share < 0.2 || share > 0.3) err(label, `answer "${o}" is ${pct(share * group.length, group.length)}% of ${group.length} items (allowed 20–30%)`);
    }
  };
  balance(live, 'bank');
  for (const [file, qs] of Object.entries(byFile)) balance(qs.filter((q) => q.status !== 'retired'), file);

  // 7. Correct option strictly longest in at most 35% of items, overall and per tier (20+ items).
  const longest = (group: Question[], label: string) => {
    if (group.length < 20 && label !== 'bank') return;
    if (group.length === 0) return;
    const n = group.filter(isLongestStrict).length;
    if (n / group.length > 0.35) err(label, `correct option is strictly the longest in ${pct(n, group.length)}% of items (max 35%)`);
  };
  longest(live, 'bank');
  for (const t of [1, 2, 3]) longest(live.filter((q) => q.tier === t), `tier ${t}`);

  // 8. Negative stems at most 5%.
  const neg = live.filter((q) => isNegativeStem(q.stem)).length;
  if (live.length >= 20 && neg / live.length > 0.05) err('bank', `negative stems are ${pct(neg, live.length)}% of items (max 5%)`);

  return { findings, items };
}

export type CoverageRow = { domain: Domain; tier: number; min: number; target: number; written: number; served: number };

export function coverage(items: Question[], serveAll: boolean): CoverageRow[] {
  const req = cellRequirements();
  const rows: CoverageRow[] = [];
  for (const d of DOMAINS) {
    for (const t of [1, 2, 3]) {
      const cell = items.filter((q) => q.domain === d && q.tier === t && q.status !== 'retired');
      rows.push({
        domain: d, tier: t, ...req[d][t - 1],
        written: cell.length,
        served: cell.filter((q) => serveAll || q.status === 'validated').length,
      });
    }
  }
  return rows;
}

/** 9. Coverage findings. */
export function coverageFindings(rows: CoverageRow[]): Finding[] {
  const out: Finding[] = [];
  for (const r of rows) {
    const cell = `${r.domain} tier ${r.tier}`;
    if (r.min === 0) continue;
    if (r.written < r.min) out.push({ level: 'error', id: cell, message: `${r.written} items written, minimum ${r.min}` });
    else if (r.written < r.target) out.push({ level: 'warning', id: cell, message: `${r.written} items written, launch target ${r.target}` });
    if (r.served < r.min) out.push({ level: 'warning', id: cell, message: `${r.served} items served, minimum ${r.min}: tracks drawing from this cell stay closed until more items are validated` });
  }
  return out;
}

export function coverageTable(rows: CoverageRow[]): string {
  const lines = ['Domain | Tier 1 written/served (min/target) | Tier 2 | Tier 3'];
  for (const d of DOMAINS) {
    const cells = rows.filter((r) => r.domain === d).map((r) => `${r.written}/${r.served} (${r.min}/${r.target})`);
    lines.push(`${d.padEnd(6)} | ${cells.join(' | ')}`);
  }
  const tot = (t: number, k: 'written' | 'served' | 'min' | 'target') => rows.filter((r) => r.tier === t).reduce((s, r) => s + r[k], 0);
  lines.push(`Total  | ${[1, 2, 3].map((t) => `${tot(t, 'written')}/${tot(t, 'served')} (${tot(t, 'min')}/${tot(t, 'target')})`).join(' | ')}`);
  return lines.join('\n');
}
