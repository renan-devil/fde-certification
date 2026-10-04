import type { Metadata } from 'next';
import { Band } from '@/components/Band';
import { EnterForm } from './EnterForm';

export const metadata: Metadata = { title: 'Enter' };

export default async function EnterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <>
      <Band />
      <main className="mx-auto max-w-[960px] px-4 py-12 sm:px-6">
        <h1 className="display text-44">FDE School</h1>
        <p className="mt-3 text-17">Enter the password your trainer gave you.</p>
        <EnterForm next={next ?? '/'} />
      </main>
    </>
  );
}
