# 🎨 Quantum Forge CSS Guide
*Comprehensive CSS Architecture, Variables, Theming & Component System*

## 📋 **Table of Contents**

1. [Architecture Overview](#architecture-overview)
2. [Variable System](#variable-system)
3. [Theme Implementation](#theme-implementation)
4. [Component Guidelines](#component-guidelines)
5. [Import System](#import-system)
6. [Performance Guidelines](#performance-guidelines)
7. [Accessibility Standards](#accessibility-standards)
8. [Cleanup Process](#cleanup-process)

---

## 🏗️ **Architecture Overview**

### **Core Principles**

Quantum Forge uses a sophisticated CSS architecture designed for maintainability, performance, and scalability:

1. **Modular Component System** - Each component has dedicated CSS files
2. **CSS-First Design** - Layered architecture with sophisticated theming
3. **Performance Optimization** - Critical CSS loading and component isolation
4. **Accessibility First** - WCAG 2.1 compliance built-in

### **File Organization**

```
styles/
├── imports.css          # Central import file (manages 50+ files)
├── critical.css         # Critical path CSS (above-the-fold)
├── critical-fixes.css   # CSS variables and critical fixes
├── main.css            # Main styles (838KB - largest file)
├── animations.css      # Master animation repository (17KB)
├── components.css      # Shared component definitions (18KB)
├── utilities.css       # Utility classes
├── dark-theme.css      # Dark theme overrides
├── components/         # Component-specific styles
│   ├── task-system.css
│   ├── quick-insights.css
│   └── task-management.css
└── [40+ feature files] # Specific component and feature styles
```

### **Import Order (Critical)**

The `imports.css` file manages loading order to prevent conflicts:

```css
/* 1. CRITICAL CSS - Load First */
@import url('./critical-fixes.css');  /* Variables and critical fixes */
@import url('./critical.css');        /* Above-the-fold styles */

/* 2. CORE STYLES - Load Second */
@import url('./main.css');            /* Main layout and base styles */
@import url('./enhanced.css');        /* Enhanced layout structure */

/* 3. COMPONENT STYLES - Load Third */
@import url('./components.css');      /* Shared component styles */
@import url('./components/task-system.css');
@import url('./components/task-management.css');
@import url('./components/quick-insights.css');

/* 4. ENHANCEMENT STYLES - Load Fourth */
@import url('./enhanced-task-system.css');
@import url('./welcome-section.css');
@import url('./enhanced-knowledge-hub.css');
/* ... 30+ more enhancement files */

/* 5. THEME AND UTILITIES - Load Last */
@import url('./utilities.css');
@import url('./dark-theme.css');
@import url('./animations.css');
/* ... theme and utility files */

/* 6. UNIFIED HOMEPAGE STYLING - CRITICAL: Load After All Components */
@import url('./unified-homepage-styling.css'); /* MUST load last */
```

### **Component Architecture Pattern**

All components follow a consistent Web Components pattern:

```javascript
// Unified Component Pattern
class SpectacularComponent extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeSpectacularEffects();
    }
    
    render() {
        // Component rendering logic
    }
    
    setupEventListeners() {
        // Event handling
    }
    
    initializeSpectacularEffects() {
        // Visual effects and animations
    }
}
customElements.define('spectacular-component', SpectacularComponent);
```

---

## 🎨 **Variable System**

### **Design Token Hierarchy**

Our CSS variable system follows a tiered approach from primitive design tokens to component-specific variables:

#### **1. Design Tokens (Primitives)**

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

  /* Spacing */
  --space-1: 0.25rem; /* 4px */
  --space-2: 0.5rem;  /* 8px */
  --space-3: 0.75rem; /* 12px */
  --space-4: 1rem;    /* 16px */
  --space-5: 1.25rem; /* 20px */
  --space-6: 1.5rem;  /* 24px */
  --space-8: 2rem;    /* 32px */
  --space-10: 2.5rem; /* 40px */
  --space-12: 3rem;   /* 48px */
  --space-16: 4rem;   /* 64px */

  /* Typography */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --line-height-none: 1;
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;

  /* Borders & Radii */
  --border-width-0: 0px;
  --border-width-1: 1px;
  --border-width-2: 2px;
  --border-width-4: 4px;
  --border-width-8: 8px;

  --radius-none: 0;
  --radius-sm: 0.125rem;  /* 2px */
  --radius-md: 0.375rem;  /* 6px */
  --radius-lg: 0.5rem;    /* 8px */
  --radius-xl: 0.75rem;   /* 12px */
  --radius-2xl: 1rem;     /* 16px */
  --radius-3xl: 1.5rem;   /* 24px */
  --radius-full: 9999px;

  /* Shadows & Effects */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  --blur-none: 0;
  --blur-sm: 4px;
  --blur-md: 8px;
  --blur-lg: 12px;
  --blur-xl: 16px;
  --blur-2xl: 24px;
  --blur-3xl: 32px;

  /* Animation & Timing */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-linear: linear;
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

#### **2. Semantic Variables**

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
  --gradient-primary: linear-gradient(135deg, var(--primary-500), var(--primary-600));
  --gradient-success: linear-gradient(135deg, var(--success-500), var(--success-600));
  --gradient-warning: linear-gradient(135deg, var(--warning-500), var(--warning-600));
  --gradient-error: linear-gradient(135deg, var(--error-500), var(--error-600));
}
```

#### **3. Component Variables**

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

### **Naming Conventions**

```css
/* Pattern: --{context}-{property}-{variant} */

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

### **Usage Guidelines**

#### **Do's**
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

#### **Don'ts**
```css
/* Don't: Use hard-coded values */
.element {
  color: #1a1a1a; /* Bad */
  margin: 16px;   /* Bad */
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

---

## 🎭 **Theme Implementation**

### **Unified Theme System**

Our theme system provides consistent, modern, and accessible user interface across all components:

#### **Core Principles**

1. **Unified Design Language** - All components share the same design language
2. **Accessibility First** - High contrast color combinations and clear visual hierarchy
3. **Responsive & Adaptive** - Fluid layouts that adapt to any screen size

#### **Component Base Styles**

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

#### **Component Base Pattern**

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

#### **Component Types**

##### **Cards**
```css
.card {
    composes: component-base;
    padding: var(--space-6);
}
```

##### **Buttons**
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

##### **Inputs**
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

### **Dark Theme Implementation**

```css
[data-theme="dark"] {
    /* Semantic overrides */
    --bg-base: var(--gray-900);
    --bg-elevated: var(--gray-800);
    --text-primary: var(--gray-50);

    /* Component semantic overrides */
    --component-bg: rgba(31, 41, 55, 0.8);
    --component-border: rgba(75, 85, 99, 0.3);
    
    /* Welcome section specific */
    --welcome-bg-start: #1e293b;
    --welcome-bg-end: #0f172a;
    --welcome-text: #f8fafc;
    --welcome-text-muted: #94a3b8;
}
```

### **Accessibility Features**

#### **Reduced Motion**
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

#### **High Contrast**
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

---

## 🧩 **Component Guidelines**

### **Component Development Workflow**

#### **1. Create Component File**
Create component in `js/components/[name].js` extending `HTMLElement`:

```javascript
class SpectacularTaskSystem extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeSpectacularEffects();
    }
}
customElements.define('task-system', SpectacularTaskSystem);
```

#### **2. Add CSS File**
Add CSS file to `styles/` following naming convention:
- Use kebab-case for file names
- Include component-specific styles
- Follow the established patterns

#### **3. Import CSS**
Import CSS in `styles/imports.css` following load order:
- Component styles load after core styles
- Feature-specific styles load after component styles
- Theme and utilities load last

#### **4. Add Script Tags**
Add script tags to HTML pages that use the component:

```html
<script src="js/components/task-system.js"></script>
```

### **CSS Integration**

#### **Component Isolation**
Each component has dedicated CSS files in `/styles/components/`:

```css
/* styles/components/task-system.css */
.task-system {
    /* Component-specific styles */
    background: var(--component-bg);
    border: 1px solid var(--component-border);
    border-radius: var(--radius-xl);
    padding: var(--space-6);
}

.task-system__header {
    /* Component sub-element styles */
    margin-bottom: var(--space-4);
}

.task-system--highlighted {
    /* Component modifier styles */
    border-color: var(--primary-500);
}
```

#### **Best Practices**

1. **Keep component styles isolated** - Avoid dependencies on other components
2. **Use CSS variables from critical.css** - For consistent theming
3. **Follow existing naming conventions** - BEM-like methodology
4. **Document complex selectors** - Include comments for non-obvious solutions
5. **Include responsive styles** - Within the component file

#### **Component Communication**

Use event-driven architecture for component communication:

```javascript
// Event-driven architecture - components communicate via custom events
this.dispatchEvent(new CustomEvent('task-updated', { 
    detail: { taskId, status },
    bubbles: true 
}));
```

### **Service Integration Pattern**

```javascript
// Service integration pattern
class EnhancedComponent extends HTMLComponent {
    constructor() {
        super();
        this.performanceOptimizer = new PerformanceOptimizer();
        this.securityManager = new SecurityManager();
    }
    
    render() {
        // Performance monitoring
        this.performanceOptimizer.trackRenderStart();
        // Component rendering logic
        this.performanceOptimizer.trackRenderEnd();
    }
}
```

---

## 📦 **Import System**

### **Central Import Management**

The `styles/imports.css` file manages all CSS imports in the correct order to prevent conflicts:

#### **Loading Order**

1. **Critical CSS** - Variables, reset, essential styles
2. **Core styles** - Main layout, base components  
3. **Component styles** - Reusable components
4. **Enhancement styles** - Specific features
5. **Theme and utilities** - Overrides and utilities

#### **File Categories**

```css
/* ===== 1. CRITICAL CSS - Load First ===== */
@import url('./critical-fixes.css');  /* CSS variables and critical fixes */
@import url('./critical.css');        /* Critical above-the-fold styles */

/* ===== 2. CORE STYLES - Load Second ===== */
@import url('./main.css');            /* Main layout and base styles */
@import url('./enhanced.css');        /* Enhanced layout structure */

/* ===== 3. COMPONENT STYLES - Load Third ===== */
@import url('./components.css');      /* Shared component styles */
@import url('./components/task-system.css');
@import url('./components/task-management.css');
@import url('./components/quick-insights.css');

/* ===== 4. ENHANCEMENT STYLES - Load Fourth ===== */
@import url('./enhanced-task-system.css');
@import url('./welcome-section.css');
@import url('./enhanced-knowledge-hub.css');
@import url('./analytics-dashboard.css');
/* ... 30+ more enhancement files */

/* ===== 5. THEME AND UTILITIES - Load Last ===== */
@import url('./utilities.css');
@import url('./dark-theme.css');
@import url('./enhanced-colors.css');
@import url('./enhanced-theme-fixes.css');
@import url('./animations.css');
@import url('./performance-ux.css');
@import url('./mobile-optimizations.css');
@import url('./mobile-nav.css');
@import url('./creative-enhancements.css');
@import url('./contest-enhancements.css');
@import url('./culture-blur-fix.css');
@import url('./header-spacing-fix.css');
@import url('./svg-icon-styles.css');
@import url('./svg-icon-replacements.css');

/* ===== 6. UNIFIED HOMEPAGE STYLING - CRITICAL: Load After All Components ===== */
@import url('./unified-homepage-styling.css'); /* MUST load last to override component backgrounds */
```

### **Import Guidelines**

1. **Never edit imports.css directly** - Use the CSS cleanup tools
2. **Follow the established order** - Critical → Core → Components → Enhancements → Theme
3. **Add new files in appropriate sections** - Based on their purpose
4. **Test after changes** - Ensure no conflicts or missing styles

---

## ⚡ **Performance Guidelines**

### **Critical CSS**

- Inline critical styles in `<head>`
- Defer non-critical CSS loading
- Keep critical CSS under 14KB

### **Optimization Strategies**

1. **Minimize expensive properties**
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

2. **Reduce paint/layout triggers**
3. **Use contain property when applicable**
4. **Optimize animations**

### **Component Lazy Loading**

```javascript
// All components use this performance-first pattern
class PerformanceOptimizer {
    preloadCriticalComponents() {
        const critical = ['welcome-section', 'header', 'sidebar'];
        critical.forEach(async (name) => {
            await import(`../components/${name}.js`);
        });
    }
}
```

### **Memory Management**

- **Chart.js integration** - Managed through centralized `ChartManager` service
- **Animation cleanup** - Proper disposal of animation instances
- **Event listener cleanup** - Remove listeners on component disconnect

---

## ♿ **Accessibility Standards**

### **WCAG 2.1 Compliance**

Our components include built-in accessibility features:

#### **Focus Management**
```css
/* Focus Indicators */
*:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

#### **Screen Reader Support**
```css
/* Live regions and ARIA labels */
.live-region {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

#### **Keyboard Navigation**
- All components support full keyboard interaction
- Tab order follows logical document flow
- Escape key closes modals and resets focus

#### **Color Contrast**
- High contrast color combinations
- Automatic contrast adjustment in dark mode
- Support for high contrast mode preferences

---

## 🧹 **Cleanup Process**

### **Current Status**

- **Total Duplicates**: 357 (down from 453)
- **Cleanup Rounds**: 13 completed
- **Reduction**: 14.3% achieved
- **Next Target**: Internal animations.css duplicates

### **Working Tools**

#### **Duplicate Detection**
```bash
# Find all duplicates and generate report
node css-cleanup-tools/find-duplicates.js
```

#### **Safe Cleanup**
```bash
# Safe migration comment removal
.\css-cleanup-tools\main-css-dead-code-cleanup.ps1
```

#### **Backup Management**
```powershell
# Create backup before changes
$timestamp = Get-Date -Format 'yyyy-MM-dd-HH-mm'
Copy-Item "..\styles\filename.css" "..\styles\filename.css.backup-$timestamp"

# Restore if needed
Copy-Item "..\styles\filename.css.backup-TIMESTAMP" "..\styles\filename.css" -Force
```

### **Cleanup Methodology**

1. **Conservative approach** - 3-5 line context matching prevents accidental breakage
2. **Backup system** - Timestamped backups for all modifications
3. **Component focus** - Work on ONE component type at a time
4. **Manual inspection** - Review 3-5 examples before automation

### **Next Phase Targets**

- **Internal Animation Keyframes** - animations.css has internal duplicate keyframe segments
- **Complex Section Duplicates** - welcome-section.css has massive aiPulse duplication
- **Cross-File Keyframes** - Some `0%, 100% { opacity: 1; }` patterns remain
- **Long Selector Duplicates** - Complex `.search-container.spectacular` rules

### **Reference Documentation**

For detailed cleanup methodology and current progress, see:
- `css-cleanup-tools/CSS_CLEANUP_MASTER_GUIDE.md` - Complete cleanup guide
- `css-cleanup-tools/css-duplication-report.md` - Current duplicate analysis

---

## 📚 **Additional Resources**

- **CSS Architecture**: See `styles/CSS_ARCHITECTURE.md` for detailed architectural guidelines
- **CSS Variables**: See `styles/CSS_VARIABLES.md` for complete variable system documentation  
- **Theme System**: See `styles/THEME.md` for comprehensive theming implementation
- **Cleanup Process**: See `css-cleanup-tools/CSS_CLEANUP_MASTER_GUIDE.md` for active cleanup methodology

---

*This guide consolidates information from multiple documentation files to provide a single comprehensive reference for the Quantum Forge CSS system.* 