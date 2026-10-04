import type { Metadata } from 'next';
import Link from 'next/link';
import { FURTHER_READING, KIND_LABEL, SESSIONS } from '@/lib/content/resources';
import { DOMAIN_NAMES, TRACKS, type Domain, type PublicTrackId, type Track } from '@/lib/config/tracks';

export const metadata: Metadata = { title: 'Resources' };

// What differs between tracks is depth, so a filtered view says how to study and where the exam's questions come from.
const STUDY_NOTE: Record<PublicTrackId, string> = {
  exco: 'Days 1 to 3. The exam tests concepts and their business meaning, not mechanics.',
  manager: 'All five days. The exam goes deeper into the stack, value capture and leading the change.',
  fde: 'All five days, at practitioner depth: modeling, plant data, operations science and field craft.',
};

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
  const sel: Track | null = active === 'all' ? null : TRACKS[active as PublicTrackId];
  const examCount = (d: string) => (sel ? sel.blueprint[d as Domain].reduce((a: number, b: number) => a + b, 0) : 0);

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
      {sel && (
        <p className="prose-width mt-4">
          <span className="font-semibold">{sel.name}:</span> {STUDY_NOTE[active as PublicTrackId]} {sel.questionCount} questions in {sel.durationMinutes} minutes.
        </p>
      )}

      <ol className="mt-8">
        {sessions.map((s) => (
          <li key={s.id} id={s.id} className="scroll-mt-4 border-t border-ink py-6">
            <h2 className="display text-27">{s.title}</h2>
            <p className="prose-width mt-2 text-steel">{s.summary}</p>
            {sel && (
              <p className="mt-2 text-15">
                <span className="text-steel">In the {sel.name} exam: </span>
                {s.domains.filter((d) => examCount(d) > 0).map((d, i) => (
                  <span key={d}>{i > 0 && ', '}{DOMAIN_NAMES[d as Domain]} <span className="tnum">({examCount(d)} questions)</span></span>
                ))}
              </p>
            )}
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
