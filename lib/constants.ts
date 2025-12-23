/**
 * Constants for Quantum Forge application
 * Based on Design Vision specifications
 */

// Breakpoints matching Design Vision responsive strategy
export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
  laptop: 1439,
  desktop: 1440,
} as const;

// Animation durations from design tokens
export const ANIMATION_DURATION = {
  fast: 150,
  base: 250,
  slow: 400,
  xslow: 700,
} as const;

// Navigation structure
export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Tasks', href: '/tasks', icon: 'check-square' },
  { label: 'Projects', href: '/projects', icon: 'folder' },
  { label: 'Team', href: '/team', icon: 'users' },
  { label: 'Analytics', href: '/analytics', icon: 'bar-chart' },
  { label: 'Calendar', href: '/calendar', icon: 'calendar' },
  { label: 'Documents', href: '/documents', icon: 'file-text' },
  { label: 'Wellness', href: '/wellness', icon: 'heart' },
  { label: 'Settings', href: '/settings', icon: 'settings' },
] as const;

// Keyboard shortcuts (Design Vision: Copilot Interaction Patterns)
export const KEYBOARD_SHORTCUTS = {
  commandBar: 'mod+k',
  search: '/',
  copilot: 'mod+shift+c',
} as const;

// Chart color mappings (Design Vision: Data Visualization Guidelines)
export const CHART_COLORS = {
  primary: '#7367F0',
  secondary: '#3BC9F3',
  success: '#36D399',
  warning: '#F8C572',
  critical: '#F47280',
  neutral: '#94A3B8',
} as const;

// Toast auto-dismiss duration (Design Vision: Micro-UX Patterns)
export const TOAST_DURATION = 4000;

// Minimum touch target size (Design Vision: Responsive Behavior)
export const MIN_TOUCH_TARGET = 48;

// Sidebar dimensions (Design Vision: Structural Grid)
export const SIDEBAR_WIDTH = {
  collapsed: 72,
  expanded: 256,
} as const;

// Top bar height (Design Vision: Structural Grid)
export const TOPBAR_HEIGHT = 64;

// Card elevation tiers (Design Vision: Layout System)
export const ELEVATION = {
  surface: 'shadow-sm',
  raised: 'shadow-md',
  floating: 'shadow-lg shadow-card',
} as const;

// Status types
export const STATUS_TYPES = ['todo', 'in-progress', 'review', 'done', 'blocked'] as const;
export type Status = typeof STATUS_TYPES[number];

// Priority levels
export const PRIORITY_LEVELS = ['low', 'medium', 'high', 'critical'] as const;
export type Priority = typeof PRIORITY_LEVELS[number];
