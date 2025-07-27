class TeamWellnessHub extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false;
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        this.innerHTML = `
            <div class="wellness-hub-container">
                <div class="wellness-header">
                    <h2>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                        Team Wellness Hub
                    </h2>
                    <div class="team-mood">
                        <span class="mood-label">Team Mood:</span>
                        <span class="mood-score positive">88%</span>
                    </div>
                </div>
                
                <div class="wellness-metrics">
                    <div class="metric-card work-life">
                        <div class="metric-header">
                            <h3>Work-Life Balance</h3>
                            <div class="score">85%</div>
                        </div>
                        <div class="metric-chart">
                            <div class="progress-ring">
                                <svg viewBox="0 0 120 120">
                                    <circle class="progress-ring-circle-bg" cx="60" cy="60" r="54"/>
                                    <circle class="progress-ring-circle" cx="60" cy="60" r="54"/>
                                </svg>
                                <div class="progress-label">Good</div>
                            </div>
                        </div>
                        <div class="metric-insights">
                            <p>Great balance this week! Keep it up.</p>
                        </div>
                    </div>
                    
                    <div class="metric-card team-engagement">
                        <div class="metric-header">
                            <h3>Team Engagement</h3>
                            <div class="score">92%</div>
                        </div>
                        <div class="engagement-stats">
                            <div class="stat-item">
                                <span class="stat-label">Active Projects</span>
                                <span class="stat-value">12</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Collaboration Rate</span>
                                <span class="stat-value">High</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wellness-challenges">
                    <h3>Active Challenges</h3>
                    <div class="challenge-grid">
                        <div class="challenge-card">
                            <div class="challenge-icon">🏃‍♂️</div>
                            <h4>Step Challenge</h4>
                            <p>10,000 steps daily</p>
                            <div class="participants">
                                <div class="avatar-stack">
                                    <!-- Add participant avatars here -->
                                </div>
                                <span>8 participating</span>
                            </div>
                            <button class="btn join-challenge">Join Challenge</button>
                        </div>
                        
                        <div class="challenge-card">
                            <div class="challenge-icon">🧘‍♀️</div>
                            <h4>Mindfulness Minutes</h4>
                            <p>15 min daily meditation</p>
                            <div class="participants">
                                <div class="avatar-stack">
                                    <!-- Add participant avatars here -->
                                </div>
                                <span>12 participating</span>
                            </div>
                            <button class="btn join-challenge">Join Challenge</button>
                        </div>
                    </div>
                </div>
                
                <div class="team-building">
                    <h3>Team Building Activities</h3>
                    <div class="activity-suggestions">
                        <div class="activity-card">
                            <div class="activity-type">Virtual</div>
                            <h4>Coffee Chat Roulette</h4>
                            <p>Random 15-min coffee chats with teammates</p>
                            <button class="btn schedule-activity">Schedule</button>
                        </div>
                        
                        <div class="activity-card">
                            <div class="activity-type">In-Person</div>
                            <h4>Team Lunch & Learn</h4>
                            <p>Share skills over lunch</p>
                            <button class="btn schedule-activity">Schedule</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupStyles();
        this.setupEventListeners();
        this.initializeCharts();
        this.isInitialized = true;
    }
    
    setupStyles() {
        const styles = `
            .wellness-hub-container {
                padding: 1.5rem;
                background: var(--bg-elevated);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
            }
            
            .wellness-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .wellness-header h2 {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin: 0;
                font-size: 1.5rem;
            }
            
            .wellness-header h2 svg {
                width: 24px;
                height: 24px;
                stroke: var(--primary-500);
            }
            
            .team-mood {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: var(--success-50);
                border-radius: var(--radius-full);
                color: var(--success-700);
            }
            
            .mood-score.positive {
                color: var(--success-600);
                font-weight: 600;
            }
            
            .wellness-metrics {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-bottom: 2rem;
            }
            
            .metric-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .metric-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .metric-header h3 {
                margin: 0;
                font-size: 1.125rem;
            }
            
            .score {
                padding: 0.25rem 0.75rem;
                background: var(--success-50);
                color: var(--success-700);
                border-radius: var(--radius-full);
                font-weight: 600;
            }
            
            .progress-ring {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto;
            }
            
            .progress-ring svg {
                transform: rotate(-90deg);
            }
            
            .progress-ring-circle-bg {
                fill: none;
                stroke: var(--bg-subtle);
                stroke-width: 8;
            }
            
            .progress-ring-circle {
                fill: none;
                stroke: var(--primary-500);
                stroke-width: 8;
                stroke-dasharray: 339.292;
                stroke-dashoffset: 50;
                transition: stroke-dashoffset 0.35s;
            }
            
            .progress-label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--primary-700);
            }
            
            .challenge-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .challenge-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
                text-align: center;
            }
            
            .challenge-icon {
                font-size: 2rem;
                margin-bottom: 0.75rem;
            }
            
            .avatar-stack {
                display: flex;
                margin-right: 0.5rem;
            }
            
            .btn {
                padding: 0.5rem 1rem;
                border-radius: var(--radius-md);
                border: none;
                background: var(--primary-500);
                color: white;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .btn:hover {
                background: var(--primary-600);
                transform: translateY(-1px);
            }
            
            .activity-suggestions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .activity-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .activity-type {
                display: inline-block;
                padding: 0.25rem 0.75rem;
                background: var(--primary-50);
                color: var(--primary-700);
                border-radius: var(--radius-full);
                font-size: 0.875rem;
                margin-bottom: 0.75rem;
            }
        `;
        
        if (!document.querySelector('#wellness-hub-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'wellness-hub-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }
    
    setupEventListeners() {
        this.querySelectorAll('.join-challenge').forEach(btn => {
            btn.addEventListener('click', () => {
                // Handle challenge join
                const challengeName = btn.closest('.challenge-card').querySelector('h4').textContent;
                this.joinChallenge(challengeName);
            });
        });
        
        this.querySelectorAll('.schedule-activity').forEach(btn => {
            btn.addEventListener('click', () => {
                // Handle activity scheduling
                const activityName = btn.closest('.activity-card').querySelector('h4').textContent;
                this.scheduleActivity(activityName);
            });
        });
    }
    
    initializeCharts() {
        // Initialize progress rings and other charts
        const circle = this.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        
        // Set progress to 85%
        const offset = circumference - (85 / 100 * circumference);
        circle.style.strokeDashoffset = offset;
    }
    
    joinChallenge(challengeName) {
        // Handle challenge joining logic
        console.log(`Joined challenge: ${challengeName}`);
    }
    
    scheduleActivity(activityName) {
        // Handle activity scheduling logic
        console.log(`Scheduling activity: ${activityName}`);
    }
}

customElements.define('team-wellness-hub', TeamWellnessHub);
