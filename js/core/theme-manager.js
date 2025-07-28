export class ThemeManager {
    constructor() {
        this.themeChangeCallbacks = new Set();
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Initialize theme
        this.initializeTheme();
        this.setupEventListeners();
    }

    initializeTheme() {
        // Always default to light theme for contest requirements
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        
        // Fix any white backgrounds
        this.fixWhiteBackgrounds();
    }

    fixWhiteBackgrounds() {
        document.querySelectorAll('*[class*="insight"], *[class*="card"]')
            .forEach(el => {
                el.style.setProperty('background', 'transparent', 'important');
                el.style.setProperty('background-color', 'transparent', 'important');
            });
    }

    setupEventListeners() {
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => {
                this.systemPrefersDark = e.matches;
                this.updateTheme();
            });

        // Listen for storage changes (theme sync across tabs)
        window.addEventListener('storage', e => {
            if (e.key === 'theme') {
                this.currentTheme = e.newValue;
                this.updateTheme();
            }
        });
    }

    updateTheme() {
        const theme = this.currentTheme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Apply CSS variable updates
        const hslValues = this.getThemeHSLValues(theme);
        this.updateCSSVariables(hslValues);
        
        // Notify components
        this.notifyThemeChange(theme);
    }

    getThemeHSLValues(theme) {
        // Default contest purple theme
        return {
            primary: { h: 270, s: 80, l: 50 },
            accent: { h: 290, s: 70, l: 60 },
            success: { h: 120, s: 60, l: 45 },
            warning: { h: 40, s: 100, l: 50 },
            error: { h: 0, s: 100, l: 45 }
        };
    }

    updateCSSVariables(hslValues) {
        const root = document.documentElement;
        
        Object.entries(hslValues).forEach(([key, { h, s, l }]) => {
            root.style.setProperty(`--${key}-h`, h);
            root.style.setProperty(`--${key}-s`, `${s}%`);
            root.style.setProperty(`--${key}-l`, `${l}%`);
        });
    }

    onThemeChange(callback) {
        this.themeChangeCallbacks.add(callback);
    }

    notifyThemeChange(theme) {
        this.themeChangeCallbacks.forEach(callback => callback(theme));
    }
}

// Create global instance
window.themeManager = new ThemeManager();
