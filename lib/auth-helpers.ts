import 'server-only';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

/**
 * Server-side authentication helper for Server Components and API Routes
 * Uses the full auth config with Prisma and bcryptjs (Node.js runtime only)
 */
export async function getServerSession() {
  return await auth();
}

/**
 * Require authentication in Server Components
 * Redirects to login if not authenticated
 */
export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    redirect('/login');
  }

  return session;
}

/**
 * Get current user or null
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user || null;
}
