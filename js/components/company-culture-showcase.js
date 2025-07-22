// Company Culture Showcase Component
class CompanyCultureShowcase extends HTMLElement {
    constructor() {
        super();
        this.currentStoryIndex = 0;
        this.stories = [
            {
                name: "Sarah Chen",
                role: "Senior Developer",
                department: "Engineering",
                story: "I joined Quantum Forge 3 years ago and have grown from a junior developer to leading our AI initiatives. The culture of continuous learning and mentorship has been transformative. I've had the opportunity to work on cutting-edge projects while maintaining a healthy work-life balance.",
                achievement: "Led 5 major AI projects",
                avatar: "👩‍💻",
                color: "#6366f1",
                impact: "Mentored 12 junior developers",
                hobbies: "Rock climbing, Open source contributor",
                quote: "Here, innovation meets inclusivity."
            },
            {
                name: "Marcus Rodriguez",
                role: "Product Manager",
                department: "Product",
                story: "The collaborative environment here is unmatched. Every team member's voice is heard, and we've built products that truly make a difference in people's lives. Our flexible work policy allows me to be there for my family while delivering impactful solutions.",
                achievement: "Launched 3 successful products",
                avatar: "👨‍💼",
                color: "#10b981",
                impact: "40% increase in user satisfaction",
                hobbies: "Marathon runner, Community volunteer",
                quote: "We don't just build products, we build community."
            },
            {
                name: "Aisha Patel",
                role: "UX Designer",
                department: "Design",
                story: "Quantum Forge's commitment to user-centered design and accessibility has allowed me to create experiences that everyone can enjoy. The cross-functional collaboration and emphasis on continuous learning have helped me grow both professionally and personally.",
                achievement: "Improved user satisfaction by 40%",
                avatar: "👩‍🎨",
                color: "#f59e0b",
                impact: "Led accessibility initiative",
                hobbies: "Digital art, Teaching design",
                quote: "Design is about making life better for everyone."
            },
            {
                name: "David Kim",
                role: "Data Scientist",
                department: "Analytics",
                story: "The data-driven culture here has enabled me to work on cutting-edge ML projects while maintaining ethical AI practices. The support for innovation and experimentation is phenomenal, and we're encouraged to share our findings with the wider tech community.",
                achievement: "Developed 8 ML models",
                avatar: "👨‍🔬",
                color: "#8b5cf6",
                impact: "Reduced processing time by 60%",
                hobbies: "Chess player, Tech blogger",
                quote: "Data with purpose, innovation with responsibility."
            },
            {
                name: "Elena Martinez",
                role: "Engineering Manager",
                department: "Platform",
                story: "What sets Quantum Forge apart is our commitment to both technical excellence and human development. We've created an environment where engineers can innovate while growing as leaders. Our mentorship program has become a model for other companies.",
                achievement: "Built high-performing team of 20",
                avatar: "👩‍💼",
                color: "#ec4899",
                impact: "95% team retention rate",
                hobbies: "Salsa dancing, Mentoring",
                quote: "Great teams build great products."
            }
        ];
        
        this.values = [
            {
                title: "Innovation First",
                description: "We embrace new ideas and technologies to solve complex challenges",
                icon: "🚀",
                color: "#6366f1",
                examples: ["AI Ethics Committee", "Innovation Lab", "Hackathons"]
            },
            {
                title: "Collaboration",
                description: "Great things happen when we work together and share knowledge",
                icon: "🤝",
                color: "#10b981",
                examples: ["Cross-team Projects", "Knowledge Sharing", "Mentorship Program"]
            },
            {
                title: "User-Centric",
                description: "Every decision we make starts with our users' needs",
                icon: "🎯",
                color: "#f59e0b",
                examples: ["User Research", "Accessibility First", "Customer Feedback Loop"]
            },
            {
                title: "Continuous Learning",
                description: "We grow together through knowledge sharing and skill development",
                icon: "📚",
                color: "#8b5cf6",
                examples: ["Learning Budget", "Tech Talks", "Conference Speaking"]
            },
            {
                title: "Diversity & Inclusion",
                description: "Different perspectives make us stronger and more innovative",
                icon: "🌈",
                color: "#ec4899",
                examples: ["ERGs", "Inclusive Hiring", "Cultural Celebrations"]
            },
            {
                title: "Sustainability",
                description: "We build for the future while caring for our planet",
                icon: "🌱",
                color: "#059669",
                examples: ["Green Office", "Carbon Neutral", "Sustainable Tech"]
            }
        ];

        this.culturePulse = {
            overall: 92,
            trend: "+5",
            categories: [
                { name: "Work-Life Balance", score: 89, trend: "+3" },
                { name: "Innovation Culture", score: 95, trend: "+7" },
                { name: "Team Collaboration", score: 91, trend: "+2" },
                { name: "Career Growth", score: 88, trend: "+4" }
            ]
        };

        this.diversityMetrics = {
            genderBalance: { male: 52, female: 45, nonBinary: 3 },
            ageGroups: { "20-29": 35, "30-39": 40, "40-49": 20, "50+": 5 },
            departments: [
                { name: "Engineering", diversity: 78 },
                { name: "Design", diversity: 85 },
                { name: "Product", diversity: 82 },
                { name: "Marketing", diversity: 90 }
            ]
        };

        this.recognitions = [
            {
                name: "Alex Thompson",
                achievement: "Innovation Champion",
                description: "Led breakthrough AI integration project",
                date: "2 days ago",
                icon: "🏆",
                color: "#f59e0b"
            },
            {
                name: "Sarah Chen",
                achievement: "Collaboration Award", 
                description: "Mentored 5 junior developers this quarter",
                date: "1 week ago",
                icon: "🤝",
                color: "#10b981"
            },
            {
                name: "Marcus Rodriguez",
                achievement: "User Impact Award",
                description: "Improved user satisfaction by 40%",
                date: "2 weeks ago",
                icon: "🎯",
                color: "#6366f1"
            }
        ];

        this.milestones = [
            {
                year: "2024",
                title: "Global Expansion",
                description: "Opened offices in 5 new countries",
                icon: "🌍",
                active: true
            },
            {
                year: "2023", 
                title: "1M Users Milestone",
                description: "Reached 1 million active users worldwide",
                icon: "🎉",
                active: false
            },
            {
                year: "2022",
                title: "Best Workplace Award",
                description: "Recognized as top 10 workplace in tech",
                icon: "🏆",
                active: false
            },
            {
                year: "2021",
                title: "Carbon Neutral",
                description: "Achieved carbon neutrality across all operations",
                icon: "🌱",
                active: false
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.startStoryRotation();
        this.initializeAnimations();
    }

    disconnectedCallback() {
        if (this.storyInterval) {
            clearInterval(this.storyInterval);
        }
    }

    render() {
        this.innerHTML = `
            <div class="company-culture-showcase">
                <div class="culture-header">
                    <h2 class="culture-title">
                        <span class="culture-icon">🏢</span>
                        Our Culture & Values
                    </h2>
                    <p class="culture-subtitle">Building the future together through innovation, collaboration, and shared values</p>
                </div>

                <div class="culture-content">
                    <!-- Real-time Culture Pulse -->
                    <div class="culture-pulse-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            Culture Pulse
                            <span class="pulse-indicator ${this.culturePulse.trend.startsWith('+') ? 'positive' : 'negative'}">
                                ${this.culturePulse.trend}% this month
                            </span>
                        </h3>
                        
                        <div class="pulse-dashboard">
                            <div class="overall-score">
                                <div class="score-circle">
                                    <div class="score-number">${this.culturePulse.overall}</div>
                                    <div class="score-label">Overall Score</div>
                                </div>
                            </div>
                            
                            <div class="pulse-categories">
                                ${this.culturePulse.categories.map(category => `
                                    <div class="pulse-category">
                                        <div class="category-header">
                                            <span class="category-name">${category.name}</span>
                                            <span class="category-trend ${category.trend.startsWith('+') ? 'positive' : 'negative'}">
                                                ${category.trend}
                                            </span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${category.score}%"></div>
                                        </div>
                                        <span class="category-score">${category.score}/100</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Company Timeline -->
                    <div class="timeline-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Our Journey
                        </h3>
                        
                        <div class="timeline">
                            ${this.milestones.map((milestone, index) => `
                                <div class="timeline-item ${milestone.active ? 'active' : ''}" data-index="${index}">
                                    <div class="timeline-marker">
                                        <span class="milestone-icon">${milestone.icon}</span>
                                    </div>
                                    <div class="timeline-content">
                                        <div class="timeline-year">${milestone.year}</div>
                                        <h4 class="timeline-title">${milestone.title}</h4>
                                        <p class="timeline-description">${milestone.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Recognition Wall -->
                    <div class="recognition-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                <path d="M4 22h16l-1-7H5l-1 7z"></path>
                                <path d="M8 9h8"></path>
                                <path d="M12 2v7"></path>
                            </svg>
                            Recognition Wall
                        </h3>
                        
                        <div class="recognition-wall">
                            ${this.recognitions.map(recognition => `
                                <div class="recognition-card" style="--accent-color: ${recognition.color}">
                                    <div class="recognition-icon" style="background: ${recognition.color}20">
                                        <span>${recognition.icon}</span>
                                    </div>
                                    <div class="recognition-content">
                                        <h4 class="recognition-name">${recognition.name}</h4>
                                        <div class="recognition-achievement">${recognition.achievement}</div>
                                        <p class="recognition-description">${recognition.description}</p>
                                        <div class="recognition-date">${recognition.date}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Diversity & Inclusion Dashboard -->
                    <div class="diversity-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Diversity & Inclusion
                        </h3>
                        
                        <div class="diversity-dashboard">
                            <div class="diversity-chart">
                                <h4>Gender Balance</h4>
                                <div class="chart-container">
                                    <div class="gender-bars">
                                        <div class="gender-bar">
                                            <label>Male</label>
                                            <div class="bar" style="width: ${this.diversityMetrics.genderBalance.male}%"></div>
                                            <span>${this.diversityMetrics.genderBalance.male}%</span>
                                        </div>
                                        <div class="gender-bar">
                                            <label>Female</label>
                                            <div class="bar" style="width: ${this.diversityMetrics.genderBalance.female}%"></div>
                                            <span>${this.diversityMetrics.genderBalance.female}%</span>
                                        </div>
                                        <div class="gender-bar">
                                            <label>Non-Binary</label>
                                            <div class="bar" style="width: ${this.diversityMetrics.genderBalance.nonBinary}%"></div>
                                            <span>${this.diversityMetrics.genderBalance.nonBinary}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="department-diversity">
                                <h4>Department Diversity Index</h4>
                                ${this.diversityMetrics.departments.map(dept => `
                                    <div class="dept-item">
                                        <span class="dept-name">${dept.name}</span>
                                        <div class="dept-progress">
                                            <div class="dept-fill" style="width: ${dept.diversity}%"></div>
                                        </div>
                                        <span class="dept-score">${dept.diversity}%</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Employee Stories Section -->
                    <div class="stories-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Employee Stories
                        </h3>
                        
                        <div class="story-carousel">
                            <div class="story-card active" data-index="0">
                                <div class="story-avatar" style="background: linear-gradient(135deg, ${this.stories[0].color}20, ${this.stories[0].color}40)">
                                    <span class="avatar-emoji">${this.stories[0].avatar}</span>
                                </div>
                                <div class="story-content">
                                    <div class="story-header">
                                        <h4 class="story-name">${this.stories[0].name}</h4>
                                        <span class="story-role">${this.stories[0].role}</span>
                                        <span class="story-department">${this.stories[0].department}</span>
                                    </div>
                                    <p class="story-text">${this.stories[0].story}</p>
                                    <div class="story-achievement">
                                        <span class="achievement-badge">🏆</span>
                                        <span>${this.stories[0].achievement}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="story-controls">
                            <button class="story-nav prev" aria-label="Previous story">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <div class="story-indicators">
                                ${this.stories.map((_, index) => `
                                    <button class="story-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to story ${index + 1}"></button>
                                `).join('')}
                            </div>
                            <button class="story-nav next" aria-label="Next story">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Company Values Section -->
                    <div class="values-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Our Core Values
                        </h3>
                        
                        <div class="values-grid">
                            ${this.values.map((value, index) => `
                                <div class="value-card" data-index="${index}" style="--value-color: ${value.color}">
                                    <div class="value-icon" style="background: linear-gradient(135deg, ${value.color}20, ${value.color}40)">
                                        <span class="value-emoji">${value.icon}</span>
                                    </div>
                                    <div class="value-content">
                                        <h4 class="value-title">${value.title}</h4>
                                        <p class="value-description">${value.description}</p>
                                    </div>
                                    <div class="value-glow"></div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Culture Stats -->
                    <div class="culture-stats">
                        <div class="stat-item">
                            <div class="stat-number">95%</div>
                            <div class="stat-label">Employee Satisfaction</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">12+</div>
                            <div class="stat-label">Years of Innovation</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">50+</div>
                            <div class="stat-label">Countries Served</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">1000+</div>
                            <div class="stat-label">Happy Customers</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('.story-nav.prev');
        const nextBtn = this.querySelector('.story-nav.next');
        const indicators = this.querySelectorAll('.story-indicator');
        const valueCards = this.querySelectorAll('.value-card');
        const timelineItems = this.querySelectorAll('.timeline-item');
        const recognitionCards = this.querySelectorAll('.recognition-card');
        const pulseCategories = this.querySelectorAll('.pulse-category');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousStory());
            prevBtn.setAttribute('aria-label', 'Previous story');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextStory());
            nextBtn.setAttribute('aria-label', 'Next story');
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToStory(index));
            indicator.setAttribute('aria-label', `Go to story ${index + 1}`);
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            
            // Add keyboard support for indicators
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToStory(index);
                }
            });
        });

        valueCards.forEach((card, index) => {
            card.addEventListener('click', () => this.highlightValue(index));
            card.addEventListener('mouseenter', () => this.animateValueCard(card, true));
            card.addEventListener('mouseleave', () => this.animateValueCard(card, false));
            
            // Enhanced accessibility
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `Learn more about ${this.values[index].title}`);
            
            // Add keyboard support for value cards
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.highlightValue(index);
                }
            });
        });

        // Timeline interactions
        timelineItems.forEach((item, index) => {
            item.addEventListener('click', () => this.highlightTimeline(index));
            item.addEventListener('mouseenter', () => this.animateTimelineItem(item, true));
            item.addEventListener('mouseleave', () => this.animateTimelineItem(item, false));
            
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `Learn more about ${this.milestones[index].title}`);
        });

        // Recognition card interactions
        recognitionCards.forEach((card, index) => {
            card.addEventListener('click', () => this.showRecognitionDetails(index));
            card.addEventListener('mouseenter', () => this.animateRecognitionCard(card, true));
            card.addEventListener('mouseleave', () => this.animateRecognitionCard(card, false));
            
            card.setAttribute('role', 'button');
            card.setAttribute('tabindex', '0');
            card.setAttribute('aria-label', `View ${this.recognitions[index].achievement} details`);
        });

        // Pulse category interactions
        pulseCategories.forEach((category, index) => {
            category.addEventListener('click', () => this.showPulseDetails(index));
            category.addEventListener('mouseenter', () => this.animatePulseCategory(category, true));
            category.addEventListener('mouseleave', () => this.animatePulseCategory(category, false));
        });

        // Add keyboard navigation for stories
        document.addEventListener('keydown', (e) => {
            if (e.target.closest('.company-culture-showcase')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.previousStory();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.nextStory();
                }
            }
        });
    }

    startStoryRotation() {
        this.storyInterval = setInterval(() => {
            this.nextStory();
        }, 5000);
    }

    nextStory() {
        this.currentStoryIndex = (this.currentStoryIndex + 1) % this.stories.length;
        this.updateStoryDisplay();
    }

    previousStory() {
        this.currentStoryIndex = this.currentStoryIndex === 0 ? this.stories.length - 1 : this.currentStoryIndex - 1;
        this.updateStoryDisplay();
    }

    goToStory(index) {
        this.currentStoryIndex = index;
        this.updateStoryDisplay();
    }

    updateStoryDisplay() {
        const storyCard = this.querySelector('.story-card');
        const indicators = this.querySelectorAll('.story-indicator');
        const story = this.stories[this.currentStoryIndex];

        // Update story content with enhanced layout
        storyCard.innerHTML = `
            <div class="story-avatar" style="background: linear-gradient(135deg, ${story.color}20, ${story.color}40)">
                <span class="avatar-emoji">${story.avatar}</span>
            </div>
            <div class="story-content">
                <div class="story-header">
                    <h4 class="story-name">${story.name}</h4>
                    <span class="story-role">${story.role}</span>
                    <span class="story-department">${story.department}</span>
                </div>
                <blockquote class="story-quote">"${story.quote}"</blockquote>
                <p class="story-text">${story.story}</p>
                <div class="story-achievements">
                    <div class="achievement-item">
                        <span class="achievement-badge">🏆</span>
                        <span>${story.achievement}</span>
                    </div>
                    <div class="achievement-item">
                        <span class="achievement-badge">💫</span>
                        <span>${story.impact}</span>
                    </div>
                </div>
                <div class="story-hobbies">
                    <span class="hobbies-label">Outside work:</span>
                    <span class="hobbies-text">${story.hobbies}</span>
                </div>
            </div>
        `;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentStoryIndex);
        });

        // Add animation
        storyCard.style.opacity = '0';
        storyCard.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            storyCard.style.transition = 'all 0.3s ease-out';
            storyCard.style.opacity = '1';
            storyCard.style.transform = 'translateY(0)';
        });
    }

    highlightValue(index) {
        const valueCards = this.querySelectorAll('.value-card');
        valueCards.forEach((card, i) => {
            card.classList.toggle('highlighted', i === index);
        });

        // Show a notification about the value
        this.showValueNotification(this.values[index]);
    }

    animateValueCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = 'var(--shadow-lg)';
            card.style.borderColor = 'var(--primary-200)';
        } else {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-sm)';
            card.style.borderColor = 'var(--border-color)';
        }
    }

    showValueNotification(value) {
        const notification = document.createElement('div');
        notification.className = 'value-notification';
        notification.innerHTML = `
            <div class="value-notification-content">
                <div class="value-notification-icon" style="background: ${value.color}20">
                    <span>${value.icon}</span>
                </div>
                <div class="value-notification-text">
                    <h4>${value.title}</h4>
                    <p>${value.description}</p>
                </div>
            </div>
        `;

        this.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    highlightTimeline(index) {
        const timelineItems = this.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        
        // Show detailed milestone info
        this.showMilestoneNotification(this.milestones[index]);
    }

    animateTimelineItem(item, isEntering) {
        if (isEntering) {
            item.style.transform = 'translateX(8px) scale(1.02)';
        } else if (!item.classList.contains('active')) {
            item.style.transform = 'translateX(0) scale(1)';
        }
    }

    showRecognitionDetails(index) {
        const recognition = this.recognitions[index];
        this.showDetailedNotification({
            title: recognition.achievement,
            subtitle: recognition.name,
            description: recognition.description,
            icon: recognition.icon,
            color: recognition.color,
            action: 'View Full Profile'
        });
    }

    animateRecognitionCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-xl)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-sm)';
        }
    }

    showPulseDetails(index) {
        const category = this.culturePulse.categories[index];
        this.showDetailedNotification({
            title: category.name,
            subtitle: `Score: ${category.score}/100`,
            description: `This metric has improved by ${category.trend} this month, showing positive momentum in our culture initiatives.`,
            icon: '📊',
            color: '#6366f1',
            action: 'View Detailed Analytics'
        });
    }

    animatePulseCategory(category, isEntering) {
        if (isEntering) {
            category.style.transform = 'translateY(-4px)';
            category.style.boxShadow = 'var(--shadow-lg)';
        } else {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = 'var(--shadow-sm)';
        }
    }

    showMilestoneNotification(milestone) {
        const notification = document.createElement('div');
        notification.className = 'milestone-notification';
        notification.innerHTML = `
            <div class="milestone-notification-content">
                <div class="milestone-notification-header">
                    <div class="milestone-notification-icon">
                        <span>${milestone.icon}</span>
                    </div>
                    <div class="milestone-notification-info">
                        <h4>${milestone.title}</h4>
                        <span class="milestone-year">${milestone.year}</span>
                    </div>
                </div>
                <p class="milestone-notification-description">${milestone.description}</p>
                <button class="milestone-action-btn">Learn More</button>
            </div>
        `;

        this.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    showDetailedNotification(details) {
        const notification = document.createElement('div');
        notification.className = 'detailed-notification';
        notification.innerHTML = `
            <div class="detailed-notification-content">
                <div class="detailed-notification-header">
                    <div class="detailed-notification-icon" style="background: ${details.color}20; color: ${details.color}">
                        <span>${details.icon}</span>
                    </div>
                    <div class="detailed-notification-info">
                        <h4>${details.title}</h4>
                        <span class="detailed-subtitle">${details.subtitle}</span>
                    </div>
                    <button class="notification-close" onclick="this.closest('.detailed-notification').remove()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <p class="detailed-notification-description">${details.description}</p>
                <button class="detailed-action-btn" style="background: ${details.color}">
                    ${details.action}
                </button>
            </div>
        `;

        this.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
    }

    initializeAnimations() {
        // Animate stats on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-fill, .bar, .dept-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 200);
                    });
                }
            });
        });

        const statItems = this.querySelectorAll('.stat-item');
        const sections = this.querySelectorAll('.culture-pulse-section, .diversity-section, .timeline-section, .recognition-section');
        
        statItems.forEach(item => observer.observe(item));
        sections.forEach(section => observer.observe(section));

        // Add entrance animations
        this.classList.add('culture-loaded');
    }
}

customElements.define('company-culture-showcase', CompanyCultureShowcase); 