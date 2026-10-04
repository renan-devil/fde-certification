import type { Metadata } from 'next';
import { questionStats } from '@/lib/admin/queries';
import { FLAG_TEXT, questionFlag, sortRows } from '@/lib/admin/stats';
import { allQuestions } from '@/lib/bank/load';
import { SortHeader } from '@/components/SortHeader';

export const metadata: Metadata = { title: 'Questions' };
type P = { sort?: string; dir?: string; flagged?: string };

export default async function QuestionsPage({ searchParams }: { searchParams: Promise<P> }) {
  const params = await searchParams;
  const stats = new Map((await questionStats()).map((s) => [s.questionId, s]));
  const rows = allQuestions().map((q) => {
    const s = stats.get(q.id);
    const served = s?.served ?? 0, correct = s?.correct ?? 0;
    const flag = questionFlag({ served, correct });
    return { id: q.id, status: q.status, stem: q.stem, served, pct: served ? Math.round((correct / served) * 100) : null, lastServed: s?.lastServed ?? null, flag: flag ? FLAG_TEXT[flag] : null };
  }).filter((r) => !params.flagged || r.flag);
  const sorted = sortRows(rows, params.sort ?? 'served', params.sort ? params.dir : 'desc');
  const h = (col: string, label: string) => <SortHeader col={col} label={label} params={params} base="/admin/questions" />;
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-44">Questions</h1>
        <a className="btn btn-secondary" href="/api/admin/export/questions">Export CSV</a>
      </div>
      <p className="prose-width mt-3 text-15 text-steel">Counts finished, non-voided attempts. Flags appear once a question has been served at least 10 times.</p>
      <p className="mt-2"><a className="link" href={params.flagged ? '/admin/questions' : '/admin/questions?flagged=1'}>{params.flagged ? 'Show all questions' : 'Show flagged questions only'}</a></p>
      <div className="mt-3 overflow-x-auto">
        <table className="data text-15">
          <thead><tr>{h('id', 'Question')}{h('status', 'Status')}{h('served', 'Served')}{h('pct', '% correct')}{h('lastServed', 'Last served')}{h('flag', 'Flag')}</tr></thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id}>
                <td><span className="font-mono text-13">{r.id}</span><span className="block max-w-md text-13 text-steel">{r.stem}</span></td>
                <td>{r.status}</td><td>{r.served}</td><td>{r.pct === null ? '–' : `${r.pct}%`}</td>
                <td className="whitespace-nowrap">{r.lastServed ? r.lastServed.toISOString().slice(0, 10) : '–'}</td>
                <td className="text-fail">{r.flag ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
