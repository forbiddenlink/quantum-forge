// Header Component
class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <header class="header">
                <div class="header-left">
                    <a href="/" class="logo">
                        <div class="logo-icon">Q</div>
                        <span class="logo-text">Quantum Forge</span>
                    </a>
                    <button class="menu-button" aria-label="Toggle menu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 12h18M3 6h18M3 18h18"></path>
                        </svg>
                    </button>
                </div>

                <div class="header-right">
                    <button class="action-button" id="theme-toggle" aria-label="Toggle theme">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                    </button>

                    <button class="action-button" id="notifications" aria-label="Notifications">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                        </svg>
                        <div class="notification-badge"></div>
                    </button>

                    <button class="action-button" id="command-palette-trigger" aria-label="Open command palette">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z"></path>
                        </svg>
                    </button>

                    <div class="user-menu">
                        <button class="user-button" id="user-menu-toggle" aria-label="User menu">
                            <div class="user-avatar">L</div>
                            <span class="user-name">Liz</span>
                            <svg class="chevron-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                        <div class="user-dropdown">
                            <div class="user-info">
                                <div class="user-avatar-large">L</div>
                                <div class="user-details">
                                    <div class="user-full-name">Liz Stein</div>
                                    <div class="user-email">liz.smith@quantumforge.com</div>
                                </div>
                            </div>
                            <div class="dropdown-divider"></div>
                            <a href="/pages/settings.html" class="dropdown-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Settings
                            </a>
                            <a href="/pages/profile.html" class="dropdown-item">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Profile
                            </a>
                            <div class="dropdown-divider"></div>
                            <button class="dropdown-item logout-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        `;
    }

    setupEventListeners() {
        const themeToggle = this.querySelector('#theme-toggle');
        const notificationsBtn = this.querySelector('#notifications');
        const commandPaletteTrigger = this.querySelector('#command-palette-trigger');
        const userMenuToggle = this.querySelector('#user-menu-toggle');
        const menuButton = this.querySelector('.menu-button');

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            // Use the global toggleTheme function from app.js
            if (typeof window.toggleTheme === 'function') {
                window.toggleTheme();
            } else {
                // Fallback to local implementation
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                // Add transition class
                document.body.classList.add('theme-transition');
                
                // Change theme on both html and body elements to ensure it works
                document.documentElement.setAttribute('data-theme', newTheme);
                document.body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update theme icon
                this.updateThemeIcon(newTheme);
                
                // Remove transition class after animation completes
                setTimeout(() => {
                    document.body.classList.remove('theme-transition');
                }, 300);
            }
        });

        // Notifications
        notificationsBtn.addEventListener('click', () => {
            console.log('Open notifications');
            // Implement notifications functionality
        });

        // Command palette
        commandPaletteTrigger.addEventListener('click', () => {
            const commandPalette = document.querySelector('command-palette');
            if (commandPalette) {
                commandPalette.open();
            }
        });

        // User menu
        userMenuToggle.addEventListener('click', () => {
            const userMenu = this.querySelector('.user-menu');
            const isOpen = userMenu.classList.contains('open');
            
            // Close any other open menus first
            document.querySelectorAll('.user-menu.open').forEach(menu => {
                if (menu !== userMenu) {
                    menu.classList.remove('open');
                }
            });
            
            // Toggle this menu
            userMenu.classList.toggle('open');
            
            // Close menu when clicking outside
            if (!isOpen) {
                setTimeout(() => {
                    document.addEventListener('click', function closeMenu(e) {
                        if (!userMenu.contains(e.target)) {
                            userMenu.classList.remove('open');
                            document.removeEventListener('click', closeMenu);
                        }
                    });
                }, 0);
            }
        });

        // Mobile menu
        menuButton.addEventListener('click', () => {
            console.log('Toggle mobile menu');
            // Implement mobile menu functionality
        });

        // Initialize theme
        this.initializeTheme();
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        
        // Set theme on both html and body elements
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        
        this.updateThemeIcon(savedTheme);
    }

    updateThemeIcon(theme) {
        const themeToggle = this.querySelector('#theme-toggle');
        const icon = themeToggle.querySelector('svg');
        
        if (theme === 'dark') {
            icon.innerHTML = `
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            `;
        } else {
            icon.innerHTML = `
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            `;
        }
    }
}

customElements.define('app-header', Header); 