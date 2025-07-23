// Header Component
class Header extends HTMLElement {
    constructor() {
        super();
        this.userMenuOpen = false;
        this.notificationsOpen = false;
        this.colorPickerOpen = false;
        this.currentColor = localStorage.getItem('userColor') || '#6366f1';
        this.notificationInterval = null;
        this.unreadCount = 0;
        
        // Bind event handlers to maintain proper context
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.applyColor = this.applyColor.bind(this);
        
        this.notifications = [
            {
                id: 1,
                type: 'mention',
                message: '@sarah mentioned you in Project Alpha',
                time: '5m ago',
                read: false
            },
            {
                id: 2,
                type: 'task',
                message: 'New task assigned: Update documentation',
                time: '15m ago',
                read: false
            },
            {
                id: 3,
                type: 'meeting',
                message: 'Team meeting starting in 10 minutes',
                time: '50m ago',
                read: true
            }
        ];
    }

    connectedCallback() {
        console.log('Header component connected');
        this.render();
        this.setupEventListeners();
        this.updateUnreadCount();
        this.startNotificationPolling();
        
        // Initialize saved color after a brief delay to ensure DOM is ready
        setTimeout(() => {
            if (this.currentColor) {
                this.applyColor(this.currentColor);
            }
        }, 100);
    }

    disconnectedCallback() {
        console.log('Header disconnecting...');
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
            this.notificationInterval = null;
        }
        
        // Remove global event listeners
        document.removeEventListener('click', this.handleDocumentClick);
        this.removeEventListener('click', this.handleClick);
        
