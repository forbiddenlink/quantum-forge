// Command Palette Component
class CommandPalette extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.commands = [];
        this.recentCommands = [];
        this.searchTerm = '';
        this.selectedIndex = 0;
        this.maxRecentCommands = 5;
    }

    connectedCallback() {
        this.loadCommands();
        this.loadRecentCommands();
        this.render();
        this.setupEventListeners();
    }

    loadCommands() {
        // In a real app, this could be loaded from a configuration file or API
        this.commands = [
            {
                id: 'create-task',
                title: 'Create New Task',
                description: 'Create a new task or to-do item',
                category: 'Tasks',
                icon: 'plus-circle',
                shortcut: '⌘ + T',
                action: () => this.createTask()
            },
            {
                id: 'schedule-meeting',
                title: 'Schedule Meeting',
                description: 'Schedule a new meeting with team members',
                category: 'Calendar',
                icon: 'calendar',
                shortcut: '⌘ + M',
                action: () => this.scheduleMeeting()
            },
            {
                id: 'search-docs',
                title: 'Search Documents',
                description: 'Search through all documents and files',
                category: 'Documents',
                icon: 'search',
                shortcut: '⌘ + F',
                action: () => this.searchDocuments()
            },
            {
                id: 'toggle-theme',
                title: 'Toggle Dark Mode',
                description: 'Switch between light and dark theme',
                category: 'Preferences',
                icon: 'moon',
                shortcut: '⌘ + D',
                action: () => this.toggleTheme()
            },
            {
                id: 'view-notifications',
                title: 'View Notifications',
                description: 'Check your recent notifications',
                category: 'Notifications',
                icon: 'bell',
                shortcut: '⌘ + N',
                action: () => this.viewNotifications()
            }
        ];
    }

    loadRecentCommands() {
        const saved = localStorage.getItem('recentCommands');
        this.recentCommands = saved ? JSON.parse(saved) : [];
    }

    saveRecentCommands() {
        localStorage.setItem('recentCommands', JSON.stringify(this.recentCommands));
    }

    addToRecentCommands(commandId) {
        this.recentCommands = [
            commandId,
            ...this.recentCommands.filter(id => id !== commandId)
        ].slice(0, this.maxRecentCommands);
        this.saveRecentCommands();
    }

    render() {
        this.innerHTML = `
            <div class="command-palette ${this.isOpen ? 'active' : ''}">
                <div class="palette-container">
                    <div class="palette-header">
                        <div class="search-container">
                            <input type="text" 
                                class="search-input" 
                                placeholder="Type a command or search..."
                                value="${this.searchTerm}"
                                autofocus>
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <button class="close-btn" aria-label="Close command palette">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div class="commands-list">
                        ${this.renderCommands()}
                    </div>

                    <div class="palette-footer">
                        <div class="shortcuts-help">
                            <span class="shortcut-hint">↑↓ to navigate</span>
                            <span class="shortcut-hint">↵ to select</span>
                            <span class="shortcut-hint">esc to close</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderCommands() {
        const filteredCommands = this.filterCommands();
        
        if (filteredCommands.length === 0) {
            return this.renderNoResults();
        }

        const recentCommands = this.recentCommands
            .map(id => this.commands.find(cmd => cmd.id === id))
            .filter(Boolean);

        return `
            ${recentCommands.length > 0 ? `
                <div class="command-category">
                    <h3>Recent Commands</h3>
                    ${recentCommands.map(cmd => this.renderCommandItem(cmd)).join('')}
                </div>
            ` : ''}
            
            ${this.groupCommandsByCategory(filteredCommands)
                .map(([category, commands]) => `
                    <div class="command-category">
                        <h3>${category}</h3>
                        ${commands.map(cmd => this.renderCommandItem(cmd)).join('')}
                    </div>
                `).join('')}
        `;
    }

    renderCommandItem(command) {
        return `
            <div class="command-item" data-command-id="${command.id}">
                <div class="command-icon">
                    ${this.getIconSvg(command.icon)}
                </div>
                <div class="command-content">
                    <div class="command-title">${this.highlightMatch(command.title)}</div>
                    <div class="command-description">${command.description}</div>
                </div>
                ${command.shortcut ? `
                    <div class="command-shortcut">${command.shortcut}</div>
                ` : ''}
            </div>
        `;
    }

    renderNoResults() {
        return `
            <div class="no-results">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <h3>No matching commands found</h3>
                <p>Try searching for something else</p>
            </div>
        `;
    }

    highlightMatch(text) {
        if (!this.searchTerm) return text;
        
        const regex = new RegExp(`(${this.searchTerm})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    filterCommands() {
        if (!this.searchTerm) return this.commands;

        const searchTerms = this.searchTerm.toLowerCase().split(' ');
        return this.commands.filter(command => {
            const searchString = `${command.title} ${command.description} ${command.category}`.toLowerCase();
            return searchTerms.every(term => searchString.includes(term));
        });
    }

    groupCommandsByCategory(commands) {
        const groups = commands.reduce((acc, cmd) => {
            if (!acc.has(cmd.category)) {
                acc.set(cmd.category, []);
            }
            acc.get(cmd.category).push(cmd);
            return acc;
        }, new Map());

        return Array.from(groups.entries());
    }

    getIconSvg(iconName) {
        const icons = {
            'plus-circle': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
            `,
            'calendar': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
            `,
            'search': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            `,
            'moon': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `,
            'bell': `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
            `
        };
        return icons[iconName] || icons['search'];
    }

    setupEventListeners() {
        // Toggle palette with keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                this.togglePalette();
            }
        });

        // Close button
        const closeBtn = this.querySelector('.close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePalette());
        }

        // Search input
        const searchInput = this.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.selectedIndex = 0;
                this.render();
            });

            searchInput.addEventListener('keydown', (e) => {
                this.handleKeyboardNavigation(e);
            });
        }

        // Command clicks
        this.querySelectorAll('.command-item').forEach(item => {
            item.addEventListener('click', () => {
                const commandId = item.dataset.commandId;
                this.executeCommand(commandId);
            });
        });
    }

    handleKeyboardNavigation(e) {
        const commands = this.filterCommands();
        
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                this.updateSelection();
                break;
            
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(commands.length - 1, this.selectedIndex + 1);
                this.updateSelection();
                break;
            
            case 'Enter':
                e.preventDefault();
                const selectedCommand = commands[this.selectedIndex];
                if (selectedCommand) {
                    this.executeCommand(selectedCommand.id);
                }
                break;
            
            case 'Escape':
                e.preventDefault();
                this.closePalette();
                break;
        }
    }

    updateSelection() {
        this.querySelectorAll('.command-item').forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    executeCommand(commandId) {
        const command = this.commands.find(cmd => cmd.id === commandId);
        if (command) {
            this.addToRecentCommands(commandId);
            this.closePalette();
            command.action();
        }
    }

    togglePalette() {
        this.isOpen = !this.isOpen;
        this.searchTerm = '';
        this.selectedIndex = 0;
        this.render();
        
        if (this.isOpen) {
            this.querySelector('.search-input')?.focus();
        }
    }

    closePalette() {
        this.isOpen = false;
        this.render();
    }

    // Command Actions
    createTask() {
        // Implementation for creating a new task
        console.log('Creating new task...');
    }

    scheduleMeeting() {
        // Implementation for scheduling a meeting
        console.log('Scheduling meeting...');
    }

    searchDocuments() {
        // Implementation for searching documents
        console.log('Searching documents...');
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    viewNotifications() {
        // Implementation for viewing notifications
        console.log('Viewing notifications...');
    }
}

customElements.define('command-palette', CommandPalette); 