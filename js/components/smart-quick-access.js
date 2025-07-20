// Smart Quick Access Component
class SmartQuickAccess extends HTMLElement {
    constructor() {
        super();
        this.userBehavior = this.loadUserBehavior();
        this.recommendations = [];
        this.frequentlyUsed = [];
    }

    connectedCallback() {
        this.migrateUserBehavior();
        this.analyzeUserBehavior();
        this.generateRecommendations();
        this.render();
        this.setupEventListeners();
        this.trackUsage();
    }

    migrateUserBehavior() {
        // Clear old data that contains technical paths
        const oldData = localStorage.getItem('userBehavior');
        if (oldData) {
            try {
                const parsed = JSON.parse(oldData);
                // Check if data contains technical paths
                const hasTechnicalPaths = Object.values(parsed).some(dayData => 
                    dayData.pageVisits && Object.keys(dayData.pageVisits).some(path => 
                        path.includes('/index.html') || path.includes('/pages/')
                    )
                );
                
                if (hasTechnicalPaths) {
                    // Clear old data and start fresh
                    localStorage.removeItem('userBehavior');
                    this.userBehavior = {};
                }
            } catch (e) {
                // If parsing fails, clear the data
                localStorage.removeItem('userBehavior');
                this.userBehavior = {};
            }
        }

        // If no data exists, create sample data for demonstration
        if (!localStorage.getItem('userBehavior')) {
            this.createSampleData();
        }
    }

