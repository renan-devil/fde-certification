'use client';
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { LocalTime } from '@/components/LocalTime';
import { start, type StartState } from './actions';

type Props = { trackId: string; minutes: number; orgTypes: { id: string; label: string }[] };

export function StartForm({ trackId, minutes, orgTypes }: Props) {
  const [state, action, pending] = useActionState<StartState, FormData>(start, { kind: 'idle' });
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const name = `${first.trim()} ${last.trim()}`.trim();

  return (
    <form action={action} className="mt-6 max-w-xl space-y-5">
      <input type="hidden" name="trackId" value={trackId} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="label">First name</label>
          <input id="firstName" name="firstName" required maxLength={80} autoComplete="given-name" className="field" value={first} onChange={(e) => setFirst(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName" className="label">Last name</label>
          <input id="lastName" name="lastName" required maxLength={80} autoComplete="family-name" className="field" value={last} onChange={(e) => setLast(e.target.value)} />
        </div>
      </div>
      <p className="text-15 text-steel" aria-live="polite">Name on your certificate: <span className="font-semibold text-ink">{name || '…'}</span></p>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} autoComplete="email" className="field" />
      </div>
      <div>
        <label htmlFor="organization" className="label">Organization</label>
        <input id="organization" name="organization" required maxLength={120} autoComplete="organization" className="field" />
      </div>
      <fieldset>
        <legend className="label">Organization type</legend>
        <div className="mt-1 space-y-1">
          {orgTypes.map((o) => (
            <label key={o.id} className="flex min-h-11 items-center gap-3">
              <input type="radio" name="organizationType" value={o.id} required className="h-5 w-5 accent-ink" />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="flex items-start gap-3">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-ink" />
        <span>I agree that my name, organization and results are stored to issue and verify my certificate, as described in the <Link href="/privacy" className="link">privacy notice</Link>.</span>
      </label>

      <div role="alert" aria-live="assertive">
        {state.kind === 'invalid' && <p className="text-fail">{state.message}</p>}
        {state.kind === 'certified' && (
          <p>You already hold this certificate.{' '}
            <a className="link" href={`/api/certificates/${state.certId}/pdf`} target="_blank" rel="noopener">Download the PDF</a> or{' '}
            <Link className="link" href={`/verify/${state.certId}`}>open the verification page</Link>.</p>
        )}
        {state.kind === 'running_elsewhere' && <p className="text-fail">An attempt is already running for this email in another browser. Ask your trainer to reset it.</p>}
        {state.kind === 'cooldown' && <p className="text-fail">You can retake this exam from <LocalTime iso={state.until} />.</p>}
        {state.kind === 'closed' && <p className="text-fail">This exam opens soon.</p>}
        {state.kind === 'error' && <p className="text-fail">Something went wrong on our side and the exam did not start. Try again in a minute; if it keeps failing, tell your trainer.</p>}
      </div>

      <button type="submit" className="btn" disabled={pending}>{pending ? 'Starting…' : `Start exam (${minutes} minutes)`}</button>
    </form>
  );
}
