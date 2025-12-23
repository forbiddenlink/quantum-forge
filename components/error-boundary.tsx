'use client';

import * as React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full glass-panel rounded-[28px] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent-critical/20 flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-accent-critical"
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
        <p className="text-muted-foreground mb-6">
          We apologize for the inconvenience. An error occurred while loading this page.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 rounded-lg bg-muted text-left">
            <p className="caption font-mono text-accent-critical mb-2">Error Details:</p>
            <p className="caption font-mono text-muted-foreground break-all">
              {error.message}
            </p>
          </div>
        )}
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Try Again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-3 rounded-lg border border-border hover:bg-accent/5 transition-colors font-medium"
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
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  const handleError = React.useCallback(
    (error: Error, errorInfo: React.ErrorInfo) => {
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
}: { 
  children: React.ReactNode; 
  fallback?: React.ReactNode;
}) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        fallback || (
          <div className="p-4 rounded-lg border border-accent-critical/20 bg-accent-critical/5">
            <p className="text-sm text-accent-critical mb-2">Failed to load component</p>
            <button
              onClick={resetErrorBoundary}
              className="text-xs underline text-muted-foreground hover:text-foreground"
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

