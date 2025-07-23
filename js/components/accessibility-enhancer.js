// Accessibility Enhancement Component for Contest Compliance
class AccessibilityEnhancer extends HTMLElement {
    constructor() {
        super();
        this.accessibilityFeatures = {
            screenReader: false,
            highContrast: false,
            reducedMotion: false,
            largeText: false,
            keyboardNav: true
        };
        this.shortcuts = new Map();
    }

    connectedCallback() {
        this.detectAccessibilityNeeds();
        this.setupKeyboardShortcuts();
        this.enhanceExistingElements();
        this.createAccessibilityPanel();
        this.setupScreenReaderSupport();
    }

    detectAccessibilityNeeds() {
        // Detect user preferences
        this.accessibilityFeatures.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.accessibilityFeatures.highContrast = window.matchMedia('(prefers-contrast: high)').matches;
        
        // Load saved preferences
        const saved = localStorage.getItem('accessibilityPreferences');
        if (saved) {
            Object.assign(this.accessibilityFeatures, JSON.parse(saved));
        }

        this.applyAccessibilityFeatures();
    }

    setupKeyboardShortcuts() {
        // Essential keyboard navigation shortcuts
        this.shortcuts.set('Alt+1', () => this.focusMainContent());
        this.shortcuts.set('Alt+2', () => this.focusNavigation());
        this.shortcuts.set('Alt+3', () => this.focusSearch());
        this.shortcuts.set('Alt+H', () => this.showHelp());
        this.shortcuts.set('Alt+A', () => this.toggleAccessibilityPanel());
        this.shortcuts.set('Escape', () => this.closeModals());

        document.addEventListener('keydown', (e) => {
            const shortcut = this.getShortcutKey(e);
            if (this.shortcuts.has(shortcut)) {
                e.preventDefault();
                this.shortcuts.get(shortcut)();
            }
        });
    }

    getShortcutKey(event) {
        const keys = [];
        if (event.altKey) keys.push('Alt');
        if (event.ctrlKey) keys.push('Ctrl');
        if (event.shiftKey) keys.push('Shift');
        if (event.key !== 'Alt' && event.key !== 'Control' && event.key !== 'Shift') {
            keys.push(event.key);
        }
        return keys.join('+');
    }

    enhanceExistingElements() {
        // Add ARIA labels to interactive elements
        this.enhanceButtons();
        this.enhanceLinks();
        this.enhanceImages();
        this.enhanceFormElements();
        this.createLandmarks();
        this.improveFocusManagement();
    }

