// Team Spotlight Component
class TeamSpotlight extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.members = [
            {
                name: 'Sarah Chen',
                role: 'Lead Designer',
                department: 'Design',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%236366f1"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3ESC%3C/text%3E%3C/svg%3E',
                status: 'online',
                achievements: ['Design System Lead', 'UI/UX Champion'],
                skills: ['UI Design', 'Design Systems', 'User Research']
            },
            {
                name: 'Marcus Rodriguez',
                role: 'Senior Developer',
                department: 'Engineering',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%23f59e0b"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3EMR%3C/text%3E%3C/svg%3E',
                status: 'online',
                achievements: ['Performance Expert', '10x Contributor'],
                skills: ['JavaScript', 'React', 'Node.js']
            },
            {
                name: 'Emily Watson',
                role: 'Product Manager',
                department: 'Product',
                avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Crect width="24" height="24" fill="%2310b981"/%3E%3Ctext x="12" y="16" font-family="Arial" font-size="12" fill="white" text-anchor="middle"%3EEW%3C/text%3E%3C/svg%3E',
                status: 'away',
                achievements: ['Product of the Year', 'Innovation Award'],
                skills: ['Strategy', 'Analytics', 'Leadership']
            }
        ];
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.startAutoplay();
    }

    disconnectedCallback() {
        this.stopAutoplay();
    }

    render() {
        const member = this.members[this.currentIndex];
        this.innerHTML = `
            <div class="team-spotlight">
                <div class="spotlight-header">
                    <h3 class="spotlight-title">Team Spotlight</h3>
                    <div class="spotlight-controls">
                        <button class="btn-icon small" id="prevMember" aria-label="Previous team member">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="nextMember" aria-label="Next team member">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="member-spotlight">
                    <div class="member-header">
                        <div class="member-avatar-large">
                            <svg viewBox="0 0 64 64" width="64" height="64" aria-label="${member.name}">
                                <rect width="64" height="64" fill="${member.avatar.includes('%236366f1') ? '#6366f1' : member.avatar.includes('%23f59e0b') ? '#f59e0b' : '#10b981'}"/>
                                <text x="32" y="40" font-family="Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">${member.name.split(' ').map(n => n[0]).join('')}</text>
                            </svg>
                            <span class="member-status ${member.status}"></span>
                        </div>
                        <div class="member-info">
                            <h4 class="member-name">${member.name}</h4>
                            <p class="member-role">${member.role}</p>
                            <p class="member-department">${member.department}</p>
                        </div>
                    </div>

                    <div class="member-achievements">
                        <h4>Recent Achievements</h4>
                        <ul class="achievements-list">
                            ${member.achievements.map(achievement => `
                                <li>${achievement}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="member-skills">
                        <h4>Skills & Expertise</h4>
                        <div class="skills-tags">
                            ${member.skills.map(skill => `
                                <span class="skill-tag">${skill}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="upcoming-events">
                        <h4 class="events-title">Upcoming Events</h4>
                        <div class="events-list">
                            <div class="event-item">
                                <div class="event-icon workshop">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                </div>
                                <div class="event-content">
                                    <h5 class="event-title">Team Workshop</h5>
                                    <p class="event-time">Tomorrow, 2:00 PM</p>
                                </div>
                            </div>
                            <div class="event-item">
                                <div class="event-icon meeting">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <div class="event-content">
                                    <h5 class="event-title">Project Review</h5>
                                    <p class="event-time">Friday, 11:00 AM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('#prevMember');
        const nextBtn = this.querySelector('#nextMember');

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

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        this.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.showPreviousMember();
            } else {
                this.showNextMember();
            }
            this.stopAutoplay();
        }
    }

    showPreviousMember() {
        this.currentIndex = (this.currentIndex - 1 + this.members.length) % this.members.length;
        this.animateTransition('slide-right');
    }

    showNextMember() {
        this.currentIndex = (this.currentIndex + 1) % this.members.length;
        this.animateTransition('slide-left');
    }

    animateTransition(direction) {
        const spotlight = this.querySelector('.member-spotlight');
        spotlight.style.opacity = '0';
        spotlight.style.transform = direction === 'slide-left' ? 'translateX(-20px)' : 'translateX(20px)';

        setTimeout(() => {
            this.render();
            const newSpotlight = this.querySelector('.member-spotlight');
            newSpotlight.style.opacity = '1';
            newSpotlight.style.transform = 'translateX(0)';
        }, 300);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.showNextMember();
        }, 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

customElements.define('team-spotlight', TeamSpotlight); 