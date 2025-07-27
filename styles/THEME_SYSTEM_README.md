# Quantum Forge Theme System Documentation

The theme system uses a hierarchical approach to ensure consistent colors across the application while supporting both light and dark modes.

## Color System Hierarchy

1. **Raw HSL Values (Source of Truth)**
   - Defined in `theme-system.css`
   - Example: `--primary-h`, `--primary-s`, `--primary-l`

2. **Semantic Color Variables**
   - Based on HSL values
   - Defined in `theme-system.css`
   - Example: `--color-primary`, `--color-primary-400`, etc.

3. **Component Aliases**
   - Use semantic color variables
   - Defined in `critical-fixes.css` and component-specific CSS
   - Example: `--task-primary`, `--knowledge-primary`, etc.

## Theme System Files

### 1. theme-system.css
- Central source of truth for color definitions
- Defines base HSL values and semantic color variables
- Handles light/dark mode color calculations
- Defines global theme transitions and animations

### 2. critical-fixes.css
- Component-specific color variable definitions
- Uses semantic color variables from theme-system.css
- Handles dark mode overrides and accessibility fixes

### 3. component-specific CSS files
- Use semantic variables and component aliases
- Never calculate HSL values directly
- Always reference variables from theme-system.css or critical-fixes.css

## Example Usage

```css
/* ❌ Don't use direct HSL calculations */
.my-component {
    background: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
}

/* ✅ Use semantic color variables */
.my-component {
    background: var(--color-primary);
}

/* ✅ For component-specific colors, use component aliases */
.task-item {
    background: var(--task-primary);
}
```

## Theme Transition System

The theme system includes built-in transitions for smooth theme changes:

```css
/* Defined in theme-system.css */
:root {
    --theme-transition-duration: 0.2s;
    --theme-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
    --theme-transition: background-color var(--theme-transition-duration) var(--theme-transition-timing),
                       color var(--theme-transition-duration) var(--theme-transition-timing),
                       border-color var(--theme-transition-duration) var(--theme-transition-timing),
                       box-shadow var(--theme-transition-duration) var(--theme-transition-timing);
}
```

## Dark Mode Support

Dark mode colors are defined using the same semantic variable system:

```css
[data-theme="dark"] {
    /* Adjust semantic colors for dark mode */
    --color-primary-50: hsl(var(--primary-h), var(--primary-s), 15%);
    --color-primary-100: hsl(var(--primary-h), var(--primary-s), 20%);
    /* etc... */
}
```

## Adding New Components

When adding new components:

1. Use semantic color variables from `theme-system.css`
2. Define component-specific aliases in your component CSS
3. Follow the established naming convention
4. Test in both light and dark modes

Example:
```css
/* new-component.css */
.new-component {
    --new-component-primary: var(--color-primary);
    --new-component-accent: var(--color-primary-400);
    background: var(--new-component-primary);
}
```
