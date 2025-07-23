// Company News and Updates Component
class CompanyNews extends HTMLElement {
    constructor() {
        super();
        console.log('CompanyNews: Constructor called');
        this.news = [];
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.selectedCategory = 'all';
        this.searchQuery = '';
        this.newsStats = {
            total: 0,
            byCategory: {},
            byPriority: {
                high: 0,
                medium: 0,
                low: 0
            },
            trending: []
        };
        this.initialized = false;
        this.statsRendered = false; // Add flag to track if stats have been rendered
    }

    connectedCallback() {
        if (this.initialized) {
            console.log('CompanyNews: Already initialized, skipping');
            return;
        }
        
        console.log('CompanyNews: Connected callback');
        this.loadNews();
        console.log('CompanyNews: News loaded:', this.news);
        this.calculateStats();
        console.log('CompanyNews: Stats calculated:', this.newsStats);
        this.render();
        this.setupEventListeners();
        this.startAutoplay();
        
        this.initialized = true;
        console.log('CompanyNews: Initialization complete');
    }

    disconnectedCallback() {
        console.log('Company News disconnecting...');
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        
        // Cancel animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        console.log('Company News cleanup complete');
    }

    loadNews() {
        console.log('CompanyNews: Loading news data');
        this.news = [
            {
                id: 1,
                title: "New Office Opening in San Francisco",
                excerpt: "We're excited to announce our new office opening in the heart of San Francisco's tech district.",
                category: "company",
                date: "2 hours ago",
                author: "Sarah Johnson",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%236366f1'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EOffice%3C/text%3E%3C/svg%3E",
                priority: "high",
                isPinned: true,
                reactions: { likes: 45, comments: 12, shares: 8 },
                tags: ["expansion", "growth", "office"]
            },
            {
                id: 2,
                title: "Q4 Goals: 95% Achievement Rate",
                excerpt: "Our team has achieved an impressive 95% completion rate for Q4 objectives. Great work everyone!",
                category: "achievement",
                date: "4 hours ago",
                author: "Mike Chen",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%2310b981'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3E95%%3C/text%3E%3C/svg%3E",
                priority: "medium",
                isPinned: false,
                reactions: { likes: 89, comments: 23, shares: 15 },
                tags: ["goals", "success", "teamwork"]
            },
            {
                id: 3,
                title: "New Wellness Program Launch",
                excerpt: "Starting next month, we're introducing comprehensive wellness programs including yoga classes and mental health support.",
                category: "wellness",
                date: "1 day ago",
                author: "Lisa Rodriguez",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23f59e0b'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EWellness%3C/text%3E%3C/svg%3E",
                priority: "low",
                isPinned: true,
                reactions: { likes: 156, comments: 45, shares: 32 },
                tags: ["wellness", "health", "benefits"]
            },
            {
                id: 4,
                title: "Innovation Award Winners Announced",
                excerpt: "Congratulations to the Product Team for winning the annual Innovation Award for their groundbreaking work.",
                category: "recognition",
                date: "2 days ago",
                author: "David Kim",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23ec4899'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EAward%3C/text%3E%3C/svg%3E",
                priority: "high",
                isPinned: false,
                reactions: { likes: 234, comments: 56, shares: 41 },
                tags: ["innovation", "awards", "recognition"]
            },
            {
                id: 5,
                title: "Tech Stack Upgrade Complete",
                excerpt: "Successfully completed our major tech stack upgrade, improving system performance by 40%.",
                category: "tech",
                date: "3 days ago",
                author: "Alex Chen",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%238b5cf6'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3ETech%3C/text%3E%3C/svg%3E",
                priority: "medium",
                isPinned: false,
                reactions: { likes: 167, comments: 34, shares: 22 },
                tags: ["technology", "upgrade", "performance"]
            }
        ];
        console.log('CompanyNews: News data loaded:', this.news.length, 'items');
    }

