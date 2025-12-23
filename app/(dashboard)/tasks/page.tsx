'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskModal } from '@/components/modals/task-modal';
import { getRelativeTime } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: Date | null;
  user: {
    name: string;
    avatar: string | null;
  };
  project: {
    name: string;
  } | null;
}

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
  });

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      const res = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete task');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    }
  };

  const handleModalSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  };

  const groupedTasks = {
    todo: tasks.filter((t) => t.status === 'TODO'),
    inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS'),
    inReview: tasks.filter((t) => t.status === 'IN_REVIEW'),
    done: tasks.filter((t) => t.status === 'DONE'),
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-accent-critical/20 text-accent-critical border-accent-critical';
      case 'HIGH': return 'bg-accent-warning/20 text-accent-warning border-accent-warning';
      case 'MEDIUM': return 'bg-accent-primary/20 text-accent-primary border-accent-primary';
      case 'LOW': return 'bg-neutral-200 text-neutral-400 border-neutral-300';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {['todo', 'progress', 'review', 'done'].map((status) => (
              <div key={status} className="glass-panel rounded-[28px] p-6 h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Tasks</h1>
          <p className="text-muted-foreground">Manage your work and track progress</p>
        </div>
        <button 
          onClick={handleCreateTask}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors animate-smooth font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">To Do</div>
          <div className="heading-1 text-neutral-400">{groupedTasks.todo.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">In Progress</div>
          <div className="heading-1 text-accent-primary">{groupedTasks.inProgress.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">In Review</div>
          <div className="heading-1 text-accent-warning">{groupedTasks.inReview.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Done</div>
          <div className="heading-1 text-accent-success">{groupedTasks.done.length}</div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* To Do Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
            <h2 className="font-semibold">To Do</h2>
            <span className="caption text-muted-foreground">({groupedTasks.todo.length})</span>
          </div>
          {groupedTasks.todo.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              getPriorityColor={getPriorityColor}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* In Progress Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent-primary"></div>
            <h2 className="font-semibold">In Progress</h2>
            <span className="caption text-muted-foreground">({groupedTasks.inProgress.length})</span>
          </div>
          {groupedTasks.inProgress.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              getPriorityColor={getPriorityColor}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* In Review Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent-warning"></div>
            <h2 className="font-semibold">In Review</h2>
            <span className="caption text-muted-foreground">({groupedTasks.inReview.length})</span>
          </div>
          {groupedTasks.inReview.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              getPriorityColor={getPriorityColor}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* Done Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-accent-success"></div>
            <h2 className="font-semibold">Done</h2>
            <span className="caption text-muted-foreground">({groupedTasks.done.length})</span>
          </div>
          {groupedTasks.done.map((task) => (
            <TaskCard 
              key={task.id} 
              task={task} 
              getPriorityColor={getPriorityColor}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        task={selectedTask as any}
      />
    </div>
  );
}

function TaskCard({ 
  task, 
  getPriorityColor,
  onEdit,
  onDelete,
}: { 
  task: Task; 
  getPriorityColor: (priority: string) => string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  return (
    <div className="glass-panel rounded-[20px] p-4 hover:scale-[1.02] transition-transform animate-smooth group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium mb-1 line-clamp-2">{task.title}</h3>
          {task.description && (
            <p className="caption text-muted-foreground line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="p-1.5 hover:bg-accent/5 rounded-lg transition-colors"
            title="Edit task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="p-1.5 hover:bg-accent-critical/10 text-accent-critical rounded-lg transition-colors"
            title="Delete task"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`caption px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        {task.project && (
          <span className="caption px-2 py-1 rounded bg-muted text-muted-foreground">
            {task.project.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
            {task.user.name.charAt(0)}
          </div>
          <span className="caption text-muted-foreground">{task.user.name}</span>
        </div>
        {task.dueDate && (
          <span className="caption text-muted-foreground">
            {getRelativeTime(new Date(task.dueDate))}
          </span>
        )}
      </div>
    </div>
  );
}
