console.log('🔥 ENHANCED KNOWLEDGE HUB FILE LOADING...');

// Enhanced Knowledge Hub Component - Contest-Winning AI-Powered Learning & Resource Management
class EnhancedKnowledgeHub extends HTMLElement {
    constructor() {
        super();
        console.log('🚀 Enhanced Knowledge Hub constructor called!');
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
        this.spectacularMode = true; // Enable contest-winning visual effects
        this.particleSystem = null;
        this.observer = null;
        
        // Enhanced AI-powered insights with spectacular visual effects
        this.aiInsights = [
            {
                type: 'recommendation',
                title: 'Personalized Learning Path',
                description: 'AI suggests "Advanced React Patterns" course based on your recent activity and skill gaps',
                confidence: 96,
                impact: 'high',
                category: 'learning',
                priority: 'urgent',
                estimatedTime: '2 hours',
                skillImpact: '+85 points'
            },
            {
                type: 'trending',
                title: 'Trending Knowledge',
                description: 'Design System documentation has 127% increased engagement this week across your team',
                confidence: 92,
                impact: 'medium',
                category: 'analytics',
                priority: 'important',
                estimatedTime: '30 min',
                skillImpact: '+45 points'
            },
            {
                type: 'update',
                title: 'Fresh Content Alert',
                description: '5 new AI-curated resources added to your personalized learning library',
                confidence: 100,
                impact: 'medium',
                category: 'updates',
                priority: 'normal',
                estimatedTime: '1 hour',
                skillImpact: '+60 points'
            },
            {
                type: 'achievement',
                title: 'Learning Milestone',
                description: 'You\'re 85% complete on your Frontend Development track - excellent progress!',
                confidence: 100,
                impact: 'high',
                category: 'progress',
                priority: 'celebration',
                estimatedTime: '15 min',
                skillImpact: '+100 points'
            }
        ];

        // Enhanced learning analytics with visual impact
        this.learningAnalytics = {
            totalResources: 0,
            completedCourses: 0,
            learningStreak: 7,
            skillGaps: [],
            recommendations: [],
            departmentStats: {},
            trendingTopics: [],
            aiScore: 94,
            weeklyGoal: 85,
            monthlyTarget: 320,
            leaderboardRank: 12
        };
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        console.log('🚀 Enhanced Knowledge Hub: connectedCallback called');
        console.log('🎯 Initial AI Insights count:', this.aiInsights?.length || 0);
        
        try {
            // Clean up any existing sparkles first
            document.querySelectorAll('.knowledge-sparkle, .hover-sparkle').forEach(el => el.remove());
            
            console.log('📚 Loading enhanced resources...');
            this.loadEnhancedResources();
            console.log('🔍 Building search index...');
            this.buildAdvancedSearchIndex();
            console.log('🎓 Generating learning paths...');
            this.generateLearningPaths();
            console.log('📊 Calculating analytics...');
            this.calculateAnalytics();
            
            console.log('📝 Data loaded, starting render...');
            this.render();
            
            console.log('🎧 Setting up event listeners...');
            this.setupEventListeners();
            console.log('✨ Initializing spectacular effects...');
            this.initializeSpectacularEffects();
            console.log('📡 Starting real-time updates...');
            this.startRealTimeUpdates();
            console.log('🎬 Initializing animations...');
            this.initializeAnimations();
            
            this.isInitialized = true;
            console.log('✅ Enhanced Knowledge Hub fully initialized!');
            
            // Final cleanup of any sparkles that might have been created
            setTimeout(() => {
                document.querySelectorAll('.knowledge-sparkle, .hover-sparkle, .knowledge-sparkles').forEach(el => el.remove());
            }, 100);
            
        } catch (error) {
            console.error('❌ Enhanced Knowledge Hub initialization failed:', error);
            console.error('Error stack:', error.stack);
        }
    }

