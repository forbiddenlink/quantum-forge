// Command Palette Component
class CommandPalette extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.selectedIndex = 0;
        this.commands = [];
        this.filteredCommands = [];
        this.searchQuery = '';
    }

    connectedCallback() {
        this.initializeCommands();
        this.render();
        this.setupEventListeners();
    }

    initializeCommands() {
        this.commands = [
            {
                id: 'dashboard',
                title: 'Go to Dashboard',
                description: 'Navigate to the main dashboard',
                icon: 'home',
                category: 'Navigation',
                shortcut: '⌘D',
                action: () => window.location.href = '/'
            },
            {
                id: 'search',
                title: 'Search Everything',
                description: 'Search across all content and people',
                icon: 'search',
                category: 'Search',
                shortcut: '⌘K',
                action: () => this.focusSearch()
            },
            {
                id: 'tasks',
                title: 'View My Tasks',
                description: 'See your assigned tasks and projects',
                icon: 'check-square',
                category: 'Productivity',
                shortcut: '⌘T',
                action: () => window.location.href = '/pages/tasks.html'
            },
            {
                id: 'calendar',
                title: 'Open Calendar',
                description: 'View and manage your schedule',
                icon: 'calendar',
                category: 'Productivity',
                shortcut: '⌘C',
                action: () => window.location.href = '/pages/calendar.html'
            },
            {
                id: 'team',
                title: 'Team Directory',
                description: 'Browse team members and contact info',
                icon: 'users',
                category: 'People',
                shortcut: '⌘U',
                action: () => window.location.href = '/pages/team.html'
            },
            {
                id: 'projects',
                title: 'Project Management',
                description: 'View and manage active projects',
                icon: 'folder',
                category: 'Productivity',
                shortcut: '⌘P',
                action: () => window.location.href = '/pages/projects.html'
            },
            {
                id: 'documents',
                title: 'Document Library',
                description: 'Access company documents and files',
                icon: 'file-text',
                category: 'Resources',
                shortcut: '⌘F',
                action: () => window.location.href = '/pages/documents.html'
            },
            {
                id: 'resources',
                title: 'Resources Hub',
                description: 'Tools, templates, and helpful links',
                icon: 'tool',
                category: 'Resources',
                shortcut: '⌘R',
                action: () => window.location.href = '/pages/resources.html'
            },
            {
                id: 'training',
                title: 'Training Center',
                description: 'Learning materials and courses',
                icon: 'book-open',
                category: 'Learning',
                shortcut: '⌘L',
                action: () => window.location.href = '/pages/training.html'
            },
            {
                id: 'helpdesk',
                title: 'Help Desk',
                description: 'Get support and report issues',
                icon: 'help-circle',
                category: 'Support',
                shortcut: '⌘H',
                action: () => window.location.href = '/pages/helpdesk.html'
            },
            {
                id: 'handbook',
                title: 'Company Handbook',
                description: 'Policies, procedures, and guidelines',
                icon: 'book',
                category: 'Resources',
                shortcut: '⌘B',
                action: () => window.location.href = '/pages/handbook.html'
            },
            {
                id: 'settings',
                title: 'Settings',
                description: 'Manage your preferences and profile',
                icon: 'settings',
                category: 'System',
                shortcut: '⌘,',
                action: () => window.location.href = '/pages/settings.html'
            },
            {
                id: 'notifications',
                title: 'Notifications',
                description: 'View your recent notifications',
                icon: 'bell',
                category: 'System',
                shortcut: '⌘N',
                action: () => this.showNotifications()
            },
            {
                id: 'profile',
                title: 'My Profile',
                description: 'View and edit your profile',
                icon: 'user',
                category: 'System',
                shortcut: '⌘U',
                action: () => this.showProfile()
            },
            {
                id: 'logout',
                title: 'Sign Out',
                description: 'Log out of your account',
                icon: 'log-out',
                category: 'System',
                shortcut: '⌘Q',
                action: () => this.logout()
            }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="command-palette">
                <div class="palette-container">
                    <div class="palette-header">
                        <div class="search-container">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                            </svg>
                            <input type="text" class="search-input" placeholder="Search commands..." id="commandSearch">
                        </div>
                        <button class="close-btn" id="closePalette">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    <div class="commands-list" id="commandsList">
                        <!-- Commands will be rendered here -->
                    </div>
                    <div class="palette-footer">
                        <div class="shortcuts-help">
                            <span class="shortcut-hint">⌘K</span> to search
                            <span class="shortcut-hint">↑↓</span> to navigate
                            <span class="shortcut-hint">Enter</span> to execute
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.renderCommands();
    }

    renderCommands() {
        this.filteredCommands = [...this.commands];
        this.renderFilteredCommands();
    }

    renderFilteredCommands() {
        const commandsList = this.querySelector('#commandsList');
        
        if (this.filteredCommands.length === 0) {
            commandsList.innerHTML = `
                <div class="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="M21 21l-4.35-4.35"></path>
                    </svg>
                    <h3>No commands found</h3>
                    <p>Try a different search term</p>
                </div>
            `;
            return;
        }

        commandsList.innerHTML = this.filteredCommands.map((command, index) => this.renderCommandItem(command, index)).join('');
    }

    renderCommandItem(command, index) {
        const icons = {
            home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`,
            search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
            </svg>`,
            'check-square': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>`,
            calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`,
            users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>`,
            'file-text': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>`,
            tool: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>`,
            'book-open': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>`,
            'help-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`,
            book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>`,
            settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>`,
            bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>`,
            user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
            </svg>`,
            'log-out': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>`
        };

        return `
            <div class="command-item ${index === this.selectedIndex ? 'selected' : ''}" data-command-id="${command.id}">
                <div class="command-icon">
                    ${icons[command.icon] || icons.settings}
                </div>
                <div class="command-content">
                    <div class="command-title">${command.title}</div>
                    <div class="command-description">${command.description}</div>
                    <div class="command-category">${command.category}</div>
                </div>
                <div class="command-shortcut">${command.shortcut}</div>
            </div>
        `;
    }

    setupEventListeners() {
        const searchInput = this.querySelector('#commandSearch');
        const closeBtn = this.querySelector('#closePalette');
        const commandsList = this.querySelector('#commandsList');

        // Search input
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.filterCommands();
        });

        // Close button
        closeBtn.addEventListener('click', () => {
            this.close();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
            
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Command selection
        commandsList.addEventListener('click', (e) => {
            const commandItem = e.target.closest('.command-item');
            if (commandItem) {
                const commandId = commandItem.dataset.commandId;
                this.executeCommand(commandId);
            }
        });

        // Keyboard navigation within palette
        this.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
                    this.updateSelection();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                    this.updateSelection();
                    break;
                case 'Enter':
                    e.preventDefault();
                    this.executeSelectedCommand();
                    break;
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.querySelector('.command-palette').classList.add('active');
        this.querySelector('#commandSearch').focus();
        this.selectedIndex = 0;
        this.updateSelection();
    }

    close() {
        this.isOpen = false;
        this.querySelector('.command-palette').classList.remove('active');
        this.searchQuery = '';
        this.querySelector('#commandSearch').value = '';
        this.filterCommands();
    }

    filterCommands() {
        if (!this.searchQuery) {
            this.filteredCommands = [...this.commands];
        } else {
            this.filteredCommands = this.commands.filter(command =>
                command.title.toLowerCase().includes(this.searchQuery) ||
                command.description.toLowerCase().includes(this.searchQuery) ||
                command.category.toLowerCase().includes(this.searchQuery)
            );
        }
        
        this.selectedIndex = 0;
        this.renderFilteredCommands();
        this.updateSelection();
    }

    updateSelection() {
        const items = this.querySelectorAll('.command-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    executeSelectedCommand() {
        if (this.filteredCommands[this.selectedIndex]) {
            const command = this.filteredCommands[this.selectedIndex];
            this.executeCommand(command.id);
        }
    }

    executeCommand(commandId) {
        const command = this.commands.find(c => c.id === commandId);
        if (command) {
            command.action();
            this.close();
        }
    }

    focusSearch() {
        const searchInput = document.querySelector('#searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    showNotifications() {
        console.log('Show notifications');
        // Implement notifications functionality
    }

    showProfile() {
        console.log('Show profile');
        // Implement profile functionality
    }

    logout() {
        console.log('Logout');
        // Implement logout functionality
    }
}

customElements.define('command-palette', CommandPalette); 