    calculateStats() {
        console.log('CompanyNews: Calculating stats from news items:', this.news);
        
        // Reset stats
        this.newsStats = {
            total: this.news.length,
            byCategory: {},
            byPriority: {
                high: 0,
                medium: 0,
                low: 0
            },
            trending: []
        };
        
        // Calculate category and priority stats
        this.news.forEach(item => {
            // Category stats
            this.newsStats.byCategory[item.category] = (this.newsStats.byCategory[item.category] || 0) + 1;
            
            // Priority stats
            if (item.priority) {
                const priority = item.priority.toLowerCase();
                if (this.newsStats.byPriority.hasOwnProperty(priority)) {
                    this.newsStats.byPriority[priority]++;
                }
            }
        });

        // Calculate trending news based on engagement score
        this.newsStats.trending = [...this.news]
            .map(item => ({
                ...item,
                engagementScore: (
                    (item.reactions.likes || 0) + 
                    (item.reactions.comments || 0) * 2 + 
                    (item.reactions.shares || 0) * 3
                )
            }))
            .sort((a, b) => b.engagementScore - a.engagementScore)
            .slice(0, 3);

        // DEBUG: Add test data if stats are empty
        if (Object.values(this.newsStats.byPriority).every(count => count === 0)) {
            console.log('CompanyNews: Adding test data for debugging');
            this.newsStats.byPriority = {
                high: 2,
                medium: 3,
                low: 1
            };
        }
        
        if (this.newsStats.trending.length === 0) {
            console.log('CompanyNews: Adding test trending data for debugging');
            this.newsStats.trending = [
                {
                    title: "Test Trending Item",
                    reactions: { likes: 100, comments: 25, shares: 15 }
                }
            ];
        }

        console.log('CompanyNews: Stats calculation complete:', this.newsStats);
    }

