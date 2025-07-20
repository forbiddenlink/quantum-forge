// Analytics Service
class AnalyticsService {
    constructor() {
        this.subscribers = [];
        this.data = {
            metrics: {
                tasksCompleted: 34,
                activeProjects: 7,
                teamOnline: 14,
                productivity: 83
            },
            taskChart: [65, 72, 68, 85, 78, 92, 88],
            projectChart: [45, 62, 78, 91, 67, 83, 95],
            activities: [
                { type: 'task', text: 'Sarah completed the homepage redesign', time: '2 hours ago' },
                { type: 'project', text: 'New project "Mobile App" created', time: '4 hours ago' },
                { type: 'meeting', text: 'Weekly team standup completed', time: '6 hours ago' },
                { type: 'update', text: 'Design system updated to v2.1', time: '1 day ago' },
                { type: 'task', text: 'Michael finished API documentation', time: '1 day ago' }
            ]
        };
    }

    subscribe(callback) {
        this.subscribers.push(callback);
        callback(this.data);
        return () => {
            const index = this.subscribers.indexOf(callback);
            if (index > -1) {
                this.subscribers.splice(index, 1);
            }
        };
    }

    generateMockData() {
        // Simulate data updates
        setInterval(() => {
            this.data.metrics.tasksCompleted = Math.floor(Math.random() * 20) + 30;
            this.data.metrics.activeProjects = Math.floor(Math.random() * 5) + 5;
            this.data.metrics.teamOnline = Math.floor(Math.random() * 6) + 10;
            this.data.metrics.productivity = Math.floor(Math.random() * 20) + 75;
            
            this.subscribers.forEach(callback => callback(this.data));
        }, 5000);
    }
}

// Export for use in components
window.analyticsService = new AnalyticsService();
console.log('Analytics service initialized'); 