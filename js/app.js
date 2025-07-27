// Theme and Navigation Management
let welcomeSection = null; // Store welcome section instance for cleanup
let performanceMonitor = null;
let analyticsServiceInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Quantum Forge - Loading...');

    // Debug: Check if custom elements are registered
    console.log('🔍 Checking custom element registration...');
    const customElementsToCheck = [
        'analytics-dashboard',
        'task-system',
        'enhanced-knowledge-hub',
        'live-activity-feed',
        'smart-insights-dashboard',
        'wellness-tracker',
        'team-spotlight',
        'company-news',
        'collaboration-hub',
        'office-visualizer',
        'enhanced-interactive-poll',
        'weather-widget',
        'achievement-system',
        'company-culture-showcase'
    ];

    customElementsToCheck.forEach(tagName => {
        const isRegistered = customElements.get(tagName);
        console.log(`${isRegistered ? '✅' : '❌'} ${tagName}: ${isRegistered ? 'Registered' : 'NOT REGISTERED'}`);
    });

    // Debug: Check if elements exist in DOM
    console.log('🔍 Checking DOM elements...');
    customElementsToCheck.forEach(tagName => {
        const elements = document.querySelectorAll(tagName);
        console.log(`📦 ${tagName}: ${elements.length} elements found`);
        elements.forEach((el, index) => {
            console.log(`  - Element ${index}:`, el);
            console.log(`    - innerHTML length: ${el.innerHTML.length}`);
            console.log(`    - children count: ${el.children.length}`);
        });
    });

    // Simple initialization without complex timing
    initializeTheme();
    initializeSidebar();
    initializeKeyboardShortcuts();

    // Force sidebar background fix
    forceSidebarLightMode();
    
    // Force light theme and fix white backgrounds
    forceLightThemeAndFixBackgrounds();

    // Initialize performance monitoring
    if (window.PerformanceMonitor) {
        performanceMonitor = new window.PerformanceMonitor();
        performanceMonitor.startMonitoring();
        console.log('Performance monitoring started');
    }

    // Initialize welcome section if it exists
    const welcomeElement = document.querySelector('.welcome-section');
    if (welcomeElement && typeof WelcomeSection !== 'undefined') {
        welcomeSection = new WelcomeSection();
        console.log('Welcome section initialized');
    } else if (welcomeElement) {
        console.log('Welcome section element found but WelcomeSection class not available');
    }

    // Initialize analytics service if available
    if (window.analyticsService) {
        console.log('Starting analytics service...');
        analyticsServiceInstance = window.analyticsService;
        analyticsServiceInstance.startRealTimeUpdates();
        analyticsServiceInstance.generateMockData();
    }

    console.log('✅ Quantum Forge - Ready!');
    
    // Additional fix after components are loaded
    setTimeout(() => {
        forceLightThemeAndFixBackgrounds();
    }, 2000);

    // Fallback: If components are not rendering, show fallback content
    setTimeout(() => {
        console.log('🔍 Checking component rendering status...');
        const componentsToCheck = [
            'analytics-dashboard',
            'task-system',
            'enhanced-knowledge-hub'
        ];

        let hasEmptyComponents = false;
        componentsToCheck.forEach(tagName => {
            const elements = document.querySelectorAll(tagName);
            elements.forEach(el => {
                console.log(`🔍 Checking ${tagName}:`, {
                    innerHTML: el.innerHTML.length,
                    offsetWidth: el.offsetWidth,
                    offsetHeight: el.offsetHeight,
                    display: getComputedStyle(el).display,
                    visibility: getComputedStyle(el).visibility,
                    opacity: getComputedStyle(el).opacity,
                    position: getComputedStyle(el).position,
                    zIndex: getComputedStyle(el).zIndex
                });

                if (el.innerHTML.trim().length === 0) {
                    console.warn(`⚠️ Empty component detected: ${tagName}`);
                    hasEmptyComponents = true;

                    // Add fallback content
                    el.innerHTML = `
                        <div style="padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px; text-align: center; color: white;">
                            <h3>${tagName.replace('-', ' ').toUpperCase()}</h3>
                            <p>Component is loading...</p>
                            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
                        </div>
                    `;
                } else if (el.offsetWidth === 0 || el.offsetHeight === 0) {
                    console.warn(`⚠️ Component has no dimensions: ${tagName}`, {
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                        display: getComputedStyle(el).display,
                        visibility: getComputedStyle(el).visibility
                    });

                    // Force visibility
                    el.style.display = 'block';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    el.style.width = '100%';
                    el.style.height = 'auto';
                    el.style.minHeight = '200px';
                }
            });
        });

        if (hasEmptyComponents) {
            console.log('🛠️ Applied fallback content to empty components');
        }

        // Test: Try to manually create a component
        console.log('🧪 Testing manual component creation...');
        try {
            const testElement = document.createElement('analytics-dashboard');
            console.log('✅ Manual component creation successful:', testElement);

            // Check if the component has a constructor
            const constructor = customElements.get('analytics-dashboard');
            if (constructor) {
                console.log('✅ Component constructor found:', constructor);
                console.log('✅ Component prototype:', constructor.prototype);
            } else {
                console.log('❌ Component constructor not found');
            }
        } catch (error) {
            console.error('❌ Manual component creation failed:', error);
        }
    }, 3000); // Wait 3 seconds for components to render
});

