// Knowledge Hub Component
class KnowledgeHub extends HTMLElement {
    constructor() {
        super();
        this.resources = [];
        this.categories = new Set();
        this.searchIndex = null;
        this.userPreferences = new Map();
    }

    connectedCallback() {
        this.loadResources();
        this.buildSearchIndex();
        this.render();
        this.setupEventListeners();
        this.startResourceSuggestions();
    }

    loadResources() {
        // Mock data - in real app would load from backend
        this.resources = [
            {
                id: 1,
                title: "Company Handbook 2024",
                type: "document",
                category: "Policies",
                tags: ["guidelines", "policies", "procedures"],
                lastUpdated: "2024-01-15",
                popularity: 95,
                department: "HR",
                summary: "Complete guide to company policies and procedures"
            },
            {
                id: 2,
                title: "Product Roadmap Q1",
                type: "presentation",
                category: "Product",
                tags: ["strategy", "planning", "roadmap"],
                lastUpdated: "2024-01-10",
                popularity: 88,
                department: "Product",
                summary: "Strategic product initiatives for Q1 2024"
            },
            {
                id: 3,
                title: "Design System Guide",
                type: "documentation",
                category: "Design",
                tags: ["design", "ui", "guidelines"],
                lastUpdated: "2024-01-12",
                popularity: 92,
                department: "Design",
                summary: "Comprehensive guide to our design system"
            },
            {
                id: 4,
                title: "Sales Playbook",
                type: "document",
                category: "Sales",
                tags: ["sales", "strategy", "guidelines"],
                lastUpdated: "2024-01-08",
                popularity: 85,
                department: "Sales",
                summary: "Best practices and strategies for sales team"
            }
        ];

        // Extract unique categories
        this.resources.forEach(resource => {
            this.categories.add(resource.category);
        });
    }

    buildSearchIndex() {
        // Simple search index - in real app would use a proper search library
        this.searchIndex = new Map();
        
        this.resources.forEach(resource => {
            const searchText = [
                resource.title,
                resource.category,
                resource.department,
                resource.summary,
                ...resource.tags
            ].join(' ').toLowerCase();
            
            this.searchIndex.set(resource.id, searchText);
        });
    }

