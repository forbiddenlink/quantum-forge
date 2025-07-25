// Enhanced Company Culture Showcase Component - Dream Intranet Homepage
class CompanyCultureShowcase extends HTMLElement {
    constructor() {
        super();
        this.currentStoryIndex = 0;
        this.particles = [];
        this.animationFrame = null;
        this.isAnimating = false;
        this.updateInterval = null;
        this.pulseAnimation = null;
        
        // Enhanced team data with comprehensive analytics
        this.stories = [
            {
                name: "Sarah Chen",
                role: "Senior Developer",
                department: "Engineering",
                story: "I joined Quantum Forge 3 years ago and have grown from a junior developer to leading our AI initiatives. The culture of continuous learning and mentorship has been transformative. I've had the opportunity to work on cutting-edge projects while maintaining a healthy work-life balance.",
                achievement: "Led 5 major AI projects",
                avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>`,
                color: "#6366f1",
                impact: "Mentored 12 junior developers",
                hobbies: "Rock climbing, Open source contributor",
                quote: "Here, innovation meets inclusivity.",
                tenure: "3 years",
                location: "San Francisco, CA",
                skills: ["AI/ML", "Leadership", "Mentoring"],
                achievements: [
                    { title: "AI Ethics Committee Lead", date: "2024-01", impact: "high" },
                    { title: "Mentor of the Year", date: "2023-12", impact: "high" },
                    { title: "Innovation Award", date: "2023-11", impact: "medium" }
                ]
            },
            {
                name: "Marcus Rodriguez",
                role: "Product Manager",
                department: "Product",
                story: "The collaborative environment here is unmatched. Every team member's voice is heard, and we've built products that truly make a difference in people's lives. Our flexible work policy allows me to be there for my family while delivering impactful solutions.",
                achievement: "Launched 3 successful products",
                avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>`,
                color: "#10b981",
                impact: "40% increase in user satisfaction",
                hobbies: "Marathon runner, Community volunteer",
                quote: "We don't just build products, we build community.",
                tenure: "2.5 years",
                location: "Austin, TX",
                skills: ["Product Strategy", "User Research", "Team Leadership"],
                achievements: [
                    { title: "Product Excellence Award", date: "2024-01", impact: "high" },
                    { title: "Customer Impact Leader", date: "2023-12", impact: "high" },
                    { title: "Community Builder", date: "2023-10", impact: "medium" }
                ]
            },
            {
                name: "Aisha Patel",
                role: "UX Designer",
                department: "Design",
                story: "Quantum Forge's commitment to user-centered design and accessibility has allowed me to create experiences that everyone can enjoy. The cross-functional collaboration and emphasis on continuous learning have helped me grow both professionally and personally.",
                achievement: "Improved user satisfaction by 40%",
                avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>`,
                color: "#f59e0b",
                impact: "Led accessibility initiative",
                hobbies: "Digital art, Teaching design",
                quote: "Design is about making life better for everyone.",
                tenure: "4 years",
                location: "New York, NY",
                skills: ["UX Design", "Accessibility", "Design Systems"],
                achievements: [
                    { title: "Accessibility Champion", date: "2024-01", impact: "high" },
                    { title: "Design System Architect", date: "2023-11", impact: "high" },
                    { title: "User Research Pioneer", date: "2023-09", impact: "medium" }
                ]
            },
            {
                name: "David Kim",
                role: "Data Scientist",
                department: "Analytics",
                story: "The data-driven culture here has enabled me to work on cutting-edge ML projects while maintaining ethical AI practices. The support for innovation and experimentation is phenomenal, and we're encouraged to share our findings with the wider tech community.",
                achievement: "Developed 8 ML models",
                avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>`,
                color: "#8b5cf6",
                impact: "Reduced processing time by 60%",
                hobbies: "Chess player, Tech blogger",
                quote: "Data with purpose, innovation with responsibility.",
                tenure: "1.5 years",
                location: "Seattle, WA",
                skills: ["Machine Learning", "Ethical AI", "Data Engineering"],
                achievements: [
                    { title: "ML Innovation Award", date: "2024-01", impact: "high" },
                    { title: "Ethical AI Advocate", date: "2023-12", impact: "high" },
                    { title: "Performance Optimization", date: "2023-11", impact: "medium" }
                ]
            },
            {
                name: "Elena Martinez",
                role: "Engineering Manager",
                department: "Platform",
                story: "What sets Quantum Forge apart is our commitment to both technical excellence and human development. We've created an environment where engineers can innovate while growing as leaders. Our mentorship program has become a model for other companies.",
                achievement: "Built high-performing team of 20",
                avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>`,
                color: "#ec4899",
                impact: "95% team retention rate",
                hobbies: "Salsa dancing, Mentoring",
                quote: "Great teams build great products.",
                tenure: "5 years",
                location: "Miami, FL",
                skills: ["Team Leadership", "Technical Architecture", "Mentoring"],
                achievements: [
                    { title: "Leadership Excellence", date: "2024-01", impact: "high" },
                    { title: "Team Builder Award", date: "2023-12", impact: "high" },
                    { title: "Technical Mentor", date: "2023-10", impact: "medium" }
                ]
            }
        ];
        
        this.values = [
            {
                title: "Innovation First",
                description: "We embrace new ideas and technologies to solve complex challenges",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>`,
                color: "#6366f1",
                examples: ["AI Ethics Committee", "Innovation Lab", "Hackathons"],
                impact: "95% of employees participate in innovation initiatives",
                metrics: { participation: 95, satisfaction: 92, projects: 24 }
            },
            {
                title: "Collaboration",
                description: "Great things happen when we work together and share knowledge",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>`,
                color: "#10b981",
                examples: ["Cross-team Projects", "Knowledge Sharing", "Mentorship Program"],
                impact: "87% of projects involve cross-functional collaboration",
                metrics: { collaboration: 87, knowledge_sharing: 94, mentorship: 89 }
            },
            {
                title: "User-Centric",
                description: "Every decision we make starts with our users' needs",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                </svg>`,
                color: "#f59e0b",
                examples: ["User Research", "Accessibility First", "Customer Feedback Loop"],
                impact: "98% user satisfaction score across all products",
                metrics: { satisfaction: 98, accessibility: 96, feedback: 91 }
            },
            {
                title: "Continuous Learning",
                description: "We grow together through knowledge sharing and skill development",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                </svg>`,
                color: "#8b5cf6",
                examples: ["Learning Budget", "Tech Talks", "Conference Speaking"],
                impact: "Average of 40 hours of learning per employee annually",
                metrics: { learning_hours: 40, skill_growth: 88, certifications: 156 }
            },
            {
                title: "Diversity & Inclusion",
                description: "Different perspectives make us stronger and more innovative",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>`,
                color: "#ec4899",
                examples: ["ERGs", "Inclusive Hiring", "Cultural Celebrations"],
                impact: "Representation across 15+ countries and 8+ languages",
                metrics: { diversity_index: 85, inclusion_score: 92, representation: 15 }
            },
            {
                title: "Sustainability",
                description: "We build for the future while caring for our planet",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>`,
                color: "#059669",
                examples: ["Green Office", "Carbon Neutral", "Sustainable Tech"],
                impact: "100% carbon neutral operations since 2021",
                metrics: { carbon_neutral: 100, green_energy: 95, waste_reduction: 78 }
            }
        ];

        this.culturePulse = {
            overall: 91,
            trend: "+5",
            categories: [
                { name: "Work-Life Balance", score: 89, trend: "+3", target: 90 },
                { name: "Innovation Culture", score: 95, trend: "+7", target: 95 },
                { name: "Team Collaboration", score: 91, trend: "+2", target: 92 },
                { name: "Career Growth", score: 88, trend: "+4", target: 90 }
            ]
        };

        this.diversityMetrics = {
            genderBalance: { male: 52, female: 45, nonBinary: 3 },
            ageGroups: { "20-29": 35, "30-39": 40, "40-49": 20, "50+": 5 },
            departments: [
                { name: "Engineering", diversity: 78, trend: "+5" },
                { name: "Design", diversity: 85, trend: "+3" },
                { name: "Product", diversity: 82, trend: "+4" },
                { name: "Marketing", diversity: 90, trend: "+2" }
            ]
        };

        this.recognitions = [
            {
                name: "Alex Thompson",
                achievement: "Innovation Champion",
                description: "Led breakthrough AI integration project",
                date: "2 days ago",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16l-1-7H5l-1 7z"></path>
                    <path d="M8 9h8"></path>
                    <path d="M12 2v7"></path>
                </svg>`,
                color: "#f59e0b",
                impact: "high",
                category: "innovation"
            },
            {
                name: "Sarah Chen",
                achievement: "Collaboration Award", 
                description: "Mentored 5 junior developers this quarter",
                date: "1 week ago",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>`,
                color: "#10b981",
                impact: "high",
                category: "collaboration"
            },
            {
                name: "Marcus Rodriguez",
                achievement: "User Impact Award",
                description: "Improved user satisfaction by 40%",
                date: "2 weeks ago",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                </svg>`,
                color: "#6366f1",
                impact: "high",
                category: "user-impact"
            }
        ];

        this.milestones = [
            {
                year: "2024",
                title: "Global Expansion",
                description: "Opened offices in 5 new countries",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M2 12h20"></path>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>`,
                active: true,
                impact: "high",
                details: "Expanded to Singapore, Berlin, Toronto, Sydney, and São Paulo"
            },
            {
                year: "2023", 
                title: "1M Users Milestone",
                description: "Reached 1 million active users worldwide",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2z"></path>
                    <path d="M3 12c1 0 2-1 2-2s-1-2-2-2-2 1-2 2 1 2 2 2z"></path>
                </svg>`,
                active: false,
                impact: "high",
                details: "Achieved through user-centric design and global partnerships"
            },
            {
                year: "2022",
                title: "Best Workplace Award",
                description: "Recognized as top 10 workplace in tech",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                    <path d="M4 22h16l-1-7H5l-1 7z"></path>
                    <path d="M8 9h8"></path>
                    <path d="M12 2v7"></path>
                </svg>`,
                active: false,
                impact: "medium",
                details: "Awarded by Great Place to Work for culture excellence"
            },
            {
                year: "2021",
                title: "Carbon Neutral",
                description: "Achieved carbon neutrality across all operations",
                icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>`,
                active: false,
                impact: "high",
                details: "Implemented comprehensive sustainability program"
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeParticles();
        this.startStoryRotation();
        this.initializeAnimations();
        this.startRealTimeUpdates();
        this.initializeProgressBars();
        this.initializeHoverEffects();
        
        // Add entrance animation
        setTimeout(() => {
            this.classList.add('culture-loaded');
        }, 100);
    }

    disconnectedCallback() {
        console.log('Company Culture Showcase disconnecting...');
        if (this.storyInterval) {
            clearInterval(this.storyInterval);
            this.storyInterval = null;
        }
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Disconnect intersection observers
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        if (this.animationObserver) {
            this.animationObserver.disconnect();
            this.animationObserver = null;
        }
        
        // Cancel animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        console.log('Company Culture Showcase cleanup complete');
    }

    initializeParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'culture-particles';
        this.appendChild(particlesContainer);
        
        // Create floating particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'culture-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2));
                border-radius: 50%;
                pointer-events: none;
                animation: cultureFloat ${Math.random() * 20 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation CSS
        if (!document.querySelector('#culture-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'culture-particle-styles';
            style.textContent = `
                @keyframes cultureFloat {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
                    50% { transform: translateY(-40px) translateX(-5px); opacity: 0.5; }
                    75% { transform: translateY(-20px) translateX(-10px); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeProgressBars() {
        // Animate progress bars on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-fill, .bar, .dept-fill');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, 200);
                    });
                }
            });
        });

        const sections = this.querySelectorAll('.culture-pulse-section, .diversity-section');
        sections.forEach(section => observer.observe(section));
    }

    initializeHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = this.querySelectorAll('.value-card, .recognition-card, .timeline-item, .pulse-category');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeRippleEffects(element);
            });
        });
    }

    createRippleEffect(event) {
        const element = event.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'culture-ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.2);
            transform: scale(0);
            animation: cultureRipple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Add ripple animation CSS if not exists
        if (!document.querySelector('#culture-ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'culture-ripple-styles';
            style.textContent = `
                @keyframes cultureRipple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    removeRippleEffects(element) {
        const ripples = element.querySelectorAll('.culture-ripple-effect');
        ripples.forEach(ripple => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time culture pulse updates
        this.updateInterval = setInterval(() => {
            this.updateCulturePulse();
        }, 30000); // Every 30 seconds
    }

    updateCulturePulse() {
        const pulseCategories = this.querySelectorAll('.pulse-category');
        let totalScore = 0;
        
        pulseCategories.forEach((category, index) => {
            const currentScore = this.culturePulse.categories[index].score;
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newScore = Math.max(0, Math.min(100, currentScore + change));
            
            if (newScore !== currentScore) {
                this.culturePulse.categories[index].score = newScore;
                this.culturePulse.categories[index].trend = change > 0 ? `+${change}` : change < 0 ? `${change}` : '+0';
                
                // Update display
                const scoreElement = category.querySelector('.category-score');
                const trendElement = category.querySelector('.category-trend');
                const progressFill = category.querySelector('.progress-fill');
                
                if (scoreElement) {
                    this.animateNumber(scoreElement, currentScore, newScore);
                }
                
                if (trendElement) {
                    trendElement.textContent = this.culturePulse.categories[index].trend;
                    trendElement.className = `category-trend ${change > 0 ? 'positive' : change < 0 ? 'negative' : ''}`;
                }
                
                if (progressFill) {
                    progressFill.style.width = `${newScore}%`;
                }
                
                // Add visual feedback
                category.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    category.style.animation = '';
                }, 500);
            }
            
            totalScore += this.culturePulse.categories[index].score;
        });
        
        // Update overall score
        const newOverallScore = Math.round(totalScore / this.culturePulse.categories.length);
        if (newOverallScore !== this.culturePulse.overall) {
            this.updateOverallScore(newOverallScore);
        }
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const steps = 30;
        const increment = (end - start) / steps;
        let current = start;
        const interval = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                element.textContent = end;
            } else {
                element.textContent = Math.round(current);
            }
        }, interval);
    }

    updateOverallScore(newScore) {
        const scoreCircle = this.querySelector('.score-circle');
        const scoreNumber = this.querySelector('.score-number');
        
        if (scoreCircle && scoreNumber) {
            const currentScore = this.culturePulse.overall;
            this.culturePulse.overall = newScore;
            
            // Update the CSS custom property for the conic gradient
            scoreCircle.style.setProperty('--score-value', newScore);
            
            // Animate the number
            this.animateNumber(scoreNumber, currentScore, newScore);
            
            // Add visual feedback
            scoreCircle.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                scoreCircle.style.animation = '';
            }, 500);
        }
    }

    render() {
        this.innerHTML = `
            <div class="company-culture-showcase">
                <!-- Enhanced Background with Particles -->
                <div class="culture-background">
                    <div class="culture-gradient-overlay"></div>
                    <div class="culture-pattern"></div>
                </div>

                <div class="culture-header">
                    <h2 class="culture-title">
                        <span class="culture-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9,22 9,12 15,12 15,22"></polyline>
                            </svg>
                        </span>
                        Our Culture & Values
                        <span class="culture-badge">Live</span>
                    </h2>
                    <p class="culture-subtitle">Building the future together through innovation, collaboration, and shared values</p>
                    <div class="culture-stats-preview">
                        <div class="stat-preview">
                            <span class="stat-number">95%</span>
                            <span class="stat-label">Satisfaction</span>
                        </div>
                        <div class="stat-preview">
                            <span class="stat-number">15+</span>
                            <span class="stat-label">Countries</span>
                        </div>
                        <div class="stat-preview">
                            <span class="stat-number">100%</span>
                            <span class="stat-label">Carbon Neutral</span>
                        </div>
                    </div>
                </div>

                <div class="culture-content">
                    <!-- Enhanced Real-time Culture Pulse -->
                    <div class="culture-pulse-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                            </svg>
                            Culture Pulse
                            <span class="pulse-indicator ${this.culturePulse.trend.startsWith('+') ? 'positive' : 'negative'}">
                                <span class="live-dot"></span>
                                ${this.culturePulse.trend}% this month
                            </span>
                        </h3>
                        
                        <div class="pulse-dashboard">
                            <div class="overall-score">
                                <div class="score-circle" style="--score-value: ${this.culturePulse.overall}">
                                    <div class="score-content">
                                        <div class="score-number" data-value="${this.culturePulse.overall}">${this.culturePulse.overall}</div>
                                        <div class="score-label">Overall Score</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="pulse-categories">
                                ${this.culturePulse.categories.map(category => `
                                    <div class="pulse-category" data-target="${category.target}">
                                        <div class="category-header">
                                            <span class="category-name">${category.name}</span>
                                            <span class="category-trend ${category.trend.startsWith('+') ? 'positive' : 'negative'}">
                                                ${category.trend}
                                            </span>
                                        </div>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${category.score}%"></div>
                                            <div class="progress-target" style="left: ${category.target}%"></div>
                                        </div>
                                        <span class="category-score">${category.score}/100</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Enhanced Company Timeline -->
                    <div class="timeline-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Our Journey
                            <span class="timeline-progress">4/4 Milestones</span>
                        </h3>
                        
                        <div class="timeline">
                            ${this.milestones.map((milestone, index) => `
                                <div class="timeline-item ${milestone.active ? 'active' : ''}" data-index="${index}" data-impact="${milestone.impact}">
                                    <div class="timeline-marker">
                                        <span class="milestone-icon">${milestone.icon}</span>
                                        <div class="milestone-glow"></div>
                                    </div>
                                    <div class="timeline-content">
                                        <div class="timeline-year">${milestone.year}</div>
                                        <h4 class="timeline-title">${milestone.title}</h4>
                                        <p class="timeline-description">${milestone.description}</p>
                                        <div class="timeline-details">${milestone.details}</div>
                                        <div class="timeline-impact ${milestone.impact}">
                                            <span class="impact-label">${milestone.impact} Impact</span>
                                        </div>
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

                    <!-- Enhanced Employee Stories Section -->
                    <div class="stories-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Employee Stories
                            <span class="stories-count">${this.stories.length} Stories</span>
                        </h3>
                        
                        <div class="story-carousel">
                            <div class="story-card active" data-index="0">
                                <div class="story-avatar" style="background: linear-gradient(135deg, ${this.stories[0].color}20, ${this.stories[0].color}40)">
                                    <span class="avatar-emoji">${this.stories[0].avatar}</span>
                                    <div class="avatar-status online"></div>
                                </div>
                                <div class="story-content">
                                    <div class="story-header">
                                        <h4 class="story-name">${this.stories[0].name}</h4>
                                        <span class="story-role">${this.stories[0].role}</span>
                                        <span class="story-department">${this.stories[0].department}</span>
                                        <div class="story-meta">
                                            <span class="story-tenure">${this.stories[0].tenure}</span>
                                            <span class="story-location">${this.stories[0].location}</span>
                                        </div>
                                    </div>
                                    <blockquote class="story-quote">"${this.stories[0].quote}"</blockquote>
                                    <p class="story-text">${this.stories[0].story}</p>
                                    <div class="story-achievements">
                                        <div class="achievement-item">
                                            <span class="achievement-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16l-1-7H5l-1 7z"></path>
                                    <path d="M8 9h8"></path>
                                    <path d="M12 2v7"></path>
                                </svg>
                            </span>
                                            <span>${this.stories[0].achievement}</span>
                                        </div>
                                        <div class="achievement-item">
                                            <span class="achievement-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </span>
                                            <span>${this.stories[0].impact}</span>
                                        </div>
                                    </div>
                                    <div class="story-skills">
                                        ${this.stories[0].skills.map(skill => `
                                            <span class="skill-tag">${skill}</span>
                                        `).join('')}
                                    </div>
                                    <div class="story-hobbies">
                                        <span class="hobbies-label">Outside work:</span>
                                        <span class="hobbies-text">${this.stories[0].hobbies}</span>
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

                    <!-- Enhanced Company Values Section -->
                    <div class="values-section">
                        <h3 class="section-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Our Core Values
                            <span class="values-count">${this.values.length} Values</span>
                        </h3>
                        
                        <div class="values-grid">
                            ${this.values.map((value, index) => `
                                <div class="value-card" data-index="${index}" style="--value-color: ${value.color}">
                                    <div class="value-icon" style="background: linear-gradient(135deg, ${value.color}20, ${value.color}40)">
                                        <span class="value-emoji">${value.icon}</span>
                                        <div class="value-icon-glow"></div>
                                    </div>
                                    <div class="value-content">
                                        <h4 class="value-title">${value.title}</h4>
                                        <p class="value-description">${value.description}</p>
                                        <div class="value-impact">
                                            <span class="impact-text">${value.impact}</span>
                                        </div>
                                        <div class="value-metrics">
                                            ${Object.entries(value.metrics).map(([key, val]) => `
                                                <div class="metric-item">
                                                    <span class="metric-value">${val}${key.includes('_') ? '' : '%'}</span>
                                                    <span class="metric-label">${key.replace('_', ' ')}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                    <div class="value-glow"></div>
                                    <div class="value-examples">
                                        ${value.examples.map(example => `
                                            <span class="example-tag">${example}</span>
                                        `).join('')}
                                    </div>
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
                <div class="avatar-status online"></div>
            </div>
            <div class="story-content">
                <div class="story-header">
                    <h4 class="story-name">${story.name}</h4>
                    <span class="story-role">${story.role}</span>
                    <span class="story-department">${story.department}</span>
                    <div class="story-meta">
                        <span class="story-tenure">${story.tenure}</span>
                        <span class="story-location">${story.location}</span>
                    </div>
                </div>
                <blockquote class="story-quote">"${story.quote}"</blockquote>
                <p class="story-text">${story.story}</p>
                <div class="story-achievements">
                    <div class="achievement-item">
                                                    <span class="achievement-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16l-1-7H5l-1 7z"></path>
                                    <path d="M8 9h8"></path>
                                    <path d="M12 2v7"></path>
                                </svg>
                            </span>
                        <span>${story.achievement}</span>
                    </div>
                    <div class="achievement-item">
                                                    <span class="achievement-badge">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </span>
                        <span>${story.impact}</span>
                    </div>
                </div>
                <div class="story-skills">
                    ${story.skills.map(skill => `
                        <span class="skill-tag">${skill}</span>
                    `).join('')}
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