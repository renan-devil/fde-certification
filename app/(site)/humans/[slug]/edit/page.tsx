import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { COMMUNITY_ROLES, canEdit, getHumanBySlug } from '@/lib/humans';
import { HumanForm } from '../../HumanForm';
import { editHuman, removeHuman } from '../../actions';

export const metadata: Metadata = { title: 'Edit your page' };

export default async function EditHuman({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ token?: string }> }) {
  const { slug } = await params;
  const { token } = await searchParams;
  const h = await getHumanBySlug(slug);
  if (!h) notFound();
  if (!(await canEdit(h, token))) {
    return (
      <div>
        <h1 className="display text-44">You can&apos;t edit this page</h1>
        <p className="mt-3">Open the private edit link you received when you created the page, or ask your trainer.</p>
        <Link href={`/humans/${h.slug}`} className="link mt-4 inline-block">Back to the page</Link>
      </div>
    );
  }
  return (
    <div>
      <h1 className="display text-44">Edit your page</h1>
      <HumanForm action={editHuman} roles={COMMUNITY_ROLES.map((r) => ({ ...r }))} submitLabel="Save changes"
        initial={{ slug: h.slug, token, firstName: h.firstName, lastName: h.lastName, organization: h.organization, communityRole: h.communityRole,
          bio: h.bio, linkedinUrl: h.linkedinUrl ?? '', email: h.email, photoUrl: h.photo ? `/api/humans/${h.slug}/photo?v=${h.updatedAt.getTime()}` : null }} />
      <form action={removeHuman} className="mt-12 border-t border-gauge pt-6">
        <input type="hidden" name="slug" value={h.slug} />
        {token && <input type="hidden" name="token" value={token} />}
        <h2 className="text-21 font-semibold">Delete this page</h2>
        <p className="mt-1">Removes the page and its picture. This cannot be undone.</p>
        <button type="submit" className="btn btn-secondary mt-3">Delete my page</button>
      </form>
    </div>
  );
}
