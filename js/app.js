// Theme and Navigation Management
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing components...');
    initializeTheme();
    initializeSidebar();
    initializeTaskSystem();
    initializeNotifications();
    initializeUserProfile();
    initializeWidgetActions();
    initializePersonalization(); // Add personalization initialization
    
    // Theme toggle functionality - handled by header component

    // Initialize keyboard shortcuts
    initializeKeyboardShortcuts();
    
    // Check if components are loaded
    setTimeout(() => {
        console.log('Checking component status...');
        console.log('Analytics Dashboard:', document.querySelector('analytics-dashboard'));
        console.log('Team Spotlight:', document.querySelector('team-spotlight'));
        console.log('Task System:', document.querySelector('task-system'));
        console.log('Weather Widget:', document.querySelector('weather-widget'));
        console.log('Smart Quick Access:', document.querySelector('smart-quick-access'));
    }, 1000);
});

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

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            // Implement search functionality
            console.log('Search:', searchInput.value);
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                // Implement search functionality
                console.log('Search:', searchInput.value);
            }
        });
    }
}

// Weather widget with animated icons
async function updateWeather() {
    try {
        // This is a mock weather data - in a real app, you'd fetch from a weather API
        const mockWeatherData = {
            temp: Math.floor(Math.random() * (85 - 65) + 65),
            conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * (80 - 50) + 50),
            wind: Math.floor(Math.random() * (15 - 5) + 5),
            rain: Math.floor(Math.random() * 30)
        };

        // Update weather widget with animation
        const tempElement = document.querySelector('.weather-temp');
        const oldTemp = parseInt(tempElement.textContent);
        const newTemp = mockWeatherData.temp;
        
        // Animate temperature change
        animateNumber(oldTemp, newTemp, (value) => {
            tempElement.textContent = `${Math.round(value)}°`;
        }, 1000);

        document.querySelector('.weather-desc').textContent = mockWeatherData.conditions;
        
        // Animate weather details
        animateNumber(
            parseInt(document.querySelector('.weather-detail:nth-child(1) .weather-detail-value').textContent),
            mockWeatherData.humidity,
            (value) => {
                document.querySelector('.weather-detail:nth-child(1) .weather-detail-value').textContent = `${Math.round(value)}%`;
            },
            1000
        );

        animateNumber(
            parseInt(document.querySelector('.weather-detail:nth-child(2) .weather-detail-value').textContent),
            mockWeatherData.wind,
            (value) => {
                document.querySelector('.weather-detail:nth-child(2) .weather-detail-value').textContent = `${Math.round(value)} mph`;
            },
            1000
        );

        animateNumber(
            parseInt(document.querySelector('.weather-detail:nth-child(3) .weather-detail-value').textContent),
            mockWeatherData.rain,
            (value) => {
                document.querySelector('.weather-detail:nth-child(3) .weather-detail-value').textContent = `${Math.round(value)}%`;
            },
            1000
        );
    } catch (error) {
        console.error('Error updating weather:', error);
    }
}

// Smooth number animation helper
function animateNumber(start, end, callback, duration = 1000) {
    const startTime = performance.now();
    const change = end - start;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuad = progress * (2 - progress);
        const current = start + (change * easeOutQuad);

        callback(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// Widget Interactions
function initializeWidgets() {
    // Add hover effect to event items
    const eventItems = document.querySelectorAll('.event-item');
    eventItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px) translateY(-2px)';
            item.style.transition = 'all 0.3s var(--ease-bounce)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0) translateY(0)';
        });
    });

    // Add ripple effect to quick links
    const quickLinks = document.querySelectorAll('.quick-link');
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const rect = link.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            link.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        });
    });

    // Update relative times in announcements
    const announcementMetas = document.querySelectorAll('.announcement-meta');
    announcementMetas.forEach(meta => {
        const date = new Date(meta.textContent);
        const timeAgo = getRelativeTimeString(date);
        meta.textContent = timeAgo;
    });

    // Initialize intersection observer for fade-in animations
    const fadeElements = document.querySelectorAll('.widget');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        fadeObserver.observe(element);
    });
}

// Enhanced mobile sidebar handling
function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function toggleSidebar() {
        const isVisible = sidebar.classList.contains('sidebar-visible');
        sidebar.classList.toggle('sidebar-visible');
        menuToggle.setAttribute('aria-expanded', !isVisible);
        
        if (!isVisible) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
            document.body.style.overflow = 'hidden';
        } else {
            overlay.style.opacity = '0';
            overlay.style.visibility = 'hidden';
            document.body.style.overflow = '';
        }
    }

    menuToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('sidebar-visible')) {
            toggleSidebar();
        }
    });
}

// Helper function for relative time
function getRelativeTimeString(date) {
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return date.toLocaleDateString();
}

// Global Search
function initializeSearch() {
    const searchInput = document.getElementById('globalSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', debounce(handleSearch, 300));
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

// KPI Animations
function initializeKPIs() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    kpiValues.forEach(kpi => {
        const value = kpi.textContent;
        if (value.includes('$')) {
            const number = parseFloat(value.replace(/[$,]/g, ''));
            animateNumber(0, number, (val) => {
                kpi.textContent = `$${val.toFixed(1)}M`;
            }, 2000);
        } else if (value.includes('/')) {
            const [num, den] = value.split('/');
            animateNumber(0, parseFloat(num), (val) => {
                kpi.textContent = `${val.toFixed(1)}/${den}`;
            }, 2000);
        } else {
            const number = parseFloat(value);
            animateNumber(0, number, (val) => {
                kpi.textContent = `${val.toFixed(0)}%`;
            }, 2000);
        }
    });
}

// Project Progress Animations
function initializeProjects() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const progress = parseFloat(progressBar.style.getPropertyValue('--progress'));
        
        progressBar.style.setProperty('--progress', '0%');
        setTimeout(() => {
            progressBar.style.setProperty('--progress', `${progress}%`);
        }, 100);

        // Add hover effect
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px)';
            item.style.transition = 'transform 0.3s var(--ease-bounce)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
}

// News Feed Interactions
function initializeNews() {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px)';
            item.style.transition = 'all 0.3s var(--ease-bounce)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
        });
    });

    // Update relative times
    const newsDates = document.querySelectorAll('.news-date');
    newsDates.forEach(date => {
        const timeAgo = getRelativeTimeString(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000));
        date.textContent = timeAgo;
    });
}

