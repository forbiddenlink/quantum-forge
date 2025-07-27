class SmartInsights extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false;
        this.animationFrame = null;
    }
    
    connectedCallback() {
        if (this.isInitialized) return;
        this.render();
        this.setupEventListeners();
        this.isInitialized = true;
    }
    
    disconnectedCallback() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }

    render() {
        this.innerHTML = `
            <section class="smart-insights-section">
                <div class="insights-header">
                    <h2>Smart Insights</h2>
                    <div class="insights-controls">
                        <button class="refresh-btn" aria-label="Refresh insights">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M23 4v6h-6"></path>
                                <path d="M1 20v-6h6"></path>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path>
                                <path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="insights-grid">
                    <div class="insight-card productivity">
                        <h3>Team Productivity</h3>
                        <div class="insight-content">
                            <div class="productivity-chart"></div>
                        </div>
                    </div>
                    <div class="insight-card trends">
                        <h3>Emerging Trends</h3>
                        <div class="insight-content">
                            <ul class="trends-list">
                                <li>Increased collaboration in Project X</li>
                                <li>Higher engagement in team meetings</li>
                                <li>Improved documentation quality</li>
                            </ul>
                        </div>
                    </div>
                    <div class="insight-card recommendations">
                        <h3>Recommendations</h3>
                        <div class="insight-content">
                            <ul class="recommendations-list">
                                <li>Schedule team building activity</li>
                                <li>Review project milestones</li>
                                <li>Update documentation</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.applyThemeConsistency();
    }

    setupEventListeners() {
        const refreshBtn = this.querySelector('.refresh-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => this.refreshInsights());
        }
    }

    applyThemeConsistency() {
        const section = this.querySelector('.smart-insights-section');
        if (section) {
            section.style.backgroundColor = 'var(--component-background)';
            section.style.color = 'var(--text-primary)';
        }
    }

    refreshInsights() {
        // Implement refresh logic here
        this.dispatchEvent(new CustomEvent('insights-refreshed', {
            bubbles: true
        }));
    }
}

customElements.define('smart-insights', SmartInsights);
