'use client';

import { useState, useEffect } from 'react';
import { type Project, type ProjectStatus } from '@prisma/client';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: Project | null;
}

export function ProjectModal({ isOpen, onClose, onSuccess, project }: ProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE' as ProjectStatus,
    startDate: '',
    targetDate: '',
  });

  useEffect(() => {
    if (project) {
      const proj = project as any; // Type workaround for Prisma client cache
      setFormData({
        name: proj.name,
        description: proj.description || '',
        status: proj.status,
        startDate: (proj.startDate ? new Date(proj.startDate).toISOString().split('T')[0] : '') ?? '',
        targetDate: (proj.targetDate ? new Date(proj.targetDate).toISOString().split('T')[0] : '') ?? '',
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const url = project ? `/api/projects/${project.id}` : '/api/projects';
      const method = project ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
          targetDate: formData.targetDate ? new Date(formData.targetDate).toISOString() : null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save project');
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      status: 'ACTIVE',
      startDate: '',
      targetDate: '',
    });
    setError('');
  };

  const handleClose = () => {
    onClose();
    if (!project) resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="glass-panel animate-scale-in w-full max-w-lg rounded-3xl shadow-2xl sm:max-w-xl md:max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <h2 className="heading-2">{project ? 'Edit Project' : 'Create New Project'}</h2>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition-colors hover:bg-accent/5"
            aria-label="Close modal"
          >
            <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {error && (
            <div className="bg-accent-critical/10 rounded-lg border border-accent-critical p-3 text-sm text-accent-critical">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="label">
              Project Name <span className="text-accent-critical">*</span>
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Q1 Portal Modernization"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="label">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-[100px] w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe the project goals and scope..."
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="label">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as ProjectStatus })}
              className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="PLANNING">Planning</option>
              <option value="ACTIVE">Active</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="label">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="targetDate" className="label">
                Target Date
              </label>
              <input
                id="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                className="w-full rounded-lg border border-border bg-muted px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 border-t border-border pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="rounded-lg border border-border px-6 py-3 transition-colors hover:bg-accent/5 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
