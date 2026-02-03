export { auth as middleware } from '@/lib/auth';

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
  ],
};
