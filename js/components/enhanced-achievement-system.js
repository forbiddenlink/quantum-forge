// Enhanced Achievement System with Contest-Winning Features
class EnhancedAchievementSystem extends HTMLElement {
    constructor() {
        super();
        this.achievements = [];
        this.userPoints = 0;
        this.userLevel = 1;
        this.streaks = {
            login: 0,
            tasks: 0,
            collaboration: 0,
            learning: 0
        };
        this.badges = new Map();
        this.leaderboard = [];
        this.socialFeatures = {
            likes: 0,
            shares: 0,
            comments: 0
        };
    }

    connectedCallback() {
        this.loadUserData();
        this.render();
        this.setupEventListeners();
        this.startTracking();
        this.initializeSocialFeatures();
    }

    render() {
        this.innerHTML = `
            <div class="enhanced-achievement-system">
                <div class="achievement-header">
                    <div class="user-profile-card">
                        <div class="level-badge">
                            <div class="level-ring">
                                <svg viewBox="0 0 36 36" class="level-progress">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                                          stroke-dasharray="${this.getLevelProgress()}, 100"/>
                                </svg>
                                <span class="level-number">${this.userLevel}</span>
                            </div>
                            <span class="level-label">Level</span>
                        </div>
                        <div class="user-stats">
                            <div class="points-display">
                                <span class="points-number">${this.userPoints.toLocaleString()}</span>
                                <span class="points-label">Points</span>
                            </div>
                            <div class="rank-display">
                                <span class="rank-number">#${this.getUserRank()}</span>
                                <span class="rank-label">Rank</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="streak-display">
                        <div class="streak-item">
                            <span class="streak-icon">🔥</span>
                            <span class="streak-count">${this.streaks.login}</span>
                            <span class="streak-label">Login</span>
                        </div>
                        <div class="streak-item">
                            <span class="streak-icon">✅</span>
                            <span class="streak-count">${this.streaks.tasks}</span>
                            <span class="streak-label">Tasks</span>
                        </div>
                        <div class="streak-item">
                            <span class="streak-icon">🤝</span>
                            <span class="streak-count">${this.streaks.collaboration}</span>
                            <span class="streak-label">Team</span>
                        </div>
                        <div class="streak-item">
                            <span class="streak-icon">📚</span>
                            <span class="streak-count">${this.streaks.learning}</span>
                            <span class="streak-label">Learning</span>
                        </div>
                    </div>
                </div>
                
                <div class="badges-section">
                    <h3>Badges & Achievements</h3>
                    <div class="badges-grid">
                        ${this.renderBadges()}
                    </div>
                </div>
                
                <div class="leaderboard-section">
                    <h3>Leaderboard</h3>
                    <div class="leaderboard-list">
                        ${this.renderLeaderboard()}
                    </div>
                </div>
                
                <div class="social-section">
                    <h3>Social Activity</h3>
                    <div class="social-stats">
                        <div class="social-stat">
                            <span class="social-icon">👍</span>
                            <span class="social-count">${this.socialFeatures.likes}</span>
                            <span class="social-label">Likes</span>
                        </div>
                        <div class="social-stat">
                            <span class="social-icon">📤</span>
                            <span class="social-count">${this.socialFeatures.shares}</span>
                            <span class="social-label">Shares</span>
                        </div>
                        <div class="social-stat">
                            <span class="social-icon">💬</span>
                            <span class="social-count">${this.socialFeatures.comments}</span>
                            <span class="social-label">Comments</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderBadges() {
        const badges = [
            { id: 'first-login', name: 'First Steps', icon: '🚀', earned: true, rarity: 'common' },
            { id: 'task-master', name: 'Task Master', icon: '🎯', earned: this.streaks.tasks >= 50, rarity: 'rare' },
            { id: 'team-player', name: 'Team Player', icon: '🤝', earned: this.streaks.collaboration >= 10, rarity: 'epic' },
            { id: 'knowledge-seeker', name: 'Knowledge Seeker', icon: '📚', earned: this.streaks.learning >= 5, rarity: 'legendary' },
            { id: 'streak-master', name: 'Streak Master', icon: '🔥', earned: this.streaks.login >= 30, rarity: 'mythic' },
            { id: 'early-bird', name: 'Early Bird', icon: '🌅', earned: false, rarity: 'common' }
        ];

        return badges.map(badge => `
            <div class="badge-card ${badge.earned ? 'earned' : 'locked'} ${badge.rarity}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-info">
                    <h4 class="badge-name">${badge.name}</h4>
                    <span class="badge-rarity">${badge.rarity}</span>
                </div>
                ${badge.earned ? '<div class="badge-earned">✓</div>' : '<div class="badge-locked">🔒</div>'}
            </div>
        `).join('');
    }

    renderLeaderboard() {
        const topUsers = [
            { name: 'Sarah Chen', points: 2840, level: 8, avatar: 'SC' },
            { name: 'Mike Rodriguez', points: 2650, level: 7, avatar: 'MR' },
            { name: 'Lisa Thompson', points: 2420, level: 6, avatar: 'LT' },
            { name: 'You', points: this.userPoints, level: this.userLevel, avatar: 'YO', isCurrentUser: true }
        ];

        return topUsers.map((user, index) => `
            <div class="leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}">
                <div class="rank-position">#${index + 1}</div>
                <div class="user-avatar">${user.avatar}</div>
                <div class="user-info">
                    <h4 class="user-name">${user.name}</h4>
                    <span class="user-level">Level ${user.level}</span>
                </div>
                <div class="user-points">${user.points.toLocaleString()}</div>
            </div>
        `).join('');
    }

    getLevelProgress() {
        const pointsForNextLevel = this.userLevel * 100;
        const pointsInCurrentLevel = this.userPoints % 100;
        return (pointsInCurrentLevel / 100) * 100;
    }

    getUserRank() {
        // Mock rank calculation
        return Math.max(1, Math.floor(Math.random() * 50) + 1);
    }

    initializeSocialFeatures() {
        // Simulate social interactions
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.socialFeatures.likes++;
                this.updateSocialDisplay();
            }
        }, 30000);
    }

    updateSocialDisplay() {
        const socialStats = this.querySelectorAll('.social-count');
        socialStats[0].textContent = this.socialFeatures.likes;
        socialStats[1].textContent = this.socialFeatures.shares;
        socialStats[2].textContent = this.socialFeatures.comments;
    }

    unlockBadge(badgeId) {
        const badge = this.querySelector(`[data-badge-id="${badgeId}"]`);
        if (badge && !badge.classList.contains('earned')) {
            badge.classList.add('earned');
            badge.classList.remove('locked');
            
            // Show unlock animation
            this.showBadgeUnlockAnimation(badge);
        }
    }

    showBadgeUnlockAnimation(badge) {
        badge.style.animation = 'badgeUnlock 1s ease-out';
        setTimeout(() => {
            badge.style.animation = '';
        }, 1000);
    }

    addPoints(points, reason = '') {
        const oldPoints = this.userPoints;
        this.userPoints += points;
        
        // Animate points increase
        this.animatePointsChange(oldPoints, this.userPoints);
        
        // Check for level up
        const newLevel = Math.floor(this.userPoints / 100) + 1;
        if (newLevel > this.userLevel) {
            this.levelUp(newLevel);
        }
        
        // Show points notification
        this.showPointsNotification(points, reason);
        
        this.saveUserData();
    }

    animatePointsChange(oldPoints, newPoints) {
        const pointsElement = this.querySelector('.points-number');
        if (!pointsElement) return;

        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentPoints = Math.floor(oldPoints + (newPoints - oldPoints) * progress);
            pointsElement.textContent = currentPoints.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    showPointsNotification(points, reason) {
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">🎉</div>
                <div class="notification-text">
                    <h4>+${points} Points!</h4>
                    <p>${reason || 'Great work!'}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    levelUp(newLevel) {
        this.userLevel = newLevel;
        
        const notification = document.createElement('div');
        notification.className = 'level-up-notification enhanced';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <div class="level-up-text">
                    <h4>Level Up!</h4>
                    <p>You reached level ${newLevel}</p>
                    <div class="level-rewards">
                        <span class="reward">+100 Points</span>
                        <span class="reward">New Badge</span>
                        <span class="reward">Profile Frame</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    loadUserData() {
        const savedData = localStorage.getItem('enhancedAchievementData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.achievements = data.achievements || [];
            this.userPoints = data.points || 0;
            this.userLevel = data.level || 1;
            this.streaks = data.streaks || { login: 0, tasks: 0, collaboration: 0, learning: 0 };
            this.socialFeatures = data.socialFeatures || { likes: 0, shares: 0, comments: 0 };
        }
    }

    saveUserData() {
        const data = {
            achievements: this.achievements,
            points: this.userPoints,
            level: this.userLevel,
            streaks: this.streaks,
            socialFeatures: this.socialFeatures
        };
        localStorage.setItem('enhancedAchievementData', JSON.stringify(data));
    }

    setupEventListeners() {
        // Listen for user actions
        document.addEventListener('taskCompleted', () => {
            this.streaks.tasks++;
            this.addPoints(10, 'Task completed');
            this.checkTaskAchievements();
        });

        document.addEventListener('collaboration', () => {
            this.streaks.collaboration++;
            this.addPoints(5, 'Team collaboration');
            this.checkCollaborationAchievements();
        });

        document.addEventListener('learning', () => {
            this.streaks.learning++;
            this.addPoints(15, 'Learning milestone');
            this.checkLearningAchievements();
        });
    }

    startTracking() {
        this.trackDailyLogin();
        
        setInterval(() => {
            this.checkForNewAchievements();
        }, 30000);
    }

    trackDailyLogin() {
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin !== today) {
            this.streaks.login++;
            this.addPoints(5, 'Daily login');
            this.checkLoginAchievements();
            localStorage.setItem('lastLogin', today);
        }
    }

    checkLoginAchievements() {
        if (this.streaks.login === 7) {
            this.unlockBadge('early-bird');
            this.addPoints(50, 'Week streak!');
        }
    }

    checkTaskAchievements() {
        if (this.streaks.tasks === 50) {
            this.unlockBadge('task-master');
            this.addPoints(100, 'Task master!');
        }
    }

    checkCollaborationAchievements() {
        if (this.streaks.collaboration === 10) {
            this.unlockBadge('team-player');
            this.addPoints(75, 'Team player!');
        }
    }

    checkLearningAchievements() {
        if (this.streaks.learning === 5) {
            this.unlockBadge('knowledge-seeker');
            this.addPoints(150, 'Knowledge seeker!');
        }
    }

    checkForNewAchievements() {
        // Additional achievement checks
        if (this.userPoints >= 1000 && !this.badges.has('points-master')) {
            this.badges.set('points-master', true);
            this.addPoints(200, 'Points master!');
        }
    }
}

customElements.define('enhanced-achievement-system', EnhancedAchievementSystem); 