// Enhanced Weather Widget
function updateWeather() {
    try {
        // Check if weather widget exists first
        const tempElement = document.querySelector('.weather-temp');
        if (!tempElement) return; // Exit if weather widget is not present

        // Mock weather data with forecast
        const mockWeatherData = {
            current: {
                temp: Math.floor(Math.random() * (85 - 65) + 65),
                conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
                humidity: Math.floor(Math.random() * (80 - 50) + 50),
                wind: Math.floor(Math.random() * (15 - 5) + 5),
                rain: Math.floor(Math.random() * 30)
            },
            forecast: [
                { day: 'Tue', temp: Math.floor(Math.random() * (85 - 65) + 65) },
                { day: 'Wed', temp: Math.floor(Math.random() * (85 - 65) + 65) },
                { day: 'Thu', temp: Math.floor(Math.random() * (85 - 65) + 65) }
            ]
        };

        // Update current weather
        const oldTemp = parseInt(tempElement.textContent);
        const newTemp = mockWeatherData.current.temp;
        
        animateNumber(oldTemp, newTemp, (value) => {
            tempElement.textContent = `${Math.round(value)}°`;
        }, 1000);

        const weatherDesc = document.querySelector('.weather-desc');
        if (weatherDesc) {
            weatherDesc.textContent = mockWeatherData.current.conditions;
        }
        
        // Update weather details
        const detailElements = document.querySelectorAll('.weather-detail .weather-detail-value');
        if (detailElements.length >= 3) {
            animateNumber(
                parseInt(detailElements[0].textContent),
                mockWeatherData.current.humidity,
                (value) => {
                    detailElements[0].textContent = `${Math.round(value)}%`;
                },
                1000
            );

            animateNumber(
                parseInt(detailElements[1].textContent),
                mockWeatherData.current.wind,
                (value) => {
                    detailElements[1].textContent = `${Math.round(value)} mph`;
                },
                1000
            );

            animateNumber(
                parseInt(detailElements[2].textContent),
                mockWeatherData.current.rain,
                (value) => {
                    detailElements[2].textContent = `${Math.round(value)}%`;
                },
                1000
            );
        }

        // Update forecast
        const forecastItems = document.querySelectorAll('.forecast-item');
        forecastItems.forEach((item, index) => {
            const forecast = mockWeatherData.forecast[index];
            const tempElement = item.querySelector('.forecast-temp');
            if (tempElement) {
                const oldTemp = parseInt(tempElement.textContent);
                animateNumber(oldTemp, forecast.temp, (value) => {
                    tempElement.textContent = `${Math.round(value)}°`;
                }, 1000);
            }
        });
    } catch (error) {
        console.error('Error updating weather:', error);
    }
}

// Task Management
function initializeTaskManagement() {
    const taskList = document.querySelector('.task-list');
    const addTaskBtn = document.querySelector('.add-task-btn');
    const taskForm = document.querySelector('.task-form');
    const cancelTaskBtn = document.getElementById('cancelTask');
    
    if (!taskList || !addTaskBtn || !taskForm) return;

    // Handle task completion
    taskList.addEventListener('change', (e) => {
        if (e.target.matches('.task-checkbox')) {
            const taskItem = e.target.closest('.task-item');
            const taskDue = taskItem.querySelector('.task-due');
            
            if (e.target.checked) {
                taskDue.textContent = 'Completed';
                taskItem.style.opacity = '0.7';
            } else {
                const originalDue = taskItem.dataset.originalDue || 'Due today';
                taskDue.textContent = originalDue;
                taskItem.style.opacity = '1';
            }
        }
    });

    // Clear task form
    function clearTaskForm() {
        const inputs = taskForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });
    }

    // Show/hide form
    function toggleTaskForm(show = true) {
        taskForm.style.display = show ? 'block' : 'none';
        if (!show) {
            clearTaskForm();
        }
    }

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        clearTaskForm();
        toggleTaskForm(true);
    });

    // Cancel task
    cancelTaskBtn.addEventListener('click', () => {
        toggleTaskForm(false);
    });
}

// Celebrations
function initializeCelebrations() {
    const wishButtons = document.querySelectorAll('.send-wishes-btn');
    
    wishButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const celebrationItem = e.target.closest('.celebration-item');
            const name = celebrationItem.querySelector('.celebration-name').textContent;
            
            // Animate button
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = '', 150);
            
            // Change button text temporarily
            const originalText = button.textContent;
            button.textContent = '✨ Sent!';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);
        });
    });
}

// Poll Widget
function initializePolls() {
    const pollOptions = document.querySelectorAll('.poll-option input[type="radio"]');
    
    pollOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const pollOption = e.target.closest('.poll-option');
            const progress = pollOption.querySelector('.poll-progress');
            const percentage = pollOption.querySelector('.poll-percentage');
            const currentProgress = parseFloat(progress.style.getPropertyValue('--progress'));
            
            // Animate selection
            progress.style.setProperty('--progress', '0%');
            setTimeout(() => {
                progress.style.setProperty('--progress', `${currentProgress + 5}%`);
                percentage.textContent = `${Math.round(currentProgress + 5)}%`;
            }, 50);

            // Update total votes
            const pollMeta = document.querySelector('.poll-total');
            const currentVotes = parseInt(pollMeta.textContent);
            pollMeta.textContent = `${currentVotes + 1} votes`;
        });
    });
}

// Document Interactions
function initializeDocuments() {
    const documentItems = document.querySelectorAll('.document-item');
    
    documentItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(8px)';
            const icon = item.querySelector('.document-icon');
            icon.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
            const icon = item.querySelector('.document-icon');
            icon.style.transform = '';
        });

        // Update relative times
        const meta = item.querySelector('.document-meta');
        const timeText = meta.textContent.split('•')[1].trim();
        const newTime = getRelativeTimeString(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000));
        meta.textContent = meta.textContent.replace(timeText, ` • ${newTime}`);
    });
}

// Advanced Data Visualization
function createBarChart(data, container) {
    const chart = document.createElement('div');
    chart.className = 'bar-chart';
    
    const maxValue = Math.max(...Object.values(data));
    
    Object.entries(data).forEach(([label, value]) => {
        const bar = document.createElement('div');
        bar.className = 'bar-container';
        
        const barFill = document.createElement('div');
        barFill.className = 'bar-fill';
        barFill.style.setProperty('--percentage', `${(value / maxValue) * 100}%`);
        
        const barLabel = document.createElement('span');
        barLabel.className = 'bar-label';
        barLabel.textContent = label;
        
        const barValue = document.createElement('span');
        barValue.className = 'bar-value';
        barValue.textContent = value;
        
        bar.appendChild(barLabel);
        bar.appendChild(barFill);
        bar.appendChild(barValue);
        chart.appendChild(bar);
    });
    
    container.appendChild(chart);
}

