// Enhanced Team Spotlight Component - Contest-Winning Design
class TeamSpotlight extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isAnimating = false;
        this.isHovered = false;
        this.hasFocus = false;
        this.hoverTimeout = null;
        this.updateInterval = null;
        
        // Enhanced team data with comprehensive analytics
        this.members = [
            {
                id: 1,
                name: 'Sarah Chen',
                role: 'Lead Designer',
                department: 'Design',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%236366f1"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3ESC%3C/text%3E%3C/svg%3E',
                status: 'online',
                location: 'San Francisco, CA',
                timezone: 'PST',
                joinDate: '2021-03-15',
                achievements: [
                    { title: 'Design System Lead', description: 'Architected company-wide design system', date: '2024-01-10', impact: 'high' },
                    { title: 'UI/UX Champion', description: 'Improved user satisfaction by 40%', date: '2023-12-05', impact: 'high' },
                    { title: 'Accessibility Advocate', description: 'Led WCAG 2.1 compliance initiative', date: '2023-11-20', impact: 'medium' }
                ],
                skills: [
                    { name: 'UI Design', level: 95, category: 'design' },
                    { name: 'Design Systems', level: 98, category: 'design' },
                    { name: 'User Research', level: 88, category: 'research' },
                    { name: 'Figma', level: 96, category: 'tools' },
                    { name: 'Prototyping', level: 92, category: 'design' }
                ],
                currentProjects: [
                    { name: 'Mobile App Redesign', role: 'Lead Designer', progress: 75, priority: 'high' },
                    { name: 'Design System v2.0', role: 'Technical Lead', progress: 60, priority: 'medium' }
                ],
                productivity: {
                    thisWeek: 92,
                    lastWeek: 88,
                    trend: '+4',
                    tasksCompleted: 18,
                    collaborations: 12
                },
                personalInfo: {
                    bio: 'Passionate about creating inclusive, accessible designs that solve real user problems.',
                    interests: ['Accessibility', 'User Psychology', 'Design Systems'],
                    workStyle: 'Collaborative, detail-oriented, user-focused',
                    funFact: 'Has designed for over 50 million users worldwide'
                },
                recentActivity: [
                    { action: 'Completed wireframes for mobile onboarding', time: '2 hours ago', type: 'achievement' },
                    { action: 'Mentored junior designer on accessibility standards', time: '4 hours ago', type: 'collaboration' },
                    { action: 'Reviewed design components for approval', time: '6 hours ago', type: 'review' }
                ]
            },
            {
                id: 2,
                name: 'Marcus Rodriguez',
                role: 'Senior Developer',
                department: 'Engineering',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%23f59e0b"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3EMR%3C/text%3E%3C/svg%3E',
                status: 'online',
                location: 'Austin, TX',
                timezone: 'CST',
                joinDate: '2020-08-22',
                achievements: [
                    { title: 'Performance Expert', description: 'Optimized app performance by 60%', date: '2024-01-08', impact: 'high' },
                    { title: '10x Contributor', description: 'Top contributor for 3 consecutive quarters', date: '2023-12-31', impact: 'high' },
                    { title: 'Innovation Award', description: 'Created breakthrough AI integration', date: '2023-11-15', impact: 'medium' }
                ],
                skills: [
                    { name: 'JavaScript', level: 98, category: 'programming' },
                    { name: 'React', level: 96, category: 'framework' },
                    { name: 'Node.js', level: 94, category: 'backend' },
                    { name: 'TypeScript', level: 92, category: 'programming' },
                    { name: 'GraphQL', level: 88, category: 'api' }
                ],
                currentProjects: [
                    { name: 'API Optimization', role: 'Senior Engineer', progress: 85, priority: 'high' },
                    { name: 'New Feature Development', role: 'Tech Lead', progress: 45, priority: 'medium' }
                ],
                productivity: {
                    thisWeek: 95,
                    lastWeek: 91,
                    trend: '+4',
                    tasksCompleted: 24,
                    collaborations: 15
                },
                personalInfo: {
                    bio: 'Full-stack developer with expertise in scalable architectures and performance optimization.',
                    interests: ['Performance Engineering', 'AI/ML', 'Open Source'],
                    workStyle: 'Analytical, collaborative, solution-oriented',
                    funFact: 'Contributed to 15+ open source projects'
                },
                recentActivity: [
                    { action: 'Deployed performance improvements to production', time: '1 hour ago', type: 'achievement' },
                    { action: 'Code review for junior developer', time: '3 hours ago', type: 'collaboration' },
                    { action: 'Fixed critical API endpoint bug', time: '5 hours ago', type: 'bug_fix' }
                ]
            },
            {
                id: 3,
                name: 'Emily Watson',
                role: 'Product Manager',
                department: 'Product',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%2310b981"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3EEW%3C/text%3E%3C/svg%3E',
                status: 'away',
                location: 'New York, NY',
                timezone: 'EST',
                joinDate: '2019-11-10',
                achievements: [
                    { title: 'Product of the Year', description: 'Led product that won industry award', date: '2024-01-05', impact: 'high' },
                    { title: 'Innovation Award', description: 'Pioneered new user experience approach', date: '2023-11-28', impact: 'high' },
                    { title: 'Customer Champion', description: 'Achieved 95% customer satisfaction', date: '2023-10-15', impact: 'medium' }
                ],
                skills: [
                    { name: 'Strategy', level: 94, category: 'business' },
                    { name: 'Analytics', level: 91, category: 'data' },
                    { name: 'Leadership', level: 96, category: 'management' },
                    { name: 'Market Research', level: 89, category: 'research' },
                    { name: 'Product Design', level: 85, category: 'design' }
                ],
                currentProjects: [
                    { name: 'Q1 Roadmap Planning', role: 'Product Lead', progress: 90, priority: 'high' },
                    { name: 'User Research Initiative', role: 'Project Manager', progress: 35, priority: 'medium' }
                ],
                productivity: {
                    thisWeek: 89,
                    lastWeek: 93,
                    trend: '-4',
                    tasksCompleted: 16,
                    collaborations: 20
                },
                personalInfo: {
                    bio: 'Strategic product leader focused on user-centered design and data-driven decisions.',
                    interests: ['User Experience', 'Market Analysis', 'Team Leadership'],
                    workStyle: 'Strategic, empathetic, data-driven',
                    funFact: 'Has launched products used by 2M+ customers'
                },
                recentActivity: [
                    { action: 'Presented Q1 roadmap to leadership', time: '4 hours ago', type: 'presentation' },
                    { action: 'Facilitated cross-team planning session', time: '6 hours ago', type: 'collaboration' },
                    { action: 'Analyzed user feedback from beta release', time: '8 hours ago', type: 'analysis' }
                ]
            },
            {
                id: 4,
                name: 'Alex Thompson',
                role: 'Data Scientist',
                department: 'Analytics',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%238b5cf6"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3EAT%3C/text%3E%3C/svg%3E',
                status: 'online',
                location: 'Seattle, WA',
                timezone: 'PST',
                joinDate: '2022-01-20',
                achievements: [
                    { title: 'ML Innovation', description: 'Developed breakthrough recommendation algorithm', date: '2024-01-12', impact: 'high' },
                    { title: 'Data Insights Champion', description: 'Improved decision accuracy by 35%', date: '2023-12-18', impact: 'medium' },
                    { title: 'Research Publication', description: 'Published paper on ethical AI', date: '2023-09-30', impact: 'medium' }
                ],
                skills: [
                    { name: 'Machine Learning', level: 96, category: 'ai' },
                    { name: 'Python', level: 94, category: 'programming' },
                    { name: 'Data Visualization', level: 89, category: 'visualization' },
                    { name: 'Statistics', level: 92, category: 'analytics' },
                    { name: 'TensorFlow', level: 88, category: 'tools' }
                ],
                currentProjects: [
                    { name: 'Predictive Analytics Model', role: 'Lead Data Scientist', progress: 70, priority: 'high' },
                    { name: 'ETL Pipeline Optimization', role: 'Data Engineer', progress: 55, priority: 'medium' }
                ],
                productivity: {
                    thisWeek: 91,
                    lastWeek: 87,
                    trend: '+4',
                    tasksCompleted: 21,
                    collaborations: 9
                },
                personalInfo: {
                    bio: 'Data scientist passionate about ethical AI and turning complex data into actionable insights.',
                    interests: ['Machine Learning', 'Ethical AI', 'Data Visualization'],
                    workStyle: 'Analytical, methodical, innovative',
                    funFact: 'Models have processed over 100TB of data'
                },
                recentActivity: [
                    { action: 'Deployed new recommendation model', time: '3 hours ago', type: 'deployment' },
                    { action: 'Presented findings to product team', time: '5 hours ago', type: 'presentation' },
                    { action: 'Optimized data pipeline performance', time: '7 hours ago', type: 'optimization' }
                ]
            }
        ];

        // Team-wide analytics and insights
        this.teamAnalytics = {
            totalMembers: 47,
            onlineMembers: 32,
            activeDepartments: 8,
            avgProductivity: 91,
            collaborationScore: 94,
            projectsActive: 23,
            tasksCompletedToday: 156,
            upcomingDeadlines: 8,
            departmentBreakdown: [
                { name: 'Engineering', count: 18, productivity: 92 },
                { name: 'Design', count: 8, productivity: 89 },
                { name: 'Product', count: 12, productivity: 94 },
                { name: 'Analytics', count: 9, productivity: 88 }
            ],
            skillDistribution: [
                { skill: 'JavaScript', experts: 12, growing: 8 },
                { skill: 'Design Systems', experts: 5, growing: 6 },
                { skill: 'Product Strategy', experts: 7, growing: 4 },
                { skill: 'Data Analysis', experts: 6, growing: 9 }
            ],
            recentAchievements: [
                { team: 'Design Team', achievement: 'Completed accessibility audit', impact: 'high' },
                { team: 'Engineering Team', achievement: 'Deployed performance improvements', impact: 'high' },
                { team: 'Product Team', achievement: 'Launched beta testing program', impact: 'medium' }
            ]
        };

        // Initialize real-time updates
        this.initializeRealTimeData();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.startAutoplay();
        this.startRealTimeUpdates();
        this.initializeAnimations();
    }

    disconnectedCallback() {
        this.stopAutoplay();
        this.stopRealTimeUpdates();
    }

    initializeRealTimeData() {
        // Simulate real-time productivity updates
        setInterval(() => {
            this.members.forEach(member => {
                // Small random productivity fluctuations
                const change = (Math.random() - 0.5) * 2;
                member.productivity.thisWeek = Math.max(70, Math.min(100, member.productivity.thisWeek + change));
                member.productivity.trend = change > 0 ? `+${Math.round(Math.abs(change))}` : `-${Math.round(Math.abs(change))}`;
            });
            
            // Update team analytics
            this.teamAnalytics.onlineMembers = Math.max(25, Math.min(40, this.teamAnalytics.onlineMembers + Math.floor((Math.random() - 0.5) * 3)));
            this.teamAnalytics.tasksCompletedToday += Math.floor(Math.random() * 3);
            
            // Refresh display if current member is visible
            this.updateMemberDisplay();
        }, 15000); // Update every 15 seconds
    }

    render() {
        const member = this.members[this.currentIndex];
        this.innerHTML = `
            <div class="enhanced-team-spotlight" tabindex="0">
                <!-- Header Section -->
                <div class="spotlight-header">
                    <div class="header-content">
                        <h2 class="spotlight-title">
                            <svg class="title-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Team Spotlight
                            <span class="live-indicator">
                                <span class="pulse-dot"></span>
                                LIVE
                            </span>
                        </h2>
                        <p class="spotlight-subtitle">Celebrating our amazing team members and their contributions</p>
                    </div>
                    
                    <div class="spotlight-controls">
                        <button class="control-btn" id="prevMember" aria-label="Previous team member">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <div class="member-indicators">
                            ${this.members.map((_, index) => `
                                <button class="indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="View ${this.members[index].name}">
                                    <span class="indicator-progress"></span>
                                </button>
                            `).join('')}
                        </div>
                        <button class="control-btn" id="nextMember" aria-label="Next team member">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="spotlight-main">
                    <!-- Member Profile Section -->
                    <div class="member-profile-section">
                        <div class="member-card">
                    <div class="member-header">
                                <div class="member-avatar-container">
                        <div class="member-avatar-large">
                            <svg viewBox="0 0 64 64" width="64" height="64" aria-label="${member.name}">
                                            <rect width="64" height="64" fill="${member.avatar.includes('%236366f1') ? '#6366f1' : member.avatar.includes('%23f59e0b') ? '#f59e0b' : member.avatar.includes('%2310b981') ? '#10b981' : '#8b5cf6'}" rx="32"/>
                                <text x="32" y="40" font-family="Inter, Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">${member.name.split(' ').map(n => n[0]).join('')}</text>
                            </svg>
                                        <div class="status-indicator ${member.status}" title="${member.status === 'online' ? 'Online' : member.status === 'away' ? 'Away' : 'Offline'}">
                                            <span class="status-pulse"></span>
                                        </div>
                                    </div>
                                    <div class="productivity-ring">
                                        <svg class="productivity-circle" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" stroke-width="6"/>
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" stroke-width="6" 
                                                stroke-dasharray="283" stroke-dashoffset="${283 - (283 * member.productivity.thisWeek / 100)}"
                                                transform="rotate(-90 50 50)"/>
                                        </svg>
                                        <div class="productivity-label">
                                            <span class="productivity-value">${member.productivity.thisWeek}%</span>
                                            <span class="productivity-text">Productivity</span>
                        </div>
                        </div>
                    </div>

                                <div class="member-info">
                                    <h3 class="member-name">${member.name}</h3>
                                    <p class="member-role">${member.role}</p>
                                    <div class="member-meta">
                                        <span class="department-badge">${member.department}</span>
                                        <span class="location-info">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                            ${member.location}
                                        </span>
                                        <span class="join-date">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                                <line x1="3" y1="10" x2="21" y2="10"></line>
                                            </svg>
                                            Joined ${new Date(member.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                        </span>
                    </div>
                        </div>
                    </div>

                            <div class="member-bio">
                                <p class="bio-text">${member.personalInfo.bio}</p>
                                <div class="fun-fact">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    <span>${member.personalInfo.funFact}</span>
                                </div>
                            </div>

                            <!-- Quick Stats -->
                            <div class="quick-stats">
                                <div class="stat-item">
                                    <div class="stat-value">${member.productivity.tasksCompleted}</div>
                                    <div class="stat-label">Tasks This Week</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${member.productivity.collaborations}</div>
                                    <div class="stat-label">Collaborations</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value">${member.achievements.length}</div>
                                    <div class="stat-label">Achievements</div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-value trend-${member.productivity.trend.startsWith('+') ? 'up' : 'down'}">
                                        ${member.productivity.trend}%
                                    </div>
                                    <div class="stat-label">This Week</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Details Sections -->
                    <div class="member-details">
                        <!-- Skills Matrix -->
                        <div class="details-section skills-section">
                            <h4 class="section-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                Skills & Expertise
                            </h4>
                            <div class="skills-grid">
                                ${member.skills.map(skill => `
                                    <div class="skill-item" data-skill="${skill.name}">
                                        <div class="skill-header">
                                            <span class="skill-name">${skill.name}</span>
                                            <span class="skill-level">${skill.level}%</span>
                                        </div>
                                        <div class="skill-bar">
                                            <div class="skill-progress" style="width: ${skill.level}%">
                                                <div class="skill-shine"></div>
                                            </div>
                                        </div>
                                        <span class="skill-category">${skill.category}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Current Projects -->
                        <div class="details-section projects-section">
                            <h4 class="section-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <path d="M8 12l2 2 4-4"></path>
                                </svg>
                                Current Projects
                            </h4>
                            <div class="projects-list">
                                ${member.currentProjects.map(project => `
                                    <div class="project-item priority-${project.priority}">
                                        <div class="project-header">
                                            <h5 class="project-name">${project.name}</h5>
                                            <span class="project-role">${project.role}</span>
                                            <span class="priority-badge ${project.priority}">${project.priority} priority</span>
                                        </div>
                                        <div class="project-progress-container">
                                            <div class="project-progress-bar">
                                                <div class="project-progress-fill" style="width: ${project.progress}%"></div>
                                            </div>
                                            <span class="project-progress-text">${project.progress}%</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Recent Achievements -->
                        <div class="details-section achievements-section">
                            <h4 class="section-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                    <path d="M4 22h16l-1-7H5l-1 7z"></path>
                                    <path d="M8 9h8"></path>
                                    <path d="M12 2v7"></path>
                                </svg>
                                Recent Achievements
                            </h4>
                            <div class="achievements-list">
                                ${member.achievements.slice(0, 3).map(achievement => `
                                    <div class="achievement-item impact-${achievement.impact}">
                                        <div class="achievement-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                                                <path d="M4 22h16l-1-7H5l-1 7z"></path>
                                                <path d="M8 9h8"></path>
                                                <path d="M12 2v7"></path>
                                            </svg>
                                        </div>
                                        <div class="achievement-content">
                                            <h5 class="achievement-title">${achievement.title}</h5>
                                            <p class="achievement-description">${achievement.description}</p>
                                            <div class="achievement-meta">
                                                <span class="achievement-date">${new Date(achievement.date).toLocaleDateString()}</span>
                                                <span class="achievement-impact impact-${achievement.impact}">${achievement.impact} impact</span>
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Recent Activity Feed -->
                        <div class="details-section activity-section">
                            <h4 class="section-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M12 1v6m0 6v6"></path>
                                    <path d="m21 12-6-3-6 3-6-3"></path>
                                </svg>
                                Recent Activity
                            </h4>
                            <div class="activity-feed">
                                ${member.recentActivity.map(activity => `
                                    <div class="activity-item type-${activity.type}">
                                        <div class="activity-icon">
                                            ${this.getActivityIcon(activity.type)}
                                        </div>
                                        <div class="activity-content">
                                            <p class="activity-text">${activity.action}</p>
                                            <span class="activity-time">${activity.time}</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Team Analytics Panel -->
                <div class="team-analytics-panel">
                    <h3 class="analytics-title">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Team Analytics
                        <div class="refresh-indicator">
                            <svg class="refresh-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                    </svg>
                        </div>
                    </h3>
                    
                    <div class="analytics-grid">
                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Team Overview</h4>
                            </div>
                            <div class="overview-stats">
                                <div class="overview-stat">
                                    <span class="stat-number">${this.teamAnalytics.totalMembers}</span>
                                    <span class="stat-label">Total Members</span>
                                </div>
                                <div class="overview-stat">
                                    <span class="stat-number online">${this.teamAnalytics.onlineMembers}</span>
                                    <span class="stat-label">Online Now</span>
                                </div>
                                <div class="overview-stat">
                                    <span class="stat-number">${this.teamAnalytics.activeDepartments}</span>
                                    <span class="stat-label">Departments</span>
                                </div>
                                <div class="overview-stat">
                                    <span class="stat-number">${this.teamAnalytics.projectsActive}</span>
                                    <span class="stat-label">Active Projects</span>
                                </div>
                            </div>
                        </div>

                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Department Performance</h4>
                            </div>
                            <div class="department-chart">
                                ${this.teamAnalytics.departmentBreakdown.map(dept => `
                                    <div class="department-item">
                                        <div class="dept-info">
                                            <span class="dept-name">${dept.name}</span>
                                            <span class="dept-count">${dept.count} members</span>
                                        </div>
                                        <div class="dept-productivity">
                                            <div class="productivity-bar">
                                                <div class="productivity-fill" style="width: ${dept.productivity}%"></div>
                                            </div>
                                            <span class="productivity-value">${dept.productivity}%</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Skills Distribution</h4>
                            </div>
                            <div class="skills-chart">
                                ${this.teamAnalytics.skillDistribution.map(skill => `
                                    <div class="skill-distribution-item">
                                        <div class="skill-info">
                                            <span class="skill-name">${skill.skill}</span>
                                            <div class="skill-counts">
                                                <span class="experts-count">${skill.experts} experts</span>
                                                <span class="growing-count">${skill.growing} learning</span>
                                            </div>
                                        </div>
                                        <div class="skill-visual">
                                            <div class="experts-bar" style="width: ${(skill.experts / 20) * 100}%"></div>
                                            <div class="growing-bar" style="width: ${(skill.growing / 20) * 100}%"></div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="analytics-card">
                            <div class="card-header">
                                <h4>Recent Team Achievements</h4>
                            </div>
                            <div class="team-achievements">
                                ${this.teamAnalytics.recentAchievements.map(achievement => `
                                    <div class="team-achievement-item impact-${achievement.impact}">
                                        <div class="team-achievement-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="9" cy="7" r="4"></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                        </div>
                                        <div class="team-achievement-content">
                                            <h5>${achievement.team}</h5>
                                            <p>${achievement.achievement}</p>
                                            <span class="impact-badge ${achievement.impact}">${achievement.impact} impact</span>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getActivityIcon(type) {
        const icons = {
            achievement: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16l-1-7H5l-1 7z"></path><path d="M8 9h8"></path><path d="M12 2v7"></path></svg>',
            collaboration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
            review: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>',
            bug_fix: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 2v4"></path><path d="M16 2v4"></path><path d="M21 9.5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h1c.28 0 .5.22.5.5z"></path><path d="M10 18c-.28 0-.5-.22-.5-.5s.22-.5.5-.5s.5.22.5.5-.22.5-.5.5z"></path><path d="M14 18c-.28 0-.5-.22-.5-.5s.22-.5.5-.5s.5.22.5.5-.22.5-.5.5z"></path><path d="M3 9.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5s-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5z"></path><rect x="6" y="6" width="12" height="12" rx="4"></rect></svg>',
            presentation: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
            deployment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="m16 12-4-4-4 4"></path><path d="M12 16V8"></path></svg>',
            analysis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-3 3"></path></svg>',
            optimization: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>'
        };
        return icons[type] || icons.achievement;
    }

    updateMemberDisplay() {
        // Update productivity values and trends for current member
        const member = this.members[this.currentIndex];
        const productivityValue = this.querySelector('.productivity-value');
        const trendElement = this.querySelector('.stat-value.trend-up, .stat-value.trend-down');
        const tasksElement = this.querySelector('.quick-stats .stat-item:first-child .stat-value');
        const onlineCount = this.querySelector('.stat-number.online');
        
        if (productivityValue) {
            productivityValue.textContent = `${member.productivity.thisWeek}%`;
        }
        
        if (trendElement) {
            trendElement.textContent = `${member.productivity.trend}%`;
            trendElement.className = `stat-value trend-${member.productivity.trend.startsWith('+') ? 'up' : 'down'}`;
        }
        
        if (tasksElement) {
            tasksElement.textContent = member.productivity.tasksCompleted;
        }
        
        if (onlineCount) {
            onlineCount.textContent = this.teamAnalytics.onlineMembers;
        }
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('#prevMember');
        const nextBtn = this.querySelector('#nextMember');
        const indicators = this.querySelectorAll('.indicator');
        const skillItems = this.querySelectorAll('.skill-item');
        const projectItems = this.querySelectorAll('.project-item');
        const achievementItems = this.querySelectorAll('.achievement-item');

        // Navigation controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.showPreviousMember();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.showNextMember();
            });
        }

        // Member indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.stopAutoplay();
                this.showMember(index);
            });
        });

        // Interactive skill highlighting
        skillItems.forEach(skill => {
            skill.addEventListener('click', () => {
                this.highlightSkill(skill);
            });
        });

        // Project item interactions
        projectItems.forEach(project => {
            project.addEventListener('click', () => {
                this.showProjectDetails(project);
            });
        });

        // Achievement interactions
        achievementItems.forEach(achievement => {
            achievement.addEventListener('click', () => {
                this.showAchievementDetails(achievement);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.contains(document.activeElement) || e.target.closest('.enhanced-team-spotlight')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.showPreviousMember();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.showNextMember();
                }
            }
        });

        // Pause autoplay on hover
        this.addEventListener('mouseenter', () => {
            this.stopAutoplay();
        });
        
        this.addEventListener('mouseleave', () => {
                    this.startAutoplay();
        });
    }

    showMember(index) {
        if (index === this.currentIndex || this.isAnimating) return;
        
        this.currentIndex = index;
        this.animateTransition();
    }

    showPreviousMember() {
        this.currentIndex = (this.currentIndex - 1 + this.members.length) % this.members.length;
        this.animateTransition();
    }

    showNextMember() {
        this.currentIndex = (this.currentIndex + 1) % this.members.length;
        this.animateTransition();
    }

    animateTransition() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        const mainContent = this.querySelector('.spotlight-main');
        if (!mainContent) return;

        // Fade out
        mainContent.style.opacity = '0.5';
        mainContent.style.transform = 'translateY(10px)';

        setTimeout(() => {
            this.render();
            this.setupEventListeners();
            
            const newMainContent = this.querySelector('.spotlight-main');
            if (newMainContent) {
                newMainContent.style.opacity = '0';
                newMainContent.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(() => {
                    newMainContent.style.transition = 'all 0.3s ease-out';
                    newMainContent.style.opacity = '1';
                    newMainContent.style.transform = 'translateY(0)';
                });
            }

            // Update indicators
            const indicators = this.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentIndex);
            });

            this.isAnimating = false;
        }, 150);
    }

    highlightSkill(skillElement) {
        // Remove existing highlights
        this.querySelectorAll('.skill-item').forEach(skill => {
            skill.classList.remove('highlighted');
        });
        
        // Add highlight
        skillElement.classList.add('highlighted');
        
        // Show skill details
        const skillName = skillElement.dataset.skill;
        this.showNotification(`Skill highlighted: ${skillName}`, 'info');
    }

    showProjectDetails(projectElement) {
        const projectName = projectElement.querySelector('.project-name').textContent;
        this.showNotification(`Project details: ${projectName}`, 'info');
    }

    showAchievementDetails(achievementElement) {
        const achievementTitle = achievementElement.querySelector('.achievement-title').textContent;
        this.showNotification(`Achievement: ${achievementTitle}`, 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `team-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${type === 'success' ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>' : 
                      type === 'warning' ? '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="m12 17.02.01 0"></path>' : 
                      '<circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path>'}
                </svg>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
            notification.style.opacity = '1';
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateY(-100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.showNextMember();
        }, 8000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateMemberDisplay();
        }, 10000);
    }

    stopRealTimeUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    initializeAnimations() {
        // Initialize entrance animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        });

        const animateElements = this.querySelectorAll('.member-card, .analytics-card, .details-section');
        animateElements.forEach(el => observer.observe(el));
    }
}

customElements.define('team-spotlight', TeamSpotlight); 