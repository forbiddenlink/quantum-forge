/**
 * 🚀 Performance Optimizer Service
 * Contest Enhancement: Advanced Performance Optimizations
 */

class PerformanceOptimizer {
    constructor() {
        this.criticalResourcesLoaded = false;
        this.componentsLoaded = new Set();
        this.intersectionObserver = null;
        this.performanceMetrics = {
            loadTime: 0,
            firstPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0
        };
        this.init();
    }

    /**
     * Initialize performance optimization
     */
    init() {
        this.setupCriticalResourceLoading();
        this.setupLazyLoading();
        this.setupPerformanceMonitoring();
        this.setupResourceHints();
        this.optimizeImageLoading();
        this.preloadCriticalComponents();
    }

    /**
     * Setup critical resource loading strategy
     */
    setupCriticalResourceLoading() {
        // Inline critical CSS is already loaded
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = [
            'styles/enhanced.css',
            'styles/components.css',
            'styles/animations.css'
        ];

        // Load non-critical CSS after critical path
        requestIdleCallback(() => {
            nonCriticalCSS.forEach(css => this.loadCSSAsync(css));
        });

        // Preload critical JavaScript modules
        const criticalJS = [
            'js/app.js',
            'js/components/welcome-section.js',
            'js/components/header.js'
        ];

        criticalJS.forEach(js => this.preloadScript(js));
    }

    /**
     * Load CSS asynchronously
     */
    loadCSSAsync(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print';
        link.onload = () => {
            link.media = 'all';
        };
        document.head.appendChild(link);
    }

    /**
     * Preload JavaScript modules
     */
    preloadScript(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    }

