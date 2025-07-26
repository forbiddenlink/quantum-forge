# Quantum Forge - AI Coding Assistant Instructions

Quantum Forge is a contest-winning employee portal featuring AI-powered task management, real-time analytics, and spectacular visual effects. This modern web application uses vanilla JavaScript with Web Components architecture.

## Contest Context & Requirements

**Challenge**: Design a dream intranet homepage for a fictional company using CSS, HTML, and JavaScript only. Create the perfect digital workspace showcasing upcoming events, team spotlights, useful resources, and innovative widgets.

**Judging Criteria** (Priority Focus Areas):
1. **Responsiveness and Accessibility** - WCAG 2.1 compliance, mobile-first design
2. **Usability and User Experience** - Intuitive navigation, seamless interactions  
3. **Creativity** - Innovative visual effects, engaging animations, unique features
4. **Code Quality** - Clean architecture, performance optimization, maintainable code

**Technical Constraints**: Pure frontend stack only (HTML/CSS/JavaScript) - no backend or build tools allowed.

## Architecture Overview

### Core Structure
- **Frontend-only application** - No backend server, uses local storage and mock data
- **Web Components architecture** - Custom elements like `<task-system>`, `<analytics-dashboard>`, `<office-visualizer>`
- **Service-based architecture** - Core services in `js/services/` (performance, security, analytics, chart management)
- **CSS-first design system** - Layered CSS architecture with critical/main/component separation

### Key Design Patterns
```javascript
// Custom Web Components pattern used throughout
class SpectacularTaskSystem extends HTMLElement {
    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeSpectacularEffects();
    }
}
customElements.define('task-system', SpectacularTaskSystem);
```

### CSS Architecture
- **Critical loading order**: `critical.css` → `main.css` → `components.css` → feature-specific files
- **CSS Variables hierarchy**: Design tokens in `:root`, component variables that reference globals
- **BEM-like naming**: `.task-card`, `.task-card__header`, `.task-card--highlighted`
- **Component isolation**: Each component has dedicated CSS files in `/styles/components/`

## Development Workflows

### Adding New Components
1. Create component in `js/components/[name].js` extending `HTMLElement`
2. Register with `customElements.define('[tag-name]', ComponentClass)`
3. Add CSS file to `styles/` following naming convention
4. Import CSS in `styles/imports.css` following load order
5. Add script tags to HTML pages that use the component

### CSS Development
- **Never edit files directly** - Use the CSS cleanup tools in `css-cleanup-tools/` folder
- **Always backup before changes** - Extensive backup system with timestamped saves
- **Check for duplicates** - Use `find-duplicates.js` to detect duplicate CSS rules
- **Follow import hierarchy** - Defined in `styles/imports.css` and `CSS_ARCHITECTURE.md`

### Performance Optimization
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

### Contest Quality Standards
- **Code Quality Focus** - Clean, maintainable architecture is a judging criterion
- **Performance monitoring** - Built-in metrics tracking for optimal UX
- **Error boundaries** - Graceful degradation ensures reliability during judging
- **No build tools** - Pure vanilla JavaScript showcases technical skill

## Project-Specific Conventions

### Theme System
- **Dynamic color system** - Components use `applyColorTheme()` function from `app.js`
- **CSS variables for theming** - All colors defined as CSS custom properties
- **Theme persistence** - Stored in localStorage as HSL values, not hex

### Component Communication
```javascript
// Event-driven architecture - components communicate via custom events
this.dispatchEvent(new CustomEvent('task-updated', { 
    detail: { taskId, status },
    bubbles: true 
}));
```

### Error Handling
- **Error boundaries** - `ErrorBoundary` class in `js/core/systems.js` wraps critical components
- **Graceful degradation** - Components show fallback content when features fail
- **Performance monitoring** - `PerformanceMonitor` tracks render times and memory usage

### Accessibility
- **WCAG 2.1 compliance** - Built-in `AccessibilityEnhancer` component
- **Screen reader support** - Live regions and ARIA labels throughout
- **Keyboard navigation** - All components support full keyboard interaction
- **Contest requirement** - Accessibility is a primary judging criterion

## Contest-Winning Features

### Featured Widgets & Content
- **Company Culture Showcase** - Interactive employee stories and values
- **Enhanced Interactive Polls** - Real-time voting with animated charts
- **AI-Powered Task Management** - Smart prioritization and workflow optimization
- **Real-Time Analytics Dashboard** - Live performance metrics and visualizations
- **Office Visualizer** - 3D workspace with desk booking and team presence
- **Team Spotlight** - Employee achievements and collaboration metrics
- **Smart Knowledge Hub** - AI-driven content recommendations
- **Weather Integration** - Contextual office environment data

### Creativity & Visual Excellence
- **Spectacular effects** - Particle systems, aurora effects, constellation patterns
- **Glassmorphism design** - Modern glass-like UI elements
- **Smooth animations** - 60fps micro-interactions and transitions
- **Dynamic theming** - Real-time color customization with HSL system
- **Contest-grade polish** - Every interaction designed for judges' evaluation

## Integration Points

### External Dependencies
- **Chart.js** - Managed through centralized `ChartManager` service to prevent memory leaks
- **Web APIs** - Service Worker for offline support, Intersection Observer for performance
- **No build system** - Direct ES6 imports and vanilla web standards

### Data Flow
- **Mock data patterns** - Components load realistic sample data from internal methods
- **LocalStorage persistence** - User preferences and themes saved locally
- **Event-driven updates** - Real-time UI updates via DOM events

### Security Implementation
```javascript
// SecurityManager handles CSP, XSS prevention, input sanitization
class SecurityManager {
    cspDirectives = {
        'script-src': "'self' 'unsafe-inline' https://cdn.jsdelivr.net",
        'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com"
    };
}
```

## Critical File Relationships

- `index.html` → Entry point with all component script imports
- `js/app.js` → Core initialization, theme management, sidebar handling  
- `styles/imports.css` → Central CSS import management with documented load order
- `js/core/systems.js` → Error boundaries, performance monitoring, component lifecycle
- `css-cleanup-tools/` → Essential for CSS maintenance, never edit styles without these tools

## Testing & Debugging

### Built-in Debug Tools
- Component registration logging in `app.js` shows which custom elements loaded
- Performance metrics available via `window.getContestStatus()`
- CSS duplicate detection through `css-cleanup-tools/find-duplicates.js`

### Common Issues
- **Component not rendering** - Check custom element registration in browser console
- **CSS conflicts** - Use duplicate detection tools before making changes
- **Performance issues** - Monitor via `PerformanceMonitor` service

When working on this codebase, prioritize the modular component architecture, maintain the CSS cleanup discipline, and leverage the built-in performance and error handling systems.
