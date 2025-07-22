// Enhanced Knowledge Hub Component - AI-Powered Learning & Resource Management
class EnhancedKnowledgeHub extends HTMLElement {
    constructor() {
        super();
        this.resources = [];
        this.categories = new Set();
        this.searchIndex = null;
        this.userPreferences = new Map();
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.viewMode = 'grid'; // grid, list, timeline
        this.aiSuggestions = [];
        this.learningPaths = [];
        this.realTimeUpdates = null;
        this.isInitialized = false;
        
        // AI-powered insights
        this.aiInsights = [
            {
                type: 'recommendation',
                title: 'AI Learning Path',
                description: 'Based on your recent activity, we recommend the "Advanced React Patterns" course',
                confidence: 94,
                impact: 'high',
                category: 'learning'
            },
            {
                type: 'trending',
                title: 'Popular This Week',
                description: 'Design System documentation has been accessed 127 times this week',
                confidence: 89,
                impact: 'medium',
                category: 'analytics'
            },
            {
                type: 'update',
                title: 'New Resources Available',
                description: '5 new resources added to your department this week',
                confidence: 100,
                impact: 'medium',
                category: 'updates'
            }
        ];

        // Learning analytics
        this.learningAnalytics = {
            totalResources: 0,
            completedCourses: 0,
            learningStreak: 0,
            skillGaps: [],
            recommendations: [],
            departmentStats: {},
            trendingTopics: []
        };
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        this.loadEnhancedResources();
        this.buildAdvancedSearchIndex();
        this.generateLearningPaths();
        this.calculateAnalytics();
        this.render();
        this.setupEventListeners();
        this.startRealTimeUpdates();
        this.initializeAnimations();
        
        this.isInitialized = true;
    }

