// Enhanced Achievement System with Contest-Winning Features
class EnhancedAchievementSystem extends HTMLElement {
    constructor() {
        super();
        this.achievements = [];
        this.userLevel = 1;
        this.userPoints = 0;
        this.userStreak = 0;
        this.recentAchievements = [];
        this.isInitialized = false;
    }

    connectedCallback() {
        this.loadAchievements();
        this.render();
        this.setupEventListeners();
        this.startAchievementTracking();
        this.initializeGamification();
    }

    loadAchievements() {
        this.achievements = [
            {
                id: 'first_task',
                title: 'Task Master',
                description: 'Complete your first task',
                icon: '📋',
                points: 10,
                category: 'productivity',
                unlocked: false
            },
            {
                id: 'team_collaborator',
                title: 'Team Player',
                description: 'Participate in 5 team activities',
                icon: '👥',
                points: 25,
                category: 'collaboration',
                unlocked: false
            },
            {
                id: 'knowledge_seeker',
                title: 'Knowledge Seeker',
                description: 'Read 10 articles from the knowledge hub',
                icon: '📚',
                points: 30,
                category: 'learning',
                unlocked: false
            },
            {
                id: 'meeting_organizer',
                title: 'Meeting Organizer',
                description: 'Schedule and host 3 meetings',
                icon: '📅',
                points: 40,
                category: 'leadership',
                unlocked: false
            },
            {
                id: 'document_creator',
                title: 'Document Creator',
                description: 'Create 5 documents',
                icon: '📄',
                points: 35,
                category: 'productivity',
                unlocked: false
            },
            {
                id: 'weather_watcher',
                title: 'Weather Watcher',
                description: 'Check weather widget 7 days in a row',
                icon: '🌤️',
                points: 20,
                category: 'engagement',
                unlocked: false
            },
            {
                id: 'poll_participant',
                title: 'Voice of the Team',
                description: 'Participate in 5 team polls',
                icon: '🗳️',
                points: 15,
                category: 'engagement',
                unlocked: false
            },
            {
                id: 'ai_assistant_user',
                title: 'AI Enthusiast',
                description: 'Use AI assistant 10 times',
                icon: '🤖',
                points: 50,
                category: 'innovation',
                unlocked: false
            }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="enhanced-achievement-system">
                <div class="achievement-header">
                    <h3 class="achievement-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        Achievements & Progress
                    </h3>
                    <div class="achievement-stats">
                        <div class="level-badge">
                            <span class="level-number">${this.userLevel}</span>
                            <span class="level-label">Level</span>
                        </div>
                        <div class="points-display">
                            <span class="points-number">${this.userPoints}</span>
                            <span class="points-label">Points</span>
                        </div>
                        <div class="streak-counter">
                            <span class="streak-number">${this.userStreak}</span>
                            <span class="streak-label">Day Streak</span>
                        </div>
                    </div>
                </div>

                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${this.getProgressPercentage()}%"></div>
                    </div>
                    <span class="progress-text">${this.userPoints} / ${this.getNextLevelPoints()} points to next level</span>
                </div>

                <div class="recent-achievements">
                    <h4>Recent Achievements</h4>
                    <div class="achievements-list">
                        ${this.renderRecentAchievements()}
                    </div>
                </div>

                <div class="next-achievements">
                    <h4>Next Achievements</h4>
                    <div class="achievements-grid">
                        ${this.renderNextAchievements()}
                    </div>
                </div>

                <div class="achievement-actions">
                    <button class="btn secondary" id="viewAllAchievements">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        View All
                    </button>
                    <button class="btn primary" id="shareAchievements">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        Share Progress
                    </button>
                </div>
            </div>
        `;
    }

    renderRecentAchievements() {
        if (this.recentAchievements.length === 0) {
            return `
                <div class="empty-achievements">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <p>Complete tasks to earn achievements!</p>
                </div>
            `;
        }

        return this.recentAchievements.slice(0, 3).map(achievement => `
            <div class="achievement-item unlocked">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h5 class="achievement-title">${achievement.title}</h5>
                    <p class="achievement-description">${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} points</span>
                </div>
            </div>
        `).join('');
    }

    renderNextAchievements() {
        const unlockedAchievements = this.achievements.filter(a => a.unlocked);
        const nextAchievements = this.achievements
            .filter(a => !a.unlocked)
            .slice(0, 4);

        return nextAchievements.map(achievement => `
            <div class="achievement-item locked">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-content">
                    <h5 class="achievement-title">${achievement.title}</h5>
                    <p class="achievement-description">${achievement.description}</p>
                    <span class="achievement-points">+${achievement.points} points</span>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const viewAllBtn = this.querySelector('#viewAllAchievements');
        const shareBtn = this.querySelector('#shareAchievements');

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => this.showAllAchievements());
        }

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.shareProgress());
        }
    }

    startAchievementTracking() {
        // Track user actions for achievements
        this.trackTaskCompletion();
        this.trackTeamActivities();
        this.trackKnowledgeHubUsage();
        this.trackMeetingOrganization();
        this.trackDocumentCreation();
        this.trackWeatherChecks();
        this.trackPollParticipation();
        this.trackAIUsage();
    }

    trackTaskCompletion() {
        document.addEventListener('taskCompleted', () => {
            this.checkAchievement('first_task');
        });
    }

    trackTeamActivities() {
        document.addEventListener('teamActivity', () => {
            this.incrementActivityCount('team_activities');
            if (this.getActivityCount('team_activities') >= 5) {
                this.checkAchievement('team_collaborator');
            }
        });
    }

    trackKnowledgeHubUsage() {
        document.addEventListener('articleRead', () => {
            this.incrementActivityCount('articles_read');
            if (this.getActivityCount('articles_read') >= 10) {
                this.checkAchievement('knowledge_seeker');
            }
        });
    }

    trackMeetingOrganization() {
        document.addEventListener('meetingScheduled', () => {
            this.incrementActivityCount('meetings_organized');
            if (this.getActivityCount('meetings_organized') >= 3) {
                this.checkAchievement('meeting_organizer');
            }
        });
    }

    trackDocumentCreation() {
        document.addEventListener('documentCreated', () => {
            this.incrementActivityCount('documents_created');
            if (this.getActivityCount('documents_created') >= 5) {
                this.checkAchievement('document_creator');
            }
        });
    }

    trackWeatherChecks() {
        document.addEventListener('weatherChecked', () => {
            this.incrementActivityCount('weather_checks');
            if (this.getActivityCount('weather_checks') >= 7) {
                this.checkAchievement('weather_watcher');
            }
        });
    }

    trackPollParticipation() {
        document.addEventListener('pollParticipated', () => {
            this.incrementActivityCount('polls_participated');
            if (this.getActivityCount('polls_participated') >= 5) {
                this.checkAchievement('poll_participant');
            }
        });
    }

    trackAIUsage() {
        document.addEventListener('aiUsed', () => {
            this.incrementActivityCount('ai_usage');
            if (this.getActivityCount('ai_usage') >= 10) {
                this.checkAchievement('ai_assistant_user');
            }
        });
    }

    checkAchievement(achievementId) {
        const achievement = this.achievements.find(a => a.id === achievementId);
        if (achievement && !achievement.unlocked) {
            this.unlockAchievement(achievement);
        }
    }

    unlockAchievement(achievement) {
        achievement.unlocked = true;
        this.userPoints += achievement.points;
        this.recentAchievements.unshift(achievement);
        
        // Keep only last 5 recent achievements
        if (this.recentAchievements.length > 5) {
            this.recentAchievements = this.recentAchievements.slice(0, 5);
        }

        this.checkLevelUp();
        this.render();
        this.showAchievementNotification(achievement);
        this.saveProgress();
    }

    checkLevelUp() {
        const nextLevelPoints = this.getNextLevelPoints();
        if (this.userPoints >= nextLevelPoints) {
            this.userLevel++;
            this.showLevelUpNotification();
        }
    }

    getNextLevelPoints() {
        return this.userLevel * 100;
    }

    getProgressPercentage() {
        const currentLevelPoints = (this.userLevel - 1) * 100;
        const pointsInCurrentLevel = this.userPoints - currentLevelPoints;
        const pointsNeededForLevel = 100;
        return Math.min(100, (pointsInCurrentLevel / pointsNeededForLevel) * 100);
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-notification-content">
                <div class="achievement-notification-icon">${achievement.icon}</div>
                <div class="achievement-notification-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.title}</p>
                    <span>+${achievement.points} points</span>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showLevelUpNotification() {
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-notification-content">
                <div class="level-up-notification-icon">🎉</div>
                <div class="level-up-notification-text">
                    <h4>Level Up!</h4>
                    <p>You've reached level ${this.userLevel}!</p>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    showAllAchievements() {
        const modal = document.createElement('div');
        modal.className = 'modal achievement-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>All Achievements</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="achievements-grid">
                        ${this.achievements.map(achievement => `
                            <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <div class="achievement-content">
                                    <h5 class="achievement-title">${achievement.title}</h5>
                                    <p class="achievement-description">${achievement.description}</p>
                                    <span class="achievement-points">+${achievement.points} points</span>
                                    ${achievement.unlocked ? '<span class="achievement-status">✓ Unlocked</span>' : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle close button
        const closeBtn = modal.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => modal.remove());

        // Close on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    shareProgress() {
        const shareText = `I'm level ${this.userLevel} with ${this.userPoints} points in Quantum Forge! 🚀`;
        
        if (navigator.share) {
            navigator.share({
                title: 'My Quantum Forge Progress',
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Progress copied to clipboard!', 'success');
            });
        }
    }

    initializeGamification() {
        // Initialize daily streak tracking
        this.checkDailyStreak();
        
        // Set up daily login tracking
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin !== today) {
            this.userStreak++;
            localStorage.setItem('lastLogin', today);
            localStorage.setItem('userStreak', this.userStreak);
        } else {
            this.userStreak = parseInt(localStorage.getItem('userStreak') || '0');
        }
    }

    checkDailyStreak() {
        const today = new Date();
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin) {
            const lastLoginDate = new Date(lastLogin);
            const daysDiff = Math.floor((today - lastLoginDate) / (1000 * 60 * 60 * 24));
            
            if (daysDiff > 1) {
                // Streak broken
                this.userStreak = 0;
                localStorage.setItem('userStreak', '0');
            }
        }
    }

    incrementActivityCount(activity) {
        const count = this.getActivityCount(activity) + 1;
        localStorage.setItem(`activity_${activity}`, count.toString());
    }

    getActivityCount(activity) {
        return parseInt(localStorage.getItem(`activity_${activity}`) || '0');
    }

    saveProgress() {
        localStorage.setItem('userLevel', this.userLevel.toString());
        localStorage.setItem('userPoints', this.userPoints.toString());
        localStorage.setItem('userStreak', this.userStreak.toString());
        localStorage.setItem('recentAchievements', JSON.stringify(this.recentAchievements));
    }

    loadProgress() {
        this.userLevel = parseInt(localStorage.getItem('userLevel') || '1');
        this.userPoints = parseInt(localStorage.getItem('userPoints') || '0');
        this.userStreak = parseInt(localStorage.getItem('userStreak') || '0');
        this.recentAchievements = JSON.parse(localStorage.getItem('recentAchievements') || '[]');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

customElements.define('enhanced-achievement-system', EnhancedAchievementSystem); 