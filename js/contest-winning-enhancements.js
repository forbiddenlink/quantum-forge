// 🏆 CONTEST-WINNING ENHANCEMENTS
// Safe enhancements that work with existing architecture

class ContestWinningEnhancements {
    constructor() {
        this.isInitialized = false;
        this.performanceMode = 'auto';
        this.accessibilityMode = 'auto';
        this.userPreferences = {};
        
        // Performance monitoring
        this.performanceMetrics = {
            firstPaint: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            cumulativeLayoutShift: 0
        };
        
        // Accessibility features
        this.accessibilityFeatures = {
            highContrast: false,
            reducedMotion: false,
            screenReader: false
        };
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🏆 Contest-Winning Enhancements Initializing...');
        
        this.detectUserPreferences();
        this.setupPerformanceMonitoring();
        this.enhanceAccessibility();
        this.addMicroInteractions();
        this.setupKeyboardShortcuts();
        this.enhanceMobileExperience();
        this.addProgressiveEnhancement();
        
        this.isInitialized = true;
        console.log('✅ Contest-Winning Enhancements Ready!');
    }

    detectUserPreferences() {
        // Detect user preferences for accessibility
        this.accessibilityFeatures.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.accessibilityFeatures.highContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        // Detect performance mode
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            this.performanceMode = 'low-power';
        } else if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            this.performanceMode = 'low-memory';
        }
        
        // Apply preferences
        this.applyUserPreferences();
    }

    applyUserPreferences() {
        const root = document.documentElement;
        
        // Apply performance mode
        if (this.performanceMode === 'low-power') {
            root.style.setProperty('--performance-mode', 'low-power');
            this.reduceAnimations();
        }
        
        // Apply accessibility preferences
        if (this.accessibilityFeatures.reducedMotion) {
            root.style.setProperty('--reduced-motion', 'reduce');
        }
        
        if (this.accessibilityFeatures.highContrast) {
            root.style.setProperty('--high-contrast', 'high');
        }
    }

    setupPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            try {
                // First Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.name === 'first-paint') {
                            this.performanceMetrics.firstPaint = entry.startTime;
                            console.log('🎨 First Paint:', entry.startTime.toFixed(2), 'ms');
                        }
                    });
                }).observe({ entryTypes: ['paint'] });

                // First Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.name === 'first-contentful-paint') {
                            this.performanceMetrics.firstContentfulPaint = entry.startTime;
                            console.log('📊 First Contentful Paint:', entry.startTime.toFixed(2), 'ms');
                        }
                    });
                }).observe({ entryTypes: ['paint'] });

                // Largest Contentful Paint
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        this.performanceMetrics.largestContentfulPaint = entry.startTime;
                        console.log('🎯 Largest Contentful Paint:', entry.startTime.toFixed(2), 'ms');
                    });
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // Cumulative Layout Shift
                new PerformanceObserver((list) => {
                    let cls = 0;
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (!entry.hadRecentInput) {
                            cls += entry.value;
                        }
                    });
                    this.performanceMetrics.cumulativeLayoutShift = cls;
                    console.log('📐 Cumulative Layout Shift:', cls.toFixed(3));
                }).observe({ entryTypes: ['layout-shift'] });

            } catch (error) {
                console.warn('Performance monitoring not supported:', error);
            }
        }
    }

    enhanceAccessibility() {
        // Enhanced focus management
        this.setupFocusManagement();
        
        // Screen reader announcements
        this.setupScreenReaderSupport();
        
        // Keyboard navigation improvements
        this.enhanceKeyboardNavigation();
        
        // High contrast mode support
        this.setupHighContrastSupport();
    }

    setupFocusManagement() {
        // Trap focus in modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modals = document.querySelectorAll('[role="dialog"]');
                modals.forEach(modal => {
                    if (modal.style.display !== 'none') {
                        this.trapFocus(modal, e);
                    }
                });
            }
        });

        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    trapFocus(element, event) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    setupScreenReaderSupport() {
        // Create live region for announcements
        let liveRegion = document.getElementById('announcements');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'announcements';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }

        // Global announcement function
        window.announceToScreenReader = (message) => {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        };
    }

    enhanceKeyboardNavigation() {
        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            
            // Escape to close modals
            if (e.key === 'Escape') {
                this.closeModals();
            }
            
            // Alt + 1-9 for quick navigation
            if (e.altKey && /^[1-9]$/.test(e.key)) {
                e.preventDefault();
                this.quickNavigate(parseInt(e.key));
            }
        });
    }

    setupHighContrastSupport() {
        if (this.accessibilityFeatures.highContrast) {
            // Add high contrast styles
            const style = document.createElement('style');
            style.textContent = `
                .welcome-section { border: 3px solid white !important; }
                .stat-item { border: 2px solid white !important; }
                .btn { border: 2px solid white !important; }
                .dashboard-item { border: 2px solid currentColor !important; }
            `;
            document.head.appendChild(style);
        }
    }

    addMicroInteractions() {
        // Enhanced hover effects
        this.addHoverEffects();
        
        // Loading states
        this.addLoadingStates();
        
        // Success feedback
        this.addSuccessFeedback();
    }

    addHoverEffects() {
        // Add subtle hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .stat-item, .dashboard-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (!this.accessibilityFeatures.reducedMotion) {
                    element.style.transform = 'translateY(-2px)';
                    element.style.transition = 'transform 0.2s ease';
                }
            });
            
            element.addEventListener('mouseleave', () => {
                if (!this.accessibilityFeatures.reducedMotion) {
                    element.style.transform = 'translateY(0)';
                }
            });
        });
    }

    addLoadingStates() {
        // Add loading states to buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                const originalText = e.target.textContent;
                e.target.textContent = 'Loading...';
                e.target.disabled = true;
                
                setTimeout(() => {
                    e.target.textContent = originalText;
                    e.target.disabled = false;
                }, 1000);
            }
        });
    }

    addSuccessFeedback() {
        // Add success feedback for actions
        window.showSuccessMessage = (message) => {
            const notification = document.createElement('div');
            notification.className = 'success-notification';
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 0.5rem;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        };
    }

    setupKeyboardShortcuts() {
        // Keyboard shortcuts help
        document.addEventListener('keydown', (e) => {
            if (e.key === '?') {
                this.showKeyboardShortcuts();
            }
        });
    }

    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'Ctrl/Cmd + K', action: 'Open search' },
            { key: 'Escape', action: 'Close modals' },
            { key: 'Alt + 1-9', action: 'Quick navigation' },
            { key: '?', action: 'Show this help' }
        ];
        
        const helpText = shortcuts.map(s => `${s.key}: ${s.action}`).join('\n');
        alert('Keyboard Shortcuts:\n\n' + helpText);
    }

    enhanceMobileExperience() {
        // Touch-friendly interactions
        this.addTouchSupport();
        
        // Mobile-specific optimizations
        this.optimizeForMobile();
    }

    addTouchSupport() {
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .stat-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    optimizeForMobile() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth <= 768) {
            document.documentElement.style.setProperty('--duration-normal', '0.2s');
            document.documentElement.style.setProperty('--duration-fast', '0.1s');
        }
    }

    addProgressiveEnhancement() {
        // Check for modern browser features
        const features = {
            webGL: !!window.WebGLRenderingContext,
            serviceWorker: 'serviceWorker' in navigator,
            intersectionObserver: 'IntersectionObserver' in window,
            performanceObserver: 'PerformanceObserver' in window
        };
        
        // Apply progressive enhancement
        if (features.intersectionObserver) {
            this.setupIntersectionObserver();
        }
        
        if (features.serviceWorker) {
            this.setupServiceWorker();
        }
        
        // 🏆 CONTEST ENHANCEMENT - Component Alignment Fix
        this.fixComponentAlignment();
        
        // 🏆 CONTEST ENHANCEMENT - HALF-WIDTH COMPONENT ALIGNMENT FIX
        this.fixHalfWidthComponentAlignment();
    }

    // 🏆 CONTEST ENHANCEMENT - Fix Component Alignment Issues
    fixComponentAlignment() {
        // Wait for components to load
        setTimeout(() => {
            this.alignDashboardComponents();
        }, 100);
        
        // Also fix after any dynamic content loads
        setTimeout(() => {
            this.alignDashboardComponents();
        }, 1000);
        
        // Fix on window resize
        window.addEventListener('resize', () => {
            this.alignDashboardComponents();
        });
    }

    alignDashboardComponents() {
        // Fix dashboard grid alignment
        const dashboardGrid = document.querySelector('.dashboard-grid');
        if (dashboardGrid) {
            dashboardGrid.style.display = 'grid';
            dashboardGrid.style.gridTemplateColumns = '1fr';
            dashboardGrid.style.gap = 'var(--space-6)';
            dashboardGrid.style.margin = '0';
            dashboardGrid.style.padding = 'var(--space-4)';
        }

        // Fix dashboard rows - CRITICAL ALIGNMENT FIX
        const dashboardRows = document.querySelectorAll('.dashboard-row');
        dashboardRows.forEach(row => {
            row.style.display = 'grid';
            row.style.gridTemplateColumns = '1fr 1fr';
            row.style.gap = 'var(--space-6)';
            row.style.width = '100%';
            row.style.alignItems = 'start';
            row.style.justifyItems = 'stretch';
            row.style.margin = '0';
            row.style.padding = '0';
            row.style.height = 'auto';
        });

        // Fix dashboard items - PERFECT ALIGNMENT
        const dashboardItems = document.querySelectorAll('.dashboard-item');
        dashboardItems.forEach(item => {
            item.style.width = '100%';
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.minHeight = '400px';
            item.style.height = '100%';
            item.style.margin = '0';
            item.style.padding = 'var(--space-6)';
            item.style.alignSelf = 'stretch';
            item.style.justifySelf = 'stretch';
            
            // Remove any inline styles that might conflict
            if (item.style.marginTop) item.style.marginTop = '0';
            if (item.style.marginBottom) item.style.marginBottom = '0';
            if (item.style.marginLeft) item.style.marginLeft = '0';
            if (item.style.marginRight) item.style.marginRight = '0';
        });

        // 🏆 CONTEST ENHANCEMENT - Force Perfect Alignment for Task System and Knowledge Hub
        const taskSystemContainer = document.querySelector('.task-system-container');
        const knowledgeHubContainer = document.querySelector('.knowledge-hub-container');
        
        if (taskSystemContainer) {
            taskSystemContainer.style.height = '100%';
            taskSystemContainer.style.minHeight = '400px';
            taskSystemContainer.style.display = 'flex';
            taskSystemContainer.style.flexDirection = 'column';
            taskSystemContainer.style.margin = '0';
            taskSystemContainer.style.padding = 'var(--space-6)';
            taskSystemContainer.style.alignSelf = 'stretch';
            taskSystemContainer.style.justifySelf = 'stretch';
        }
        
        if (knowledgeHubContainer) {
            knowledgeHubContainer.style.height = '100%';
            knowledgeHubContainer.style.minHeight = '400px';
            knowledgeHubContainer.style.display = 'flex';
            knowledgeHubContainer.style.flexDirection = 'column';
            knowledgeHubContainer.style.margin = '0';
            knowledgeHubContainer.style.padding = 'var(--space-6)';
            knowledgeHubContainer.style.alignSelf = 'stretch';
            knowledgeHubContainer.style.justifySelf = 'stretch';
        }

        // Fix component containers
        const components = document.querySelectorAll('smart-insights-dashboard, live-activity-feed, wellness-tracker, team-spotlight, company-news, collaboration-hub, enhanced-interactive-poll, weather-widget, analytics-dashboard, task-system, enhanced-knowledge-hub');
        components.forEach(component => {
            if (component) {
                component.style.width = '100%';
                component.style.height = '100%';
                component.style.display = 'flex';
                component.style.flexDirection = 'column';
                component.style.minHeight = '200px';
                component.style.margin = '0';
                component.style.padding = '0';
            }
        });

        // 🏆 CONTEST ENHANCEMENT - Force Equal Heights for Row Items
        const rowItems = document.querySelectorAll('.dashboard-row > .dashboard-item');
        rowItems.forEach(item => {
            item.style.height = '100%';
            item.style.minHeight = '400px';
            item.style.display = 'flex';
            item.style.flexDirection = 'column';
            item.style.margin = '0';
            item.style.padding = 'var(--space-6)';
            item.style.alignSelf = 'stretch';
            item.style.justifySelf = 'stretch';
        });

        // Responsive adjustments
        if (window.innerWidth <= 1024) {
            dashboardRows.forEach(row => {
                row.style.gridTemplateColumns = '1fr';
                row.style.gap = 'var(--space-4)';
            });
            
            dashboardItems.forEach(item => {
                if (!item.classList.contains('full-width')) {
                    item.style.minHeight = '250px';
                }
            });
        }

        if (window.innerWidth <= 768) {
            dashboardGrid.style.gap = 'var(--space-4)';
            dashboardGrid.style.padding = 'var(--space-3)';
            
            dashboardRows.forEach(row => {
                row.style.gap = 'var(--space-3)';
            });
            
            dashboardItems.forEach(item => {
                item.style.padding = 'var(--space-4)';
                item.style.minHeight = '200px';
                
                if (item.classList.contains('compact')) {
                    item.style.padding = 'var(--space-3)';
                    item.style.minHeight = '120px';
                }
            });
        }

        if (window.innerWidth <= 480px) {
            dashboardGrid.style.gap = 'var(--space-3)';
            dashboardGrid.style.padding = 'var(--space-2)';
            
            dashboardRows.forEach(row => {
                row.style.gap = 'var(--space-2)';
            });
            
            dashboardItems.forEach(item => {
                item.style.padding = 'var(--space-3)';
                item.style.minHeight = '180px';
                
                if (item.classList.contains('compact')) {
                    item.style.padding = 'var(--space-2)';
                    item.style.minHeight = '100px';
                }
            });
        }

        // 🏆 CONTEST ENHANCEMENT - Final Alignment Check
        setTimeout(function() {
            const firstRowItem = document.querySelector('.dashboard-row > .dashboard-item:first-child');
            const lastRowItem = document.querySelector('.dashboard-row > .dashboard-item:last-child');
            
            if (firstRowItem && lastRowItem) {
                // Force same height
                const maxHeight = Math.max(firstRowItem.offsetHeight, lastRowItem.offsetHeight);
                firstRowItem.style.height = maxHeight.toString() + 'px';
                lastRowItem.style.height = maxHeight.toString() + 'px';
            }
        }, 100);
    }

    setupIntersectionObserver() {
        // Lazy load components
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        });
        
        // Observe dashboard items
        document.querySelectorAll('.dashboard-item').forEach(item => {
            observer.observe(item);
        });
    }

    setupServiceWorker() {
        // Service worker is already registered in index.html
        console.log('Service Worker support detected');
    }

    // Utility methods
    openSearch() {
        // Trigger search functionality
        const searchButton = document.querySelector('[data-search]');
        if (searchButton) {
            searchButton.click();
        }
    }

    closeModals() {
        // Close any open modals
        const modals = document.querySelectorAll('[role="dialog"]');
        modals.forEach(modal => {
            if (modal.style.display !== 'none') {
                modal.style.display = 'none';
            }
        });
    }

    quickNavigate(number) {
        // Quick navigation to different sections
        const sections = [
            'analytics-dashboard',
            'task-system',
            'team-spotlight',
            'company-news',
            'calendar',
            'documents',
            'settings',
            'profile',
            'help'
        ];
        
        const target = sections[number - 1];
        if (target) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.focus();
            }
        }
    }

    reduceAnimations() {
        // Reduce animations for better performance
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Public API
    getPerformanceMetrics() {
        return this.performanceMetrics;
    }

    getAccessibilityFeatures() {
        return this.accessibilityFeatures;
    }

    getUserPreferences() {
        return this.userPreferences;
    }

    // 🏆 CONTEST ENHANCEMENT - HALF-WIDTH COMPONENT ALIGNMENT FIX
    fixHalfWidthComponentAlignment() {
        console.log('🔧 Fixing half-width component alignment...');
        
        // 🏆 CRITICAL FIX: Remove Massive Inline Styles from Knowledge Hub
        const knowledgeHub = document.querySelector('enhanced-knowledge-hub');
        if (knowledgeHub) {
            // Remove the massive inline style that's causing overflow
            knowledgeHub.style.removeProperty('background');
            knowledgeHub.style.removeProperty('background-image');
            knowledgeHub.style.removeProperty('background-size');
            knowledgeHub.style.removeProperty('background-position');
            knowledgeHub.style.removeProperty('background-repeat');
            
            // Force proper styling
            knowledgeHub.style.width = '100%';
            knowledgeHub.style.height = '100%';
            knowledgeHub.style.minHeight = '400px';
            knowledgeHub.style.maxWidth = '100%';
            knowledgeHub.style.display = 'flex';
            knowledgeHub.style.flexDirection = 'column';
            knowledgeHub.style.margin = '0';
            knowledgeHub.style.padding = '0';
            knowledgeHub.style.position = 'relative';
            knowledgeHub.style.top = '0';
            knowledgeHub.style.left = '0';
            knowledgeHub.style.right = '0';
            knowledgeHub.style.bottom = '0';
            knowledgeHub.style.overflow = 'hidden';
            knowledgeHub.style.boxSizing = 'border-box';
        }
        
        // 🏆 CRITICAL FIX: Remove Massive Inline Styles from Knowledge Hub Container
        const knowledgeHubContainer = document.querySelector('.enhanced-knowledge-hub');
        if (knowledgeHubContainer) {
            // Remove the massive inline style that's causing overflow
            knowledgeHubContainer.style.removeProperty('background');
            knowledgeHubContainer.style.removeProperty('background-image');
            knowledgeHubContainer.style.removeProperty('background-size');
            knowledgeHubContainer.style.removeProperty('background-position');
            knowledgeHubContainer.style.removeProperty('background-repeat');
            
            // Force proper styling
            knowledgeHubContainer.style.width = '100%';
            knowledgeHubContainer.style.height = '100%';
            knowledgeHubContainer.style.minHeight = '400px';
            knowledgeHubContainer.style.maxWidth = '100%';
            knowledgeHubContainer.style.display = 'flex';
            knowledgeHubContainer.style.flexDirection = 'column';
            knowledgeHubContainer.style.margin = '0';
            knowledgeHubContainer.style.padding = 'var(--space-6)';
            knowledgeHubContainer.style.position = 'relative';
            knowledgeHubContainer.style.top = '0';
            knowledgeHubContainer.style.left = '0';
            knowledgeHubContainer.style.right = '0';
            knowledgeHubContainer.style.bottom = '0';
            knowledgeHubContainer.style.overflow = 'hidden';
            knowledgeHubContainer.style.boxSizing = 'border-box';
            knowledgeHubContainer.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            knowledgeHubContainer.style.borderRadius = 'var(--radius-2xl)';
        }
        
        // Fix the specific dashboard row containing task-system and enhanced-knowledge-hub
        const taskSystemRow = document.querySelector('.dashboard-row:has(.task-system-container)');
        if (taskSystemRow) {
            taskSystemRow.style.display = 'grid';
            taskSystemRow.style.gridTemplateColumns = '1fr 1fr';
            taskSystemRow.style.gap = 'var(--space-6)';
            taskSystemRow.style.width = '100%';
            taskSystemRow.style.alignItems = 'start';
            taskSystemRow.style.justifyItems = 'stretch';
            taskSystemRow.style.margin = '0';
            taskSystemRow.style.padding = '0';
            taskSystemRow.style.height = 'auto';
            taskSystemRow.style.overflow = 'visible';
        }
        
        // Fix task-system container
        const taskSystemContainer = document.querySelector('.task-system-container');
        if (taskSystemContainer) {
            taskSystemContainer.style.width = '100%';
            taskSystemContainer.style.height = '100%';
            taskSystemContainer.style.minHeight = '400px';
            taskSystemContainer.style.maxWidth = '50%';
            taskSystemContainer.style.display = 'flex';
            taskSystemContainer.style.flexDirection = 'column';
            taskSystemContainer.style.margin = '0';
            taskSystemContainer.style.padding = 'var(--space-6)';
            taskSystemContainer.style.alignSelf = 'stretch';
            taskSystemContainer.style.justifySelf = 'stretch';
            taskSystemContainer.style.transform = 'translateY(0)';
            taskSystemContainer.style.top = '0';
            taskSystemContainer.style.position = 'relative';
            taskSystemContainer.style.overflow = 'hidden';
            taskSystemContainer.style.boxSizing = 'border-box';
        }
        
        // Fix knowledge-hub container
        const knowledgeHubContainerWrapper = document.querySelector('.knowledge-hub-container');
        if (knowledgeHubContainerWrapper) {
            knowledgeHubContainerWrapper.style.width = '100%';
            knowledgeHubContainerWrapper.style.height = '100%';
            knowledgeHubContainerWrapper.style.minHeight = '400px';
            knowledgeHubContainerWrapper.style.maxWidth = '50%';
            knowledgeHubContainerWrapper.style.display = 'flex';
            knowledgeHubContainerWrapper.style.flexDirection = 'column';
            knowledgeHubContainerWrapper.style.margin = '0';
            knowledgeHubContainerWrapper.style.padding = 'var(--space-6)';
            knowledgeHubContainerWrapper.style.alignSelf = 'stretch';
            knowledgeHubContainerWrapper.style.justifySelf = 'stretch';
            knowledgeHubContainerWrapper.style.transform = 'translateY(0)';
            knowledgeHubContainerWrapper.style.top = '0';
            knowledgeHubContainerWrapper.style.position = 'relative';
            knowledgeHubContainerWrapper.style.overflow = 'hidden';
            knowledgeHubContainerWrapper.style.boxSizing = 'border-box';
        }
        
        // Fix task-system component
        const taskSystem = document.querySelector('task-system');
        if (taskSystem) {
            taskSystem.style.width = '100%';
            taskSystem.style.height = '100%';
            taskSystem.style.minHeight = '400px';
            taskSystem.style.maxWidth = '100%';
            taskSystem.style.display = 'flex';
            taskSystem.style.flexDirection = 'column';
            taskSystem.style.margin = '0';
            taskSystem.style.padding = '0';
            taskSystem.style.position = 'relative';
            taskSystem.style.top = '0';
            taskSystem.style.left = '0';
            taskSystem.style.right = '0';
            taskSystem.style.bottom = '0';
            taskSystem.style.overflow = 'hidden';
            taskSystem.style.boxSizing = 'border-box';
        }
        
        // Fix enhanced-knowledge-hub component
        const enhancedKnowledgeHub = document.querySelector('enhanced-knowledge-hub');
        if (enhancedKnowledgeHub) {
            enhancedKnowledgeHub.style.width = '100%';
            enhancedKnowledgeHub.style.height = '100%';
            enhancedKnowledgeHub.style.minHeight = '400px';
            enhancedKnowledgeHub.style.maxWidth = '100%';
            enhancedKnowledgeHub.style.display = 'flex';
            enhancedKnowledgeHub.style.flexDirection = 'column';
            enhancedKnowledgeHub.style.margin = '0';
            enhancedKnowledgeHub.style.padding = '0';
            enhancedKnowledgeHub.style.position = 'relative';
            enhancedKnowledgeHub.style.top = '0';
            enhancedKnowledgeHub.style.left = '0';
            enhancedKnowledgeHub.style.right = '0';
            enhancedKnowledgeHub.style.bottom = '0';
            enhancedKnowledgeHub.style.overflow = 'hidden';
            enhancedKnowledgeHub.style.boxSizing = 'border-box';
        }
        
        // Fix component internal containers
        const taskSystemEnhanced = document.querySelector('task-system .enhanced-task-system');
        if (taskSystemEnhanced) {
            taskSystemEnhanced.style.width = '100%';
            taskSystemEnhanced.style.height = '100%';
            taskSystemEnhanced.style.minHeight = '400px';
            taskSystemEnhanced.style.maxWidth = '100%';
            taskSystemEnhanced.style.display = 'flex';
            taskSystemEnhanced.style.flexDirection = 'column';
            taskSystemEnhanced.style.margin = '0';
            taskSystemEnhanced.style.padding = '0';
            taskSystemEnhanced.style.background = 'transparent';
            taskSystemEnhanced.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            taskSystemEnhanced.style.borderRadius = 'var(--radius-2xl)';
            taskSystemEnhanced.style.overflow = 'hidden';
            taskSystemEnhanced.style.boxSizing = 'border-box';
        }
        
        const knowledgeHubEnhanced = document.querySelector('enhanced-knowledge-hub .enhanced-knowledge-hub');
        if (knowledgeHubEnhanced) {
            // Remove the massive inline style
            knowledgeHubEnhanced.style.removeProperty('background');
            knowledgeHubEnhanced.style.removeProperty('background-image');
            knowledgeHubEnhanced.style.removeProperty('background-size');
            knowledgeHubEnhanced.style.removeProperty('background-position');
            knowledgeHubEnhanced.style.removeProperty('background-repeat');
            
            knowledgeHubEnhanced.style.width = '100%';
            knowledgeHubEnhanced.style.height = '100%';
            knowledgeHubEnhanced.style.minHeight = '400px';
            knowledgeHubEnhanced.style.maxWidth = '100%';
            knowledgeHubEnhanced.style.display = 'flex';
            knowledgeHubEnhanced.style.flexDirection = 'column';
            knowledgeHubEnhanced.style.margin = '0';
            knowledgeHubEnhanced.style.padding = '0';
            knowledgeHubEnhanced.style.background = 'transparent';
            knowledgeHubEnhanced.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            knowledgeHubEnhanced.style.borderRadius = 'var(--radius-2xl)';
            knowledgeHubEnhanced.style.overflow = 'hidden';
            knowledgeHubEnhanced.style.boxSizing = 'border-box';
        }
        
        // Force equal heights for both containers
        setTimeout(() => {
            const taskContainer = document.querySelector('.task-system-container');
            const knowledgeContainer = document.querySelector('.knowledge-hub-container');
            
            if (taskContainer && knowledgeContainer) {
                const maxHeight = Math.max(taskContainer.offsetHeight, knowledgeContainer.offsetHeight);
                taskContainer.style.height = maxHeight + 'px';
                knowledgeContainer.style.height = maxHeight + 'px';
                
                // Also force the components inside to match
                const taskSystem = document.querySelector('task-system');
                const enhancedKnowledgeHub = document.querySelector('enhanced-knowledge-hub');
                
                if (taskSystem) taskSystem.style.height = maxHeight + 'px';
                if (enhancedKnowledgeHub) enhancedKnowledgeHub.style.height = maxHeight + 'px';
            }
        }, 100);
        
        console.log('✅ Half-width component alignment fix applied');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contestEnhancements = new ContestWinningEnhancements();
    window.contestEnhancements.init();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContestWinningEnhancements;
} 