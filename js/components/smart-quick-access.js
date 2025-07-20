// Smart Quick Access Component
class SmartQuickAccess extends HTMLElement {
    constructor() {
        super();
        this.recommendations = [];
        this.frequentlyUsed = [];
        this.usageData = new Map();
    }

    connectedCallback() {
        this.loadUsageData();
        this.generateRecommendations();
        this.render();
        this.setupEventListeners();
    }

    loadUsageData() {
        // In a real app, this would load from a backend service
        // For now, we'll use mock data
        const mockUsageData = {
            'documents': { count: 15, lastAccessed: Date.now() - 3600000 },
            'calendar': { count: 12, lastAccessed: Date.now() - 7200000 },
            'projects': { count: 8, lastAccessed: Date.now() - 1800000 },
            'team': { count: 5, lastAccessed: Date.now() - 14400000 }
        };

        this.usageData = new Map(Object.entries(mockUsageData));
    }

    generateRecommendations() {
        // Generate personalized recommendations based on time of day and usage patterns
        const hour = new Date().getHours();
        
        // Morning recommendations (8 AM - 12 PM)
        if (hour >= 8 && hour < 12) {
            this.recommendations = [
                {
                    title: 'Daily Stand-up Notes',
                    description: 'Review and update your daily stand-up notes',
                    icon: 'document',
                    priority: 'high',
                    type: 'meeting'
                },
                {
                    title: 'Team Calendar',
                    description: 'Check today\'s meetings and events',
                    icon: 'calendar',
                    priority: 'high',
                    type: 'calendar'
                }
            ];
        }
        // Afternoon recommendations (12 PM - 5 PM)
        else if (hour >= 12 && hour < 17) {
            this.recommendations = [
                {
                    title: 'Project Updates',
                    description: 'Review and update project status',
                    icon: 'project',
                    priority: 'medium',
                    type: 'project'
                },
                {
                    title: 'Team Collaboration',
                    description: 'Check team messages and updates',
                    icon: 'team',
                    priority: 'medium',
                    type: 'team'
                }
            ];
        }
        // Evening recommendations (5 PM - 8 PM)
        else if (hour >= 17 && hour < 20) {
            this.recommendations = [
                {
                    title: 'Daily Summary',
                    description: 'Review today\'s accomplishments',
                    icon: 'document',
                    priority: 'medium',
                    type: 'summary'
                },
                {
                    title: 'Tomorrow\'s Schedule',
                    description: 'Plan for tomorrow\'s meetings and tasks',
                    icon: 'calendar',
                    priority: 'high',
                    type: 'planning'
                }
            ];
        }
        // Night recommendations (8 PM - 8 AM)
        else {
            this.recommendations = [
                {
                    title: 'Upcoming Deadlines',
                    description: 'Review upcoming project deadlines',
                    icon: 'project',
                    priority: 'low',
                    type: 'planning'
                },
                {
                    title: 'Learning Resources',
                    description: 'Explore available training materials',
                    icon: 'resource',
                    priority: 'low',
                    type: 'learning'
                }
            ];
        }

        // Sort frequently used items by count and last accessed
        this.frequentlyUsed = Array.from(this.usageData.entries())
            .sort(([, a], [, b]) => {
                const scoreA = a.count * 0.7 + (1 / (Date.now() - a.lastAccessed)) * 0.3;
                const scoreB = b.count * 0.7 + (1 / (Date.now() - b.lastAccessed)) * 0.3;
                return scoreB - scoreA;
            })
            .slice(0, 4)
            .map(([key, data]) => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                icon: key.toLowerCase(),
                count: data.count
            }));
    }

    render() {
        this.innerHTML = `
            <div class="smart-quick-access">
                <div class="smart-access-header">
                    <h3>Quick Access</h3>
                </div>

                <div class="recommendations-grid">
                    ${this.recommendations.map(rec => `
                        <div class="recommendation-card ${rec.priority}">
                            <div class="recommendation-icon ${rec.icon}">
                                ${this.getIconSvg(rec.icon)}
                            </div>
                            <div class="recommendation-content">
                                <h4 class="recommendation-title">${rec.title}</h4>
                                <p class="recommendation-description">${rec.description}</p>
                                <div class="recommendation-meta">
                                    <span class="recommendation-type">${rec.type}</span>
                                    <button class="recommendation-action" data-action="${rec.type}">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="frequently-used">
                    <h4>Frequently Used</h4>
                    <div class="frequently-used-grid">
                        ${this.frequentlyUsed.map(item => `
                            <div class="frequently-used-item" data-item="${item.icon}">
                                <div class="frequently-used-icon ${item.icon}">
                                    ${this.getIconSvg(item.icon)}
                                </div>
                                <span class="frequently-used-title">${item.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    getIconSvg(type) {
        const icons = {
            document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>`,
            calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`,
            project: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>`,
            team: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            resource: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>`
        };
        return icons[type] || icons.document;
    }

    setupEventListeners() {
        // Handle recommendation actions
        this.querySelectorAll('.recommendation-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleRecommendationAction(action);
            });
        });

        // Handle frequently used items
        this.querySelectorAll('.frequently-used-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const itemType = e.currentTarget.dataset.item;
                this.handleFrequentlyUsedClick(itemType);
            });
        });
    }

    handleRecommendationAction(action) {
        // Update usage data
        if (this.usageData.has(action)) {
            const data = this.usageData.get(action);
            this.usageData.set(action, {
                count: data.count + 1,
                lastAccessed: Date.now()
            });
        } else {
            this.usageData.set(action, {
                count: 1,
                lastAccessed: Date.now()
            });
        }

        // In a real app, this would navigate to the appropriate page or open the relevant modal
        console.log(`Handling recommendation action: ${action}`);
        
        // Refresh recommendations
        this.generateRecommendations();
        this.render();
        this.setupEventListeners();
    }

    handleFrequentlyUsedClick(itemType) {
        // Update usage data
        if (this.usageData.has(itemType)) {
            const data = this.usageData.get(itemType);
            this.usageData.set(itemType, {
                count: data.count + 1,
                lastAccessed: Date.now()
            });
        }

        // In a real app, this would navigate to the appropriate page
        console.log(`Opening frequently used item: ${itemType}`);
        
        // Refresh recommendations
        this.generateRecommendations();
        this.render();
        this.setupEventListeners();
    }
}

customElements.define('smart-quick-access', SmartQuickAccess); 