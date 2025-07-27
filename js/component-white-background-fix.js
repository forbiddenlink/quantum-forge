/* 🎯 COMPREHENSIVE JAVASCRIPT WHITE BACKGROUND FIX */
/* Date: July 26, 2025 - Contest Ready Solution */

// Monitor and fix any dynamically created white backgrounds
class WhiteBackgroundFixer {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    start() {
        console.log('🔧 Starting white background monitoring...');
        
        // Fix existing elements
        this.fixExistingElements();
        
        // Set up mutation observer for dynamic content
        this.setupMutationObserver();
        
        // Periodic cleanup every 2 seconds
        setInterval(() => this.fixExistingElements(), 2000);
    }

    fixExistingElements() {
        const problemElements = document.querySelectorAll(`
            [style*="background: white"],
            [style*="background:#fff"],
            [style*="background: #ffffff"],
            [style*="background-color: white"],
            [style*="background-color:#fff"],
            [style*="background-color: #ffffff"],
            [style*="background: rgb(255, 255, 255)"],
            [style*="background-color: rgb(255, 255, 255)"]
        `);

        problemElements.forEach(element => {
            // Skip sidebar and form elements that should remain white
            if (element.closest('.sidebar') || 
                element.matches('input, textarea, select, .form-control') ||
                element.closest('.color-picker-panel')) {
                return;
            }

            // Apply themed background instead of white
            this.applyThemedBackground(element);
        });
    }

    applyThemedBackground(element) {
        // Check if dark mode
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDarkMode) {
            element.style.setProperty('background', 'rgba(31, 41, 55, 0.8)', 'important');
            element.style.setProperty('color', 'rgba(243, 244, 246, 0.95)', 'important');
        } else {
            // Light mode - use glassmorphism
            element.style.setProperty('background', 
                'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)', 
                'important');
            element.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
            element.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
        }
    }

    setupMutationObserver() {
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            this.scanElement(node);
                        }
                    });
                } else if (mutation.type === 'attributes' && 
                           mutation.attributeName === 'style') {
                    this.scanElement(mutation.target);
                }
            });
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style']
        });
    }

    scanElement(element) {
        // Check the element itself
        if (this.hasWhiteBackground(element)) {
            this.applyThemedBackground(element);
        }

        // Check all descendants
        const descendants = element.querySelectorAll(`
            [style*="background: white"],
            [style*="background:#fff"],
            [style*="background: #ffffff"],
            [style*="background-color: white"],
            [style*="background-color:#fff"],
            [style*="background-color: #ffffff"]
        `);

        descendants.forEach(desc => {
            if (!desc.closest('.sidebar') && 
                !desc.matches('input, textarea, select, .form-control')) {
                this.applyThemedBackground(desc);
            }
        });
    }

    hasWhiteBackground(element) {
        const style = element.getAttribute('style');
        if (!style) return false;

        return style.includes('background: white') ||
               style.includes('background:#fff') ||
               style.includes('background: #ffffff') ||
               style.includes('background-color: white') ||
               style.includes('background-color:#fff') ||
               style.includes('background-color: #ffffff') ||
               style.includes('background: rgb(255, 255, 255)') ||
               style.includes('background-color: rgb(255, 255, 255)');
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

// Initialize the white background fixer
window.whiteBackgroundFixer = new WhiteBackgroundFixer();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhiteBackgroundFixer;
}