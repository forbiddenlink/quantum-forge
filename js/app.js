// Theme and Navigation Management
let welcomeSection = null; // Store welcome section instance for cleanup
let performanceMonitor = null;
let analyticsServiceInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Quantum Forge - Loading...');
    
    // Simple initialization without complex timing
    initializeTheme();
    initializeSidebar();
    initializeKeyboardShortcuts();
    
    // Initialize performance monitoring
    if (window.PerformanceMonitor) {
        performanceMonitor = new window.PerformanceMonitor();
        performanceMonitor.startMonitoring();
        console.log('Performance monitoring started');
    }
    
    // Initialize welcome section if it exists
    const welcomeElement = document.querySelector('.welcome-section');
    if (welcomeElement) {
        welcomeSection = new WelcomeSection();
        console.log('Welcome section initialized');
    }
    
    // Initialize analytics service if available
    if (window.analyticsService) {
        console.log('Starting analytics service...');
        analyticsServiceInstance = window.analyticsService;
        analyticsServiceInstance.startRealTimeUpdates();
        analyticsServiceInstance.generateMockData();
    }
    
    console.log('✅ Quantum Forge - Ready!');
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

// Simple loading screen management
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
        }, 300);
    }
}, 500);

// Enhanced Theme Management with Dynamic Workspace Themes
function initializeTheme() {
    const theme = localStorage.getItem('theme') || detectPreferredTheme();
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    
    // Load saved user color
    const savedColor = localStorage.getItem('userColor');
    if (savedColor) {
        console.log('Applying saved color theme:', savedColor);
        document.documentElement.style.setProperty('--primary-500', savedColor);
        document.documentElement.style.setProperty('--primary-600', darkenColor(savedColor, 0.1));
        document.documentElement.style.setProperty('--primary-700', darkenColor(savedColor, 0.2));
        // Also set these commonly used variables
        document.documentElement.style.setProperty('--primary-color', savedColor);
        document.documentElement.style.setProperty('--accent-color', savedColor);
    }
}

function detectPreferredTheme() {
    // Auto-detect based on system preference and time of day
    const hour = new Date().getHours();
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (systemDark || hour < 7 || hour > 19) {
        return 'dark';
    }
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