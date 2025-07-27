# Quantum Forge - AI Coding Assistant Instructions

Quantum Forge is a contest-winning employee portal featuring AI-powered task management, real-time analytics, and spectacular visual effects. Built with vanilla JavaScript using a Web Components architecture.

## Contest Context & Requirements

**Challenge**: Design your dream intranet homepage for a fictional company using CSS, HTML, and JavaScript only. Create the perfect digital workspace showcasing upcoming events, team spotlights, useful resources, and innovative widgets.

**Judging Criteria** (Priority Focus Areas):
1. **Responsiveness and Accessibility** - WCAG 2.1 compliance, mobile-first design
2. **Usability and User Experience** - Intuitive navigation, seamless interactions  
3. **Creativity** - Innovative visual effects, engaging animations, unique features
4. **Code Quality** - Clean architecture, performance optimization, maintainable code

**Contest Deadline**: July 27, 2025 at 11:59 PM PDT
**Technical Constraints**: Pure frontend stack only (HTML/CSS/JavaScript) - no backend or build tools allowed.

## Current Contest Issues to Address

### Design & Layout Issues
- **Cohesive design** - Ensure unified visual theme across all components
- **Logical layout flow** - Components should flow in intuitive order
- **Component sizing** - Some sections are too long and narrow, need better proportions
- **White space consistency** - Remove extra white space around components
- **Background conflicts** - Fix white backgrounds in components that don't match theme

### Functionality Requirements
- **All buttons must be clickable** - Every interactive element needs proper routing
- **Complete sidebar navigation** - All components need sidebar menu items
- **16 sidebar pages** - All pages must be properly set up and functional
- **Unified theme application** - All components must use consistent theming

## Essential Architecture Knowledge

**Core Constraint**: Pure frontend stack - no backend, no build tools, no frameworks allowed.

**Component Pattern**: All 35+ components follow this initialization pattern:
```javascript
class SpectacularTaskSystem extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false; // Prevent double initialization
        this.animationFrame = null; // Always track for cleanup
    }
    
    connectedCallback() {
        if (this.isInitialized) return;
        this.render();
        this.setupEventListeners();
        this.isInitialized = true;
    }
    
    disconnectedCallback() {
        // CRITICAL: Always cleanup animations/intervals
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}
customElements.define('task-system', SpectacularTaskSystem);
```

**Component Registration**: All components registered in `js/app.js` via `customElementsToCheck` array.
## Critical Development Workflows

### Contest-Ready Checklist
```bash
# Before final submission - verify contest requirements
1. All buttons clickable and route to proper pages ✓
2. All 16 sidebar pages fully functional ✓
3. Cohesive design theme applied everywhere ✓
4. No white space or background inconsistencies ✓  
5. Logical component flow and sizing ✓
6. Creative features that wow judges ✓
```

### CSS Development - NEVER edit styles directly
```bash
# ALWAYS use cleanup tools before CSS changes
cd css-cleanup-tools
node find-duplicates.js  # Check current duplicate count
```
- All changes must go through `css-cleanup-tools/` directory
- Always create timestamped backups before changes
- CSS hierarchy: `critical.css` → `main.css` → `components.css` → feature files
- All animations centralized in `animations.css` (50+ shared keyframes)
- **Contest Priority**: Fix background conflicts and white space issues

### Adding Components
1. Create in `js/components/[name].js` extending `HTMLElement`
2. Add to `customElementsToCheck` array in `js/app.js`
3. Create CSS file following naming convention
4. Import CSS in `styles/imports.css` following load order
5. Add script tags to HTML pages using the component
6. **Contest Requirement**: Add sidebar menu item for component
7. **Contest Requirement**: Ensure all buttons are clickable and route properly

### Chart.js Integration
```javascript
// ALWAYS use centralized ChartManager to prevent memory leaks
const chart = await window.chartManager.createChart('myCanvas', config);
// Manager handles: loading, lifecycle, memory management, performance optimization
```

### Performance Patterns
```javascript
// All components use this pattern for optimal performance
class PerformanceOptimizedComponent extends HTMLElement {
    constructor() {
        super();
        this.intersectionObserver = null; // Lazy loading
        this.resizeObserver = null;       // Responsive updates
        this.animationFrame = null;       // Animation cleanup
        this.isVisible = false;           // Visibility tracking
        this.needsRefresh = false;        // Re-render state
    }

    connectedCallback() {
        if (this.isInitialized) return;
        this.setupIntersectionObserver();
        this.setupResizeObserver();
        this.isInitialized = true;
    }

    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible && this.needsRefresh) {
                    this.refresh();
                }
            });
        });
        this.intersectionObserver.observe(this);
    }

    disconnectedCallback() {
        this.intersectionObserver?.disconnect();
        this.resizeObserver?.disconnect();
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}
```

