// Performance-Optimized Real-Time Stats Component
class PerformanceOptimizedStats extends HTMLElement {
    constructor() {
        super();
        this.stats = {
            activeUsers: 24,
            tasksCompleted: 156,
            meetingsToday: 8,
            documentsCreated: 42
        };
        this.updateInterval = null;
        this.isVisible = false;
        this.updateCounter = 0;
        this.maxUpdates = 15; // Limit updates to save resources
        this.lastUpdateTime = 0;
        this.updateThrottle = 5000; // Update every 5 seconds minimum
    }

    connectedCallback() {
        this.render();
        this.setupIntersectionObserver();
        this.startPerformanceOptimizedUpdates();
    }

    disconnectedCallback() {
        console.log('Performance Optimized Stats disconnecting...');
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Disconnect intersection observer
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        // Cancel animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        
        console.log('Performance Optimized Stats cleanup complete');
    }

    setupIntersectionObserver() {
        // Only update when component is visible
        this.observer = new IntersectionObserver((entries) => {
            this.isVisible = entries[0].isIntersecting;
            if (this.isVisible && !this.updateInterval) {
                this.startPerformanceOptimizedUpdates();
            } else if (!this.isVisible && this.updateInterval) {
                clearInterval(this.updateInterval);
                this.updateInterval = null;
            }
        });
        this.observer.observe(this);
    }

    render() {
        this.innerHTML = `
            <div class="optimized-stats-container">
                <div class="stats-header">
                    <h3 class="stats-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 20V10M18 20V4M6 20v-6"></path>
                        </svg>
                        Live Activity
                    </h3>
                    <div class="performance-indicator">
                        <span class="indicator-dot"></span>
                        <span class="indicator-text">Optimized</span>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card modern">
                        <div class="stat-icon">${window.svgIconLibrary ? window.svgIconLibrary.getIcon('team') : '👥'}</div>
                        <div class="stat-content">
                            <div class="stat-value" id="activeUsers">${this.stats.activeUsers}</div>
                            <div class="stat-label">Active Users</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+5%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card modern">
                        <div class="stat-icon">${window.svgIconLibrary ? window.svgIconLibrary.getIcon('check') : '✅'}</div>
                        <div class="stat-content">
                            <div class="stat-value" id="tasksCompleted">${this.stats.tasksCompleted}</div>
                            <div class="stat-label">Tasks Completed</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+12%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card modern">
                        <div class="stat-icon">${window.svgIconLibrary ? window.svgIconLibrary.getIcon('calendar') : '📅'}</div>
                        <div class="stat-content">
                            <div class="stat-value" id="meetingsToday">${this.stats.meetingsToday}</div>
                            <div class="stat-label">Meetings Today</div>
                            <div class="stat-trend neutral">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>0%</span>
                            </div>
                        </div>
                    </div>

                    <div class="stat-card modern">
                        <div class="stat-icon">📄</div>
                        <div class="stat-content">
                            <div class="stat-value" id="documentsCreated">${this.stats.documentsCreated}</div>
                            <div class="stat-label">Documents Created</div>
                            <div class="stat-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"></polyline>
                                </svg>
                                <span>+8%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="performance-info">
                    <div class="performance-stats">
                        <span class="performance-label">Performance Mode:</span>
                        <span class="performance-status">Optimized ${window.svgIconLibrary ? window.svgIconLibrary.getIcon('energy') : '⚡'}</span>
                    </div>
                    <div class="update-info">
                        <span class="update-counter">Updates: ${this.updateCounter}/${this.maxUpdates}</span>
                    </div>
                </div>
            </div>
        `;
    }

    startPerformanceOptimizedUpdates() {
        if (!this.isVisible || this.updateCounter >= this.maxUpdates) {
            return;
        }

        // Throttled updates
        this.updateInterval = setInterval(() => {
            const now = Date.now();
            if (now - this.lastUpdateTime < this.updateThrottle) {
                return;
            }

            this.lastUpdateTime = now;
            this.updateCounter++;

            // Only update if visible and under limit
            if (this.isVisible && this.updateCounter <= this.maxUpdates) {
                this.updateStatsOptimized();
                this.updatePerformanceInfo();
            }

            // Stop updates when limit reached
            if (this.updateCounter >= this.maxUpdates) {
                clearInterval(this.updateInterval);
                this.updateInterval = null;
                this.showResourceSavingMessage();
            }
        }, this.updateThrottle);
    }

