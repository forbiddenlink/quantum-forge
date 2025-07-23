// Enhanced Real-Time Stats with Contest-Winning Features
class RealTimeStats extends HTMLElement {
    constructor() {
        super();
        this.stats = {
            activeUsers: 0,
            tasksCompleted: 0,
            meetingsToday: 0,
            documentsCreated: 0,
            teamCollaboration: 0,
            knowledgeArticles: 0
        };
        this.updateInterval = null;
        this.chartInstances = [];
        this.isInitialized = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeRealTimeUpdates();
        this.createInteractiveCharts();
    }

    disconnectedCallback() {
        console.log('Real-time Stats disconnecting...');
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Cancel any animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        this.chartInstances.forEach(chart => {
            if (chart && chart.destroy) {
                chart.destroy();
            }
        });
        this.chartInstances = [];
        
        console.log('Real-time Stats cleanup complete');
    }

    render() {
        this.innerHTML = `
            <div class="real-time-stats">
                <div class="stats-header">
                    <h3 class="stats-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 20V10M18 20V4M6 20v-6"></path>
                        </svg>
                        Live Activity Dashboard
                    </h3>
                    <div class="stats-controls">
                        <button class="control-btn" id="refreshStats" aria-label="Refresh stats">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                            </svg>
                        </button>
                        <button class="control-btn" id="toggleAutoRefresh" aria-label="Toggle auto refresh">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card live">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="activeUsers">${this.stats.activeUsers}</div>
                            <div class="stat-label">Active Users</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+12%</span>
                            </div>
                        </div>
                        <div class="live-indicator"></div>
                    </div>

                    <div class="stat-card live">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 11 12 14 22 4"></polyline>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="tasksCompleted">${this.stats.tasksCompleted}</div>
                            <div class="stat-label">Tasks Completed</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+8%</span>
                            </div>
                        </div>
                        <div class="live-indicator"></div>
                    </div>

                    <div class="stat-card live">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="meetingsToday">${this.stats.meetingsToday}</div>
                            <div class="stat-label">Meetings Today</div>
                            <div class="stat-trend neutral">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>0%</span>
                            </div>
                        </div>
                        <div class="live-indicator"></div>
                    </div>

                    <div class="stat-card live">
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                        </div>
                        <div class="stat-content">
                            <div class="stat-value" id="documentsCreated">${this.stats.documentsCreated}</div>
                            <div class="stat-label">Documents Created</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+15%</span>
                            </div>
                        </div>
                        <div class="live-indicator"></div>
                    </div>
                </div>

                <div class="charts-section">
                    <div class="chart-container">
                        <h4>Activity Timeline</h4>
                        <canvas id="activityChart" width="400" height="200"></canvas>
                    </div>
                    
                    <div class="chart-container">
                        <h4>Team Collaboration</h4>
                        <canvas id="collaborationChart" width="400" height="200"></canvas>
                    </div>
                </div>

                <div class="live-feed">
                    <h4>Live Activity Feed</h4>
                    <div class="activity-stream" id="activityStream">
                        <div class="activity-item">
                            <div class="activity-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <div class="activity-content">
                                <p>Sarah Chen joined the workspace</p>
                                <span class="activity-time">Just now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const refreshBtn = this.querySelector('#refreshStats');
        const autoRefreshBtn = this.querySelector('#toggleAutoRefresh');

        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshStats());
        }

        if (autoRefreshBtn) {
            autoRefreshBtn.addEventListener('click', () => this.toggleAutoRefresh());
        }
    }

    initializeRealTimeUpdates() {
        // Clear any existing interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Simulate real-time data updates with reduced frequency
        this.updateInterval = setInterval(() => {
            // Only update every 3rd call (15 seconds instead of 5)
            if (!this.updateCounter) this.updateCounter = 0;
            this.updateCounter++;
            
            if (this.updateCounter % 3 === 0) {
                this.updateStats();
                this.updateActivityFeed();
            }
            
            // Stop updates after 20 cycles (100 seconds) to save resources
            if (this.updateCounter >= 20) {
                clearInterval(this.updateInterval);
                console.log('Real-time stats updates stopped to save resources');
            }
        }, 5000); // Keep 5-second interval but reduce actual updates

        // Initial update
        this.updateStats();
    }

    updateStats() {
        // Simulate real-time data changes with reduced ranges
        this.stats.activeUsers = Math.floor(Math.random() * 10) + 15; // Reduced range
        this.stats.tasksCompleted = Math.floor(Math.random() * 20) + 100; // Reduced range
        this.stats.meetingsToday = Math.floor(Math.random() * 5) + 5; // Reduced range
        this.stats.documentsCreated = Math.floor(Math.random() * 15) + 20; // Reduced range
        this.stats.teamCollaboration = Math.floor(Math.random() * 30) + 50; // Reduced range
        this.stats.knowledgeArticles = Math.floor(Math.random() * 10) + 10; // Reduced range

        // Update DOM elements
        this.updateStatDisplay('activeUsers', this.stats.activeUsers);
        this.updateStatDisplay('tasksCompleted', this.stats.tasksCompleted);
        this.updateStatDisplay('meetingsToday', this.stats.meetingsToday);
        this.updateStatDisplay('documentsCreated', this.stats.documentsCreated);

        // Update charts less frequently
        if (this.updateCounter % 6 === 0) { // Every 30 seconds
            this.updateCharts();
        }
    }

    updateStatDisplay(statId, newValue) {
        const element = this.querySelector(`#${statId}`);
        if (element) {
            const oldValue = parseInt(element.textContent);
            this.animateNumberChange(element, oldValue, newValue);
        }
    }