## Project-Specific Conventions

### Theme System
- **Dynamic color system** - Components use `applyColorTheme()` function from `app.js`
- **CSS variables for theming** - All colors defined as CSS custom properties
- **Theme persistence** - Stored in localStorage as HSL values, not hex
- **Critical Theme Chain**:
  1. `initializeTheme()` in `app.js` bootstraps theme
  2. `applyColorTheme(theme)` sets CSS variables
  3. Components inherit via `--user-primary-*` vars
  4. Dark mode uses `data-theme="dark"` attribute
  5. Background fixes via `forceLightThemeAndFixBackgrounds()`

### Component Communication
```javascript
// Event-driven architecture - components communicate via custom events
this.dispatchEvent(new CustomEvent('task-updated', { 
    detail: { taskId, status },
    bubbles: true 
}));

// Listen for events on parent containers, not individual components
parentContainer.addEventListener('task-updated', (event) => {
    const { taskId, status } = event.detail;
    updateTaskUI(taskId, status);
}, { passive: true }); // Use passive listeners for scroll performance

// Animation sync via requestAnimationFrame
requestAnimationFrame(() => {
    this.updateParticleColors();
    this.updateSparkleIntensity();
});
```

### Error Handling & Fallbacks
- **Error boundaries** - `ErrorBoundary` class in `js/core/systems.js` wraps critical components
- **Graceful degradation** - Components show fallback content when features fail
- **Performance monitoring** - `PerformanceMonitor` tracks render times and memory usage

```javascript
// Every component MUST implement fallback content
renderFallback() {
    console.log('🔄 Rendering fallback UI...');
    this.innerHTML = `
        <div class="enhanced-task-system fallback">
            <div class="task-system-header">
                <h2 class="task-system-title">${this.componentName}</h2>
                <p class="task-system-subtitle">Loading enhanced features...</p>
            </div>
            <div class="fallback-content">
                <div class="loading-spinner"></div>
                <p>Initializing component...</p>
            </div>
        </div>
    `;
}

### Service Architecture
```javascript
// Core services centralize critical functionality 
window.chartManager = new ChartManager();           // Chart.js lifecycle management
window.performanceMonitor = new PerformanceMonitor(); // Real-time metrics
window.analyticsService = new AnalyticsService();   // Data visualization
// Access via: window.serviceName from any component

// Four-layer Performance Architecture:
const performance = {
    optimizer: new PerformanceOptimizer(),     // Low-level optimization
    monitor: new EnhancedPerformanceMonitor(), // Real-time metrics
    manager: new PerformanceManager(),         // Resource management  
    stats: new PerformanceOptimizedStats()     // User-facing metrics
};
```

## Critical File Relationships

- `index.html` → Entry point with all component script imports
- `js/app.js` → Core initialization, theme management, component registration  
- `styles/imports.css` → Central CSS import management with documented load order
- `js/core/systems.js` → Error boundaries, performance monitoring, component lifecycle
- `css-cleanup-tools/` → Essential for CSS maintenance, never edit styles without these tools
- `js/services/chart-manager.js` → Centralized Chart.js management preventing memory leaks

## Testing & Debugging

### Built-in Debug Tools
- Component registration logging in `app.js` shows which custom elements loaded
- CSS duplicate detection through `css-cleanup-tools/find-duplicates.js`
- Manual component testing via browser console: `document.createElement('analytics-dashboard')`
- Chart performance: `window.chartManager.getPerformanceReport()`

```javascript
// Verify component state and performance
setTimeout(() => {
    const componentsToCheck = [
        'analytics-dashboard',
        'task-system',
        'enhanced-knowledge-hub'
    ];

    let hasEmptyComponents = false;
    componentsToCheck.forEach(tagName => {
        const elements = document.querySelectorAll(tagName);
        elements.forEach(el => {
            console.log(`🔍 Checking ${tagName}:`, {
                innerHTML: el.innerHTML.length,
                offsetWidth: el.offsetWidth,
                offsetHeight: el.offsetHeight,
                display: getComputedStyle(el).display,
                visibility: getComputedStyle(el).visibility,
                opacity: getComputedStyle(el).opacity
            });

            if (el.innerHTML.trim().length === 0) {
                console.warn(`⚠️ Empty component: ${tagName}`);
                hasEmptyComponents = true;
                el.innerHTML = `
                    <div style="padding: 20px; text-align: center;">
                        <h3>${tagName.replace('-', ' ').toUpperCase()}</h3>
                        <p>Component is loading...</p>
                        <div class="loading-spinner"></div>
                    </div>
                `;
            }
        });
    });
}, 3000); // Check after initial load

