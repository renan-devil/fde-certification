import 'server-only';
import { cookies } from 'next/headers';
import { attemptCookieName, attemptToken, safeEqual } from '@/lib/auth/access';

/** True when this browser holds the attempt's binding cookie. */
export async function holdsAttempt(attemptId: string): Promise<boolean> {
  const jar = await cookies();
  return safeEqual(jar.get(attemptCookieName(attemptId))?.value, attemptToken(attemptId));
}