    animateNumberChange(element, oldValue, newValue) {
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(oldValue + (newValue - oldValue) * easeOutQuart);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    createInteractiveCharts() {
        this.createActivityChart();
        this.createCollaborationChart();
    }

    createActivityChart() {
        const canvas = this.querySelector('#activityChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.8)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');

        this.activityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
                datasets: [{
                    label: 'Activity',
                    data: [12, 19, 15, 25, 22, 30, 28, 35],
                    borderColor: 'rgba(99, 102, 241, 1)',
                    backgroundColor: gradient,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'rgba(99, 102, 241, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });

        this.chartInstances.push(this.activityChart);
    }

    createCollaborationChart() {
        const canvas = this.querySelector('#collaborationChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        this.collaborationChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Team Meetings', 'Document Sharing', 'Knowledge Sharing', 'Project Collaboration'],
                datasets: [{
                    data: [30, 25, 20, 25],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.8)',
                        'rgba(34, 197, 94, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(239, 68, 68, 0.8)'
                    ],
                    borderWidth: 0,
                    hoverBorderWidth: 2,
                    hoverBorderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });

        this.chartInstances.push(this.collaborationChart);
    }

    updateCharts() {
        if (this.activityChart) {
            const newData = this.activityChart.data.datasets[0].data.map(() => 
                Math.floor(Math.random() * 40) + 10
            );
            this.activityChart.data.datasets[0].data = newData;
            this.activityChart.update('none');
        }

        if (this.collaborationChart) {
            const newData = this.collaborationChart.data.datasets[0].data.map(() => 
                Math.floor(Math.random() * 50) + 10
            );
            this.collaborationChart.data.datasets[0].data = newData;
            this.collaborationChart.update('none');
        }
    }

    updateActivityFeed() {
        const activityStream = this.querySelector('#activityStream');
        if (!activityStream) return;

        const activities = [
            {
                icon: 'user',
                text: 'Mike Rodriguez completed a task',
                time: 'Just now'
            },
            {
                icon: 'document',
                text: 'New document shared in Project Alpha',
                time: '2 minutes ago'
            },
            {
                icon: 'meeting',
                text: 'Team meeting starting in 5 minutes',
                time: '3 minutes ago'
            },
            {
                icon: 'knowledge',
                text: 'New article added to Knowledge Hub',
                time: '5 minutes ago'
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        const activityItem = this.createActivityItem(randomActivity);
        
        activityStream.insertBefore(activityItem, activityStream.firstChild);
        
        // Remove old activities if more than 10
        const items = activityStream.querySelectorAll('.activity-item');
        if (items.length > 10) {
            items[items.length - 1].remove();
        }
    }

    createActivityItem(activity) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const iconMap = {
            user: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle>',
            document: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline>',
            meeting: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
            knowledge: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>'
        };

        item.innerHTML = `
            <div class="activity-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    ${iconMap[activity.icon]}
                </svg>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;

        return item;
    }

    refreshStats() {
        this.updateStats();
        this.showNotification('Stats refreshed!', 'success');
    }

    toggleAutoRefresh() {
        const btn = this.querySelector('#toggleAutoRefresh');
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
            btn.classList.remove('active');
            this.showNotification('Auto-refresh disabled', 'info');
        } else {
            this.initializeRealTimeUpdates();
            btn.classList.add('active');
            this.showNotification('Auto-refresh enabled', 'success');
        }
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

customElements.define('real-time-stats', RealTimeStats); 