// Enhanced KPI Animations
function initializeEnhancedKPIs() {
    const kpiItems = document.querySelectorAll('.kpi-item');
    
    kpiItems.forEach(item => {
        const progressBar = item.querySelector('.progress-bar');
        const progressText = item.querySelector('.progress-text');
        const targetProgress = parseFloat(progressBar.style.getPropertyValue('--progress'));
        
        // Animate progress bar on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgress(progressBar, progressText, targetProgress);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

function animateProgress(bar, text, target) {
    let current = 0;
    const duration = 1500;
    const start = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        current = target * easeOutQuart;
        
        bar.style.setProperty('--progress', `${current}%`);
        text.textContent = `${Math.round(current)}%`;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Enhanced Search with Fuzzy Matching
function fuzzySearch(query, text) {
    const pattern = query.split('').map(char => `${char}.*`).join('');
    const regex = new RegExp(pattern, 'i');
    return regex.test(text);
}

function handleEnhancedSearch(event) {
    const query = event.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll([
        '.event-title',
        '.project-title',
        '.news-title',
        '.quick-link-text',
        '.spotlight-name',
        '.spotlight-role'
    ].join(','));
    
    if (query === '') {
        searchableElements.forEach(element => {
            const container = element.closest('.widget, .event-item, .project-item, .news-item, .quick-link');
            container.style.display = '';
            container.style.opacity = '1';
            element.innerHTML = element.textContent; // Remove any highlighting
        });
        return;
    }
    
    searchableElements.forEach(element => {
        const container = element.closest('.widget, .event-item, .project-item, .news-item, .quick-link');
        const text = element.textContent;
        
        if (fuzzySearch(query, text)) {
            container.style.display = '';
            container.style.opacity = '1';
            highlightMatches(element, text, query);
        } else {
            container.style.opacity = '0.5';
        }
    });
}

function highlightMatches(element, text, query) {
    const regex = new RegExp(`(${query.split('').join('.*')})`, 'gi');
    element.innerHTML = text.replace(regex, '<mark>$1</mark>');
}

// Enhanced Drag and Drop for Tasks
function initializeDragAndDrop() {
    const draggables = document.querySelectorAll('.task-item');
    const containers = document.querySelectorAll('.task-list');
    
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            saveTaskOrder();
        });
    });
    
    containers.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const afterElement = getDragAfterElement(container, e.clientY);
            const draggable = document.querySelector('.dragging');
            
            if (afterElement == null) {
                container.appendChild(draggable);
            } else {
                container.insertBefore(draggable, afterElement);
            }
        });
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function saveTaskOrder() {
    const taskLists = document.querySelectorAll('.task-list');
    const taskOrder = {};
    
    taskLists.forEach(list => {
        const listId = list.id;
        taskOrder[listId] = Array.from(list.children).map(task => task.dataset.taskId);
    });
    
    localStorage.setItem('taskOrder', JSON.stringify(taskOrder));
}

// Keyboard Navigation and Shortcuts
function initializeKeyboardNavigation() {
    // Detect keyboard users
    document.addEventListener('keydown', function(e) {
        document.body.classList.add('keyboard-user');
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Global keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Only handle if not in input/textarea
        if (e.target.matches('input, textarea')) return;
        
        switch(e.key.toLowerCase()) {
            case '/':
                // Focus search
                e.preventDefault();
                document.getElementById('globalSearch')?.focus();
                break;
            
            case 'escape':
                // Clear search or close modals
                const search = document.getElementById('globalSearch');
                if (search && search === document.activeElement) {
                    search.value = '';
                    search.blur();
                    handleEnhancedSearch({ target: search });
                }
                break;
            
            case 'm':
                // Toggle menu if Ctrl/Cmd + M
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    document.getElementById('menu-toggle')?.click();
                }
                break;
            
            case 't':
                // Toggle theme if Ctrl/Cmd + T
                if (e.ctrlKey || e.metaKey) {
                    e.preventDefault();
                    document.getElementById('theme-toggle')?.click();
                }
                break;
        }
    });
    
    // Arrow key navigation for task lists
    const taskLists = document.querySelectorAll('.task-list');
    taskLists.forEach(list => {
        list.addEventListener('keydown', function(e) {
            if (!e.target.matches('.task-item')) return;
            
            const items = Array.from(list.querySelectorAll('.task-item'));
            const currentIndex = items.indexOf(e.target);
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = currentIndex - 1;
                    if (nextIndex >= 0) {
                        items[nextIndex].focus();
                    }
                    break;
                
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = currentIndex + 1;
                    if (nextIndex < items.length) {
                        items[nextIndex].focus();
                    }
                    break;
                
                case 'Space':
                    e.preventDefault();
                    const checkbox = e.target.querySelector('input[type="checkbox"]');
                    if (checkbox) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                    break;
            }
        });
    });
}

// Enhanced Task Management
function initializeEnhancedTasks() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(task => {
        // Make tasks focusable
        task.setAttribute('tabindex', '0');
        task.setAttribute('role', 'listitem');
        
        // Add keyboard support for checkboxes
        const checkbox = task.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                task.classList.toggle('completed', checkbox.checked);
                
                // Animate completion
                if (checkbox.checked) {
                    task.style.transform = 'translateX(10px)';
                    setTimeout(() => {
                        task.style.transform = '';
                    }, 300);
                }
            });
        }
        
        // Add completion animation
        task.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform') {
                const checkbox = task.querySelector('input[type="checkbox"]');
                if (checkbox?.checked) {
                    task.style.opacity = '0.7';
                }
            }
        });
    });
}

// Command Palette
function initializeCommandPalette() {
    const commandPalette = document.getElementById('command-palette');
    if (!commandPalette) return;
    
    const commandInput = document.getElementById('command-input');
    const resultsContainer = document.querySelector('.command-palette-results');
    
    if (!commandInput || !resultsContainer) return;
    
    // Command categories and items
    const commands = [
        {
            category: 'Navigation',
            items: [
                { title: 'Go to Dashboard', shortcut: ['G', 'H'], action: () => window.location.href = '/index.html' },
                { title: 'Go to Calendar', shortcut: ['G', 'C'], action: () => window.location.href = '/pages/calendar.html' },
                { title: 'Go to Team', shortcut: ['G', 'T'], action: () => window.location.href = '/pages/team.html' },
                { title: 'Go to Documents', shortcut: ['G', 'D'], action: () => window.location.href = '/pages/documents.html' }
            ]
        },
        {
            category: 'Actions',
            items: [
                { title: 'Create New Document', shortcut: ['N', 'D'], action: () => window.location.href = '/pages/documents.html#new' },
                { title: 'Add Calendar Event', shortcut: ['N', 'E'], action: () => window.location.href = '/pages/calendar.html#new' },
                { title: 'Toggle Theme', shortcut: ['/', 'T'], action: toggleTheme }
            ]
        }
    ];

    // Toggle command palette
    function toggleCommandPalette(show = true) {
        commandPalette.setAttribute('data-visible', show);
        if (show) {
            commandInput.value = '';
            commandInput.focus();
            renderResults();
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Toggle with Cmd/Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            toggleCommandPalette(!commandPalette.hasAttribute('data-visible'));
        }
        
        // Close with Escape
        if (e.key === 'Escape' && commandPalette.hasAttribute('data-visible')) {
            e.preventDefault();
            toggleCommandPalette(false);
        }
    });

    // Close when clicking overlay
    const overlay = commandPalette.querySelector('.command-palette-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            toggleCommandPalette(false);
        });
    }

    // Filter and render results
    function renderResults(filter = '') {
        const lowerFilter = filter.toLowerCase();
        let html = '';

        commands.forEach(category => {
            const filteredItems = category.items.filter(item => 
                item.title.toLowerCase().includes(lowerFilter)
            );

            if (filteredItems.length > 0) {
                html += `
                    <div class="command-category">
                        <div class="command-category-header">
                            <h3 class="command-category-title">${category.category}</h3>
                        </div>
                        ${filteredItems.map(item => `
                            <div class="command-result" role="option" tabindex="0">
                                <svg class="command-result-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                                <div class="command-result-content">
                                    <div class="command-result-title">${item.title}</div>
                                </div>
                                <div class="command-result-shortcut">
                                    ${item.shortcut.map(key => `<kbd>${key}</kbd>`).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        });

        resultsContainer.innerHTML = html || '<div class="command-empty">No results found</div>';

        // Add click handlers to results
        document.querySelectorAll('.command-result').forEach((result, index) => {
            result.addEventListener('click', () => {
                const categoryIndex = Math.floor(index / 4); // Assuming 4 items per category
                const itemIndex = index % 4;
                commands[categoryIndex].items[itemIndex].action();
                toggleCommandPalette(false);
            });
        });
    }

    // Handle input changes
    commandInput.addEventListener('input', (e) => {
        renderResults(e.target.value);
    });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeWidgets();
    initializeKPIs();
    initializeProjects();
    initializeNews();
    initializeTaskManagement(); // Changed from initializeTasks()
    initializeCelebrations();
    initializePolls();
    initializeDocuments();
    updateWeather();

    // Update weather every 30 minutes
    setInterval(updateWeather, 30 * 60 * 1000);

    // Example data for bar chart
    const data = {
        'Mon': 65,
        'Tue': 85,
        'Wed': 72,
        'Thu': 90,
        'Fri': 78
    };
    
    const chartContainer = document.querySelector('.kpi-widget');
    if (chartContainer) {
        createBarChart(data, chartContainer);
    }

    // Initialize enhanced features
    initializeEnhancedKPIs();
    initializeDragAndDrop();
    
    const searchInput = document.getElementById('globalSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleEnhancedSearch, 300));
    }

    initializeKeyboardNavigation();
    initializeEnhancedTasks();
    
    // Show keyboard shortcuts hint
    if (searchInput) {
        searchInput.setAttribute('placeholder', 'Search anything... (Press "/" to focus)');
    }

    // Initialize command palette
    initializeCommandPalette();
});

