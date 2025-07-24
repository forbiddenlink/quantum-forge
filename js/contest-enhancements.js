/**
 * 🏆 Contest Enhancements - Production Ready
 * Advanced optimizations for contest-winning performance
 */

class ContestEnhancements {
    constructor() {
        this.startTime = performance.now();
        this.initialized = false;
        this.features = {
            performance: false,
            security: false,
            mobile: false,
            pwa: false,
            analytics: false
        };
        
        console.log('🏆 Contest Enhancements Loading...');
        this.init();
    }

    /**
     * Initialize all contest enhancements
     */
    async init() {
        try {
            // Load critical services first
            await this.loadCriticalServices();
            
            // Initialize core features
            this.initializePerformanceMode();
            this.initializeMobileOptimizations();
            this.initializePWAFeatures();
            this.initializeAnalytics();
            this.initializeAccessibility();
            
            // Mark as initialized
            this.initialized = true;
            this.reportInitialization();
            
        } catch (error) {
            console.error('❌ Contest enhancements failed to initialize:', error);
            this.fallbackMode();
        }
    }

    /**
     * Load critical services
     */
    async loadCriticalServices() {
        const services = [];
        
        // Load performance optimizer if not already loaded
        if (!window.performanceOptimizer) {
            services.push(
                import('./services/performance-optimizer.js').then(module => {
                    window.performanceOptimizer = new module.default();
                    this.features.performance = true;
                    console.log('✅ Performance Optimizer loaded');
                })
            );
        }
        
        // Load security manager if not already loaded
        if (!window.securityManager) {
            services.push(
                import('./services/security-manager.js').then(module => {
                    window.securityManager = new module.default();
                    this.features.security = true;
                    console.log('✅ Security Manager loaded');
                })
            );
        }
        
        await Promise.all(services);
    }

    /**
     * Initialize performance mode
     */
    initializePerformanceMode() {
        // Detect device capabilities
        const deviceCapabilities = this.detectDeviceCapabilities();
        
        if (deviceCapabilities.lowEnd) {
            document.body.classList.add('performance-mode');
            console.log('🔧 Performance mode enabled for low-end device');
        }
        
        if (deviceCapabilities.mobile) {
            document.body.classList.add('mobile-optimized');
            console.log('📱 Mobile optimizations enabled');
        }
        
        // Enable GPU acceleration for supported elements
        this.enableGPUAcceleration();
        
        this.features.performance = true;
    }

    /**
     * Detect device capabilities
     */
    detectDeviceCapabilities() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        const slowConnection = navigator.connection && navigator.connection.effectiveType && 
                              ['slow-2g', '2g'].includes(navigator.connection.effectiveType);
        
