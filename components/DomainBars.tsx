import { DOMAIN_NAMES, type Domain } from '@/lib/config/tracks';
import type { DomainScores } from '@/lib/db/schema';

/** Correct over total per domain as ink bars on gauge tracks, with the pass mark drawn as a line. */
export function DomainBars({ scores, passMark }: { scores: DomainScores; passMark: number }) {
  const rows = Object.entries(scores).filter(([, s]) => s.total > 0);
  return (
    <div>
      <ul className="space-y-4">
        {rows.map(([d, s]) => {
          const pct = Math.round((s.correct / s.total) * 100);
          return (
            <li key={d}>
              <div className="flex justify-between gap-4 text-15">
                <span>{DOMAIN_NAMES[d as Domain] ?? d}</span>
                <span className="tnum whitespace-nowrap text-steel">{s.correct} / {s.total}</span>
              </div>
              <div className="relative mt-1 h-3 bg-gauge" role="img" aria-label={`${pct}% correct`}>
                <div className="h-full bg-ink" style={{ width: `${pct}%` }} />
                <div className="absolute -top-1 -bottom-1 w-0.5 bg-fail" style={{ left: `${passMark * 100}%` }} aria-hidden />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-13 text-steel"><span className="mr-1 inline-block h-3 w-0.5 bg-fail align-middle" /> Pass mark, {Math.round(passMark * 100)}%</p>
    </div>
  );
}
