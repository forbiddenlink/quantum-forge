'use client';

import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: Readonly<FallbackProps>) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="glass-panel w-full max-w-md rounded-2xl p-8 text-center">
        <div className="bg-accent-critical/20 mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
          <svg
            className="size-8 text-accent-critical"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="heading-2 mb-2">Something went wrong</h1>
        <p className="mb-6 text-muted-foreground">
          We apologize for the inconvenience. An error occurred while loading this page.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-lg bg-muted p-4 text-left">
            <p className="caption mb-2 font-mono text-accent-critical">Error Details:</p>
            <p className="caption break-all font-mono text-muted-foreground">
              {error instanceof Error ? error.message : String(error)}
            </p>
          </div>
        )}
        
        <div className="flex justify-center gap-3">
          <button
            onClick={resetErrorBoundary}
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try Again
          </button>
          <button
            onClick={() => (globalThis.location.href = '/')}
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-accent/5"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: unknown, errorInfo: React.ErrorInfo) => void;
}

export function ErrorBoundary({ children, onError }: Readonly<ErrorBoundaryProps>) {
  const handleError = React.useCallback(
    (error: unknown, errorInfo: React.ErrorInfo) => {
      // Log error to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error Boundary caught an error:', error, errorInfo);
      }
      
      // Call custom error handler if provided
      onError?.(error, errorInfo);
      
      // TODO: Send to error tracking service (Sentry, etc.)
      // if (typeof window !== 'undefined' && window.Sentry) {
      //   window.Sentry.captureException(error, { contexts: { react: errorInfo } });
      // }
    },
    [onError]
  );

  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={handleError}>
      {children}
    </ReactErrorBoundary>
  );
}

/**
 * Lightweight error boundary for specific components
 */
export function ComponentErrorBoundary({ 
  children, 
  fallback 
}: Readonly<{ 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}>) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error: _error, resetErrorBoundary }) => (
        fallback || (
          <div className="border-accent-critical/20 bg-accent-critical/5 rounded-lg border p-4">
            <p className="mb-2 text-sm text-accent-critical">Failed to load component</p>
            <button
              onClick={resetErrorBoundary}
              className="text-xs text-muted-foreground underline hover:text-foreground"
            >
              Retry
            </button>
          </div>
        )
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
}

