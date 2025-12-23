# 📋 Quantum Forge Database Setup Instructions

Since we don't have a PostgreSQL database running yet, here are your options:

## Option 1: Local PostgreSQL (Recommended for Development)

### Using Homebrew (macOS):
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create database
createdb quantum-forge

# Update .env file
DATABASE_URL="postgresql://$(whoami)@localhost:5432/quantum-forge?schema=public"
```

### Using Docker:
```bash
# Run PostgreSQL container
docker run --name quantum-forge-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=quantum-forge \
  -p 5432:5432 \
  -d postgres:15-alpine

# Update .env file
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quantum-forge?schema=public"
```

## Option 2: Cloud Database (Production-Ready)

### Vercel Postgres:
1. Visit https://vercel.com/dashboard
2. Create new project
3. Add Postgres storage
4. Copy DATABASE_URL from environment variables

### Supabase:
1. Visit https://supabase.com
2. Create new project
3. Go to Settings → Database
4. Copy connection string (Session mode for Prisma)

### Neon (Free Tier Available):
1. Visit https://neon.tech
2. Create new project
3. Copy connection string

## After Setting Up Database:

```bash
# Push schema to database
pnpm db:push

# Seed with demo data
pnpm db:seed

# Open Prisma Studio to view data
pnpm db:studio
```

## Next Steps:
1. Choose a database option above
2. Create `.env` file with your DATABASE_URL
3. Run `pnpm db:push` to create tables
4. Run `pnpm db:seed` to add demo data
5. Restart dev server: `pnpm dev`
