import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE, isAdmin } from '@/lib/auth/access';

export async function requireAdmin(): Promise<void> {
  if (!isAdmin((await cookies()).get(ADMIN_COOKIE)?.value)) redirect('/admin/login');
}
