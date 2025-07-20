// Team Spotlight Component
class TeamSpotlight extends HTMLElement {
    constructor() {
        super();
        this.spotlightData = null;
        this.currentIndex = 0;
        this.autoRotate = true;
    }

    connectedCallback() {
        console.log('Team Spotlight connected');
        this.loadSpotlightData();
        this.render();
        this.setupEventListeners();
        this.startAutoRotation();
    }

    disconnectedCallback() {
        this.stopAutoRotation();
    }

    loadSpotlightData() {
        // Mock data - in a real app, this would come from an API
        this.spotlightData = {
            teamMember: {
                name: 'Alex Chen',
                role: 'Senior Product Designer',
                avatar: 'https://ui-avatars.com/api/?name=Alex+Chen&background=6366f1&color=fff',
                department: 'Design',
                achievements: ['Led redesign of mobile app', 'Improved user engagement by 40%'],
                skills: ['UI/UX Design', 'Prototyping', 'User Research'],
                availability: 'Available for collaboration',
                recentWork: 'Mobile App Redesign'
            },
            upcomingEvents: [
                {
                    title: 'Design Team Workshop',
                    date: '2024-01-15',
                    time: '2:00 PM',
                    type: 'workshop',
                    attendees: 8
                },
                {
                    title: 'Product Launch Meeting',
                    date: '2024-01-16',
                    time: '10:00 AM',
                    type: 'meeting',
                    attendees: 12
                },
                {
                    title: 'Team Building Event',
                    date: '2024-01-18',
                    time: '4:00 PM',
                    type: 'social',
                    attendees: 25
                }
            ],
            achievements: [
                {
                    title: 'Project Alpha Completed',
                    description: 'Successfully launched new feature ahead of schedule',
                    team: 'Engineering',
                    date: '2024-01-10'
                },
                {
                    title: 'Customer Satisfaction Award',
                    description: 'Achieved 95% customer satisfaction rating',
                    team: 'Support',
                    date: '2024-01-08'
                }
            ]
        };
    }

    render() {
        this.innerHTML = `
            <div class="team-spotlight">
                <div class="spotlight-header">
                    <h2 class="spotlight-title">Team Spotlight</h2>
                    <div class="spotlight-controls">
                        <button class="btn-icon small" id="prevSpotlight" aria-label="Previous spotlight">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="nextSpotlight" aria-label="Next spotlight">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="spotlight-content">
                    <div class="member-spotlight">
                        <div class="member-header">
                            <img src="${this.spotlightData.teamMember.avatar}" alt="${this.spotlightData.teamMember.name}" class="member-avatar-large">
                            <div class="member-status online"></div>
                        </div>
                        <div class="member-info">
                            <h3 class="member-name">${this.spotlightData.teamMember.name}</h3>
                            <p class="member-role">${this.spotlightData.teamMember.role}</p>
                            <p class="member-department">${this.spotlightData.teamMember.department}</p>
                            <div class="member-availability">
                                <span class="availability-indicator online"></span>
                                ${this.spotlightData.teamMember.availability}
                            </div>
                        </div>
                        <div class="member-achievements">
                            <h4>Recent Achievements</h4>
                            <ul class="achievements-list">
                                ${this.spotlightData.teamMember.achievements.map(achievement => 
                                    `<li>${achievement}</li>`
                                ).join('')}
                            </ul>
                        </div>
                        <div class="member-skills">
                            <h4>Skills</h4>
                            <div class="skills-tags">
                                ${this.spotlightData.teamMember.skills.map(skill => 
                                    `<span class="skill-tag">${skill}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="upcoming-events">
                        <h3 class="events-title">Upcoming Events</h3>
                        <div class="events-list">
                            ${this.spotlightData.upcomingEvents.map(event => `
                                <div class="event-item">
                                    <div class="event-icon ${event.type}">
                                        ${this.getEventIcon(event.type)}
                                    </div>
                                    <div class="event-content">
                                        <h4 class="event-title">${event.title}</h4>
                                        <p class="event-time">${new Date(event.date).toLocaleDateString()} at ${event.time}</p>
                                        <p class="event-attendees">${event.attendees} attendees</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="team-achievements">
                        <h3 class="achievements-title">Team Achievements</h3>
                        <div class="achievements-grid">
                            ${this.spotlightData.achievements.map(achievement => `
                                <div class="achievement-card">
                                    <div class="achievement-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                        </svg>
                                    </div>
                                    <div class="achievement-content">
                                        <h4 class="achievement-title">${achievement.title}</h4>
                                        <p class="achievement-description">${achievement.description}</p>
                                        <div class="achievement-meta">
                                            <span class="achievement-team">${achievement.team}</span>
                                            <span class="achievement-date">${new Date(achievement.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getEventIcon(type) {
        const icons = {
            workshop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>`,
            meeting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`,
            social: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
            </svg>`
        };
        return icons[type] || icons.meeting;
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('#prevSpotlight');
        const nextBtn = this.querySelector('#nextSpotlight');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSpotlight());
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSpotlight());
        }

        // Pause auto-rotation on hover
        this.addEventListener('mouseenter', () => this.pauseAutoRotation());
        this.addEventListener('mouseleave', () => this.resumeAutoRotation());
    }

    previousSpotlight() {
        // In a real app, this would cycle through different team members
        this.currentIndex = Math.max(0, this.currentIndex - 1);
        this.updateSpotlight();
    }

    nextSpotlight() {
        // In a real app, this would cycle through different team members
        this.currentIndex = Math.min(2, this.currentIndex + 1);
        this.updateSpotlight();
    }

    updateSpotlight() {
        // Update the spotlight with new data
        // This would typically fetch new data from an API
        console.log('Updating spotlight to index:', this.currentIndex);
    }

    startAutoRotation() {
        if (this.autoRotate) {
            this.rotationInterval = setInterval(() => {
                this.nextSpotlight();
            }, 10000); // Rotate every 10 seconds
        }
    }

    stopAutoRotation() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
        }
    }

    pauseAutoRotation() {
        this.stopAutoRotation();
    }

    resumeAutoRotation() {
        this.startAutoRotation();
    }
}

// Register the custom element
customElements.define('team-spotlight', TeamSpotlight); 