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
                story: "I joined Quantum Forge 3 years ago and have grown from a junior developer to leading our AI initiatives. The culture of continuous learning and innovation has been incredible.",
                achievement: "Led 5 major AI projects",
                avatar: "👩‍💻",
                color: "#6366f1"
            },
            {
                name: "Marcus Rodriguez",
                role: "Product Manager",
                department: "Product",
                story: "The collaborative environment here is unmatched. Every team member's voice is heard, and we've built products that truly make a difference in people's lives.",
                achievement: "Launched 3 successful products",
                avatar: "👨‍💼",
                color: "#10b981"
            },
            {
                name: "Aisha Patel",
                role: "UX Designer",
                department: "Design",
                story: "Quantum Forge's commitment to user-centered design has allowed me to create experiences that users love. The cross-functional collaboration is inspiring.",
                achievement: "Improved user satisfaction by 40%",
                avatar: "👩‍🎨",
                color: "#f59e0b"
            },
            {
                name: "David Kim",
                role: "Data Scientist",
                department: "Analytics",
                story: "The data-driven culture here has enabled me to work on cutting-edge ML projects. The support for innovation and experimentation is phenomenal.",
                achievement: "Developed 8 ML models",
                avatar: "👨‍🔬",
                color: "#8b5cf6"
            }
        ];
        
        this.values = [
            {
                title: "Innovation First",
                description: "We embrace new ideas and technologies to solve complex challenges",
                icon: "🚀",
                color: "#6366f1"
            },
            {
                title: "Collaboration",
                description: "Great things happen when we work together and share knowledge",
                icon: "🤝",
                color: "#10b981"
            },
            {
                title: "User-Centric",
                description: "Every decision we make starts with our users' needs",
                icon: "🎯",
                color: "#f59e0b"
            },
            {
                title: "Continuous Learning",
                description: "We grow together through knowledge sharing and skill development",
                icon: "📚",
                color: "#8b5cf6"
            },
            {
                title: "Diversity & Inclusion",
                description: "Different perspectives make us stronger and more innovative",
                icon: "🌈",
                color: "#ec4899"
            },
            {
                title: "Sustainability",
                description: "We build for the future while caring for our planet",
                icon: "🌱",
                color: "#059669"
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
                    <!-- Employee Stories Section -->
                    <div class="stories-section">
                        <h3 class="stories-title">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                        <h3 class="values-title">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

        // Update story content
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
                <p class="story-text">${story.story}</p>
                <div class="story-achievement">
                    <span class="achievement-badge">🏆</span>
                    <span>${story.achievement}</span>
                </div>
            </div>
        `;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentStoryIndex);
        });

        // Animate the transition
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

    initializeAnimations() {
        // Animate stats on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        const statItems = this.querySelectorAll('.stat-item');
        statItems.forEach(item => observer.observe(item));
    }
}

customElements.define('company-culture-showcase', CompanyCultureShowcase); 