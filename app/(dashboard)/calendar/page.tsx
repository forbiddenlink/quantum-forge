'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  dueDate: string | null;
  user: {
    name: string;
    avatar: string | null;
  };
  project: {
    name: string;
  } | null;
}

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function CalendarPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { data: tasks = [], isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
  });

  // Group tasks by date
  const tasksByDate = useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    tasks.forEach((task) => {
      if (task.dueDate) {
        const date = new Date(task.dueDate);
        const key = formatDateKey(date);
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(task);
      }
    });
    return grouped;
  }, [tasks]);

  // Calendar grid data
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Next month days to fill the grid (6 rows * 7 days = 42)
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentDate]);

  const selectedDateTasks = useMemo(() => {
    if (!selectedDate) return [];
    const key = formatDateKey(selectedDate);
    return tasksByDate[key] || [];
  }, [selectedDate, tasksByDate]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    setIsPanelOpen(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsPanelOpen(true);
  };

  const closeSidePanel = () => {
    setIsPanelOpen(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT': return 'bg-accent-critical';
      case 'HIGH': return 'bg-accent-warning';
      case 'MEDIUM': return 'bg-accent-primary';
      case 'LOW': return 'bg-neutral-400';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return 'text-neutral-400';
      case 'IN_PROGRESS': return 'text-accent-primary';
      case 'IN_REVIEW': return 'text-accent-warning';
      case 'DONE': return 'text-accent-success';
      case 'CANCELLED': return 'text-muted-foreground line-through';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'TODO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'IN_REVIEW': return 'In Review';
      case 'DONE': return 'Done';
      case 'CANCELLED': return 'Cancelled';
      default: return status;
    }
  };

  // Stats
  const tasksThisMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    return tasks.filter((task) => {
      if (!task.dueDate) return false;
      const date = new Date(task.dueDate);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }, [tasks, currentDate]);

  const overdueCount = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate || task.status === 'DONE' || task.status === 'CANCELLED') return false;
      return new Date(task.dueDate) < today;
    }).length;
  }, [tasks, today]);

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded bg-muted"></div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-panel h-24 rounded-xl"></div>
            ))}
          </div>
          <div className="glass-panel h-[600px] rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Main Calendar Section */}
      <div className={cn(
        "flex-1 space-y-8 p-8 transition-all duration-300",
        isPanelOpen && "lg:pr-[400px]"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="heading-1 mb-2">Calendar</h1>
            <p className="text-muted-foreground">Schedule and manage your tasks</p>
          </div>
          <button
            onClick={goToToday}
            className="animate-smooth flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Today
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="glass-panel rounded-xl p-4">
            <div className="caption mb-2 text-muted-foreground">Tasks This Month</div>
            <div className="heading-1 text-accent-primary">{tasksThisMonth.length}</div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="caption mb-2 text-muted-foreground">Completed</div>
            <div className="heading-1 text-accent-success">
              {tasksThisMonth.filter((t) => t.status === 'DONE').length}
            </div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="caption mb-2 text-muted-foreground">In Progress</div>
            <div className="heading-1 text-accent-warning">
              {tasksThisMonth.filter((t) => t.status === 'IN_PROGRESS').length}
            </div>
          </div>
          <div className="glass-panel rounded-xl p-4">
            <div className="caption mb-2 text-muted-foreground">Overdue</div>
            <div className="heading-1 text-accent-critical">{overdueCount}</div>
          </div>
        </div>

        {/* Calendar */}
        <div className="glass-panel rounded-2xl p-6">
          {/* Calendar Header */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="heading-2">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="animate-smooth flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
                aria-label="Previous month"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="animate-smooth flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
                aria-label="Next month"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="mb-2 grid grid-cols-7 gap-1">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="caption py-2 text-center font-medium text-muted-foreground">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1" aria-label="Calendar">
            {calendarDays.map(({ date, isCurrentMonth }, index) => {
              const dateKey = formatDateKey(date);
              const dayTasks = tasksByDate[dateKey] || [];
              const isToday = isSameDay(date, today);
              const isSelected = selectedDate && isSameDay(date, selectedDate);
              const hasOverdue = dayTasks.some(
                (t) => t.status !== 'DONE' && t.status !== 'CANCELLED' && new Date(t.dueDate!) < today
              );

              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(date)}
                  aria-label={`${date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${dayTasks.length > 0 ? `, ${dayTasks.length} task${dayTasks.length > 1 ? 's' : ''}` : ''}`}
                  {...(isSelected && { 'aria-current': 'date' })}
                  className={cn(
                    "animate-smooth group relative flex min-h-[100px] flex-col rounded-xl border p-2 text-left transition-all hover:scale-[1.02] hover:border-accent-primary/50",
                    isCurrentMonth ? "border-border bg-card" : "border-transparent bg-muted/30",
                    isSelected && "border-accent-primary bg-accent-primary/5",
                    isToday && "ring-2 ring-accent-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  {/* Date Number */}
                  <div className={cn(
                    "mb-1 flex size-7 items-center justify-center rounded-full text-sm font-medium",
                    isToday && "bg-accent-primary text-white",
                    !isCurrentMonth && "text-muted-foreground/50",
                    isCurrentMonth && !isToday && "text-foreground"
                  )}>
                    {date.getDate()}
                  </div>

                  {/* Task Indicators */}
                  <div className="flex flex-1 flex-col gap-1 overflow-hidden">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className={cn(
                          "flex items-center gap-1 truncate rounded px-1.5 py-0.5 text-[10px]",
                          task.status === 'DONE' ? 'bg-accent-success/10 text-accent-success' :
                          task.status === 'CANCELLED' ? 'bg-muted text-muted-foreground line-through' :
                          hasOverdue && new Date(task.dueDate!) < today ? 'bg-accent-critical/10 text-accent-critical' :
                          'bg-accent-primary/10 text-accent-primary'
                        )}
                      >
                        <span className={cn("size-1.5 shrink-0 rounded-full", getPriorityColor(task.priority))} />
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <div className="caption text-muted-foreground">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>

                  {/* Task count badge */}
                  {dayTasks.length > 0 && (
                    <div className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-accent-primary text-[10px] font-medium text-white">
                      {dayTasks.length}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="glass-panel flex flex-wrap items-center gap-6 rounded-xl p-4">
          <div className="caption text-muted-foreground">Legend:</div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-accent-critical" />
            <span className="caption">Urgent</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-accent-warning" />
            <span className="caption">High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-accent-primary" />
            <span className="caption">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-neutral-400" />
            <span className="caption">Low</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="size-4 rounded border-2 border-accent-primary" />
            <span className="caption">Today</span>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div
        className={cn(
          "glass-panel fixed right-0 top-0 z-40 h-full w-full transform border-l border-border transition-transform duration-300 ease-out sm:w-[380px]",
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedDate && (
          <div className="flex h-full flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-border p-6">
              <div>
                <h3 className="heading-2">
                  {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
                </h3>
                <p className="caption text-muted-foreground">
                  {selectedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <button
                onClick={closeSidePanel}
                className="animate-smooth flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
                aria-label="Close panel"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {selectedDateTasks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                    <svg className="size-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="mb-1 font-medium">No tasks scheduled</h4>
                  <p className="caption text-muted-foreground">
                    There are no tasks due on this date
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="caption text-muted-foreground">
                    {selectedDateTasks.length} task{selectedDateTasks.length !== 1 ? 's' : ''} due
                  </div>
                  {selectedDateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="glass-panel animate-smooth rounded-xl p-4 transition-transform hover:scale-[1.01]"
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <h4 className={cn("font-medium leading-tight", getStatusColor(task.status))}>
                          {task.title}
                        </h4>
                        <span className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium",
                          task.priority === 'URGENT' && "bg-accent-critical/20 text-accent-critical",
                          task.priority === 'HIGH' && "bg-accent-warning/20 text-accent-warning",
                          task.priority === 'MEDIUM' && "bg-accent-primary/20 text-accent-primary",
                          task.priority === 'LOW' && "bg-neutral-200 text-neutral-400"
                        )}>
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="caption mb-3 line-clamp-2 text-muted-foreground">
                          {task.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                            {task.user.name.charAt(0)}
                          </div>
                          <span className="caption text-muted-foreground">{task.user.name}</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-1 rounded-full px-2 py-0.5",
                          task.status === 'DONE' && "bg-accent-success/10",
                          task.status === 'IN_PROGRESS' && "bg-accent-primary/10",
                          task.status === 'IN_REVIEW' && "bg-accent-warning/10",
                          task.status === 'TODO' && "bg-muted",
                          task.status === 'CANCELLED' && "bg-muted"
                        )}>
                          {task.status === 'DONE' && (
                            <svg className="size-3 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {task.status === 'IN_PROGRESS' && (
                            <svg className="size-3 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                          {task.status === 'IN_REVIEW' && (
                            <svg className="size-3 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                          <span className={cn("caption", getStatusColor(task.status))}>
                            {getStatusLabel(task.status)}
                          </span>
                        </div>
                      </div>

                      {task.project && (
                        <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3">
                          <svg className="size-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                          <span className="caption text-muted-foreground">{task.project.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isPanelOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={closeSidePanel}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
