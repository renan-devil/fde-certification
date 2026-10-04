import type { Metadata } from 'next';
import { allTracks, DOMAINS } from '@/lib/config/tracks';
import { servedQuestions, serveAll } from '@/lib/bank/load';
import { listAttempts, recentBankGaps } from '@/lib/admin/queries';
import { median } from '@/lib/admin/stats';

export const metadata: Metadata = { title: 'Admin' };

export default async function Overview() {
  const [attempts, gaps] = await Promise.all([listAttempts(), recentBankGaps()]);
  const served = servedQuestions();
  const tracks = allTracks();
  return (
    <div className="space-y-12">
      <section>
        <h1 className="display text-44">Overview</h1>
        <table className="data mt-4">
          <thead><tr><th>Track</th><th>In progress</th><th>Passed</th><th>Failed</th><th>Pass rate</th><th>Median score</th></tr></thead>
          <tbody>
            {tracks.map((t) => {
              const mine = attempts.filter((a) => a.trackId === t.id && a.status !== 'voided');
              const done = mine.filter((a) => a.passed !== null);
              const passed = done.filter((a) => a.passed).length;
              const med = median(done.map((a) => Number(a.scorePct)));
              return (
                <tr key={t.id}>
                  <td className="font-semibold">{t.name}</td>
                  <td>{mine.filter((a) => a.status === 'in_progress').length}</td>
                  <td>{passed}</td>
                  <td>{done.length - passed}</td>
                  <td>{done.length ? `${Math.round((passed / done.length) * 100)}%` : '–'}</td>
                  <td>{med === null ? '–' : `${med.toFixed(1)}%`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="display text-34">Bank readiness</h2>
        <p className="mt-2 text-15 text-steel">
          Served questions per cell against what each track draws. Serving {serveAll() ? 'all non-retired questions, drafts included (BANK_SERVE=all)' : 'validated questions only'}.
        </p>
        {tracks.map((t) => {
          const cells = DOMAINS.flatMap((d) => [1, 2, 3].map((tier) => ({ d, tier, need: t.blueprint[d][tier - 1] })))
            .filter((c) => c.need > 0)
            .map((c) => ({ ...c, have: served.filter((q) => q.domain === c.d && q.tier === c.tier).length }));
          const ready = cells.every((c) => c.have >= c.need);
          return (
            <div key={t.id} className="mt-6">
              <h3 className="font-semibold">{t.name}: <span className={ready ? 'text-pass' : 'text-fail'}>{ready ? 'ready' : 'cannot open yet'}</span></h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {cells.map((c) => (
                  <span key={`${c.d}${c.tier}`} className={`tnum border px-2 py-1 text-13 ${c.have >= c.need ? 'border-pass text-pass' : 'border-fail text-fail'}`}>
                    {c.d}-{c.tier}: {c.have}/{c.need}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {gaps.length > 0 && (
        <section>
          <h2 className="display text-34">Refused starts</h2>
          <p className="mt-2 text-15 text-steel">Starts refused because the bank could not fill a track.</p>
          <table className="data mt-3">
            <thead><tr><th>When</th><th>Track</th><th>Missing</th></tr></thead>
            <tbody>{gaps.map((g) => <tr key={g.id}><td>{g.at.toISOString().slice(0, 16).replace('T', ' ')}</td><td>{g.trackId}</td><td>{g.detail}</td></tr>)}</tbody>
          </table>
        </section>
      )}
    </div>
  );
}
