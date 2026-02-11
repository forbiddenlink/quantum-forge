'use client';

import { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { TaskModal } from '@/components/modals/task-modal';
import { getRelativeTime } from '@/lib/utils';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

type ColumnId = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE';

const COLUMNS: { id: ColumnId; title: string; color: string }[] = [
  { id: 'TODO', title: 'To Do', color: 'bg-neutral-400' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-accent-primary' },
  { id: 'IN_REVIEW', title: 'In Review', color: 'bg-accent-warning' },
  { id: 'DONE', title: 'Done', color: 'bg-accent-success' },
];

export default function TasksPage() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      return res.json();
    },
    onMutate: async ({ taskId, status }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      // Optimistically update
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old?.map((task) => (task.id === taskId ? { ...task, status } : task))
      );

      return { previousTasks };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousTasks) {
        queryClient.setQueryData(['tasks'], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
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

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id);
    if (task) setActiveTask(task);
  };

  const handleDragOver = (_event: DragOverEvent) => {
    // Could add visual feedback here
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    // Determine the target column
    let newStatus: string | null = null;

    // Check if dropped over a column
    if (COLUMNS.some((col) => col.id === over.id)) {
      newStatus = over.id as string;
    } else {
      // Dropped over a task - find which column that task is in
      const overTask = tasks.find((t) => t.id === over.id);
      if (overTask) {
        newStatus = overTask.status;
      }
    }

    if (newStatus && newStatus !== task.status) {
      updateTaskMutation.mutate({ taskId, status: newStatus });
    }
  };

  const getTasksByColumn = (columnId: ColumnId) => tasks.filter((t) => t.status === columnId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-accent-critical/20 text-accent-critical border-accent-critical';
      case 'HIGH':
        return 'bg-accent-warning/20 text-accent-warning border-accent-warning';
      case 'MEDIUM':
        return 'bg-accent-primary/20 text-accent-primary border-accent-primary';
      case 'LOW':
        return 'bg-neutral-200 text-neutral-400 border-neutral-300';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-muted"></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.id} className="glass-panel h-96 rounded-2xl p-6"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Tasks</h1>
          <p className="text-muted-foreground">Drag and drop tasks to update their status</p>
        </div>
        <button
          onClick={handleCreateTask}
          className="animate-smooth flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {COLUMNS.map((col) => {
          const count = getTasksByColumn(col.id).length;
          const colorClass =
            col.id === 'TODO'
              ? 'text-neutral-400'
              : col.id === 'IN_PROGRESS'
                ? 'text-accent-primary'
                : col.id === 'IN_REVIEW'
                  ? 'text-accent-warning'
                  : 'text-accent-success';
          return (
            <div key={col.id} className="glass-panel rounded-xl p-4">
              <div className="caption mb-2 text-muted-foreground">{col.title}</div>
              <div className={`heading-1 ${colorClass}`}>{count}</div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board with Drag and Drop */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={getTasksByColumn(column.id)}
              getPriorityColor={getPriorityColor}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        {/* Drag Overlay - shows the task being dragged */}
        <DragOverlay>
          {activeTask && (
            <TaskCard
              task={activeTask}
              getPriorityColor={getPriorityColor}
              onEdit={() => {}}
              onDelete={() => {}}
              isDragging
            />
          )}
        </DragOverlay>
      </DndContext>

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

function KanbanColumn({
  column,
  tasks,
  getPriorityColor,
  onEdit,
  onDelete,
}: {
  column: { id: ColumnId; title: string; color: string };
  tasks: Task[];
  getPriorityColor: (priority: string) => string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  const { setNodeRef, isOver } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`glass-panel min-h-[400px] space-y-4 rounded-2xl p-4 transition-colors ${
        isOver ? 'bg-accent/5 ring-2 ring-accent-primary/30' : ''
      }`}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className={`size-3 rounded-full ${column.color}`}></div>
        <h2 className="font-semibold">{column.title}</h2>
        <span className="caption text-muted-foreground">({tasks.length})</span>
      </div>

      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <SortableTaskCard
            key={task.id}
            task={task}
            getPriorityColor={getPriorityColor}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </SortableContext>

      {tasks.length === 0 && (
        <div className="flex h-32 items-center justify-center rounded-xl border-2 border-dashed border-border text-muted-foreground">
          <p className="caption">Drop tasks here</p>
        </div>
      )}
    </div>
  );
}

function SortableTaskCard({
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        task={task}
        getPriorityColor={getPriorityColor}
        onEdit={onEdit}
        onDelete={onDelete}
        isDragging={isDragging}
      />
    </div>
  );
}

function TaskCard({
  task,
  getPriorityColor,
  onEdit,
  onDelete,
  isDragging = false,
}: {
  task: Task;
  getPriorityColor: (priority: string) => string;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
}) {
  return (
    <div
      className={`glass-panel animate-smooth group rounded-xl p-4 transition-all ${
        isDragging
          ? 'rotate-3 scale-105 shadow-xl ring-2 ring-accent-primary opacity-90'
          : 'hover:scale-[1.02]'
      }`}
    >
      {/* Drag handle indicator */}
      <div
        className="mb-2 flex justify-center opacity-30 group-hover:opacity-60"
        aria-hidden="true"
        role="img"
        aria-label="Drag to reorder"
      >
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="9" cy="5" r="1.5" />
          <circle cx="15" cy="5" r="1.5" />
          <circle cx="9" cy="12" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="9" cy="19" r="1.5" />
          <circle cx="15" cy="19" r="1.5" />
        </svg>
      </div>

      <div className="mb-3 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 line-clamp-2 font-medium">{task.title}</h3>
          {task.description && (
            <p className="caption line-clamp-2 text-muted-foreground">{task.description}</p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="rounded-lg p-1.5 transition-colors hover:bg-accent/5"
            title="Edit task"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="hover:bg-accent-critical/10 rounded-lg p-1.5 text-accent-critical transition-colors"
            title="Delete task"
          >
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <span className={`caption rounded border px-2 py-1 ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        {task.project && (
          <span className="caption rounded bg-muted px-2 py-1 text-muted-foreground">
            {task.project.name}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
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
