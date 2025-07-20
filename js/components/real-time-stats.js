// Real-time Statistics Component
class RealTimeStats extends HTMLElement {
    constructor() {
        super();
        this.stats = {
            activeProjects: 12,
            teamOnline: 8,
            meetingsCount: 3,
            tasksCompleted: 24
        };
        this.updateInterval = null;
    }

    connectedCallback() {
        this.startRealTimeUpdates();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    startRealTimeUpdates() {
        // Update stats every 30 seconds
        this.updateInterval = setInterval(() => {
            this.updateRandomStat();
        }, 30000);

        // Initial update after 5 seconds
        setTimeout(() => {
            this.updateRandomStat();
        }, 5000);
    }

    updateRandomStat() {
        const statKeys = Object.keys(this.stats);
        const randomKey = statKeys[Math.floor(Math.random() * statKeys.length)];
        
        const currentValue = this.stats[randomKey];
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        
        if (newValue !== currentValue) {
            this.stats[randomKey] = newValue;
            this.animateStatUpdate(randomKey, currentValue, newValue);
        }
    }

    animateStatUpdate(statKey, oldValue, newValue) {
        const element = document.getElementById(`${statKey}Count`);
        if (!element) return;

        const duration = 1000;
        const startTime = performance.now();
        const change = newValue - oldValue;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuad = progress * (2 - progress);
            const current = oldValue + (change * easeOutQuad);

            element.textContent = Math.round(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = newValue;
                this.showStatChange(statKey, change);
            }
        };

        requestAnimationFrame(animate);
    }

    showStatChange(statKey, change) {
        const element = document.getElementById(`${statKey}Count`);
        if (!element) return;

        // Add visual feedback
        element.classList.add(change > 0 ? 'stat-increase' : change < 0 ? 'stat-decrease' : '');
        
        setTimeout(() => {
            element.classList.remove('stat-increase', 'stat-decrease');
        }, 2000);

        // Show notification for significant changes
        if (Math.abs(change) >= 2) {
            this.showNotification(`${this.getStatLabel(statKey)} ${change > 0 ? 'increased' : 'decreased'} by ${Math.abs(change)}`);
        }
    }

    getStatLabel(statKey) {
        const labels = {
            activeProjects: 'Active Projects',
            teamOnline: 'Team Members Online',
            meetingsCount: 'Today\'s Meetings',
            tasksCompleted: 'Completed Tasks'
        };
        return labels[statKey] || statKey;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast stat-notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupEventListeners() {
        // Listen for user interactions that might affect stats
        document.addEventListener('taskCompleted', () => {
            this.stats.tasksCompleted++;
            this.animateStatUpdate('tasksCompleted', this.stats.tasksCompleted - 1, this.stats.tasksCompleted);
        });

        document.addEventListener('meetingScheduled', () => {
            this.stats.meetingsCount++;
            this.animateStatUpdate('meetingsCount', this.stats.meetingsCount - 1, this.stats.meetingsCount);
        });

        document.addEventListener('projectCreated', () => {
            this.stats.activeProjects++;
            this.animateStatUpdate('activeProjects', this.stats.activeProjects - 1, this.stats.activeProjects);
        });
    }
}

customElements.define('real-time-stats', RealTimeStats); 