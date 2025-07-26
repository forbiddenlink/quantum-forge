# Quantum Forge Theme System

This document outlines the unified theme system used across the Quantum Forge application. The theme system is designed to provide a consistent, modern, and accessible user interface that matches the welcome section's design.

## Core Principles

1. **Unified Design Language**
   - All components share the same design language
   - Consistent use of gradients, shadows, and animations
   - Semi-transparent backgrounds with blur effects
   - Smooth transitions and hover states

2. **Accessibility First**
   - High contrast color combinations
   - Clear visual hierarchy
   - Support for reduced motion
   - Dark mode optimization

3. **Responsive & Adaptive**
   - Fluid layouts that adapt to any screen size
   - Consistent spacing and sizing across breakpoints
   - Mobile-first approach to component design

## Theme Variables

### Component Base Styles

```css
/* Light Mode */
--component-bg: rgba(255, 255, 255, 0.1);
--component-border: rgba(255, 255, 255, 0.1);
--component-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
--component-hover-bg: rgba(255, 255, 255, 0.15);
--component-hover-border: rgba(255, 255, 255, 0.2);
--component-hover-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

/* Dark Mode */
--component-bg: rgba(30, 41, 59, 0.4);
--component-border: rgba(255, 255, 255, 0.1);
--component-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
--component-hover-bg: rgba(30, 41, 59, 0.6);
--component-hover-border: rgba(255, 255, 255, 0.15);
--component-hover-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
```

### Text Colors

```css
/* Light Mode */
--welcome-text: var(--text-primary);
--welcome-text-muted: var(--text-secondary);

/* Dark Mode */
--welcome-text: #f8fafc;
--welcome-text-muted: #94a3b8;
```

### Gradients & Effects

```css
/* Background Gradient */
background: linear-gradient(135deg, var(--welcome-bg-start) 0%, var(--welcome-bg-end) 100%);

/* Component Gradient */
background: linear-gradient(90deg, var(--primary-500), var(--success-500), var(--warning-500));

/* Text Gradient */
background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

## Component Base

All components should extend these base styles:

```css
.component-base {
    background: var(--component-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--component-border);
    box-shadow: var(--component-shadow);
    border-radius: var(--radius-xl);
    transition: all var(--duration-normal) var(--ease-spring);
    overflow: hidden;
    position: relative;
}

.component-base:hover {
    background: var(--component-hover-bg);
    border-color: var(--component-hover-border);
    box-shadow: var(--component-hover-shadow);
    transform: translateY(-4px);
}

.component-base::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-500), var(--success-500), var(--warning-500));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-in-out);
}

.component-base:hover::before {
    opacity: 1;
}
```

## Component Types

### Cards

Cards should use the component base styles with additional padding:

```css
.card {
    composes: component-base;
    padding: var(--space-6);
}
```

### Buttons

Buttons should use semi-transparent backgrounds with hover effects:

```css
.btn {
    background: var(--component-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--component-border);
    color: var(--welcome-text);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-xl);
    transition: all var(--duration-normal) var(--ease-spring);
}

.btn:hover {
    background: var(--component-hover-bg);
    border-color: var(--component-hover-border);
    transform: translateY(-2px);
}

.btn.primary {
    background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
    border: none;
    color: white;
}
```

### Inputs

Form inputs should match the component style:

```css
.input {
    background: var(--component-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--component-border);
    color: var(--welcome-text);
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    transition: all var(--duration-normal) var(--ease-spring);
}

.input:focus {
    background: var(--component-hover-bg);
    border-color: var(--component-hover-border);
    box-shadow: var(--component-hover-shadow);
    outline: none;
}
```

## Accessibility Features

### Dark Mode

The theme system automatically adjusts colors and contrasts in dark mode:

```css
[data-theme="dark"] {
    --welcome-bg-start: #1e293b;
    --welcome-bg-end: #0f172a;
    --welcome-text: #f8fafc;
    --welcome-text-muted: #94a3b8;
    
    --component-bg: rgba(30, 41, 59, 0.4);
    --component-border: rgba(255, 255, 255, 0.1);
    --component-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}
```

### Reduced Motion

Users who prefer reduced motion will see simplified animations:

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

### High Contrast

The theme adjusts for high contrast mode:

```css
@media (prefers-contrast: high) {
    :root {
        --component-border: solid 2px;
        --welcome-text: black;
        --welcome-text-muted: #333;
    }

    [data-theme="dark"] {
        --welcome-text: white;
        --welcome-text-muted: #ccc;
    }
}
```

## Responsive Design

The theme includes responsive breakpoints and adjustments:

```css
@media (max-width: 768px) {
    .component {
        padding: var(--space-4);
    }

    .grid {
        grid-template-columns: 1fr;
    }
}
```

## Best Practices

1. **Component Creation**
   - Always extend the component base styles
   - Use consistent spacing variables
   - Include hover and focus states
   - Support dark mode and accessibility features

2. **Color Usage**
   - Use theme variables for colors
   - Apply gradients consistently
   - Maintain sufficient contrast ratios
   - Support both light and dark modes

3. **Animation & Interaction**
   - Use consistent transition timing
   - Support reduced motion preferences
   - Keep animations subtle and purposeful
   - Ensure keyboard accessibility

4. **Responsive Design**
   - Use fluid layouts and grids
   - Test on multiple screen sizes
   - Maintain touch target sizes
   - Optimize for mobile first

## Implementation Example

```css
/* Example Component */
.example-component {
    /* Base Styles */
    background: var(--component-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--component-border);
    box-shadow: var(--component-shadow);
    border-radius: var(--radius-xl);
    
    /* Spacing */
    padding: var(--space-6);
    margin-bottom: var(--space-4);
    
    /* Typography */
    color: var(--welcome-text);
    
    /* Transitions */
    transition: all var(--duration-normal) var(--ease-spring);
    
    /* Position */
    position: relative;
    overflow: hidden;
}

/* Hover Effects */
.example-component:hover {
    background: var(--component-hover-bg);
    border-color: var(--component-hover-border);
    box-shadow: var(--component-hover-shadow);
    transform: translateY(-4px);
}

/* Gradient Bar */
.example-component::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-500), var(--success-500), var(--warning-500));
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    opacity: 0;
    transition: opacity var(--duration-normal) var(--ease-in-out);
}

.example-component:hover::before {
    opacity: 1;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .example-component {
        padding: var(--space-4);
    }
}
``` 