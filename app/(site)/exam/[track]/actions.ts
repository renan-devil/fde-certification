'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { attemptCookieName, attemptToken, cookieFlags, safeEqual } from '@/lib/auth/access';
import { getTrack } from '@/lib/config/tracks';
import { ORGANIZATION_TYPES, startAttempt } from '@/lib/exam/attempts';

export type StartState =
  | { kind: 'idle' }
  | { kind: 'invalid'; message: string }
  | { kind: 'certified'; certId: string }
  | { kind: 'running_elsewhere' }
  | { kind: 'cooldown'; until: string }
  | { kind: 'closed' }
  | { kind: 'error' };

const formSchema = z.object({
  trackId: z.string(),
  firstName: z.string().trim().min(1, 'Enter your first name.').max(80),
  lastName: z.string().trim().min(1, 'Enter your last name.').max(80),
  email: z.string().trim().email('Enter a valid email address.').max(200),
  organization: z.string().trim().min(1, 'Enter your organization.').max(120),
  organizationType: z.enum(ORGANIZATION_TYPES.map((o) => o.id) as [string, ...string[]], { message: 'Choose an organization type.' }),
  consent: z.literal('on', { message: 'Tick the consent box to continue.' }),
});

export async function start(_prev: StartState, form: FormData): Promise<StartState> {
  const parsed = formSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { kind: 'invalid', message: parsed.error.issues[0].message };
  const track = getTrack(parsed.data.trackId);
  if (!track) return { kind: 'closed' };

  const jar = await cookies();
  let outcome;
  try {
    outcome = await startAttempt(parsed.data, (id) => safeEqual(jar.get(attemptCookieName(id))?.value, attemptToken(id)));
  } catch (e) {
    console.error('startAttempt failed', e);
    return { kind: 'error' };
  }
  if (outcome.kind === 'started' || outcome.kind === 'resume') {
    if (outcome.kind === 'started') {
      jar.set(attemptCookieName(outcome.attemptId), attemptToken(outcome.attemptId),
        cookieFlags(track.durationMinutes * 60 + 7 * 24 * 3600));
    }
    redirect(`/attempt/${outcome.attemptId}`);
  }
  if (outcome.kind === 'cooldown') return { kind: 'cooldown', until: outcome.until.toISOString() };
  if (outcome.kind === 'certified') return outcome;
  if (outcome.kind === 'running_elsewhere') return outcome;
  return { kind: 'closed' };
}
