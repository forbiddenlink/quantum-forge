'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { TaskModal } from '@/components/modals/task-modal';
import { ProjectModal } from '@/components/modals/project-modal';
import { formatNumber, formatPercentage, getRelativeTime } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

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
    <div className="space-y-8 p-8">
      {/* Page Header */}
      <div>
        <h1 className="heading-1 mb-2">Good morning! 👋</h1>
        <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your work today</p>
      </div>

      {/* Copilot Daily Briefing */}
      <div className="glass-panel relative overflow-hidden rounded-2xl p-6">
        <div className="gradient-ai-glow absolute inset-0 opacity-30"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="bg-accent-primary/20 flex size-12 shrink-0 items-center justify-center rounded-full">
            <svg className="size-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="heading-2 mb-2 flex items-center gap-2">
              Copilot Daily Briefing{' '}
              <span className="caption bg-accent-primary/20 rounded-full px-2 py-1 text-accent-primary">AI Generated</span>
            </h2>
            <p className="body mb-4 text-muted-foreground">
              You have 3 high-priority tasks due this week. Team engagement is up 8% from last week. 
              I&apos;ve drafted responses to 2 helpdesk tickets that need your review.
            </p>
            <div className="flex gap-2">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Review Suggestions
              </button>
              <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/5">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="section-header mb-4">Quick Actions</h2>
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={staggerItem}
            onClick={() => setIsTaskModalOpen(true)}
            className="glass-panel animate-smooth rounded-xl p-6 text-left transition-transform hover:scale-[1.02]"
          >
            <div className="bg-accent-primary/20 mb-3 flex size-10 items-center justify-center rounded-lg">
              <svg className="size-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Create Task</h3>
            <p className="caption text-muted-foreground">Add a new task to your board</p>
          </motion.button>

          <motion.button
            variants={staggerItem}
            onClick={() => setIsProjectModalOpen(true)}
            className="glass-panel animate-smooth rounded-xl p-6 text-left transition-transform hover:scale-[1.02]"
          >
            <div className="bg-accent-secondary/20 mb-3 flex size-10 items-center justify-center rounded-lg">
              <svg className="size-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Create Project</h3>
            <p className="caption text-muted-foreground">Start a new initiative</p>
          </motion.button>

          <motion.button variants={staggerItem} className="glass-panel animate-smooth rounded-xl p-6 text-left transition-transform hover:scale-[1.02]">
            <div className="bg-accent-success/20 mb-3 flex size-10 items-center justify-center rounded-lg">
              <svg className="size-5 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Post Update</h3>
            <p className="caption text-muted-foreground">Share news with your team</p>
          </motion.button>

          <motion.button variants={staggerItem} className="glass-panel animate-smooth rounded-xl p-6 text-left transition-transform hover:scale-[1.02]">
            <div className="bg-accent-warning/20 mb-3 flex size-10 items-center justify-center rounded-lg">
              <svg className="size-5 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="mb-1 font-medium">Upload Document</h3>
            <p className="caption text-muted-foreground">Add files to library</p>
          </motion.button>
        </motion.div>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="section-header mb-4">Key Metrics</h2>
        {stats ? (
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground">Focus Score</span>
              </div>
              <div className="kpi-value mb-2">{stats.focusScore}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="gradient-success h-full rounded-full transition-all" style={{ width: `${stats.focusScore}%` }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground">Tasks Completed</span>
              </div>
              <div className="kpi-value mb-2">{formatNumber(stats.tasksCompleted)}</div>
              <p className="caption text-muted-foreground">This week</p>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground">Team Engagement</span>
              </div>
              <div className="kpi-value mb-2">{formatPercentage(stats.teamEngagement)}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent-secondary transition-all" style={{ width: `${stats.teamEngagement}%` }}></div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="surface-elevated rounded-2xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="caption text-muted-foreground">SLA Compliance</span>
              </div>
              <div className="kpi-value mb-2">{formatPercentage(stats.slaCompliance)}</div>
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="gradient-accent h-full rounded-full transition-all" style={{ width: `${stats.slaCompliance}%` }}></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        <h2 className="section-header mb-4">Recent Tasks</h2>
        <div className="glass-panel rounded-2xl p-6">
          {recentTasks.length > 0 ? (
            <div className="space-y-4">
              {recentTasks.map((task) => {
                const getPriorityStyles = (priority: string) => {
                  if (priority === 'high') return 'bg-accent-critical/20 text-accent-critical';
                  if (priority === 'medium') return 'bg-accent-warning/20 text-accent-warning';
                  return 'bg-neutral-200 text-neutral-400';
                };
                const priorityStyles = getPriorityStyles(task.priority);
                
                return (
                  <div key={task.id} className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-accent/5">
                    <input 
                      type="checkbox" 
                      className="size-5 rounded border-border"
                      aria-label={`Mark ${task.title} as complete`}
                    />
                    <div className="flex-1">
                      <h3 className="mb-1 font-medium">{task.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`caption rounded-full px-2 py-1 ${priorityStyles}`}>
                          {task.priority}
                        </span>
                        <span className="caption text-muted-foreground">Due {getRelativeTime(task.due)}</span>
                      </div>
                    </div>
                    <button 
                      className="rounded-lg p-2 transition-colors hover:bg-accent/10"
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
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted">
                <svg className="size-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="mb-2 font-medium">No tasks yet</h3>
              <p className="mb-4 text-sm text-muted-foreground">Create your first task to get started</p>
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create Task
              </button>
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