// Task System
function initializeTaskSystem() {
    const newTaskBtn = document.querySelector('.quick-actions .btn.primary');
    const addTaskBtn = document.querySelector('.tasks-widget .btn.primary');
    const tasksList = document.querySelector('.tasks-list');

    if (newTaskBtn) {
        newTaskBtn.addEventListener('click', () => showTaskModal());
    }

    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => showTaskModal());
    }

    if (tasksList) {
        // Handle task completion
        tasksList.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const taskItem = e.target.closest('.task-item');
                if (taskItem) {
                    if (e.target.checked) {
                        taskItem.classList.add('completed');
                        showNotification('Task completed!', 'success');
                        updateAnalytics('taskCompleted');
                    } else {
                        taskItem.classList.remove('completed');
                    }
                }
            }
        });
    }
}

// Task Modal
function showTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>New Task</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <form id="taskForm">
                    <div class="form-group">
                        <label for="taskTitle">Task Title</label>
                        <input type="text" id="taskTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="taskDue">Due Date</label>
                        <input type="date" id="taskDue" required>
                    </div>
                    <div class="form-group">
                        <label for="taskPriority">Priority</label>
                        <select id="taskPriority">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="taskDescription">Description</label>
                        <textarea id="taskDescription"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn primary">Create Task</button>
                        <button type="button" class="btn secondary close-modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#taskForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addNewTask({
            title: form.taskTitle.value,
            dueDate: form.taskDue.value,
            priority: form.taskPriority.value,
            description: form.taskDescription.value
        });
        closeModal(modal);
        showNotification('Task created successfully!', 'success');
    });

    // Handle modal close
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.close-modal');
    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => closeModal(modal));
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal(modal);
    });
}

function closeModal(modal) {
    modal.remove();
}

