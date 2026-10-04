'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, cookieFlags, passwordMatches } from '@/lib/auth/access';

export type EnterState = { error?: string };

export async function enter(_prev: EnterState, form: FormData): Promise<EnterState> {
  const password = String(form.get('password') ?? '');
  if (!passwordMatches(password, process.env.SITE_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 400));
    return { error: "That password doesn't match. Check with your trainer." };
  }
  (await cookies()).set(ACCESS_COOKIE, accessToken(), cookieFlags(ACCESS_MAX_AGE));
  const next = String(form.get('next') ?? '/');
  redirect(next.startsWith('/') && !next.startsWith('//') ? next : '/');
}
