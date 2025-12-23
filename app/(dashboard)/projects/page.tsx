'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatNumber } from '@/lib/utils';
import { ProjectModal } from '@/components/modals/project-modal';
import { Project as PrismaProject } from '@prisma/client';

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  progress: number;
  startDate: Date;
  targetDate: Date | null;
  _count: {
    tasks: number;
  };
  team: {
    name: string;
    department: string;
  } | null;
}

export default function ProjectsPage() {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      return res.json();
    },
  });

  const handleCreateProject = () => {
    setSelectedProject(null);
    setIsProjectModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete project');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete project');
    }
  };

  const handleModalSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['projects'] });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-accent-success/20 text-accent-success border-accent-success';
      case 'ON_HOLD': return 'bg-accent-warning/20 text-accent-warning border-accent-warning';
      case 'AT_RISK': return 'bg-accent-critical/20 text-accent-critical border-accent-critical';
      case 'COMPLETED': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'from-accent-success to-accent-success/70';
    if (progress >= 50) return 'from-accent-primary to-accent-primary/70';
    if (progress >= 25) return 'from-accent-warning to-accent-warning/70';
    return 'from-neutral-400 to-neutral-500';
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['project-1', 'project-2', 'project-3'].map((id) => (
              <div key={id} className="glass-panel rounded-[28px] p-6 h-64"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'ACTIVE');
  const totalTasks = projects.reduce((sum, p) => sum + p._count.tasks, 0);
  const avgProgress = projects.length > 0 
    ? projects.reduce((sum, p) => sum + p.progress, 0) / projects.length 
    : 0;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 mb-2">Projects</h1>
          <p className="text-muted-foreground">Track progress and manage initiatives</p>
        </div>
        <button 
          onClick={handleCreateProject}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors animate-smooth font-medium flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Total Projects</div>
          <div className="heading-1">{projects.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Active</div>
          <div className="heading-1 text-accent-success">{activeProjects.length}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Total Tasks</div>
          <div className="heading-1 text-accent-primary">{formatNumber(totalTasks)}</div>
        </div>
        <div className="glass-panel rounded-[20px] p-4">
          <div className="caption text-muted-foreground mb-2">Avg Progress</div>
          <div className="heading-1">{Math.round(avgProgress)}%</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-[28px] p-6 hover:scale-[1.02] transition-transform animate-smooth cursor-pointer group relative"
          >
            {/* Edit/Delete Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditProject(project);
                }}
                className="p-2 bg-muted hover:bg-accent/10 rounded-lg transition-colors"
                title="Edit project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(project.id);
                }}
                className="p-2 bg-muted hover:bg-accent-critical/10 rounded-lg transition-colors text-accent-critical"
                title="Delete project"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{project.name}</h3>
                {project.description && (
                  <p className="caption text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`caption px-2 py-1 rounded border ${getStatusColor(project.status)}`}>
                {project.status.replace('_', ' ')}
              </span>
              {project.team && (
                <span className="caption px-2 py-1 rounded bg-muted text-muted-foreground">
                  {project.team.name}
                </span>
              )}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="caption text-muted-foreground">Progress</span>
                <span className="caption font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${getProgressColor(project.progress)} transition-all animate-smooth`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-between caption text-muted-foreground">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{project._count.tasks} tasks</span>
              </div>
              {project.targetDate && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    Due {new Date(project.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="glass-panel rounded-[28px] p-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-4">Get started by creating your first project</p>
        </div>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSuccess={handleModalSuccess}
        project={selectedProject}
      />
    </div>
  );
}
