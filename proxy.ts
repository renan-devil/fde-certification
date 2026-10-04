// Access gate (docs/SPEC.md section 7): every page needs the shared-password cookie, except the
// public routes below; the admin area also needs the admin cookie.
import { NextResponse, type NextRequest } from 'next/server';
import { ACCESS_COOKIE, ADMIN_COOKIE, hasAccess, isAdmin } from '@/lib/auth/access';

function isPublic(path: string): boolean {
  return (
    path === '/enter' ||
    path === '/privacy' ||
    path === '/agents' ||
    path === '/agents.md' ||
    path === '/FDEbasics.md' ||
    path === '/verify' ||
    path.startsWith('/verify/') ||
    /^\/api\/certificates\/[^/]+\/pdf$/.test(path)
  );
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const res = isPublic(pathname) ? NextResponse.next() : gate(request, pathname, search);
  res.headers.set('X-Robots-Tag', 'noindex');
  return res;
}

function gate(request: NextRequest, pathname: string, search: string) {
  if (!hasAccess(request.cookies.get(ACCESS_COOKIE)?.value)) {
    if (pathname.startsWith('/api/')) return new NextResponse('Access required', { status: 401 });
    const url = new URL('/enter', request.url);
    url.searchParams.set('next', pathname + search);
    return NextResponse.redirect(url);
  }
  const adminArea = (pathname.startsWith('/admin') && pathname !== '/admin/login') || pathname.startsWith('/api/admin');
  if (adminArea && !isAdmin(request.cookies.get(ADMIN_COOKIE)?.value)) {
    if (pathname.startsWith('/api/')) return new NextResponse('Admin access required', { status: 401 });
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Everything except framework files, the favicon, robots.txt and the logos.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|logos/).*)'],
};
