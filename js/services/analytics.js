// Analytics Service - Performance Optimized
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
        this.updateInterval = null;
        this.updateCounter = 0;
        this.maxUpdates = 20; // Stop after 20 updates (100 seconds)
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
        // Clear any existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Simulate data updates with reduced frequency and auto-stop
        this.updateInterval = setInterval(() => {
            this.updateCounter++;
            
            // Only update every 2nd interval (10 seconds instead of 5)
            if (this.updateCounter % 2 === 0) {
                this.data.metrics.tasksCompleted = Math.floor(Math.random() * 10) + 30; // Reduced range
                this.data.metrics.activeProjects = Math.floor(Math.random() * 3) + 5; // Reduced range
                this.data.metrics.teamOnline = Math.floor(Math.random() * 4) + 10; // Reduced range
                this.data.metrics.productivity = Math.floor(Math.random() * 10) + 75; // Reduced range
                
                this.subscribers.forEach(callback => callback(this.data));
            }
            
            // Stop updates after maxUpdates to save resources
            if (this.updateCounter >= this.maxUpdates) {
                clearInterval(this.updateInterval);
                console.log('Analytics service updates stopped to save resources');
            }
        }, 10000); // Increased from 5000ms to 10000ms
    }

    // Method to manually stop updates
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            console.log('Analytics service updates manually stopped');
        }
    }

    // Method to restart updates if needed
    restartUpdates() {
        this.updateCounter = 0;
        this.generateMockData();
    }
}

// Export for use in components
window.analyticsService = new AnalyticsService();
console.log('Analytics service initialized with performance optimizations'); 