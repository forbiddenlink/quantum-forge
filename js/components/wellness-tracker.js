// 🏆 WELLNESS TRACKER - Contest-Winning Team Mood Component
class WellnessTracker extends HTMLElement {
    constructor() {
        super();
        this.currentMood = null;
        this.todayData = null;
        this.weekData = [];
        this.updateInterval = null;
        this.isVisible = false;
        this.hasSubmittedToday = false;
        
        // Mood types with contest-appealing emojis and colors
        this.moodTypes = [
            {
                id: 'excellent',
                emoji: '🚀',
                label: 'Excellent',
                color: 'var(--success-500)',
                bgColor: 'rgba(34, 197, 94, 0.1)',
                description: 'Feeling energized and highly productive!'
            },
            {
                id: 'good',
                emoji: '😊',
                label: 'Good',
                color: 'var(--success-400)',
                bgColor: 'rgba(34, 197, 94, 0.08)',
                description: 'Positive and ready to tackle tasks'
            },
            {
                id: 'neutral',
                emoji: '😐',
                label: 'Neutral',
                color: 'var(--warning-500)',
                bgColor: 'rgba(245, 158, 11, 0.1)',
                description: 'Feeling okay, could be better'
            },
            {
                id: 'stressed',
                emoji: '😰',
                label: 'Stressed',
                color: 'var(--warning-600)',
                bgColor: 'rgba(245, 158, 11, 0.15)',
                description: 'Feeling overwhelmed, need support'
            },
            {
                id: 'tired',
                emoji: '😴',
                label: 'Tired',
                color: 'var(--error-500)',
                bgColor: 'rgba(239, 68, 68, 0.1)',
                description: 'Low energy, need a break'
            }
        ];
        
        // Wellness tips for different moods
        this.wellnessTips = {
            excellent: [
                "Keep the momentum! Share your energy with teammates.",
                "Great day to tackle challenging projects!",
                "Consider mentoring someone today."
            ],
            good: [
                "Perfect time for collaborative work!",
                "Stay hydrated and maintain that positive energy.",
                "Maybe take on a new learning opportunity."
            ],
            neutral: [
                "Try a 5-minute breathing exercise.",
                "Take a short walk to refresh your mind.",
                "Connect with a colleague for a quick chat."
            ],
            stressed: [
                "Take a 10-minute break every hour.",
                "Practice the 4-7-8 breathing technique.",
                "Consider reaching out to your manager or HR."
            ],
            tired: [
                "Take a proper lunch break away from your desk.",
                "Try a 20-minute power nap if possible.",
                "Ensure you're getting enough sleep tonight."
            ]
        };
        
        // Team wellness data (simulated)
        this.teamWellness = {
            averageMood: 3.8,
            totalResponses: 24,
            trendDirection: 'up',
            moodDistribution: {
                excellent: 8,
                good: 12,
                neutral: 3,
                stressed: 1,
                tired: 0
            }
        };
    }

    connectedCallback() {
        console.log('💚 Wellness Tracker connecting...');
        this.render();
        this.setupIntersectionObserver();
        this.loadTodayData();
        this.generateWeekData();
        this.setupEventListeners();
        this.startPeriodicUpdates();
        console.log('✅ Wellness Tracker connected!');
    }

