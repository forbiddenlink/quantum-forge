// Enhanced Interactive Poll Component
class EnhancedInteractivePoll extends HTMLElement {
    constructor() {
        super();
        this.currentPoll = null;
        this.userVote = null;
        this.isVoting = false;
        this.chartInstance = null;
        this.pollInterval = null;
        
        this.polls = [
            {
                id: 1,
                question: "What's your favorite team building activity?",
                options: [
                    { id: 1, text: "Virtual Escape Rooms", votes: 45, color: "#6366f1" },
                    { id: 2, text: "Online Game Nights", votes: 32, color: "#10b981" },
                    { id: 3, text: "Collaborative Projects", votes: 28, color: "#f59e0b" },
                    { id: 4, text: "Knowledge Sharing Sessions", votes: 15, color: "#8b5cf6" }
                ],
                totalVotes: 120,
                endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                category: "Team Building"
            },
            {
                id: 2,
                question: "Which new feature would you like to see most?",
                options: [
                    { id: 1, text: "Advanced Analytics Dashboard", votes: 38, color: "#6366f1" },
                    { id: 2, text: "AI-Powered Task Assistant", votes: 42, color: "#10b981" },
                    { id: 3, text: "Enhanced Mobile App", votes: 25, color: "#f59e0b" },
                    { id: 4, text: "Integration with Slack", votes: 15, color: "#8b5cf6" }
                ],
                totalVotes: 120,
                endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                category: "Product Development"
            },
            {
                id: 3,
                question: "How do you prefer to receive company updates?",
                options: [
                    { id: 1, text: "Weekly Email Digest", votes: 35, color: "#6366f1" },
                    { id: 2, text: "Real-time Notifications", votes: 28, color: "#10b981" },
                    { id: 3, text: "Monthly Newsletter", votes: 22, color: "#f59e0b" },
                    { id: 4, text: "In-app Announcements", votes: 35, color: "#8b5cf6" }
                ],
                totalVotes: 120,
                endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
                category: "Communication"
            }
        ];
    }

    connectedCallback() {
        this.currentPoll = this.polls[0];
        this.render();
        this.setupEventListeners();
        this.initializeChart();
        this.startRealTimeUpdates();
    }

