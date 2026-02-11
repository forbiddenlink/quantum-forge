'use client';

import { Toaster as Sonner } from 'sonner';
import { useTheme } from 'next-themes';

export function Toaster() {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as 'light' | 'dark' | 'system'}
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: 'glass-panel rounded-xl border border-border shadow-elevation-high',
          title: 'font-medium text-foreground',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground hover:bg-primary/90',
          cancelButton: 'bg-muted text-muted-foreground hover:bg-muted/80',
          error: 'border-accent-critical/20 bg-accent-critical/5',
          success: 'border-accent-success/20 bg-accent-success/5',
          warning: 'border-accent-warning/20 bg-accent-warning/5',
          info: 'border-accent-secondary/20 bg-accent-secondary/5',
        },
      }}
      richColors
      closeButton
      duration={4000}
    />
  );
}