    disconnectedCallback() {
        console.log('💚 Wellness Tracker disconnecting...');
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
            });
        });
        this.observer.observe(this);
    }

    loadTodayData() {
        // Check if user has already submitted today
        const today = new Date().toDateString();
        const storedMood = localStorage.getItem(`wellness-${today}`);
        
        if (storedMood) {
            this.currentMood = storedMood;
            this.hasSubmittedToday = true;
            this.showThankYouState();
        }
    }

    generateWeekData() {
        // Generate mock data for the past 7 days
        const today = new Date();
        this.weekData = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            
            const moodScores = [4.2, 3.8, 4.1, 3.5, 4.0, 3.9, 4.3];
            const responses = [22, 24, 20, 25, 23, 24, 26];
            
            this.weekData.push({
                date: date,
                averageMood: moodScores[6 - i],
                responses: responses[6 - i],
                day: date.toLocaleDateString('en-US', { weekday: 'short' })
            });
        }
    }

    startPeriodicUpdates() {
        // Update team stats every 30 seconds
        this.updateInterval = setInterval(() => {
            if (this.isVisible) {
                this.updateTeamStats();
            }
        }, 30000);
    }

    updateTeamStats() {
        // Simulate real-time updates
        const variation = (Math.random() - 0.5) * 0.2;
        this.teamWellness.averageMood = Math.max(1, Math.min(5, this.teamWellness.averageMood + variation));
        
        if (Math.random() > 0.7) {
            this.teamWellness.totalResponses++;
        }
        
        this.updateTeamStatsDisplay();
    }

    submitMood(moodId) {
        if (this.hasSubmittedToday) return;
        
        this.currentMood = moodId;
        this.hasSubmittedToday = true;
        
        // Store in localStorage
        const today = new Date().toDateString();
        localStorage.setItem(`wellness-${today}`, moodId);
        
        // Update team stats
        this.teamWellness.totalResponses++;
        this.updateTeamWellnessDistribution(moodId);
        
        // Show thank you state
        this.showThankYouState();
        
        // Show wellness tip
        this.showWellnessTip(moodId);
        
        // Announce to screen readers
        this.announceSubmission(moodId);
        
        console.log(`Mood submitted: ${moodId}`);
    }

    updateTeamWellnessDistribution(moodId) {
        if (this.teamWellness.moodDistribution[moodId] !== undefined) {
            this.teamWellness.moodDistribution[moodId]++;
        }
        
        // Recalculate average
        const total = Object.values(this.teamWellness.moodDistribution).reduce((a, b) => a + b, 0);
        const weightedSum = Object.entries(this.teamWellness.moodDistribution).reduce((sum, [mood, count]) => {
            const weight = this.moodTypes.findIndex(m => m.id === mood) + 1;
            return sum + (weight * count);
        }, 0);
        
        this.teamWellness.averageMood = weightedSum / total;
    }

    showThankYouState() {
        const moodSelector = this.querySelector('.mood-selector');
        const mood = this.moodTypes.find(m => m.id === this.currentMood);
        
        if (moodSelector && mood) {
            moodSelector.innerHTML = `
                <div class="thank-you-state">
                    <div class="thank-you-icon">${mood.emoji}</div>
                    <h4 class="thank-you-title">Thanks for sharing!</h4>
                    <p class="thank-you-message">You're feeling <strong>${mood.label.toLowerCase()}</strong> today. Your input helps us support the team better.</p>
                    <div class="next-checkin">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        Next check-in available tomorrow
                    </div>
                </div>
            `;
        }
    }

    showWellnessTip(moodId) {
        const tips = this.wellnessTips[moodId];
        if (!tips || tips.length === 0) return;
        
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const tipContainer = this.querySelector('.wellness-tip');
        
        if (tipContainer) {
            tipContainer.innerHTML = `
                <div class="tip-content">
                    <div class="tip-icon">💡</div>
                    <div class="tip-text">
                        <h5>Wellness Tip</h5>
                        <p>${randomTip}</p>
                    </div>
                </div>
            `;
            tipContainer.style.display = 'block';
            tipContainer.classList.add('tip-enter');
        }
    }

    announceSubmission(moodId) {
        const mood = this.moodTypes.find(m => m.id === moodId);
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Mood submitted: ${mood.label}. Thank you for sharing your wellness status.`;
        this.appendChild(announcement);
        
        setTimeout(() => {
            this.removeChild(announcement);
        }, 1000);
    }

    updateTeamStatsDisplay() {
        const avgElement = this.querySelector('.team-average');
        const responsesElement = this.querySelector('.team-responses');
        
        if (avgElement) {
            avgElement.textContent = this.teamWellness.averageMood.toFixed(1);
        }
        
        if (responsesElement) {
            responsesElement.textContent = this.teamWellness.totalResponses;
        }
    }

    renderMoodSelector() {
        if (this.hasSubmittedToday) {
            return ''; // Will be replaced by thank you state
        }
        
        return `
            <div class="mood-selector">
                <h4 class="selector-title">How are you feeling today?</h4>
                <div class="mood-options">
                    ${this.moodTypes.map(mood => `
                        <button class="mood-option" 
                                data-mood="${mood.id}"
                                title="${mood.description}"
                                aria-label="Select mood: ${mood.label}">
                            <span class="mood-emoji">${mood.emoji}</span>
                            <span class="mood-label">${mood.label}</span>
                        </button>
                    `).join('')}
                </div>
                <p class="selector-note">Your response is anonymous and helps improve team wellness</p>
            </div>
        `;
    }

    renderTeamStats() {
        const trendIcon = this.teamWellness.trendDirection === 'up' ? '📈' : 
                         this.teamWellness.trendDirection === 'down' ? '📉' : '➡️';
        
        return `
            <div class="team-stats">
                <h4 class="stats-title">Team Wellness</h4>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Average Mood</span>
                        <span class="stat-value team-average">${this.teamWellness.averageMood.toFixed(1)}</span>
                        <span class="stat-trend">${trendIcon}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Responses Today</span>
                        <span class="stat-value team-responses">${this.teamWellness.totalResponses}</span>
                    </div>
                </div>
                <div class="wellness-chart">
                    ${this.renderMiniChart()}
                </div>
            </div>
        `;
    }

    renderMiniChart() {
        const maxMood = 5;
        const maxHeight = 40;
        
        return `
            <div class="chart-container">
                <div class="chart-title">This Week's Trend</div>
                <div class="chart-bars">
                    ${this.weekData.map((day, index) => {
                        const height = (day.averageMood / maxMood) * maxHeight;
                        return `
                            <div class="chart-bar" 
                                 style="height: ${height}px"
                                 title="${day.day}: ${day.averageMood.toFixed(1)}/5">
                                <span class="bar-label">${day.day}</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.addEventListener('click', (e) => {
            if (e.target.closest('.mood-option')) {
                const moodId = e.target.closest('.mood-option').dataset.mood;
                this.submitMood(moodId);
            }
        });
        
        // Keyboard navigation for mood options
        this.addEventListener('keydown', (e) => {
            if (e.target.classList.contains('mood-option')) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const moodId = e.target.dataset.mood;
                    this.submitMood(moodId);
                }
            }
        });
    }

    render() {
        this.innerHTML = `
            <div class="wellness-tracker">
                <div class="tracker-header">
                    <h3 class="tracker-title">
                        <svg class="tracker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        Wellness Check
                    </h3>
                    <div class="tracker-date">
                        ${new Date().toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                        })}
                    </div>
                </div>
                
                ${this.renderMoodSelector()}
                
                <div class="wellness-tip" style="display: none;">
                    <!-- Wellness tip will be inserted here -->
                </div>
                
                ${this.renderTeamStats()}
            </div>
        `;
        
        // If user already submitted today, show thank you state
        if (this.hasSubmittedToday) {
            setTimeout(() => this.showThankYouState(), 100);
        }
    }
}

// Register the component
customElements.define('wellness-tracker', WellnessTracker); 