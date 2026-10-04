import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Band } from '@/components/Band';
import { trackName } from '@/lib/config/tracks';
import { getAttemptFresh, runnerData } from '@/lib/exam/attempts';
import { holdsAttempt } from '@/lib/exam/guard';
import { Runner } from './Runner';
import { serverTime } from '@/lib/format';

export const metadata: Metadata = { title: 'Exam in progress' };

export default async function AttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!(await holdsAttempt(attemptId))) {
    return (
      <>
        <Band small />
        <main className="mx-auto max-w-[720px] px-4 py-12">
          <h1 className="display text-34">This exam belongs to another browser</h1>
          <p className="mt-3">Open it in the browser where it started. If that is not possible, ask your trainer to reset it.</p>
          <Link href="/" className="link mt-4 inline-block">Go to the home page</Link>
        </main>
      </>
    );
  }
  const attempt = await getAttemptFresh(attemptId);
  if (!attempt) notFound();
  if (attempt.status !== 'in_progress') redirect(`/attempt/${attemptId}/result`);

  const { questions, answers } = await runnerData(attempt);
  return (
    <Runner
      attemptId={attempt.id}
      trackName={trackName(attempt.trackId)}
      questions={questions}
      initialAnswers={answers}
      serverNow={serverTime()}
      deadline={attempt.deadlineAt.getTime()}
    />
  );
}
