class HelpDialog extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        this.innerHTML = `
            <div class="help-dialog ${this.isOpen ? 'open' : ''}" role="dialog" aria-labelledby="help-title">
                <div class="help-dialog-backdrop"></div>
                <div class="help-dialog-content">
                    <header class="help-dialog-header">
                        <h2 id="help-title">How can we help?</h2>
                        <button class="close-button" aria-label="Close help dialog">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </header>
                    
                    <div class="help-options">
                        <a href="/pages/helpdesk.html" class="help-option">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                            </svg>
                            <div>
                                <h3>Contact Support</h3>
                                <p>Get help from our support team</p>
                            </div>
                        </a>
                        
                        <a href="/pages/handbook.html" class="help-option">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                            </svg>
                            <div>
                                <h3>Documentation</h3>
                                <p>Browse our help articles</p>
                            </div>
                        </a>
                        
                        <a href="/pages/training.html" class="help-option">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                            <div>
                                <h3>Training</h3>
                                <p>Learn with guided tutorials</p>
                            </div>
                        </a>
                        
                        <button class="help-option chat-option">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <div>
                                <h3>Quick Help</h3>
                                <p>Chat with our AI assistant</p>
                            </div>
                        </button>
                    </div>

                    <footer class="help-dialog-footer">
                        <div class="quick-links">
                            <a href="/pages/resources.html">Resources</a>
                            <a href="/pages/team.html">Team Directory</a>
                            <a href="/pages/handbook.html#faq">FAQ</a>
                        </div>
                    </footer>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const closeButton = this.querySelector('.close-button');
        const backdrop = this.querySelector('.help-dialog-backdrop');
        const chatOption = this.querySelector('.chat-option');

        closeButton?.addEventListener('click', () => this.close());
        backdrop?.addEventListener('click', () => this.close());
        
        chatOption?.addEventListener('click', () => {
            // In a real app, this would open the AI chat interface
            console.log('Opening AI chat...');
            this.close();
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.render();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.isOpen = false;
        this.render();
        document.body.style.overflow = '';
    }
}

customElements.define('help-dialog', HelpDialog); 