### Common Issues & Debugging
- **Component not rendering** - Check custom element registration in browser console
- **CSS conflicts** - Use duplicate detection tools before making changes
- **Memory leaks** - Ensure proper cleanup in `disconnectedCallback()` methods
- **Chart.js errors** - Always use `window.chartManager` instead of direct Chart.js

```javascript
// Debug: Component Registration Verification
console.log('🔍 Checking component registration...');
const customElementsToCheck = [
    'analytics-dashboard',
    'task-system',
    'enhanced-knowledge-hub'
];

customElementsToCheck.forEach(tagName => {
    const isRegistered = customElements.get(tagName);
    console.log(`${isRegistered ? '✅' : '❌'} ${tagName}: ${isRegistered ? 'Registered' : 'NOT REGISTERED'}`);

    // Check DOM presence
    const elements = document.querySelectorAll(tagName);
    elements.forEach((el, index) => {
        console.log(`  📦 Element ${index}:`, {
            innerHTML: el.innerHTML.length,
            offsetWidth: el.offsetWidth,
            display: getComputedStyle(el).display,
            visibility: getComputedStyle(el).visibility
        });
    });
});
```

### Contest-Specific Issues
- **White Background Fix**:
  ```javascript
  // Force light theme and fix backgrounds
  document.documentElement.setAttribute('data-theme', 'light');
  localStorage.setItem('theme', 'light');
  
  // Remove white backgrounds from insight elements
  document.querySelectorAll('*[class*="insight"]')
      .forEach(el => {
          el.style.setProperty('background', 'transparent', 'important');
          el.style.setProperty('background-color', 'transparent', 'important');
      });
  ```
- **Button Routing**: Implement click handlers for ALL interactive elements
- **Sidebar Navigation**: Every component needs a sidebar menu entry
- **Layout Flow**: Follow the `contest-logical-layout.css` patterns

## Contest-Specific Patterns

### Button Click Handling
```javascript
// All buttons must route somewhere - contest requirement
button.addEventListener('click', (e) => {
    e.preventDefault();
    // Route to appropriate page
    window.location.href = '/pages/target-page.html';
    // Or use custom navigation system
});
```

### Sidebar Integration
```javascript
// Every component needs sidebar menu representation
// Add to sidebar navigation in appropriate HTML files
<nav class="sidebar-nav">
    <a href="/pages/component-page.html">Component Name</a>
</nav>
```

### Theme Consistency
```javascript
// Ensure all components use unified theming
connectedCallback() {
    this.render();
    this.applyThemeConsistency(); // Apply unified colors/backgrounds
    this.setupEventListeners();
}
```

### Keyboard Navigation & Accessibility
```javascript
// Initialize keyboard navigation with screen reader support
function initializeKeyboardShortcuts() {
    // Detect keyboard usage for focus indicators
    let isUsingKeyboard = false;

    document.addEventListener('keydown', (e) => {
        isUsingKeyboard = true;
        document.body.classList.add('keyboard-user');

        // Command palette - Ctrl/Cmd + K
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const commandPalette = document.querySelector('command-palette');
            if (commandPalette?.toggle) {
                commandPalette.toggle();
                announceToScreenReader('Command palette toggled');
            }
        }

        // Theme toggle - Ctrl/Cmd + T
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            const newTheme = toggleTheme();
            announceToScreenReader(`Theme changed to ${newTheme} mode`);
        }
    });

    // Remove keyboard focus indicators on mouse use
    document.addEventListener('mousedown', () => {
        isUsingKeyboard = false;
        document.body.classList.remove('keyboard-user');
    });
}

// Screen reader announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.cssText = 'position: absolute; left: -10000px;';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
}
```

When working on this codebase, prioritize the modular component architecture, maintain the CSS cleanup discipline, and leverage the built-in performance and error handling systems. Always ensure keyboard accessibility and screen reader support are maintained when adding new features.