    enhanceButtons() {
        document.querySelectorAll('button:not([aria-label]):not([aria-describedby])').forEach(btn => {
            if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
                const svg = btn.querySelector('svg');
                if (svg) {
                    btn.setAttribute('aria-label', this.inferButtonPurpose(btn));
                }
            }
        });
    }

    enhanceLinks() {
        document.querySelectorAll('a:not([aria-label])').forEach(link => {
            if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', 'Link');
            }
            
            // Add external link indicators
            if (link.hostname && link.hostname !== window.location.hostname) {
                link.setAttribute('aria-label', (link.getAttribute('aria-label') || link.textContent) + ' (opens in new window)');
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    enhanceImages() {
        document.querySelectorAll('img:not([alt])').forEach(img => {
            img.setAttribute('alt', '');
        });
    }

    enhanceFormElements() {
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${element.id}"]`);
                if (!label && element.placeholder) {
                    element.setAttribute('aria-label', element.placeholder);
                }
            }
        });
    }

    createLandmarks() {
        // Add ARIA landmarks if missing
        if (!document.querySelector('[role="main"]') && !document.querySelector('main')) {
            const mainContent = document.querySelector('.main-content, .dashboard, #main');
            if (mainContent) {
                mainContent.setAttribute('role', 'main');
                mainContent.setAttribute('aria-label', 'Main content');
            }
        }

        if (!document.querySelector('[role="navigation"]') && !document.querySelector('nav')) {
            const nav = document.querySelector('.sidebar, .navigation, #sidebar');
            if (nav) {
                nav.setAttribute('role', 'navigation');
                nav.setAttribute('aria-label', 'Main navigation');
            }
        }

        if (!document.querySelector('[role="banner"]') && !document.querySelector('header')) {
            const header = document.querySelector('.header, app-header, #header');
            if (header) {
                header.setAttribute('role', 'banner');
                header.setAttribute('aria-label', 'Site header');
            }
        }
    }

    improveFocusManagement() {
        // Ensure all interactive elements are focusable
        document.querySelectorAll('[onclick], .clickable, .interactive').forEach(element => {
            if (!element.hasAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'A') {
                element.setAttribute('tabindex', '0');
                element.setAttribute('role', 'button');
            }
        });

        // Add focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus-visible {
                outline: 3px solid var(--primary-500);
                outline-offset: 2px;
                border-radius: var(--radius-sm);
            }
            
            .focus-highlight {
                box-shadow: 0 0 0 3px var(--primary-500);
                border-radius: var(--radius-sm);
            }
        `;
        document.head.appendChild(style);
    }

    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <div class="accessibility-content">
                <div class="accessibility-header">
                    <h3>Accessibility Options</h3>
                    <button class="close-accessibility" aria-label="Close accessibility panel">×</button>
                </div>
                
                <div class="accessibility-options">
                    <div class="option-group">
                        <h4>Visual</h4>
                        <label class="option">
                            <input type="checkbox" id="highContrast" ${this.accessibilityFeatures.highContrast ? 'checked' : ''}>
                            <span>High Contrast Mode</span>
                        </label>
                        <label class="option">
                            <input type="checkbox" id="largeText" ${this.accessibilityFeatures.largeText ? 'checked' : ''}>
                            <span>Large Text</span>
                        </label>
                        <label class="option">
                            <input type="checkbox" id="reducedMotion" ${this.accessibilityFeatures.reducedMotion ? 'checked' : ''}>
                            <span>Reduce Motion</span>
                        </label>
                    </div>
                    
                    <div class="option-group">
                        <h4>Navigation</h4>
                        <label class="option">
                            <input type="checkbox" id="keyboardNav" ${this.accessibilityFeatures.keyboardNav ? 'checked' : ''}>
                            <span>Enhanced Keyboard Navigation</span>
                        </label>
                        <label class="option">
                            <input type="checkbox" id="screenReader" ${this.accessibilityFeatures.screenReader ? 'checked' : ''}>
                            <span>Screen Reader Optimizations</span>
                        </label>
                    </div>
                </div>

                <div class="keyboard-shortcuts">
                    <h4>Keyboard Shortcuts</h4>
                    <div class="shortcut-list">
                        <div class="shortcut-item">
                            <kbd>Alt + 1</kbd>
                            <span>Main Content</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt + 2</kbd>
                            <span>Navigation</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt + 3</kbd>
                            <span>Search</span>
                        </div>
                        <div class="shortcut-item">
                            <kbd>Alt + A</kbd>
                            <span>Accessibility Panel</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.setupAccessibilityPanelEvents(panel);
        this.addAccessibilityStyles();
    }

    setupAccessibilityPanelEvents(panel) {
        // Option changes
        panel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const feature = e.target.id;
                this.accessibilityFeatures[feature] = e.target.checked;
                this.applyAccessibilityFeatures();
                this.saveAccessibilityPreferences();
            });
        });

        // Close panel
        panel.querySelector('.close-accessibility').addEventListener('click', () => {
            panel.classList.remove('open');
        });
    }

    applyAccessibilityFeatures() {
        const html = document.documentElement;
        
        // High contrast
        html.classList.toggle('high-contrast', this.accessibilityFeatures.highContrast);
        
        // Large text
        html.classList.toggle('large-text', this.accessibilityFeatures.largeText);
        
        // Reduced motion
        html.classList.toggle('reduced-motion', this.accessibilityFeatures.reducedMotion);
        
        // Screen reader optimizations
        html.classList.toggle('screen-reader-optimized', this.accessibilityFeatures.screenReader);
    }

    addAccessibilityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .accessibility-panel {
                position: fixed;
                top: 20px;
                left: 20px;
                background: var(--bg-elevated);
                border: 2px solid var(--primary-500);
                border-radius: var(--radius-lg);
                padding: var(--space-4);
                box-shadow: var(--shadow-xl);
                z-index: 1001;
                max-width: 320px;
                transform: translateX(-100%);
                transition: transform var(--duration-normal) var(--ease);
            }

            .accessibility-panel.open {
                transform: translateX(0);
            }

            .accessibility-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: var(--space-4);
                border-bottom: 1px solid var(--border-color);
                padding-bottom: var(--space-2);
            }

            .accessibility-header h3 {
                font-size: var(--font-size-lg);
                font-weight: 600;
                color: var(--text-primary);
                margin: 0;
            }

            .close-accessibility {
                background: none;
                border: none;
                font-size: var(--font-size-xl);
                cursor: pointer;
                color: var(--text-secondary);
                padding: var(--space-1);
                border-radius: var(--radius-sm);
            }

            .close-accessibility:hover {
                background: var(--bg-hover);
                color: var(--text-primary);
            }

            .option-group {
                margin-bottom: var(--space-4);
            }

            .option-group h4 {
                font-size: var(--font-size-sm);
                font-weight: 600;
                color: var(--text-primary);
                margin: 0 0 var(--space-2) 0;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .option {
                display: flex;
                align-items: center;
                gap: var(--space-2);
                margin-bottom: var(--space-2);
                cursor: pointer;
                padding: var(--space-2);
                border-radius: var(--radius-sm);
                transition: background var(--duration-fast) var(--ease);
            }

            .option:hover {
                background: var(--bg-hover);
            }

            .option input[type="checkbox"] {
                width: 18px;
                height: 18px;
                cursor: pointer;
            }

            .shortcut-list {
                display: flex;
                flex-direction: column;
                gap: var(--space-2);
            }

            .shortcut-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: var(--font-size-sm);
            }

            kbd {
                background: var(--gray-100);
                border: 1px solid var(--border-color);
                border-radius: var(--radius-sm);
                padding: var(--space-1) var(--space-2);
                font-family: monospace;
                font-size: var(--font-size-xs);
                font-weight: 600;
            }

            /* High contrast mode */
            .high-contrast {
                filter: contrast(150%);
            }

            .high-contrast * {
                border-color: #000000 !important;
                color: #000000 !important;
            }

            .high-contrast [data-theme="dark"] * {
                color: #ffffff !important;
            }

            /* Large text mode */
            .large-text {
                font-size: 120%;
            }

            .large-text h1 { font-size: calc(var(--font-size-3xl) * 1.2); }
            .large-text h2 { font-size: calc(var(--font-size-2xl) * 1.2); }
            .large-text h3 { font-size: calc(var(--font-size-xl) * 1.2); }

            /* Reduced motion */
            .reduced-motion *, 
            .reduced-motion *::before, 
            .reduced-motion *::after {
                animation-duration: 0.01ms !important;
                transition-duration: 0.01ms !important;
            }

            /* Screen reader optimizations */
            .screen-reader-optimized .sr-only {
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

            .screen-reader-optimized .sr-only:focus {
                position: static;
                width: auto;
                height: auto;
                padding: var(--space-2);
                margin: 0;
                overflow: visible;
                clip: auto;
                white-space: normal;
                background: var(--primary-500);
                color: white;
                border-radius: var(--radius-sm);
            }

            @media (max-width: 768px) {
                .accessibility-panel {
                    left: 10px;
                    top: 10px;
                    max-width: calc(100vw - 20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupScreenReaderSupport() {
        // Add screen reader only text for context
        document.querySelectorAll('.stat-value, .metric-number').forEach(element => {
            if (!element.querySelector('.sr-only')) {
                const srText = document.createElement('span');
                srText.className = 'sr-only';
                srText.textContent = this.getScreenReaderContext(element);
                element.appendChild(srText);
            }
        });

        // Live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);
    }

    getScreenReaderContext(element) {
        const parentCard = element.closest('.stat-card, .overview-stat, .metric-card');
        if (parentCard) {
            const label = parentCard.querySelector('.stat-label, .metric-label');
            if (label) {
                return `${element.textContent} ${label.textContent}`;
            }
        }
        return '';
    }

    inferButtonPurpose(button) {
        const parent = button.closest('[class*="toggle"], [class*="menu"], [class*="nav"]');
        if (parent) return 'Toggle menu';
        
        if (button.querySelector('svg')) {
            const svgPath = button.querySelector('svg path, svg line, svg circle');
            if (svgPath) {
                // Simple SVG icon detection
                return 'Action button';
            }
        }
        
        return 'Button';
    }

    // Navigation helper methods
    focusMainContent() {
        const main = document.querySelector('[role="main"], main, .main-content');
        if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
        }
    }

    focusNavigation() {
        const nav = document.querySelector('[role="navigation"], nav, .sidebar');
        if (nav) {
            const firstLink = nav.querySelector('a, button');
            if (firstLink) firstLink.focus();
        }
    }

    focusSearch() {
        const search = document.querySelector('[type="search"], .search-input, #search');
        if (search) {
            search.focus();
        }
    }

    showHelp() {
        const helpDialog = document.querySelector('help-dialog');
        if (helpDialog && helpDialog.open) {
            helpDialog.open();
        }
    }

    toggleAccessibilityPanel() {
        const panel = document.querySelector('.accessibility-panel');
        if (panel) {
            panel.classList.toggle('open');
        }
    }

    closeModals() {
        document.querySelectorAll('.modal.open, .panel.open').forEach(modal => {
            modal.classList.remove('open');
        });
    }

    saveAccessibilityPreferences() {
        localStorage.setItem('accessibilityPreferences', JSON.stringify(this.accessibilityFeatures));
    }

    announceToScreenReader(message) {
        const liveRegion = document.getElementById('live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }
}

customElements.define('accessibility-enhancer', AccessibilityEnhancer); 