// Cleanup when page is unloaded
window.addEventListener('beforeunload', () => {
    console.log('Page unloading, cleaning up all services...');

    if (welcomeSection && welcomeSection.destroy) {
        welcomeSection.destroy();
    }

    if (performanceMonitor && performanceMonitor.stopMonitoring) {
        performanceMonitor.stopMonitoring();
    }

    if (analyticsServiceInstance && analyticsServiceInstance.destroy) {
        analyticsServiceInstance.destroy();
    }

    console.log('All services cleaned up');
});

// Enhanced loading screen management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Hiding loading screen...');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
            console.log('Loading screen hidden successfully');
        }, 300);
    } else {
        console.log('Loading screen not found');
    }
}

// Multiple fallback timers to ensure loading screen is hidden
setTimeout(hideLoadingScreen, 500);
setTimeout(hideLoadingScreen, 1000);
setTimeout(hideLoadingScreen, 2000);

// Also hide loading screen when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(hideLoadingScreen, 100);
});

// Hide loading screen when window is fully loaded
window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 50);
});

// Enhanced Theme Management with Dynamic Workspace Themes
function initializeTheme() {
    // Force light theme for new users and clear any dark mode preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        console.log('🔄 Clearing dark theme preference, forcing light mode');
        localStorage.removeItem('theme');
    }
    
    const theme = localStorage.getItem('theme') || detectPreferredTheme();
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    // Load saved user theme (new system with hue/saturation/lightness)
    const savedUserTheme = localStorage.getItem('userTheme');
    if (savedUserTheme) {
        try {
            const themeData = JSON.parse(savedUserTheme);
            console.log('Loading saved theme:', themeData);

            // Apply theme using the same method as dynamic color picker
            applyColorTheme(themeData);
        } catch (error) {
            console.warn('Failed to parse saved theme, falling back to default');
        }
    } else {
        // Load legacy saved color if it exists
        const savedColor = localStorage.getItem('userColor');
        if (savedColor) {
            console.log('Loading legacy saved color:', savedColor);
            // Convert hex to HSL and apply
            const hsl = hexToHsl(savedColor);
            if (hsl) {
                const legacyTheme = {
                    hue: hsl.h,
                    saturation: hsl.s,
                    lightness: hsl.l,
                    name: 'Imported'
                };
                applyColorTheme(legacyTheme);
            }
        }
    }
}

