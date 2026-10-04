import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { getTrack } from '@/lib/config/tracks';
import { attemptToken, safeEqual } from '@/lib/auth/access';
import { ORGANIZATION_TYPES, inProgressAttemptsAmong } from '@/lib/exam/attempts';
import { StartForm } from './StartForm';

export const metadata: Metadata = { title: 'Exam' };

export default async function ExamPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: trackId } = await params;
  const track = getTrack(trackId);
  if (!track) notFound();

  // Attempts this browser holds (valid fde_att_<id> cookies) that are still running on this track.
  const jar = await cookies();
  const held = jar.getAll().filter((c) => c.name.startsWith('fde_att_')).map((c) => ({ id: c.name.slice(8), v: c.value }))
    .filter((c) => /^[0-9a-f-]{36}$/.test(c.id) && safeEqual(c.v, attemptToken(c.id))).map((c) => c.id);
  let resume: string | null = null;
  try {
    resume = (await inProgressAttemptsAmong(held, track.id))[0]?.id ?? null;
  } catch (e) {
    console.error('resume lookup failed', e);
  }

  const pass = Math.round(track.passMark * 100);
  const secs = Math.round((track.durationMinutes * 60) / track.questionCount);
  return (
    <div>
      <h1 className="display text-44">{track.name}</h1>
      {resume && (
        <div className="mt-6 border-l-4 border-marker bg-gauge/40 p-4">
          <p className="font-semibold">You have an exam in progress in this browser. The timer is still running.</p>
          <Link href={`/attempt/${resume}`} className="btn mt-3">Resume exam</Link>
        </div>
      )}
      <div className="prose-width mt-6 space-y-3">
        <p>{track.questionCount} questions, {track.durationMinutes} minutes. That&apos;s about {secs} seconds per question, so skip what you don&apos;t know, flag it, and come back at the end.</p>
        <p>One right answer per question. Wrong answers cost nothing, so answer everything.</p>
        <p>Closed book: no notes, search or AI assistants. We record when you leave the exam tab.</p>
        <p>Your answers save as you go. If your connection drops, reopen this page in the same browser to continue. The timer keeps running.</p>
        <p>Pass mark: {pass}%.{track.cooldownHours > 0 && ` If you don't pass, you can retake after ${track.cooldownHours} hours.`}</p>
      </div>
      <h2 className="display mt-10 text-27">Your details</h2>
      <StartForm trackId={track.id} minutes={track.durationMinutes} orgTypes={ORGANIZATION_TYPES.map((o) => ({ ...o }))} />
    </div>
  );
}
