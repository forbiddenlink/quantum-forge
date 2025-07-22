// Theme and Navigation Management
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Quantum Forge - Performance Optimized!');
    
    // Performance monitoring
    performance.mark('app-init-start');
    
    // Initialize core features first
    initializeTheme();
    initializeSidebar();
    initializeKeyboardShortcuts();
    
    // Initialize components with performance optimization
    initializeComponentsWithDelay();
    
    // Performance monitoring
    performance.mark('app-init-end');
    performance.measure('app-initialization', 'app-init-start', 'app-init-end');
    
    // Check if components are loaded with better timing
    setTimeout(() => {
        console.log('✅ Component Status:');
        console.log('📊 Analytics Dashboard:', document.querySelector('analytics-dashboard'));
        console.log('👥 Team Spotlight:', document.querySelector('team-spotlight'));
        console.log('📋 Task System:', document.querySelector('task-system'));
        console.log('🌤️ Weather Widget:', document.querySelector('weather-widget'));
        console.log('🎯 Smart Quick Access:', document.querySelector('smart-quick-access'));
        console.log('🏢 Company Culture:', document.querySelector('company-culture-showcase'));
        console.log('📊 Enhanced Polls:', document.querySelector('enhanced-interactive-poll'));
        
        // Performance summary
        const initTime = performance.getEntriesByName('app-initialization')[0];
        console.log(`⚡ App initialized in ${initTime.duration.toFixed(2)}ms`);
    }, 1000); // Reduced from 2000ms to 1000ms
});

// NEW: Optimized component initialization with staggered loading
function initializeComponentsWithDelay() {
    // Core components first - reduced delay
    setTimeout(() => {
        try {
            initializeTaskSystem();
            initializeNotifications();
            initializeUserProfile();
            
            // Initialize company news component
            const companyNews = document.querySelector('company-news');
            if (companyNews) {
                console.log('Initializing company news component...');
                // Remove loading placeholder
                const loadingPlaceholder = companyNews.querySelector('.loading-placeholder');
                if (loadingPlaceholder) {
                    loadingPlaceholder.remove();
                }
                // Force a re-render of the component
                if (companyNews.connectedCallback) {
                    companyNews.connectedCallback();
                } else {
                    console.error('Company news component missing connectedCallback method');
                }
            } else {
                console.warn('Company news component not found in DOM');
            }
        } catch (error) {
            console.warn('Core component initialization error:', error);
        }
    }, 50); // Reduced from 100ms
    
    // Secondary components with delay - reduced delay
    setTimeout(() => {
        try {
            initializeWidgetActions();
            initializePersonalization();
        } catch (error) {
            console.warn('Secondary component initialization error:', error);
        }
    }, 150); // Reduced from 300ms
    
    // Contest features last - reduced delay
    setTimeout(() => {
        try {
            initializeContestFeatures();
        } catch (error) {
            console.warn('Contest features initialization error:', error);
        }
    }, 250); // Reduced from 500ms
}

// NEW: Contest-specific features initialization with performance optimization
function initializeContestFeatures() {
    // Add contest-specific animations with throttling
    addContestAnimations();
    
    // Initialize performance monitoring
    initializePerformanceMonitoring();
    
    // Add accessibility enhancements
    enhanceAccessibility();
    
    // Initialize real-time features with reduced frequency
    initializeRealTimeFeatures();
}

function addContestAnimations() {
    // Use Intersection Observer for better performance
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    // Unobserve after animation to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '50px' });

        // Observe contest components
        const contestComponents = document.querySelectorAll('.company-culture-showcase, .enhanced-interactive-poll');
        contestComponents.forEach(component => observer.observe(component));
    }
}

function initializePerformanceMonitoring() {
    // Monitor Core Web Vitals with throttling
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (entry.name === 'LCP') {
                    console.log(`🎯 Largest Contentful Paint: ${entry.startTime.toFixed(2)}ms`);
                }
                if (entry.name === 'FID') {
                    console.log(`⚡ First Input Delay: ${entry.processingStart - entry.startTime}ms`);
                }
                if (entry.name === 'CLS') {
                    console.log(`📐 Cumulative Layout Shift: ${entry.value}`);
                }
            });
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
}

function enhanceAccessibility() {
    // Add skip links for better navigation
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('focus', () => {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('blur', () => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-100%)';
        });
    });
    
    // Announce dynamic content changes with throttling
    if ('MutationObserver' in window) {
        const observer = new MutationObserver(debounce((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const newContent = mutation.addedNodes[0];
                    if (newContent.nodeType === Node.ELEMENT_NODE) {
                        announceToScreenReader('New content loaded');
                    }
                }
            });
        }, 100)); // Debounce to reduce frequency
        
        observer.observe(document.body, { childList: true, subtree: true });
    }
}

