// Sidebar Component
class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.activeItem = 'dashboard';
        this.favorites = new Set(['calendar', 'team', 'projects']);
        this.collapsed = false;
    }

    connectedCallback() {
        // Load collapsed state from localStorage
        const savedCollapsed = localStorage.getItem('sidebarCollapsed');
        this.collapsed = savedCollapsed === 'true';
        
        // Apply initial state without animation
        if (this.collapsed) {
            document.documentElement.style.setProperty('--sidebar-transition', 'none');
            document.body.classList.add('sidebar-collapsed');
            // Force reflow
            document.body.offsetHeight;
            document.documentElement.style.removeProperty('--sidebar-transition');
        }
        
        this.render();
        this.setupEventListeners();
        this.loadUserPreferences();
    }

    loadUserPreferences() {
        // In a real app, this would load from backend
        const mockPreferences = {
            favorites: ['calendar', 'team', 'projects'],
            recentlyVisited: [
                { id: 'docs-123', title: 'API Documentation', type: 'document', path: '/documents' },
                { id: 'proj-456', title: 'Project Alpha', type: 'project', path: '/projects' },
                { id: 'team-789', title: 'Design Team', type: 'team', path: '/team' }
            ]
        };

        this.favorites = new Set(mockPreferences.favorites);
        this.recentlyVisited = mockPreferences.recentlyVisited;
    }

    render() {
        this.innerHTML = `
            <nav class="sidebar ${this.collapsed ? 'collapsed' : ''}" role="navigation" aria-label="Main navigation">
                <div class="sidebar-header">
                    <button class="collapse-btn" aria-label="${this.collapsed ? 'Expand' : 'Collapse'} sidebar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6"></path>
                        </svg>
                    </button>
                </div>

                <div class="nav-sections">
                    <!-- Main Navigation -->
                    <div class="nav-section">
                        <div class="nav-section-header">
                            <h2 class="nav-section-title">Main</h2>
                        </div>
                        <ul class="nav-list" role="menu">
                            <li class="nav-item" role="none">
                                <a href="/index.html" class="nav-link ${this.activeItem === 'dashboard' ? 'active' : ''}" role="menuitem" data-page="dashboard">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <span class="nav-text">Dashboard</span>
                                    <span class="nav-badge">New</span>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/projects.html" class="nav-link ${this.activeItem === 'projects' ? 'active' : ''}" role="menuitem" data-page="projects">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                    <span class="nav-text">Projects</span>
                                    <button class="favorite-btn ${this.favorites.has('projects') ? 'active' : ''}" data-page="projects">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/team.html" class="nav-link ${this.activeItem === 'team' ? 'active' : ''}" role="menuitem" data-page="team">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <span class="nav-text">Team</span>
                                    <button class="favorite-btn ${this.favorites.has('team') ? 'active' : ''}" data-page="team">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/calendar.html" class="nav-link ${this.activeItem === 'calendar' ? 'active' : ''}" role="menuitem" data-page="calendar">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span class="nav-text">Calendar</span>
                                    <button class="favorite-btn ${this.favorites.has('calendar') ? 'active' : ''}" data-page="calendar">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Resources Section -->
                    <div class="nav-section">
                        <div class="nav-section-header">
                            <h2 class="nav-section-title">Resources</h2>
                        </div>
                        <ul class="nav-list" role="menu">
                            <li class="nav-item" role="none">
                                <a href="/pages/documents.html" class="nav-link ${this.activeItem === 'documents' ? 'active' : ''}" role="menuitem" data-page="documents">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                        <polyline points="13 2 13 9 20 9"></polyline>
                                    </svg>
                                    <span class="nav-text">Documents</span>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/resources.html" class="nav-link ${this.activeItem === 'resources' ? 'active' : ''}" role="menuitem" data-page="resources">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    <span class="nav-text">Resources</span>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/training.html" class="nav-link ${this.activeItem === 'training' ? 'active' : ''}" role="menuitem" data-page="training">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                    </svg>
                                    <span class="nav-text">Learning</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Support Section -->
                    <div class="nav-section">
                        <div class="nav-section-header">
                            <h2 class="nav-section-title">Support</h2>
                        </div>
                        <ul class="nav-list" role="menu">
                            <li class="nav-item" role="none">
                                <a href="/pages/helpdesk.html" class="nav-link ${this.activeItem === 'helpdesk' ? 'active' : ''}" role="menuitem" data-page="helpdesk">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                    </svg>
                                    <span class="nav-text">Help Desk</span>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/handbook.html" class="nav-link ${this.activeItem === 'handbook' ? 'active' : ''}" role="menuitem" data-page="handbook">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    <span class="nav-text">Handbook</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Recently Visited -->
                    <div class="nav-section">
                        <div class="nav-section-header">
                            <h2 class="nav-section-title">Recently Visited</h2>
                        </div>
                        <ul class="nav-list recent-list" role="menu">
                            ${this.recentlyVisited?.map(item => `
                                <li class="nav-item" role="none">
                                    <a href="${item.path}" class="nav-link recent-link" role="menuitem">
                                        ${this.getItemIcon(item.type)}
                                        <span class="nav-text">${item.title}</span>
                                    </a>
                                </li>
                            `).join('') || ''}
                        </ul>
                    </div>
                </div>

                <!-- Sidebar Footer -->
                <div class="sidebar-footer">
                    <button class="help-button" aria-label="Get help">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                        <span class="help-text">Need Help?</span>
                    </button>
                </div>
            </nav>
        `;
    }

    getItemIcon(type) {
        const icons = {
            document: `
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                </svg>
            `,
            project: `
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            `,
            team: `
                <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                </svg>
            `
        };
        return icons[type] || icons.document;
    }

    setupEventListeners() {
        // Collapse button
        const collapseBtn = this.querySelector('.collapse-btn');
        collapseBtn?.addEventListener('click', () => {
            this.collapsed = !this.collapsed;
            document.body.classList.toggle('sidebar-collapsed', this.collapsed);
            localStorage.setItem('sidebarCollapsed', this.collapsed);
        });

        // Navigation items
        this.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const page = link.dataset.page;
                if (page) {
                    this.activeItem = page;
                    this.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        });

        // Favorite buttons
        this.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const page = btn.dataset.page;
                if (this.favorites.has(page)) {
                    this.favorites.delete(page);
                } else {
                    this.favorites.add(page);
                }
                this.render();
            });
        });

        // Help button
        const helpButton = this.querySelector('.help-button');
        helpButton?.addEventListener('click', () => {
            // Create help dialog if it doesn't exist
            let helpDialog = document.querySelector('help-dialog');
            if (!helpDialog) {
                helpDialog = document.createElement('help-dialog');
                document.body.appendChild(helpDialog);
            }
            helpDialog.open();
        });
    }
}

customElements.define('app-sidebar', Sidebar); 