    disconnectedCallback() {
        console.log('Enhanced Interactive Poll disconnecting...');
        if (this.pollInterval) {
            clearInterval(this.pollInterval);
            this.pollInterval = null;
        }
        console.log('Enhanced Interactive Poll cleanup complete');
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }
    }

    render() {
        const timeLeft = this.getTimeLeft(this.currentPoll.endDate);
        const userHasVoted = this.userVote !== null;
        
        this.innerHTML = `
            <div class="enhanced-interactive-poll">
                <div class="poll-header">
                    <div class="poll-category">
                        <span class="category-badge">${this.currentPoll.category}</span>
                    </div>
                    <h3 class="poll-title">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 12l2 2 4-4"></path>
                            <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
                        </svg>
                        Live Poll
                    </h3>
                    <div class="poll-meta">
                        <div class="poll-timer">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span class="time-left">${timeLeft}</span>
                        </div>
                        <div class="poll-stats">
                            <span class="total-votes">${this.currentPoll.totalVotes} votes</span>
                        </div>
                    </div>
                </div>

                <div class="poll-content">
                    <h4 class="poll-question">${this.currentPoll.question}</h4>
                    
                    <div class="poll-options">
                        ${this.currentPoll.options.map((option, index) => {
                            const percentage = this.currentPoll.totalVotes > 0 ? 
                                Math.round((option.votes / this.currentPoll.totalVotes) * 100) : 0;
                            const isVoted = this.userVote === option.id;
                            
                            return `
                                <div class="poll-option ${isVoted ? 'voted' : ''} ${userHasVoted ? 'disabled' : ''}" 
                                     data-option-id="${option.id}">
                                    <div class="option-content">
                                        <div class="option-header">
                                            <div class="option-text">
                                                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                                                <span class="option-label">${option.text}</span>
                                            </div>
                                            ${userHasVoted ? `
                                                <div class="vote-percentage">
                                                    <span class="percentage">${percentage}%</span>
                                                    <span class="vote-count">${option.votes} votes</span>
                                                </div>
                                            ` : ''}
                                        </div>
                                        
                                        ${userHasVoted ? `
                                            <div class="progress-bar">
                                                <div class="progress-fill" style="width: ${percentage}%; background: ${option.color}"></div>
                                            </div>
                                        ` : `
                                            <button class="vote-button" data-option-id="${option.id}">
                                                <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M9 12l2 2 4-4"></path>
                                                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"></path>
                                                </svg>
                                                Vote
                                            </button>
                                        `}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>

                    ${userHasVoted ? `
                        <div class="poll-results">
                            <div class="results-chart">
                                <canvas id="pollChart" width="400" height="200"></canvas>
                            </div>
                            <div class="results-summary">
                                <div class="summary-item">
                                    <span class="summary-label">Total Votes:</span>
                                    <span class="summary-value">${this.currentPoll.totalVotes}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="summary-label">Leading Option:</span>
                                    <span class="summary-value">${this.getLeadingOption()}</span>
                                </div>
                                <div class="summary-item">
                                    <span class="summary-label">Time Remaining:</span>
                                    <span class="summary-value">${timeLeft}</span>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div class="poll-actions">
                    <button class="action-btn secondary" id="sharePoll">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        Share Poll
                    </button>
                    <button class="action-btn secondary" id="viewHistory">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        Poll History
                    </button>
                    <button class="action-btn primary" id="createPoll">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Create Poll
                    </button>
                </div>

                <!-- Live Activity Feed -->
                <div class="poll-activity">
                    <h5 class="activity-title">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Live Activity
                    </h5>
                    <div class="activity-feed" id="pollActivityFeed">
                        <div class="activity-item">
                            <div class="activity-avatar">👤</div>
                            <div class="activity-content">
                                <p>Sarah Chen voted for "Virtual Escape Rooms"</p>
                                <span class="activity-time">Just now</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-avatar">👤</div>
                            <div class="activity-content">
                                <p>Mike Rodriguez voted for "Online Game Nights"</p>
                                <span class="activity-time">2 minutes ago</span>
                            </div>
                        </div>
                        <div class="activity-item">
                            <div class="activity-avatar">👤</div>
                            <div class="activity-content">
                                <p>Lisa Park voted for "Collaborative Projects"</p>
                                <span class="activity-time">5 minutes ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const voteButtons = this.querySelectorAll('.vote-button');
        const shareBtn = this.querySelector('#sharePoll');
        const historyBtn = this.querySelector('#viewHistory');
        const createBtn = this.querySelector('#createPoll');

        voteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const optionId = parseInt(button.dataset.optionId);
                this.castVote(optionId);
            });
        });

        if (shareBtn) {
            shareBtn.addEventListener('click', () => this.sharePoll());
        }

        if (historyBtn) {
            historyBtn.addEventListener('click', () => this.showPollHistory());
        }

        if (createBtn) {
            createBtn.addEventListener('click', () => this.showCreatePollModal());
        }
    }

    castVote(optionId) {
        if (this.isVoting) return;
        
        this.isVoting = true;
        this.userVote = optionId;

        // Simulate API call
        setTimeout(() => {
            // Update vote count
            const option = this.currentPoll.options.find(opt => opt.id === optionId);
            if (option) {
                option.votes++;
                this.currentPoll.totalVotes++;
            }

            // Add activity
            this.addActivity(`You voted for "${option.text}"`);

            // Update UI
            this.render();
            this.setupEventListeners();
            this.initializeChart();

            this.isVoting = false;
            
            // Show success notification
            this.showNotification('Vote recorded successfully!', 'success');
        }, 1000);
    }

    initializeChart() {
        if (!this.userVote) return;

        const canvas = this.querySelector('#pollChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.currentPoll.options.map(opt => opt.text),
                datasets: [{
                    data: this.currentPoll.options.map(opt => opt.votes),
                    backgroundColor: this.currentPoll.options.map(opt => opt.color),
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
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    animateScale: true
                }
            }
        });
    }

    startRealTimeUpdates() {
        this.pollInterval = setInterval(() => {
            // Simulate new votes
            if (Math.random() > 0.7) {
                const randomOption = this.currentPoll.options[Math.floor(Math.random() * this.currentPoll.options.length)];
                randomOption.votes++;
                this.currentPoll.totalVotes++;
                
                // Update chart if user has voted
                if (this.userVote && this.chartInstance) {
                    this.chartInstance.data.datasets[0].data = this.currentPoll.options.map(opt => opt.votes);
                    this.chartInstance.update('none');
                }

                // Add random activity
                const names = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Riley'];
                const randomName = names[Math.floor(Math.random() * names.length)];
                this.addActivity(`${randomName} voted for "${randomOption.text}"`);
            }
        }, 3000);
    }

    addActivity(message) {
        const activityFeed = this.querySelector('#pollActivityFeed');
        if (!activityFeed) return;

        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-avatar">👤</div>
            <div class="activity-content">
                <p>${message}</p>
                <span class="activity-time">Just now</span>
            </div>
        `;

        activityFeed.insertBefore(activityItem, activityFeed.firstChild);

        // Remove old activities if more than 5
        const items = activityFeed.querySelectorAll('.activity-item');
        if (items.length > 5) {
            items[items.length - 1].remove();
        }

        // Animate new activity
        activityItem.style.animation = 'slideInRight 0.3s ease-out';
    }

    getTimeLeft(endDate) {
        const now = new Date();
        const diff = endDate - now;
        
        if (diff <= 0) return 'Poll ended';
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h ${minutes}m`;
        return `${minutes}m`;
    }

    getLeadingOption() {
        const leading = this.currentPoll.options.reduce((prev, current) => 
            (prev.votes > current.votes) ? prev : current
        );
        return leading.text;
    }

    sharePoll() {
        const shareData = {
            title: 'Quantum Forge Poll',
            text: this.currentPoll.question,
            url: window.location.href
        };

        if (navigator.share) {
            navigator.share(shareData);
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(`${shareData.title}: ${shareData.text}`);
            this.showNotification('Poll link copied to clipboard!', 'info');
        }
    }

    showPollHistory() {
        this.showNotification('Poll history feature coming soon!', 'info');
    }

    showCreatePollModal() {
        this.showNotification('Create poll feature coming soon!', 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `poll-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">×</button>
            </div>
        `;

        this.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(-20px)';
                setTimeout(() => notification.remove(), 300);
            });
        }
    }
}

customElements.define('enhanced-interactive-poll', EnhancedInteractivePoll); 