function addNewTask(taskData) {
    const tasksList = document.querySelector('.tasks-list');
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <label class="task-checkbox">
            <input type="checkbox">
            <span class="checkmark"></span>
            <span class="task-text">${taskData.title}</span>
        </label>
        <span class="task-due">Due ${formatDate(taskData.dueDate)}</span>
    `;
    tasksList.insertBefore(taskItem, tasksList.firstChild);
    updateAnalytics('taskCreated');
}

// Share Update System
function initializeWidgetActions() {
    const shareUpdateBtn = document.querySelector('.quick-actions .btn.secondary');
    const scheduleMeetingBtn = document.querySelector('.quick-actions .btn.secondary:last-child');
    const viewAllActivityBtn = document.querySelector('.activity-widget .btn.secondary');
    const viewCalendarBtn = document.querySelector('.calendar-widget .btn.secondary');

    if (shareUpdateBtn) {
        shareUpdateBtn.addEventListener('click', showShareModal);
    }

    if (scheduleMeetingBtn) {
        scheduleMeetingBtn.addEventListener('click', showScheduleModal);
    }

    if (viewAllActivityBtn) {
        viewAllActivityBtn.addEventListener('click', () => {
            // Expand activity feed or navigate to dedicated page
            const activityList = document.querySelector('.activity-list');
            activityList.classList.toggle('expanded');
        });
    }

    if (viewCalendarBtn) {
        viewCalendarBtn.addEventListener('click', () => {
            window.location.href = 'pages/calendar.html';
        });
    }
}

function showShareModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Share Update</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <form id="shareForm">
                    <div class="form-group">
                        <label for="updateText">What's happening?</label>
                        <textarea id="updateText" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="visibility">Visibility</label>
                        <select id="visibility">
                            <option value="team">Team</option>
                            <option value="department">Department</option>
                            <option value="company">Company</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn primary">Share</button>
                        <button type="button" class="btn secondary close-modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#shareForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        shareUpdate({
            text: form.updateText.value,
            visibility: form.visibility.value
        });
        closeModal(modal);
        showNotification('Update shared successfully!', 'success');
    });

    // Handle modal close
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.close-modal');
    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => closeModal(modal));
    });
}

function showScheduleModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Schedule Meeting</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <form id="scheduleForm">
                    <div class="form-group">
                        <label for="meetingTitle">Meeting Title</label>
                        <input type="text" id="meetingTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="meetingDate">Date</label>
                        <input type="date" id="meetingDate" required>
                    </div>
                    <div class="form-group">
                        <label for="meetingTime">Time</label>
                        <input type="time" id="meetingTime" required>
                    </div>
                    <div class="form-group">
                        <label for="meetingDuration">Duration</label>
                        <select id="meetingDuration">
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="meetingParticipants">Participants</label>
                        <input type="text" id="meetingParticipants" placeholder="Enter email addresses">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn primary">Schedule</button>
                        <button type="button" class="btn secondary close-modal">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // Handle form submission
    const form = modal.querySelector('#scheduleForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        scheduleMeeting({
            title: form.meetingTitle.value,
            date: form.meetingDate.value,
            time: form.meetingTime.value,
            duration: form.meetingDuration.value,
            participants: form.meetingParticipants.value.split(',').map(email => email.trim())
        });
        closeModal(modal);
        showNotification('Meeting scheduled successfully!', 'success');
    });

    // Handle modal close
    const closeBtn = modal.querySelector('.close-btn');
    const cancelBtn = modal.querySelector('.close-modal');
    [closeBtn, cancelBtn].forEach(btn => {
        btn.addEventListener('click', () => closeModal(modal));
    });
}

// Notifications System
function initializeNotifications() {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    const container = document.querySelector('.notification-container');
    container.appendChild(notification);

    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after duration
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// User Profile
function initializeUserProfile() {
    const userProfile = document.querySelector('.user-profile');
    if (!userProfile) return;

    userProfile.addEventListener('click', toggleProfileMenu);

    // Create profile menu
    const menu = document.createElement('div');
    menu.className = 'profile-menu';
    menu.innerHTML = `
        <div class="profile-menu-header">
            <img src="https://ui-avatars.com/api/?name=John+Doe&background=4f77ff&color=fff" alt="John Doe" class="avatar">
            <div class="profile-info">
                <strong>John Doe</strong>
                <span>john.doe@horizon.com</span>
            </div>
        </div>
        <div class="profile-menu-items">
            <a href="#" class="profile-menu-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                My Profile
            </a>
            <a href="#" class="profile-menu-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Edit Profile
            </a>
            <a href="#" class="profile-menu-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                My Documents
            </a>
            <a href="#" class="profile-menu-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
                Settings
            </a>
            <hr>
            <a href="#" class="profile-menu-item text-danger">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sign Out
            </a>
        </div>
    `;

    userProfile.appendChild(menu);
}

function toggleProfileMenu(e) {
    e.stopPropagation();
    const menu = document.querySelector('.profile-menu');
    menu.classList.toggle('active');

    // Close menu when clicking outside
    const closeMenu = (e) => {
        if (!e.target.closest('.profile-menu') && !e.target.closest('.user-profile')) {
            menu.classList.remove('active');
            document.removeEventListener('click', closeMenu);
        }
    };

    if (menu.classList.contains('active')) {
        document.addEventListener('click', closeMenu);
    }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Search shortcut (/)
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            document.querySelector('.search-input').focus();
        }

        // New task shortcut (Ctrl/Cmd + N)
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            showTaskModal();
        }

        // Share update shortcut (Ctrl/Cmd + S)
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showShareModal();
        }
    });
}

// Helper Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'tomorrow';
    } else {
        const days = Math.ceil((date - today) / (1000 * 60 * 60 * 24));
        return `in ${days} days`;
    }
}

function updateAnalytics(action) {
    const analyticsWidget = document.querySelector('.analytics-widget');
    if (!analyticsWidget) return;

    const values = {
        taskCompleted: {
            selector: '.analytics-item:nth-child(2) .analytics-value',
            progressSelector: '.analytics-item:nth-child(2) .progress'
        },
        taskCreated: {
            selector: '.analytics-item:nth-child(2) .analytics-value',
            progressSelector: '.analytics-item:nth-child(2) .progress'
        }
    };

    if (values[action]) {
        const valueElement = analyticsWidget.querySelector(values[action].selector);
        const progressElement = analyticsWidget.querySelector(values[action].progressSelector);
        
        if (valueElement && progressElement) {
            const currentValue = parseInt(valueElement.textContent);
            const newValue = currentValue + (action === 'taskCompleted' ? 1 : 0);
            valueElement.textContent = newValue;
            
            // Update progress bar
            const newWidth = Math.min(100, (newValue / 30) * 100); // Assuming 30 is the target
            progressElement.style.width = `${newWidth}%`;
        }
    }
} 

// Weather System
function initializeWeather() {
    const refreshBtn = document.querySelector('.weather-widget .btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', updateWeather);
    }
    // Initial weather update
    updateWeather();
}

async function updateWeather() {
    try {
        const weatherWidget = document.querySelector('.weather-widget');
        if (!weatherWidget) return;

        weatherWidget.classList.add('loading');

        // This is a mock weather data - in a real app, you'd fetch from a weather API
        const mockWeatherData = {
            temp: Math.floor(Math.random() * (85 - 65) + 65),
            conditions: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
            humidity: Math.floor(Math.random() * (80 - 50) + 50),
            wind: Math.floor(Math.random() * (15 - 5) + 5),
            rain: Math.floor(Math.random() * 30)
        };

        // Update weather widget with null checks
        const tempElement = weatherWidget.querySelector('.weather-temp');
        const descElement = weatherWidget.querySelector('.weather-desc');
        const detailElements = weatherWidget.querySelectorAll('.weather-detail .weather-detail-value');
        const weatherIcon = weatherWidget.querySelector('.weather-icon');
        
        if (tempElement) tempElement.textContent = `${mockWeatherData.temp}°F`;
        if (descElement) descElement.textContent = mockWeatherData.conditions;
        
        if (detailElements.length >= 3) {
            detailElements[0].textContent = `${mockWeatherData.humidity}%`;
            detailElements[1].textContent = `${mockWeatherData.wind} mph`;
            detailElements[2].textContent = `${mockWeatherData.rain}%`;
        }

        // Update weather icon based on conditions
        const icons = {
            'Sunny': '☀️',
            'Partly Cloudy': '⛅',
            'Cloudy': '☁️',
            'Light Rain': '🌧️'
        };
        if (weatherIcon) weatherIcon.textContent = icons[mockWeatherData.conditions];

        weatherWidget.classList.remove('loading');
    } catch (error) {
        console.error('Error updating weather:', error);
        showNotification('Failed to update weather', 'error');
    }
}

// Notes System
function initializeNotes() {
    const notesWidget = document.querySelector('.notes-widget');
    if (!notesWidget) return;

    const notesInput = notesWidget.querySelector('.notes-input');
    const notesList = notesWidget.querySelector('.notes-list');
    const newNoteBtn = notesWidget.querySelector('.btn');

    if (notesInput) {
        notesInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addNote(notesInput.value);
                notesInput.value = '';
            }
        });
    }

    if (newNoteBtn) {
        newNoteBtn.addEventListener('click', () => {
            notesInput.focus();
        });
    }
}

function addNote(text) {
    if (!text.trim()) return;

    const notesList = document.querySelector('.notes-list');
    if (!notesList) return;

    const noteItem = document.createElement('div');
    noteItem.className = 'note-item';
    noteItem.innerHTML = `
        <div class="note-text">${text}</div>
        <div class="note-meta">Added just now</div>
    `;

    notesList.insertBefore(noteItem, notesList.firstChild);
    showNotification('Note added successfully', 'success');
}

// Analytics Chart
function initializeAnalyticsChart() {
    const chartContainer = document.getElementById('analyticsChart');
    if (!chartContainer) return;

    // Mock data for the chart
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        values: [65, 59, 80, 81, 56, 55, 40]
    };

    // Create canvas element
    const canvas = document.createElement('canvas');
    chartContainer.appendChild(canvas);

    // Draw chart (using a simple implementation)
    const ctx = canvas.getContext('2d');
    const width = chartContainer.offsetWidth;
    const height = chartContainer.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Calculate scales
    const maxValue = Math.max(...data.values);
    const padding = 40;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    const barWidth = chartWidth / data.values.length * 0.8;
    const barSpacing = chartWidth / data.values.length * 0.2;

    // Draw bars
    ctx.fillStyle = 'var(--primary-color)';
    data.values.forEach((value, index) => {
        const x = padding + (index * (barWidth + barSpacing));
        const barHeight = (value / maxValue) * chartHeight;
        const y = height - padding - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
    });

    // Draw labels
    ctx.fillStyle = 'var(--text-muted)';
    ctx.font = '12px Inter';
    data.labels.forEach((label, index) => {
        const x = padding + (index * (barWidth + barSpacing)) + (barWidth / 2);
        const y = height - (padding / 2);
        ctx.fillText(label, x, y);
    });
}

// Event System
function initializeEventSystem() {
    const calendarWidget = document.querySelector('.calendar-widget');
    if (!calendarWidget) return;

    const prevBtn = calendarWidget.querySelector('[data-tooltip="Previous day"]');
    const nextBtn = calendarWidget.querySelector('[data-tooltip="Next day"]');
    const dateSpan = calendarWidget.querySelector('.current-date');

    let currentDate = new Date();

    function updateEvents() {
        const eventsList = calendarWidget.querySelector('.events-list');
        if (!eventsList) return;

        // Mock events data - in a real app, you'd fetch this from a backend
        const events = [
            {
                time: '10:00 AM',
                title: 'Team Sync Meeting',
                details: 'Daily standup with the development team',
                attendees: ['John Doe', 'Sarah Smith', 'Mike Johnson']
            },
            {
                time: '2:00 PM',
                title: 'Client Presentation',
                details: 'Q3 Project Review with stakeholders',
                attendees: ['John Doe', 'Sarah Smith']
            },
            {
                time: '4:30 PM',
                title: 'Product Planning',
                details: 'Roadmap discussion for next quarter',
                attendees: ['Mike Johnson', 'Sarah Smith']
            }
        ];

        // Update date display
        const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        dateSpan.textContent = currentDate.toLocaleDateString('en-US', dateOptions);

        // Update events list
        eventsList.innerHTML = events.map(event => `
            <div class="event-item" data-tooltip="${event.details}">
                <div class="event-time">${event.time}</div>
                <div class="event-content">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-details">${event.details}</p>
                    <div class="event-attendees">
                        ${event.attendees.map(name => `
                            <img src="https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=4f77ff&color=fff" 
                                 alt="${name}" 
                                 class="avatar">
                        `).join('')}
                        ${event.attendees.length > 3 ? `<span class="more-attendees">+${event.attendees.length - 3}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() - 1);
            updateEvents();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setDate(currentDate.getDate() + 1);
            updateEvents();
        });
    }

    // Initial events update
    updateEvents();
} 

// Settings Page
function initializeSettings() {
    const themeSelect = document.getElementById('themeSelect');
    const colorOptions = document.querySelectorAll('.color-option');
    
    if (!themeSelect) return; // Not on settings page

    // Initialize theme select
    const currentTheme = localStorage.getItem('theme') || 'system';
    themeSelect.value = currentTheme;

    themeSelect.addEventListener('change', (e) => {
        const theme = e.target.value;
        if (theme === 'system') {
            localStorage.removeItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        } else {
            setTheme(theme);
        }
    });

    // Initialize color options
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            option.classList.add('active');
            // Get the color value
            const color = getComputedStyle(option).getPropertyValue('--color');
            // Update primary color
            document.documentElement.style.setProperty('--primary-500', color);
            // Save color preference
            localStorage.setItem('accent-color', color);
        });
    });

    // Initialize switches with animation
    const switches = document.querySelectorAll('.switch input[type="checkbox"]');
    switches.forEach(switchInput => {
        switchInput.addEventListener('change', () => {
            const switchLabel = switchInput.closest('.switch');
            switchLabel.style.transform = 'scale(0.95)';
            setTimeout(() => {
                switchLabel.style.transform = '';
            }, 150);
        });
    });
}

// Enhanced keyboard navigation
function initializeKeyboardNavigation() {
    // Theme toggle shortcut
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'd') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Search shortcut
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });

    // Escape key handling
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.tagName === 'INPUT') {
                activeElement.blur();
            }
            
            // Close any open menus/modals
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Profile menu keyboard navigation
    const userProfile = document.querySelector('.user-profile');
    if (userProfile) {
        userProfile.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleProfileMenu();
            }
        });
    }
}

// Enhanced sidebar toggle with ARIA state management
function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!menuToggle || !sidebar) return;

    function toggleSidebar() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    }

    menuToggle.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });
}



// Screen reader announcement utility
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    // Remove the element after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Initialize all accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    initializeNotifications();
    initializeUserProfile();
    initializeWidgetActions();
    initializeKeyboardNavigation();
    

});

// Modal Management
function initializeModals() {
    // Task Form Modal
    const taskFormModal = document.getElementById('taskFormModal');
    const addTaskBtn = document.querySelector('.add-task-btn');
    const closeTaskForm = document.getElementById('closeTaskForm');
    const cancelTask = document.getElementById('cancelTask');
    const createTask = document.getElementById('createTask');

    // Share Update Modal
    const shareUpdateModal = document.getElementById('shareUpdateModal');
    const shareUpdateBtn = document.querySelector('.share-update-btn');
    const closeShareUpdate = document.getElementById('closeShareUpdate');
    const cancelShare = document.getElementById('cancelShare');
    const shareUpdate = document.getElementById('shareUpdate');

    // Schedule Meeting Modal
    const scheduleMeetingModal = document.getElementById('scheduleMeetingModal');
    const scheduleMeetingBtn = document.querySelector('.schedule-meeting-btn');
    const closeScheduleMeeting = document.getElementById('closeScheduleMeeting');
    const cancelMeeting = document.getElementById('cancelMeeting');
    const scheduleMeeting = document.getElementById('scheduleMeeting');

    // Generic modal functions
    function showModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function hideModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        // Clear form inputs
        modal.querySelectorAll('input, textarea, select').forEach(input => {
            input.value = '';
        });
    }

    // Task Form Modal Events
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', () => showModal(taskFormModal));
    }
    if (closeTaskForm) {
        closeTaskForm.addEventListener('click', () => hideModal(taskFormModal));
    }
    if (cancelTask) {
        cancelTask.addEventListener('click', () => hideModal(taskFormModal));
    }
    if (createTask) {
        createTask.addEventListener('click', () => {
            // Get form values
            const title = taskFormModal.querySelector('input[type="text"]').value;
            const description = taskFormModal.querySelector('textarea').value;
            const priority = taskFormModal.querySelector('select').value;
            const dueDate = taskFormModal.querySelector('input[type="date"]').value;

            if (!title.trim()) {
                alert('Please enter a task title');
                return;
            }

            console.log('Creating task:', { title, description, priority, dueDate });
            hideModal(taskFormModal);
        });
    }

    // Share Update Modal Events
    if (shareUpdateBtn) {
        shareUpdateBtn.addEventListener('click', () => showModal(shareUpdateModal));
    }
    if (closeShareUpdate) {
        closeShareUpdate.addEventListener('click', () => hideModal(shareUpdateModal));
    }
    if (cancelShare) {
        cancelShare.addEventListener('click', () => hideModal(shareUpdateModal));
    }
    if (shareUpdate) {
        shareUpdate.addEventListener('click', () => {
            const content = shareUpdateModal.querySelector('textarea').value;
            const type = shareUpdateModal.querySelector('select').value;

            if (!content.trim()) {
                alert('Please enter your update');
                return;
            }

            console.log('Sharing update:', { content, type });
            hideModal(shareUpdateModal);
        });
    }

    // Schedule Meeting Modal Events
    if (scheduleMeetingBtn) {
        scheduleMeetingBtn.addEventListener('click', () => showModal(scheduleMeetingModal));
    }
    if (closeScheduleMeeting) {
        closeScheduleMeeting.addEventListener('click', () => hideModal(scheduleMeetingModal));
    }
    if (cancelMeeting) {
        cancelMeeting.addEventListener('click', () => hideModal(scheduleMeetingModal));
    }
    if (scheduleMeeting) {
        scheduleMeeting.addEventListener('click', () => {
            const title = scheduleMeetingModal.querySelector('input[type="text"]').value;
            const description = scheduleMeetingModal.querySelector('textarea').value;
            const datetime = scheduleMeetingModal.querySelector('input[type="datetime-local"]').value;
            const participants = scheduleMeetingModal.querySelector('input[placeholder="Participants"]').value;
            const duration = scheduleMeetingModal.querySelector('select').value;

            if (!title.trim()) {
                alert('Please enter a meeting title');
                return;
            }
            if (!datetime) {
                alert('Please select a date and time');
                return;
            }

            console.log('Scheduling meeting:', { title, description, datetime, participants, duration });
            hideModal(scheduleMeetingModal);
        });
    }

    // Close modals when clicking outside
    [taskFormModal, shareUpdateModal, scheduleMeetingModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    hideModal(modal);
                }
            });
        }
    });

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [taskFormModal, shareUpdateModal, scheduleMeetingModal].forEach(modal => {
                if (modal && modal.style.display === 'flex') {
                    hideModal(modal);
                }
            });
        }
    });
}

// Initialize modals when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeModals();
}); 

// Quick Access Widget functionality
function initializeQuickAccess() {
    const quickAccessItems = document.querySelectorAll('.quick-access-item');
    const quickAccessLinks = document.querySelectorAll('.quick-access-link');
    
    // Add hover effect with smooth animation
    quickAccessLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('.quick-access-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const icon = link.querySelector('.quick-access-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add keyboard navigation
    quickAccessLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            let targetLink = null;
            
            switch(e.key) {
                case 'ArrowRight':
                    targetLink = quickAccessLinks[index + 1] || quickAccessLinks[0];
                    break;
                case 'ArrowLeft':
                    targetLink = quickAccessLinks[index - 1] || quickAccessLinks[quickAccessLinks.length - 1];
                    break;
                case 'ArrowUp':
                    targetLink = quickAccessLinks[index - 2] || quickAccessLinks[quickAccessLinks.length - 1];
                    break;
                case 'ArrowDown':
                    targetLink = quickAccessLinks[index + 2] || quickAccessLinks[0];
                    break;
            }
            
            if (targetLink) {
                e.preventDefault();
                targetLink.focus();
            }
        });
    });

    // Add touch interaction for mobile
    if ('ontouchstart' in window) {
        quickAccessLinks.forEach(link => {
            link.addEventListener('touchstart', () => {
                link.classList.add('touch-active');
            });
            
            link.addEventListener('touchend', () => {
                link.classList.remove('touch-active');
            });
        });
    }

    // Initialize customize button functionality
    const customizeBtn = document.querySelector('.quick-access-widget .widget-actions button');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', () => {
            // Show customization modal (to be implemented)
            showCustomizeModal();
        });
    }
}

// Customize modal for Quick Access
function showCustomizeModal() {
    const modalHTML = `
        <div class="modal customize-modal" role="dialog" aria-labelledby="customize-title">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="customize-title">Customize Quick Access</h2>
                    <button class="modal-close" aria-label="Close modal">×</button>
                </div>
                <div class="modal-body">
                    <p>Drag and drop items to reorder or hide them from your Quick Access widget.</p>
                    <div class="customize-items" role="list">
                        <!-- Items will be populated dynamically -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn secondary">Cancel</button>
                    <button class="btn primary">Save Changes</button>
                </div>
            </div>
        </div>
    `;

    // Insert modal into DOM
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.customize-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const cancelBtn = modal.querySelector('.btn.secondary');
    const saveBtn = modal.querySelector('.btn.primary');
    
    // Add event listeners
    closeBtn.addEventListener('click', () => closeCustomizeModal(modal));
    cancelBtn.addEventListener('click', () => closeCustomizeModal(modal));
    saveBtn.addEventListener('click', () => {
        saveQuickAccessCustomization();
        closeCustomizeModal(modal);
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal) {
            closeCustomizeModal(modal);
        }
    });
    
    // Prevent clicking outside from closing
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            e.stopPropagation();
        }
    });
    
    // Show modal with animation
    requestAnimationFrame(() => {
        modal.classList.add('active');
    });
}

function closeCustomizeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
        modal.remove();
    }, 300);
}

function saveQuickAccessCustomization() {
    // Implementation for saving customization
    // This would typically involve an API call or local storage update
    console.log('Saving Quick Access customization...');
}

// Add Quick Access initialization to DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeNotifications();
    initializeUserProfile();
    initializeWidgetActions();
    initializeKeyboardNavigation();
    initializeQuickAccess(); // Add this line
}); 

// Enhanced Personalization System
function initializePersonalization() {
    updateGreeting();
    updateContextualStats();
    loadPersonalizedContent();
    setupPersonalizationPreferences();
}

function updateGreeting() {
    const hour = new Date().getHours();
    const userName = localStorage.getItem('userName') || 'Liz';
    
    let greeting = '';
    if (hour < 12) greeting = 'Good morning';
    else if (hour < 17) greeting = 'Good afternoon';
    else greeting = 'Good evening';
    
    const greetingElement = document.querySelector('.greeting-text');
    if (greetingElement) {
        greetingElement.textContent = `${greeting},`;
    }
    
    // Add motivational message based on time and user activity
    const motivationalMessages = [
        "Ready to create something amazing today?",
        "Your projects are waiting for your magic touch!",
        "Time to make today count!",
        "You've got this! Let's tackle those goals.",
        "New opportunities await - let's seize them!"
    ];
    
    const subtitleElement = document.querySelector('.welcome-subtitle');
    if (subtitleElement) {
        const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        subtitleElement.textContent = randomMessage;
    }
}

function updateContextualStats() {
    // Get user's actual data from localStorage or API
    const userStats = {
        activeProjects: localStorage.getItem('userActiveProjects') || 12,
        teamOnline: localStorage.getItem('teamOnline') || 8,
        todaysMeetings: localStorage.getItem('todaysMeetings') || 3,
        overdueTasks: localStorage.getItem('overdueTasks') || 2,
        completedToday: localStorage.getItem('completedToday') || 5
    };
    
    // Update stats with animation
    animateStatUpdate('activeProjects', userStats.activeProjects);
    animateStatUpdate('teamOnline', userStats.teamOnline);
    animateStatUpdate('todaysMeetings', userStats.todaysMeetings);
    
    // Add new contextual stat if there are overdue tasks
    if (userStats.overdueTasks > 0) {
        addContextualStat('overdueTasks', userStats.overdueTasks, 'Overdue Tasks', 'warning');
    }
}

function animateStatUpdate(statId, newValue) {
    const statElement = document.querySelector(`[data-stat="${statId}"]`);
    if (!statElement) return;
    
    const currentValue = parseInt(statElement.textContent) || 0;
    animateNumber(currentValue, newValue, (value) => {
        statElement.textContent = Math.round(value);
    }, 1000);
}

function addContextualStat(id, value, label, type = 'info') {
    const statsContainer = document.querySelector('.welcome-stats');
    if (!statsContainer) return;
    
    const statItem = document.createElement('div');
    statItem.className = `stat-item ${type}`;
    statItem.innerHTML = `
        <span class="stat-number" data-stat="${id}">${value}</span>
        <span class="stat-label">${label}</span>
    `;
    
    statsContainer.appendChild(statItem);
}

function loadPersonalizedContent() {
    // Load user's recent activities
    const recentActivities = JSON.parse(localStorage.getItem('recentActivities') || '[]');
    if (recentActivities.length > 0) {
        displayRecentActivities(recentActivities);
    }
    
    // Load personalized quick actions based on user role and preferences
    const userRole = localStorage.getItem('userRole') || 'employee';
    const quickActions = getPersonalizedQuickActions(userRole);
    updateQuickActions(quickActions);
}

function getPersonalizedQuickActions(role) {
    const actionTemplates = {
        manager: [
            { icon: 'users', label: 'Team Review', action: 'review-team' },
            { icon: 'bar-chart', label: 'Performance', action: 'view-performance' },
            { icon: 'calendar', label: 'Schedule', action: 'schedule-meeting' }
        ],
        developer: [
            { icon: 'code', label: 'Code Review', action: 'code-review' },
            { icon: 'git-branch', label: 'Pull Requests', action: 'view-prs' },
            { icon: 'database', label: 'Deploy', action: 'deploy' }
        ],
        designer: [
            { icon: 'palette', label: 'Design System', action: 'design-system' },
            { icon: 'image', label: 'Assets', action: 'view-assets' },
            { icon: 'users', label: 'User Research', action: 'user-research' }
        ],
        employee: [
            { icon: 'check-square', label: 'My Tasks', action: 'view-tasks' },
            { icon: 'calendar', label: 'Schedule', action: 'schedule' },
            { icon: 'file-text', label: 'Documents', action: 'documents' }
        ]
    };
    
    return actionTemplates[role] || actionTemplates.employee;
}

function updateQuickActions(actions) {
    const quickActionsContainer = document.querySelector('.quick-actions');
    if (!quickActionsContainer) return;
    
    // Keep the primary "New Task" button
    const primaryButton = quickActionsContainer.querySelector('.btn.primary');
    quickActionsContainer.innerHTML = '';
    
    if (primaryButton) {
        quickActionsContainer.appendChild(primaryButton);
    }
    
    // Add personalized actions
    actions.forEach(action => {
        const button = document.createElement('button');
        button.className = 'btn secondary';
        button.setAttribute('data-action', action.action);
        button.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                ${getActionIcon(action.icon)}
            </svg>
            ${action.label}
        `;
        quickActionsContainer.appendChild(button);
    });
}