function initializeRealTimeFeatures() {
    // Initialize real-time updates with reduced frequency and throttling
    let updateCounter = 0;
    const updateInterval = setInterval(() => {
        updateCounter++;
        
        // Only update every 3rd interval (15 seconds instead of 5)
        if (updateCounter % 3 === 0) {
            updateLiveStats();
            simulateRealTimeActivity();
        }
        
        // Stop updates after 10 minutes to save resources
        if (updateCounter >= 40) {
            clearInterval(updateInterval);
            console.log('Real-time updates stopped to save resources');
        }
    }, 5000); // Keep 5-second interval but reduce actual updates
}

function updateLiveStats() {
    const statElements = document.querySelectorAll('.stat-number');
    statElements.forEach(element => {
        const currentValue = parseInt(element.textContent);
        const newValue = currentValue + Math.floor(Math.random() * 3); // Reduced change amount
        animateNumberChange(element, currentValue, newValue);
    });
}

function simulateRealTimeActivity() {
    // Add random activity to feeds with reduced frequency
    const activityFeeds = document.querySelectorAll('.activity-feed, .activity-stream');
    activityFeeds.forEach(feed => {
        if (Math.random() > 0.8) { // Reduced probability
            const activities = [
                'New task completed',
                'Document updated',
                'Meeting scheduled',
                'Project milestone reached',
                'Team member joined'
            ];
            
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            addActivityItem(feed, randomActivity);
        }
    });
}

