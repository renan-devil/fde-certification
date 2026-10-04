'use client';
import { Band } from '@/components/Band';

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <>
      <Band />
      <main className="mx-auto max-w-[960px] px-4 py-12 sm:px-6">
        <h1 className="display text-44">Something went wrong</h1>
        <p className="mt-3">The page could not load. Your exam answers are saved on our server. Try again; if it keeps failing, tell your trainer.</p>
        <button type="button" className="btn mt-4" onClick={reset}>Try again</button>
      </main>
    </>
  );
}
