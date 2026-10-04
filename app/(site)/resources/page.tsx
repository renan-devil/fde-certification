import type { Metadata } from 'next';
import Link from 'next/link';
import { FURTHER_READING, KIND_LABEL, SESSIONS } from '@/lib/content/resources';

export const metadata: Metadata = { title: 'Resources' };

const FILTERS = [
  { id: 'all', label: 'All tracks' },
  { id: 'exco', label: 'Exco' },
  { id: 'manager', label: 'Manager' },
  { id: 'fde', label: 'FDE' },
];

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ track?: string }> }) {
  const { track = 'all' } = await searchParams;
  const active = FILTERS.some((f) => f.id === track) ? track : 'all';
  const fits = (tracks: string[]) => active === 'all' || tracks.includes(active);
  const sessions = SESSIONS.filter((s) => fits(s.tracks));
  const reading = FURTHER_READING.filter((r) => fits(r.tracks));

  return (
    <div>
      <h1 className="display text-44">Course material</h1>
      <p className="prose-width mt-3">The five days of the FDE School, in order. Material appears here after each session.</p>

      <nav aria-label="Filter by track" className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link key={f.id} href={f.id === 'all' ? '/resources' : `/resources?track=${f.id}`}
            aria-current={active === f.id ? 'page' : undefined}
            className={`border px-4 py-2 text-15 ${active === f.id ? 'border-ink bg-ink text-white' : 'border-gauge hover:border-ink'}`}>
            {f.label}
          </Link>
        ))}
      </nav>

      <ol className="mt-8">
        {sessions.map((s) => (
          <li key={s.id} id={s.id} className="scroll-mt-4 border-t border-ink py-6">
            <h2 className="display text-27">{s.title}</h2>
            <p className="prose-width mt-2 text-steel">{s.summary}</p>
            <ul className="mt-4 space-y-2">
              {s.items.filter((it) => fits(it.tracks ?? s.tracks)).map((it) => {
                const available = it.status === 'available' && it.href;
                return (
                  <li key={it.id} className="flex flex-wrap items-baseline gap-x-3">
                    <span className="w-20 shrink-0 text-15 text-steel">{KIND_LABEL[it.kind]}</span>
                    {available ? (
                      <a href={it.href!} target="_blank" rel="noopener noreferrer" className="link font-semibold">{it.title}</a>
                    ) : (
                      <span className="text-steel">{it.title}</span>
                    )}
                    {it.duration && <span className="tnum text-15 text-steel">{it.duration}</span>}
                    {!available && <span className="text-15 text-steel">(Available after the session)</span>}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ol>

      {reading.length > 0 && (
        <section className="border-t border-ink pt-6">
          <h2 className="display text-27">Further reading</h2>
          <ul className="mt-4 space-y-3">
            {reading.map((r) => (
              <li key={r.id}>
                <a href={r.href} target="_blank" rel="noopener noreferrer" className="link font-semibold">{r.title}</a>
                <span className="block text-15 text-steel">{r.by}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