        console.log('Header cleanup complete');
    }

    handleDocumentClick(event) {
        // Get references to menus
        const userMenuButton = this.querySelector('#toggleUserMenu');
        const userDropdown = this.querySelector('.user-dropdown');
        const notificationsButton = this.querySelector('#toggleNotifications');
        const notificationsDropdown = this.querySelector('.notifications-dropdown');
        const colorPickerButton = this.querySelector('#toggleColorPicker');
        const colorPickerDropdown = this.querySelector('.color-picker-dropdown');

        // Check if click is outside user menu
        if (this.userMenuOpen && 
            userMenuButton && 
            userDropdown &&
            !userMenuButton.contains(event.target) && 
            !userDropdown.contains(event.target)) {
            this.userMenuOpen = false;
            this.render();
        }

        // Check if click is outside notifications
        if (this.notificationsOpen && 
            notificationsButton && 
            notificationsDropdown &&
            !notificationsButton.contains(event.target) && 
            !notificationsDropdown.contains(event.target)) {
            this.notificationsOpen = false;
            this.render();
        }

        // Check if click is outside color picker
        if (this.colorPickerOpen && 
            colorPickerButton && 
            colorPickerDropdown &&
            !colorPickerButton.contains(event.target) && 
            !colorPickerDropdown.contains(event.target)) {
            this.colorPickerOpen = false;
            this.render();
        }
    }

    handleClick(event) {
        // Get references to menus
        const userMenuButton = this.querySelector('#toggleUserMenu');
        const userDropdown = this.querySelector('.user-dropdown');
        const notificationsButton = this.querySelector('#toggleNotifications');
        const notificationsDropdown = this.querySelector('.notifications-dropdown');
        const colorPickerButton = this.querySelector('#toggleColorPicker');

        // User menu toggle
        if (userMenuButton && userMenuButton.contains(event.target)) {
            event.stopPropagation();
            this.userMenuOpen = !this.userMenuOpen;
            this.notificationsOpen = false;
            this.colorPickerOpen = false;
            this.render();
        }

        // Notifications menu toggle
        if (notificationsButton && notificationsButton.contains(event.target)) {
            event.stopPropagation();
            this.notificationsOpen = !this.notificationsOpen;
            this.userMenuOpen = false;
            this.colorPickerOpen = false;
            this.render();
        }

        // Color picker toggle
        if (colorPickerButton && colorPickerButton.contains(event.target)) {
            event.stopPropagation();
            this.colorPickerOpen = !this.colorPickerOpen;
            this.userMenuOpen = false;
            this.notificationsOpen = false;
            this.render();
        }
    }

    loadNotifications() {
        // In a real app, this would load from an API
        this.notifications = [
            {
                id: 1,
                type: 'mention',
                message: '@sarah mentioned you in Project Alpha',
                time: '5m ago',
                read: false
            },
            {
                id: 2,
                type: 'task',
                message: 'New task assigned: Update documentation',
                time: '15m ago',
                read: false
            },
            {
                id: 3,
                type: 'meeting',
                message: 'Team meeting starting in 10 minutes',
                time: '50m ago',
                read: true
            }
        ];
        this.updateUnreadCount();
    }

    updateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
        console.log('Current unread count:', this.unreadCount);
    }

    startNotificationPolling() {
        // Poll for new notifications every 30 seconds
        this.notificationInterval = setInterval(() => {
            this.checkNewNotifications();
        }, 30000);
    }

    checkNewNotifications() {
        // In a real app, this would check an API endpoint
        const mockNewNotification = Math.random() > 0.7;
        if (mockNewNotification) {
            this.notifications.unshift({
                id: Date.now(),
                type: 'update',
                message: 'New project update available',
                time: 'Just now',
                read: false
            });
            this.updateUnreadCount();
            this.render();
        }
    }

    render() {
        const notificationBadge = this.unreadCount > 0 ? `
            <span class="notification-badge" style="background: #ef4444; border-color: #ef4444;">${this.unreadCount}</span>
        ` : '';
        
        console.log('Rendering notification badge:', notificationBadge);
        
        this.innerHTML = `
            <header class="header" role="banner">
                <div class="header-left">
                    <a href="/" class="logo" aria-label="Quantum Forge home">
                        <div class="logo-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                            </svg>
                        </div>
                        <span class="logo-text">Quantum Forge</span>
                    </a>
                    
                    <button class="menu-button" aria-label="Toggle navigation menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="header-right">
                    <button class="action-button theme-toggle-btn" id="toggleTheme" aria-label="Toggle dark mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>

                    <div class="color-picker-menu">
                        <button class="action-button" id="toggleColorPicker" aria-label="Customize colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 1 0-20z"></path>
                            </svg>
                        </button>
                        
                        ${this.colorPickerOpen ? `
                            <div class="color-picker-dropdown" role="dialog" aria-label="Color picker">
                                <div class="color-picker-header">
                                    <h3>🎨 Theme Colors</h3>
                                    <button class="close-color-picker" aria-label="Close color picker">×</button>
                                </div>
                                <div class="color-options">
                                    <div class="preset-colors">
                                        <p>Choose a color:</p>
                                        <div class="color-grid">
                                            <button class="color-option" data-color="#6366f1" title="Indigo" style="background: #6366f1;">
                                                <span class="color-check" style="display: ${this.currentColor === '#6366f1' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#3b82f6" title="Blue" style="background: #3b82f6;">
                                                <span class="color-check" style="display: ${this.currentColor === '#3b82f6' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#10b981" title="Emerald" style="background: #10b981;">
                                                <span class="color-check" style="display: ${this.currentColor === '#10b981' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#f59e0b" title="Amber" style="background: #f59e0b;">
                                                <span class="color-check" style="display: ${this.currentColor === '#f59e0b' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#ef4444" title="Red" style="background: #ef4444;">
                                                <span class="color-check" style="display: ${this.currentColor === '#ef4444' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#8b5cf6" title="Violet" style="background: #8b5cf6;">
                                                <span class="color-check" style="display: ${this.currentColor === '#8b5cf6' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#06b6d4" title="Cyan" style="background: #06b6d4;">
                                                <span class="color-check" style="display: ${this.currentColor === '#06b6d4' ? 'block' : 'none'};">✓</span>
                                            </button>
                                            <button class="color-option" data-color="#84cc16" title="Lime" style="background: #84cc16;">
                                                <span class="color-check" style="display: ${this.currentColor === '#84cc16' ? 'block' : 'none'};">✓</span>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div class="custom-color">
                                        <label>Custom Color:</label>
                                        <input type="color" value="${this.currentColor}" id="customColorInput">
                                    </div>
                                    
                                    <div class="color-info">
                                        ✨ Changes apply instantly
                                    </div>
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="notifications-menu">
                        <button class="action-button" id="toggleNotifications" aria-label="View notifications">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            ${notificationBadge}
                        </button>
                        
                        ${this.notificationsOpen ? `
                            <div class="notifications-dropdown" role="dialog" aria-label="Notifications">
                                <div class="notifications-header">
                                    <h3>Notifications</h3>
                                    <button class="mark-all-read" aria-label="Mark all notifications as read">Mark all as read</button>
                                </div>
                                <div class="notifications-list" role="list">
                                    ${this.notifications.length > 0 ? this.notifications.map(notification => `
                                        <div class="notification-item ${notification.read ? 'read' : ''}" 
                                             role="listitem"
                                             data-id="${notification.id}"
                                             aria-label="${notification.message}">
                                            <div class="notification-icon ${notification.type}" aria-hidden="true">
                                                ${this.getNotificationIcon(notification.type)}
                                            </div>
                                            <div class="notification-content">
                                                <p class="notification-message">${notification.message}</p>
                                                <span class="notification-time">${notification.time}</span>
                                            </div>
                                        </div>
                                    `).join('') : `
                                        <div class="no-notifications" role="status">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                                            </svg>
                                            <p>No notifications</p>
                                        </div>
                                    `}
                                </div>
                            </div>
                        ` : ''}
                    </div>

                    <div class="user-menu ${this.userMenuOpen ? 'open' : ''}">
                        <button class="user-button" 
                                id="toggleUserMenu"
                                aria-label="User menu" 
                                aria-expanded="${this.userMenuOpen}"
                                aria-haspopup="true">
                            <div class="user-avatar" aria-hidden="true">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%236366f1'/%3E%3Ctext x='12' y='16' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EL%3C/text%3E%3C/svg%3E" 
                                    alt="" 
                                    width="32" 
                                    height="32">
                            </div>
                            <span class="user-name">Liz Stein</span>
                            <svg class="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>

                        ${this.userMenuOpen ? `
                            <div class="user-dropdown" role="dialog" aria-label="User menu">
                                <div class="user-info">
                                    <div class="user-avatar-large" aria-hidden="true">
                                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' fill='%236366f1'/%3E%3Ctext x='12' y='16' font-family='Arial' font-size='12' fill='white' text-anchor='middle'%3EL%3C/text%3E%3C/svg%3E" 
                                            alt="" 
                                            width="64" 
                                            height="64">
                                    </div>
                                    <div class="user-details">
                                        <h4 class="user-full-name">Liz Stein</h4>
                                        <p class="user-email">liz.stein@example.com</p>
                                    </div>
                                </div>
                                <div class="dropdown-divider" role="separator"></div>
                                <a href="/pages/profile.html" class="dropdown-item" role="menuitem">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                    View Profile
                                </a>
                                <a href="/pages/settings.html" class="dropdown-item" role="menuitem">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                    </svg>
                                    Settings
                                </a>
                                <div class="dropdown-divider" role="separator"></div>
                                <button class="dropdown-item logout-btn" role="menuitem">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                        <polyline points="16 17 21 12 16 7"></polyline>
                                        <line x1="21" y1="12" x2="9" y2="12"></line>
                                    </svg>
                                    Sign Out
                                </button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </header>
        `;

        // Debug: Check if the badge was actually rendered
        const badge = this.querySelector('.notification-badge');
        console.log('Badge element after render:', badge);
        
        // Setup dynamic listeners after render
        setTimeout(() => {
            this.setupDynamicListeners();
        }, 10);
    }

    getNotificationIcon(type) {
        const icons = {
            mention: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `,
            task: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            `,
            meeting: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            `,
            update: `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                </svg>
            `
        };
        return icons[type] || icons.update;
    }

    setupEventListeners() {
        // Add global event listeners ONCE
        document.addEventListener('click', this.handleDocumentClick);
        this.addEventListener('click', this.handleClick);

        // Set initial theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Setup dynamic event listeners after render
        this.setupDynamicListeners();

        // Mark all notifications as read
        const markAllRead = this.querySelector('.mark-all-read');
        if (markAllRead) {
            markAllRead.addEventListener('click', () => {
                this.notifications.forEach(n => n.read = true);
                this.updateUnreadCount();
                this.render();
            });
        }

        // Individual notification clicks
        this.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                const notification = this.notifications.find(n => n.id === id);
                if (notification) {
                    notification.read = true;
                    this.updateUnreadCount();
                    this.render();
                }
            });
        });

        // Prevent clicks inside dropdowns from closing them
        const userDropdown = this.querySelector('.user-dropdown');
        if (userDropdown) {
            userDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        const notificationsDropdown = this.querySelector('.notifications-dropdown');
        if (notificationsDropdown) {
            notificationsDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // Mobile menu toggle
        const menuButton = this.querySelector('.menu-button');
        if (menuButton) {
            menuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                document.body.classList.toggle('nav-open');
            });
        }

        // Logout button
        const logoutBtn = this.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Logging out...');
                this.userMenuOpen = false;
                this.render();
            });
        }
    }

    setupDynamicListeners() {
        // Theme toggle - set up after render when element exists
        const themeToggle = this.querySelector('#toggleTheme');
        if (themeToggle) {
            // Remove any existing listeners first
            themeToggle.removeEventListener('click', this.themeToggleHandler);
            
            // Create bound handler if it doesn't exist
            if (!this.themeToggleHandler) {
                this.themeToggleHandler = (e) => {
                    e.stopPropagation();
                    const html = document.documentElement;
                    const currentTheme = html.getAttribute('data-theme');
                    const newTheme = (!currentTheme || currentTheme === 'light') ? 'dark' : 'light';
                    html.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                    console.log('🌓 Theme switched to:', newTheme);
                };
            }
            
            themeToggle.addEventListener('click', this.themeToggleHandler);
            console.log('🌓 Theme toggle listener set up');
        } else {
            console.warn('🌓 Theme toggle button not found');
        }

        // Setup color picker listeners if dropdown is open
        if (this.colorPickerOpen) {
            this.setupColorPickerListeners();
        }
    }

    setupColorPickerListeners() {
        // Color picker events - set up after render when elements exist
        const colorPickerDropdown = this.querySelector('.color-picker-dropdown');
        const customColorInput = this.querySelector('#customColorInput');
        const closeColorPicker = this.querySelector('.close-color-picker');

        if (colorPickerDropdown) {
            colorPickerDropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        if (customColorInput) {
            customColorInput.addEventListener('input', (e) => {
                this.applyColor(e.target.value);
            });
        }

        if (closeColorPicker) {
            closeColorPicker.addEventListener('click', (e) => {
                e.stopPropagation();
                this.colorPickerOpen = false;
                this.render();
            });
        }

        // Color option buttons
        this.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const color = btn.dataset.color;
                this.applyColor(color);
            });
        });

        console.log('🎨 Color picker event listeners set up');
    }

    applyColor(color) {
        console.log('🎨 Header applying color:', color);
        this.currentColor = color;
        
        const root = document.documentElement;
        
        // Convert hex to RGB for color variations
        const rgb = this.hexToRgb(color);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        // Generate comprehensive color palette
        const palette = this.generateColorPalette(hsl);
        
        // Update ALL primary color variables
        root.style.setProperty('--primary-50', palette.primary50);
        root.style.setProperty('--primary-100', palette.primary100);
        root.style.setProperty('--primary-200', palette.primary200);
        root.style.setProperty('--primary-300', palette.primary300);
        root.style.setProperty('--primary-400', palette.primary400);
        root.style.setProperty('--primary-500', color);
        root.style.setProperty('--primary-600', palette.primary600);
        root.style.setProperty('--primary-700', palette.primary700);
        root.style.setProperty('--primary-800', palette.primary800);
        root.style.setProperty('--primary-900', palette.primary900);
        
        // Update common color variables for other components
        root.style.setProperty('--primary-color', color);
        root.style.setProperty('--accent-color', palette.primary400);
        root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        root.style.setProperty('--accent-rgb', this.hexToRgbString(palette.primary400));
        
        // Update gradient variables (important for general components)
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${color}, ${palette.primary600})`);
        root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${palette.primary400}, ${palette.primary500})`);
        
        // ✨ IMPORTANT: Update welcome section specific variables
        root.style.setProperty('--welcome-bg-start', color);
        root.style.setProperty('--welcome-bg-end', palette.primary700);
        root.style.setProperty('--welcome-accent-1', palette.primary400);
        root.style.setProperty('--welcome-accent-2', palette.primary300);
        root.style.setProperty('--welcome-accent-3', palette.primary600);
        root.style.setProperty('--welcome-accent-4', palette.primary500);
        
        // Update text colors to match theme (fixes purple in upcoming events)
        root.style.setProperty('--text-muted', palette.primary300);
        root.style.setProperty('--text-tertiary', palette.primary400);
        
        // Update focus and interaction colors
        root.style.setProperty('--focus-ring', color);
        root.style.setProperty('--border-primary', palette.primary200);
        
        // Save to localStorage
        localStorage.setItem('userColor', color);
        
        // Force repaint
        document.body.offsetHeight;
        
        // Re-render to update the checkmarks
        setTimeout(() => this.render(), 50);
        
        console.log('🎨 Color applied successfully including welcome section and upcoming events:', color);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 99, g: 102, b: 241 }; // fallback
    }

    hexToRgbString(hex) {
        const rgb = this.hexToRgb(hex);
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0; // achromatic
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
        
        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    generateColorPalette(hsl) {
        const { h, s } = hsl;
        
        return {
            primary50: this.hslToHex(h, Math.max(s - 40, 10), 96),
            primary100: this.hslToHex(h, Math.max(s - 20, 20), 92),
            primary200: this.hslToHex(h, s, 85),
            primary300: this.hslToHex(h, s, 75),
            primary400: this.hslToHex(h, s, 65),
            primary500: this.hslToHex(h, s, 55), // base color
            primary600: this.hslToHex(h, s, 45),
            primary700: this.hslToHex(h, s, 35),
            primary800: this.hslToHex(h, s, 25),
            primary900: this.hslToHex(h, s, 15)
        };
    }
}

customElements.define('app-header', Header); 