# CSS Variable Hierarchy

This document outlines our CSS variable system, including naming conventions, organization, and usage guidelines. Our variable system follows a tiered approach, from primitive design tokens to component-specific variables.

## Table of Contents

1. [Design Tokens](#design-tokens)
2. [Semantic Variables](#semantic-variables)
3. [Component Variables](#component-variables)
4. [Naming Conventions](#naming-conventions)
5. [Usage Guidelines](#usage-guidelines)
6. [Dark Theme Variables](#dark-theme-variables)

## Design Tokens

These are our primitive values that serve as the foundation for all other variables.

### Colors

```css
:root {
  /* Gray Scale */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-300: #cbd5e1;
  --gray-400: #94a3b8;
  --gray-500: #64748b;
  --gray-600: #475569;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;

  /* Primary Colors */
  --primary-50: #f0f9ff;
  --primary-100: #e0f2fe;
  --primary-200: #bae6fd;
  --primary-300: #7dd3fc;
  --primary-400: #38bdf8;
  --primary-500: #0ea5e9;
  --primary-600: #0284c7;
  --primary-700: #0369a1;
  --primary-800: #075985;
  --primary-900: #0c4a6e;

  /* Success Colors */
  --success-50: #f0fdf4;
  --success-100: #dcfce7;
  --success-200: #bbf7d0;
  --success-300: #86efac;
  --success-400: #4ade80;
  --success-500: #22c55e;
  --success-600: #16a34a;
  --success-700: #15803d;
  --success-800: #166534;
  --success-900: #14532d;

  /* Warning Colors */
  --warning-50: #fffbeb;
  --warning-100: #fef3c7;
  --warning-200: #fde68a;
  --warning-300: #fcd34d;
  --warning-400: #fbbf24;
  --warning-500: #f59e0b;
  --warning-600: #d97706;
  --warning-700: #b45309;
  --warning-800: #92400e;
  --warning-900: #78350f;

  /* Error Colors */
  --error-50: #fef2f2;
  --error-100: #fee2e2;
  --error-200: #fecaca;
  --error-300: #fca5a5;
  --error-400: #f87171;
  --error-500: #ef4444;
  --error-600: #dc2626;
  --error-700: #b91c1c;
  --error-800: #991b1b;
  --error-900: #7f1d1d;
}
```

### Spacing

```css
:root {
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem; /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem; /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem; /* 24px */
  --space-8: 2rem; /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem; /* 48px */
  --space-16: 4rem; /* 64px */
}
```

### Typography

```css
:root {
  /* Font Sizes */
  --font-size-xs: 0.75rem; /* 12px */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px */
  --font-size-lg: 1.125rem; /* 18px */
  --font-size-xl: 1.25rem; /* 20px */
  --font-size-2xl: 1.5rem; /* 24px */
  --font-size-3xl: 1.875rem; /* 30px */
  --font-size-4xl: 2.25rem; /* 36px */

  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Line Heights */
  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
}
```

### Borders & Radii

```css
:root {
  /* Border Widths */
  --border-width-0: 0px;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;
  --border-width-8: 8px;

  /* Border Radii */
  --radius-none: 0;
  --radius-sm: 0.125rem; /* 2px */
  --radius-md: 0.375rem; /* 6px */
  --radius-lg: 0.5rem; /* 8px */
  --radius-xl: 0.75rem; /* 12px */
  --radius-2xl: 1rem; /* 16px */
  --radius-3xl: 1.5rem; /* 24px */
  --radius-full: 9999px;
}
```

### Shadows & Effects

```css
:root {
  /* Box Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 /
          0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Blur Effects */
  --blur-none: 0;
  --blur-sm: 4px;
  --blur-md: 8px;
  --blur-lg: 12px;
  --blur-xl: 16px;
  --blur-2xl: 24px;
  --blur-3xl: 32px;
}
```

### Animation & Timing

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  /* Easings */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-linear: linear;
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

## Semantic Variables

These variables map our design tokens to semantic meanings.

```css
:root {
  /* Backgrounds */
  --bg-base: var(--gray-50);
  --bg-elevated: white;
  --bg-secondary: var(--gray-100);
  --bg-hover: var(--gray-100);
  --bg-active: var(--gray-200);

  /* Text Colors */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-muted: var(--gray-400);
  --text-on-primary: white;

  /* Borders */
  --border-color: var(--gray-200);
  --border-hover: var(--gray-300);
  --border-focus: rgba(99, 102, 241, 0.3);

  /* Component Base */
  --component-bg: rgba(255, 255, 255, 0.8);
  --component-hover-bg: rgba(255, 255, 255, 0.9);
  --component-border: rgba(0, 0, 0, 0.1);
  --component-hover-border: rgba(0, 0, 0, 0.15);
  --component-shadow: var(--shadow-md);
  --component-hover-shadow: var(--shadow-lg);

  /* Glass Effect */
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: var(--shadow-lg);
  --glass-blur: var(--blur-lg);

  /* Gradients */
  --gradient-primary: linear-gradient(
    135deg,
    var(--primary-500),
    var(--primary-600)
  );
  --gradient-success: linear-gradient(
    135deg,
    var(--success-500),
    var(--success-600)
  );
  --gradient-warning: linear-gradient(
    135deg,
    var(--warning-500),
    var(--warning-600)
  );
  --gradient-error: linear-gradient(135deg, var(--error-500), var(--error-600));
}
```

## Component Variables

Component variables should be scoped to their component and reference semantic or design token variables.

```css
.task-card {
  /* Component-specific variables */
  --task-card-bg: var(--bg-elevated);
  --task-card-border: var(--border-color);
  --task-card-hover-border: var(--border-hover);
  --task-card-shadow: var(--shadow-lg);
  --task-card-accent-width: 4px;

  /* Status-specific colors */
  --task-status-completed: var(--success-500);
  --task-status-in-progress: var(--warning-500);
  --task-status-pending: var(--gray-500);
  --task-status-overdue: var(--error-500);
}
```

## Naming Conventions

### Pattern

```
--{context}-{property}-{variant}
```

### Examples

```css
/* Design Tokens */
--gray-500
--space-4
--font-size-lg

/* Semantic Variables */
--bg-base
--text-primary
--border-hover

/* Component Variables */
--task-card-bg
--button-primary-color
--modal-header-height
```

### Guidelines

1. Use kebab-case
2. Be descriptive but concise
3. Follow consistent ordering
4. Use number scales for variations
5. Prefix component variables with component name

## Usage Guidelines

### Do's

```css
/* Do: Use semantic variables */
.element {
  color: var(--text-primary);
  background: var(--bg-base);
}

/* Do: Create component variables for repeated values */
.component {
  --component-spacing: var(--space-4);
  padding: var(--component-spacing);
  margin-bottom: var(--component-spacing);
}

/* Do: Use design tokens for one-off values */
.element {
  font-size: var(--font-size-lg);
  border-radius: var(--radius-xl);
}
```

### Don'ts

```css
/* Don't: Use hard-coded values */
.element {
  color: #1a1a1a; /* Bad */
  margin: 16px; /* Bad */
}

/* Don't: Mix contexts */
.element {
  --text-color: var(--task-card-color); /* Bad: mixing contexts */
}

/* Don't: Create redundant variables */
.element {
  --padding: var(--space-4); /* Bad: just use --space-4 directly */
}
```

## Dark Theme Variables

Dark theme overrides should be defined in `dark-theme.css` and modify semantic variables only.

```css
[data-theme="dark"] {
  /* Semantic overrides */
  --bg-base: var(--gray-900);
  --bg-elevated: var(--gray-800);
  --text-primary: var(--gray-50);

  /* Component semantic overrides */
  --component-bg: rgba(31, 41, 55, 0.8);
  --component-border: rgba(75, 85, 99, 0.3);
}
```

### Guidelines for Dark Theme

1. Never override design tokens
2. Only override semantic variables
3. Keep component variables referencing semantic variables
4. Test color contrast in both themes
