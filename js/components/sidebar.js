// Sidebar Component
class Sidebar extends HTMLElement {
    constructor() {
        super();
        this.activeItem = 'dashboard';
        this.favorites = new Set(['calendar', 'team', 'projects']);
        this.collapsed = false;
    }

    connectedCallback() {
        console.log('🚀 Sidebar component connecting...');
        
        // Load collapsed state from localStorage
        const savedCollapsed = localStorage.getItem('sidebarCollapsed');
        this.collapsed = savedCollapsed === 'true';
        console.log('📱 Sidebar collapsed state from storage:', this.collapsed);
        
        // Detect current page from URL
        this.detectCurrentPage();
        
        // Apply initial state without animation
        if (this.collapsed) {
            document.documentElement.style.setProperty('--sidebar-transition', 'none');
            document.body.classList.add('sidebar-collapsed');
            // Force reflow
            document.body.offsetHeight;
            document.documentElement.style.removeProperty('--sidebar-transition');
            console.log('📱 Applied collapsed state to body');
        }
        
        this.loadUserPreferences();
        this.render();
        this.setupEventListeners();
        
        console.log('✅ Sidebar component connected successfully');
        
        // Ensure collapse button is always visible
        setTimeout(() => {
            const collapseBtn = this.querySelector('.collapse-btn');
            if (collapseBtn) {
                collapseBtn.style.display = 'flex';
                collapseBtn.style.visibility = 'visible';
                collapseBtn.setAttribute('title', 'Click to toggle sidebar');
                console.log('👁️ Collapse button visibility ensured');
            }
        }, 100);
        
        // Add click handler to entire sidebar header as backup
        setTimeout(() => {
            const header = this.querySelector('.sidebar-header');
            if (header) {
                header.addEventListener('dblclick', () => {
                    console.log('🔄 Double-click sidebar toggle');
                    this.collapsed = !this.collapsed;
                    document.body.classList.toggle('sidebar-collapsed', this.collapsed);
                    localStorage.setItem('sidebarCollapsed', this.collapsed);
                });
                console.log('🔄 Double-click toggle added to sidebar header');
            }
        }, 200);
    }

    detectCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        // Map filenames to page identifiers
        const pageMap = {
            'index.html': 'dashboard',
            '': 'dashboard', // Root path
            'projects.html': 'projects',
            'tasks.html': 'tasks',
            'team.html': 'team',
            'calendar.html': 'calendar',
            'analytics.html': 'analytics',
            'collaboration.html': 'collaboration',
            'polls.html': 'polls',
            'culture.html': 'culture',
            'office.html': 'office',
            'documents.html': 'documents',
            'resources.html': 'knowledge',
            'resources.html': 'resources',
            'training.html': 'training',
            'helpdesk.html': 'helpdesk',
            'handbook.html': 'handbook'
        };
        
        this.activeItem = pageMap[filename] || 'dashboard';
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

