import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

function isAuthenticated(cookies: NextRequest['cookies']) {
  const isLoggedIn = cookies?.get('access_token');

  return !!isLoggedIn;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/auth/super-reset') return NextResponse.next();

  if (isAuthenticated(request.cookies)) {
    if (pathname.startsWith('/auth/login') || !pathname.startsWith('/'))
      return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  if (!isAuthenticated(request.cookies) && !pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/api(.*)', '/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