function addActivityItem(feed, activity) {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <div class="activity-avatar">👤</div>
        <div class="activity-content">
            <p>${activity}</p>
            <span class="activity-time">Just now</span>
        </div>
    `;
    
    feed.insertBefore(activityItem, feed.firstChild);
    
    // Remove old items if too many
    const items = feed.querySelectorAll('.activity-item');
    if (items.length > 3) { // Reduced from 5 to 3
        items[items.length - 1].remove();
    }
    
    // Animate in
    activityItem.style.animation = 'slideInRight 0.3s ease-out';
}

function animateNumberChange(element, start, end) {
    const duration = 800; // Reduced from 1000ms
    const startTime = performance.now();
    
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
}

// Theme management
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
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

// Widget initialization
function initializeWidgets() {
    // Initialize all widgets
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach(widget => {
        // Add hover effects
        widget.addEventListener('mouseenter', () => {
            widget.style.transform = 'translateY(-4px)';
        });
        
        widget.addEventListener('mouseleave', () => {
            widget.style.transform = 'translateY(0)';
        });
    });
}

// Task system initialization
function initializeTaskSystem() {
    const taskSystem = document.querySelector('task-system');
    if (taskSystem) {
        // Task system is handled by its own component
        console.log('Task system component found');
    }
}

// Notifications initialization
function initializeNotifications() {
    // Notifications are handled by the header component
    console.log('Notifications system initialized');
}

// User profile initialization
function initializeUserProfile() {
    // User profile functionality is handled by components
    console.log('User profile system initialized');
}

// Widget actions initialization
function initializeWidgetActions() {
    // Widget actions are handled by individual components
    console.log('Widget actions initialized');
}

// Personalization initialization
function initializePersonalization() {
    // Personalization features are handled by components
    console.log('Personalization system initialized');
}

// Keyboard shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Command palette toggle
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const commandPalette = document.querySelector('command-palette');
            if (commandPalette && commandPalette.toggle) {
                commandPalette.toggle();
            }
        }
        
        // Theme toggle
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// Screen reader announcements
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

// Force white text in Today's Insights section

// NUCLEAR OPTION - Force white hover effects for Today's Insights
function forceWhiteHoverEffects() {
    const insightsIcon = document.querySelector('.quick-insights .insights-title .custom-insights-icon');
    if (insightsIcon) {
        // Add event listeners to force white hover
        insightsIcon.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            this.style.color = 'white';
            this.style.stroke = 'white';
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 2px 8px rgba(255, 255, 255, 0.2)';
            
            const path = this.querySelector('path');
            if (path) {
                path.style.color = 'white';
                path.style.stroke = 'white';
                path.style.fill = 'none';
            }
        });
        
        insightsIcon.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.color = 'white';
            this.style.stroke = 'white';
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const path = this.querySelector('path');
            if (path) {
                path.style.color = 'white';
                path.style.stroke = 'white';
                path.style.fill = 'none';
            }
        });
    }
}

// FORCE CALENDAR ICON POSITIONING
function fixCalendarIconPosition() {
    const calendarIcon = document.querySelector('.upcoming-events-title .calendar-icon-container');
    const title = document.querySelector('.upcoming-events-title');
    
    if (calendarIcon && title) {
        // Force the title to be flex
        title.style.display = 'flex';
        title.style.alignItems = 'center';
        title.style.gap = '12px';
        title.style.flexDirection = 'row';
        title.style.justifyContent = 'flex-start';
        
        // Force the icon container positioning
        calendarIcon.style.display = 'inline-flex';
        calendarIcon.style.alignItems = 'center';
        calendarIcon.style.justifyContent = 'center';
        calendarIcon.style.width = '24px';
        calendarIcon.style.height = '24px';
        calendarIcon.style.background = 'rgba(255, 255, 255, 0.1)';
        calendarIcon.style.borderRadius = '6px';
        calendarIcon.style.padding = '6px';
        calendarIcon.style.marginRight = '12px';
        calendarIcon.style.flexShrink = '0';
        calendarIcon.style.boxSizing = 'border-box';
        calendarIcon.style.position = 'relative';
        calendarIcon.style.verticalAlign = 'middle';
        calendarIcon.style.alignSelf = 'center';
        calendarIcon.style.float = 'none';
        calendarIcon.style.clear = 'none';
        calendarIcon.style.top = 'auto';
        calendarIcon.style.left = 'auto';
        calendarIcon.style.bottom = 'auto';
        calendarIcon.style.right = 'auto';
        calendarIcon.style.transform = 'none';
        
        // Force the SVG positioning
        const svg = calendarIcon.querySelector('.custom-insights-icon');
        if (svg) {
            svg.style.width = '12px';
            svg.style.height = '12px';
            svg.style.color = 'white';
            svg.style.stroke = 'white';
            svg.style.fill = 'none';
            svg.style.display = 'block';
            svg.style.position = 'relative';
            svg.style.top = 'auto';
            svg.style.left = 'auto';
            svg.style.bottom = 'auto';
            svg.style.right = 'auto';
            svg.style.transform = 'none';
            svg.style.verticalAlign = 'middle';
            svg.style.margin = '0';
            svg.style.padding = '0';
            svg.style.float = 'none';
            svg.style.clear = 'none';
            svg.style.background = 'none';
            svg.style.borderRadius = '0';
        }
    }
}

// FORCE ICON SIZING AND POSITIONING
function fixCalendarIcon() {
    const calendarIcon = document.querySelector('.upcoming-events-title .custom-insights-icon');
    if (calendarIcon) {
        // Make it exactly like the "Today's Insights" icon
        calendarIcon.style.display = 'inline-block';
        calendarIcon.style.verticalAlign = 'middle';
    }
}

// Call the function when the DOM is ready
document.addEventListener('DOMContentLoaded', forceWhiteHoverEffects);
function forceWhiteTextInInsights() {
    const insightsSection = document.querySelector('.quick-insights');
    if (insightsSection) {
        const textElements = insightsSection.querySelectorAll('h4, p, span, div, strong, em, b, i');
        textElements.forEach(element => {
            if (element.tagName !== 'svg' && !element.closest('svg')) {
                element.style.color = 'white';
                element.style.setProperty('color', 'white', 'important');
            }
        });
        
        // Also force CSS variables
        insightsSection.style.setProperty('--text-primary', 'white', 'important');
        insightsSection.style.setProperty('--text-secondary', 'white', 'important');
        insightsSection.style.setProperty('--text-tertiary', 'white', 'important');
        insightsSection.style.setProperty('--text-muted', 'white', 'important');
    }
}

// Run the function after DOM is loaded and periodically
document.addEventListener('DOMContentLoaded', () => {
    forceWhiteTextInInsights();
    
    // Run periodically to catch any dynamic changes
    setInterval(forceWhiteTextInInsights, 1000);
    
    // Fix calendar icon positioning
    fixCalendarIconPosition();
    
    // Also run it after a short delay to ensure all styles are loaded
    setTimeout(fixCalendarIconPosition, 100);
    setTimeout(fixCalendarIconPosition, 500);
    setTimeout(fixCalendarIconPosition, 1000);
});

// Also run when the page is fully loaded
window.addEventListener('load', forceWhiteTextInInsights);

// Run when page loads
document.addEventListener('DOMContentLoaded', fixCalendarIcon);
window.addEventListener('load', fixCalendarIcon);