import { create } from 'zustand';

interface ModalsState {
  taskModalOpen: boolean;
  projectModalOpen: boolean;
  selectedTaskId: string | null;
  selectedProjectId: string | null;
  openTaskModal: (taskId?: string) => void;
  closeTaskModal: () => void;
  openProjectModal: (projectId?: string) => void;
  closeProjectModal: () => void;
}

export const useModalsStore = create<ModalsState>((set) => ({
  taskModalOpen: false,
  projectModalOpen: false,
  selectedTaskId: null,
  selectedProjectId: null,
  openTaskModal: (taskId) => set({ taskModalOpen: true, selectedTaskId: taskId || null }),
  closeTaskModal: () => set({ taskModalOpen: false, selectedTaskId: null }),
  openProjectModal: (projectId) => set({ projectModalOpen: true, selectedProjectId: projectId || null }),
  closeProjectModal: () => set({ projectModalOpen: false, selectedProjectId: null }),
}));