    /**
     * Setup lazy loading for components
     */
    setupLazyLoading() {
        this.intersectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadComponent(entry.target);
                        this.intersectionObserver.unobserve(entry.target);
                    }
                });
            },
            {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            }
        );

        // Observe all dashboard items for lazy loading
        const dashboardItems = document.querySelectorAll('.dashboard-item');
        dashboardItems.forEach(item => {
            if (!item.dataset.loaded) {
                this.intersectionObserver.observe(item);
            }
        });
    }

    /**
     * Load component when it becomes visible
     */
    async loadComponent(element) {
        const componentName = element.dataset.component;
        if (!componentName || this.componentsLoaded.has(componentName)) {
            return;
        }

        try {
            // Show loading state
            element.classList.add('loading');

            // Dynamic import of component
            const module = await import(`../components/${componentName}.js`);
            
            // Initialize component
            if (module.default) {
                const component = new module.default();
                component.mount(element);
            }

            // Mark as loaded
            this.componentsLoaded.add(componentName);
            element.dataset.loaded = 'true';
            element.classList.remove('loading');
            element.classList.add('loaded');

            console.log(`✅ Lazy loaded: ${componentName}`);
        } catch (error) {
            console.error(`❌ Failed to load ${componentName}:`, error);
            element.classList.remove('loading');
            element.classList.add('error');
        }
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitoring() {
        // Core Web Vitals monitoring
        this.measureLCP();
        this.measureCLS();
        this.measureFID();
        
        // Custom metrics
        this.measureLoadTime();
        this.measureResourceTiming();
        
        // Performance observer for paint timing
        if ('PerformanceObserver' in window) {
            const paintObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (entry.name === 'first-paint') {
                        this.performanceMetrics.firstPaint = entry.startTime;
                    }
                }
            });
            paintObserver.observe({ entryTypes: ['paint'] });
        }

        // Report metrics after page load
        window.addEventListener('load', () => {
            setTimeout(() => this.reportMetrics(), 1000);
        });
    }

    /**
     * Measure Largest Contentful Paint
     */
    measureLCP() {
        if ('PerformanceObserver' in window) {
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.performanceMetrics.largestContentfulPaint = lastEntry.startTime;
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    /**
     * Measure Cumulative Layout Shift
     */
    measureCLS() {
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        this.performanceMetrics.cumulativeLayoutShift = clsValue;
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        }
    }

    /**
     * Measure First Input Delay
     */
    measureFID() {
        if ('PerformanceObserver' in window) {
            const fidObserver = new PerformanceObserver((entryList) => {
                for (const entry of entryList.getEntries()) {
                    this.performanceMetrics.firstInputDelay = entry.processingStart - entry.startTime;
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }

    /**
     * Measure page load time
     */
    measureLoadTime() {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            this.performanceMetrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        });
    }

    /**
     * Measure resource timing
     */
    measureResourceTiming() {
        window.addEventListener('load', () => {
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources.filter(resource => resource.duration > 1000);
            
            if (slowResources.length > 0) {
                console.warn('⚠️ Slow loading resources detected:', slowResources);
            }
        });
    }

    /**
     * Setup resource hints for better performance
     */
    setupResourceHints() {
        // DNS prefetch for external resources
        this.addResourceHint('dns-prefetch', 'https://fonts.googleapis.com');
        this.addResourceHint('dns-prefetch', 'https://fonts.gstatic.com');
        this.addResourceHint('dns-prefetch', 'https://cdn.jsdelivr.net');

        // Preconnect to critical external resources
        this.addResourceHint('preconnect', 'https://fonts.googleapis.com');
        this.addResourceHint('preconnect', 'https://fonts.gstatic.com', true);

        // Prefetch likely next pages
        const prefetchPages = [
            'pages/analytics.html',
            'pages/calendar.html',
            'pages/tasks.html'
        ];

        requestIdleCallback(() => {
            prefetchPages.forEach(page => {
                this.addResourceHint('prefetch', page);
            });
        });
    }

    /**
     * Add resource hint to document head
     */
    addResourceHint(rel, href, crossorigin = false) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossorigin) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    }

    /**
     * Optimize image loading with lazy loading and WebP detection
     */
    optimizeImageLoading() {
        // Check for WebP support
        const supportsWebP = this.checkWebPSupport();
        
        // Setup lazy loading for images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Use WebP if supported
                    if (supportsWebP && img.dataset.webp) {
                        img.src = img.dataset.webp;
                    } else {
                        img.src = img.dataset.src;
                    }
                    
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    /**
     * Check WebP support
     */
    checkWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }

    /**
     * Preload critical components
     */
    preloadCriticalComponents() {
        const criticalComponents = [
            'welcome-section',
            'header',
            'sidebar'
        ];

        criticalComponents.forEach(async (componentName) => {
            try {
                await import(`../components/${componentName}.js`);
                this.componentsLoaded.add(componentName);
            } catch (error) {
                console.warn(`Failed to preload ${componentName}:`, error);
            }
        });
    }

    /**
     * Report performance metrics
     */
    reportMetrics() {
        console.group('🚀 Performance Metrics');
        console.log('Load Time:', this.performanceMetrics.loadTime + 'ms');
        console.log('First Paint:', this.performanceMetrics.firstPaint + 'ms');
        console.log('LCP:', this.performanceMetrics.largestContentfulPaint + 'ms');
        console.log('CLS:', this.performanceMetrics.cumulativeLayoutShift);
        
        if (this.performanceMetrics.firstInputDelay) {
            console.log('FID:', this.performanceMetrics.firstInputDelay + 'ms');
        }
        
        console.groupEnd();

        // Send metrics to analytics (if available)
        if (window.analytics) {
            window.analytics.track('Performance Metrics', this.performanceMetrics);
        }

        // Store metrics for dashboard
        localStorage.setItem('performanceMetrics', JSON.stringify(this.performanceMetrics));
    }

    /**
     * Optimize for mobile devices
     */
    optimizeForMobile() {
        if (this.isMobileDevice()) {
            // Reduce animation complexity
            document.documentElement.style.setProperty('--animation-reduce-motion', 'true');
            
            // Disable complex visual effects
            document.body.classList.add('mobile-optimized');
            
            // Reduce particle count
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                if (index > 5) particle.style.display = 'none';
            });
        }
    }

    /**
     * Check if device is mobile
     */
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth <= 768;
    }

    /**
     * Enable performance mode for slow devices
     */
    enablePerformanceMode() {
        document.body.classList.add('performance-mode');
        
        // Disable complex animations
        const style = document.createElement('style');
        style.textContent = `
            .performance-mode * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.1s !important;
            }
            .performance-mode .particle,
            .performance-mode .sparkle {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
        
        console.log('🔧 Performance mode enabled');
    }

    /**
     * Cleanup resources
     */
    cleanup() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
}

// Export for use in other modules
export default PerformanceOptimizer;

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    window.performanceOptimizer = new PerformanceOptimizer();
    
    // Enable mobile optimizations
    window.performanceOptimizer.optimizeForMobile();
    
    // Enable performance mode on slow devices
    if (navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2) {
        window.performanceOptimizer.enablePerformanceMode();
    }
} 