    render() {
        try {
            console.log('CompanyNews: Starting render with stats:', this.newsStats);
            console.log('CompanyNews: News data length:', this.news.length);
            
            // Ensure we have stats data before rendering
            if (!this.newsStats || !this.newsStats.byPriority || Object.keys(this.newsStats.byPriority).length === 0) {
                console.error('CompanyNews: Stats data is missing or empty, recalculating...');
                this.calculateStats(); // Recalculate if missing
            }
            
            const filteredNews = this.filterNews();
            const pinnedNews = filteredNews.filter(item => item.isPinned);
            const regularNews = filteredNews.filter(item => !item.isPinned);
            
            console.log('CompanyNews: Filtered news:', {
                total: filteredNews.length,
                pinned: pinnedNews.length,
                regular: regularNews.length
            });
            
            // Calculate total count for priority stats
            const totalPriorityCount = Object.values(this.newsStats.byPriority).reduce((a, b) => a + b, 0);
            
            console.log('CompanyNews: Rendering stats with:', {
                totalPriorityCount,
                priorities: this.newsStats.byPriority,
                trending: this.newsStats.trending.length,
                priorityEntries: Object.entries(this.newsStats.byPriority),
                priorityEntriesWithCount: Object.entries(this.newsStats.byPriority).filter(([priority, count]) => count > 0)
            });

            // Generate content
            const newsContent = this.generateNewsContent(pinnedNews, regularNews, totalPriorityCount);
            
            console.log('CompanyNews: Generated content length:', newsContent.length);
            
            // Set the innerHTML
            this.innerHTML = newsContent;
            
            // Debug: Check if stat-card elements exist
            const statCards = this.querySelectorAll('.stat-card');
            console.log('CompanyNews: Found', statCards.length, 'stat-card elements');
            
            // Debug: Check if stats-grid exists
            const statsGrid = this.querySelector('.stats-grid');
            console.log('CompanyNews: stats-grid exists:', !!statsGrid);
            if (statsGrid) {
                console.log('CompanyNews: stats-grid children:', statsGrid.children.length);
                console.log('CompanyNews: stats-grid innerHTML length:', statsGrid.innerHTML.length);
            }
            
            // Debug: Check visibility of stat-cards
            statCards.forEach((card, index) => {
                const computedStyle = window.getComputedStyle(card);
                console.log(`CompanyNews: stat-card ${index} visibility:`, {
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    opacity: computedStyle.opacity,
                    height: card.offsetHeight,
                    width: card.offsetWidth,
                    innerHTML: card.innerHTML.substring(0, 100) + '...'
                });
                
                // Force visibility if opacity is 0
                if (computedStyle.opacity === '0') {
                    card.style.opacity = '1';
                    console.log(`CompanyNews: Fixed opacity for stat-card ${index}`);
                }
            });
            
            // Mark stats as rendered
            this.statsRendered = true;
            
            // Debug: Check rendered content
            const statsSection = this.querySelector('.news-stats');
            const statsGridFromSection = statsSection?.querySelector('.stats-grid');
            const statCardsFromSection = statsGridFromSection?.querySelectorAll('.stat-card');
            
            console.log('CompanyNews: Stats section rendered:', {
                exists: !!statsSection,
                statsGridExists: !!statsGridFromSection,
                statCardsCount: statCardsFromSection?.length || 0,
                statsSectionHTML: statsSection?.innerHTML?.substring(0, 200) + '...',
                statsSectionVisible: statsSection ? window.getComputedStyle(statsSection).display !== 'none' : false,
                statsSectionHeight: statsSection ? statsSection.offsetHeight : 0
            });

            // Force the stats section to be visible
            if (statsSection) {
                statsSection.style.display = 'block';
                statsSection.style.visibility = 'visible';
                statsSection.style.opacity = '1';
                console.log('CompanyNews: Forced stats section visibility');
            }

            // Setup event listeners after rendering
            this.setupEventListeners();
        } catch (error) {
            console.error('CompanyNews: Error during render:', error);
            // Fallback rendering
            this.innerHTML = `
                <div class="news-error-state">
                    <h3>Error Loading News</h3>
                    <p>There was a problem loading the news content. Please try refreshing the page.</p>
                    <button class="btn" onclick="location.reload()">Refresh Page</button>
                </div>
            `;
        }
    }

