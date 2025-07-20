// Achievement and Gamification System
class AchievementSystem extends HTMLElement {
    constructor() {
        super();
        this.achievements = [];
        this.userPoints = 0;
        this.userLevel = 1;
        this.streaks = {
            login: 0,
            tasks: 0,
            collaboration: 0
        };
    }

    connectedCallback() {
        this.loadUserData();
        this.render();
        this.setupEventListeners();
        this.startTracking();
    }

    render() {
        this.innerHTML = `
            <div class="achievement-system">
                <div class="achievement-header">
                    <div class="user-stats">
                        <div class="level-badge">
                            <span class="level-number">${this.userLevel}</span>
                            <span class="level-label">Level</span>
                        </div>
                        <div class="points-display">
                            <span class="points-number">${this.userPoints}</span>
                            <span class="points-label">Points</span>
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
                    </div>
                </div>
                
                <div class="achievements-grid">
                    <h3>Recent Achievements</h3>
                    <div class="achievements-list" id="achievementsList">
                        ${this.renderAchievements()}
                    </div>
                </div>
                
                <div class="next-achievements">
                    <h3>Next Milestones</h3>
                    <div class="milestone-list">
                        ${this.renderMilestones()}
                    </div>
                </div>
            </div>
        `;
    }

    renderAchievements() {
        return this.achievements.slice(-3).map(achievement => `
            <div class="achievement-card ${achievement.type}">
                <div class="achievement-icon">
                    ${achievement.icon}
                </div>
                <div class="achievement-content">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                    <span class="achievement-date">${this.formatDate(achievement.date)}</span>
                </div>
                <div class="achievement-points">+${achievement.points}</div>
            </div>
        `).join('');
    }

    renderMilestones() {
        const milestones = [
            { title: 'Task Master', description: 'Complete 50 tasks', progress: 35, target: 50, icon: '📋' },
            { title: 'Team Player', description: 'Collaborate with 10 team members', progress: 7, target: 10, icon: '👥' },
            { title: 'Knowledge Seeker', description: 'Complete 5 training modules', progress: 3, target: 5, icon: '📚' },
            { title: 'Early Bird', description: 'Login 7 days in a row', progress: 5, target: 7, icon: '🌅' }
        ];

        return milestones.map(milestone => {
            const percentage = (milestone.progress / milestone.target) * 100;
            return `
                <div class="milestone-card">
                    <div class="milestone-icon">${milestone.icon}</div>
                    <div class="milestone-content">
                        <h4>${milestone.title}</h4>
                        <p>${milestone.description}</p>
                        <div class="milestone-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${percentage}%"></div>
                            </div>
                            <span class="progress-text">${milestone.progress}/${milestone.target}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    setupEventListeners() {
        // Listen for user actions that could trigger achievements
        document.addEventListener('taskCompleted', () => this.checkTaskAchievements());
        document.addEventListener('loginStreak', () => this.checkLoginAchievements());
        document.addEventListener('collaboration', () => this.checkCollaborationAchievements());
    }

    startTracking() {
        // Track daily login
        this.trackDailyLogin();
        
        // Set up periodic checks
        setInterval(() => {
            this.checkForNewAchievements();
        }, 30000); // Check every 30 seconds
    }

    trackDailyLogin() {
        const today = new Date().toDateString();
        const lastLogin = localStorage.getItem('lastLogin');
        
        if (lastLogin !== today) {
            this.streaks.login++;
            this.addPoints(10);
            this.checkLoginStreak();
            localStorage.setItem('lastLogin', today);
            localStorage.setItem('loginStreak', this.streaks.login);
        }
    }

    checkTaskAchievements() {
        this.streaks.tasks++;
        this.addPoints(5);
        
        // Check for task-related achievements
        if (this.streaks.tasks === 10) {
            this.unlockAchievement({
                title: 'Task Enthusiast',
                description: 'Completed 10 tasks',
                icon: '🎯',
                points: 50,
                type: 'task'
            });
        }
        
        if (this.streaks.tasks === 50) {
            this.unlockAchievement({
                title: 'Task Master',
                description: 'Completed 50 tasks',
                icon: '🏆',
                points: 200,
                type: 'task'
            });
        }
    }

    checkLoginAchievements() {
        if (this.streaks.login === 7) {
            this.unlockAchievement({
                title: 'Early Bird',
                description: 'Logged in 7 days in a row',
                icon: '🌅',
                points: 100,
                type: 'streak'
            });
        }
        
        if (this.streaks.login === 30) {
            this.unlockAchievement({
                title: 'Dedicated',
                description: 'Logged in 30 days in a row',
                icon: '💎',
                points: 500,
                type: 'streak'
            });
        }
    }

    checkCollaborationAchievements() {
        this.streaks.collaboration++;
        this.addPoints(3);
        
        if (this.streaks.collaboration === 5) {
            this.unlockAchievement({
                title: 'Team Player',
                description: 'Collaborated with team 5 times',
                icon: '🤝',
                points: 75,
                type: 'collaboration'
            });
        }
    }

    unlockAchievement(achievement) {
        achievement.date = new Date();
        this.achievements.push(achievement);
        this.addPoints(achievement.points);
        
        // Show notification
        this.showAchievementNotification(achievement);
        
        // Update display
        this.render();
        
        // Save to localStorage
        this.saveUserData();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">${achievement.icon}</div>
                <div class="notification-text">
                    <h4>Achievement Unlocked!</h4>
                    <p>${achievement.title}</p>
                    <span class="notification-points">+${achievement.points} points</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    addPoints(points) {
        this.userPoints += points;
        
        // Check for level up
        const newLevel = Math.floor(this.userPoints / 100) + 1;
        if (newLevel > this.userLevel) {
            this.levelUp(newLevel);
        }
        
        this.saveUserData();
    }

    levelUp(newLevel) {
        this.userLevel = newLevel;
        
        // Show level up notification
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <div class="level-up-text">
                    <h4>Level Up!</h4>
                    <p>You reached level ${newLevel}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    checkForNewAchievements() {
        // Check for various achievement conditions
        const totalTasks = this.streaks.tasks;
        const totalCollaborations = this.streaks.collaboration;
        const loginStreak = this.streaks.login;
        
        // Add more achievement checks here
    }

    loadUserData() {
        const savedData = localStorage.getItem('achievementData');
        if (savedData) {
            const data = JSON.parse(savedData);
            this.achievements = data.achievements || [];
            this.userPoints = data.points || 0;
            this.userLevel = data.level || 1;
            this.streaks = data.streaks || { login: 0, tasks: 0, collaboration: 0 };
        }
    }

    saveUserData() {
        const data = {
            achievements: this.achievements,
            points: this.userPoints,
            level: this.userLevel,
            streaks: this.streaks
        };
        localStorage.setItem('achievementData', JSON.stringify(data));
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString();
    }
}

customElements.define('achievement-system', AchievementSystem); 