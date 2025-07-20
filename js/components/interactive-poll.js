// Interactive Poll Component
class InteractivePoll extends HTMLElement {
    constructor() {
        super();
        this.currentPoll = null;
        this.hasVoted = false;
        this.polls = [
            {
                id: 1,
                question: "What's your preferred team building activity?",
                options: [
                    { id: 1, text: "Virtual escape room", votes: 12, percentage: 30 },
                    { id: 2, text: "Online cooking class", votes: 8, percentage: 20 },
                    { id: 3, text: "Team trivia night", votes: 15, percentage: 37.5 },
                    { id: 4, text: "Wellness workshop", votes: 5, percentage: 12.5 }
                ],
                totalVotes: 40,
                endDate: "2024-01-15",
                category: "team-building"
            },
            {
                id: 2,
                question: "Which new feature would you like to see in our platform?",
                options: [
                    { id: 1, text: "Advanced analytics dashboard", votes: 18, percentage: 45 },
                    { id: 2, text: "Mobile app", votes: 12, percentage: 30 },
                    { id: 3, text: "AI-powered task suggestions", votes: 6, percentage: 15 },
                    { id: 4, text: "Enhanced collaboration tools", votes: 4, percentage: 10 }
                ],
                totalVotes: 40,
                endDate: "2024-01-20",
                category: "product"
            }
        ];
        this.currentPollIndex = 0;
    }

    connectedCallback() {
        this.loadUserVotes();
        this.render();
        this.setupEventListeners();
    }

    loadUserVotes() {
        const userVotes = JSON.parse(localStorage.getItem('userPolls') || '{}');
        this.hasVoted = userVotes[this.polls[this.currentPollIndex].id] || false;
    }

    render() {
        this.currentPoll = this.polls[this.currentPollIndex];
        this.innerHTML = `
            <div class="interactive-poll">
                <div class="poll-header">
                    <h3 class="poll-title">Quick Poll</h3>
                    <div class="poll-controls">
                        <button class="btn-icon small" id="prevPoll" aria-label="Previous poll">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="nextPoll" aria-label="Next poll">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="poll-content">
                    <div class="poll-question">
                        <h4>${this.currentPoll.question}</h4>
                        <div class="poll-meta">
                            <span class="poll-category">${this.getCategoryIcon(this.currentPoll.category)} ${this.currentPoll.category}</span>
                            <span class="poll-deadline">Ends ${this.formatDate(this.currentPoll.endDate)}</span>
                        </div>
                    </div>

                    <div class="poll-options">
                        ${this.currentPoll.options.map(option => `
                            <div class="poll-option ${this.hasVoted ? 'voted' : ''}" data-option-id="${option.id}">
                                <div class="option-content">
                                    <div class="option-text">${option.text}</div>
                                    ${this.hasVoted ? `
                                        <div class="option-stats">
                                            <div class="vote-count">${option.votes} votes</div>
                                            <div class="vote-percentage">${option.percentage}%</div>
                                        </div>
                                    ` : ''}
                                </div>
                                ${this.hasVoted ? `
                                    <div class="vote-bar">
                                        <div class="vote-fill" style="width: ${option.percentage}%"></div>
                                    </div>
                                ` : `
                                    <button class="vote-btn" data-option-id="${option.id}">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M9 12l2 2 4-4"></path>
                                            <circle cx="12" cy="12" r="10"></circle>
                                        </svg>
                                    </button>
                                `}
                            </div>
                        `).join('')}
                    </div>

                    ${this.hasVoted ? `
                        <div class="poll-results">
                            <div class="total-votes">Total votes: ${this.currentPoll.totalVotes}</div>
                            <button class="btn secondary" id="createPoll">Create New Poll</button>
                        </div>
                    ` : `
                        <div class="poll-actions">
                            <button class="btn secondary" id="skipPoll">Skip</button>
                            <button class="btn secondary" id="createPoll">Create Poll</button>
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'team-building': '👥',
            'product': '🚀',
            'wellness': '🧘',
            'culture': '🎉'
        };
        return icons[category] || '📊';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return 'Ended';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        return `in ${diffDays} days`;
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('#prevPoll');
        const nextBtn = this.querySelector('#nextPoll');
        const voteBtns = this.querySelectorAll('.vote-btn');
        const skipBtn = this.querySelector('#skipPoll');
        const createBtn = this.querySelector('#createPoll');

        prevBtn?.addEventListener('click', () => this.showPreviousPoll());
        nextBtn?.addEventListener('click', () => this.showNextPoll());
        skipBtn?.addEventListener('click', () => this.skipPoll());
        createBtn?.addEventListener('click', () => this.createPoll());

        voteBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const optionId = parseInt(e.target.closest('.vote-btn').dataset.optionId);
                this.vote(optionId);
            });
        });
    }

    vote(optionId) {
        // Update poll data
        const option = this.currentPoll.options.find(opt => opt.id === optionId);
        if (option) {
            option.votes++;
            this.currentPoll.totalVotes++;
            this.updatePercentages();
        }

        // Mark as voted
        this.hasVoted = true;
        this.saveUserVote();

        // Show animation
        this.showVoteAnimation(optionId);

        // Re-render with results
        setTimeout(() => {
            this.render();
        }, 1000);
    }

    updatePercentages() {
        this.currentPoll.options.forEach(option => {
            option.percentage = Math.round((option.votes / this.currentPoll.totalVotes) * 100);
        });
    }

    showVoteAnimation(optionId) {
        const option = this.querySelector(`[data-option-id="${optionId}"]`);
        if (option) {
            option.classList.add('voting');
            setTimeout(() => {
                option.classList.remove('voting');
            }, 1000);
        }
    }

    saveUserVote() {
        const userVotes = JSON.parse(localStorage.getItem('userPolls') || '{}');
        userVotes[this.currentPoll.id] = true;
        localStorage.setItem('userPolls', JSON.stringify(userVotes));
    }

    showPreviousPoll() {
        this.currentPollIndex = (this.currentPollIndex - 1 + this.polls.length) % this.polls.length;
        this.loadUserVotes();
        this.render();
    }

    showNextPoll() {
        this.currentPollIndex = (this.currentPollIndex + 1) % this.polls.length;
        this.loadUserVotes();
        this.render();
    }

    skipPoll() {
        this.showNotification('Poll skipped');
        this.showNextPoll();
    }

    createPoll() {
        this.showNotification('Poll creation feature coming soon!');
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

customElements.define('interactive-poll', InteractivePoll); 