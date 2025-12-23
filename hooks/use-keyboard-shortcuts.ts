import { useEffect } from 'react';
import { useUIStore } from '@/store/ui-store';

/**
 * Custom hook for keyboard shortcuts
 * Implements Design Vision: Copilot Interaction Patterns
 * 
 * Shortcuts:
 * - Cmd/Ctrl + K: Command bar
 * - /: Focus search
 * - Cmd/Ctrl + Shift + C: Copilot panel
 */
export function useKeyboardShortcuts() {
  const { toggleCommandBar, toggleCopilot } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Open command bar
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandBar();
      }

      // Cmd/Ctrl + Shift + C: Open Copilot
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'c') {
        e.preventDefault();
        toggleCopilot();
      }

      // /: Focus search (when not in input)
      if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        toggleCommandBar();
      }

      // Esc: Close overlays
      if (e.key === 'Escape') {
        const { commandBarOpen, copilotOpen, setCommandBarOpen, setCopilotOpen } =
          useUIStore.getState();
        if (commandBarOpen) setCommandBarOpen(false);
        if (copilotOpen) setCopilotOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandBar, toggleCopilot]);
}
