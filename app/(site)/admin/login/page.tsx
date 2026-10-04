import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, ADMIN_MAX_AGE, adminToken, cookieFlags, passwordMatches } from '@/lib/auth/access';

export const metadata: Metadata = { title: 'Admin sign-in' };

async function login(form: FormData) {
  'use server';
  if (!passwordMatches(String(form.get('password') ?? ''), process.env.ADMIN_PASSWORD)) {
    await new Promise((r) => setTimeout(r, 600));
    redirect('/admin/login?error=1');
  }
  (await cookies()).set(ADMIN_COOKIE, adminToken(), cookieFlags(ADMIN_MAX_AGE));
  redirect('/admin');
}

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div>
      <h1 className="display text-44">Admin</h1>
      <form action={login} className="mt-6 max-w-sm space-y-4">
        <div>
          <label htmlFor="password" className="label">Admin password</label>
          <input id="password" name="password" type="password" required autoFocus className="field" />
        </div>
        {error && <p role="alert" className="text-fail">That password doesn&apos;t match.</p>}
        <button className="btn" type="submit">Sign in</button>
      </form>
    </div>
  );
}
