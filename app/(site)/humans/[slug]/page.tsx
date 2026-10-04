/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { canEdit, certificationsByEmail, fullName, getHumanBySlug, roleLabel } from '@/lib/humans';
import { appUrl } from '@/lib/env';
import { CopyButton } from '@/components/CopyButton';

export const metadata: Metadata = { title: 'Humans' };

export default async function HumanPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ created?: string }> }) {
  const { slug } = await params;
  const { created } = await searchParams;
  const h = await getHumanBySlug(slug);
  if (!h || h.hidden) notFound();
  const certs = (await certificationsByEmail([h.email])).get(h.email) ?? [];
  const editable = await canEdit(h, created);
  const editLink = created ? `${appUrl()}/humans/${h.slug}/edit?token=${created}` : null;
  return (
    <div className="space-y-8">
      {editLink && (
        <div className="border-l-4 border-marker bg-gauge/40 p-4">
          <p className="font-semibold">Your page is live. Keep this private link to edit or delete it from another browser:</p>
          <p className="mt-2 break-all font-mono text-13">{editLink}</p>
          <div className="mt-3"><CopyButton text={editLink} label="Copy edit link" /></div>
        </div>
      )}
      <div className="flex flex-wrap items-start gap-6">
        {h.photo
          ? <img src={`/api/humans/${h.slug}/photo?v=${h.updatedAt.getTime()}`} alt={fullName(h)} width={160} height={160} className="h-40 w-40 border border-gauge object-cover" />
          : <span aria-hidden className="display flex h-40 w-40 items-center justify-center bg-ink text-56 text-white">{h.firstName[0]}{h.lastName[0] ?? ''}</span>}
        <div>
          <h1 className="display text-44">{fullName(h)}</h1>
          <p className="mt-1 text-21">{roleLabel(h.communityRole)}</p>
          <p className="text-steel">{h.organization}</p>
        </div>
      </div>
      {h.bio && <p className="prose-width">{h.bio}</p>}
      <section>
        <h2 className="text-21 font-semibold">FDE School certifications</h2>
        {certs.length ? (
          <ul className="mt-2 space-y-1">
            {certs.map((c) => <li key={c.id}><span className="text-pass">Certified</span> {c.trackName} (<Link className="link font-mono text-15" href={`/verify/${c.id}`}>{c.id}</Link>)</li>)}
          </ul>
        ) : <p className="mt-1 text-steel">No certification yet.</p>}
      </section>
      <p className="flex flex-wrap gap-x-5 gap-y-2">
        {h.linkedinUrl && <a className="link" href={h.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn profile</a>}
        {editable && <Link className="link" href={`/humans/${h.slug}/edit${created ? `?token=${created}` : ''}`}>Edit this page</Link>}
        <Link className="link" href="/humans">All humans</Link>
      </p>
    </div>
  );
}
