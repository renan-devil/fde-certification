import type { Metadata } from 'next';
import Link from 'next/link';
import { listAttempts } from '@/lib/admin/queries';
import { sortRows } from '@/lib/admin/stats';
import { voidAttempt } from '@/lib/admin/actions';
import { trackName, DOMAIN_NAMES, type Domain } from '@/lib/config/tracks';
import { SortHeader } from '@/components/SortHeader';

export const metadata: Metadata = { title: 'Attempts' };
type P = { q?: string; track?: string; status?: string; sort?: string; dir?: string };

export default async function AttemptsPage({ searchParams }: { searchParams: Promise<P> }) {
  const params = await searchParams;
  const q = (params.q ?? '').toLowerCase();
  const rows = (await listAttempts()).map((a) => ({
    ...a,
    name: `${a.firstName} ${a.lastName}`,
    duration: a.finishedAt ? Math.round((a.finishedAt.getTime() - a.startedAt.getTime()) / 60000) : null,
    score: a.scorePct === null ? null : Number(a.scorePct),
  })).filter((a) =>
    (!q || `${a.name} ${a.email} ${a.organization}`.toLowerCase().includes(q)) &&
    (!params.track || a.trackId === params.track) && (!params.status || a.status === params.status));
  const sorted = sortRows(rows, params.sort ?? 'startedAt', params.sort ? params.dir : 'desc');
  const h = (col: string, label: string) => <SortHeader col={col} label={label} params={params} base="/admin/attempts" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-44">Attempts</h1>
        <a className="btn btn-secondary" href="/api/admin/export/attempts">Export CSV</a>
      </div>
      <form className="mt-4 flex flex-wrap items-end gap-3" method="get">
        <div><label className="label text-15" htmlFor="q">Search</label><input id="q" name="q" defaultValue={params.q} className="field" placeholder="Name, email, organization" /></div>
        <div><label className="label text-15" htmlFor="track">Track</label>
          <select id="track" name="track" defaultValue={params.track ?? ''} className="field"><option value="">All</option><option value="exco">Exco</option><option value="manager">Manager</option><option value="fde">FDE</option><option value="test">Rehearsal</option></select></div>
        <div><label className="label text-15" htmlFor="status">Status</label>
          <select id="status" name="status" defaultValue={params.status ?? ''} className="field"><option value="">All</option><option>in_progress</option><option>submitted</option><option>expired</option><option>voided</option></select></div>
        <button className="btn" type="submit">Filter</button>
        <Link href="/admin/attempts" className="link">Clear</Link>
      </form>
      <p className="mt-3 text-15 text-steel">{sorted.length} attempts</p>
      <div className="mt-2 overflow-x-auto">
        <table className="data text-15">
          <thead><tr>{h('startedAt', 'Date')}{h('name', 'Name')}{h('email', 'Email')}{h('organization', 'Organization')}{h('trackId', 'Track')}{h('status', 'Status')}{h('score', 'Score')}{h('duration', 'Minutes')}{h('focusLostCount', 'Tab leaves')}<th>Actions</th></tr></thead>
          <tbody>
            {sorted.map((a) => (
              <tr key={a.id}>
                <td className="whitespace-nowrap">{a.startedAt.toISOString().slice(0, 16).replace('T', ' ')}</td>
                <td>{a.name}</td><td>{a.email}</td><td>{a.organization}</td><td>{trackName(a.trackId)}</td>
                <td>{a.status}{a.passed !== null && a.status !== 'voided' ? (a.passed ? ', passed' : ', failed') : ''}</td>
                <td>{a.score === null ? '–' : `${a.score}%`}</td><td>{a.duration ?? '–'}</td><td>{a.focusLostCount}</td>
                <td className="min-w-56">
                  {a.domainScores && (
                    <details><summary className="cursor-pointer">Domain scores</summary>
                      <ul className="mt-1">{Object.entries(a.domainScores).map(([d, s]) => <li key={d}>{DOMAIN_NAMES[d as Domain] ?? d}: {s.correct}/{s.total}</li>)}</ul>
                    </details>
                  )}
                  {a.status !== 'voided' && (
                    <details><summary className="cursor-pointer">Void attempt</summary>
                      <form action={voidAttempt} className="mt-2 space-y-2">
                        <input type="hidden" name="id" value={a.id} />
                        <input name="reason" required placeholder="Reason" className="field" aria-label="Reason" />
                        <button className="btn btn-secondary" type="submit">Void</button>
                      </form>
                    </details>
                  )}
                  {a.voidReason && <span className="text-steel">Voided: {a.voidReason}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
