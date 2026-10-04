/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { certificationsByEmail, fullName, listHumans, roleLabel } from '@/lib/humans';

export const metadata: Metadata = { title: 'Humans' };
export const dynamic = 'force-dynamic';

export default async function HumansPage() {
  const people = await listHumans();
  const certs = await certificationsByEmail([...new Set(people.map((p) => p.email))]);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="display text-44">Humans</h1>
        <Link href="/humans/new" className="btn">Add yourself</Link>
      </div>
      <p className="prose-width mt-3">The people of the FDE community: trainers, participants and certified practitioners. Certifications are checked against issued certificates.</p>
      {people.length === 0 ? (
        <p className="mt-8 text-steel">Nobody has added themselves yet.</p>
      ) : (
        <ul className="mt-8 border-t border-ink">
          {people.map((p) => {
            const c = certs.get(p.email) ?? [];
            return (
              <li key={p.id} className="border-b border-gauge">
                <Link href={`/humans/${p.slug}`} className="flex items-center gap-4 py-4 hover:bg-gauge/30">
                  {p.hasPhoto
                    ? <img src={`/api/humans/${p.slug}/photo`} alt="" width={56} height={56} className="h-14 w-14 shrink-0 border border-gauge object-cover" />
                    : <span aria-hidden className="display flex h-14 w-14 shrink-0 items-center justify-center bg-ink text-21 text-white">{p.firstName[0]}{p.lastName[0] ?? ''}</span>}
                  <span>
                    <span className="block font-semibold">{fullName(p)}</span>
                    <span className="block text-15 text-steel">{roleLabel(p.communityRole)}, {p.organization}</span>
                    {c.length > 0 && <span className="block text-15 text-pass">Certified: {c.map((x) => x.trackName).join(', ')}</span>}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
