// Global Theme Management Service
const ThemeService = {
    defaultTheme: {
        hue: 270,
        saturation: 80,
        lightness: 50,
        name: 'Default'
    },

    // Current theme state
    currentTheme: null,

    // CSS variables that need to be updated
    themeVariables: [
        '--primary-h',
        '--primary-s',
        '--primary-l',
        '--user-primary-h',
        '--user-primary-s',
        '--user-primary-l',
        '--primary-300',
        '--primary-400',
        '--primary-500',
        '--primary-600',
        '--accent-color',
        '--accent-light',
        '--accent-dark',
        '--button-primary',
        '--button-primary-hover',
        '--link-color',
        '--link-hover'
    ],

    // Component readiness tracking
    isColorPickerReady: false,
    colorPickerReadyCallbacks: [],

    // Event handling
    listeners: new Set(),

    // Wait for color picker to be ready
    async waitForColorPicker() {
        if (this.isColorPickerReady) return true;

        return new Promise(resolve => {
            if (customElements.get('dynamic-color-picker')) {
                this.isColorPickerReady = true;
                resolve(true);
            } else {
                this.colorPickerReadyCallbacks.push(resolve);
                // Set a timeout to resolve anyway after 5 seconds
                setTimeout(() => resolve(false), 5000);
            }
        });
    },

    // Called when color picker is defined
    onColorPickerDefined() {
        this.isColorPickerReady = true;
        this.colorPickerReadyCallbacks.forEach(cb => cb(true));
        this.colorPickerReadyCallbacks = [];
    },

    // Subscribe to theme changes
    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    },

    // Notify all listeners of theme change
    notifyListeners(theme) {
        this.listeners.forEach(callback => callback(theme));
    },

    // Apply a theme including updating CSS variables
    applyTheme(theme) {
        try {
            if (!theme || typeof theme.hue !== 'number' || typeof theme.saturation !== 'number' || typeof theme.lightness !== 'number') {
                throw new Error('Invalid theme object');
            }

            console.log('🎨 ThemeService: Applying theme:', theme);

            // Store current theme
            this.currentTheme = { ...theme };

            // Get root element
            const root = document.documentElement;
            const body = document.body;

            // Remove any transition classes temporarily
            root.classList.remove('theme-transition');
            body.classList.remove('theme-transition');

            // Calculate all colors first
            const colors = {
                base: `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`,
                darker: `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`,
                lighter: `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`,
                // Add more color variations as needed
            };

            // Batch all style updates
            const updates = {
                '--primary-h': theme.hue,
                '--primary-s': `${theme.saturation}%`,
                '--primary-l': `${theme.lightness}%`,
                '--user-primary-h': theme.hue,
                '--user-primary-s': `${theme.saturation}%`,
                '--user-primary-l': `${theme.lightness}%`,
                '--primary-300': colors.lighter,
                '--primary-400': colors.base,
                '--primary-500': colors.base,
                '--primary-600': colors.darker,
                '--accent-color': colors.base,
                '--accent-light': colors.lighter,
                '--accent-dark': colors.darker,
                '--button-primary': colors.base,
                '--button-primary-hover': colors.darker,
                '--link-color': colors.base,
                '--link-hover': colors.darker,
                '--welcome-bg-start': colors.base,
                '--welcome-bg-end': colors.darker
            };

            // Create a style element for faster updates
            const styleElement = document.createElement('style');
            styleElement.setAttribute('id', 'theme-variables');

            // Build CSS rules
            const cssRules = Object.entries(updates)
                .map(([variable, value]) => `html { ${variable}: ${value}; }`)
                .join('\n');

            styleElement.textContent = cssRules;

            // Remove old style element if it exists
            const oldStyle = document.getElementById('theme-variables');
            if (oldStyle) {
                oldStyle.remove();
            }

            // Insert new styles
            document.head.appendChild(styleElement);

            // Force immediate style recalculation
            const _ = window.getComputedStyle(body).opacity;
            document.documentElement.style.setProperty('--force-repaint', '0');

            // Save theme to localStorage
            localStorage.setItem('userTheme', JSON.stringify(theme));

            // Notify all systems of the change
            requestAnimationFrame(() => {
                // Force multiple repaints
                body.style.backgroundColor = body.style.backgroundColor;
                body.style.transform = 'translateZ(0)';

                this.notifyListeners(theme);

                document.dispatchEvent(new CustomEvent('themeChanged', {
                    detail: { ...theme, colors }
                }));

                // Add transitions back
                requestAnimationFrame(() => {
                    root.classList.add('theme-transition');
                    body.classList.add('theme-transition');
                });
            });

            console.log('✅ ThemeService: Theme applied successfully', updates);
            return true;

        } catch (error) {
            console.error('❌ ThemeService: Failed to apply theme:', error);
            return false;
        }
    },

    // Initialize theme system
    async initialize() {
        try {
            console.log('ThemeService: Initializing...');

            // Force light mode
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');

            // Wait for color picker to be ready
            const colorPickerReady = await this.waitForColorPicker();
            console.log('ThemeService: Color picker ready status:', colorPickerReady);

            // Try to load saved theme
            const savedTheme = localStorage.getItem('userTheme');
            if (savedTheme) {
                try {
                    const theme = JSON.parse(savedTheme);
                    if (theme && typeof theme.hue === 'number' &&
                        typeof theme.saturation === 'number' &&
                        typeof theme.lightness === 'number') {
                        return this.applyTheme(theme);
                    }
                } catch (e) {
                    console.warn('ThemeService: Failed to parse saved theme:', e);
                }
            }

            // Fall back to default theme
            return this.applyTheme(this.defaultTheme);
        } catch (error) {
            console.error('ThemeService: Failed to initialize:', error);
            return false;
        }
    }
};

// Make ThemeService globally available
window.ThemeService = ThemeService;

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => {
    ThemeService.initialize();
});
