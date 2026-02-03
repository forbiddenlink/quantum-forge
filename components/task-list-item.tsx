'use client';

import { useState } from 'react';
import { toggleTaskCompletion } from '@/app/actions/tasks';
import { getRelativeTime } from '@/lib/utils';
import { useOptimisticToggle } from '@/hooks/use-optimistic-mutation';

interface Task {
  id: string;
  title: string;
  status: string;
  priority: string;
  dueDate: Date | string;
}

interface TaskListItemProps {
  task: Task;
}

export function TaskListItem({ task }: TaskListItemProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'DONE');

  // Optimistic toggle mutation
  const toggleMutation = useOptimisticToggle({
    mutationFn: async () => {
      const result = await toggleTaskCompletion(task.id);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    queryKey: ['recent-tasks'],
    successMessage: isCompleted ? 'Task marked as incomplete' : 'Task completed! 🎉',
    errorMessage: 'Failed to update task',
  });

  const handleToggle = () => {
    // Optimistically update UI
    setIsCompleted(!isCompleted);
    
    // Trigger mutation
    toggleMutation.mutate({
      id: task.id,
      field: 'completed',
    });
  };

  const getPriorityStyles = (priority: string) => {
    if (priority === 'URGENT' || priority === 'HIGH') {
      return 'bg-accent-critical/20 text-accent-critical';
    }
    if (priority === 'MEDIUM') {
      return 'bg-accent-warning/20 text-accent-warning';
    }
    return 'bg-neutral-200 text-neutral-400';
  };

  return (
    <div className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-accent/5">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={handleToggle}
        disabled={toggleMutation.isPending}
        className="size-5 cursor-pointer rounded border-border disabled:opacity-50"
        aria-label={`Mark ${task.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
      />
      
      <div className="flex-1">
        <h3 className={`mb-1 font-medium ${isCompleted ? 'text-muted-foreground line-through' : ''}`}>
          {task.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className={`caption rounded-full px-2 py-1 ${getPriorityStyles(task.priority)}`}>
            {task.priority}
          </span>
          <span className="caption text-muted-foreground">
            Due {getRelativeTime(task.dueDate)}
          </span>
        </div>
      </div>
      
      <button
        className="rounded-lg p-2 transition-colors hover:bg-accent/10"
        aria-label="Task options"
      >
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
    </div>
  );
}

