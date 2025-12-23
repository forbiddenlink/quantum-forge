# ⚡ Quick Start Guide - Quantum Forge v2.0

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL running

### Installation

```bash
# 1. Install dependencies
pnpm install

# 2. Setup environment
cp .env.example .env
# Edit .env with your DATABASE_URL and NEXTAUTH_SECRET

# 3. Setup database
pnpm db:generate
pnpm db:push
pnpm db:seed

# 4. Start development server
pnpm dev
```

Visit `http://localhost:3000` 🎉

---

## 📝 Common Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Check linting
pnpm lint:fix         # Fix linting issues
pnpm format           # Format code
pnpm type-check       # Check TypeScript

# Testing
pnpm test             # Run unit tests
pnpm test:ui          # Run tests with UI
pnpm test:e2e         # Run E2E tests
pnpm test:coverage    # Generate coverage report

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Create migration
pnpm db:seed          # Seed database
pnpm db:studio        # Open Prisma Studio
pnpm db:reset         # Reset database
```

---

## 🎯 Key Features

### 1. Server Actions
```typescript
import { createTask } from '@/app/actions/tasks';

const result = await createTask({
  title: 'New Task',
  priority: 'HIGH',
});
```

### 2. Toast Notifications
```typescript
import { toast } from 'sonner';

toast.success('Success!');
toast.error('Error!');
toast.loading('Loading...');
```

### 3. Loading States
```typescript
import { SkeletonCard } from '@/components/ui/skeleton';

{isLoading ? <SkeletonCard /> : <DataCard />}
```

### 4. Error Boundaries
```typescript
import { ErrorBoundary } from '@/components/error-boundary';

<ErrorBoundary>
  <YourComponent />
</ErrorBoundary>
```

### 5. Animations
```typescript
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div variants={fadeInUp} initial="hidden" animate="visible">
  Content
</motion.div>
```

---

## 📚 Documentation

- **[UPDATES.md](./UPDATES.md)** - What's new
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - How to migrate
- **[COMPREHENSIVE_REVIEW_SUMMARY.md](./COMPREHENSIVE_REVIEW_SUMMARY.md)** - Full review

---

## 🆘 Troubleshooting

### Build fails
```bash
rm -rf .next node_modules pnpm-lock.yaml
pnpm install
```

### Database issues
```bash
pnpm db:reset
pnpm db:seed
```

### Type errors
```bash
pnpm db:generate
pnpm type-check
```

---

## 🎉 You're Ready!

Start building amazing features with Quantum Forge v2.0!

