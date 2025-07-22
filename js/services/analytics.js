// Enhanced Analytics Service - Real-time Performance Monitoring
class AnalyticsService {
    constructor() {
        this.subscribers = new Map();
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
                { type: 'task', text: 'Sarah completed the homepage redesign', time: '2 hours ago', impact: 'high' },
                { type: 'project', text: 'New project "Mobile App" created', time: '4 hours ago', impact: 'medium' },
                { type: 'meeting', text: 'Weekly team standup completed', time: '6 hours ago', impact: 'low' },
                { type: 'update', text: 'Design system updated to v2.1', time: '1 day ago', impact: 'high' },
                { type: 'task', text: 'Michael finished API documentation', time: '1 day ago', impact: 'medium' }
            ],
            kpiData: {
                productivity: { current: 87, target: 85, trend: '+5%', status: 'excellent' },
                efficiency: { current: 92, target: 90, trend: '+3%', status: 'excellent' },
                collaboration: { current: 78, target: 80, trend: '-2%', status: 'attention' },
                satisfaction: { current: 94, target: 85, trend: '+8%', status: 'excellent' }
            },
            teamPerformance: {
                departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
                metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
                heatmapData: [
                    [95, 88, 92, 90], // Engineering
                    [87, 94, 96, 92], // Design  
                    [90, 91, 89, 88], // Product
                    [82, 85, 84, 94], // Marketing
                    [88, 79, 82, 89]  // Sales
                ]
            },
            aiInsights: [
                {
                    type: 'opportunity',
                    title: 'Peak Performance Window',
                    description: 'Team productivity is 23% higher between 9-11 AM. Consider scheduling critical tasks during this window.',
                    confidence: 94,
                    impact: 'high',
                    category: 'productivity'
                },
                {
                    type: 'alert',
                    title: 'Collaboration Bottleneck',
                    description: 'Design team has 40% fewer cross-team interactions this week. Recommend scheduling sync meetings.',
                    confidence: 87,
                    impact: 'medium',
                    category: 'collaboration'
                },
                {
                    type: 'prediction',
                    title: 'Goal Achievement Forecast',
                    description: 'Based on current trends, Q1 targets will be exceeded by 12% if current pace continues.',
                    confidence: 91,
                    impact: 'high',
                    category: 'goals'
                }
            ],
            goals: {
                quarterly: [
                    { name: 'User Acquisition', current: 847, target: 1000, progress: 84.7, status: 'on-track' },
                    { name: 'Product Features', current: 12, target: 15, progress: 80, status: 'on-track' },
                    { name: 'Team Growth', current: 8, target: 10, progress: 80, status: 'on-track' },
                    { name: 'Customer Satisfaction', current: 4.7, target: 4.5, progress: 104.4, status: 'exceeded' }
                ]
            }
        };
        this.updateInterval = null;
        this.updateCounter = 0;
        this.maxUpdates = 20; // Stop after 20 updates (100 seconds)
        this.isRealTimeEnabled = true;
        this.lastUpdate = Date.now();
        this.updateQueue = [];
        this.performanceMetrics = {
            updateLatency: [],
            dataPoints: 0,
            errorCount: 0
        };

        // Immediately notify any subscribers with initial data
        this.notifySubscribers(this.data);
        
        // Start generating mock data immediately
        this.generateMockData();
    }

    subscribe(callback, options = {}) {
        const id = Math.random().toString(36).substr(2, 9);
        this.subscribers.set(id, { callback, options });
        
        // Initial data push
        callback(this.getFilteredData(options));
        
        return () => {
            this.subscribers.delete(id);
            console.log(`Unsubscribed analytics listener: ${id}`);
        };
    }

    getFilteredData(options) {
        if (!options.metrics) return this.data;
        
        const filteredData = { ...this.data };
        Object.keys(filteredData).forEach(key => {
            if (!options.metrics.includes(key)) {
                delete filteredData[key];
            }
        });
        return filteredData;
    }

    generateMockData() {
        // Clear any existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Simulate data updates with reduced frequency and auto-stop
        this.updateInterval = setInterval(() => {
            if (!this.isRealTimeEnabled) return;
            
            this.updateCounter++;
            const startTime = performance.now();
            
            // Only update every 2nd interval (10 seconds instead of 5)
            if (this.updateCounter % 2 === 0) {
                // Update KPIs
                Object.keys(this.data.kpiData).forEach(kpi => {
                    const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
                    this.data.kpiData[kpi].current = Math.max(0, Math.min(100, this.data.kpiData[kpi].current + change));
                    this.data.kpiData[kpi].trend = `${change >= 0 ? '+' : ''}${change}%`;
                    this.data.kpiData[kpi].status = this.getKPIStatus(this.data.kpiData[kpi].current, this.data.kpiData[kpi].target);
                });

                // Update team performance
                this.data.teamPerformance.heatmapData = this.data.teamPerformance.heatmapData.map(row =>
                    row.map(value => Math.max(60, Math.min(100, value + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0))))
                );

                // Update goals
                this.data.goals.quarterly = this.data.goals.quarterly.map(goal => {
                    const change = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
                    const newCurrent = Math.max(0, goal.current + change);
                    return {
                        ...goal,
                        current: newCurrent,
                        progress: (newCurrent / goal.target) * 100,
                        status: this.getGoalStatus(newCurrent, goal.target)
                    };
                });

                // Generate new AI insights periodically
                if (this.updateCounter % 6 === 0) {
                    this.generateNewInsight();
                }

                // Add new activity
                if (this.updateCounter % 4 === 0) {
                    this.addNewActivity();
                }

                // Notify subscribers with debouncing
                this.queueUpdate();
            }
            
            // Track performance metrics
            const endTime = performance.now();
            this.performanceMetrics.updateLatency.push(endTime - startTime);
            this.performanceMetrics.dataPoints++;
            
            // Stop updates after maxUpdates to save resources
            if (this.updateCounter >= this.maxUpdates) {
                this.stopUpdates();
                console.log('Analytics service updates stopped to save resources');
                console.log('Performance metrics:', this.getPerformanceReport());
            }
        }, 5000); // Update every 5 seconds
    }

    queueUpdate() {
        this.updateQueue.push(this.data);
        
        // Debounce updates
        clearTimeout(this.debounceTimeout);
        this.debounceTimeout = setTimeout(() => {
            if (this.updateQueue.length > 0) {
                const latestData = this.updateQueue[this.updateQueue.length - 1];
                this.notifySubscribers(latestData);
                this.updateQueue = [];
            }
        }, 100);
    }

    notifySubscribers(data) {
        this.subscribers.forEach(({ callback, options }) => {
            try {
                callback(this.getFilteredData(options));
            } catch (error) {
                console.error('Error notifying subscriber:', error);
                this.performanceMetrics.errorCount++;
            }
        });
        this.lastUpdate = Date.now();
    }

    getKPIStatus(current, target) {
        const ratio = current / target;
        if (ratio >= 1.1) return 'excellent';
        if (ratio >= 1) return 'good';
        if (ratio >= 0.9) return 'attention';
        return 'critical';
    }

    getGoalStatus(current, target) {
        const progress = (current / target) * 100;
        if (progress >= 100) return 'exceeded';
        if (progress >= 80) return 'on-track';
        if (progress >= 60) return 'at-risk';
        return 'behind';
    }

    generateNewInsight() {
        const insightTypes = ['opportunity', 'alert', 'prediction'];
        const categories = ['productivity', 'collaboration', 'goals', 'performance'];
        const impacts = ['high', 'medium', 'low'];

        const newInsight = {
            type: insightTypes[Math.floor(Math.random() * insightTypes.length)],
            title: this.generateInsightTitle(),
            description: this.generateInsightDescription(),
            confidence: Math.floor(Math.random() * 15) + 85,
            impact: impacts[Math.floor(Math.random() * impacts.length)],
            category: categories[Math.floor(Math.random() * categories.length)]
        };

        this.data.aiInsights = [newInsight, ...this.data.aiInsights.slice(0, 2)];
    }

    generateInsightTitle() {
        const titles = [
            'Cross-team Collaboration Opportunity',
            'Resource Optimization Alert',
            'Sprint Velocity Prediction',
            'Team Performance Trend',
            'Workload Distribution Insight'
        ];
        return titles[Math.floor(Math.random() * titles.length)];
    }

    generateInsightDescription() {
        const descriptions = [
            'Team velocity has increased by 15% this sprint. Consider adjusting sprint planning targets.',
            'Resource utilization shows potential for optimization in the design team workflow.',
            'Current sprint trajectory indicates 95% likelihood of meeting all commitments.',
            'Cross-team collaboration patterns suggest opportunity for knowledge sharing sessions.',
            'Project dependencies analysis reveals potential bottleneck in review process.'
        ];
        return descriptions[Math.floor(Math.random() * descriptions.length)];
    }

    addNewActivity() {
        const activities = [
            { type: 'task', text: 'Code review completed for feature X', impact: 'medium' },
            { type: 'project', text: 'Sprint planning session completed', impact: 'high' },
            { type: 'meeting', text: 'Team retrospective insights documented', impact: 'medium' },
            { type: 'update', text: 'Performance optimization implemented', impact: 'high' }
        ];

        const newActivity = {
            ...activities[Math.floor(Math.random() * activities.length)],
            time: 'just now'
        };

        // Update existing timestamps
        this.data.activities = this.data.activities.map(activity => ({
            ...activity,
            time: this.updateTimestamp(activity.time)
        }));

        // Add new activity
        this.data.activities = [newActivity, ...this.data.activities.slice(0, 4)];
    }

    updateTimestamp(time) {
        if (time === 'just now') return '1 min ago';
        if (time.includes('min')) {
            const mins = parseInt(time) + 1;
            if (mins >= 60) return '1 hour ago';
            return `${mins} min ago`;
        }
        if (time.includes('hour')) {
            const hours = parseInt(time) + 1;
            if (hours >= 24) return '1 day ago';
            return `${hours} hours ago`;
        }
        return time;
    }

    getPerformanceReport() {
        const avgLatency = this.performanceMetrics.updateLatency.reduce((a, b) => a + b, 0) / 
                          this.performanceMetrics.updateLatency.length;
        
        return {
            averageUpdateLatency: `${avgLatency.toFixed(2)}ms`,
            totalDataPoints: this.performanceMetrics.dataPoints,
            errorRate: `${((this.performanceMetrics.errorCount / this.performanceMetrics.dataPoints) * 100).toFixed(2)}%`,
            uptime: `${((Date.now() - this.lastUpdate) / 1000).toFixed(0)}s`,
            activeSubscribers: this.subscribers.size
        };
    }

    // Method to manually stop updates
    stopUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            this.isRealTimeEnabled = false;
            console.log('Analytics service updates manually stopped');
        }
    }

    // Method to restart updates if needed
    restartUpdates() {
        this.updateCounter = 0;
        this.isRealTimeEnabled = true;
        this.generateMockData();
        console.log('Analytics service updates restarted');
    }

    // Method to toggle real-time updates
    toggleRealTime() {
        this.isRealTimeEnabled = !this.isRealTimeEnabled;
        console.log(`Real-time updates ${this.isRealTimeEnabled ? 'enabled' : 'disabled'}`);
        
        if (this.isRealTimeEnabled) {
            this.restartUpdates();
        } else {
            this.stopUpdates();
        }
    }
}

// Export for use in components
window.analyticsService = new AnalyticsService();
console.log('Enhanced Analytics service initialized with real-time capabilities'); 