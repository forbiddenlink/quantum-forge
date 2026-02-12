'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { TaskModal } from '@/components/modals/task-modal';
import { ProjectModal } from '@/components/modals/project-modal';
import { formatNumber, formatPercentage, getRelativeTime } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/button';

interface DashboardStats {
  focusScore: number;
  tasksCompleted: number;
  teamEngagement: number;
  slaCompliance: number;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
  due: Date;
}

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Real API calls using TanStack Query
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stats');
      if (!res.ok) throw new Error('Failed to fetch stats');
      return res.json();
    },
  });

  const { data: recentTasks = [] } = useQuery<Task[]>({
    queryKey: ['recent-tasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks/recent');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      return res.json();
    },
  });

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 lg:p-8 w-full max-w-[100vw] overflow-hidden">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="heading-1 mb-2">Good morning! 👋</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Here&apos;s what&apos;s happening with your work today</p>
        </div>
        <div className="flex items-center gap-2">
           {/* Placeholder for future date/time or weather widget */}
        </div>
      </div>

      {/* Recent Activity Summary */}
      <div className="glass-panel-heavy rounded-2xl p-4 sm:p-6 shadow-sm border-t border-white/50 dark:border-white/10">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="bg-brand-100 dark:bg-brand-900/50 flex size-12 shrink-0 items-center justify-center rounded-full shadow-inner">
            <svg className="size-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex-1 w-full">
            <h2 className="heading-2 mb-2">Activity Overview</h2>
            {recentTasks.length > 0 ? (
              <p className="body-base mb-4 text-muted-foreground">
                You have <span className="font-semibold text-foreground">{recentTasks.length} active task{recentTasks.length !== 1 ? 's' : ''}</span>. 
                {recentTasks.filter(t => t.priority === 'HIGH' || t.priority === 'URGENT').length > 0 && 
                  ` ${recentTasks.filter(t => t.priority === 'HIGH' || t.priority === 'URGENT').length} high priority.`}
                {stats && ` Team engagement: ${formatPercentage(stats.teamEngagement)}`}
              </p>
            ) : (
              <p className="body-base mb-4 text-muted-foreground">
                You&apos;re all caught up! No pending tasks at the moment.
              </p>
            )}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button 
                onClick={() => setIsTaskModalOpen(true)}
                className="shadow-lg shadow-primary/20"
              >
                Create Task
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.location.href = '/tasks'}
              >
                View All Tasks
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="section-header mb-4 px-1">Quick Actions</h2>
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={staggerItem}
            onClick={() => setIsTaskModalOpen(true)}
            className="glass-panel hover-lift rounded-xl p-5 sm:p-6 text-left group"
          >
            <div className="bg-accent-primary/10 mb-3 flex size-10 sm:size-12 items-center justify-center rounded-xl group-hover:bg-accent-primary/20 transition-colors">
              <svg className="size-5 sm:size-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium text-sm sm:text-base">Create Task</h3>
            <p className="caption text-muted-foreground group-hover:text-foreground/80 transition-colors">Add a new task to your board</p>
          </motion.button>

          <motion.button
            variants={staggerItem}
            onClick={() => setIsProjectModalOpen(true)}
            className="glass-panel hover-lift rounded-xl p-5 sm:p-6 text-left group"
          >
            <div className="bg-accent-secondary/10 mb-3 flex size-10 sm:size-12 items-center justify-center rounded-xl group-hover:bg-accent-secondary/20 transition-colors">
              <svg className="size-5 sm:size-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium text-sm sm:text-base">Create Project</h3>
            <p className="caption text-muted-foreground group-hover:text-foreground/80 transition-colors">Start a new initiative</p>
          </motion.button>

          <motion.button variants={staggerItem} className="glass-panel hover-lift rounded-xl p-5 sm:p-6 text-left group">
            <div className="bg-accent-success/10 mb-3 flex size-10 sm:size-12 items-center justify-center rounded-xl group-hover:bg-accent-success/20 transition-colors">
              <svg className="size-5 sm:size-6 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium text-sm sm:text-base">Post Update</h3>
            <p className="caption text-muted-foreground group-hover:text-foreground/80 transition-colors">Share news with your team</p>
          </motion.button>

          <motion.button variants={staggerItem} className="glass-panel hover-lift rounded-xl p-5 sm:p-6 text-left group">
            <div className="bg-accent-warning/10 mb-3 flex size-10 sm:size-12 items-center justify-center rounded-xl group-hover:bg-accent-warning/20 transition-colors">
              <svg className="size-5 sm:size-6 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium text-sm sm:text-base">Upload Document</h3>
            <p className="caption text-muted-foreground group-hover:text-foreground/80 transition-colors">Add files to library</p>
          </motion.button>
        </motion.div>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="section-header mb-4 px-1">Key Metrics</h2>
        {stats ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground font-medium uppercase tracking-wider">Focus Score</span>
                <span className="text-emerald-500 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">+2.4%</span>
              </div>
              <div className="kpi-value mb-3">{stats.focusScore}</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <div className="gradient-success h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${stats.focusScore}%` }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground font-medium uppercase tracking-wider">Tasks</span>
                <span className="text-emerald-500 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
              </div>
              <div className="kpi-value mb-3">{formatNumber(stats.tasksCompleted)}</div>
              <p className="caption text-muted-foreground">Completed this week</p>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground font-medium uppercase tracking-wider">Engagement</span>
                <span className="text-rose-500 text-xs font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full">-1.2%</span>
              </div>
              <div className="kpi-value mb-3">{formatPercentage(stats.teamEngagement)}</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <div className="h-full rounded-full bg-accent-secondary transition-all duration-1000 ease-out" style={{ width: `${stats.teamEngagement}%` }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground font-medium uppercase tracking-wider">SLA</span>
                <span className="text-emerald-500 text-xs font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full">Ok</span>
              </div>
              <div className="kpi-value mb-3">{formatPercentage(stats.slaCompliance)}</div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <div className="gradient-accent h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${stats.slaCompliance}%` }}></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`skeleton-${i}`} className="glass-panel animate-pulse rounded-2xl p-6">
                <div className="mb-4 h-4 w-24 rounded bg-muted"></div>
                <div className="mb-2 h-12 w-16 rounded bg-muted"></div>
                <div className="h-2 rounded bg-muted"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="section-header mb-4 px-1">Recent Tasks</h2>
        <div className="glass-panel rounded-2xl p-4 sm:p-6">
          {recentTasks.length > 0 ? (
            <div className="space-y-3">
              {recentTasks.map((task) => {
                const getPriorityStyles = (priority: string) => {
                  if (priority === 'high') return 'bg-accent-critical/10 text-accent-critical border-accent-critical/20';
                  if (priority === 'medium') return 'bg-accent-warning/10 text-accent-warning border-accent-warning/20';
                  return 'bg-neutral-100 text-neutral-500 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700';
                };
                const priorityStyles = getPriorityStyles(task.priority);
                
                return (
                  <div key={task.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 rounded-xl border border-transparent p-3 sm:p-4 transition-all hover:bg-accent/5 hover:border-border/50">
                    <div className="flex items-center gap-3 flex-1">
                      <input 
                        type="checkbox" 
                        className="size-5 rounded border-border text-primary focus:ring-primary/20 transition-all checked:bg-primary checked:border-primary"
                        aria-label={`Mark ${task.title} as complete`}
                      />
                      <div className="min-w-0">
                        <h3 className="mb-1 font-medium truncate pr-2">{task.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`caption border rounded-full px-2 py-0.5 font-medium ${priorityStyles}`}>
                            {task.priority}
                          </span>
                          <span 
                            className="caption text-muted-foreground flex items-center gap-1"
                            suppressHydrationWarning
                          >
                            <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {getRelativeTime(task.due)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className="self-end sm:self-center rounded-lg p-2 text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
                      aria-label="Task options"
                    >
                      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted/50">
                <svg className="size-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mb-2 font-medium">No tasks yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Create your first task to get started</p>
              <Button 
                onClick={() => setIsTaskModalOpen(true)}
              >
                Create Task
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['recent-tasks'] });
          queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }}
      />

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['projects'] });
        }}
      />
    </div>
  );
}
