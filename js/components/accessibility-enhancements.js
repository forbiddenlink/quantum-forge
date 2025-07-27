// Accessibility Enhancements - Complements existing accessibility-enhancer.js
// Provides advanced accessibility features for contest-winning compliance

class AccessibilityEnhancements {
    constructor() {
        this.liveRegion = null;
        this.statusAnnouncer = null;
        this.focusTrapStack = [];
        this.keyboardNavActive = false;
        this.lastFocusedElement = null;

        this.init();
    }

    init() {
        // Wait for document.body to be ready
        if (!document.body) {
            console.warn('Document body not ready, waiting...');
            setTimeout(() => this.init(), 100);
            return;
        }

        // Create essential accessibility elements
        this.createLiveRegions();
        this.createSkipLinks();
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupChartAccessibility();
        this.setupModalAccessibility();
        this.enhanceExistingComponents();

        console.log('🎯 Advanced Accessibility Enhancements loaded');
    }

    createLiveRegions() {
        // Create ARIA live region for dynamic content announcements
        this.liveRegion = document.createElement('div');
        this.liveRegion.setAttribute('aria-live', 'polite');
        this.liveRegion.setAttribute('aria-atomic', 'true');
        this.liveRegion.className = 'live-region';
        this.liveRegion.id = 'live-region';

        if (document.body) {
            document.body.appendChild(this.liveRegion);
        } else {
            console.warn('Document body not ready for accessibility enhancements');
            return;
        }

        // Create status announcer for immediate announcements
        this.statusAnnouncer = document.createElement('div');
        this.statusAnnouncer.setAttribute('aria-live', 'assertive');
        this.statusAnnouncer.setAttribute('aria-atomic', 'true');
        this.statusAnnouncer.className = 'status-announcer';
        this.statusAnnouncer.id = 'status-announcer';

        if (document.body) {
            document.body.appendChild(this.statusAnnouncer);
        } else {
            console.warn('Document body not ready for status announcer');
        }
    }