    disconnectedCallback() {
        console.log('Enhanced Knowledge Hub disconnecting...');
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
            this.realTimeUpdates = null;
        }
        
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.particleSystem) {
            this.cleanupParticleSystem();
        }
        
        console.log('Enhanced Knowledge Hub cleanup complete');
    }

    handleThemeChange(theme) {
        // Update component styling based on color picker theme
        const root = document.documentElement;
        root.style.setProperty('--knowledge-hub-primary', `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`);
        root.style.setProperty('--knowledge-hub-primary-light', `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`);
        root.style.setProperty('--knowledge-hub-primary-dark', `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`);
        
        // Trigger visual refresh
        this.refreshSpectacularEffects();
    }

    initializeSpectacularEffects() {
        console.log('✨ Initializing spectacular effects...');
        
        // NUCLEAR OPTION - Force spectacular styling on ALL elements
        setTimeout(() => {
            const container = this.querySelector('.enhanced-knowledge-hub');
            if (container) {
                container.classList.add('spectacular-mode');
                
                // FORCE styling on ALL elements
                const allElements = this.querySelectorAll('*');
                allElements.forEach(element => {
                    // Force white text on everything except inputs
                    if (!element.matches('input, select, textarea')) {
                        element.style.color = 'white';
                    }
                    
                    // Remove any white backgrounds
                    if (element.style.backgroundColor === 'white' || 
                        element.style.backgroundColor === '#fff' || 
                        element.style.backgroundColor === '#ffffff' ||
                        element.style.background === 'white' ||
                        element.style.background === '#fff' ||
                        element.style.background === '#ffffff') {
                        element.style.background = 'transparent';
                        element.style.backgroundColor = 'transparent';
                    }
                });
                
                // Force styling on all cards with highest priority
                const cards = this.querySelectorAll('.ai-insight-card, .analytics-card, .learning-path-card, .enhanced-resource-card, .resource-card, .insight-card, .stat-card, .card');
                cards.forEach(card => {
                    card.style.setProperty('background', 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)', 'important');
                    card.style.setProperty('backdrop-filter', 'blur(15px)', 'important');
                    card.style.setProperty('-webkit-backdrop-filter', 'blur(15px)', 'important');
                    card.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.2)', 'important');
                    card.style.setProperty('color', 'white', 'important');
                    card.style.setProperty('border-radius', 'var(--radius-xl)', 'important');
                    card.style.setProperty('padding', 'var(--space-5)', 'important');
                    card.style.setProperty('box-shadow', '0 8px 20px rgba(99, 102, 241, 0.2)', 'important');
                });
                
                // Force styling on all sections
                const sections = this.querySelectorAll('.ai-insights-section, .learning-analytics, .learning-paths-section, .resources-section, .section');
                sections.forEach(section => {
                    section.style.setProperty('background', 'transparent', 'important');
                    section.style.setProperty('background-color', 'transparent', 'important');
                });
                
                // Force text colors with highest priority
                const textElements = this.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, .insight-title, .section-title, .hub-title, .resource-title, .stat-label, .confidence-text, .insight-description, .resource-summary');
                textElements.forEach(element => {
                    element.style.setProperty('color', 'white', 'important');
                });
                
                // Force button styling
                const buttons = this.querySelectorAll('button, .btn, .resource-btn, .insight-action-btn');
                buttons.forEach(button => {
                    button.style.setProperty('background', 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2))', 'important');
                    button.style.setProperty('color', 'white', 'important');
                    button.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.3)', 'important');
                });
                
                // Force badges and tags
                const badges = this.querySelectorAll('.badge, .tag, .resource-tag, .impact-badge, .confidence-indicator, .priority-badge');
                badges.forEach(badge => {
                    badge.style.setProperty('background', 'rgba(255, 255, 255, 0.2)', 'important');
                    badge.style.setProperty('color', 'white', 'important');
                    badge.style.setProperty('border', '1px solid rgba(255, 255, 255, 0.3)', 'important');
                });
                
                console.log('🚨 NUCLEAR STYLING APPLIED - All elements forced to spectacular mode');
            }
        }, 100);
        
        // Additional forcing after a longer delay
        setTimeout(() => {
            this.forceSpectacularStyling();
        }, 500);
        
        // Create spectacular particle system
        this.createParticleSystem();
        
        // Add floating geometric shapes
        this.addFloatingShapes();
        
        // Initialize sparkle effects
        // this.initializeSparkles(); // Disabled to prevent overflow
        
        // Add energy rings
        this.addEnergyRings();
    }

    createParticleSystem() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'knowledge-particles-system';
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'knowledge-particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${Math.random() * 8 + 12}s;
            `;
            particlesContainer.appendChild(particle);
        }
        
        this.appendChild(particlesContainer);
        this.particleSystem = particlesContainer;
    }

    addFloatingShapes() {
        // Add floating geometric shapes for visual appeal
        for (let i = 0; i < 8; i++) {
            const shape = document.createElement('div');
            shape.className = 'knowledge-floating-shape';
            shape.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
                animation-duration: ${Math.random() * 15 + 20}s;
            `;
            this.appendChild(shape);
        }
    }

    initializeSparkles() {
        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'knowledge-sparkles';
        
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'knowledge-sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                left: ${Math.random() * 85 + 5}%;
                top: ${Math.random() * 85 + 5}%;
                animation-delay: ${Math.random() * 6}s;
                font-size: ${Math.random() * 0.3 + 0.7}rem;
            `;
            sparklesContainer.appendChild(sparkle);
        }
        
        this.appendChild(sparklesContainer);
    }

    addEnergyRings() {
        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'knowledge-energy-ring';
            ring.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${i * 2}s;
            `;
            this.appendChild(ring);
        }
    }

    refreshSpectacularEffects() {
        // Refresh particle colors and effects based on new theme
        const particles = this.querySelectorAll('.knowledge-particle');
        particles.forEach(particle => {
            particle.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
        });
    }

    cleanupParticleSystem() {
        if (this.particleSystem) {
            this.particleSystem.remove();
            this.particleSystem = null;
        }
        
        // Clean up other spectacular effects
        this.querySelectorAll('.knowledge-floating-shape, .knowledge-sparkles, .knowledge-energy-ring').forEach(el => el.remove());
        
        // Clean up any escaped sparkles on the page
        document.querySelectorAll('.knowledge-sparkle, .hover-sparkle').forEach(el => el.remove());
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
        console.log('🚀 Enhanced Knowledge Hub: Starting render...');
        console.log('🤖 AI Insights data:', this.aiInsights);
        console.log('📊 Learning Analytics:', this.learningAnalytics);
        console.log('🎯 AI Insights length:', this.aiInsights?.length || 0);
        
        // Check if aiInsights exists and has content
        if (!this.aiInsights || this.aiInsights.length === 0) {
            console.error('❌ AI Insights data is missing or empty!');
        } else {
            console.log('✅ AI Insights data is available:', this.aiInsights.length, 'insights');
        }
        
        this.innerHTML = `
            <div class="enhanced-knowledge-hub spectacular-mode" style="display: block !important; width: 100% !important; position: relative !important; background: linear-gradient(45deg, var(--primary-500) 0%, transparent 50%, var(--primary-500) 100%), linear-gradient(-45deg, var(--primary-600) 0%, transparent 50%, var(--primary-600) 100%), linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 25%, transparent 50%, rgba(6, 182, 212, 0.4) 75%, transparent 100%), linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%), radial-gradient(ellipse 1200px 800px at 20% 20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%), radial-gradient(ellipse 800px 1200px at 80% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%), radial-gradient(ellipse 600px 600px at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 70%), radial-gradient(ellipse 600px 600px at 10% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 60%), repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px), repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255, 255, 255, 0.04) 4px, rgba(255, 255, 255, 0.04) 8px) !important; border-radius: var(--radius-2xl) !important; padding: var(--space-8) !important; color: white !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; backdrop-filter: blur(20px) !important; animation: knowledgeGlow 6s ease-in-out infinite, knowledgeBackgroundShift 20s linear infinite, knowledgeSubtlePulse 4s ease-in-out infinite !important;">
                <!-- Spectacular Header Section with Multi-layered Background -->
                <div class="hub-header spectacular">
                    <div class="header-content">
                        <h2 class="hub-title spectacular">
                            <svg class="title-icon spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M20 17H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                <path d="M20 12H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                                <path d="M20 7H6.5A2.5 2.5 0 0 1 4 4.5"></path>
                            </svg>
                            Enhanced Knowledge Hub
                            <span class="spectacular-badge">AI-POWERED</span>
                        </h2>
                        <p class="hub-subtitle spectacular">Intelligent resource discovery with personalized learning paths</p>
                    </div>
                    <div class="header-actions spectacular">
                        <div class="search-container spectacular">
                                <svg class="search-icon spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input 
                                    type="text" 
                                    id="knowledgeSearch" 
                                class="enhanced-search spectacular" 
                                    placeholder="AI-powered search..."
                                    autocomplete="off"
                                    spellcheck="false"
                                />
                            <button class="ai-search-btn spectacular" aria-label="AI Search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </button>
                                <div class="search-suggestions spectacular" id="searchSuggestions"></div>
                            </div>
                        <div class="view-controls spectacular">
                            <button class="view-btn spectacular ${this.viewMode === 'grid' ? 'active' : ''}" data-view="grid">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                Grid
                            </button>
                            <button class="view-btn spectacular ${this.viewMode === 'list' ? 'active' : ''}" data-view="list">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                List
                            </button>
                        </div>
                    </div>
                </div>

                <!-- AI Insights Section with Spectacular Enhancement -->
                <div class="ai-insights-section spectacular" style="background: transparent !important;">
                    <h3 class="insights-title spectacular">
                        <svg class="section-icon-svg spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        AI-Powered Learning Insights
                        <span class="live-indicator spectacular">🔴 LIVE</span>
                    </h3>
                    <div class="ai-insights-grid spectacular">
                        ${this.aiInsights.map((insight, index) => {
                            console.log(`🎯 Rendering insight ${index + 1}:`, insight.title);
                            return `
                            <div class="ai-insight-card spectacular ${insight.type}" data-priority="${insight.priority}" style="animation-delay: ${index * 0.1}s; background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%) !important; backdrop-filter: blur(15px) !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; color: white !important; border-radius: var(--radius-xl) !important; padding: var(--space-5) !important;">
                                <div class="insight-header spectacular">
                                    <div class="insight-icon spectacular ${insight.type}">
                                        ${this.getInsightIcon(insight.type)}
                                    </div>
                                    <div class="insight-meta spectacular">
                                        <h4 class="insight-title spectacular">${insight.title}</h4>
                                        <div class="insight-badges spectacular">
                                            <span class="priority-badge ${insight.priority}">${insight.priority}</span>
                                            <span class="time-badge">${insight.estimatedTime}</span>
                                            <span class="skill-badge">${insight.skillImpact}</span>
                                        </div>
                                        <div class="confidence-indicator spectacular">
                                            <div class="confidence-bar spectacular">
                                                <div class="confidence-fill spectacular" style="width: ${insight.confidence}%"></div>
                                            </div>
                                            <span class="confidence-text spectacular">${insight.confidence}% AI confidence</span>
                                        </div>
                                    </div>
                                    <div class="impact-badge spectacular ${insight.impact}">${insight.impact} impact</div>
                                </div>
                                <p class="insight-description spectacular">${insight.description}</p>
                                <div class="insight-actions spectacular">
                                    <button class="insight-action-btn spectacular primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Apply AI Suggestion
                                    </button>
                                    <button class="insight-action-btn spectacular secondary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>

                <!-- Enhanced Learning Analytics Dashboard -->
                <div class="learning-analytics spectacular">
                    <h3 class="analytics-title spectacular">
                        <svg class="section-icon-svg spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Smart Learning Analytics
                    </h3>
                    <div class="analytics-grid spectacular">
                        <div class="analytics-card spectacular progress-card">
                            <div class="card-header spectacular">
                                <h4>Your Learning Journey</h4>
                                <div class="progress-ring-container">
                                    <svg class="progress-ring spectacular" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255, 255, 255, 0.2)" stroke-width="6"/>
                                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#progressGradient)" stroke-width="6" 
                                            stroke-dasharray="283" stroke-dashoffset="${283 - (283 * this.learningAnalytics.weeklyGoal / 100)}"
                                            transform="rotate(-90 50 50)" stroke-linecap="round"/>
                                        <defs>
                                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style="stop-color:var(--primary-400);stop-opacity:1" />
                                                <stop offset="100%" style="stop-color:var(--primary-600);stop-opacity:1" />
                                            </linearGradient>
                                        </defs>
                                        </svg>
                                    <div class="progress-center">
                                        <span class="progress-value">${this.learningAnalytics.weeklyGoal}%</span>
                                        <span class="progress-label">Weekly Goal</span>
                                    </div>
                                </div>
                            </div>
                            <div class="progress-stats spectacular">
                                <div class="progress-stat">
                                    <span class="stat-value">${this.learningAnalytics.completedCourses}</span>
                                    <span class="stat-label">Courses Completed</span>
                                    </div>
                                <div class="progress-stat">
                                    <span class="stat-value">${this.learningAnalytics.learningStreak}</span>
                                    <span class="stat-label">Day Streak</span>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card spectacular skill-gaps-card">
                            <div class="card-header spectacular">
                                <h4>AI-Detected Skill Gaps</h4>
                                <span class="ai-powered-badge">🤖 AI</span>
                            </div>
                            <div class="skill-gaps spectacular">
                                ${this.learningAnalytics.skillGaps.map(gap => `
                                    <div class="skill-gap-item spectacular priority-${gap.priority}">
                                        <div class="gap-info">
                                            <span class="gap-skill">${gap.skill}</span>
                                            <span class="gap-level">${gap.gap} Priority</span>
                                        </div>
                                        <div class="gap-progress spectacular">
                                            <div class="gap-fill ${gap.priority}"></div>
                                        </div>
                                        <button class="gap-action-btn spectacular">Fix</button>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="analytics-card spectacular trending-card">
                            <div class="card-header spectacular">
                                <h4>Trending in Your Network</h4>
                                <div class="trend-indicator spectacular">📈 +127%</div>
                            </div>
                            <div class="trending-topics spectacular">
                                ${this.learningAnalytics.trendingTopics.map((topic, index) => `
                                    <div class="trending-item spectacular" style="animation-delay: ${index * 0.1}s">
                                        <div class="trending-rank spectacular">#${index + 1}</div>
                                        <div class="trending-info">
                                            <span class="trending-title">${topic.title}</span>
                                            <span class="trending-stats">${topic.views} views • +${topic.growth}%</span>
                                        </div>
                                        <div class="trending-spark">✨</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Learning Paths with Spectacular Visuals -->
                <div class="learning-paths-section spectacular">
                    <h3 class="section-title spectacular">
                        <svg class="section-icon-svg spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        AI-Curated Learning Paths
                        <span class="path-count-badge">${this.learningPaths.length} active</span>
                    </h3>
                    <div class="learning-paths-grid spectacular">
                        ${this.learningPaths.map((path, index) => `
                            <div class="learning-path-card spectacular" style="animation-delay: ${index * 0.2}s">
                                <div class="path-header spectacular">
                                    <h4 class="path-title">${path.title}</h4>
                                    <div class="path-meta spectacular">
                                        <span class="path-duration">⏱️ ${path.duration}</span>
                                        <span class="path-difficulty">📊 ${path.difficulty}</span>
                                    </div>
                                </div>
                                <p class="path-description">${path.description}</p>
                                <div class="path-progress spectacular">
                                    <div class="progress-bar spectacular">
                                        <div class="progress-fill spectacular" style="width: ${path.progress}%"></div>
                                        <div class="progress-shine"></div>
                                    </div>
                                    <span class="progress-text">${path.progress}% Complete</span>
                                    <span class="progress-eta">⏰ ${path.estimatedCompletion} remaining</span>
                                </div>
                                <div class="path-skills spectacular">
                                    ${path.skills.map(skill => `
                                        <span class="skill-badge spectacular">${skill}</span>
                                    `).join('')}
                                </div>
                                <div class="path-actions spectacular">
                                    <button class="path-btn spectacular primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                        Continue Learning
                                    </button>
                                    <button class="path-btn spectacular secondary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        View Roadmap
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Enhanced Resources Section -->
                <div class="resources-section spectacular">
                    <div class="section-header spectacular">
                        <h3 class="section-title spectacular">
                            <svg class="section-icon-svg spectacular" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            Smart Learning Resources
                            <span class="resource-count-badge spectacular">${this.getFilteredResources().length} resources</span>
                        </h3>
                        <div class="section-actions spectacular">
                            <button class="action-btn spectacular" id="aiRecommendations">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                AI Picks
                            </button>
                            <button class="action-btn spectacular" id="sortByPopularity">Most Popular</button>
                            <button class="action-btn spectacular" id="sortByRecent">Recently Added</button>
                            <button class="action-btn spectacular" id="sortByRating">Highest Rated</button>
                        </div>
                    </div>
                    
                    <div class="resources-container spectacular ${this.viewMode}" style="display: grid !important; width: 100% !important;">
                        ${this.getFilteredResources().map((resource, index) => this.renderEnhancedResourceCard(resource, index)).join('')}
                    </div>
                </div>


            </div>
        `;
        // Add post-render verification
        setTimeout(() => {
            console.log('🔍 POST-RENDER VERIFICATION:');
            const insightsSection = this.querySelector('.ai-insights-section');
            const insightsGrid = this.querySelector('.ai-insights-grid');
            const insightCards = this.querySelectorAll('.ai-insight-card');
            
            console.log('📍 AI Insights Section found:', !!insightsSection);
            console.log('📍 AI Insights Grid found:', !!insightsGrid);
            console.log('📍 AI Insight Cards found:', insightCards.length);
            
            if (insightsSection) {
                console.log('📐 Section dimensions:', {
                    offsetWidth: insightsSection.offsetWidth,
                    offsetHeight: insightsSection.offsetHeight,
                    display: getComputedStyle(insightsSection).display,
                    visibility: getComputedStyle(insightsSection).visibility
                });
            }
            
            if (insightsGrid) {
                console.log('📐 Grid dimensions:', {
                    offsetWidth: insightsGrid.offsetWidth,
                    offsetHeight: insightsGrid.offsetHeight,
                    innerHTML: insightsGrid.innerHTML.length + ' chars'
                });
            }
            
            if (insightCards.length === 0) {
                console.error('❌ NO AI INSIGHT CARDS FOUND IN DOM!');
                console.log('🔍 Checking for any element with "insight" in class name...');
                const anyInsightElements = this.querySelectorAll('[class*="insight"]');
                console.log('📍 Elements with "insight" in class:', anyInsightElements.length);
                anyInsightElements.forEach((el, i) => {
                    console.log(`   ${i+1}. ${el.className}`);
                });
            } else {
                console.log('✅ AI Insight cards successfully rendered!');
                insightCards.forEach((card, i) => {
                    console.log(`   Card ${i+1}: ${card.querySelector('.insight-title')?.textContent}`);
                });
            }
        }, 100);
        
        console.log('📝 Render method completed successfully');
    }

    renderEnhancedResourceCard(resource, index = 0) {
        const difficultyColor = {
            'Beginner': 'success',
            'Intermediate': 'warning', 
            'Advanced': 'danger'
        };

        return `
            <div class="enhanced-resource-card spectacular ${resource.isNew ? 'new' : ''} ${resource.isFeatured ? 'featured' : ''}" 
                 data-id="${resource.id}" style="animation-delay: ${index * 0.1}s">
                <div class="resource-header spectacular">
                    <div class="resource-icon spectacular ${resource.type}">
                        ${this.getResourceIcon(resource.type)}
                    </div>
                    <div class="resource-badges spectacular">
                        ${resource.isNew ? '<span class="badge spectacular new">✨ NEW</span>' : ''}
                        ${resource.isFeatured ? '<span class="badge spectacular featured">🏆 FEATURED</span>' : ''}
                        <span class="badge spectacular difficulty ${difficultyColor[resource.difficulty]}">${resource.difficulty}</span>
                        <span class="badge spectacular ai-score">🤖 ${resource.aiScore}</span>
                    </div>
                </div>
                
                <div class="resource-content spectacular">
                    <h4 class="resource-title spectacular">${resource.title}</h4>
                    <p class="resource-summary spectacular">${resource.summary}</p>
                    
                    <div class="resource-meta spectacular">
                        <div class="meta-item spectacular">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span>${resource.duration}</span>
                        </div>
                        <div class="meta-item spectacular">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span>${resource.instructor}</span>
                        </div>
                        <div class="meta-item spectacular">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            <span>${resource.rating}/5.0</span>
                        </div>
                    </div>
                    
                    <div class="resource-stats spectacular">
                        <div class="stat spectacular">
                            <span class="stat-value">${resource.views}</span>
                            <span class="stat-label">Views</span>
                        </div>
                        <div class="stat spectacular">
                            <span class="stat-value">${resource.completionRate}%</span>
                            <span class="stat-label">Completion</span>
                        </div>
                        <div class="stat spectacular">
                            <span class="stat-value">${resource.downloads}</span>
                            <span class="stat-label">Downloads</span>
                        </div>
                    </div>
                    
                    <div class="resource-tags spectacular">
                        ${resource.tags.map(tag => `
                            <span class="resource-tag spectacular">#${tag}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="resource-actions spectacular">
                    <button class="resource-btn spectacular primary" data-action="start">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        Start Learning
                        <div class="btn-shimmer"></div>
                    </button>
                    <button class="resource-btn spectacular secondary" data-action="preview">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                        Preview
                    </button>
                    <button class="resource-btn spectacular tertiary" data-action="bookmark">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                </div>
                
                <div class="resource-hover-effects">
                    <div class="hover-particle"></div>
                    <div class="hover-particle"></div>
                    <div class="hover-particle"></div>
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

    getCategoryIcon(category) {
        const icons = {
            'Development': '💻',
            'Design': '🎨',
            'Product': '🚀',
            'Analytics': '📊',
            'Sales': '💰',
            'Security': '🔒',
            'Marketing': '📈',
            'Leadership': '👑'
        };
        return icons[category] || '📚';
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
        // Search functionality with AI enhancement
        const searchInput = this.querySelector('.enhanced-search, #knowledgeSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.updateResourceDisplay();
                
                // Add AI search suggestions
                if (this.searchQuery.length > 2) {
                    this.showAISearchSuggestions();
                }
            });
        }

        // AI search button
        const aiSearchBtn = this.querySelector('.ai-search-btn');
        if (aiSearchBtn) {
            aiSearchBtn.addEventListener('click', () => {
                this.performAISearch();
            });
        }

        // Enhanced view mode controls
        this.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.viewMode = e.currentTarget.dataset.view;
                this.updateViewMode();
                this.triggerSpectacularTransition();
            });
        });

        // Enhanced filter controls
        this.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.currentFilter = e.currentTarget.dataset.filter;
                this.updateFilters();
                this.triggerSpectacularTransition();
            });
        });

        // Resource actions with enhanced feedback
        this.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const resourceId = parseInt(actionBtn.closest('.enhanced-resource-card').dataset.id);
                this.handleResourceAction(action, resourceId, actionBtn);
            }
        });

        // AI recommendations button
        const aiRecommendationsBtn = this.querySelector('#aiRecommendations');
        if (aiRecommendationsBtn) {
            aiRecommendationsBtn.addEventListener('click', () => {
                this.showAIRecommendations();
            });
        }

        // Sort controls with spectacular effects
        this.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (e.currentTarget.id.startsWith('sortBy')) {
                const sortBy = e.currentTarget.id.replace('sortBy', '').toLowerCase();
                this.sortResources(sortBy);
                    this.triggerSpectacularTransition();
                }
            });
        });

        // Add spectacular hover effects to cards
        this.addEventListener('mouseenter', (e) => {
            const card = e.target.closest('.enhanced-resource-card, .ai-insight-card, .learning-path-card, .analytics-card');
            if (card) {
                this.addHoverSparkles(card);
            }
        }, true);

        this.addEventListener('mouseleave', (e) => {
            const card = e.target.closest('.enhanced-resource-card, .ai-insight-card, .learning-path-card, .analytics-card');
            if (card) {
                this.removeHoverSparkles(card);
            }
        }, true);
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

    handleResourceAction(action, resourceId, button) {
        const resource = this.resources.find(r => r.id === resourceId);
        if (!resource) return;

        // Add button animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);

        switch (action) {
            case 'start':
                this.startLearning(resource);
                break;
            case 'preview':
                this.previewResource(resource);
                break;
            case 'bookmark':
                this.bookmarkResource(resource);
                break;
        }
    }

    startLearning(resource) {
        console.log('Starting learning:', resource.title);
        this.showNotification(`🚀 Starting "${resource.title}" - Happy learning!`, 'success');
        this.triggerSpectacularTransition();
    }

    previewResource(resource) {
        console.log('Previewing resource:', resource.title);
        this.showNotification(`👀 Previewing "${resource.title}"`, 'info');
    }

    bookmarkResource(resource) {
        console.log('Bookmarking resource:', resource.title);
        this.showNotification(`📚 Bookmarked "${resource.title}"`, 'success');
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
        this.observer = observer; // Store observer for cleanup
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `knowledge-notification spectacular ${type}`;
        notification.innerHTML = `
            <div class="notification-content spectacular">
                <div class="notification-icon">${this.getNotificationIcon(type)}</div>
                <span class="notification-text">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️',
            error: '❌'
        };
        return icons[type] || 'ℹ️';
    }

    performAISearch() {
        this.showNotification('🤖 AI is analyzing your search...', 'info');
        
        // Simulate AI search processing
        setTimeout(() => {
            this.showNotification('✨ AI found enhanced results for you!', 'success');
            this.updateResourceDisplay();
        }, 1500);
    }

    showAISearchSuggestions() {
        // Implementation for AI search suggestions
        console.log('Showing AI search suggestions for:', this.searchQuery);
    }

    showAIRecommendations() {
        // Filter resources by AI score and show them
        const aiRecommended = this.resources
            .filter(r => r.aiScore > 90)
            .sort((a, b) => b.aiScore - a.aiScore);
        
        this.showNotification(`🤖 Found ${aiRecommended.length} AI-recommended resources!`, 'success');
        this.triggerSpectacularTransition();
    }

    triggerSpectacularTransition() {
        // Add spectacular transition effects
        const cards = this.querySelectorAll('.enhanced-resource-card, .ai-insight-card, .learning-path-card');
        cards.forEach((card, index) => {
            card.style.animation = 'none';
            card.style.animationDelay = `${index * 0.05}s`;
            setTimeout(() => {
                card.style.animation = 'knowledgeSpectacularEntrance 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, 10);
        });
    }

    addHoverSparkles(element) {
        // Disabled to prevent sparkles from escaping container bounds
        return;
        
        if (!this.spectacularMode) return;
        
        for (let i = 0; i < 1; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'hover-sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: absolute;
                left: ${Math.random() * 80 + 10}%;
                top: ${Math.random() * 80 + 10}%;
                pointer-events: none;
                z-index: 10;
                animation: knowledgeSparkleFloat 1s ease-out forwards;
                font-size: 0.7rem;
            `;
            element.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    removeHoverSparkles(element) {
        const sparkles = element.querySelectorAll('.hover-sparkle');
        sparkles.forEach(sparkle => sparkle.remove());
    }

    forceSpectacularStyling() {
        console.log('🔥 ULTIMATE FORCE: Applying nuclear styling...');
        
        // ULTRA-AGGRESSIVE: Apply styling every 100ms for the first 15 seconds
        const ultraForceInterval = setInterval(() => {
            const container = this.querySelector('.enhanced-knowledge-hub');
            if (!container) {
                clearInterval(ultraForceInterval);
                return;
            }
            
            // Force container to be spectacular with maximum specificity
            container.className = 'enhanced-knowledge-hub spectacular-mode';
            container.style.cssText = `
                background: 
                    linear-gradient(45deg, var(--primary-500) 0%, transparent 50%, var(--primary-500) 100%),
                    linear-gradient(-45deg, var(--primary-600) 0%, transparent 50%, var(--primary-600) 100%),
                    linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.4) 25%, transparent 50%, rgba(6, 182, 212, 0.4) 75%, transparent 100%),
                    linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%),
                    radial-gradient(ellipse 1200px 800px at 20% 20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%),
                    radial-gradient(ellipse 800px 1200px at 80% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),
                    radial-gradient(ellipse 600px 600px at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 70%),
                    radial-gradient(ellipse 600px 600px at 10% 80%, rgba(245, 158, 11, 0.3) 0%, transparent 60%),
                    repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255, 255, 255, 0.08) 2px, rgba(255, 255, 255, 0.08) 4px),
                    repeating-linear-gradient(-45deg, transparent, transparent 4px, rgba(255, 255, 255, 0.04) 4px, rgba(255, 255, 255, 0.04) 8px) !important;
                border-radius: var(--radius-2xl) !important;
                padding: var(--space-8) !important;
                color: white !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                animation: knowledgeGlow 6s ease-in-out infinite, knowledgeBackgroundShift 20s linear infinite, knowledgeSubtlePulse 4s ease-in-out infinite !important;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.2) !important;
            `;
            
            // Force ALL elements to have white text
            const allElements = this.querySelectorAll('*');
            allElements.forEach(element => {
                if (!element.matches('input, select, textarea, .search-input')) {
                    element.style.setProperty('color', 'white', 'important');
                    
                    // Remove any non-transparent backgrounds
                    if (element.style.backgroundColor && 
                        element.style.backgroundColor !== 'transparent' && 
                        element.style.backgroundColor !== 'rgba(0, 0, 0, 0)') {
                        element.style.setProperty('background-color', 'transparent', 'important');
                    }
                }
            });
            
            // Force cards with ultra-high specificity
            const cards = this.querySelectorAll('.ai-insight-card, .analytics-card, .learning-path-card, .enhanced-resource-card, .resource-card, .insight-card, .stat-card, .card');
            cards.forEach(card => {
                card.style.cssText = `
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%) !important;
                    backdrop-filter: blur(15px) !important;
                    -webkit-backdrop-filter: blur(15px) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    color: white !important;
                    border-radius: var(--radius-xl) !important;
                    padding: var(--space-5) !important;
                    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2) !important;
                `;
            });
            
            // Force sections to be transparent
            const sections = this.querySelectorAll('.ai-insights-section, .learning-analytics, .learning-paths-section, .resources-section, .section');
            sections.forEach(section => {
                section.style.setProperty('background', 'transparent', 'important');
                section.style.setProperty('background-color', 'transparent', 'important');
            });
            
            // Force buttons
            const buttons = this.querySelectorAll('button, .btn, .resource-btn, .insight-action-btn');
            buttons.forEach(button => {
                button.style.cssText = `
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2)) !important;
                    color: white !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    border-radius: var(--radius-lg) !important;
                `;
            });
            
            // Force badges
            const badges = this.querySelectorAll('.badge, .tag, .resource-tag, .impact-badge, .confidence-indicator, .priority-badge');
            badges.forEach(badge => {
                badge.style.cssText = `
                    background: rgba(255, 255, 255, 0.2) !important;
                    color: white !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                `;
            });
            
            console.log('🚨 NUCLEAR STYLING CYCLE COMPLETE');
            
        }, 100); // Every 100ms for maximum override
        
        // Stop ultra-forcing after 15 seconds, then continue with normal forcing
        setTimeout(() => {
            clearInterval(ultraForceInterval);
            console.log('🎯 Ultra-force complete, continuing with normal enforcement...');
            
            // Continue with less frequent forcing
            const normalForceInterval = setInterval(() => {
                const container = this.querySelector('.enhanced-knowledge-hub');
                if (!container) {
                    clearInterval(normalForceInterval);
                    return;
                }
                
                // Apply styling less frequently
                container.classList.add('spectacular-mode');
                const allText = this.querySelectorAll('*:not(input):not(select):not(textarea)');
                allText.forEach(el => {
                    if (el.textContent && el.textContent.trim()) {
                        el.style.setProperty('color', 'white', 'important');
                    }
                });
                
            }, 1000); // Every 1 second
            
            // Stop normal forcing after 30 more seconds
            setTimeout(() => {
                clearInterval(normalForceInterval);
                console.log('🏁 All styling enforcement complete');
            }, 30000);
            
        }, 15000);
    }
}

console.log('📝 About to register Enhanced Knowledge Hub component...');
try {
    customElements.define('enhanced-knowledge-hub', EnhancedKnowledgeHub);
    console.log('✅ Enhanced Knowledge Hub component registered successfully!');
} catch (error) {
    console.error('❌ Failed to register Enhanced Knowledge Hub component:', error);
    console.error('Error details:', error.message);
} 