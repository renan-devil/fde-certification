import type { Metadata } from 'next';
import Link from 'next/link';
import { fullName, listHumans, roleLabel } from '@/lib/humans';
import { deleteHumanAdmin, setHumanHidden } from '@/lib/admin/actions';

export const metadata: Metadata = { title: 'Humans' };

export default async function AdminHumans() {
  const people = await listHumans(true);
  return (
    <div>
      <h1 className="display text-44">Humans</h1>
      <p className="mt-3 text-15 text-steel">Hide a page to take it out of the directory without deleting it. As admin you can also edit any page from its own page.</p>
      <table className="data mt-4 text-15">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Organization</th><th>Added</th><th>Actions</th></tr></thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              <td><Link className="link" href={`/humans/${p.slug}`}>{fullName(p)}</Link>{p.hidden && <span className="block text-fail">Hidden</span>}</td>
              <td>{p.email}</td><td>{roleLabel(p.communityRole)}</td><td>{p.organization}</td>
              <td className="whitespace-nowrap">{p.createdAt.toISOString().slice(0, 10)}</td>
              <td className="space-y-1">
                <form action={setHumanHidden}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="hidden" value={String(!p.hidden)} />
                  <button className="link" type="submit">{p.hidden ? 'Show' : 'Hide'}</button></form>
                <Link className="link block" href={`/humans/${p.slug}/edit`}>Edit</Link>
                <details><summary className="cursor-pointer">Delete</summary>
                  <form action={deleteHumanAdmin} className="mt-1"><input type="hidden" name="id" value={p.id} /><button className="btn btn-secondary" type="submit">Delete page</button></form>
                </details>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
