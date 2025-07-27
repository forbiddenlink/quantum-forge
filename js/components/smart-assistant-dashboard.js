class SmartAssistantDashboard extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false;
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        this.innerHTML = `
            <div class="smart-assistant-container">
                <div class="ai-insights-header">
                    <h2>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                            <path d="M12 6v6l4 2"/>
                        </svg>
                        AI Assistant Insights
                    </h2>
                    <div class="ai-status">Learning from your workflow</div>
                </div>
                
                <div class="insights-grid">
                    <div class="insight-card schedule-optimization">
                        <h3>Schedule Optimization</h3>
                        <p>Based on your work patterns, consider:</p>
                        <ul>
                            <li>Schedule deep work: 10 AM - 12 PM</li>
                            <li>Take breaks: 3:15 PM - 3:30 PM</li>
                            <li>Team sync optimal time: 2 PM</li>
                        </ul>
                    </div>
                    
                    <div class="insight-card task-priorities">
                        <h3>Smart Task Prioritization</h3>
                        <div class="priority-list">
                            <div class="priority-item high">
                                <span>Project Alpha deadline</span>
                                <small>Impact: High</small>
                            </div>
                            <div class="priority-item medium">
                                <span>Team review feedback</span>
                                <small>Impact: Medium</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="insight-card meeting-summary">
                        <h3>Latest Meeting Summary</h3>
                        <div class="summary-content">
                            <h4>Design Review - 10:00 AM</h4>
                            <ul>
                                <li>Updated UI components approved</li>
                                <li>New color scheme pending review</li>
                                <li>Next steps assigned to design team</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="ai-suggestions">
                    <h3>Personalized Suggestions</h3>
                    <div class="suggestion-list">
                        <div class="suggestion-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                            </svg>
                            <span>Your most productive hours are between 9 AM - 11 AM</span>
                        </div>
                        <div class="suggestion-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>Consider scheduling breaks after 2-hour focus sessions</span>
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
            .smart-assistant-container {
                padding: 1.5rem;
                background: var(--bg-elevated);
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-lg);
            }
            
            .ai-insights-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            
            .ai-insights-header h2 {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin: 0;
                font-size: 1.5rem;
                color: var(--text-primary);
            }
            
            .ai-insights-header h2 svg {
                width: 24px;
                height: 24px;
                stroke: var(--primary-500);
            }
            
            .ai-status {
                padding: 0.5rem 1rem;
                background: var(--primary-50);
                color: var(--primary-700);
                border-radius: var(--radius-full);
                font-size: 0.875rem;
            }
            
            .insights-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1rem;
                margin-bottom: 1.5rem;
            }
            
            .insight-card {
                padding: 1.25rem;
                background: var(--bg-subtle);
                border-radius: var(--radius-md);
                border: 1px solid var(--border-color);
            }
            
            .insight-card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.125rem;
                color: var(--text-primary);
            }
            
            .priority-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            
            .priority-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem;
                border-radius: var(--radius-md);
                background: var(--bg-elevated);
            }
            
            .priority-item.high {
                border-left: 4px solid var(--error-500);
            }
            
            .priority-item.medium {
                border-left: 4px solid var(--warning-500);
            }
            
            .ai-suggestions {
                margin-top: 1.5rem;
            }
            
            .suggestion-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .suggestion-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 1rem;
                background: var(--primary-50);
                border-radius: var(--radius-md);
                color: var(--primary-700);
            }
            
            .suggestion-item svg {
                width: 20px;
                height: 20px;
                stroke: var(--primary-500);
            }
        `;
        
        if (!document.querySelector('#smart-assistant-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'smart-assistant-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
    }
    
    setupEventListeners() {
        // Add interaction handlers here
    }
}

customElements.define('smart-assistant-dashboard', SmartAssistantDashboard);