// Helper function to apply color theme (mirrors dynamic-color-picker logic)
function applyColorTheme(theme) {
    // Set user color variables
    document.documentElement.style.setProperty('--user-primary-h', theme.hue);
    document.documentElement.style.setProperty('--user-primary-s', theme.saturation + '%');
    document.documentElement.style.setProperty('--user-primary-l', theme.lightness + '%');

    // Calculate and set derived colors
    const baseColor = `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`;
    const lighterColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 10, 95)}%)`;
    const darkerColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 10, 5)}%)`;
    const muchDarkerColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`;
    const lightestColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`;
    const evenLighterColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 30, 97)}%)`;
    const paleColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 40, 98)}%)`;

    // Set all primary color variations
    document.documentElement.style.setProperty('--primary-500', baseColor);
    document.documentElement.style.setProperty('--primary-400', lighterColor);
    document.documentElement.style.setProperty('--primary-600', darkerColor);
    document.documentElement.style.setProperty('--primary-700', muchDarkerColor);
    document.documentElement.style.setProperty('--primary-300', lightestColor);
    document.documentElement.style.setProperty('--primary-200', evenLighterColor);
    document.documentElement.style.setProperty('--primary-100', paleColor);

    // Set accent color
    document.documentElement.style.setProperty('--accent-color', baseColor);

    // Override any hardcoded purple references
    document.documentElement.style.setProperty('--welcome-bg-start', baseColor);
    document.documentElement.style.setProperty('--welcome-bg-end', muchDarkerColor);
    document.documentElement.style.setProperty('--button-primary', baseColor);
    document.documentElement.style.setProperty('--link-color', baseColor);

    console.log('Color theme applied:', theme, 'Base color:', baseColor);
}

// Helper function to convert hex to HSL
function hexToHsl(hex) {
    try {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    } catch (error) {
        console.warn('Failed to convert hex to HSL:', hex);
        return null;
    }
}

function detectPreferredTheme() {
    // Check if user has manually set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme; // Use saved preference
    }
    
    // Default to light mode for new users - no more dark mode default
    return 'light';
}

function darkenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(255 * amount);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Theme toggle function - used by header component and settings
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add transition class
    document.body.classList.add('theme-transition');

    // Change theme
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update theme icon in header if it exists
    const header = document.querySelector('app-header');
    if (header && header.updateThemeIcon) {
        header.updateThemeIcon(newTheme);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);

    return newTheme;
}

// Make toggleTheme globally available
window.toggleTheme = toggleTheme;

// Mobile sidebar handling
function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });
}

// Global Search
function initializeSearch() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const searchInput = searchContainer.querySelector('input[type="search"]');
    const searchButton = searchContainer.querySelector('button');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (searchInput && searchInput.value.trim()) {
                handleSearch({ target: searchInput });
            }
        });
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll([
        '.event-title',
        '.project-title',
        '.news-title',
        '.quick-link-text',
        '.spotlight-name',
        '.spotlight-role'
    ].join(','));

    searchableElements.forEach(element => {
        const container = element.closest('.widget, .event-item, .project-item, .news-item, .quick-link');
        const text = element.textContent.toLowerCase();

        if (query === '') {
            container.style.display = '';
            container.style.opacity = '1';
            return;
        }

        if (text.includes(query)) {
            container.style.display = '';
            container.style.opacity = '1';
            highlightText(element, query);
        } else {
            container.style.opacity = '0.5';
        }
    });
}

function highlightText(element, query) {
    const text = element.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    element.innerHTML = text.replace(regex, '<mark>$1</mark>');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Weather updates
async function updateWeather() {
    try {
        const weatherWidget = document.querySelector('weather-widget');
        if (weatherWidget && weatherWidget.updateWeather) {
            await weatherWidget.updateWeather();
        }
    } catch (error) {
        console.error('Weather update failed:', error);
    }
}

// Number animation utility
function animateNumber(start, end, callback, duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(start + (end - start) * progress);
        callback(currentValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Initialize enhanced keyboard shortcuts with accessibility support
 * Includes focus management, screen reader announcements, and mobile-friendly navigation
 * @since v2.0.0 - Contest Enhancement
 */
function initializeKeyboardShortcuts() {
    try {
        // Detect keyboard usage for enhanced focus indicators
        let isUsingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            isUsingKeyboard = true;
            document.body.classList.add('keyboard-user');

            // Command palette toggle - Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const commandPalette = document.querySelector('command-palette');
                if (commandPalette && commandPalette.toggle) {
                    commandPalette.toggle();
                    announceToScreenReader('Command palette toggled');
                }
            }

            // Theme toggle - Ctrl/Cmd + T
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                const newTheme = toggleTheme();
                announceToScreenReader(`Theme changed to ${newTheme} mode`);
            }

            // Help dialog - F1 or Shift + ?
            if (e.key === 'F1' || (e.shiftKey && e.key === '?')) {
                e.preventDefault();
                const helpDialog = document.querySelector('help-dialog');
                if (helpDialog && helpDialog.toggle) {
                    helpDialog.toggle();
                    announceToScreenReader('Help dialog opened');
                }
            }

            // AI Assistant - Ctrl/Cmd + /
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const aiAssistant = document.querySelector('ai-assistant');
                if (aiAssistant && aiAssistant.toggle) {
                    aiAssistant.toggle();
                    announceToScreenReader('AI Assistant toggled');
                }
            }

            // Escape key - close open dialogs and panels
            if (e.key === 'Escape') {
                const openPanels = document.querySelectorAll('.ai-assistant.open, .command-palette.active, .help-dialog.open');
                if (openPanels.length > 0) {
                    openPanels.forEach(panel => {
                        if (panel.classList.contains('open')) panel.classList.remove('open');
                        if (panel.classList.contains('active')) panel.classList.remove('active');
                    });
                    announceToScreenReader('Panel closed');
                }
            }

            // Focus management - Tab navigation enhancement
            if (e.key === 'Tab') {
                // Ensure visible focus indicators
                document.body.classList.add('keyboard-user');
            }
        });

        // Remove keyboard user class on mouse usage
        document.addEventListener('mousedown', () => {
            isUsingKeyboard = false;
            document.body.classList.remove('keyboard-user');
        });

        // Re-add on focus to handle tab navigation
        document.addEventListener('focusin', () => {
            if (isUsingKeyboard) {
                document.body.classList.add('keyboard-user');
            }
        });

    } catch (error) {
        console.error('Error initializing keyboard shortcuts:', error);
    }
}

