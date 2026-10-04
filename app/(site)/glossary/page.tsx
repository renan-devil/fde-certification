import type { Metadata } from 'next';
import glossary from '@/content/glossary.json';
import { DOMAINS, DOMAIN_NAMES } from '@/lib/config/tracks';

export const metadata: Metadata = { title: 'Glossary' };
type Entry = { term: string; tier: number; definition: string; domain: string };
const TIER_LABEL: Record<number, string> = { 1: 'Exco', 2: 'Manager', 3: 'FDE' };

export default function GlossaryPage() {
  const entries = glossary as Entry[];
  return (
    <div>
      <h1 className="display text-44">Glossary</h1>
      <p className="prose-width mt-3">Terms used in the course and the exams, grouped by domain. The marker shows the first track expected to know each term: Exco terms are for everyone.</p>
      {DOMAINS.map((d) => {
        const list = entries.filter((e) => e.domain === d);
        if (!list.length) return null;
        return (
          <section key={d} className="mt-10 border-t border-ink pt-6">
            <h2 className="display text-27">{DOMAIN_NAMES[d]}</h2>
            <dl className="mt-4 space-y-4">
              {list.map((e) => (
                <div key={e.term} className="prose-width">
                  <dt className="font-semibold">{e.term} <span className="ml-2 border border-gauge px-1.5 py-0.5 text-13 font-normal text-steel">{TIER_LABEL[e.tier]}</span></dt>
                  <dd className="mt-1">{e.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
