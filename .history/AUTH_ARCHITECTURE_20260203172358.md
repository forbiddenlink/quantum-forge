# Authentication Architecture

## Edge Runtime Middleware

The middleware uses a **lightweight Edge-compatible** implementation that checks for session tokens without importing heavy dependencies like Prisma or bcryptjs.

### Why?

Vercel Edge Runtime has a **1MB bundle size limit**. The full NextAuth config with Prisma and bcryptjs exceeds this limit.

### How it works

**middleware.ts** (Edge Runtime - ~50KB):
- Checks for session cookie presence only
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from auth pages
- No database queries or bcrypt operations

**lib/auth.ts** (Node.js Runtime):
- Full NextAuth configuration
- Database queries via Prisma
- Password hashing with bcryptjs
- Used ONLY in API Routes and Server Components

**lib/auth-helpers.ts** (Node.js Runtime):
- Server-side utilities for authentication
- `requireAuth()` - Protect Server Components
- `getCurrentUser()` - Get current session
- `getServerSession()` - Manual session access

## Usage Examples

### Middleware (Automatic)
```typescript
// No code needed - middleware.ts handles all protected routes
```

### API Routes
```typescript
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  // ...
}
```

### Server Components
```typescript
import { requireAuth } from '@/lib/auth-helpers';

export default async function DashboardPage() {
  const session = await requireAuth(); // Auto-redirects if not authenticated
  return <div>Welcome {session.user.name}</div>;
}
```

### Client Components
```typescript
'use client';
import { useSession } from 'next-auth/react';

export function UserProfile() {
  const { data: session } = useSession();
  // ...
}
```

## Session Cookies

NextAuth sets cookies based on environment:
- Development: `authjs.session-token`
- Production (HTTPS): `__Secure-authjs.session-token`

The middleware checks both to work in all environments.

## Security Notes

1. ✅ Session tokens are httpOnly and secure
2. ✅ Middleware blocks unauthenticated access at the edge
3. ✅ API routes verify full session with database
4. ✅ No sensitive logic in Edge Runtime
5. ✅ Password hashing only in secure Node.js runtime

## Performance Benefits

- Edge middleware runs globally at <50ms
- No database queries in middleware = faster redirects
- Full auth logic only runs when needed (API routes)
- Smaller bundle = faster cold starts