    createCollapseButton() {
        const header = this.querySelector('.sidebar-header');
        if (header && !header.querySelector('.collapse-btn')) {
            const collapseBtn = document.createElement('button');
            collapseBtn.className = 'collapse-btn';
            collapseBtn.setAttribute('aria-label', 'Toggle sidebar');
            collapseBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            `;
            
            header.appendChild(collapseBtn);
            
            // Add event listener to the new button
            collapseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Manual collapse button clicked, current state:', this.collapsed);
                
                this.collapsed = !this.collapsed;
                document.body.classList.toggle('sidebar-collapsed', this.collapsed);
                localStorage.setItem('sidebarCollapsed', this.collapsed);
                
                console.log('✅ Sidebar toggled via manual button, new state:', this.collapsed);
            });
            
            console.log('✅ Collapse button created manually');
        }
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
                                <a href="/pages/tasks.html" class="nav-link ${this.activeItem === 'tasks' ? 'active' : ''}" role="menuitem" data-page="tasks">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 11l3 3L22 4"></path>
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <span class="nav-text">Tasks</span>
                                    <button class="favorite-btn ${this.favorites.has('tasks') ? 'active' : ''}" data-page="tasks">
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
                                    <button class="favorite-btn ${this.favorites.has('team') ? 'active' : ''}" data-page="team" aria-label="${this.favorites.has('team') ? 'Remove team from favorites' : 'Add team to favorites'}" aria-pressed="${this.favorites.has('team')}">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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
                                    <button class="favorite-btn ${this.favorites.has('calendar') ? 'active' : ''}" data-page="calendar" aria-label="${this.favorites.has('calendar') ? 'Remove calendar from favorites' : 'Add calendar to favorites'}" aria-pressed="${this.favorites.has('calendar')}">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/analytics.html" class="nav-link ${this.activeItem === 'analytics' ? 'active' : ''}" role="menuitem" data-page="analytics">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="20" x2="18" y2="10"></line>
                                        <line x1="12" y1="20" x2="12" y2="4"></line>
                                        <line x1="6" y1="20" x2="6" y2="14"></line>
                                    </svg>
                                    <span class="nav-text">Analytics</span>
                                    <button class="favorite-btn ${this.favorites.has('analytics') ? 'active' : ''}" data-page="analytics">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <!-- Collaboration Section -->
                    <div class="nav-section">
                        <div class="nav-section-header">
                            <h2 class="nav-section-title">Collaboration</h2>
                        </div>
                        <ul class="nav-list" role="menu">
                            <li class="nav-item" role="none">
                                <a href="/pages/collaboration.html" class="nav-link ${this.activeItem === 'collaboration' ? 'active' : ''}" role="menuitem" data-page="collaboration">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <span class="nav-text">Collaboration Hub</span>
                                    <button class="favorite-btn ${this.favorites.has('collaboration') ? 'active' : ''}" data-page="collaboration">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/polls.html" class="nav-link ${this.activeItem === 'polls' ? 'active' : ''}" role="menuitem" data-page="polls">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                        <path d="M8 12h8"></path>
                                        <path d="M8 16h6"></path>
                                    </svg>
                                    <span class="nav-text">Polls & Feedback</span>
                                    <button class="favorite-btn ${this.favorites.has('polls') ? 'active' : ''}" data-page="polls">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/culture.html" class="nav-link ${this.activeItem === 'culture' ? 'active' : ''}" role="menuitem" data-page="culture">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span class="nav-text">Company Culture</span>
                                    <button class="favorite-btn ${this.favorites.has('culture') ? 'active' : ''}" data-page="culture">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
                                </a>
                            </li>
                            <li class="nav-item" role="none">
                                <a href="/pages/office.html" class="nav-link ${this.activeItem === 'office' ? 'active' : ''}" role="menuitem" data-page="office">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                    <span class="nav-text">Office Map</span>
                                    <button class="favorite-btn ${this.favorites.has('office') ? 'active' : ''}" data-page="office">
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
                                <a href="/pages/resources.html" class="nav-link ${this.activeItem === 'knowledge' ? 'active' : ''}" role="menuitem" data-page="knowledge">
                                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="3"></circle>
                                        <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                                    </svg>
                                    <span class="nav-text">Knowledge Hub</span>
                                    <button class="favorite-btn ${this.favorites.has('knowledge') ? 'active' : ''}" data-page="knowledge">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </button>
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

    setupFloatingToggle() {
        console.log('🎯 Sidebar toggle handler setup (button is now in sidebar header)');
        
        // Add keyboard shortcut: Ctrl+B to toggle sidebar
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                console.log('⌨️ Keyboard shortcut (Ctrl+B) used to toggle sidebar');
                this.toggleSidebar();
            }
        });
        
        console.log('⌨️ Keyboard shortcut added: Ctrl+B');
        
        // Show help tooltip when sidebar is first collapsed
        this.showCollapseHelp();
    }
    
    showCollapseHelp() {
        if (document.body.classList.contains('sidebar-collapsed')) {
            // Show a temporary notification about how to reopen sidebar
            setTimeout(() => {
                const helpDiv = document.createElement('div');
                helpDiv.style.cssText = `
                    position: fixed;
                    top: 80px;
                    left: 80px;
                    background: var(--bg-elevated);
                    color: var(--text-primary);
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 12px;
                    z-index: 1002;
                    max-width: 200px;
                    box-shadow: var(--shadow-lg);
                    border: 1px solid var(--border-color);
                    border-left: 4px solid var(--primary-500);
                `;
                helpDiv.innerHTML = `
                    <strong>Sidebar Collapsed</strong><br>
                    • Click the arrow button in the narrow sidebar<br>
                    • Press Ctrl+B<br>
                    • Call window.toggleSidebar()
                `;
                
                document.body.appendChild(helpDiv);
                
                // Auto-remove after 5 seconds
                setTimeout(() => {
                    if (helpDiv.parentNode) {
                        helpDiv.remove();
                    }
                }, 5000);
                
                // Remove on click
                helpDiv.addEventListener('click', () => helpDiv.remove());
                
                console.log('💡 Sidebar help tooltip shown');
            }, 1000);
        }
    }

    setupEventListeners() {
        // Collapse button
        const collapseBtn = this.querySelector('.collapse-btn');
        console.log('🔧 Setting up sidebar collapse button:', collapseBtn);
        
        if (collapseBtn) {
            collapseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('🔄 Sidebar toggle clicked, current state:', this.collapsed);
                
                this.collapsed = !this.collapsed;
                document.body.classList.toggle('sidebar-collapsed', this.collapsed);
                localStorage.setItem('sidebarCollapsed', this.collapsed);
                
                console.log('✅ Sidebar toggled, new state:', this.collapsed);
                console.log('📱 Body classes:', document.body.className);
            });
        } else {
            console.error('❌ Sidebar collapse button not found!');
            // Try to find it with a more general selector
            const backupBtn = document.querySelector('.collapse-btn');
            console.log('🔍 Backup collapse button search:', backupBtn);
            
            // If still not found, create the button manually
            if (!backupBtn) {
                console.log('🔧 Creating collapse button manually...');
                this.createCollapseButton();
            }
        }

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

        // Mobile menu functionality
        this.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink && window.innerWidth <= 1024) {
                // Close mobile menu after navigation on mobile
                document.body.classList.remove('nav-open');
                announceToScreenReader(`Navigated to ${navLink.textContent.trim()}`);
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024 && 
                document.body.classList.contains('nav-open') && 
                !this.contains(e.target) && 
                !e.target.closest('.menu-button')) {
                document.body.classList.remove('nav-open');
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                document.body.classList.remove('nav-open');
            }
        });
    }

    setActivePage(page) {
        this.activeItem = page;
        // Update active states
        this.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === page) {
                link.classList.add('active');
            }
        });
        
        // Store current page in localStorage for persistence
        localStorage.setItem('currentPage', page);
    }
}

customElements.define('app-sidebar', Sidebar);

// Emergency global sidebar toggle function
window.toggleSidebar = function() {
    console.log('🚨 Emergency sidebar toggle called');
    const sidebar = document.querySelector('app-sidebar');
    if (sidebar) {
        const isCollapsed = document.body.classList.contains('sidebar-collapsed');
        document.body.classList.toggle('sidebar-collapsed', !isCollapsed);
        localStorage.setItem('sidebarCollapsed', !isCollapsed);
        console.log('✅ Emergency toggle completed. Collapsed:', !isCollapsed);
    } else {
        console.error('❌ Sidebar element not found');
    }
};

        console.log('🔧 Sidebar component loaded. Emergency toggle available: window.toggleSidebar()');
        console.log('✅ TOGGLE BUTTON FIXED: Now properly positioned in collapsed sidebar strip!');
        
        // Add floating toggle button click handler for collapsed state
        this.setupFloatingToggle(); 