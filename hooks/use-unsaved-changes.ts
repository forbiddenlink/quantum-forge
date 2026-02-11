'use client';

import { useEffect, useCallback } from 'react';

/**
 * Hook to warn users about unsaved changes when navigating away
 *
 * @param hasChanges - Whether there are unsaved changes
 * @param message - Custom warning message (optional)
 */
export function useUnsavedChanges(
  hasChanges: boolean,
  message = 'You have unsaved changes. Are you sure you want to leave?'
) {
  const handleBeforeUnload = useCallback(
    (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        // Modern browsers ignore custom messages but still show a dialog
        e.returnValue = message;
        return message;
      }
      return undefined;
    },
    [hasChanges, message]
  );

  useEffect(() => {
    if (hasChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
    return undefined;
  }, [hasChanges, handleBeforeUnload]);

  // Return a confirmation function for programmatic navigation
  const confirmNavigation = useCallback(() => {
    if (hasChanges) {
      return window.confirm(message);
    }
    return true;
  }, [hasChanges, message]);

  return { confirmNavigation };
}
