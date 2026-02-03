import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface OptimisticMutationOptions<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  queryKey: string[];
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  optimisticUpdate?: (oldData: unknown, variables: TVariables) => unknown;
}

/**
 * Hook for mutations with optimistic updates and automatic toast notifications
 */
export function useOptimisticMutation<TData = unknown, TVariables = unknown>({
  mutationFn,
  queryKey,
  onSuccess,
  onError,
  successMessage,
  errorMessage,
  optimisticUpdate,
}: OptimisticMutationOptions<TData, TVariables>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    
    // Optimistic update
    onMutate: async (variables) => {
      if (!optimisticUpdate) return;

      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous value
      const previousData = queryClient.getQueryData(queryKey);

      // Optimistically update
      queryClient.setQueryData(queryKey, (old: unknown) => 
        optimisticUpdate(old, variables)
      );

      // Return context with previous data
      return { previousData };
    },

    // On success
    onSuccess: (data) => {
      if (successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(data);
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey });
    },

    // On error, rollback
    onError: (error: Error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
      
      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.error(error.message || 'An error occurred');
      }
      
      onError?.(error);
    },

    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

/**
 * Hook for creating items with optimistic updates
 */
export function useOptimisticCreate<TData = unknown, TVariables = unknown>(
  options: Omit<OptimisticMutationOptions<TData, TVariables>, 'optimisticUpdate'>
) {
  return useOptimisticMutation({
    ...options,
    optimisticUpdate: (oldData: unknown, variables: TVariables) => {
      // For arrays, add the new item optimistically
      if (Array.isArray(oldData)) {
        return [...oldData, { ...variables, id: `temp-${Date.now()}` }];
      }
      return oldData;
    },
  });
}

/**
 * Hook for updating items with optimistic updates
 */
export function useOptimisticUpdate<TData = unknown, TVariables = { id: string; [key: string]: unknown }>(
  options: Omit<OptimisticMutationOptions<TData, TVariables>, 'optimisticUpdate'>
) {
  return useOptimisticMutation({
    ...options,
    optimisticUpdate: (oldData: unknown, variables: TVariables) => {
      // For arrays, update the matching item
      if (Array.isArray(oldData)) {
        return oldData.map((item) =>
          item.id === (variables as { id: string }).id
            ? { ...item, ...variables }
            : item
        );
      }
      return oldData;
    },
  });
}

/**
 * Hook for deleting items with optimistic updates
 */
export function useOptimisticDelete<TData = unknown, TVariables = { id: string }>(
  options: Omit<OptimisticMutationOptions<TData, TVariables>, 'optimisticUpdate'>
) {
  return useOptimisticMutation({
    ...options,
    optimisticUpdate: (oldData: unknown, variables: TVariables) => {
      // For arrays, remove the item
      if (Array.isArray(oldData)) {
        return oldData.filter((item) => item.id !== (variables as { id: string }).id);
      }
      return oldData;
    },
  });
}

/**
 * Hook for toggling boolean properties with optimistic updates
 */
export function useOptimisticToggle<TData = unknown, TVariables = { id: string; field: string }>(
  options: Omit<OptimisticMutationOptions<TData, TVariables>, 'optimisticUpdate'>
) {
  return useOptimisticMutation({
    ...options,
    optimisticUpdate: (oldData: unknown, variables: TVariables) => {
      // For arrays, toggle the field on the matching item
      if (Array.isArray(oldData)) {
        return oldData.map((item) => {
          if (item.id === (variables as { id: string }).id) {
            const field = (variables as { field: string }).field;
            return { ...item, [field]: !item[field] };
          }
          return item;
        });
      }
      return oldData;
    },
  });
}