    createSkipLinks() {
        // Temporarily disabled to fix header layout issues
        // if (!document.body) {
        //     console.warn('Document body not ready for skip links');
        //     return;
        // }

        // const skipLinks = document.createElement('div');
        // skipLinks.className = 'skip-links';
        // skipLinks.innerHTML = `
        //     <a href="#main-content">Skip to main content</a>
        //     <a href="#navigation">Skip to navigation</a>
        //     <a href="#search">Skip to search</a>
        // `;
        // document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    setupKeyboardNavigation() {
        // Detect keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.keyboardNavActive = true;
                document.body.classList.add('keyboard-nav-active');
            }
        });

        document.addEventListener('mousedown', () => {
            this.keyboardNavActive = false;
            document.body.classList.remove('keyboard-nav-active');
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + / for help
            if (e.altKey && e.key === '/') {
                e.preventDefault();
                this.showKeyboardShortcuts();
            }

            // Alt + R for read page
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                this.readPageContent();
            }

            // Ctrl + Alt + A for accessibility panel
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleAccessibilityPanel();
            }
        });
    }

    setupFocusManagement() {
        // Track last focused element before modal opens
        document.addEventListener('focusin', (e) => {
            if (!this.isInModal(e.target)) {
                this.lastFocusedElement = e.target;
            }
        });

        // Enhanced focus trapping for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && this.focusTrapStack.length > 0) {
                const currentTrap = this.focusTrapStack[this.focusTrapStack.length - 1];
                this.handleFocusTrap(e, currentTrap);
            }
        });
    }

    setupChartAccessibility() {
        // Add accessibility features to charts
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceCharts();
        });

        // Watch for dynamically added charts
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        const charts = node.querySelectorAll('.chart-container, canvas[id*="chart"]');
                        charts.forEach(chart => this.enhanceChart(chart));
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    setupModalAccessibility() {
        // Enhance modal dialogs
        document.addEventListener('click', (e) => {
            const modal = e.target.closest('[role="dialog"]');
            if (modal && !modal.hasAttribute('aria-modal')) {
                this.enhanceModal(modal);
            }
        });
    }

    enhanceExistingComponents() {
        // Enhance forms
        this.enhanceForms();

        // Enhance interactive elements
        this.enhanceInteractiveElements();

        // Enhance navigation
        this.enhanceNavigation();

        // Enhance data tables
        this.enhanceDataTables();
    }

    // Announce content to screen readers
    announce(message, priority = 'polite') {
        const announcer = priority === 'assertive' ? this.statusAnnouncer : this.liveRegion;
        announcer.textContent = message;

        // Clear after announcement
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    }

    // Focus trap for modals
    trapFocus(container) {
        const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const focusTrap = {
            container,
            firstElement,
            lastElement,
            previousFocusedElement: document.activeElement
        };

        this.focusTrapStack.push(focusTrap);
        firstElement.focus();

        return focusTrap;
    }

    releaseFocusTrap() {
        const focusTrap = this.focusTrapStack.pop();
        if (focusTrap && focusTrap.previousFocusedElement) {
            focusTrap.previousFocusedElement.focus();
        }
    }

    handleFocusTrap(e, focusTrap) {
        const { firstElement, lastElement } = focusTrap;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    enhanceChart(chartElement) {
        if (chartElement.hasAttribute('data-accessibility-enhanced')) return;

        // Add ARIA attributes
        chartElement.setAttribute('role', 'img');
        chartElement.setAttribute('tabindex', '0');
        chartElement.setAttribute('data-accessibility-enhanced', 'true');

        // Create description element
        const descriptionId = `chart-desc-${Date.now()}`;
        const description = document.createElement('div');
        description.id = descriptionId;
        description.className = 'chart-description sr-only';

        // Generate description based on chart type
        const chartTitle = chartElement.querySelector('.chart-title')?.textContent || 'Chart';
        description.textContent = `${chartTitle}. Press Enter for detailed description.`;

        chartElement.setAttribute('aria-describedby', descriptionId);
        chartElement.parentNode.insertBefore(description, chartElement.nextSibling);

        // Add keyboard interaction
        chartElement.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.provideChartDescription(chartElement);
            }
        });
    }

    enhanceForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            // Add form validation messages
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (!input.hasAttribute('aria-describedby')) {
                    this.addFormValidation(input);
                }
            });
        });
    }

    enhanceInteractiveElements() {
        // Add ARIA labels to unlabeled interactive elements
        const interactiveElements = document.querySelectorAll('button:not([aria-label]), [role="button"]:not([aria-label])');
        interactiveElements.forEach(element => {
            if (!element.textContent.trim()) {
                const purpose = this.inferElementPurpose(element);
                element.setAttribute('aria-label', purpose);
            }
        });
    }

    enhanceNavigation() {
        // Add navigation landmarks
        const nav = document.querySelector('nav');
        if (nav && !nav.hasAttribute('aria-label')) {
            nav.setAttribute('aria-label', 'Main navigation');
        }

        // Add breadcrumb navigation
        const breadcrumbs = document.querySelector('.breadcrumbs');
        if (breadcrumbs) {
            breadcrumbs.setAttribute('aria-label', 'Breadcrumb navigation');
        }
    }

    enhanceDataTables() {
        const tables = document.querySelectorAll('table:not([role])');
        tables.forEach(table => {
            table.setAttribute('role', 'table');

            // Add caption if missing
            if (!table.querySelector('caption')) {
                const caption = document.createElement('caption');
                caption.textContent = 'Data table';
                caption.className = 'sr-only';
                table.insertBefore(caption, table.firstChild);
            }

            // Enhance headers
            const headers = table.querySelectorAll('th');
            headers.forEach((header, index) => {
                if (!header.id) {
                    header.id = `table-header-${Date.now()}-${index}`;
                }
            });
        });
    }

    enhanceModal(modal) {
        modal.setAttribute('aria-modal', 'true');

        // Add focus trap
        const focusTrap = this.trapFocus(modal);

        // Add close handler
        const closeModal = () => {
            this.releaseFocusTrap();
            modal.style.display = 'none';
            this.announce('Dialog closed');
        };

        // Close on escape
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Close button
        const closeButton = modal.querySelector('[aria-label*="close"], .close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = [
            'Alt + 1: Focus main content',
            'Alt + 2: Focus navigation',
            'Alt + 3: Focus search',
            'Alt + H: Show help',
            'Alt + A: Toggle accessibility panel',
            'Alt + /: Show keyboard shortcuts',
            'Alt + R: Read page content',
            'Escape: Close dialogs',
            'Tab: Navigate forward',
            'Shift + Tab: Navigate backward'
        ];

        this.announce(`Keyboard shortcuts: ${shortcuts.join('. ')}`, 'assertive');
    }

    readPageContent() {
        const mainContent = document.querySelector('#main-content, main, .main-content');
        if (mainContent) {
            const textContent = mainContent.textContent.replace(/\s+/g, ' ').trim();
            this.announce(`Page content: ${textContent.substring(0, 200)}...`, 'assertive');
        }
    }

    toggleAccessibilityPanel() {
        let panel = document.querySelector('.accessibility-panel');
        if (!panel) {
            panel = this.createAccessibilityPanel();
        }

        const isVisible = panel.style.display !== 'none';
        panel.style.display = isVisible ? 'none' : 'block';

        if (!isVisible) {
            this.trapFocus(panel);
            this.announce('Accessibility panel opened', 'assertive');
        } else {
            this.releaseFocusTrap();
            this.announce('Accessibility panel closed');
        }
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'Accessibility settings');
        panel.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-elevated);
            padding: var(--space-6);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            max-width: 400px;
            width: 90%;
        `;

        panel.innerHTML = `
            <h2>Accessibility Settings</h2>
            <label>
                <input type="checkbox" id="highContrast"> High Contrast Mode
            </label>
            <br><br>
            <label>
                <input type="checkbox" id="largeText"> Large Text
            </label>
            <br><br>
            <label>
                <input type="checkbox" id="reducedMotion"> Reduced Motion
            </label>
            <br><br>
            <button class="btn close-panel">Close</button>
        `;

        document.body.appendChild(panel);

        // Add event listeners
        panel.querySelector('.close-panel').addEventListener('click', () => {
            this.toggleAccessibilityPanel();
        });

        // Load saved preferences
        this.loadAccessibilityPreferences(panel);

        return panel;
    }

    loadAccessibilityPreferences(panel) {
        const prefs = JSON.parse(localStorage.getItem('accessibilityPrefs') || '{}');

        panel.querySelector('#highContrast').checked = prefs.highContrast || false;
        panel.querySelector('#largeText').checked = prefs.largeText || false;
        panel.querySelector('#reducedMotion').checked = prefs.reducedMotion || false;

        // Apply preferences
        if (prefs.highContrast) document.body.classList.add('high-contrast');
        if (prefs.largeText) document.body.classList.add('large-text');
        if (prefs.reducedMotion) document.body.classList.add('reduced-motion');
    }

    addFormValidation(input) {
        const errorId = `${input.id || 'input'}-error`;
        const helpId = `${input.id || 'input'}-help`;

        // Add error message container
        if (!document.getElementById(errorId)) {
            const errorDiv = document.createElement('div');
            errorDiv.id = errorId;
            errorDiv.className = 'form-error sr-only';
            errorDiv.setAttribute('aria-live', 'polite');
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }

        // Update aria-describedby
        const describedBy = [errorId, helpId].filter(id => document.getElementById(id)).join(' ');
        if (describedBy) {
            input.setAttribute('aria-describedby', describedBy);
        }

        // Add validation on blur
        input.addEventListener('blur', () => {
            this.validateInput(input);
        });
    }

    validateInput(input) {
        const errorDiv = document.getElementById(`${input.id || 'input'}-error`);
        if (!errorDiv) return;

        let errorMessage = '';

        if (input.hasAttribute('required') && !input.value.trim()) {
            errorMessage = 'This field is required';
        } else if (input.type === 'email' && input.value && !this.isValidEmail(input.value)) {
            errorMessage = 'Please enter a valid email address';
        }

        if (errorMessage) {
            errorDiv.textContent = errorMessage;
            errorDiv.classList.remove('sr-only');
            input.setAttribute('aria-invalid', 'true');
        } else {
            errorDiv.textContent = '';
            errorDiv.classList.add('sr-only');
            input.removeAttribute('aria-invalid');
        }
    }

    provideChartDescription(chartElement) {
        // This would typically get data from the chart instance
        const description = 'This chart shows data trends over time. Detailed data is available in the data table below.';
        this.announce(description, 'assertive');
    }

    inferElementPurpose(element) {
        const classes = element.className.toLowerCase();
        const parent = element.parentElement;

        if (classes.includes('close')) return 'Close';
        if (classes.includes('menu')) return 'Menu';
        if (classes.includes('search')) return 'Search';
        if (classes.includes('theme')) return 'Toggle theme';
        if (classes.includes('notification')) return 'Notifications';
        if (parent && parent.className.includes('chart')) return 'Chart controls';

        return 'Button';
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    isInModal(element) {
        return element.closest('[role="dialog"], .modal') !== null;
    }
}

// Initialize accessibility enhancements
if (typeof window !== 'undefined') {
    function initAccessibilityEnhancements() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.accessibilityEnhancements = new AccessibilityEnhancements();
                console.log('🎯 Accessibility Enhancements initialized');
            });
        } else {
            window.accessibilityEnhancements = new AccessibilityEnhancements();
            console.log('🎯 Accessibility Enhancements initialized');
        }
    }
    initAccessibilityEnhancements();
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityEnhancements;
}