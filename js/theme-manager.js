// Theme Management System
const ThemeManager = {
    defaultTheme: {
        hue: 270,
        saturation: 80,
        lightness: 50,
        name: 'Default'
    },

    initializeTheme() {
        try {
            // Force light theme for new users
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                console.log('🔄 Clearing dark theme preference, forcing light mode');
                localStorage.removeItem('theme');
            }

            const theme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
            document.body.setAttribute('data-theme', theme);

            // Try to load saved user theme
            try {
                const savedUserTheme = localStorage.getItem('userTheme');
                if (savedUserTheme) {
                    const themeData = JSON.parse(savedUserTheme);
                    console.log('Loading saved theme:', themeData);

                    if (themeData && typeof themeData.hue === 'number' &&
                        typeof themeData.saturation === 'number' &&
                        typeof themeData.lightness === 'number') {
                        this.applyColorTheme(themeData);
                        return; // Successfully applied saved theme
                    }
                }
            } catch (e) {
                console.warn('Failed to load saved theme:', e);
            }

            // If we get here, either no theme was saved or it was invalid
            console.log('Applying default theme');
            localStorage.removeItem('userTheme');
            this.applyColorTheme(this.defaultTheme);

        } catch (error) {
            console.error('Failed to initialize theme:', error);
            this.applyColorTheme(this.defaultTheme);
        }
    },

    applyColorTheme(theme) {
        try {
            // Temporarily disable transitions
            document.documentElement.classList.add('theme-transition');

            // Force a recompute to ensure clean state
            document.documentElement.style.setProperty('--force-recompute', '1');

            // Set root HSL variables that control all derived colors
            document.documentElement.style.setProperty('--primary-h', theme.hue);
            document.documentElement.style.setProperty('--primary-s', theme.saturation + '%');
            document.documentElement.style.setProperty('--primary-l', theme.lightness + '%');

            // Also set user- versions for components that use them
            document.documentElement.style.setProperty('--user-primary-h', theme.hue);
            document.documentElement.style.setProperty('--user-primary-s', theme.saturation + '%');
            document.documentElement.style.setProperty('--user-primary-l', theme.lightness + '%');

            // Calculate colors
            const baseColor = `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`;
            const darkerColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`;
            const lighterColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`;

            // Set comprehensive color scale
            // Set solid color values for components that need them
            document.documentElement.style.setProperty('--primary-50', `hsl(${theme.hue}, ${theme.saturation}%, 95%)`);
            document.documentElement.style.setProperty('--primary-100', `hsl(${theme.hue}, ${theme.saturation}%, 90%)`);
            document.documentElement.style.setProperty('--primary-200', `hsl(${theme.hue}, ${theme.saturation}%, 80%)`);
            document.documentElement.style.setProperty('--primary-300', lighterColor);
            document.documentElement.style.setProperty('--primary-400', baseColor);
            document.documentElement.style.setProperty('--primary-500', baseColor);
            document.documentElement.style.setProperty('--primary-600', darkerColor);
            document.documentElement.style.setProperty('--primary-700', `hsl(${theme.hue}, ${theme.saturation}%, 30%)`);
            document.documentElement.style.setProperty('--primary-800', `hsl(${theme.hue}, ${theme.saturation}%, 20%)`);
            document.documentElement.style.setProperty('--primary-900', `hsl(${theme.hue}, ${theme.saturation}%, 10%)`);

            // Set solid background colors for metric cards
            document.documentElement.style.setProperty('--metric-card-bg', baseColor);
            document.documentElement.style.setProperty('--metric-card-hover-bg', lighterColor);

            // Set component accessors
            document.documentElement.style.setProperty('--button-primary', baseColor);
            document.documentElement.style.setProperty('--button-primary-hover', darkerColor);
            document.documentElement.style.setProperty('--link-color', baseColor);
            document.documentElement.style.setProperty('--link-hover', darkerColor);
            document.documentElement.style.setProperty('--accent-color', baseColor);
            document.documentElement.style.setProperty('--accent-light', lighterColor);
            document.documentElement.style.setProperty('--accent-dark', darkerColor);

            // Override any hardcoded purple references
            document.documentElement.style.setProperty('--welcome-bg-start', baseColor);
            document.documentElement.style.setProperty('--welcome-bg-end', darkerColor);

            // Force a recompute to ensure all styles update
            void document.documentElement.offsetHeight;

            // Re-enable transitions after a brief delay
            requestAnimationFrame(() => {
                document.documentElement.classList.remove('theme-transition');
                document.documentElement.style.removeProperty('--force-recompute');

                // Notify components of theme change
                document.dispatchEvent(new CustomEvent('themeChanged', {
                    detail: { theme, baseColor, darkerColor, lighterColor }
                }));
            });

            console.log('Color theme applied:', theme);
        } catch (error) {
            console.error('Failed to apply color theme:', error);
            throw error;
        }
    },

    saveTheme(theme) {
        try {
            localStorage.setItem('userTheme', JSON.stringify(theme));
            this.applyColorTheme(theme);
        } catch (error) {
            console.error('Failed to save theme:', error);
            throw error;
        }
    }
};

// Make ThemeManager globally available
window.ThemeManager = ThemeManager;

// Initialize theme on script load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initializeTheme();
});
