import { create } from 'zustand';

interface UIState {
  sidebarCollapsed: boolean;
  copilotOpen: boolean;
  commandBarOpen: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  setCopilotOpen: (open: boolean) => void;
  toggleCopilot: () => void;
  setCommandBarOpen: (open: boolean) => void;
  toggleCommandBar: () => void;
}

/**
 * UI state management store
 * Controls sidebar, copilot, and command bar visibility
 * Based on Design Vision interaction patterns
 */
export const useUIStore = create<UIState>()((set) => ({
  sidebarCollapsed: false,
  copilotOpen: false,
  commandBarOpen: false,
  
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
  
  setCommandBarOpen: (open) => set({ commandBarOpen: open }),
  toggleCommandBar: () => set((state) => ({ commandBarOpen: !state.commandBarOpen })),
}));
