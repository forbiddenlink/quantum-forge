import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lightweight Edge-compatible middleware
// Uses NextAuth session token check without importing heavy dependencies
export async function middleware(request: NextRequest) {
  const sessionToken =
    request.cookies.get('authjs.session-token')?.value ||
    request.cookies.get('__Secure-authjs.session-token')?.value;

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register');

  // Redirect to login if no session and trying to access protected route
  if (!sessionToken && !isAuthPage) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if has session and on auth page
  if (sessionToken && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tasks/:path*',
    '/projects/:path*',
    '/team/:path*',
    '/analytics/:path*',
    '/calendar/:path*',
    '/documents/:path*',
    '/wellness/:path*',
    '/settings/:path*',
    '/login',
    '/register',
  ],
};
