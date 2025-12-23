'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskModal } from '@/components/modals/task-modal';
import { ProjectModal } from '@/components/modals/project-modal';
import { formatNumber, formatPercentage, getRelativeTime } from '@/lib/utils';

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
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="heading-1 mb-2">Good morning! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your work today</p>
      </div>

      {/* Copilot Daily Briefing */}
      <div className="glass-panel rounded-[28px] p-6 relative overflow-hidden">
        <div className="absolute inset-0 gradient-ai-glow opacity-30"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="heading-2 mb-2 flex items-center gap-2">
              Copilot Daily Briefing{' '}
              <span className="caption px-2 py-1 bg-accent-primary/20 rounded-full text-accent-primary">AI Generated</span>
            </h2>
            <p className="body text-muted-foreground mb-4">
              You have 3 high-priority tasks due this week. Team engagement is up 8% from last week. 
              I've drafted responses to 2 helpdesk tickets that need your review.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Review Suggestions
              </button>
              <button className="px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-accent/5 transition-colors">
                View All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="heading-2 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setIsTaskModalOpen(true)}
            className="glass-panel rounded-[20px] p-6 text-left hover:scale-[1.02] transition-transform animate-smooth"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-primary/20 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Create Task</h3>
            <p className="caption text-muted-foreground">Add a new task to your board</p>
          </button>

          <button 
            onClick={() => setIsProjectModalOpen(true)}
            className="glass-panel rounded-[20px] p-6 text-left hover:scale-[1.02] transition-transform animate-smooth"
          >
            <div className="w-10 h-10 rounded-lg bg-accent-secondary/20 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Create Project</h3>
            <p className="caption text-muted-foreground">Start a new initiative</p>
          </button>

          <button className="glass-panel rounded-[20px] p-6 text-left hover:scale-[1.02] transition-transform animate-smooth">
            <div className="w-10 h-10 rounded-lg bg-accent-success/20 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Post Update</h3>
            <p className="caption text-muted-foreground">Share news with your team</p>
          </button>

          <button className="glass-panel rounded-[20px] p-6 text-left hover:scale-[1.02] transition-transform animate-smooth">
            <div className="w-10 h-10 rounded-lg bg-accent-warning/20 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-accent-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="font-medium mb-1">Upload Document</h3>
            <p className="caption text-muted-foreground">Add files to library</p>
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div>
        <h2 className="heading-2 mb-4">Key Metrics</h2>
        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="caption text-muted-foreground">Focus Score</span>
              </div>
              <div className="display-2 mb-2">{stats.focusScore}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-success rounded-full transition-all" style={{ width: `${stats.focusScore}%` }}></div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="caption text-muted-foreground">Tasks Completed</span>
              </div>
              <div className="display-2 mb-2">{formatNumber(stats.tasksCompleted)}</div>
              <p className="caption text-muted-foreground">This week</p>
            </div>

            <div className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="caption text-muted-foreground">Team Engagement</span>
              </div>
              <div className="display-2 mb-2">{formatPercentage(stats.teamEngagement)}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent-secondary rounded-full transition-all" style={{ width: `${stats.teamEngagement}%` }}></div>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-[28px] p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="caption text-muted-foreground">SLA Compliance</span>
              </div>
              <div className="display-2 mb-2">{formatPercentage(stats.slaCompliance)}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full gradient-accent rounded-full transition-all" style={{ width: `${stats.slaCompliance}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`skeleton-${i}`} className="glass-panel rounded-[28px] p-6 animate-pulse">
                <div className="h-4 bg-muted rounded w-24 mb-4"></div>
                <div className="h-12 bg-muted rounded w-16 mb-2"></div>
                <div className="h-2 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Tasks */}
      <div>
        <h2 className="heading-2 mb-4">Recent Tasks</h2>
        <div className="glass-panel rounded-[28px] p-6">
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
                  <div key={task.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-border"
                      aria-label={`Mark ${task.title} as complete`}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{task.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`caption px-2 py-1 rounded-full ${priorityStyles}`}>
                          {task.priority}
                        </span>
                        <span className="caption text-muted-foreground">Due {getRelativeTime(task.due)}</span>
                      </div>
                    </div>
                    <button 
                      className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                      aria-label="Task options"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">No tasks yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Create your first task to get started</p>
              <button 
                onClick={() => setIsTaskModalOpen(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
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