    generateNewsContent(pinnedNews, regularNews, totalPriorityCount) {
        try {
            return `
                <div class="company-news" tabindex="0">
                    <div class="news-header">
                        <h3 class="news-title">Company News</h3>
                        <div class="news-filters">
                            <div class="search-bar">
                                <input type="text" 
                                       id="newsSearch" 
                                       placeholder="Search news..." 
                                       value="${this.searchQuery}"
                                       aria-label="Search news">
                                <button class="search-btn" aria-label="Search">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                            <div class="category-filters">
                                <button class="category-btn ${this.selectedCategory === 'all' ? 'active' : ''}" data-category="all">
                                    All
                                </button>
                                ${Object.entries(this.newsStats.byCategory).map(([category, count]) => `
                                    <button class="category-btn ${this.selectedCategory === category ? 'active' : ''}" 
                                            data-category="${category}">
                                        ${this.getCategoryIcon(category)} ${category}
                                        <span class="category-count">${count}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        <div class="news-controls">
                            <button class="btn-icon small" id="prevNews" aria-label="Previous news">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <button class="btn-icon small" id="nextNews" aria-label="Next news">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    ${pinnedNews.length > 0 ? `
                        <div class="pinned-news">
                            <h4 class="section-subtitle">
                                <svg class="pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                Pinned Updates
                            </h4>
                            <div class="pinned-grid">
                                ${pinnedNews.map(item => this.renderNewsCard(item, true)).join('')}
                            </div>
                        </div>
                    ` : ''}

                    <div class="news-content">
                        <div class="news-grid">
                            ${regularNews.map(item => this.renderNewsCard(item)).join('')}
                        </div>
                    </div>

                    <div class="news-stats">
                        <h4 class="section-subtitle">
                            <svg class="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                                <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                            </svg>
                            News Insights
                        </h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-header">
                                    <h5>Updates by Priority</h5>
                                    <span class="stat-total">${this.newsStats.total}</span>
                                </div>
                                <div class="stat-chart">
                                    ${Object.entries(this.newsStats.byPriority).map(([priority, count]) => {
                                        const percentage = totalPriorityCount > 0 ? Math.round((count / totalPriorityCount) * 100) : 0;
                                        return `
                                            <div class="stat-bar-wrapper">
                                                <div class="stat-bar ${priority}" style="width: ${percentage}%;">
                                                    <span class="stat-label">${priority} Priority</span>
                                                    <span class="stat-count">${count}</span>
                                                </div>
                                            </div>
                                        `;
                                    }).join('')}
                                </div>
                            </div>
                            <div class="stat-card trending">
                                <div class="stat-header">
                                    <h5>Most Engaged Updates</h5>
                                </div>
                                <div class="trending-list">
                                    ${this.newsStats.trending.map(item => `
                                        <div class="trending-item">
                                            <div class="trending-title">${item.title}</div>
                                            <div class="trending-metrics">
                                                <span class="metric">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <path d="M14 9V5a3 3 0 0 0-6 0v4"></path>
                                                        <rect x="2" y="9" width="20" height="12" rx="2" ry="2"></rect>
                                                    </svg>
                                                    ${item.reactions.likes || 0}
                                                </span>
                                                <span class="metric">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                    ${item.reactions.comments || 0}
                                                </span>
                                                <span class="metric">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                                        <polyline points="16,6 12,2 8,6"></polyline>
                                                        <line x1="12" y1="2" x2="12" y2="15"></line>
                                                    </svg>
                                                    ${item.reactions.shares || 0}
                                                </span>
                                                <span class="metric total">
                                                    ${(item.reactions.likes || 0) + (item.reactions.comments || 0) + (item.reactions.shares || 0)} total
                                                </span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="news-actions">
                        <button class="btn" onclick="this.shareNews()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16 6 12 2 8 6"></polyline>
                                <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                            Share News
                        </button>
                        <button class="btn" onclick="this.exportNews()">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Export Report
                        </button>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('CompanyNews: Error generating news content:', error);
            throw error;
        }
    }

    renderNewsCard(news, isPinned = false) {
        return `
            <div class="news-card ${news.priority} ${isPinned ? 'pinned' : ''}" data-id="${news.id}">
                <div class="news-image">
                    <img src="${news.image}" alt="${news.title}" loading="lazy">
                    <div class="news-category ${news.category}">
                        ${this.getCategoryIcon(news.category)} ${news.category}
                    </div>
                    ${isPinned ? `
                        <div class="pinned-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Pinned
                        </div>
                    ` : ''}
                </div>
                <div class="news-details">
                    <h4 class="news-headline">${news.title}</h4>
                    <p class="news-excerpt">${news.excerpt}</p>
                    <div class="news-tags">
                        ${news.tags.map(tag => `
                            <span class="tag">#${tag}</span>
                        `).join('')}
                    </div>
                    <div class="news-meta">
                        <span class="news-author">By ${news.author}</span>
                        <span class="news-date">${news.date}</span>
                    </div>
                    <div class="news-reactions">
                        <button class="reaction-btn" aria-label="Like">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                            </svg>
                            <span>${news.reactions.likes}</span>
                        </button>
                        <button class="reaction-btn" aria-label="Comment">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <span>${news.reactions.comments}</span>
                        </button>
                        <button class="reaction-btn" aria-label="Share">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                <polyline points="16 6 12 2 8 6"></polyline>
                                <line x1="12" y1="2" x2="12" y2="15"></line>
                            </svg>
                            <span>${news.reactions.shares}</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    filterNews() {
        return this.news.filter(item => {
            // Category filter
            if (this.selectedCategory !== 'all' && item.category !== this.selectedCategory) {
                return false;
            }
            
            // Search filter
            if (this.searchQuery) {
                const searchLower = this.searchQuery.toLowerCase();
                return (
                    item.title.toLowerCase().includes(searchLower) ||
                    item.excerpt.toLowerCase().includes(searchLower) ||
                    item.category.toLowerCase().includes(searchLower) ||
                    item.author.toLowerCase().includes(searchLower) ||
                    (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchLower)))
                );
            }
            
            return true;
        });
    }

    getCategoryIcon(category) {
        const icons = {
            company: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>`,
            achievement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>`,
            wellness: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>`,
            recognition: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`,
            tech: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>`
        };
        
        return icons[category] || '';
    }

    setupEventListeners() {
        // Search input
        const searchInput = this.querySelector('#newsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render();
            });
        }

        // Category filters
        const categoryButtons = this.querySelectorAll('.category-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.selectedCategory = button.dataset.category;
                this.render();
            });
        });

        // Navigation controls
        const prevButton = this.querySelector('#prevNews');
        const nextButton = this.querySelector('#nextNews');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.currentIndex = Math.max(0, this.currentIndex - 1);
                this.render();
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                const maxIndex = this.news.length - 1;
                this.currentIndex = Math.min(maxIndex, this.currentIndex + 1);
                this.render();
            });
        }

        // Reaction buttons
        const reactionButtons = this.querySelectorAll('.reaction-btn');
        reactionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newsId = parseInt(button.closest('.news-card').dataset.id);
                const reactionType = button.dataset.reaction;
                const newsItem = this.news.find(item => item.id === newsId);
                
                if (newsItem && newsItem.reactions[reactionType] !== undefined) {
                    newsItem.reactions[reactionType]++;
                    this.calculateStats();
                    this.render();
                }
            });
        });

        // View all news button
        const viewAllButton = this.querySelector('#viewAllNews');
        if (viewAllButton) {
            viewAllButton.addEventListener('click', () => {
                this.selectedCategory = 'all';
                this.searchQuery = '';
                this.render();
            });
        }

        // Share button
        const shareButton = this.querySelector('#shareNews');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                // Implement share functionality
                console.log('Share functionality to be implemented');
            });
        }
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Only handle horizontal swipes if they're more significant than vertical ones
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                this.showPrevious();
                this.announceUpdate('Previous news item');
            } else {
                this.showNext();
                this.announceUpdate('Next news item');
            }
        }
    }

    expandNews() {
        const currentNews = this.news[this.currentIndex];
        // In a real app, this would navigate to a detailed view
        // For now, we'll show a notification
        this.showNotification(`Reading: ${currentNews.title}`);
        this.announceUpdate(`Expanding news: ${currentNews.title}`);
    }

    announceUpdate(message) {
        // Create or update the live region for screen readers
        let liveRegion = document.querySelector('#news-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'news-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = message;
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.news.length) % this.news.length;
        this.updateDisplay();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.news.length;
        this.updateDisplay();
    }

    showNews(index) {
        this.currentIndex = index;
        this.updateDisplay();
    }

    updateDisplay() {
        const newsCard = this.querySelector('.news-card');
        const indicators = this.querySelectorAll('.news-indicator');
        const currentNews = this.news[this.currentIndex];

        // Enhanced animation with proper transition
        newsCard.style.transform = 'translateY(10px)';
        newsCard.style.opacity = '0';

        setTimeout(() => {
            // Update news content
            newsCard.className = `news-card ${currentNews.priority}`;
            newsCard.innerHTML = `
                <div class="news-image">
                    <img src="${currentNews.image}" alt="${currentNews.title}" loading="lazy">
                    <div class="news-category ${currentNews.category}">${this.getCategoryIcon(currentNews.category)} ${currentNews.category}</div>
                </div>
                <div class="news-details">
                    <h4 class="news-headline">${currentNews.title}</h4>
                    <p class="news-excerpt">${currentNews.excerpt}</p>
                    <div class="news-meta">
                        <span class="news-author">By ${currentNews.author}</span>
                        <span class="news-date">${currentNews.date}</span>
                    </div>
                </div>
            `;

            // Re-setup interactions for the new content
            this.setupCardInteractions();

            // Animate back in
            requestAnimationFrame(() => {
                newsCard.style.transition = 'all 0.3s var(--ease-spring)';
                newsCard.style.transform = 'translateY(0)';
                newsCard.style.opacity = '1';
            });
        }, 100);

        // Update indicators with enhanced animation
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
            if (index === this.currentIndex) {
                indicator.style.animation = 'none';
                requestAnimationFrame(() => {
                    indicator.style.animation = 'fadeInSlide 0.3s var(--ease-spring)';
                });
            }
        });
    }

    setupCardInteractions() {
        const newsCard = this.querySelector('.news-card');
        if (newsCard) {
            newsCard.addEventListener('click', () => this.expandNews());
            newsCard.setAttribute('tabindex', '0');
            newsCard.setAttribute('role', 'button');
            newsCard.setAttribute('aria-label', 'Click to expand news details');
            
            newsCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.expandNews();
                }
            });
        }
    }

    startAutoplay() {
        if (!this.autoplayInterval) {
            this.autoplayInterval = setInterval(() => {
                // Only update the news display, not the entire component
                const maxIndex = this.news.length - 1;
                this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
                
                // Update only the news content, not the stats
                this.updateNewsDisplay();
            }, 5000); // Change slide every 5 seconds
        }
    }

    updateNewsDisplay() {
        // Only update the news cards, not the entire component
        const newsCards = this.querySelectorAll('.news-card');
        if (newsCards.length > 0) {
            // Update the current news card display
            const currentNews = this.news[this.currentIndex];
            if (currentNews) {
                // Update the first news card with current news
                const firstCard = newsCards[0];
                if (firstCard) {
                    firstCard.className = `news-card ${currentNews.priority}`;
                    firstCard.innerHTML = this.renderNewsCard(currentNews);
                }
            }
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    viewAllNews() {
        // Navigate to full news page
        window.location.href = '/pages/news.html';
    }

    shareNews() {
        if (navigator.share) {
            navigator.share({
                title: 'Company News',
                text: 'Check out our latest company updates and insights!',
                url: window.location.href
            }).then(() => {
                this.showNotification('News shared successfully!');
            }).catch((error) => {
                console.log('Error sharing:', error);
                this.showNotification('Sharing cancelled');
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!');
            }).catch(() => {
                this.showNotification('Unable to share news');
            });
        }
    }

    exportNews() {
        try {
            const exportData = {
                timestamp: new Date().toISOString(),
                totalNews: this.newsStats.total,
                byCategory: this.newsStats.byCategory,
                byPriority: this.newsStats.byPriority,
                trending: this.newsStats.trending,
                news: this.news
            };

            const dataStr = JSON.stringify(exportData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `company-news-report-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            this.showNotification('News report exported successfully!');
        } catch (error) {
            console.error('Error exporting news:', error);
            this.showNotification('Failed to export news report');
        }
    }

    showNotification(message) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.notification-toast');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <span class="notification-text">${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Enhanced auto-dismiss with fade out
        setTimeout(() => {
            notification.style.animation = 'slideInUp 0.3s var(--ease-spring) reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);

        // Click to dismiss
        notification.addEventListener('click', () => {
            notification.style.animation = 'slideInUp 0.3s var(--ease-spring) reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
}

// Register the custom element
if (!customElements.get('company-news')) {
    customElements.define('company-news', CompanyNews);
    console.log('CompanyNews: Component registered');
} 