function getActionIcon(iconName) {
    const icons = {
        'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>',
        'bar-chart': '<path d="M12 20V10M18 20V4M6 20v-6"></path>',
        'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
        'code': '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
        'git-branch': '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v2"></path>',
        'database': '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>',
        'palette': '<circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path>',
        'image': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>',
        'check-square': '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
        'file-text': '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>'
    };
    
    return icons[iconName] || icons['check-square'];
}

function setupPersonalizationPreferences() {
    // Allow users to customize their dashboard
    const customizeBtn = document.querySelector('[aria-label="Customize quick access"]');
    if (customizeBtn) {
        customizeBtn.addEventListener('click', showCustomizationModal);
    }
}

function showCustomizationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Customize Your Dashboard</h2>
                <button class="close-btn" onclick="this.closest('.modal').remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" id="userName" value="${localStorage.getItem('userName') || 'Liz'}" placeholder="Enter your name">
                </div>
                <div class="form-group">
                    <label>Your Role</label>
                    <select id="userRole">
                        <option value="employee" ${localStorage.getItem('userRole') === 'employee' ? 'selected' : ''}>Employee</option>
                        <option value="manager" ${localStorage.getItem('userRole') === 'manager' ? 'selected' : ''}>Manager</option>
                        <option value="developer" ${localStorage.getItem('userRole') === 'developer' ? 'selected' : ''}>Developer</option>
                        <option value="designer" ${localStorage.getItem('userRole') === 'designer' ? 'selected' : ''}>Designer</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Dashboard Preferences</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" id="showWeather" ${localStorage.getItem('showWeather') !== 'false' ? 'checked' : ''}> Show Weather Widget</label>
                        <label><input type="checkbox" id="showAnalytics" ${localStorage.getItem('showAnalytics') !== 'false' ? 'checked' : ''}> Show Analytics</label>
                        <label><input type="checkbox" id="showTasks" ${localStorage.getItem('showTasks') !== 'false' ? 'checked' : ''}> Show Task System</label>
                    </div>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                <button class="btn primary" onclick="saveCustomization()">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveCustomization() {
    const userName = document.getElementById('userName').value;
    const userRole = document.getElementById('userRole').value;
    const showWeather = document.getElementById('showWeather').checked;
    const showAnalytics = document.getElementById('showAnalytics').checked;
    const showTasks = document.getElementById('showTasks').checked;
    
    localStorage.setItem('userName', userName);
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('showWeather', showWeather);
    localStorage.setItem('showAnalytics', showAnalytics);
    localStorage.setItem('showTasks', showTasks);
    
    // Update the dashboard
    updateGreeting();
    loadPersonalizedContent();
    
    // Close modal
    document.querySelector('.modal').remove();
    
    // Show success message
    showNotification('Dashboard customized successfully!', 'success');
}