    render() {
        this.innerHTML = `
            <div class="knowledge-hub">
                <div class="hub-header">
                    <h3 class="hub-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        Knowledge Hub
                    </h3>
                    <div class="hub-actions">
                        <div class="search-container">
                            <input type="text" class="search-input" placeholder="Search resources..." aria-label="Search resources">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <button class="btn-icon small" id="filterBtn" aria-label="Filter resources">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="hub-filters">
                    <div class="filter-chips">
                        ${Array.from(this.categories).map(category => `
                            <button class="filter-chip" data-category="${category}">
                                ${category}
                                <svg class="chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="resources-grid">
                    <div class="suggested-resources">
                        <h4 class="section-title">Suggested for You</h4>
                        <div class="resources-list">
                            ${this.getSuggestedResources().map(resource => this.renderResourceCard(resource)).join('')}
                        </div>
                    </div>

                    <div class="recent-resources">
                        <h4 class="section-title">Recently Updated</h4>
                        <div class="resources-list">
                            ${this.getRecentResources().map(resource => this.renderResourceCard(resource)).join('')}
                        </div>
                    </div>

                    <div class="popular-resources">
                        <h4 class="section-title">Most Popular</h4>
                        <div class="resources-list">
                            ${this.getPopularResources().map(resource => this.renderResourceCard(resource)).join('')}
                        </div>
                    </div>
                </div>

                <div class="resource-insights">
                    <h4 class="insights-title">Resource Insights</h4>
                    <div class="insights-grid">
                        <div class="insight-card">
                            <div class="insight-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div class="insight-content">
                                <h5>Most Accessed</h5>
                                <p>Design System Guide is trending this week</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <div class="insight-content">
                                <h5>Recently Updated</h5>
                                <p>5 documents were updated today</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderResourceCard(resource) {
        return `
            <div class="resource-card" data-id="${resource.id}">
                <div class="resource-icon ${resource.type}">
                    ${this.getResourceIcon(resource.type)}
                </div>
                <div class="resource-content">
                    <h5 class="resource-title">${resource.title}</h5>
                    <p class="resource-summary">${resource.summary}</p>
                    <div class="resource-meta">
                        <span class="resource-category">${resource.category}</span>
                        <span class="resource-date">Updated ${this.formatDate(resource.lastUpdated)}</span>
                    </div>
                    <div class="resource-tags">
                        ${resource.tags.map(tag => `
                            <span class="resource-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                <button class="resource-action" aria-label="Open resource">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </button>
            </div>
        `;
    }

    getResourceIcon(type) {
        const icons = {
            document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>`,
            presentation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>`,
            documentation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>`
        };
        return icons[type] || icons.document;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) return 'Today';
        if (days === 1) return 'Yesterday';
        if (days < 7) return `${days} days ago`;
        return date.toLocaleDateString();
    }

    getSuggestedResources() {
        // In a real app, this would use ML to suggest relevant resources
        return this.resources
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 2);
    }

    getRecentResources() {
        return this.resources
            .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
            .slice(0, 2);
    }

    getPopularResources() {
        return this.resources
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 2);
    }

    setupEventListeners() {
        const searchInput = this.querySelector('.search-input');
        const filterChips = this.querySelectorAll('.filter-chip');
        const resourceCards = this.querySelectorAll('.resource-card');

        searchInput?.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.toggleFilter(category);
            });
        });

        resourceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const resourceId = parseInt(e.currentTarget.dataset.id);
                this.openResource(resourceId);
            });
        });
    }

    handleSearch(query) {
        query = query.toLowerCase();
        const resourceCards = this.querySelectorAll('.resource-card');

        resourceCards.forEach(card => {
            const resourceId = parseInt(card.dataset.id);
            const searchText = this.searchIndex.get(resourceId);
            
            if (searchText.includes(query)) {
                card.style.display = '';
                // Highlight matching text
                this.highlightMatches(card, query);
            } else {
                card.style.display = 'none';
            }
        });
    }

    highlightMatches(card, query) {
        const title = card.querySelector('.resource-title');
        const summary = card.querySelector('.resource-summary');

        if (title && summary) {
            const titleText = title.textContent;
            const summaryText = summary.textContent;

            if (query) {
                const titleHtml = this.getHighlightedText(titleText, query);
                const summaryHtml = this.getHighlightedText(summaryText, query);

                title.innerHTML = titleHtml;
                summary.innerHTML = summaryHtml;
            } else {
                title.textContent = titleText;
                summary.textContent = summaryText;
            }
        }
    }

    getHighlightedText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    toggleFilter(category) {
        const chip = this.querySelector(`[data-category="${category}"]`);
        const isActive = chip.classList.toggle('active');

        const resourceCards = this.querySelectorAll('.resource-card');
        resourceCards.forEach(card => {
            const cardCategory = card.querySelector('.resource-category').textContent;
            if (isActive) {
                card.style.display = cardCategory === category ? '' : 'none';
            } else {
                card.style.display = '';
            }
        });
    }

    openResource(resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (resource) {
            // Update user preferences
            this.updateUserPreferences(resource);
            
            // In a real app, this would open the resource
            console.log('Opening resource:', resource.title);
            
            // Trigger resource opened event
            this.dispatchEvent(new CustomEvent('resourceOpened', {
                detail: { resourceId, resource },
                bubbles: true
            }));
        }
    }

    updateUserPreferences(resource) {
        // Update category preferences
        const categoryPrefs = this.userPreferences.get('categories') || {};
        categoryPrefs[resource.category] = (categoryPrefs[resource.category] || 0) + 1;
        this.userPreferences.set('categories', categoryPrefs);

        // Update tag preferences
        const tagPrefs = this.userPreferences.get('tags') || {};
        resource.tags.forEach(tag => {
            tagPrefs[tag] = (tagPrefs[tag] || 0) + 1;
        });
        this.userPreferences.set('tags', tagPrefs);

        // In a real app, this would be persisted to backend
        console.log('Updated user preferences:', this.userPreferences);
    }

    startResourceSuggestions() {
        // Periodically update suggestions based on user preferences
        setInterval(() => {
            this.updateSuggestions();
        }, 300000); // Every 5 minutes
    }

    updateSuggestions() {
        const suggestedSection = this.querySelector('.suggested-resources .resources-list');
        if (suggestedSection) {
            const newSuggestions = this.getSuggestedResources();
            suggestedSection.innerHTML = newSuggestions.map(resource => 
                this.renderResourceCard(resource)
            ).join('');
        }
    }

    disconnectedCallback() {
        // Cleanup
    }
}

customElements.define('knowledge-hub', KnowledgeHub); 