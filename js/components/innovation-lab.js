class InnovationLab extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false;
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        this.innerHTML = `
            <div class="innovation-lab-container">
                <div class="lab-header">
                    <h2>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        Innovation Lab
                    </h2>
                    <button class="btn primary new-idea-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                        New Idea
                    </button>
                </div>

                <div class="idea-showcase">
                    <div class="trending-ideas">
                        <h3>Trending Ideas</h3>
                        <div class="idea-cards">
                            <div class="idea-card">
                                <div class="idea-header">
                                    <div class="idea-category">AI & Automation</div>
                                    <div class="idea-votes">
                                        <button class="vote-btn" aria-label="Vote up">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M12 20V4M5 11l7-7 7 7"/>
                                            </svg>
                                        </button>
                                        <span class="vote-count">42</span>
                                    </div>
                                </div>
                                <h4>Smart Meeting Assistant</h4>
                                <p>AI-powered tool to summarize meetings and track action items automatically.</p>
                                <div class="idea-meta">
                                    <div class="idea-author">
                                        <img src="../assets/avatars/sarah.jpg" alt="Sarah Chen" />
                                        <span>Sarah Chen</span>
                                    </div>
                                    <div class="idea-stats">
                                        <span>4 collaborators</span>
                                        <span>2 days ago</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="idea-card">
                                <div class="idea-header">
                                    <div class="idea-category">Sustainability</div>
                                    <div class="idea-votes">
                                        <button class="vote-btn" aria-label="Vote up">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M12 20V4M5 11l7-7 7 7"/>
                                            </svg>
                                        </button>
                                        <span class="vote-count">38</span>
                                    </div>
                                </div>
                                <h4>Green Office Initiative</h4>
                                <p>Smart resource management system to reduce office waste and energy consumption.</p>
                                <div class="idea-meta">
                                    <div class="idea-author">
                                        <img src="../assets/avatars/alex.jpg" alt="Alex Johnson" />
                                        <span>Alex Johnson</span>
                                    </div>
                                    <div class="idea-stats">
                                        <span>6 collaborators</span>
                                        <span>3 days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="innovation-metrics">
                        <div class="metric-card">
                            <h3>Innovation Pulse</h3>
                            <div class="metric-value">
                                <span class="number">89</span>
                                <span class="label">Activity Score</span>
                            </div>
                            <div class="metric-chart">
                                <!-- Add pulse chart here -->
                            </div>
                        </div>
                        
                        <div class="metric-card">
                            <h3>Collaboration Impact</h3>
                            <div class="impact-stats">
                                <div class="stat">
                                    <span class="number">24</span>
                                    <span class="label">Active Projects</span>
                                </div>
                                <div class="stat">
                                    <span class="number">142</span>
                                    <span class="label">Contributors</span>
                                </div>
                                <div class="stat">
                                    <span class="number">8</span>
                                    <span class="label">Departments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="innovation-resources">
                    <h3>Resource Matching</h3>
                    <div class="resource-cards">
                        <div class="resource-card">
                            <div class="resource-icon">🎯</div>
                            <div class="resource-details">
                                <h4>Project Funding</h4>
                                <p>$50,000 available for innovative projects</p>
                                <button class="btn secondary">Apply Now</button>
                            </div>
                        </div>
                        
                        <div class="resource-card">
                            <div class="resource-icon">👥</div>
                            <div class="resource-details">
                                <h4>Mentor Network</h4>
                                <p>12 industry experts available</p>
                                <button class="btn secondary">Connect</button>
                            </div>
                        </div>
                        
                        <div class="resource-card">
                            <div class="resource-icon">🔧</div>
                            <div class="resource-details">
                                <h4>Development Tools</h4>
                                <p>Premium tools and resources</p>
                                <button class="btn secondary">Access</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupStyles();
        this.setupEventListeners();
        this.isInitialized = true;
    }
    
    setupStyles() {
        const styles = `
            .innovation-lab-container {
                padding: 1.5rem;
                background: var(--bg-elevated);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
            }
            
            .lab-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .lab-header h2 {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin: 0;
                font-size: 1.5rem;
            }
            
            .lab-header h2 svg {
                width: 24px;
                height: 24px;
                stroke: var(--primary-500);
            }
            
            .new-idea-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: var(--primary-500);
                color: white;
                border: none;
                border-radius: var(--radius-md);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .new-idea-btn:hover {
                background: var(--primary-600);
                transform: translateY(-1px);
            }
            
            .idea-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .idea-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .idea-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .idea-category {
                padding: 0.25rem 0.75rem;
                background: var(--primary-50);
                color: var(--primary-700);
                border-radius: var(--radius-full);
                font-size: 0.875rem;
            }
            
            .idea-votes {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .vote-btn {
                padding: 0.25rem;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-secondary);
                transition: all 0.2s ease;
            }
            
            .vote-btn:hover {
                color: var(--primary-500);
                transform: translateY(-1px);
            }
            
            .vote-btn svg {
                width: 16px;
                height: 16px;
            }
            
            .idea-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
            }
            
            .idea-author {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .idea-author img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }
            
            .innovation-metrics {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 2rem;
            }
            
            .metric-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .metric-value {
                text-align: center;
                margin: 1rem 0;
            }
            
            .metric-value .number {
                font-size: 2rem;
                font-weight: 700;
                color: var(--primary-500);
            }
            
            .impact-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                text-align: center;
            }
            
            .resource-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .resource-card {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-lg);
                border: 1px solid var(--border-color);
            }
            
            .resource-icon {
                font-size: 2rem;
            }
            
            .resource-details {
                flex: 1;
            }
            
            .resource-details h4 {
                margin: 0 0 0.5rem 0;
            }
            
            .resource-details p {
                margin: 0 0 1rem 0;
                color: var(--text-secondary);
            }
        `;
        
        if (!document.querySelector('#innovation-lab-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'innovation-lab-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }
    
    setupEventListeners() {
        this.querySelector('.new-idea-btn').addEventListener('click', () => {
            this.openNewIdeaModal();
        });
        
        this.querySelectorAll('.vote-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const voteCount = e.target.closest('.idea-votes').querySelector('.vote-count');
                const currentVotes = parseInt(voteCount.textContent);
                voteCount.textContent = currentVotes + 1;
                btn.classList.add('voted');
            });
        });
    }
    
    openNewIdeaModal() {
        // Implement new idea modal
        console.log('Opening new idea modal');
    }
}

customElements.define('innovation-lab', InnovationLab);