        return {
            mobile: isMobile,
            lowEnd: isLowEnd || slowConnection,
            touchDevice: 'ontouchstart' in window,
            webGL: this.checkWebGLSupport(),
            serviceWorker: 'serviceWorker' in navigator
        };
    }

    /**
     * Check WebGL support
     */
    checkWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && 
                (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch(e) {
            return false;
        }
    }

    /**
     * Enable GPU acceleration for key elements
     */
    enableGPUAcceleration() {
        const acceleratedElements = [
            '.welcome-section',
            '.enhanced-task-system',
            '.analytics-dashboard',
            '.dashboard-item'
        ];
        
        acceleratedElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.style.willChange = 'transform';
                element.style.transform = 'translateZ(0)';
                element.style.backfaceVisibility = 'hidden';
            });
        });
    }

    /**
     * Initialize mobile optimizations
     */
    initializeMobileOptimizations() {
        if (window.innerWidth <= 768) {
            // Optimize touch interactions
            this.optimizeTouchInteractions();
            
            // Improve scrolling performance
            this.improveScrolling();
            
            // Handle orientation changes
            this.handleOrientationChange();
            
            this.features.mobile = true;
        }
    }

    /**
     * Optimize touch interactions
     */
    optimizeTouchInteractions() {
        // Add fast tap for better responsiveness
        document.addEventListener('touchstart', () => {}, { passive: true });
        
        // Optimize click delays
        document.addEventListener('click', (e) => {
            e.target.classList.add('tap-active');
            setTimeout(() => {
                e.target.classList.remove('tap-active');
            }, 150);
        });
        
        // Prevent unwanted zooming
        document.addEventListener('gesturestart', (e) => {
            e.preventDefault();
        });
    }

    /**
     * Improve scrolling performance
     */
    improveScrolling() {
        const scrollElements = document.querySelectorAll('.main-content, .dashboard-grid');
        scrollElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.scrollBehavior = 'smooth';
        });
    }

    /**
     * Handle orientation changes
     */
    handleOrientationChange() {
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Trigger resize event to recalculate layouts
                window.dispatchEvent(new Event('resize'));
                
                // Refresh viewport height for mobile browsers
                document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            }, 100);
        });
    }

    /**
     * Initialize PWA features
     */
    initializePWAFeatures() {
        // Add to home screen prompt
        this.setupInstallPrompt();
        
        // Handle offline status
        this.handleOfflineStatus();
        
        // Cache critical resources
        this.cacheResources();
        
        this.features.pwa = true;
    }

    /**
     * Setup install prompt for PWA
     */
    setupInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install button
            this.showInstallButton(deferredPrompt);
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('🎉 PWA installed successfully');
            this.hideInstallButton();
        });
    }

    /**
     * Show install button
     */
    showInstallButton(deferredPrompt) {
        const installBtn = document.createElement('button');
        installBtn.textContent = '📱 Install App';
        installBtn.className = 'install-btn';
        installBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-600);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            cursor: pointer;
            transition: all 0.2s ease;
        `;
        
        installBtn.addEventListener('click', async () => {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('✅ User accepted the install prompt');
            }
            deferredPrompt = null;
            installBtn.remove();
        });
        
        document.body.appendChild(installBtn);
    }

    /**
     * Hide install button
     */
    hideInstallButton() {
        const installBtn = document.querySelector('.install-btn');
        if (installBtn) {
            installBtn.remove();
        }
    }

    /**
     * Handle offline status
     */
    handleOfflineStatus() {
        const updateOnlineStatus = () => {
            const status = navigator.onLine ? 'online' : 'offline';
            document.body.classList.toggle('offline', !navigator.onLine);
            
            if (!navigator.onLine) {
                this.showOfflineNotification();
            } else {
                this.hideOfflineNotification();
            }
        };
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
        updateOnlineStatus();
    }

    /**
     * Show offline notification
     */
    showOfflineNotification() {
        if (document.querySelector('.offline-notification')) return;
        
        const notification = document.createElement('div');
        notification.className = 'offline-notification';
        notification.textContent = '📡 You are offline. Some features may be limited.';
        notification.style.cssText = `
            position: fixed;
            top: 72px;
            left: 50%;
            transform: translateX(-50%);
            background: #f59e0b;
            color: white;
            padding: 8px 16px;
            border-radius: 0 0 8px 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1001;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        `;
        
        document.body.appendChild(notification);
    }

    /**
     * Hide offline notification
     */
    hideOfflineNotification() {
        const notification = document.querySelector('.offline-notification');
        if (notification) {
            notification.remove();
        }
    }

    /**
     * Cache critical resources
     */
    cacheResources() {
        if ('caches' in window) {
            const criticalResources = [
                '/',
                '/styles/critical.css',
                '/styles/main.css',
                '/js/app.js',
                '/manifest.json'
            ];
            
            caches.open('quantum-forge-v1').then(cache => {
                cache.addAll(criticalResources).then(() => {
                    console.log('✅ Critical resources cached');
                });
            });
        }
    }

    /**
     * Initialize analytics
     */
    initializeAnalytics() {
        // Track page performance
        this.trackPerformanceMetrics();
        
        // Track user interactions
        this.trackUserInteractions();
        
        // Track errors
        this.trackErrors();
        
        this.features.analytics = true;
    }

    /**
     * Track performance metrics
     */
    trackPerformanceMetrics() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                const metrics = {
                    loadTime: navigation.loadEventEnd - navigation.loadEventStart,
                    domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                    firstPaint: this.getFirstPaint(),
                    largestContentfulPaint: this.getLCP()
                };
                
                console.log('📊 Performance Metrics:', metrics);
                
                // Store in localStorage for dashboard
                localStorage.setItem('performanceMetrics', JSON.stringify(metrics));
            }, 1000);
        });
    }

    /**
     * Get First Paint timing
     */
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
        return firstPaint ? firstPaint.startTime : null;
    }

    /**
     * Get Largest Contentful Paint
     */
    getLCP() {
        return new Promise((resolve) => {
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    resolve(lastEntry.startTime);
                });
                observer.observe({ entryTypes: ['largest-contentful-paint'] });
            } else {
                resolve(null);
            }
        });
    }

    /**
     * Track user interactions
     */
    trackUserInteractions() {
        const interactions = ['click', 'scroll', 'keydown'];
        
        interactions.forEach(event => {
            document.addEventListener(event, (e) => {
                if (event === 'click') {
                    const target = e.target.closest('[data-track]');
                    if (target) {
                        console.log('🔍 User interaction:', target.dataset.track);
                    }
                }
            }, { passive: true });
        });
    }

    /**
     * Track errors
     */
    trackErrors() {
        window.addEventListener('error', (e) => {
            console.error('🚨 JavaScript Error:', e.error);
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            console.error('🚨 Unhandled Promise Rejection:', e.reason);
        });
    }

    /**
     * Initialize accessibility enhancements
     */
    initializeAccessibility() {
        // Add skip links
        this.addSkipLinks();
        
        // Enhance keyboard navigation
        this.enhanceKeyboardNavigation();
        
        // Improve focus management
        this.improveFocusManagement();
        
        // Add ARIA labels
        this.addARIALabels();
    }

    /**
     * Add skip links for accessibility
     */
    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-600);
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            text-decoration: none;
            z-index: 100000;
            font-weight: 600;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Enhance keyboard navigation
     */
    enhanceKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Handle Escape key for modals
            if (e.key === 'Escape') {
                const modal = document.querySelector('.modal.active');
                if (modal) {
                    modal.classList.remove('active');
                }
            }
            
            // Handle Tab key for focus management
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }

    /**
     * Improve focus management
     */
    improveFocusManagement() {
        // Enhanced focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .using-keyboard *:focus {
                outline: 2px solid var(--primary-500);
                outline-offset: 2px;
            }
            
            .using-keyboard button:focus,
            .using-keyboard .btn:focus,
            .using-keyboard .nav-link:focus {
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Add ARIA labels for better screen reader support
     */
    addARIALabels() {
        // Add ARIA labels to interactive elements without labels
        const interactiveElements = document.querySelectorAll('button:not([aria-label]), .btn:not([aria-label])');
        interactiveElements.forEach(element => {
            if (!element.textContent.trim()) {
                element.setAttribute('aria-label', 'Interactive button');
            }
        });
        
        // Add landmarks
        const mainContent = document.querySelector('.main-content');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
            mainContent.setAttribute('aria-label', 'Main content area');
        }
    }

    /**
     * Fallback mode for when enhancements fail
     */
    fallbackMode() {
        document.body.classList.add('fallback-mode');
        console.log('⚠️ Running in fallback mode');
    }

    /**
     * Report initialization status
     */
    reportInitialization() {
        const loadTime = performance.now() - this.startTime;
        
        console.group('🏆 Contest Enhancements Initialized');
        console.log(`⏱️ Load Time: ${loadTime.toFixed(2)}ms`);
        console.log('✅ Features Enabled:', this.features);
        console.log('📱 Device:', navigator.userAgent);
        console.log('🌐 Connection:', navigator.connection?.effectiveType || 'unknown');
        console.groupEnd();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('contestEnhancementsReady', {
            detail: { features: this.features, loadTime }
        }));
        
        // Add ready class to body
        document.body.classList.add('contest-ready');
    }

    /**
     * Get status of all features
     */
    getStatus() {
        return {
            initialized: this.initialized,
            features: this.features,
            loadTime: performance.now() - this.startTime
        };
    }
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    window.contestEnhancements = new ContestEnhancements();
    
    // Make status available globally
    window.getContestStatus = () => window.contestEnhancements.getStatus();
}

// Export for module use
export default ContestEnhancements; 