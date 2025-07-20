// Header Component
class Header extends HTMLElement {
    constructor() {
        super();
        this.notifications = [];
        this.unreadCount = 0;
        this.userMenuOpen = false;
        this.notificationsOpen = false;
    }

    connectedCallback() {
        this.loadNotifications();
        this.render();
        this.setupEventListeners();
        this.startNotificationPolling();
    }

    disconnectedCallback() {
        if (this.notificationInterval) {
            clearInterval(this.notificationInterval);
        }
    }

    handleClickOutside(event) {
        // Get references to menus
        const userMenuButton = this.querySelector('#toggleUserMenu');
        const userDropdown = this.querySelector('.user-dropdown');
        const notificationsButton = this.querySelector('#toggleNotifications');
        const notificationsDropdown = this.querySelector('.notifications-dropdown');

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
                    
                    <button class="menu-button" aria-label="Toggle navigation menu" aria-expanded="${document.body.classList.contains('nav-open')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div class="header-right">
                    <button class="action-button theme-toggle-btn" id="toggleTheme" aria-label="Toggle dark mode">
                        <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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
                        <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>

                    <div class="notifications-menu">
                        <button class="action-button ${this.notificationsOpen ? 'active' : ''}" 
                                id="toggleNotifications" 
                                aria-label="View notifications" 
                                aria-expanded="${this.notificationsOpen}"
                                aria-haspopup="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                            </svg>
                            ${this.unreadCount > 0 ? `
                                <span class="notification-badge" role="status" aria-label="${this.unreadCount} unread notifications">${this.unreadCount}</span>
                            ` : ''}
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
        // Close menus when clicking anywhere on the document
        document.addEventListener('click', (event) => {
            const isClickInsideUserMenu = event.target.closest('.user-menu');
            const isClickInsideNotifications = event.target.closest('.notifications-menu');
            
            if (!isClickInsideUserMenu && !isClickInsideNotifications) {
                this.userMenuOpen = false;
                this.notificationsOpen = false;
                this.render();
            }
        });

        // User menu toggle
        this.addEventListener('click', (event) => {
            const userMenuButton = event.target.closest('#toggleUserMenu');
            const notificationsButton = event.target.closest('#toggleNotifications');

            if (userMenuButton) {
                event.stopPropagation();
                this.userMenuOpen = !this.userMenuOpen;
                this.notificationsOpen = false;
                this.render();
            }

            if (notificationsButton) {
                event.stopPropagation();
                this.notificationsOpen = !this.notificationsOpen;
                this.userMenuOpen = false;
                this.render();
            }
        });

        // Theme toggle
        const themeToggle = this.querySelector('#toggleTheme');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.toggleTheme) {
                    window.toggleTheme();
                } else {
                    const html = document.documentElement;
                    const currentTheme = html.getAttribute('data-theme') || 'light';
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    html.setAttribute('data-theme', newTheme);
                    localStorage.setItem('theme', newTheme);
                }
            });
        }

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
}

customElements.define('app-header', Header); 