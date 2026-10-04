import type { Metadata } from 'next';
import Link from 'next/link';
import { PUBLIC_TRACKS } from '@/lib/config/tracks';

export const metadata: Metadata = { title: 'Exams' };

export default function ExamsPage() {
  return (
    <div className="space-y-14">
      <section id="exams" aria-labelledby="tracks-h">
        <h1 id="tracks-h" className="display text-44">Exams</h1>
        <p className="prose-width mt-2">Pick the track that matches your role, study the material for it, then take the exam.</p>
        <table className="data mt-4 hidden sm:table">
          <thead>
            <tr><th scope="col">Track</th><th scope="col">Who it&apos;s for</th><th scope="col">Exam</th><th scope="col">Pass mark</th><th scope="col"><span className="sr-only">Action</span></th></tr>
          </thead>
          <tbody>
            {PUBLIC_TRACKS.map((t) => (
              <tr key={t.id}>
                <td className="font-semibold">{t.name}</td>
                <td>{t.audience}</td>
                <td className="whitespace-nowrap">{t.questionCount} questions, {t.durationMinutes} minutes</td>
                <td>{Math.round(t.passMark * 100)}%</td>
                <td className="whitespace-nowrap"><Link className="link font-semibold" href={`/exam/${t.id}`}>Start exam</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 sm:hidden">
          {PUBLIC_TRACKS.map((t) => (
            <div key={t.id} className="border-t border-ink py-4 last:border-b">
              <h3 className="text-21 font-semibold">{t.name}</h3>
              <p className="mt-1">{t.audience}</p>
              <p className="tnum mt-1 text-steel">{t.questionCount} questions, {t.durationMinutes} minutes. Pass mark {Math.round(t.passMark * 100)}%.</p>
              <Link className="link mt-2 inline-block font-semibold" href={`/exam/${t.id}`}>Start exam</Link>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="how-h">
        <h2 id="how-h" className="display text-34">How certification works</h2>
        <ol className="prose-width mt-4 list-decimal space-y-2 pl-6">
          <li>Study the <Link href="/resources" className="link">course material</Link> for your track.</li>
          <li>Take the exam in one sitting. Questions are drawn at random from the school&apos;s bank; each has one right answer.</li>
          <li>The timer runs on our server, so closing the tab does not pause it. Your answers save as you go.</li>
          <li>Pass and you get a certificate with a public verification link, valid for two years.</li>
        </ol>
      </section>
    </div>
  );
}