    updateStatsOptimized() {
        // Smaller random changes for realistic updates
        const changes = {
            activeUsers: Math.floor(Math.random() * 3) - 1, // -1 to +1
            tasksCompleted: Math.floor(Math.random() * 5), // 0 to +4
            meetingsToday: Math.floor(Math.random() * 2), // 0 to +1
            documentsCreated: Math.floor(Math.random() * 3) // 0 to +2
        };

        // Apply changes with bounds checking
        this.stats.activeUsers = Math.max(15, Math.min(50, this.stats.activeUsers + changes.activeUsers));
        this.stats.tasksCompleted = Math.max(100, this.stats.tasksCompleted + changes.tasksCompleted);
        this.stats.meetingsToday = Math.max(5, Math.min(15, this.stats.meetingsToday + changes.meetingsToday));
        this.stats.documentsCreated = Math.max(20, this.stats.documentsCreated + changes.documentsCreated);

        // Update DOM efficiently using RAF
        requestAnimationFrame(() => {
            this.updateStatDisplay('activeUsers', this.stats.activeUsers);
            this.updateStatDisplay('tasksCompleted', this.stats.tasksCompleted);
            this.updateStatDisplay('meetingsToday', this.stats.meetingsToday);
            this.updateStatDisplay('documentsCreated', this.stats.documentsCreated);
        });
    }

    updateStatDisplay(statId, newValue) {
        const element = this.querySelector(`#${statId}`);
        if (element) {
            // Smooth transition using CSS
            element.style.transform = 'scale(1.05)';
            element.textContent = newValue;
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    updatePerformanceInfo() {
        const updateCounter = this.querySelector('.update-counter');
        if (updateCounter) {
            updateCounter.textContent = `Updates: ${this.updateCounter}/${this.maxUpdates}`;
        }

        const indicator = this.querySelector('.indicator-dot');
        if (indicator) {
            indicator.style.animation = 'pulse 1s ease-in-out';
            setTimeout(() => {
                indicator.style.animation = '';
            }, 1000);
        }
    }

    showResourceSavingMessage() {
        const container = this.querySelector('.optimized-stats-container');
        const message = document.createElement('div');
        message.className = 'resource-saving-message';
        message.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span>Performance optimized - Resources saved!</span>
        `;
        
        container.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }
}

// CSS styles for the optimized component
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .optimized-stats-container {
        background: var(--bg-elevated);
        border-radius: var(--radius-xl);
        padding: var(--space-6);
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-sm);
        transition: all var(--duration-normal) var(--ease);
    }

    .stats-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--space-6);
    }

    .stats-title {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--font-size-lg);
        font-weight: 600;
        color: var(--text-primary);
        margin: 0;
    }

    .stats-title svg {
        width: 20px;
        height: 20px;
        color: var(--primary-500);
    }

    .performance-indicator {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--font-size-xs);
        color: var(--success-600);
        font-weight: 500;
    }

    .indicator-dot {
        width: 8px;
        height: 8px;
        background: var(--success-500);
        border-radius: 50%;
    }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: var(--space-4);
        margin-bottom: var(--space-4);
    }

    .stat-card.modern {
        background: var(--bg-elevated);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: var(--space-4);
        transition: all var(--duration-fast) var(--ease);
        position: relative;
        overflow: hidden;
    }

    .stat-card.modern::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, var(--primary-50) 0%, transparent 50%);
        opacity: 0;
        transition: opacity var(--duration-fast) var(--ease);
    }

    .stat-card.modern:hover::before {
        opacity: 1;
    }

    .stat-card.modern:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--primary-200);
    }

    .stat-icon {
        font-size: var(--font-size-xl);
        margin-bottom: var(--space-2);
    }

    .stat-value {
        font-size: var(--font-size-2xl);
        font-weight: 700;
        color: var(--text-primary);
        transition: all var(--duration-fast) var(--ease);
    }

    .stat-label {
        font-size: var(--font-size-sm);
        color: var(--text-secondary);
        margin: var(--space-1) 0;
    }

    .stat-trend {
        display: flex;
        align-items: center;
        gap: var(--space-1);
        font-size: var(--font-size-xs);
        font-weight: 500;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-md);
    }

    .stat-trend.positive {
        color: var(--success-700);
        background: var(--success-50);
    }

    .stat-trend.neutral {
        color: var(--text-secondary);
        background: var(--gray-100);
    }

    .performance-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: var(--space-4);
        border-top: 1px solid var(--border-color);
        font-size: var(--font-size-xs);
        color: var(--text-secondary);
    }

    .performance-status {
        color: var(--success-600);
        font-weight: 600;
    }

    .resource-saving-message {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        background: var(--success-50);
        color: var(--success-700);
        padding: var(--space-3);
        border-radius: var(--radius-md);
        font-size: var(--font-size-sm);
        font-weight: 500;
        margin-top: var(--space-4);
        border: 1px solid var(--success-200);
        transition: opacity var(--duration-normal) var(--ease);
    }

    .resource-saving-message svg {
        width: 16px;
        height: 16px;
    }

    @media (max-width: 768px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .performance-info {
            flex-direction: column;
            gap: var(--space-2);
        }
    }
`;

document.head.appendChild(styleSheet);

customElements.define('performance-optimized-stats', PerformanceOptimizedStats); 