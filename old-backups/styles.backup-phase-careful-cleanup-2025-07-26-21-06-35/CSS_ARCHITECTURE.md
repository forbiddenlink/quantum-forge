# CSS Architecture Guidelines - Quantum Forge
*Updated: July 26, 2025 - Post-Systematic Cleanup*

This document outlines the architectural principles, best practices, and guidelines for CSS development in our project. Following these guidelines ensures consistency, maintainability, and scalability of our styles.

## 🎯 **MAJOR ARCHITECTURAL IMPROVEMENTS (July 2025)**

### **Centralized Animation System**
- **animations.css**: Master animation repository serving all components
  - `spectralGlow`: Unified glow effects across 4+ components
  - `spectralBackgroundShift`: Complex background-position animations
  - `standardPulse`: Cross-component opacity pulse effects
  - **50+ keyframe definitions** consolidated from scattered files

### **Component Consolidation**
- **components.css**: Shared component definitions
  - Task management components (.task-assignee, .task-actions)
  - Activity feed components (.activity-content)
  - **15+ component rules** centralized from multiple files

### **Duplicate Elimination Achievement**
- **14.3% Reduction**: 453 → 388 duplicate rules eliminated
- **25+ Files Optimized**: Systematic cleanup across entire codebase
- **Zero Functionality Lost**: Conservative approach with comprehensive verification

## Table of Contents

