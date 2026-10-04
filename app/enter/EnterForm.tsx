'use client';
import { useActionState } from 'react';
import { enter, type EnterState } from './actions';

export function EnterForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<EnterState, FormData>(enter, {});
  return (
    <form action={action} className="mt-8 max-w-sm space-y-4">
      <input type="hidden" name="next" value={next} />
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" required autoFocus autoComplete="current-password"
          className="field" aria-invalid={Boolean(state.error)} aria-describedby={state.error ? 'pw-error' : undefined} />
      </div>
      {state.error && <p id="pw-error" role="alert" className="text-fail">{state.error}</p>}
      <button type="submit" className="btn" disabled={pending}>Continue</button>
    </form>
  );
}
