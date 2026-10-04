import type { Metadata } from 'next';
import { deleteEverythingForEmail, deleteTestData } from '@/lib/admin/actions';

export const metadata: Metadata = { title: 'Data' };

async function clearTests() {
  'use server';
  await deleteTestData();
}

export default function DataPage() {
  return (
    <div className="prose-width space-y-12">
      <section>
        <h1 className="display text-44">Data</h1>
        <h2 className="mt-6 text-21 font-semibold">Delete test data</h2>
        <p className="mt-1">Deletes every attempt and certificate whose email ends with @example.com. Use it after rehearsals.</p>
        <form action={clearTests} className="mt-3"><button className="btn" type="submit">Delete test data</button></form>
      </section>
      <section>
        <h2 className="text-21 font-semibold">Delete everything for an email</h2>
        <p className="mt-1">For access or deletion requests. Deletes the person&apos;s attempts, answers and certificates. Their verification links stop working. This cannot be undone.</p>
        <form action={deleteEverythingForEmail} className="mt-3 space-y-3">
          <div><label className="label" htmlFor="email">Email</label><input id="email" name="email" type="email" required className="field" /></div>
          <div><label className="label" htmlFor="confirm">Type the email again to confirm</label><input id="confirm" name="confirm" type="email" required className="field" /></div>
          <button className="btn" type="submit">Delete everything for this email</button>
        </form>
      </section>
    </div>
  );
}
