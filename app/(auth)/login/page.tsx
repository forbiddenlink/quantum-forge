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

  // Quick login for demo
  const quickLogin = async (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
    setIsLoading(true);

    const result = await signIn('credentials', {
      email: userEmail,
      password: userPassword,
      redirect: false,
    });

    if (!result?.error) {
      router.push('/dashboard');
      router.refresh();
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-900 via-background to-brand-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="gradient-accent w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            QF
          </div>
          <h1 className="heading-1 mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Quantum Forge account</p>
        </div>

        {/* Login Form */}
        <div className="glass-panel rounded-[28px] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-accent-critical/10 border border-accent-critical text-accent-critical text-sm">
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
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
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
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors animate-smooth font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="caption text-muted-foreground mb-3 text-center">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => quickLogin('admin@quantumforge.dev', 'admin123')}
                disabled={isLoading}
                className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg caption transition-colors animate-smooth disabled:opacity-50"
              >
                👤 Admin
              </button>
              <button
                onClick={() => quickLogin('sarah.chen@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg caption transition-colors animate-smooth disabled:opacity-50"
              >
                👤 Sarah
              </button>
              <button
                onClick={() => quickLogin('marcus.rodriguez@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg caption transition-colors animate-smooth disabled:opacity-50"
              >
                👤 Marcus
              </button>
              <button
                onClick={() => quickLogin('priya.patel@quantumforge.dev', 'password123')}
                disabled={isLoading}
                className="px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg caption transition-colors animate-smooth disabled:opacity-50"
              >
                👤 Priya
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
