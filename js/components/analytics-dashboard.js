// Enhanced Analytics Dashboard Component

class AnalyticsDashboard extends HTMLElement {
    constructor() {
        super();
        this.data = null;
        this.selectedRange = 'week';
        this.unsubscribe = null;
        this.realTimeUpdates = null;
        this.taskChart = null;
        this.projectChart = null;
    }

    connectedCallback() {
        console.log('Analytics Dashboard connected');
        this.render();
        this.setupEventListeners();
        this.initializeCharts();
        
        // Subscribe to analytics updates
        if (window.analyticsService) {
            console.log('Analytics service found, subscribing...');
            this.unsubscribe = window.analyticsService.subscribe(data => {
                console.log('Analytics Dashboard received data:', data);
                this.data = data;
                this.updateDashboard();
            });

            // Generate mock data for testing
            window.analyticsService.generateMockData();
        } else {
            console.error('Analytics service not found!');
        }

        // Start real-time updates
        this.startRealTimeUpdates();
    }

    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
        }
        if (this.taskChart) {
            this.taskChart.destroy();
        }
        if (this.projectChart) {
            this.projectChart.destroy();
        }
    }

    render() {
        console.log('Analytics Dashboard rendering with data:', this.data);
        this.innerHTML = `
            <div class="analytics-dashboard">
                <div class="dashboard-header">
                    <h2 class="dashboard-title">Analytics Overview</h2>
                    <div class="dashboard-controls">
                        <select class="range-selector">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="quarter">This Quarter</option>
                        </select>
                        <button class="btn-icon small" id="refreshAnalytics" aria-label="Refresh analytics">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-value">
                            <span id="tasksCompleted">-</span>
                            <span class="metric-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                +12%
                            </span>
                        </div>
                        <div class="metric-label">Tasks Completed</div>
                        <div class="metric-insight">Ahead of weekly goal</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">
                            <span id="activeProjects">-</span>
                            <span class="metric-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                +8%
                            </span>
                        </div>
                        <div class="metric-label">Active Projects</div>
                        <div class="metric-insight">3 projects on track</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">
                            <span id="teamOnline">-</span>
                            <span class="metric-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                +2
                            </span>
                        </div>
                        <div class="metric-label">Team Members Online</div>
                        <div class="metric-insight">High collaboration time</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-value">
                            <span id="productivity">-</span>
                            <span class="metric-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                +15%
                            </span>
                        </div>
                        <div class="metric-label">Productivity Score</div>
                        <div class="metric-insight">Peak performance period</div>
                    </div>
                </div>

                <div class="charts-grid">
                    <div class="chart-container">
                        <div class="chart-header">
                            <div>
                                <h3 class="chart-title">Task Completion Trend</h3>
                                <p class="chart-subtitle">Daily task completion over the selected period</p>
                            </div>
                            <div class="chart-legend">
                                <span class="legend-item">
                                    <span class="legend-color completed"></span>
                                    Completed
                                </span>
                                <span class="legend-item">
                                    <span class="legend-color in-progress"></span>
                                    In Progress
                                </span>
                            </div>
                        </div>
                        <div class="chart" id="taskChart">
                            <div class="chart-line"></div>
                        </div>
                    </div>
                    <div class="chart-container">
                        <div class="chart-header">
                            <div>
                                <h3 class="chart-title">Project Progress</h3>
                                <p class="chart-subtitle">Overall project completion status</p>
                            </div>
                        </div>
                        <div class="chart" id="projectChart">
                            <div class="chart-line"></div>
                        </div>
                    </div>
                </div>

                <div class="insights-section">
                    <h3 class="insights-title">Real-time Insights</h3>
                    <div class="insights-grid">
                        <div class="insight-card positive">
                            <div class="insight-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div class="insight-content">
                                <h4>Productivity Peak</h4>
                                <p>Your team is 23% more productive during morning hours. Consider scheduling important tasks before 2 PM.</p>
                            </div>
                        </div>
                        <div class="insight-card warning">
                            <div class="insight-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <div class="insight-content">
                                <h4>Meeting Overload</h4>
                                <p>You have 4 meetings scheduled today. Consider blocking 2-hour focus time for deep work.</p>
                            </div>
                        </div>
                        <div class="insight-card info">
                            <div class="insight-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                                </svg>
                            </div>
                            <div class="insight-content">
                                <h4>Team Collaboration</h4>
                                <p>8 team members are online. Great time for collaborative work and knowledge sharing.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="activity-list">
                    <div class="activity-header">
                        <h3 class="activity-title">Recent Activity</h3>
                        <button class="btn secondary small" id="viewAllActivity">View All</button>
                    </div>
                    <div id="activityList"></div>
                </div>
            </div>
        `;
        console.log('Analytics Dashboard rendered, element:', this);
        console.log('Analytics Dashboard innerHTML length:', this.innerHTML.length);
    }

    setupEventListeners() {
        const rangeSelector = this.querySelector('.range-selector');
        const refreshBtn = this.querySelector('#refreshAnalytics');
        const viewAllBtn = this.querySelector('#viewAllActivity');

        if (rangeSelector) {
            rangeSelector.addEventListener('change', (e) => {
                this.selectedRange = e.target.value;
                this.updateDashboard();
            });
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                this.showAllActivity();
            });
        }
    }

    initializeCharts() {
        // Initialize Task Completion Chart
        const taskCtx = this.querySelector('#taskChart').getContext('2d');
        this.taskChart = new Chart(taskCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Completed Tasks',
                        data: [12, 19, 15, 17, 14, 12, 16],
                        borderColor: 'rgb(99, 102, 241)',
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'In Progress',
                        data: [7, 11, 8, 9, 6, 5, 8],
                        borderColor: 'rgb(249, 115, 22)',
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1e293b',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(226, 232, 240, 0.5)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });

        // Initialize Project Progress Chart
        const projectCtx = this.querySelector('#projectChart').getContext('2d');
        this.projectChart = new Chart(projectCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        'rgb(99, 102, 241)',
                        'rgb(249, 115, 22)',
                        'rgb(226, 232, 240)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 20,
                            font: {
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#1e293b',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1
                    }
                },
                cutout: '75%'
            }
        });
    }

    startRealTimeUpdates() {
        this.realTimeUpdates = setInterval(() => {
            this.updateRealTimeMetrics();
        }, 30000); // Update every 30 seconds
    }

    updateRealTimeMetrics() {
        // Simulate real-time updates
        const teamOnline = Math.floor(Math.random() * 5) + 6; // 6-10 team members
        const productivity = Math.floor(Math.random() * 20) + 80; // 80-100 productivity score

        this.querySelector('#teamOnline').textContent = teamOnline;
        this.querySelector('#productivity').textContent = productivity;

        // Update insights based on real-time data
        this.updateInsights();
    }

    updateInsights() {
        const insights = this.querySelectorAll('.insight-card');
        insights.forEach(insight => {
            // Add subtle animation to show real-time updates
            insight.style.transform = 'scale(1.02)';
            setTimeout(() => {
                insight.style.transform = 'scale(1)';
            }, 200);
        });
    }

    updateDashboard() {
        console.log('Analytics Dashboard updating with data:', this.data);
        if (!this.data) {
            console.log('No data available for update');
            return;
        }

        this.updateMetrics();
        this.updateTaskChart();
        this.updateProjectChart();
        this.updateActivityList();
        this.updateInsights();
    }

    updateMetrics() {
        console.log('Updating metrics with data:', this.data.metrics);
        const metrics = this.data.metrics || {};
        
        const tasksCompletedEl = this.querySelector('#tasksCompleted');
        const activeProjectsEl = this.querySelector('#activeProjects');
        const teamOnlineEl = this.querySelector('#teamOnline');
        const productivityEl = this.querySelector('#productivity');
        
        if (tasksCompletedEl) tasksCompletedEl.textContent = metrics.tasksCompleted || '0';
        if (activeProjectsEl) activeProjectsEl.textContent = metrics.activeProjects || '0';
        if (teamOnlineEl) teamOnlineEl.textContent = metrics.teamOnline || '0';
        if (productivityEl) productivityEl.textContent = metrics.productivity || '0';
        
        console.log('Metrics updated:', {
            tasksCompleted: metrics.tasksCompleted || '0',
            activeProjects: metrics.activeProjects || '0',
            teamOnline: metrics.teamOnline || '0',
            productivity: metrics.productivity || '0'
        });
    }

    updateTaskChart() {
        if (!this.taskChart) return;
        
        const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const completed = labels.map(() => Math.floor(Math.random() * 10) + 10);
        const inProgress = labels.map(() => Math.floor(Math.random() * 8) + 5);

        this.taskChart.data.datasets[0].data = completed;
        this.taskChart.data.datasets[1].data = inProgress;
        this.taskChart.update();
    }

    updateProjectChart() {
        if (!this.projectChart) return;
        
        const completed = Math.floor(Math.random() * 30) + 50;
        const inProgress = Math.floor(Math.random() * 20) + 20;
        const notStarted = 100 - completed - inProgress;

        this.projectChart.data.datasets[0].data = [completed, inProgress, notStarted];
        this.projectChart.update();
    }

    updateActivityList() {
        const activityList = this.querySelector('#activityList');
        const activities = this.data.activities || [
            { type: 'task', text: 'Completed homepage redesign', time: '2 hours ago', user: 'Alex Chen' },
            { type: 'project', text: 'Project Alpha milestone reached', time: '4 hours ago', user: 'Sarah Johnson' },
            { type: 'meeting', text: 'Team standup completed', time: '6 hours ago', user: 'David Kim' },
            { type: 'update', text: 'Updated API documentation', time: '8 hours ago', user: 'Emma Wilson' }
        ];

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon ${activity.type}">
                    ${this.getActivityIcon(activity.type)}
                </div>
                <div class="activity-content">
                    <div class="activity-text">${activity.text}</div>
                    <div class="activity-meta">
                        <span class="activity-time">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            ${activity.time}
                        </span>
                        <span class="activity-user">by ${activity.user}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getActivityIcon(type) {
        const icons = {
            task: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>`,
            project: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>`,
            meeting: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>`,
            update: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>`
        };
        return icons[type] || icons.update;
    }

    refreshData() {
        // Simulate data refresh
        this.querySelector('#refreshAnalytics').style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.querySelector('#refreshAnalytics').style.transform = 'rotate(0deg)';
        }, 1000);

        // Update with new data
        this.updateDashboard();
    }

    showAllActivity() {
        // Navigate to full activity page or show modal
        window.location.href = '/pages/activity.html';
    }
}

// Register the custom element
customElements.define('analytics-dashboard', AnalyticsDashboard); 