    disconnectedCallback() {
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
        }
    }

    loadEnhancedResources() {
        this.resources = [
            {
                id: 1,
                title: "Advanced React Patterns & Best Practices",
                type: "course",
                category: "Development",
                tags: ["react", "frontend", "patterns", "best-practices"],
                lastUpdated: "2024-01-15",
                popularity: 98,
                department: "Engineering",
                summary: "Master advanced React patterns including custom hooks, context optimization, and performance techniques",
                duration: "8 hours",
                difficulty: "Advanced",
                instructor: "Sarah Chen",
                completionRate: 87,
                rating: 4.8,
                views: 1247,
                downloads: 89,
                isNew: false,
                isFeatured: true,
                prerequisites: ["React Fundamentals", "JavaScript ES6+"],
                learningObjectives: ["Custom Hooks", "Context Optimization", "Performance", "Testing"],
                certificate: true,
                aiScore: 96
            },
            {
                id: 2,
                title: "Design System Mastery Guide",
                type: "documentation",
                category: "Design",
                tags: ["design-system", "ui", "guidelines", "components"],
                lastUpdated: "2024-01-12",
                popularity: 95,
                department: "Design",
                summary: "Comprehensive guide to building and maintaining scalable design systems",
                duration: "6 hours",
                difficulty: "Intermediate",
                instructor: "Marcus Rodriguez",
                completionRate: 92,
                rating: 4.9,
                views: 2156,
                downloads: 156,
                isNew: false,
                isFeatured: true,
                prerequisites: ["UI/UX Fundamentals"],
                learningObjectives: ["Design Tokens", "Component Architecture", "Documentation", "Governance"],
                certificate: true,
                aiScore: 94
            },
            {
                id: 3,
                title: "AI-Powered Product Strategy",
                type: "workshop",
                category: "Product",
                tags: ["ai", "strategy", "product-management", "innovation"],
                lastUpdated: "2024-01-10",
                popularity: 91,
                department: "Product",
                summary: "Learn how to integrate AI into your product strategy and roadmap planning",
                duration: "4 hours",
                difficulty: "Intermediate",
                instructor: "Emily Watson",
                completionRate: 78,
                rating: 4.7,
                views: 892,
                downloads: 67,
                isNew: true,
                isFeatured: false,
                prerequisites: ["Product Management Basics"],
                learningObjectives: ["AI Integration", "Strategy Planning", "Roadmap Development"],
                certificate: true,
                aiScore: 89
            },
            {
                id: 4,
                title: "Data Science Fundamentals",
                type: "course",
                category: "Analytics",
                tags: ["data-science", "python", "machine-learning", "analytics"],
                lastUpdated: "2024-01-08",
                popularity: 88,
                department: "Analytics",
                summary: "Essential data science concepts and practical applications for business",
                duration: "12 hours",
                difficulty: "Beginner",
                instructor: "Alex Thompson",
                completionRate: 85,
                rating: 4.6,
                views: 1567,
                downloads: 234,
                isNew: false,
                isFeatured: false,
                prerequisites: ["Basic Python", "Statistics"],
                learningObjectives: ["Data Analysis", "Machine Learning", "Visualization", "Business Applications"],
                certificate: true,
                aiScore: 87
            },
            {
                id: 5,
                title: "Sales Excellence Framework",
                type: "playbook",
                category: "Sales",
                tags: ["sales", "strategy", "techniques", "customer-success"],
                lastUpdated: "2024-01-05",
                popularity: 84,
                department: "Sales",
                summary: "Proven sales methodologies and techniques for modern B2B sales",
                duration: "5 hours",
                difficulty: "Intermediate",
                instructor: "David Kim",
                completionRate: 91,
                rating: 4.8,
                views: 743,
                downloads: 89,
                isNew: false,
                isFeatured: false,
                prerequisites: ["Sales Basics"],
                learningObjectives: ["Prospecting", "Qualification", "Closing", "Relationship Building"],
                certificate: true,
                aiScore: 82
            },
            {
                id: 6,
                title: "Cybersecurity Best Practices",
                type: "training",
                category: "Security",
                tags: ["security", "cybersecurity", "best-practices", "compliance"],
                lastUpdated: "2024-01-03",
                popularity: 86,
                department: "IT",
                summary: "Essential cybersecurity practices for modern organizations",
                duration: "3 hours",
                difficulty: "Beginner",
                instructor: "Lisa Rodriguez",
                completionRate: 94,
                rating: 4.9,
                views: 1123,
                downloads: 145,
                isNew: true,
                isFeatured: true,
                prerequisites: ["Basic IT Knowledge"],
                learningObjectives: ["Threat Awareness", "Security Protocols", "Incident Response"],
                certificate: true,
                aiScore: 90
            }
        ];

        // Extract unique categories
        this.resources.forEach(resource => {
            this.categories.add(resource.category);
        });
    }

    buildAdvancedSearchIndex() {
        this.searchIndex = new Map();
        
        this.resources.forEach(resource => {
            const searchText = [
                resource.title,
                resource.category,
                resource.department,
                resource.summary,
                resource.instructor,
                resource.difficulty,
                ...resource.tags,
                ...resource.learningObjectives
            ].join(' ').toLowerCase();
            
            this.searchIndex.set(resource.id, searchText);
        });
    }

    generateLearningPaths() {
        this.learningPaths = [
            {
                id: 1,
                title: "Frontend Development Track",
                description: "Complete path from beginner to advanced frontend development",
                duration: "40 hours",
                difficulty: "Beginner to Advanced",
                resources: [1, 2, 4],
                progress: 65,
                estimatedCompletion: "3 weeks",
                skills: ["React", "Design Systems", "JavaScript", "CSS"]
            },
            {
                id: 2,
                title: "Product Management Excellence",
                description: "Master product strategy, AI integration, and team leadership",
                duration: "25 hours",
                difficulty: "Intermediate to Advanced",
                resources: [3, 5],
                progress: 40,
                estimatedCompletion: "2 weeks",
                skills: ["Product Strategy", "AI Integration", "Leadership", "Analytics"]
            }
        ];
    }

    calculateAnalytics() {
        this.learningAnalytics = {
            totalResources: this.resources.length,
            completedCourses: Math.floor(this.resources.length * 0.3),
            learningStreak: 7,
            skillGaps: [
                { skill: "Advanced React", gap: "High", priority: "urgent" },
                { skill: "AI Integration", gap: "Medium", priority: "important" },
                { skill: "Data Visualization", gap: "Low", priority: "nice-to-have" }
            ],
            recommendations: this.getPersonalizedRecommendations(),
            departmentStats: this.getDepartmentStats(),
            trendingTopics: this.getTrendingTopics()
        };
    }

    getPersonalizedRecommendations() {
        // Simulate AI-powered recommendations
        return this.resources
            .filter(r => r.aiScore > 85)
            .sort((a, b) => b.aiScore - a.aiScore)
            .slice(0, 3);
    }

    getDepartmentStats() {
        const stats = {};
        this.resources.forEach(resource => {
            if (!stats[resource.department]) {
                stats[resource.department] = {
                    total: 0,
                    avgRating: 0,
                    totalViews: 0
                };
            }
            stats[resource.department].total++;
            stats[resource.department].avgRating += resource.rating;
            stats[resource.department].totalViews += resource.views;
        });

        // Calculate averages
        Object.keys(stats).forEach(dept => {
            stats[dept].avgRating = (stats[dept].avgRating / stats[dept].total).toFixed(1);
        });

        return stats;
    }

    getTrendingTopics() {
        return this.resources
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map(r => ({
                title: r.title,
                views: r.views,
                growth: Math.floor(Math.random() * 50) + 10
            }));
    }

    render() {
        this.innerHTML = `
            <div class="enhanced-knowledge-hub">
                <!-- Header Section -->
                <div class="hub-header">
                    <div class="header-content">
                        <h2 class="hub-title">
                            <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            AI-Powered Knowledge Hub
                        </h2>
                        <p class="hub-subtitle">Intelligent learning resources and personalized recommendations</p>
                    </div>
                    
                    <div class="hub-controls">
                        <div class="search-container">
                            <input type="text" 
                                   class="enhanced-search" 
                                   placeholder="🔍 Search courses, documents, or skills..." 
                                   value="${this.searchQuery}"
                                   aria-label="Search knowledge resources">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        
                        <div class="view-controls">
                            <button class="view-btn ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid" title="Grid View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                            </button>
                            <button class="view-btn ${this.viewMode === 'list' ? 'active' : ''}" data-view="list" title="List View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                            </button>
                            <button class="view-btn ${this.viewMode === 'timeline' ? 'active' : ''}" data-view="timeline" title="Timeline View">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- AI Insights Section -->
                <div class="ai-insights-section">
                    <h3 class="insights-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        AI-Powered Insights
                    </h3>
                    <div class="ai-insights-grid">
                        ${this.aiInsights.map(insight => `
                            <div class="ai-insight-card ${insight.type}">
                                <div class="insight-header">
                                    <div class="insight-icon ${insight.type}">
                                        ${this.getInsightIcon(insight.type)}
                                    </div>
                                    <div class="insight-meta">
                                        <h4 class="insight-title">${insight.title}</h4>
                                        <div class="confidence-indicator">
                                            <div class="confidence-bar">
                                                <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                                            </div>
                                            <span class="confidence-text">${insight.confidence}% confidence</span>
                                        </div>
                                    </div>
                                    <div class="impact-badge ${insight.impact}">${insight.impact} impact</div>
                                </div>
                                <p class="insight-description">${insight.description}</p>
                                <div class="insight-actions">
                                    <button class="insight-action-btn primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Apply Suggestion
                                    </button>
                                    <button class="insight-action-btn secondary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Learning Analytics Dashboard -->
                <div class="learning-analytics">
                    <h3 class="analytics-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Learning Analytics
                    </h3>
                    <div class="analytics-grid">
                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Your Progress</h4>
                            </div>
                            <div class="progress-stats">
                                <div class="progress-stat">
                                    <div class="stat-circle">
                                        <svg class="progress-ring" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" stroke-width="8" 
                                                stroke-dasharray="283" stroke-dashoffset="${283 - (283 * this.learningAnalytics.completedCourses / this.learningAnalytics.totalResources)}"
                                                transform="rotate(-90 50 50)"/>
                                        </svg>
                                        <div class="stat-value">${this.learningAnalytics.completedCourses}</div>
                                    </div>
                                    <div class="stat-label">Courses Completed</div>
                                </div>
                                <div class="progress-stat">
                                    <div class="streak-badge">
                                        <span class="streak-number">${this.learningAnalytics.learningStreak}</span>
                                        <span class="streak-label">Day Streak</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Skill Gaps</h4>
                            </div>
                            <div class="skill-gaps">
                                ${this.learningAnalytics.skillGaps.map(gap => `
                                    <div class="skill-gap-item priority-${gap.priority}">
                                        <div class="gap-info">
                                            <span class="gap-skill">${gap.skill}</span>
                                            <span class="gap-level">${gap.gap} Priority</span>
                                        </div>
                                        <div class="gap-progress">
                                            <div class="gap-fill ${gap.priority}"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Trending Topics</h4>
                            </div>
                            <div class="trending-topics">
                                ${this.learningAnalytics.trendingTopics.map((topic, index) => `
                                    <div class="trending-item">
                                        <div class="trending-rank">#${index + 1}</div>
                                        <div class="trending-info">
                                            <span class="trending-title">${topic.title}</span>
                                            <span class="trending-stats">${topic.views} views • +${topic.growth}%</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Filters -->
                <div class="enhanced-filters">
                    <div class="filter-section">
                        <h4 class="filter-title">Categories</h4>
                        <div class="filter-chips">
                            <button class="filter-chip ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
                                All Categories
                                <span class="chip-count">${this.resources.length}</span>
                            </button>
                            ${Array.from(this.categories).map(category => {
                                const count = this.resources.filter(r => r.category === category).length;
                                return `
                                    <button class="filter-chip ${this.currentFilter === category ? 'active' : ''}" data-filter="${category}">
                                        ${category}
                                        <span class="chip-count">${count}</span>
                                    </button>
                                `;
                            }).join('')}
                        </div>
                    </div>
                    
                    <div class="filter-section">
                        <h4 class="filter-title">Difficulty</h4>
                        <div class="difficulty-filters">
                            <button class="difficulty-btn" data-difficulty="beginner">Beginner</button>
                            <button class="difficulty-btn" data-difficulty="intermediate">Intermediate</button>
                            <button class="difficulty-btn" data-difficulty="advanced">Advanced</button>
                        </div>
                    </div>
                </div>

                <!-- Learning Paths -->
                <div class="learning-paths-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Recommended Learning Paths
                    </h3>
                    <div class="learning-paths-grid">
                        ${this.learningPaths.map(path => `
                            <div class="learning-path-card">
                                <div class="path-header">
                                    <h4 class="path-title">${path.title}</h4>
                                    <div class="path-meta">
                                        <span class="path-duration">${path.duration}</span>
                                        <span class="path-difficulty">${path.difficulty}</span>
                                    </div>
                                </div>
                                <p class="path-description">${path.description}</p>
                                <div class="path-progress">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: ${path.progress}%"></div>
                                    </div>
                                    <span class="progress-text">${path.progress}% Complete</span>
                                </div>
                                <div class="path-skills">
                                    ${path.skills.map(skill => `
                                        <span class="skill-badge">${skill}</span>
                                    `).join('')}
                                </div>
                                <div class="path-actions">
                                    <button class="path-btn primary">Continue Learning</button>
                                    <button class="path-btn secondary">View Details</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Resources Grid -->
                <div class="resources-section">
                    <div class="section-header">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            Learning Resources
                        </h3>
                        <div class="section-actions">
                            <button class="action-btn" id="sortByPopularity">Most Popular</button>
                            <button class="action-btn" id="sortByRecent">Recently Added</button>
                            <button class="action-btn" id="sortByRating">Highest Rated</button>
                        </div>
                    </div>
                    
                    <div class="resources-container ${this.viewMode}">
                        ${this.getFilteredResources().map(resource => this.renderEnhancedResourceCard(resource)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderEnhancedResourceCard(resource) {
        const difficultyColor = {
            'Beginner': 'success',
            'Intermediate': 'warning', 
            'Advanced': 'danger'
        };

        return `
            <div class="enhanced-resource-card ${resource.isNew ? 'new' : ''} ${resource.isFeatured ? 'featured' : ''}" data-id="${resource.id}">
                <div class="resource-header">
                    <div class="resource-icon ${resource.type}">
                        ${this.getResourceIcon(resource.type)}
                    </div>
                    <div class="resource-badges">
                        ${resource.isNew ? '<span class="badge new">NEW</span>' : ''}
                        ${resource.isFeatured ? '<span class="badge featured">FEATURED</span>' : ''}
                        <span class="badge difficulty ${difficultyColor[resource.difficulty]}">${resource.difficulty}</span>
                    </div>
                </div>
                
                <div class="resource-content">
                    <h4 class="resource-title">${resource.title}</h4>
                    <p class="resource-summary">${resource.summary}</p>
                    
                    <div class="resource-meta">
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${resource.duration}</span>
                        </div>
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span>${resource.instructor}</span>
                        </div>
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <span>${resource.rating}/5.0</span>
                        </div>
                    </div>
                    
                    <div class="resource-stats">
                        <div class="stat">
                            <span class="stat-value">${resource.views}</span>
                            <span class="stat-label">Views</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${resource.completionRate}%</span>
                            <span class="stat-label">Completion</span>
                        </div>
                        <div class="stat">
                            <span class="stat-value">${resource.aiScore}</span>
                            <span class="stat-label">AI Score</span>
                        </div>
                    </div>
                    
                    <div class="resource-tags">
                        ${resource.tags.map(tag => `
                            <span class="resource-tag">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="resource-actions">
                    <button class="resource-btn primary" data-action="start">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Start Learning
                    </button>
                    <button class="resource-btn secondary" data-action="preview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                        Preview
                    </button>
                </div>
            </div>
        `;
    }

    getResourceIcon(type) {
        const icons = {
            course: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>`,
            documentation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>`,
            workshop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            playbook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>`,
            training: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`
        };
        return icons[type] || icons.documentation;
    }

    getInsightIcon(type) {
        const icons = {
            recommendation: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`,
            trending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
            </svg>`,
            update: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>`
        };
        return icons[type] || icons.recommendation;
    }

    getFilteredResources() {
        let filtered = this.resources;
        
        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(r => r.category === this.currentFilter);
        }
        
        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(resource => {
                const searchText = this.searchIndex.get(resource.id);
                return searchText.includes(query);
            });
        }
        
        return filtered;
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = this.querySelector('.enhanced-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.updateResourceDisplay();
            });
        }

        // View mode controls
        this.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.viewMode = e.currentTarget.dataset.view;
                this.updateViewMode();
            });
        });

        // Filter controls
        this.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.currentFilter = e.currentTarget.dataset.filter;
                this.updateFilters();
            });
        });

        // Resource actions
        this.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const resourceId = parseInt(actionBtn.closest('.enhanced-resource-card').dataset.id);
                this.handleResourceAction(action, resourceId);
            }
        });

        // Sort controls
        this.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sortBy = e.currentTarget.id.replace('sortBy', '').toLowerCase();
                this.sortResources(sortBy);
            });
        });
    }

    updateResourceDisplay() {
        const container = this.querySelector('.resources-container');
        if (container) {
            const filteredResources = this.getFilteredResources();
            container.innerHTML = filteredResources.map(resource => 
                this.renderEnhancedResourceCard(resource)
            ).join('');
        }
    }

    updateViewMode() {
        const container = this.querySelector('.resources-container');
        if (container) {
            container.className = `resources-container ${this.viewMode}`;
        }
        
        // Update active view button
        this.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === this.viewMode);
        });
    }

    updateFilters() {
        // Update active filter chip
        this.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.filter === this.currentFilter);
        });
        
        this.updateResourceDisplay();
    }

    handleResourceAction(action, resourceId) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        switch (action) {
            case 'start':
                this.startLearning(resource);
                break;
            case 'preview':
                this.previewResource(resource);
                break;
        }
    }

    startLearning(resource) {
        console.log('Starting learning:', resource.title);
        this.showNotification(`Starting "${resource.title}"`, 'success');
    }

    previewResource(resource) {
        console.log('Previewing resource:', resource.title);
        this.showNotification(`Previewing "${resource.title}"`, 'info');
    }

    sortResources(sortBy) {
        const container = this.querySelector('.resources-container');
        if (!container) return;

        const resources = Array.from(container.children);
        resources.sort((a, b) => {
            const aId = parseInt(a.dataset.id);
            const bId = parseInt(b.dataset.id);
            const resourceA = this.resources.find(r => r.id === aId);
            const resourceB = this.resources.find(r => r.id === bId);

            switch (sortBy) {
                case 'popularity':
                    return resourceB.popularity - resourceA.popularity;
                case 'recent':
                    return new Date(resourceB.lastUpdated) - new Date(resourceA.lastUpdated);
                case 'rating':
                    return resourceB.rating - resourceA.rating;
                default:
                    return 0;
            }
        });

        resources.forEach(resource => container.appendChild(resource));
    }

    startRealTimeUpdates() {
        this.realTimeUpdates = setInterval(() => {
            this.updateAnalytics();
        }, 30000); // Update every 30 seconds
    }

    updateAnalytics() {
        // Simulate real-time updates
        this.learningAnalytics.learningStreak = Math.min(30, this.learningAnalytics.learningStreak + Math.floor(Math.random() * 2));
        
        // Update trending topics
        this.learningAnalytics.trendingTopics.forEach(topic => {
            topic.views += Math.floor(Math.random() * 10);
            topic.growth = Math.floor(Math.random() * 20) + 5;
        });
    }

    initializeAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        const animateElements = this.querySelectorAll('.enhanced-resource-card, .ai-insight-card, .learning-path-card, .analytics-card');
        animateElements.forEach(el => observer.observe(el));
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `knowledge-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-text">${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

customElements.define('enhanced-knowledge-hub', EnhancedKnowledgeHub); 