import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getTrack, trackName as nameOf, DOMAIN_NAMES, type Domain } from '@/lib/config/tracks';
import { certificateForAttempt, getAttemptFresh } from '@/lib/exam/attempts';
import { holdsAttempt } from '@/lib/exam/guard';
import { linkedInAddUrl, verifyUrl } from '@/lib/certs/linkedin';
import { sessionsForDomain } from '@/lib/content/resources';
import { emailEnabled } from '@/lib/env';
import { formatDate } from '@/lib/format';
import { DomainBars } from '@/components/DomainBars';
import { CopyButton } from '@/components/CopyButton';
import { CertificatePreview } from '@/components/CertificatePreview';
import { LocalTime } from '@/components/LocalTime';

export const metadata: Metadata = { title: 'Your result' };

export default async function ResultPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!(await holdsAttempt(attemptId))) {
    return (
      <div>
        <h1 className="display text-44">This result belongs to another browser</h1>
        <p className="mt-3">Results open only in the browser where the exam was taken. Certificates can be checked by anyone on the <Link href="/verify" className="link">verification page</Link>.</p>
      </div>
    );
  }
  const a = await getAttemptFresh(attemptId);
  if (!a) notFound();
  if (a.status === 'in_progress') redirect(`/attempt/${attemptId}`);
  if (a.status === 'voided') {
    return (
      <div>
        <h1 className="display text-44">This attempt was reset</h1>
        <p className="mt-3">Your trainer reset this attempt{a.voidReason ? `: ${a.voidReason}` : ''}. You can start the exam again.</p>
        <Link href={`/exam/${a.trackId}`} className="btn mt-4">Start again</Link>
      </div>
    );
  }

  const track = getTrack(a.trackId);
  const name = nameOf(a.trackId);
  const passMark = track?.passMark ?? 0.7;
  const pct = Math.round(Number(a.scorePct ?? 0));
  const scores = a.domainScores ?? {};
  const cert = a.passed ? await certificateForAttempt(a.id) : undefined;

  return (
    <div className="space-y-12">
      <section>
        <p className={`display score-in tnum text-[96px] leading-none ${a.passed ? 'text-pass' : 'text-fail'}`}>{pct}%</p>
        {a.passed ? (
          <h1 className="mt-4 text-27 font-semibold">You passed {name} with {pct}%.</h1>
        ) : (
          <h1 className="mt-4 text-27 font-semibold">You scored {pct}%. The pass mark is {Math.round(passMark * 100)}%.</h1>
        )}
        {a.status === 'expired' && <p className="mt-2 text-steel">Time ran out, so we graded the answers you had saved.</p>}
      </section>

      {cert && (
        <section className="space-y-5" aria-labelledby="cert-h">
          <h2 id="cert-h" className="display text-34">Your certificate</h2>
          <CertificatePreview trackName={name} fullName={cert.fullName} organization={cert.organization} certId={cert.id}
            issued={formatDate(cert.issuedAt)} expires={formatDate(cert.expiresAt)} />
          <div className="flex flex-wrap gap-3">
            <a className="btn" href={`/api/certificates/${cert.id}/pdf`} target="_blank" rel="noopener">Download certificate</a>
            <CopyButton text={verifyUrl(cert.id)} label="Copy verification link" />
            <a className="btn btn-secondary" target="_blank" rel="noopener noreferrer"
              href={linkedInAddUrl({ id: cert.id, trackName: name, issuedAt: cert.issuedAt, expiresAt: cert.expiresAt })}>Add to LinkedIn</a>
          </div>
          {emailEnabled() && <p>We&apos;ve sent the certificate to {cert.email}.</p>}
        </section>
      )}

      {!a.passed && <FocusAreas scores={scores} trackId={a.trackId} />}
      {!a.passed && track && track.cooldownHours > 0 && a.finishedAt && (
        <p>You can retake from <LocalTime iso={new Date(a.finishedAt.getTime() + track.cooldownHours * 3600_000).toISOString()} />.</p>
      )}

      <section aria-labelledby="dom-h">
        <h2 id="dom-h" className="display text-34">By domain</h2>
        <div className="mt-4"><DomainBars scores={scores} passMark={passMark} /></div>
      </section>
    </div>
  );
}

function FocusAreas({ scores, trackId }: { scores: Record<string, { correct: number; total: number }>; trackId: string }) {
  const weakest = Object.entries(scores).filter(([, s]) => s.total > 0)
    .sort((x, y) => x[1].correct / x[1].total - y[1].correct / y[1].total).slice(0, 3);
  return (
    <section aria-labelledby="focus-h">
      <h2 id="focus-h" className="display text-34">Where to focus</h2>
      <ul className="mt-4 space-y-4">
        {weakest.map(([d, s]) => (
          <li key={d}>
            <p className="font-semibold">{DOMAIN_NAMES[d as Domain] ?? d}: <span className="tnum">{s.correct} / {s.total}</span></p>
            <p className="text-15">
              Review:{' '}
              {sessionsForDomain(d, trackId).map((se, i) => (
                <span key={se.id}>{i > 0 && ', '}<Link className="link" href={`/resources#${se.id}`}>{se.title}</Link></span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
