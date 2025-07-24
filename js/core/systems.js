// 🏗️ CODE QUALITY IMPROVEMENTS

// 1. ERROR BOUNDARIES
class ErrorBoundary {
    constructor(element, fallback) {
        this.element = element;
        this.fallback = fallback;
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            if (this.element.contains(e.target)) {
                this.showFallback(e.error);
            }
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.showFallback(e.reason);
        });
    }

    showFallback(error) {
        console.error('Component error:', error);
        this.element.innerHTML = this.fallback;
    }
}

// 2. PERFORMANCE MONITORING
class PerformanceMonitor {
    constructor() {
        this.metrics = {};
        this.observers = [];
    }

    startMonitoring() {
        // Measure component load times
        this.measureComponentLoading();

        // Monitor layout shifts
        this.observeLayoutShifts();

        // Track user interactions
        this.trackInteractions();
    }

    measureComponentLoading() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name.includes('component')) {
                    this.metrics[entry.name] = entry.duration;
                }
            }
        });
        observer.observe({ entryTypes: ['measure'] });
        this.observers.push(observer);
    }

    observeLayoutShifts() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    this.metrics.cumulativeLayoutShift =
                        (this.metrics.cumulativeLayoutShift || 0) + entry.value;
                }
            }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(observer);
    }

    trackInteractions() {
        ['click', 'keydown', 'scroll'].forEach(eventType => {
            document.addEventListener(eventType, (e) => {
                performance.mark(`interaction-${eventType}-start`);
                requestAnimationFrame(() => {
                    performance.mark(`interaction-${eventType}-end`);
                    performance.measure(
                        `interaction-${eventType}`,
                        `interaction-${eventType}-start`,
                        `interaction-${eventType}-end`
                    );
                });
            }, { passive: true });
        });
    }

    getMetrics() {
        return {
            ...this.metrics,
            navigationTiming: performance.getEntriesByType('navigation')[0],
            resourceTiming: performance.getEntriesByType('resource')
        };
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
    }
}

// 3. COMPONENT LIFECYCLE MANAGER
class ComponentManager {
    constructor() {
        this.components = new Map();
        this.loadQueue = [];
        this.isLoading = false;
    }

    register(name, component) {
        this.components.set(name, component);
    }

    async load(componentName) {
        if (this.components.has(componentName)) {
            return this.components.get(componentName);
        }

        this.loadQueue.push(componentName);
        if (!this.isLoading) {
            return this.processQueue();
        }
    }

    async processQueue() {
        this.isLoading = true;

        while (this.loadQueue.length > 0) {
            const componentName = this.loadQueue.shift();
            try {
                const component = await this.importComponent(componentName);
                this.components.set(componentName, component);

                // Register custom element
                if (!customElements.get(componentName)) {
                    customElements.define(componentName, component);
                }
            } catch (error) {
                console.error(`Failed to load component ${componentName}:`, error);
            }
        }

        this.isLoading = false;
    }

    async importComponent(name) {
        // Dynamic import with fallback
        try {
            const module = await import(`./components/${name}.js`);
            return module.default;
        } catch (error) {
            // Fallback to basic component
            return this.createFallbackComponent(name);
        }
    }

    createFallbackComponent(name) {
        return class extends HTMLElement {
            connectedCallback() {
                this.innerHTML = `
                    <div class="error-boundary">
                        <div class="error-message">Component "${name}" failed to load</div>
                        <button class="retry-button" onclick="location.reload()">Retry</button>
                    </div>
                `;
            }
        };
    }
}

// 4. UTILITY FUNCTIONS
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Safe DOM manipulation
    safeQuerySelector(selector, context = document) {
        try {
            return context.querySelector(selector);
        } catch (error) {
            console.error('Invalid selector:', selector, error);
            return null;
        }
    },

    // Format numbers with locale
    formatNumber(num, options = {}) {
        return new Intl.NumberFormat('en-US', options).format(num);
    },

    // Generate unique IDs
    generateId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// 5. INITIALIZE SYSTEMS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize performance monitoring
    window.performanceMonitor = new PerformanceMonitor();
    window.performanceMonitor.startMonitoring();

    // Initialize component manager
    window.componentManager = new ComponentManager();

    // Set up error boundaries for critical components
    const criticalComponents = [
        '.welcome-section',
        'analytics-dashboard',
        'task-system'
    ];

    criticalComponents.forEach(selector => {
        const element = Utils.safeQuerySelector(selector);
        if (element) {
            new ErrorBoundary(element, '<div class="error-boundary"><div class="error-message">Component temporarily unavailable</div></div>');
        }
    });

    // Add body class for JavaScript availability
    document.body.classList.add('js');

    console.log('🚀 Quantum Forge - Systems initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ErrorBoundary, PerformanceMonitor, ComponentManager, Utils };
}