// ... existing code ...

// Register service worker for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful:', registration.scope);
                
                // Request notification permission
                if ('Notification' in window) {
                    Notification.requestPermission();
                }
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

// Handle offline/online status
function updateOnlineStatus() {
    const status = navigator.onLine ? 'online' : 'offline';
    document.documentElement.setAttribute('data-connection', status);
    
    if (!navigator.onLine) {
        showOfflineToast();
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Show offline toast notification
function showOfflineToast() {
    const toast = document.createElement('div');
    toast.className = 'offline-toast';
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="offline-toast-icon">
            <path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39"></path>
        </svg>
        <span>You are offline. Some features may be unavailable.</span>
        <button class="offline-toast-close" aria-label="Close notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    // Add close button handler
    toast.querySelector('.offline-toast-close').addEventListener('click', () => {
        toast.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 5000);
}

// Add offline toast styles
const style = document.createElement('style');
style.textContent = `
    .offline-toast {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    }

    .offline-toast-icon {
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
    }

    .offline-toast-close {
        background: none;
        border: none;
        padding: 0.25rem;
        color: white;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .offline-toast-close:hover {
        opacity: 1;
    }

    .offline-toast-close svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    @keyframes slideUp {
        from {
            transform: translate(-50%, 100%);
            opacity: 0;
        }
        to {
            transform: translate(-50%, 0);
            opacity: 1;
        }
    }
`;

document.head.appendChild(style);

// Initialize online/offline status
updateOnlineStatus();