1. [File Organization](#file-organization)
2. [Animation Architecture](#animation-architecture)
3. [Component System](#component-system)
4. [CSS Variables](#css-variables)
5. [Selectors and Specificity](#selectors-and-specificity)
6. [Media Queries](#media-queries)
7. [Performance](#performance)
8. [Accessibility](#accessibility)
9. [Documentation](#documentation)
10. [Testing](#testing)
11. [Maintenance](#maintenance)
12. [Tools](#tools)
13. [Version Control](#version-control)
14. [Future Considerations](#future-considerations)

## File Organization

### Directory Structure

```
styles/
├── imports.css          # Central import file
├── critical.css         # Critical path CSS
├── main.css            # Main styles  
├── animations.css      # 🆕 Master animation repository
├── components.css      # 🆕 Shared component definitions
├── utilities.css       # Utility classes
├── dark-theme.css      # Dark theme overrides
├── components/         # Component-specific styles
│   ├── task-system.css
│   ├── quick-insights.css
│   └── README.md
└── docs/              # Documentation
    └── CSS_ARCHITECTURE.md
```

### File Purpose

- **imports.css**: Central file that imports all other CSS files in the correct order
- **critical.css**: Styles required for above-the-fold content
- **main.css**: Core styles and global elements
- **utilities.css**: Reusable utility classes
- **dark-theme.css**: Dark theme color overrides
- **components/**: Individual component styles

### Import Order

1. Component styles (most specific)
2. Core styles (critical.css, main.css)
3. Theme and utilities (least specific)

## Animation Architecture

### **Master Animation System (animations.css)**

All keyframe animations are centralized in `animations.css` to prevent duplication and ensure consistency:

```css
/* ✅ CONSOLIDATED ANIMATIONS */
@keyframes spectralGlow {
    /* Complex box-shadow effects used by 4+ components */
}

@keyframes spectralBackgroundShift {
    /* Complex background-position arrays used across files */
}

@keyframes standardPulse {
    /* Standard opacity pulse: 1 → 0.5 → 1 */
}
```

### **Animation Usage Pattern**
```css
/* ❌ OLD: Duplicate definition per file */
@keyframes componentPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

/* ✅ NEW: Reference centralized animation */
.component {
    animation: standardPulse 2s ease-in-out infinite;
}
```

### **Animation Naming Convention**
- **spectral\***: Complex multi-property effects
- **standard\***: Simple, reusable effects  
- **\*Pulse**: Opacity-based animations
- **\*Glow**: Box-shadow based effects
- **\*Shift**: Transform/position based effects

## Component System

### **Shared Component Definitions (components.css)**

Common component patterns consolidated to prevent duplication:

```css
/* ✅ CONSOLIDATED COMPONENTS */
.task-assignee {
    /* Shared across task-system, analytics, enhanced-task-system */
}

.task-actions {
    /* Button group patterns used in multiple files */
}

.activity-content {
    /* Activity feed content used across dashboard components */
}
```

### **Component Architecture Pattern**
```css
/* ❌ OLD: Duplicate in each file */
/* In task-system.css, analytics.css, enhanced-task-system.css */
.task-assignee { /* identical definition */ }

/* ✅ NEW: Single definition, multiple references */
/* In components.css */
.task-assignee { /* master definition */ }
```

## CSS Variables

### Hierarchy

1. **Root Variables**: Global design tokens

   ```css
   :root {
     /* Colors */
     --primary-50: #f0f9ff;
     --primary-500: #0ea5e9;

     /* Spacing */
     --space-1: 0.25rem;
     --space-4: 1rem;

     /* Typography */
     --font-size-base: 1rem;
     --font-weight-bold: 700;
   }
   ```

2. **Component Variables**: Component-specific variables that reference root variables
   ```css
   .component {
     --component-bg: var(--primary-50);
     --component-text: var(--primary-500);
   }
   ```

### Naming Convention

- Use kebab-case
- Prefix with context when component-specific
- Use numeric scales for variations
- Be descriptive but concise

```css
/* Good */
--primary-500
--task-card-bg
--space-4

/* Bad */
--blue
--cardBackground
--medium-space
```

## Selectors and Specificity

### Best Practices

1. Use classes over IDs
2. Avoid element selectors for styling
3. Keep selectors short and specific
4. Limit nesting to 3 levels maximum
5. Use BEM-like naming for components

```css
/* Good */
.task-card {
}
.task-card__header {
}
.task-card__title {
}
.task-card--highlighted {
}

/* Bad */
#taskCard {
}
div.task-card p {
}
.dashboard .content .tasks .card {
}
```

### Specificity Guidelines

1. Utility classes use !important (sparingly)
2. Component styles avoid !important
3. Use classes for specificity management
4. Document any necessary specificity overrides

## Media Queries

### Breakpoint System

```css
/* Mobile First */
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

### Best Practices

1. Use mobile-first approach
2. Keep media queries at the component level
3. Use standard breakpoints consistently
4. Consider device capabilities (hover, touch)

```css
/* Component-level media queries */
.component {
  /* Base styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}
```

## Performance

### Critical CSS

- Inline critical styles in <head>
- Defer non-critical CSS loading
- Keep critical CSS under 14KB

### Optimization

1. Minimize expensive properties
   - transform over left/top
   - opacity over visibility
   - will-change sparingly
2. Reduce paint/layout triggers
3. Use contain property when applicable
4. Optimize animations

```css
/* Good */
.card {
  transform: translateX(100px);
  opacity: 0;
}

/* Bad */
.card {
  left: 100px;
  visibility: hidden;
}
```

## Accessibility

### Requirements

1. Sufficient color contrast (WCAG AA)
2. Focus indicators
3. Reduced motion support
4. Screen reader support

### Implementation

```css
/* Focus Indicators */
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Documentation

### Component Documentation

```css
/**
 * Task Card Component
 * 
 * @description Displays a single task with its details
 * @example
 * <div class="task-card">
 *   <div class="task-card__header">...</div>
 * </div>
 * 
 * @modifiers
 * - task-card--highlighted: Highlights the card
 * - task-card--completed: Shows completed state
 */
```

### Comments

- Document complex selectors
- Explain non-obvious solutions
- Mark temporary fixes/hacks
- Reference related components

## Testing

### Visual Testing

1. Cross-browser testing
2. Responsive testing
3. Dark theme testing
4. High contrast testing

### Browser Support

- Modern browsers (last 2 versions)
- Mobile browsers
- Progressive enhancement approach

## Maintenance

### Regular Tasks

1. Audit unused styles
2. Update dependencies
3. Review browser support
4. Performance monitoring

### Code Review

- Check for duplicates
- Verify accessibility
- Review performance impact
- Ensure documentation

## Tools

### Development

1. PostCSS for processing
2. Stylelint for linting
3. Prettier for formatting
4. CSS Modules for scoping

### Build Process

1. Minification
2. Autoprefixer
3. CSS Modules compilation
4. Critical CSS extraction

## Version Control

### Git Practices

1. Separate CSS changes in commits
2. Include before/after screenshots
3. Document breaking changes
4. Review impact on dependencies

### Change Management

1. Semantic versioning for CSS
2. Deprecation process
3. Migration guides
4. Breaking change policy

## Future Considerations

### Modern CSS Features

1. Container Queries
2. Cascade Layers
3. :has() selector
4. Subgrid

### Progressive Enhancement

1. Feature detection
2. Fallback strategies
3. Browser support matrix
4. Documentation updates
