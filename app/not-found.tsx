import Link from 'next/link';
import { Band } from '@/components/Band';

export default function NotFound() {
  return (
    <>
      <Band />
      <main className="mx-auto max-w-[960px] px-4 py-12 sm:px-6">
        <h1 className="display text-44">Page not found</h1>
        <p className="mt-3">This address doesn&apos;t match any page. Check the link, or start from the home page.</p>
        <Link href="/" className="link mt-4 inline-block">Go to the home page</Link>
      </main>
    </>
  );
}
