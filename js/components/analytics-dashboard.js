// Enhanced Analytics Dashboard Component - Dream Intranet Homepage
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
        this.isInitialized = false;
        this.particles = [];
        this.animationFrame = null;
        this.pulseAnimation = null;
        this.updateInterval = null;
        this.chartInstances = new Map();
        this.activeInsightIndex = 0;
        this.insightRotationInterval = null;
        
        // Enhanced analytics options
        this.options = {
            theme: 'light',
            animations: true,
            realTimeUpdates: true,
            chartRefreshRate: 5000,
            insightRotationInterval: 8000,
            particleCount: 15
        };

        // Initialize immediately if possible
        if (window.analyticsService) {
            this.data = window.analyticsService.data;
        }
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        console.log('Analytics Dashboard connecting...');
        
        this.render();
        this.setupEventListeners();
        this.initializeCharts();
        this.initializeParticles();
        this.initializeAnimations();
        this.startRealTimeUpdates();
        this.startInsightRotation();
        
        // Subscribe to analytics updates
        if (window.analyticsService) {
            console.log('Analytics service found, subscribing...');
            this.unsubscribe = window.analyticsService.subscribe(data => {
                console.log('Analytics Dashboard received data:', data);
                this.data = data;
                this.updateDashboard();
            }, {
                metrics: ['kpiData', 'teamPerformance', 'aiInsights', 'goals', 'activities']
            });
        } else {
            console.error('Analytics service not found!');
        }

        // Add entrance animation
        setTimeout(() => {
            this.classList.add('dashboard-loaded');
            console.log('Analytics Dashboard loaded and animated');
        }, 100);
        
        this.isInitialized = true;
        console.log('Analytics Dashboard initialized');
    }

    setupEventListeners() {
        console.log('Setting up Analytics Dashboard event listeners...');
        
        // Range selector
        const rangeSelector = this.querySelector('.range-selector');
        if (rangeSelector) {
            rangeSelector.addEventListener('change', (e) => {
                this.selectedRange = e.target.value;
                this.refreshData();
            });
        }

        // Real-time toggle
        const toggleRealTime = this.querySelector('#toggleRealTime');
        if (toggleRealTime) {
            toggleRealTime.addEventListener('click', () => {
                this.isRealTimeEnabled = !this.isRealTimeEnabled;
                toggleRealTime.classList.toggle('active', this.isRealTimeEnabled);
                if (this.isRealTimeEnabled) {
                    this.startRealTimeUpdates();
                } else {
                    if (this.realTimeUpdates) {
                        clearInterval(this.realTimeUpdates);
                    }
                }
            });
        }

        // Refresh button
        const refreshBtn = this.querySelector('#refreshAnalytics');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // KPI card interactions
        this.querySelectorAll('.kpi-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateKPICard(card, true));
            card.addEventListener('mouseleave', () => this.animateKPICard(card, false));
            card.addEventListener('click', () => this.highlightMetric(card));
        });

        // Goal card interactions
        this.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateGoalCard(card, true));
            card.addEventListener('mouseleave', () => this.animateGoalCard(card, false));
        });

        // AI Insight card interactions
        this.querySelectorAll('.ai-insight-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateInsightCard(card, true));
            card.addEventListener('mouseleave', () => this.animateInsightCard(card, false));
            card.addEventListener('click', () => this.expandInsight(card));
        });

        // Chart container interactions
        this.querySelectorAll('.chart-container').forEach(container => {
            container.addEventListener('mouseenter', () => this.animateChartContainer(container, true));
            container.addEventListener('mouseleave', () => this.animateChartContainer(container, false));
        });

        // Activity item interactions
        this.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('mouseenter', () => this.animateActivityItem(item, true));
            item.addEventListener('mouseleave', () => this.animateActivityItem(item, false));
        });

        // Chart filters
        this.querySelectorAll('.chart-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                const filterType = e.target.dataset.filter;
                this.querySelectorAll('.chart-filter').forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
                this.updateCharts(filterType);
            });
        });

        // Activity filters
        this.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.dataset.filter;
                this.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const activityItems = this.querySelectorAll('.activity-item');
                activityItems.forEach(item => {
                    if (filterType === 'all' || item.dataset.type === filterType) {
                        item.style.display = '';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });

        console.log('Analytics Dashboard event listeners setup complete');
    }

    disconnectedCallback() {
        console.log('Analytics Dashboard disconnecting...');
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
        }
        if (this.insightRotationInterval) {
            clearInterval(this.insightRotationInterval);
        }
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.chartInstances.forEach(chart => chart.destroy());
        this.chartInstances.clear();
        console.log('Analytics Dashboard cleanup complete');
    }

    initializeParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'analytics-particles';
        this.appendChild(particlesContainer);
        
        // Create floating particles
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'analytics-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2));
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsFloat ${Math.random() * 20 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation CSS
        if (!document.querySelector('#analytics-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'analytics-particle-styles';
            style.textContent = `
                @keyframes analyticsFloat {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
                    50% { transform: translateY(-40px) translateX(-5px); opacity: 0.5; }
                    75% { transform: translateY(-20px) translateX(-10px); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeAnimations() {
        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-fill, .bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, 200);
                    });
                }
            });
        });

        const animateElements = this.querySelectorAll('.kpi-card, .goal-card, .ai-insight-card, .chart-container');
        animateElements.forEach(el => observer.observe(el));
    }

    startRealTimeUpdates() {
        if (!this.isRealTimeEnabled) return;
        
        this.realTimeUpdates = setInterval(() => {
            this.updateRandomMetrics();
        }, this.options.chartRefreshRate);
    }

    startInsightRotation() {
        if (this.insightRotationInterval) {
            clearInterval(this.insightRotationInterval);
        }

        this.insightRotationInterval = setInterval(() => {
            this.rotateInsights();
        }, this.options.insightRotationInterval);
    }

    rotateInsights() {
        const insights = this.querySelectorAll('.ai-insight-card');
        if (!insights.length) return;

        insights[this.activeInsightIndex].classList.remove('active');
        this.activeInsightIndex = (this.activeInsightIndex + 1) % insights.length;
        insights[this.activeInsightIndex].classList.add('active');
    }

    updateRandomMetrics() {
        if (!this.data) return;
        
        // Randomly update some KPIs
        Object.keys(this.data.kpiData).forEach(kpi => {
            if (Math.random() > 0.7) {
                const change = Math.random() > 0.5 ? 1 : -1;
                this.data.kpiData[kpi].current = Math.max(0, Math.min(100, this.data.kpiData[kpi].current + change));
                this.data.kpiData[kpi].trend = `${change >= 0 ? '+' : ''}${change}%`;
                
                // Animate the change
                const kpiCard = this.querySelector(`[data-kpi="${kpi}"]`);
                if (kpiCard) {
                    kpiCard.classList.add('pulse');
                    setTimeout(() => kpiCard.classList.remove('pulse'), 1000);
                }
            }
        });
        
        this.updateDashboard();
    }

    render() {
        console.log('Analytics Dashboard rendering with data:', this.data);
        
        // Initialize with default data if none is available
        if (!this.data) {
            this.data = {
                kpiData: {
                    productivity: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    efficiency: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    collaboration: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    satisfaction: { current: 0, target: 100, trend: '0%', status: 'attention' }
                },
                teamPerformance: {
                    departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
                    metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
                    heatmapData: Array(5).fill(Array(4).fill(60))
                },
                aiInsights: [
                    {
                        type: 'opportunity',
                        title: 'Loading Insights...',
                        description: 'Real-time analytics data is being processed.',
                        confidence: 100,
                        impact: 'medium',
                        category: 'system'
                    }
                ],
                goals: {
                    quarterly: [
                        { name: 'Loading...', current: 0, target: 100, progress: 0, status: 'on-track' }
                    ]
                },
                taskChart: [0, 0, 0, 0, 0, 0, 0],
                projectChart: [0, 0, 0],
                activities: [
                    { type: 'system', text: 'Loading activities...', time: 'just now', impact: 'low' }
                ]
            };
        }

        // Ensure all required data structures exist
        this.data.kpiData = this.data.kpiData || {
            productivity: { current: 0, target: 100, trend: '0%', status: 'attention' },
            efficiency: { current: 0, target: 100, trend: '0%', status: 'attention' },
            collaboration: { current: 0, target: 100, trend: '0%', status: 'attention' },
            satisfaction: { current: 0, target: 100, trend: '0%', status: 'attention' }
        };

        this.data.teamPerformance = this.data.teamPerformance || {
            departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
            metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
            heatmapData: Array(5).fill(Array(4).fill(60))
        };

        this.data.goals = this.data.goals || {
            quarterly: [
                { name: 'Loading...', current: 0, target: 100, progress: 0, status: 'on-track' }
            ]
        };

        this.data.aiInsights = this.data.aiInsights || [
            {
                type: 'opportunity',
                title: 'Loading Insights...',
                description: 'Real-time analytics data is being processed.',
                confidence: 100,
                impact: 'medium',
                category: 'system'
            }
        ];

        this.data.activities = this.data.activities || [
            { type: 'system', text: 'Loading activities...', time: 'just now', impact: 'low' }
        ];

        this.data.taskChart = this.data.taskChart || [0, 0, 0, 0, 0, 0, 0];
        this.data.projectChart = this.data.projectChart || [0, 0, 0];
        
        this.innerHTML = `
            <div class="analytics-dashboard">
                <div class="dashboard-header">
                    <h2 class="dashboard-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Real-time
                            </button>
                            <button class="refresh-btn" id="refreshAnalytics" aria-label="Refresh analytics">
                                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        Key Performance Indicators
                    </h3>
                    <div class="kpi-grid">
                        ${Object.entries(this.data.kpiData).map(([key, kpi]) => `
                            <div class="advanced-kpi-card ${kpi.status}" data-kpi="${key}">
                                <div class="kpi-header">
                                    <h4 class="kpi-name">${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                    <span class="kpi-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}">
                                        <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                                        </svg>
                                        ${kpi.trend}
                                    </span>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-value-wrapper">
                                        <div class="kpi-value">${kpi.current}<span class="kpi-unit">%</span></div>
                                        <div class="kpi-target">Target: ${kpi.target}%</div>
                                    </div>
                                    <div class="kpi-progress">
                                        <div class="progress-track">
                                            <div class="progress-fill ${kpi.status}" style="width: ${(kpi.current / kpi.target) * 100}%">
                                                <div class="progress-glow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kpi-footer">
                                    <span class="status-badge ${kpi.status}">
                                        ${kpi.status.charAt(0).toUpperCase() + kpi.status.slice(1)}
                                        <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${this.getStatusIcon(kpi.status)}
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Goal Tracking Dashboard -->
                <div class="goals-dashboard">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Q1 2024 Goals & OKRs
                    </h3>
                    <div class="goals-grid">
                        ${this.data.goals.quarterly.map(goal => {
                            const circumference = 2 * Math.PI * 54;
                            const offset = circumference * (1 - goal.progress / 100);
                            const strokeColor = goal.status === 'exceeded' ? 'var(--success-500)' : 'var(--primary-500)';
                            
                            return `
                                <div class="goal-card ${goal.status}" data-goal="${goal.name}">
                                    <div class="goal-header">
                                        <h4 class="goal-name">${goal.name}</h4>
                                        <span class="goal-status ${goal.status}">
                                            ${goal.status.replace('-', ' ')}
                                            <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                ${this.getStatusIcon(goal.status)}
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="goal-metrics">
                                        <div class="goal-progress-circle">
                                            <svg class="progress-ring" width="120" height="120" viewBox="0 0 120 120">
                                                <circle class="progress-ring-circle-bg" cx="60" cy="60" r="54" />
                                                <circle class="progress-ring-circle" cx="60" cy="60" r="54" 
                                                    stroke="${strokeColor}"
                                                    stroke-dasharray="${circumference}"
                                                    stroke-dashoffset="${offset}"
                                                />
                                            </svg>
                                            <div class="goal-current">${goal.current}</div>
                                            <div class="goal-target">of ${goal.target}</div>
                                        </div>
                                        <div class="goal-details">
                                            <div class="goal-progress-label">Progress</div>
                                            <div class="goal-progress-value">${goal.progress.toFixed(1)}%</div>
                                            <div class="goal-trend">
                                                <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                                                </svg>
                                                +5% this week
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Team Performance Heat Map -->
                <div class="heatmap-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                ${this.data.teamPerformance.metrics.map(metric => `
                                    <div class="metric-header">${metric}</div>
                                `).join('')}
                            </div>
                            ${this.data.teamPerformance.departments.map((dept, deptIndex) => `
                                <div class="heatmap-row">
                                    <div class="dept-header">${dept}</div>
                                    ${this.data.teamPerformance.heatmapData[deptIndex].map((value, metricIndex) => `
                                        <div class="heatmap-cell" data-value="${value}" data-dept="${dept}" data-metric="${this.data.teamPerformance.metrics[metricIndex]}" style="background-color: ${this.getHeatmapColor(value)}">
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
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        AI-Powered Insights
                        <span class="ai-badge">BETA</span>
                    </h3>
                    <div class="insights-grid">
                                                ${this.data.aiInsights.map(insight => `
                            <div class="ai-insight-card ${insight.type}" data-confidence="${insight.confidence}">
                                <div class="insight-header">
                                    <div class="insight-type-icon ${insight.type}">
                                        ${this.getInsightIcon(insight.type)}
                                    </div>
                                    <div class="insight-meta">
                                        <h4 class="insight-title">${insight.title}</h4>
                                        <div class="insight-confidence">
                                            <div class="confidence-bar">
                                                <div class="confidence-fill" style="width: ${insight.confidence}%">
                                                    <div class="confidence-glow"></div>
                                                </div>
                                                <span class="confidence-label">${insight.confidence}% confidence</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="impact-badge ${insight.impact}">
                                        ${insight.impact} impact
                                        <svg class="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${this.getImpactIcon(insight.impact)}
                                        </svg>
                                    </span>
                                </div>
                                <p class="insight-description">${insight.description}</p>
                                <div class="insight-actions">
                                    <button class="insight-action-btn primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Apply Suggestion
                                    </button>
                                    <button class="insight-action-btn secondary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Enhanced Charts Section -->
                <div class="charts-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

                <!-- Activity Feed -->
                <div class="activity-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                            ${['All Activity', 'Achievements', 'Collaboration', 'Goals', 'Insights'].map(filter => `
                                <button class="filter-btn ${filter === 'All Activity' ? 'active' : ''}" 
                                        data-filter="${filter.toLowerCase()}">
                                    <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        ${this.getFilterIcon(filter)}
                                    </svg>
                                    ${filter}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="activity-feed" id="activityFeed">
                        ${this.data.activities.map(activity => `
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
                                        <span class="activity-time">
                                            <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            ${activity.time}
                                        </span>
                                        <span class="activity-priority ${activity.priority}">
                                            <svg class="priority-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                ${this.getPriorityIcon(activity.priority)}
                                            </svg>
                                            ${activity.priority} priority
                                        </span>
                                    </div>
                                </div>
                                <button class="activity-expand" title="View details">
                                    <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 18l6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        console.log('Analytics Dashboard rendered, element:', this);
        console.log('Analytics Dashboard innerHTML length:', this.innerHTML.length);
        
        // Add entrance animations for AI insights
        setTimeout(() => {
            const insightCards = this.querySelectorAll('.ai-insight-card');
            console.log('🎭 Adding animate-in class to', insightCards.length, 'insight cards');
            insightCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                    console.log(`✨ Animated insight card ${index}`);
                }, index * 150); // Stagger the animations
            });
        }, 100);
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
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>`,
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

    initializeCharts() {
        // Task Completion Chart
        const taskCanvas = this.querySelector('#taskChartCanvas');
        if (taskCanvas) {
            const taskCtx = taskCanvas.getContext('2d');
            const taskChart = new Chart(taskCtx, {
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
                            fill: true,
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
                            fill: true,
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
                            padding: 12,
                            titleFont: {
                                family: "'Inter', sans-serif",
                                weight: '600',
                                size: 14
                            },
                            bodyFont: {
                                family: "'Inter', sans-serif",
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.parsed.y} tasks`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: '#e2e8f0',
                                lineWidth: 1,
                                drawBorder: false
                            },
                            ticks: {
                                color: '#475569',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                },
                                padding: 8
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
                                },
                                padding: 8
                            }
                        }
                    }
                }
            });
            this.chartInstances.set('task', taskChart);
        }

        // Project Progress Chart
        const projectCanvas = this.querySelector('#projectChartCanvas');
        if (projectCanvas) {
            const projectCtx = projectCanvas.getContext('2d');
            const projectChart = new Chart(projectCtx, {
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
                            padding: 12,
                            titleFont: {
                                family: "'Inter', sans-serif",
                                weight: '600',
                                size: 14
                            },
                            bodyFont: {
                                family: "'Inter', sans-serif",
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
            this.chartInstances.set('project', projectChart);
        }
    }

    updateDashboard() {
        if (!this.data) return;
        
        // Update KPIs
        Object.entries(this.data.kpiData).forEach(([key, kpi]) => {
            const kpiCard = this.querySelector(`[data-kpi="${key}"]`);
            if (kpiCard) {
                const valueEl = kpiCard.querySelector('.kpi-value');
                const trendEl = kpiCard.querySelector('.kpi-trend');
                const progressFill = kpiCard.querySelector('.progress-fill');
                
                if (valueEl) {
                    this.animateNumber(valueEl, parseInt(valueEl.textContent), kpi.current);
                }
                
                if (trendEl) {
                    trendEl.textContent = kpi.trend;
                    trendEl.className = `kpi-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}`;
                }
                
                if (progressFill) {
                    progressFill.style.width = `${(kpi.current / kpi.target) * 100}%`;
                }
                
                kpiCard.className = `kpi-card ${kpi.status}`;
            }
        });

        // Update team performance heatmap
        const heatmapCells = this.querySelectorAll('.heatmap-cell');
        this.data.teamPerformance.heatmapData.forEach((row, deptIndex) => {
            row.forEach((value, metricIndex) => {
                const cell = heatmapCells[deptIndex * 4 + metricIndex];
                if (cell) {
                    cell.style.backgroundColor = this.getHeatmapColor(value);
                    cell.querySelector('.cell-value').textContent = value;
                }
            });
        });

        // Update goals
        this.data.goals.quarterly.forEach(goal => {
            const goalCard = this.querySelector(`[data-goal="${goal.name}"]`);
            if (goalCard) {
                const progressEl = goalCard.querySelector('.progress-fill');
                const progressText = goalCard.querySelector('.goal-progress-value');
                const statusBadge = goalCard.querySelector('.goal-status');
                
                if (progressEl) {
                    progressEl.style.width = `${goal.progress}%`;
                }
                
                if (progressText) {
                    progressText.textContent = `${goal.progress.toFixed(1)}%`;
                }
                
                if (statusBadge) {
                    statusBadge.className = `goal-status ${goal.status}`;
                    statusBadge.textContent = goal.status.replace('-', ' ');
                }
            }
        });

        // Update AI insights
        const insightsContainer = this.querySelector('.ai-insights-grid');
        if (insightsContainer) {
            insightsContainer.innerHTML = this.data.aiInsights.map((insight, index) => `
                <div class="ai-insight-card ${insight.type} ${index === 0 ? 'active' : ''}" data-confidence="${insight.confidence}">
                    <div class="insight-header">
                        <div class="insight-type-icon ${insight.type}">
                            ${this.getInsightIcon(insight.type)}
                        </div>
                        <div class="insight-meta">
                            <h4 class="insight-title">${insight.title}</h4>
                            <div class="insight-confidence">
                                <div class="confidence-bar">
                                    <div class="confidence-fill" style="width: ${insight.confidence}%">
                                        <div class="confidence-glow"></div>
                                    </div>
                                    <span class="confidence-label">${insight.confidence}% confidence</span>
                                </div>
                            </div>
                        </div>
                        <span class="impact-badge ${insight.impact}">
                            ${insight.impact} impact
                            <svg class="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${this.getImpactIcon(insight.impact)}
                            </svg>
                        </span>
                    </div>
                    <p class="insight-description">${insight.description}</p>
                    <div class="insight-actions">
                        <button class="insight-action-btn primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            Apply Suggestion
                        </button>
                        <button class="insight-action-btn secondary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                            Learn More
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update activity feed
        const activityFeed = this.querySelector('#activityFeed');
        if (activityFeed) {
            activityFeed.innerHTML = this.data.activities.map(activity => `
                <div class="activity-item ${activity.type} ${activity.impact}" data-type="${activity.type}">
                    <div class="activity-icon ${activity.type}">
                        ${this.getActivityIcon(activity.type)}
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">${activity.text}</div>
                        <div class="activity-meta">
                            <span class="activity-time">
                                <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${activity.time}
                            </span>
                            <span class="activity-impact ${activity.impact}">
                                ${activity.impact} impact
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update charts
        this.updateCharts();
    }

    updateCharts() {
        // Update task completion chart
        const taskChart = this.chartInstances.get('task');
        if (taskChart && this.data.taskChart) {
            taskChart.data.datasets[0].data = this.data.taskChart;
            taskChart.update('none'); // Use 'none' mode for smoother updates
        }

        // Update project progress chart
        const projectChart = this.chartInstances.get('project');
        if (projectChart && this.data.projectChart) {
            projectChart.data.datasets[0].data = this.data.projectChart;
            projectChart.update('none');
        }
    }

    refreshData() {
        const refreshBtn = this.querySelector('#refreshAnalytics');
        if (refreshBtn) {
            refreshBtn.style.transform = 'rotate(360deg)';
            refreshBtn.setAttribute('aria-label', 'Refreshing analytics data...');
            
            setTimeout(() => {
                refreshBtn.style.transform = 'rotate(0deg)';
                refreshBtn.setAttribute('aria-label', 'Refresh analytics data');
                this.showNotification('Analytics data refreshed', 'success');
            }, 1000);
        }

        // Request new data from service
        window.analyticsService?.generateMockData();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `analytics-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${this.getNotificationIcon(type)}
                </div>
                <span class="notification-text">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const steps = 30;
        const increment = (end - start) / steps;
        let current = start;
        const interval = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                element.textContent = end;
            } else {
                element.textContent = Math.round(current);
            }
        }, interval);
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
        this.querySelectorAll('.kpi-card').forEach(c => c.classList.remove('highlighted'));
        
        // Add highlight to selected card
        card.classList.add('highlighted');
        
        // Animate the card
        card.style.transform = 'translateY(-4px) scale(1.02)';
        setTimeout(() => {
            card.style.transform = '';
        }, 300);

        // Announce the metric
        const label = card.querySelector('.kpi-name').textContent;
        const value = card.querySelector('.kpi-value').textContent;
        this.announceUpdate(`${label}: ${value}`);
    }

    animateKPICard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = 'var(--shadow-lg)';
            card.style.borderColor = 'var(--primary-200)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
        }
    }

    animateGoalCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-4px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-xl)';
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
        }
    }

    animateInsightCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-4px) scale(1.02)';
            card.style.boxShadow = 'var(--shadow-xl)';
            const insightIcon = card.querySelector('.insight-icon');
            if (insightIcon) {
                insightIcon.style.transform = 'scale(1.1)';
            }
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            const insightIcon = card.querySelector('.insight-icon');
            if (insightIcon) {
                insightIcon.style.transform = '';
            }
        }
    }

    animateChartContainer(container, isEntering) {
        if (isEntering) {
            container.style.transform = 'translateY(-2px)';
            container.style.boxShadow = 'var(--shadow-lg)';
        } else {
            container.style.transform = '';
            container.style.boxShadow = '';
        }
    }

    animateActivityItem(item, isEntering) {
        if (isEntering) {
            item.style.transform = 'translateX(8px)';
            item.style.backgroundColor = 'var(--bg-hover)';
        } else {
            item.style.transform = '';
            item.style.backgroundColor = '';
        }
    }

    expandInsight(card) {
        // Toggle expanded state
        const isExpanded = card.classList.contains('expanded');
        
        // Remove expanded from all cards
        this.querySelectorAll('.ai-insight-card').forEach(c => c.classList.remove('expanded'));
        
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

    getStatusIcon(status) {
        const icons = {
            'excellent': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
            'attention': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
            'on-track': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
            'exceeded': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>'
        };
        return icons[status] || icons['on-track'];
    }

    getImpactIcon(impact) {
        const icons = {
            'high': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>',
            'medium': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>',
            'low': '<circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path>'
        };
        return icons[impact] || icons['medium'];
    }

    getFilterIcon(filter) {
        const icons = {
            'All Activity': '<path d="M4 21v-7m4 7V9m4 12V3m4 18v-5m4 5v-11"></path>',
            'Achievements': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 0h1.5a2.5 2.5 0 0 1 0 5H18"></path><path d="M4 22h16"></path><path d="M8 9h8"></path><path d="M12 2v7"></path>',
            'Collaboration': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
            'Goals': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>',
            'Insights': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>'
        };
        return icons[filter] || icons['All Activity'];
    }

    getPriorityIcon(priority) {
        const icons = {
            'high': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>',
            'medium': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
            'low': '<circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path>'
        };
        return icons[priority] || icons['medium'];
    }
}

// Register the custom element
if (!customElements.get('analytics-dashboard')) {
    customElements.define('analytics-dashboard', AnalyticsDashboard);
    console.log('✅ Analytics Dashboard component registered');
} 