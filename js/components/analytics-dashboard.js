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
        this.teamHeatmapChart = null;
        this.goalChart = null;
        this.isRealTimeEnabled = true;
        
        // Enhanced analytics data
        this.kpiData = {
            productivity: { current: 87, target: 85, trend: '+5%', status: 'excellent' },
            efficiency: { current: 92, target: 90, trend: '+3%', status: 'excellent' },
            collaboration: { current: 78, target: 80, trend: '-2%', status: 'attention' },
            satisfaction: { current: 94, target: 85, trend: '+8%', status: 'excellent' }
        };

        this.goalData = {
            quarterly: [
                { name: 'User Acquisition', current: 847, target: 1000, progress: 84.7, status: 'on-track' },
                { name: 'Product Features', current: 12, target: 15, progress: 80, status: 'on-track' },
                { name: 'Team Growth', current: 8, target: 10, progress: 80, status: 'on-track' },
                { name: 'Customer Satisfaction', current: 4.7, target: 4.5, progress: 104.4, status: 'exceeded' }
            ]
        };

        this.teamPerformance = {
            departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
            metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
            heatmapData: [
                [95, 88, 92, 90], // Engineering
                [87, 94, 96, 92], // Design  
                [90, 91, 89, 88], // Product
                [82, 85, 84, 94], // Marketing
                [88, 79, 82, 89]  // Sales
            ]
        };

        this.aiInsights = [
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
        ];

        this.realtimeActivities = [
            { type: 'achievement', user: 'Sarah Chen', action: 'completed milestone "API Integration"', time: '2 min ago', priority: 'high' },
            { type: 'collaboration', user: 'Design Team', action: 'started collaborative session', time: '5 min ago', priority: 'medium' },
            { type: 'goal', user: 'Product Team', action: 'updated Q1 roadmap progress', time: '8 min ago', priority: 'medium' },
            { type: 'insight', user: 'AI Assistant', action: 'detected productivity optimization opportunity', time: '12 min ago', priority: 'high' }
        ];
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
                    <h2 class="dashboard-title">
                        <svg class="dashboard-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Advanced Analytics Hub
                    </h2>
                    <div class="dashboard-controls">
                        <div class="control-group">
                            <select class="range-selector">
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                                <option value="year">This Year</option>
                            </select>
                            <button class="toggle-btn ${this.isRealTimeEnabled ? 'active' : ''}" id="toggleRealTime">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Real-time
                            </button>
                            <button class="btn-icon" id="refreshAnalytics" aria-label="Refresh analytics">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M23 4v6h-6"></path>
                                    <path d="M1 20v-6h6"></path>
                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Advanced KPI Dashboard -->
                <div class="kpi-dashboard">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        Key Performance Indicators
                    </h3>
                    <div class="kpi-grid">
                        ${Object.entries(this.kpiData).map(([key, kpi]) => `
                            <div class="advanced-kpi-card ${kpi.status}" data-kpi="${key}">
                                <div class="kpi-header">
                                    <h4 class="kpi-name">${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                    <span class="kpi-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}">${kpi.trend}</span>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-value">${kpi.current}%</div>
                                    <div class="kpi-target">Target: ${kpi.target}%</div>
                                    <div class="kpi-progress">
                                        <div class="progress-track">
                                            <div class="progress-fill" style="width: ${(kpi.current / kpi.target) * 100}%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kpi-status-indicator ${kpi.status}"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Goal Tracking Dashboard -->
                <div class="goals-dashboard">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Q1 2024 Goals & OKRs
                    </h3>
                    <div class="goals-grid">
                        ${this.goalData.quarterly.map(goal => `
                            <div class="goal-card ${goal.status}" data-goal="${goal.name}">
                                <div class="goal-header">
                                    <h4 class="goal-name">${goal.name}</h4>
                                    <span class="goal-status ${goal.status}">${goal.status.replace('-', ' ')}</span>
                                </div>
                                <div class="goal-metrics">
                                    <div class="goal-current">${goal.current}${typeof goal.current === 'number' && goal.current < 100 ? '' : ''}</div>
                                    <div class="goal-target">of ${goal.target} target</div>
                                </div>
                                <div class="goal-progress">
                                    <div class="progress-container">
                                        <div class="progress-track">
                                            <div class="progress-fill" style="width: ${Math.min(goal.progress, 100)}%"></div>
                                        </div>
                                        <span class="progress-percentage">${goal.progress.toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Team Performance Heat Map -->
                <div class="heatmap-section">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Team Performance Heat Map
                    </h3>
                    <div class="heatmap-container">
                        <div class="heatmap-grid">
                            <div class="heatmap-header">
                                <div class="corner-cell"></div>
                                ${this.teamPerformance.metrics.map(metric => `
                                    <div class="metric-header">${metric}</div>
                                `).join('')}
                            </div>
                            ${this.teamPerformance.departments.map((dept, deptIndex) => `
                                <div class="heatmap-row">
                                    <div class="dept-header">${dept}</div>
                                    ${this.teamPerformance.heatmapData[deptIndex].map((value, metricIndex) => `
                                        <div class="heatmap-cell" data-value="${value}" data-dept="${dept}" data-metric="${this.teamPerformance.metrics[metricIndex]}" style="background-color: ${this.getHeatmapColor(value)}">
                                            <span class="cell-value">${value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')}
                        </div>
                        <div class="heatmap-legend">
                            <span class="legend-label">Performance Score:</span>
                            <div class="legend-gradient">
                                <span class="legend-min">60</span>
                                <div class="gradient-bar"></div>
                                <span class="legend-max">100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI-Powered Insights -->
                <div class="ai-insights-section">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        AI-Powered Insights
                        <span class="ai-badge">BETA</span>
                    </h3>
                    <div class="insights-grid">
                        ${this.aiInsights.map(insight => `
                            <div class="ai-insight-card ${insight.type}" data-confidence="${insight.confidence}">
                                <div class="insight-header">
                                    <div class="insight-type-icon ${insight.type}">
                                        ${this.getInsightIcon(insight.type)}
                                    </div>
                                    <div class="insight-meta">
                                        <h4 class="insight-title">${insight.title}</h4>
                                        <div class="insight-confidence">
                                            <span class="confidence-label">Confidence:</span>
                                            <div class="confidence-bar">
                                                <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                                            </div>
                                            <span class="confidence-value">${insight.confidence}%</span>
                                        </div>
                                    </div>
                                    <span class="impact-badge ${insight.impact}">${insight.impact} impact</span>
                                </div>
                                <p class="insight-description">${insight.description}</p>
                                <div class="insight-actions">
                                    <button class="action-btn primary">Apply Suggestion</button>
                                    <button class="action-btn secondary">Learn More</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Enhanced Charts Section -->
                <div class="charts-section">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Performance Trends
                    </h3>
                    <div class="enhanced-charts-grid">
                        <div class="chart-container enhanced">
                            <div class="chart-header">
                                <div class="chart-info">
                                    <h3 class="chart-title">Task Completion Trends</h3>
                                    <p class="chart-subtitle">Daily productivity metrics and patterns</p>
                                </div>
                                <div class="chart-controls">
                                    <button class="chart-filter active" data-filter="all">All</button>
                                    <button class="chart-filter" data-filter="completed">Completed</button>
                                    <button class="chart-filter" data-filter="progress">In Progress</button>
                                </div>
                            </div>
                            <div class="chart-body" id="taskChart">
                                <canvas id="taskChartCanvas"></canvas>
                            </div>
                        </div>
                        <div class="chart-container enhanced">
                            <div class="chart-header">
                                <div class="chart-info">
                                    <h3 class="chart-title">Project Distribution</h3>
                                    <p class="chart-subtitle">Current project status breakdown</p>
                                </div>
                            </div>
                            <div class="chart-body" id="projectChart">
                                <canvas id="projectChartCanvas"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Real-time Activity Feed -->
                <div class="activity-section">
                    <h3 class="section-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                            <path d="m21 12-6-3-6 3-6-3"></path>
                        </svg>
                        Live Activity Feed
                        <div class="activity-status ${this.isRealTimeEnabled ? 'live' : 'paused'}">
                            <span class="status-dot"></span>
                            ${this.isRealTimeEnabled ? 'LIVE' : 'PAUSED'}
                        </div>
                    </h3>
                    <div class="activity-controls">
                        <div class="activity-filters">
                            <button class="filter-btn active" data-filter="all">All Activity</button>
                            <button class="filter-btn" data-filter="achievement">Achievements</button>
                            <button class="filter-btn" data-filter="collaboration">Collaboration</button>
                            <button class="filter-btn" data-filter="goal">Goals</button>
                            <button class="filter-btn" data-filter="insight">Insights</button>
                        </div>
                        <div class="activity-actions">
                            <button class="btn-icon" id="pauseActivity" title="Pause real-time updates">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="6" y="4" width="4" height="16"></rect>
                                    <rect x="14" y="4" width="4" height="16"></rect>
                                </svg>
                            </button>
                            <button class="btn-icon" id="clearActivity" title="Clear activity feed">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="activity-feed" id="activityFeed">
                        ${this.realtimeActivities.map(activity => `
                            <div class="activity-item ${activity.type} ${activity.priority}" data-type="${activity.type}">
                                <div class="activity-icon ${activity.type}">
                                    ${this.getActivityIcon(activity.type)}
                                </div>
                                <div class="activity-content">
                                    <div class="activity-main">
                                        <span class="activity-user">${activity.user}</span>
                                        <span class="activity-action">${activity.action}</span>
                                    </div>
                                    <div class="activity-meta">
                                        <span class="activity-time">${activity.time}</span>
                                        <span class="activity-priority ${activity.priority}">${activity.priority} priority</span>
                                    </div>
                                </div>
                                <div class="activity-actions">
                                    <button class="activity-btn" title="View details">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M9 18l6-6-6-6"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        console.log('Analytics Dashboard rendered, element:', this);
        console.log('Analytics Dashboard innerHTML length:', this.innerHTML.length);
    }

    getHeatmapColor(value) {
        // Create a color gradient from red (60) to green (100)
        const normalizedValue = Math.max(0, Math.min(100, value));
        const intensity = (normalizedValue - 60) / 40; // Normalize to 0-1 range
        
        if (intensity < 0.5) {
            // Red to yellow
            const red = 255;
            const green = Math.round(255 * intensity * 2);
            return `rgb(${red}, ${green}, 0)`;
        } else {
            // Yellow to green
            const red = Math.round(255 * (1 - (intensity - 0.5) * 2));
            const green = 255;
            return `rgb(${red}, ${green}, 0)`;
        }
    }

    getInsightIcon(type) {
        const icons = {
            opportunity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>`,
            alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="m12 17.02.01 0"></path>
            </svg>`,
            prediction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
            </svg>`
        };
        return icons[type] || icons.opportunity;
    }

    getActivityIcon(type) {
        const icons = {
            achievement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16l-1-7H5l-1 7z"></path>
                <path d="M8 9h8"></path>
                <path d="M12 2v7"></path>
            </svg>`,
            collaboration: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            goal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>`,
            insight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`
        };
        return icons[type] || icons.insight;
    }

    setupEventListeners() {
        const rangeSelector = this.querySelector('.range-selector');
        const refreshBtn = this.querySelector('#refreshAnalytics');
        const viewAllBtn = this.querySelector('#viewAllActivity');
        const metricCards = this.querySelectorAll('.metric-card');
        const insightCards = this.querySelectorAll('.insight-card');

        if (rangeSelector) {
            rangeSelector.addEventListener('change', (e) => {
                this.selectedRange = e.target.value;
                this.updateDashboard();
                this.announceUpdate(`Analytics updated for ${e.target.value}`);
            });

            // Enhanced accessibility
            rangeSelector.setAttribute('aria-label', 'Select time range for analytics data');
        }

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
            
            // Enhanced accessibility
            refreshBtn.setAttribute('aria-label', 'Refresh analytics data');
            refreshBtn.setAttribute('title', 'Refresh analytics data');
        }

        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => {
                this.showAllActivity();
            });
            
            // Enhanced accessibility
            viewAllBtn.setAttribute('aria-label', 'View all activity details');
        }

        // Add hover effects and accessibility for metric cards
        metricCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View details for metric ${index + 1}`);
            
            card.addEventListener('click', () => {
                this.highlightMetric(card);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.highlightMetric(card);
                }
            });
            
            card.addEventListener('mouseenter', () => {
                this.animateMetricCard(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateMetricCard(card, false);
            });
        });

        // Add interactions for insight cards
        insightCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `View insight details ${index + 1}`);
            
            card.addEventListener('click', () => {
                this.expandInsight(card);
            });
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.expandInsight(card);
                }
            });
        });

        // Add keyboard navigation
        this.addEventListener('keydown', (e) => {
            if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
                e.preventDefault();
                this.refreshData();
            }
        });
    }

    initializeCharts() {
        // Initialize Task Completion Chart
        const taskCanvas = this.querySelector('#taskChartCanvas');
        if (!taskCanvas) {
            console.error('Task chart canvas not found');
            return;
        }
        const taskCtx = taskCanvas.getContext('2d');
        this.taskChart = new Chart(taskCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Completed Tasks',
                        data: [12, 19, 15, 17, 14, 12, 16],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        tension: 0.4,
                        fill: false,
                        borderWidth: 3,
                        pointBackgroundColor: '#6366f1',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'In Progress',
                        data: [7, 11, 8, 9, 6, 5, 8],
                        borderColor: '#eab308',
                        backgroundColor: 'rgba(234, 179, 8, 0.1)',
                        tension: 0.4,
                        fill: false,
                        borderWidth: 3,
                        pointBackgroundColor: '#eab308',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
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
                        backgroundColor: '#ffffff',
                        titleColor: '#0f172a',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        cornerRadius: 8,
                        titleFont: {
                            family: "'Inter', sans-serif",
                            weight: '600'
                        },
                        bodyFont: {
                            family: "'Inter', sans-serif"
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e2e8f0',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#475569',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: '#475569',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: '500'
                            }
                        }
                    }
                }
            }
        });

        // Initialize Project Progress Chart
        const projectCanvas = this.querySelector('#projectChartCanvas');
        if (!projectCanvas) {
            console.error('Project chart canvas not found');
            return;
        }
        const projectCtx = projectCanvas.getContext('2d');
        this.projectChart = new Chart(projectCtx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: [65, 25, 10],
                    backgroundColor: [
                        '#6366f1',
                        '#eab308',
                        '#e2e8f0'
                    ],
                    borderColor: [
                        '#4f46e5',
                        '#ca8a04',
                        '#cbd5e1'
                    ],
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    hoverOffset: 8
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
                            color: '#475569',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#ffffff',
                        titleColor: '#0f172a',
                        bodyColor: '#475569',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        cornerRadius: 8,
                        titleFont: {
                            family: "'Inter', sans-serif",
                            weight: '600'
                        },
                        bodyFont: {
                            family: "'Inter', sans-serif"
                        }
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
        const refreshBtn = this.querySelector('#refreshAnalytics');
        refreshBtn.style.transform = 'rotate(360deg)';
        refreshBtn.setAttribute('aria-label', 'Refreshing analytics data...');
        
        setTimeout(() => {
            refreshBtn.style.transform = 'rotate(0deg)';
            refreshBtn.setAttribute('aria-label', 'Refresh analytics data');
            this.announceUpdate('Analytics data refreshed');
        }, 1000);

        // Update with new data
        this.updateDashboard();
    }

    showAllActivity() {
        // Navigate to full activity page or show modal
        window.location.href = '/pages/activity.html';
    }

    // Enhanced interaction methods
    announceUpdate(message) {
        // Create or update screen reader announcement
        let announcer = document.getElementById('analytics-announcer');
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'analytics-announcer';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.position = 'absolute';
            announcer.style.left = '-10000px';
            announcer.style.width = '1px';
            announcer.style.height = '1px';
            announcer.style.overflow = 'hidden';
            document.body.appendChild(announcer);
        }
        announcer.textContent = message;
    }

    highlightMetric(card) {
        // Remove previous highlights
        this.querySelectorAll('.metric-card').forEach(c => c.classList.remove('highlighted'));
        
        // Add highlight to selected card
        card.classList.add('highlighted');
        
        // Animate the card
        card.style.transform = 'translateY(-4px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);

        // Announce the metric
        const label = card.querySelector('.metric-label').textContent;
        const value = card.querySelector('.metric-value span:first-child').textContent;
        this.announceUpdate(`${label}: ${value}`);
    }

    animateMetricCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = 'var(--shadow-lg)';
            card.style.borderColor = 'var(--primary-200)';
        } else if (!card.classList.contains('highlighted')) {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        }
    }

    expandInsight(card) {
        // Toggle expanded state
        const isExpanded = card.classList.contains('expanded');
        
        // Remove expanded from all cards
        this.querySelectorAll('.insight-card').forEach(c => c.classList.remove('expanded'));
        
        if (!isExpanded) {
            card.classList.add('expanded');
            
            // Add expanded content if not exists
            if (!card.querySelector('.insight-expanded')) {
                const expandedContent = document.createElement('div');
                expandedContent.className = 'insight-expanded';
                expandedContent.innerHTML = `
                    <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-color);">
                        <button class="btn secondary small" style="font-size: var(--font-size-xs);">
                            Learn More
                        </button>
                    </div>
                `;
                card.appendChild(expandedContent);
            }
            
            // Announce expansion
            const title = card.querySelector('h4').textContent;
            this.announceUpdate(`Expanded insight: ${title}`);
        }
    }
}

// Register the custom element
customElements.define('analytics-dashboard', AnalyticsDashboard); 