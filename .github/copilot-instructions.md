# Quantum Forge - AI Assistant Instructions

An employee portal application transitioning from vanilla JavaScript to a modern production stack. **NO CONSTRAINTS** - use any technology stack, frameworks, and tools that improve code quality, maintainability, and user experience.

## Current State (Legacy - Being Modernized)

The original version was built for a contest with strict constraints (no frameworks, no build tools). This created technical debt including:
- Manual component management (35+ Web Components)
- CSS duplication and maintenance issues
- No type safety (vanilla JavaScript)
- No testing infrastructure
- Mock data only (no backend)
- Performance limitations

## Target Architecture (Modern Production Stack)

**Frontend Framework**: Next.js 15 (App Router) + React 19 + TypeScript
**Styling**: Tailwind CSS v4 + Shadcn/ui components
**State Management**: Zustand + TanStack Query (React Query)
**Backend**: Next.js API Routes + Prisma ORM + PostgreSQL
**Authentication**: NextAuth.js or Clerk
**Testing**: Vitest + React Testing Library + Playwright
**DevOps**: GitHub Actions + Vercel/AWS + Sentry monitoring

## Migration Strategy

The modernization follows a **hybrid approach**:
1. Create new Next.js project structure alongside legacy code
2. Port existing components to React + TypeScript
3. Replace CSS architecture with Tailwind CSS
4. Add backend functionality with real data persistence
5. Implement comprehensive testing
6. Deploy with modern CI/CD pipeline

**See MODERNIZATION_PLAN.md for detailed implementation roadmap.**

## Development Workflows (Modern Stack)

### Project Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint
```

### Component Development Pattern
```typescript
// Modern React + TypeScript component with Tailwind
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';

interface TaskSystemProps {
  userId: string;
}

export function TaskSystem({ userId }: TaskSystemProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => fetchTasks(userId),
  });

  if (isLoading) return <TaskSystemSkeleton />;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      {/* Component content */}
    </Card>
  );
}
```

### State Management with Zustand
```typescript
import { create } from 'zustand';

interface ThemeStore {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
```

### API Routes
```typescript
// app/api/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const tasks = await prisma.task.findMany({
    where: { userId: request.user.id },
  });
  return NextResponse.json(tasks);
}
```

## Legacy Code Reference (Being Phased Out)

The `legacy/` directory contains the original vanilla JavaScript implementation. Key patterns being migrated:

- **Web Components** → React components with hooks
- **CSS Variables** → Tailwind CSS utility classes
- **Global window services** → React Context + Zustand stores
- **Manual event dispatch** → React props and callbacks
- **Chart.js via CDN** → Recharts or Chart.js via npm

When working on this codebase:
- Prioritize building in the modern stack (Next.js + React + TypeScript)
- Reference legacy code only for understanding business logic and UX patterns
- Use Tailwind CSS for all styling needs
- Implement proper TypeScript types for all components and functions
- Write tests for all new features
- Follow React and Next.js best practices
