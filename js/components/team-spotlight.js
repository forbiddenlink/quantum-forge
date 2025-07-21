// Team Spotlight Component
class TeamSpotlight extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isAnimating = false;
        this.isHovered = false;
        this.hasFocus = false;
        this.hoverTimeout = null;
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
            <div class="team-spotlight" tabindex="0">
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
                                <rect width="64" height="64" fill="${member.avatar.includes('%236366f1') ? '#6366f1' : member.avatar.includes('%23f59e0b') ? '#f59e0b' : '#10b981'}" rx="32"/>
                                <text x="32" y="40" font-family="Inter, Arial" font-size="24" fill="white" text-anchor="middle" font-weight="bold">${member.name.split(' ').map(n => n[0]).join('')}</text>
                            </svg>
                            <span class="member-status ${member.status}" title="${member.status === 'online' ? 'Online' : member.status === 'away' ? 'Away' : 'Offline'}"></span>
                        </div>
                        <div class="member-info">
                            <h4 class="member-name">${member.name}</h4>
                            <p class="member-role">${member.role}</p>
                            <div class="member-department">${member.department}</div>
                        </div>
                    </div>

                    <div class="member-achievements">
                        <h4>Recent Achievements</h4>
                        <ul class="achievements-list">
                            ${member.achievements.map(achievement => `
                                <li tabindex="0" role="button" aria-label="Achievement: ${achievement}">${achievement}</li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="member-skills">
                        <h4>Skills & Expertise</h4>
                        <div class="skills-tags">
                            ${member.skills.map(skill => `
                                <span class="skill-tag" tabindex="0" role="button" aria-label="Skill: ${skill}">${skill}</span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="upcoming-events">
                        <h4 class="events-title">Upcoming Events</h4>
                        <div class="events-list">
                            <div class="event-item" tabindex="0" role="button" aria-label="Team Workshop tomorrow at 2:00 PM">
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
                            <div class="event-item" tabindex="0" role="button" aria-label="Project Review Friday at 11:00 AM">
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
        const memberSpotlight = this.querySelector('.member-spotlight');

        // Enhanced navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.showPreviousMember();
                this.announceUpdate('Previous team member');
            });
            prevBtn.setAttribute('title', 'Go to previous team member');
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.showNextMember();
                this.announceUpdate('Next team member');
            });
            nextBtn.setAttribute('title', 'Go to next team member');
        }

        // Enhanced member spotlight interactions
        if (memberSpotlight) {
            memberSpotlight.addEventListener('click', () => {
                this.expandMemberProfile();
            });
            
            memberSpotlight.setAttribute('tabindex', '0');
            memberSpotlight.setAttribute('aria-label', 'Click to view full member profile');
            
            memberSpotlight.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.expandMemberProfile();
                }
            });
        }

        // Setup interactive elements
        this.setupInteractiveElements();

        // Enhanced touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;

        this.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        });

        this.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        });

        // Keyboard navigation - only when component is focused
        document.addEventListener('keydown', (e) => {
            if (this.contains(document.activeElement) || e.target.closest('team-spotlight')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.showPreviousMember();
                    this.announceUpdate('Previous team member');
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.showNextMember();
                    this.announceUpdate('Next team member');
                }
            }
        });

        // Pause autoplay on hover/focus - with better debouncing to prevent flashing
        if (!this.hoverTimeout) {
            this.hoverTimeout = null;
        }
        
        this.addEventListener('mouseenter', () => {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }
            this.stopAutoplay();
        });
        
        this.addEventListener('mouseleave', () => {
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }
            this.hoverTimeout = setTimeout(() => {
                if (!this.isHovered && !this.hasFocus) {
                    this.startAutoplay();
                }
                this.hoverTimeout = null;
            }, 1000); // Increased delay to prevent rapid toggling
        });
        
        this.addEventListener('focusin', () => {
            this.hasFocus = true;
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }
            this.stopAutoplay();
        });
        
        this.addEventListener('focusout', () => {
            this.hasFocus = false;
            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }
            this.hoverTimeout = setTimeout(() => {
                if (!this.isHovered && !this.hasFocus) {
                    this.startAutoplay();
                }
                this.hoverTimeout = null;
            }, 1000);
        });
    }

    setupInteractiveElements() {
        // Enhanced skill tag interactions
        const skillTags = this.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', () => {
                this.highlightSkill(tag);
            });
            
            tag.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.highlightSkill(tag);
                }
            });
        });

        // Enhanced achievement interactions
        const achievements = this.querySelectorAll('.achievements-list li');
        achievements.forEach(achievement => {
            achievement.addEventListener('click', () => {
                this.showAchievementDetails(achievement);
            });
            
            achievement.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showAchievementDetails(achievement);
                }
            });
        });

        // Enhanced event item interactions
        const eventItems = this.querySelectorAll('.event-item');
        eventItems.forEach(item => {
            item.addEventListener('click', () => {
                this.showEventDetails(item);
            });
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showEventDetails(item);
                }
            });
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Only handle horizontal swipes if they're more significant than vertical ones
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            if (diffX > 0) {
                this.showPreviousMember();
                this.announceUpdate('Previous team member');
            } else {
                this.showNextMember();
                this.announceUpdate('Next team member');
            }
            this.stopAutoplay();
        }
    }

    expandMemberProfile() {
        const currentMember = this.members[this.currentIndex];
        this.showNotification(`Viewing ${currentMember.name}'s profile`);
        this.announceUpdate(`Expanded profile for ${currentMember.name}, ${currentMember.role}`);
        // In a real app, this would navigate to a detailed profile page
    }

    highlightSkill(skillTag) {
        // Remove existing highlights
        this.querySelectorAll('.skill-tag').forEach(tag => {
            tag.classList.remove('highlighted');
        });
        
        // Add highlight to clicked skill
        skillTag.classList.add('highlighted');
        const skillName = skillTag.textContent;
        this.showNotification(`Skill: ${skillName}`);
        this.announceUpdate(`Highlighted skill: ${skillName}`);
        
        // Remove highlight after 2 seconds
        setTimeout(() => {
            skillTag.classList.remove('highlighted');
        }, 2000);
    }

    showAchievementDetails(achievement) {
        const achievementText = achievement.textContent;
        this.showNotification(`Achievement: ${achievementText}`);
        this.announceUpdate(`Viewing achievement: ${achievementText}`);
        
        // Add a temporary highlight effect
        achievement.style.transform = 'scale(1.02)';
        achievement.style.boxShadow = 'var(--shadow-md)';
        
        setTimeout(() => {
            achievement.style.transform = '';
            achievement.style.boxShadow = '';
        }, 1000);
    }

    showEventDetails(eventItem) {
        const eventTitle = eventItem.querySelector('.event-title').textContent;
        const eventTime = eventItem.querySelector('.event-time').textContent;
        this.showNotification(`Event: ${eventTitle} - ${eventTime}`);
        this.announceUpdate(`Viewing event: ${eventTitle} scheduled for ${eventTime}`);
    }

    announceUpdate(message) {
        // Create or update the live region for screen readers
        let liveRegion = document.querySelector('#team-spotlight-live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'team-spotlight-live-region';
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

    showNotification(message) {
        // Remove any existing notifications
        const existingNotifications = document.querySelectorAll('.team-spotlight-notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = 'team-spotlight-notification';
        notification.innerHTML = `
            <span class="notification-icon">👤</span>
            <span class="notification-text">${message}</span>
        `;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            bottom: 'var(--space-6)',
            right: 'var(--space-6)',
            background: 'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
            color: 'white',
            padding: 'var(--space-4) var(--space-6)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-xl)',
            zIndex: '1000',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            fontWeight: '500',
            fontSize: 'var(--font-size-sm)',
            animation: 'slideInUp 0.4s var(--ease-spring)',
            cursor: 'pointer'
        });
        
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
        if (!spotlight) return;
        
        // Prevent multiple animations running simultaneously
        if (this.isAnimating) return;
        this.isAnimating = true;
        
        // Use transform only to prevent layout reflows and flashing
        spotlight.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease-out';
        spotlight.style.opacity = '0.7';
        spotlight.style.transform = direction === 'slide-left' ? 'translateX(-20px)' : 'translateX(20px)';

        // Use shorter timeout to reduce flashing
        setTimeout(() => {
            this.render();
            this.setupEventListeners(); // Re-setup event listeners after render
            
            const newSpotlight = this.querySelector('.member-spotlight');
            if (!newSpotlight) {
                this.isAnimating = false;
                return;
            }
            
            // Start with the correct position to avoid jumps
            newSpotlight.style.opacity = '0.7';
            newSpotlight.style.transform = direction === 'slide-left' ? 'translateX(20px)' : 'translateX(-20px)';
            
            // Animate in smoothly
            requestAnimationFrame(() => {
                newSpotlight.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out';
                newSpotlight.style.opacity = '1';
                newSpotlight.style.transform = 'translateX(0)';
                
                // Clear animation flag after completion
                setTimeout(() => {
                    this.isAnimating = false;
                }, 300);
            });
        }, 100); // Reduced from 200ms to minimize flashing
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