    createSampleData() {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        this.userBehavior = {
            [today]: {
                pageVisits: {
                    'dashboard': 3,
                    'calendar': 2,
                    'documents': 1
                },
                actions: {
                    'join-standup': 1,
                    'review-progress': 1
                },
                lastVisit: new Date().toISOString()
            },
            [yesterday]: {
                pageVisits: {
                    'dashboard': 2,
                    'team': 3,
                    'projects': 2,
                    'calendar': 1
                },
                actions: {
                    'view-performance': 1,
                    'code-review': 1
                },
                lastVisit: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            },
            [twoDaysAgo]: {
                pageVisits: {
                    'dashboard': 1,
                    'documents': 4,
                    'resources': 2,
                    'helpdesk': 1
                },
                actions: {
                    'join-standup': 1
                },
                lastVisit: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        };

        this.saveUserBehavior();
    }

    loadUserBehavior() {
        return JSON.parse(localStorage.getItem('userBehavior') || '{}');
    }

    saveUserBehavior() {
        localStorage.setItem('userBehavior', JSON.stringify(this.userBehavior));
    }

    analyzeUserBehavior() {
        const now = new Date();
        const today = now.toISOString().split('T')[0];
        
        // Initialize today's data if it doesn't exist
        if (!this.userBehavior[today]) {
            this.userBehavior[today] = {
                pageVisits: {},
                timeSpent: {},
                actions: {},
                lastVisit: now.toISOString()
            };
        }

        // Update last visit
        this.userBehavior[today].lastVisit = now.toISOString();

        // Calculate frequently used items
        this.calculateFrequentlyUsed();
    }

    calculateFrequentlyUsed() {
        const allVisits = {};
        const allActions = {};

        // Aggregate data from the last 7 days
        Object.values(this.userBehavior).forEach(dayData => {
            Object.entries(dayData.pageVisits || {}).forEach(([page, count]) => {
                allVisits[page] = (allVisits[page] || 0) + count;
            });

            Object.entries(dayData.actions || {}).forEach(([action, count]) => {
                allActions[action] = (allActions[action] || 0) + count;
            });
        });

        // Sort by frequency
        this.frequentlyUsed = {
            pages: Object.entries(allVisits)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([page]) => page),
            actions: Object.entries(allActions)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 3)
                .map(([action]) => action)
        };
    }

    generateRecommendations() {
        const recommendations = [];
        const now = new Date();
        const hour = now.getHours();

        // Time-based recommendations
        if (hour >= 9 && hour <= 11) {
            recommendations.push({
                type: 'time-based',
                title: 'Morning Standup',
                description: 'Join your team\'s daily standup',
                icon: 'users',
                action: 'join-standup',
                priority: 'high'
            });
        }

        if (hour >= 14 && hour <= 16) {
            recommendations.push({
                type: 'time-based',
                title: 'Afternoon Review',
                description: 'Review your progress and plan next steps',
                icon: 'check-square',
                action: 'review-progress',
                priority: 'medium'
            });
        }

        // Context-based recommendations
        const userRole = localStorage.getItem('userRole') || 'employee';
        if (userRole === 'manager') {
            recommendations.push({
                type: 'role-based',
                title: 'Team Performance',
                description: 'Review your team\'s performance metrics',
                icon: 'bar-chart',
                action: 'view-performance',
                priority: 'high'
            });
        }

        if (userRole === 'developer') {
            recommendations.push({
                type: 'role-based',
                title: 'Code Review',
                description: 'Review pending pull requests',
                icon: 'git-branch',
                action: 'code-review',
                priority: 'medium'
            });
        }

        // Frequently used recommendations
        this.frequentlyUsed.pages.slice(0, 2).forEach(page => {
            recommendations.push({
                type: 'frequently-used',
                title: this.getPageTitle(page),
                description: `You visit this page frequently`,
                icon: this.getPageIcon(page),
                action: `navigate-${page}`,
                priority: 'medium'
            });
        });

        this.recommendations = recommendations;
    }

    getPageTitle(page) {
        const titles = {
            'dashboard': 'Dashboard',
            'documents': 'Documents',
            'calendar': 'Calendar',
            'projects': 'Projects',
            'team': 'Team',
            'resources': 'Resources',
            'helpdesk': 'Help Desk',
            'handbook': 'Handbook'
        };
        return titles[page] || page;
    }

    getPageIcon(page) {
        const icons = {
            'dashboard': 'home',
            'documents': 'file-text',
            'calendar': 'calendar',
            'projects': 'layers',
            'team': 'users',
            'resources': 'book',
            'helpdesk': 'help-circle',
            'handbook': 'book'
        };
        return icons[page] || 'file';
    }

    render() {
        this.innerHTML = `
            <div class="smart-quick-access">
                <div class="smart-access-header">
                    <h3>Smart Recommendations</h3>
                    <button class="btn-icon small" id="refreshRecommendations" aria-label="Refresh recommendations">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M23 4v6h-6"></path>
                            <path d="M1 20v-6h6"></path>
                            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                        </svg>
                    </button>
                </div>

                <div class="recommendations-grid">
                    ${this.recommendations.map(rec => `
                        <div class="recommendation-card ${rec.priority}" data-action="${rec.action}">
                            <div class="recommendation-icon">
                                ${this.getIconSVG(rec.icon)}
                            </div>
                            <div class="recommendation-content">
                                <h4 class="recommendation-title">${rec.title}</h4>
                                <p class="recommendation-description">${rec.description}</p>
                                <div class="recommendation-meta">
                                    <span class="recommendation-type">${rec.type}</span>
                                    <span class="recommendation-priority">${rec.priority}</span>
                                </div>
                            </div>
                            <button class="recommendation-action" aria-label="Take action">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>

                <div class="frequently-used">
                    <h4>Frequently Used</h4>
                    <div class="frequently-used-grid">
                        ${this.frequentlyUsed.pages.map(page => {
                            const availablePages = ['documents', 'calendar', 'projects', 'team', 'resources', 'helpdesk', 'handbook'];
                            if (availablePages.includes(page)) {
                                return `
                                    <a href="/pages/${page}.html" class="frequently-used-item">
                                        <div class="frequently-used-icon">
                                            ${this.getIconSVG(this.getPageIcon(page))}
                                        </div>
                                        <span class="frequently-used-title">${this.getPageTitle(page)}</span>
                                    </a>
                                `;
                            }
                            return '';
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getIconSVG(iconName) {
        const icons = {
            'home': '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>',
            'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>',
            'check-square': '<polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>',
            'bar-chart': '<path d="M12 20V10M18 20V4M6 20v-6"></path>',
            'git-branch': '<line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9v2a2 2 0 0 1-2 2H8a2 2 0 0 0-2 2v2"></path>',
            'file-text': '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',
            'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
            'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
            'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>',
            'help-circle': '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>',
            'file': '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>'
        };
        const iconPath = icons[iconName] || icons['file'];
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${iconPath}</svg>`;
    }

    setupEventListeners() {
        // Refresh recommendations
        const refreshBtn = this.querySelector('#refreshRecommendations');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                // Clear old data and regenerate
                localStorage.removeItem('userBehavior');
                this.userBehavior = {};
                this.analyzeUserBehavior();
                this.generateRecommendations();
                this.render();
                this.setupEventListeners();
            });
        }

        // Handle recommendation actions
        this.querySelectorAll('.recommendation-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.recommendation-action')) {
                    const action = card.dataset.action;
                    this.handleRecommendationAction(action);
                }
            });
        });

        // Handle recommendation action buttons
        this.querySelectorAll('.recommendation-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.closest('.recommendation-card').dataset.action;
                this.handleRecommendationAction(action);
            });
        });
    }

    handleRecommendationAction(action) {
        // Track the action
        this.trackAction(action);

        // Handle different actions
        switch (action) {
            case 'join-standup':
                this.navigateToPage('/pages/calendar.html');
                break;
            case 'review-progress':
                // Show progress modal or navigate to tasks
                this.showProgressModal();
                break;
            case 'view-performance':
                // Navigate to team page for performance metrics
                this.navigateToPage('/pages/team.html');
                break;
            case 'code-review':
                // Navigate to projects page for development work
                this.navigateToPage('/pages/projects.html');
                break;
            default:
                if (action.startsWith('navigate-')) {
                    const page = action.replace('navigate-', '');
                    // Check if the page exists before navigating
                    const availablePages = ['documents', 'calendar', 'projects', 'team', 'resources', 'helpdesk', 'handbook'];
                    if (availablePages.includes(page)) {
                        this.navigateToPage(`/pages/${page}.html`);
                    } else {
                        // Fallback to dashboard
                        this.navigateToPage('/index.html');
                    }
                }
                break;
        }
    }

    navigateToPage(url) {
        try {
            // Add a small delay to show the click feedback
            setTimeout(() => {
                window.location.href = url;
            }, 100);
        } catch (error) {
            console.error('Navigation error:', error);
            // Show a fallback message
            this.showNavigationError();
        }
    }

    showNavigationError() {
        const notification = document.createElement('div');
        notification.className = 'navigation-error';
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ef4444; color: white; padding: 16px; border-radius: 8px; z-index: 1000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
                <p style="margin: 0;">Page not found. Redirecting to dashboard...</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
            window.location.href = '/index.html';
        }, 2000);
    }

    showProgressModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Your Progress Today</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="progress-summary">
                        <div class="progress-item">
                            <h3>Tasks Completed</h3>
                            <p class="progress-number">5/8</p>
                        </div>
                        <div class="progress-item">
                            <h3>Time Focused</h3>
                            <p class="progress-number">6.5 hours</p>
                        </div>
                        <div class="progress-item">
                            <h3>Goals Met</h3>
                            <p class="progress-number">3/4</p>
                        </div>
                    </div>
                    <div class="progress-actions">
                        <button class="btn primary">Plan Tomorrow</button>
                        <button class="btn secondary">View Details</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    trackUsage() {
        // Track page visits
        const currentPage = this.getPageNameFromPath(window.location.pathname);
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.userBehavior[today]) {
            this.userBehavior[today] = { pageVisits: {}, actions: {} };
        }
        
        if (!this.userBehavior[today].pageVisits) {
            this.userBehavior[today].pageVisits = {};
        }
        
        this.userBehavior[today].pageVisits[currentPage] = 
            (this.userBehavior[today].pageVisits[currentPage] || 0) + 1;
        
        this.saveUserBehavior();
    }

    getPageNameFromPath(pathname) {
        // Convert pathname to page name
        if (pathname === '/' || pathname === '/index.html') {
            return 'dashboard';
        }
        
        // Extract page name from /pages/page.html
        const match = pathname.match(/\/pages\/([^\/]+)\.html/);
        if (match) {
            return match[1];
        }
        
        // Fallback to pathname without leading slash
        return pathname.replace(/^\//, '').replace(/\.html$/, '');
    }

    trackAction(action) {
        const today = new Date().toISOString().split('T')[0];
        
        if (!this.userBehavior[today]) {
            this.userBehavior[today] = { pageVisits: {}, actions: {} };
        }
        
        if (!this.userBehavior[today].actions) {
            this.userBehavior[today].actions = {};
        }
        
        this.userBehavior[today].actions[action] = 
            (this.userBehavior[today].actions[action] || 0) + 1;
        
        this.saveUserBehavior();
    }
}

// Register the custom element
customElements.define('smart-quick-access', SmartQuickAccess); 