/**
 * Announce messages to screen readers for accessibility
 * Creates a temporary live region to communicate dynamic changes
 * @param {string} message - The message to announce to screen readers
 * @since v2.0.0 - Contest Enhancement
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Force sidebar to have white background in light mode
function forceSidebarLightMode() {
    console.log('🚨 Emergency sidebar background fix running...');

    function applySidebarFix() {
        const sidebar = document.querySelector('.sidebar');
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        if (sidebar && !isDarkMode) {
            console.log('🔧 Forcing sidebar background to white');

            // Remove any existing background styles
            sidebar.style.removeProperty('background');
            sidebar.style.removeProperty('background-color');
            sidebar.style.removeProperty('background-image');

            // Force white background
            sidebar.style.setProperty('background', '#ffffff', 'important');
            sidebar.style.setProperty('background-color', '#ffffff', 'important');
            sidebar.style.setProperty('background-image', 'none', 'important');

            // Set CSS custom properties
            sidebar.style.setProperty('--bg-elevated', '#ffffff', 'important');
            sidebar.style.setProperty('--sidebar-bg', '#ffffff', 'important');
        }
    }

    // Apply immediately
    applySidebarFix();

    // Apply after a short delay to catch dynamic updates
    setTimeout(applySidebarFix, 100);
    setTimeout(applySidebarFix, 500);

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                setTimeout(applySidebarFix, 50);
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Also watch for sidebar element changes
    const sidebarObserver = new MutationObserver(() => {
        setTimeout(applySidebarFix, 50);
    });

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebarObserver.observe(sidebar, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }

    console.log('✅ Sidebar background fix initialized');
}

// Force light theme and fix white backgrounds
function forceLightThemeAndFixBackgrounds() {
    console.log('🚨 Force light theme and fix white backgrounds...');
    
    // Force light theme
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    
    // Remove white backgrounds from all insight elements
    function removeWhiteBackgrounds() {
        const insightElements = document.querySelectorAll('*[class*="insight"]');
        insightElements.forEach(element => {
            element.style.setProperty('background', 'transparent', 'important');
            element.style.setProperty('background-color', 'transparent', 'important');
        });
        
        // Also fix any elements with white backgrounds
        const whiteBackgroundElements = document.querySelectorAll('*[style*="background: white"], *[style*="background-color: white"]');
        whiteBackgroundElements.forEach(element => {
            element.style.setProperty('background', 'transparent', 'important');
            element.style.setProperty('background-color', 'transparent', 'important');
        });
    }
    
    // Apply fixes immediately and after delays
    removeWhiteBackgrounds();
    setTimeout(removeWhiteBackgrounds, 100);
    setTimeout(removeWhiteBackgrounds, 500);
    setTimeout(removeWhiteBackgrounds, 1000);
    
    console.log('✅ Light theme forced and white backgrounds removed');
}