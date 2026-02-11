'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Command as CommandPrimitive } from 'cmdk';
import * as Dialog from '@radix-ui/react-dialog';
import { useUIStore } from '@/store/ui-store';
import { useModalsStore } from '@/store/modals-store';
import { NAV_ITEMS } from '@/lib/constants';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
  category?: 'navigation' | 'actions' | 'search';
}

export function CommandBar() {
  const router = useRouter();
  const { commandBarOpen, setCommandBarOpen } = useUIStore();
  const { openTaskModal, openProjectModal } = useModalsStore();
  const [search, setSearch] = React.useState('');

  // Navigation commands
  const navigationCommands: CommandItem[] = NAV_ITEMS.map((item) => ({
    id: `nav-${item.href}`,
    label: item.label,
    description: `Go to ${item.label}`,
    icon: (
      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
    onSelect: () => {
      router.push(item.href);
      setCommandBarOpen(false);
    },
    category: 'navigation',
  }));

  // Action commands
  const actionCommands: CommandItem[] = [
    {
      id: 'new-task',
      label: 'Create New Task',
      description: 'Add a task to your board',
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      shortcut: 'Cmd+T',
      onSelect: () => {
        openTaskModal();
        setCommandBarOpen(false);
      },
      category: 'actions',
    },
    {
      id: 'new-project',
      label: 'Create New Project',
      description: 'Start a new project',
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      shortcut: 'Cmd+P',
      onSelect: () => {
        openProjectModal();
        setCommandBarOpen(false);
      },
      category: 'actions',
    },
    {
      id: 'toggle-theme',
      label: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      shortcut: 'Cmd+Shift+L',
      onSelect: () => {
        // TODO: Toggle theme
        setCommandBarOpen(false);
      },
      category: 'actions',
    },
    {
      id: 'search-docs',
      label: 'Search Documentation',
      description: 'Find documents and files',
      icon: (
        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      shortcut: 'Cmd+F',
      onSelect: () => {
        router.push('/documents');
        setCommandBarOpen(false);
      },
      category: 'search',
    },
  ];

  const allCommands = [...navigationCommands, ...actionCommands];

  const filteredCommands = React.useMemo(() => {
    if (!search) return allCommands;
    
    const searchLower = search.toLowerCase();
    return allCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(searchLower) ||
        cmd.description?.toLowerCase().includes(searchLower)
    );
  }, [search, allCommands]);

  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filteredCommands.forEach((cmd) => {
      const category = cmd.category || 'other';
      if (!groups[category]) groups[category] = [];
      groups[category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  return (
    <Dialog.Root open={commandBarOpen} onOpenChange={setCommandBarOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in" />
        <Dialog.Content 
          className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 duration-200 animate-in fade-in zoom-in-95"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandPrimitive
            className="glass-panel shadow-elevation-high overflow-hidden rounded-2xl border border-white/20"
            shouldFilter={false}
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">
              <svg className="size-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <CommandPrimitive.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="caption rounded border border-border bg-muted px-2 py-1">
                Esc
              </kbd>
            </div>

            <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <CommandPrimitive.Empty className="py-12 text-center">
                  <div className="mb-2 text-muted-foreground">No results found</div>
                  <div className="caption text-muted-foreground">
                    Try searching for something else
                  </div>
                </CommandPrimitive.Empty>
              ) : (
                <>
                  {Object.entries(groupedCommands).map(([category, commands]) => (
                    <CommandPrimitive.Group
                      key={category}
                      heading={
                        <div className="caption flex items-center gap-2 px-3 py-2 font-medium text-muted-foreground">
                          {category === 'navigation' && (
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="3 11 22 2 13 21 11 13 3 11" />
                            </svg>
                          )}
                          {category === 'actions' && (
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                          )}
                          {category === 'search' && (
                            <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="11" cy="11" r="8" />
                              <path d="m21 21-4.35-4.35" />
                            </svg>
                          )}
                          {category === 'navigation' ? 'Navigation' :
                           category === 'actions' ? 'Actions' :
                           category === 'search' ? 'Search' : 'Other'}
                        </div>
                      }
                      className="mb-2"
                    >
                      {commands.map((command) => (
                        <CommandPrimitive.Item
                          key={command.id}
                          value={command.label}
                          onSelect={command.onSelect}
                          className="animate-smooth group flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent/10 data-[selected=true]:bg-accent/20"
                        >
                          <div className="shrink-0 text-muted-foreground transition-colors group-data-[selected=true]:text-foreground">
                            {command.icon}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="mb-0.5 font-medium">{command.label}</div>
                            {command.description && (
                              <div className="caption truncate text-muted-foreground">
                                {command.description}
                              </div>
                            )}
                          </div>
                          {command.shortcut && (
                            <kbd className="caption rounded border border-border bg-muted px-2 py-1 text-muted-foreground">
                              {command.shortcut}
                            </kbd>
                          )}
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>
                  ))}
                </>
              )}
            </CommandPrimitive.List>

            <div className="flex items-center justify-between border-t border-white/10 bg-accent/5 px-4 py-3">
              <div className="caption flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↑</kbd>
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="rounded border border-border bg-muted px-1.5 py-0.5">↵</kbd>
                  <span>Select</span>
                </div>
              </div>
              <div className="caption text-muted-foreground">
                Powered by Quantum Forge AI
              </div>
            </div>
          </CommandPrimitive>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
