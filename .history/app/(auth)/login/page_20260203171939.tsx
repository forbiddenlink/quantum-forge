'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-900 via-background to-brand-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="gradient-accent mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl text-2xl font-bold text-white">
            QF
          </div>
          <h1 className="heading-1 mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Quantum Forge account</p>
        </div>

        {/* Login Form */}
        <div className="glass-panel rounded-[28px] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-accent-critical/10 rounded-lg border border-accent-critical p-3 text-sm text-accent-critical">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="label">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="animate-smooth w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 border-t border-border pt-6">
            <p className="caption mb-3 text-center text-muted-foreground">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin('admin@quantumforge.dev', 'admin123')}
                disabled={isLoading}
                className="caption animate-smooth flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80 disabled:opacity-50"
              >
                <svg className="size-4 text-accent-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Admin
              </button>
              <button
                onClick={() => quickLogin('sarah.chen@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="caption animate-smooth flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80 disabled:opacity-50"
              >
                <svg className="size-4 text-accent-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Sarah
              </button>
              <button
                onClick={() => quickLogin('marcus.rodriguez@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="caption animate-smooth flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80 disabled:opacity-50"
              >
                <svg className="size-4 text-accent-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Marcus
              </button>
              <button
                onClick={() => quickLogin('priya.patel@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="caption animate-smooth flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 transition-colors hover:bg-muted/80 disabled:opacity-50"
              >
                <svg className="size-4 text-accent-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Priya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
