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
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in" />
        <Dialog.Content 
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-in fade-in zoom-in-95 duration-200"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <CommandPrimitive.Root
            className="glass-panel rounded-[28px] overflow-hidden shadow-elevation-high border border-white/20"
            shouldFilter={false}
          >
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <CommandPrimitive.Input
                value={search}
                onValueChange={setSearch}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
              />
              <kbd className="caption px-2 py-1 bg-muted rounded border border-border">
                Esc
              </kbd>
            </div>

            <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <CommandPrimitive.Empty className="py-12 text-center">
                  <div className="text-muted-foreground mb-2">No results found</div>
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
                        <div className="caption font-medium text-muted-foreground px-3 py-2">
                          {category === 'navigation' ? '🧭 Navigation' :
                           category === 'actions' ? '⚡ Actions' :
                           category === 'search' ? '🔍 Search' : 'Other'}
                        </div>
                      }
                      className="mb-2"
                    >
                      {commands.map((command) => (
                        <CommandPrimitive.Item
                          key={command.id}
                          value={command.label}
                          onSelect={command.onSelect}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer hover:bg-accent/10 data-[selected=true]:bg-accent/20 transition-colors animate-smooth group"
                        >
                          <div className="flex-shrink-0 text-muted-foreground group-data-[selected=true]:text-foreground transition-colors">
                            {command.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium mb-0.5">{command.label}</div>
                            {command.description && (
                              <div className="caption text-muted-foreground truncate">
                                {command.description}
                              </div>
                            )}
                          </div>
                          {command.shortcut && (
                            <kbd className="caption px-2 py-1 bg-muted rounded border border-border text-muted-foreground">
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

            <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-accent/5">
              <div className="flex items-center gap-4 caption text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded border border-border">↵</kbd>
                  <span>Select</span>
                </div>
              </div>
              <div className="caption text-muted-foreground">
                Powered by Quantum Forge AI
              </div>
            </div>
          </CommandPrimitive.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
