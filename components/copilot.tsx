'use client';

import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui-store';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: () => void;
}

export function CopilotPanel() {
  const { copilotOpen, setCopilotOpen } = useUIStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState('');

  const quickActions: QuickAction[] = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View your overview',
      icon: '🏠',
      action: () => {
        router.push('/dashboard');
        setCopilotOpen(false);
      },
    },
    {
      id: 'tasks',
      title: 'Tasks',
      description: 'Manage your tasks',
      icon: '✓',
      action: () => {
        router.push('/tasks');
        setCopilotOpen(false);
      },
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'Browse all projects',
      icon: '📁',
      action: () => {
        router.push('/projects');
        setCopilotOpen(false);
      },
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View metrics',
      icon: '📊',
      action: () => {
        router.push('/analytics');
        setCopilotOpen(false);
      },
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Team members',
      icon: '👥',
      action: () => {
        router.push('/team');
        setCopilotOpen(false);
      },
    },
    {
      id: 'documents',
      title: 'Documents',
      description: 'Company files',
      icon: '📄',
      action: () => {
        router.push('/documents');
        setCopilotOpen(false);
      },
    },
    {
      id: 'calendar',
      title: 'Calendar',
      description: 'Your schedule',
      icon: '📅',
      action: () => {
        router.push('/calendar');
        setCopilotOpen(false);
      },
    },
    {
      id: 'wellness',
      title: 'Wellness',
      description: 'Focus tracking',
      icon: '🧘',
      action: () => {
        router.push('/wellness');
        setCopilotOpen(false);
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Preferences',
      icon: '⚙️',
      action: () => {
        router.push('/settings');
        setCopilotOpen(false);
      },
    },
  ];

  const filteredActions = React.useMemo(() => {
    if (!searchQuery) return quickActions;
    const query = searchQuery.toLowerCase();
    return quickActions.filter(
      (action) =>
        action.title.toLowerCase().includes(query) ||
        action.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Dialog.Root open={copilotOpen} onOpenChange={setCopilotOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content 
          className="fixed right-0 top-0 z-50 flex size-full max-w-2xl flex-col border-l border-border bg-background duration-300 animate-in slide-in-from-right"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="bg-accent-primary/20 flex size-10 items-center justify-center rounded-full">
                <svg className="size-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="heading-2">Quick Actions</h2>
                <p className="caption text-muted-foreground">Navigate your workspace</p>
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="rounded-lg p-2 transition-colors hover:bg-accent/10" aria-label="Close">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>
          </div>

          <div className="border-b border-border p-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search actions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 text-sm outline-none transition-colors focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
                autoFocus
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {filteredActions.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="glass-panel group animate-smooth rounded-xl p-4 text-left transition-all hover:scale-[1.02] hover:border-accent-primary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{action.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-medium group-hover:text-accent-primary">{action.title}</h3>
                        <p className="caption text-muted-foreground">{action.description}</p>
                      </div>
                      <svg 
                        className="size-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto mb-4 size-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-muted-foreground">No actions found</p>
                </div>
              </div>
            )}

            <div className="mt-6 rounded-xl border border-border bg-muted/20 p-4">
              <h3 className="mb-2 text-sm font-medium">Keyboard Shortcuts</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Command Bar</span>
                  <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">⌘K</kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quick Actions</span>
                  <kbd className="rounded border border-border bg-background px-2 py-1 text-xs">⌘⇧C</kbd>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CopilotFAB() {
  const { toggleCopilot } = useUIStore();

  return (
    <button
      onClick={toggleCopilot}
      className="bg-accent-primary shadow-elevation-high animate-smooth fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full transition-transform hover:scale-110"
      aria-label="Open Quick Actions"
    >
      <svg className="size-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </button>
  );
}
