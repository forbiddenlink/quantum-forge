// AI Assistant Component for Enhanced User Experience
class AIAssistant extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.conversation = [];
        this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeAI();
    }

    render() {
        this.innerHTML = `
            <div class="ai-assistant ${this.isOpen ? 'open' : ''}">
                <button class="ai-toggle" aria-label="Toggle AI Assistant" aria-expanded="${this.isOpen}">
                    <svg class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                </button>
                
                <div class="ai-panel" role="dialog" aria-label="AI Assistant">
                    <div class="ai-header">
                        <h3>Quantum AI Assistant</h3>
                        <button class="ai-close" aria-label="Close AI Assistant">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    <div class="ai-conversation">
                        <div class="ai-message ai-system">
                            <div class="ai-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div class="ai-content">
                                <p>Hello! I'm your AI assistant. How can I help you today?</p>
                                <div class="ai-suggestions">
                                    <button class="ai-suggestion" data-query="Show me my tasks">📋 Show my tasks</button>
                                    <button class="ai-suggestion" data-query="Schedule a meeting">📅 Schedule meeting</button>
                                    <button class="ai-suggestion" data-query="Find documents">📄 Find documents</button>
                                    <button class="ai-suggestion" data-query="Team availability">👥 Team status</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ai-input-container">
                        <input type="text" class="ai-input" placeholder="Ask me anything..." aria-label="AI Assistant input">
                        <button class="ai-send" aria-label="Send message">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Get references to elements
        const assistant = this.querySelector('.ai-assistant');
        const toggle = this.querySelector('.ai-toggle');
        const close = this.querySelector('.ai-close');
        const input = this.querySelector('.ai-input');
        const send = this.querySelector('.ai-send');
        const suggestions = this.querySelectorAll('.ai-suggestion');

        // Toggle AI panel
        if (toggle) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

        // Close AI panel
        if (close) {
            close.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
        }

        // Handle input submission
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Handle send button click
        if (send) {
            send.addEventListener('click', (e) => {
                e.preventDefault();
                this.sendMessage();
            });
        }
        
        // Handle suggestion clicks
        suggestions.forEach(suggestion => {
            suggestion.addEventListener('click', (e) => {
                const query = e.target.dataset.query;
                if (query) {
                    this.handleQuery(query);
                }
            });
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !assistant.contains(e.target)) {
                this.toggle();
            }
        });

        // Prevent panel close when clicking inside
        this.querySelector('.ai-panel')?.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const assistant = this.querySelector('.ai-assistant');
        const toggle = this.querySelector('.ai-toggle');
        
        if (assistant) {
            assistant.classList.toggle('open', this.isOpen);
        }
        
        if (toggle) {
            toggle.setAttribute('aria-expanded', this.isOpen);
        }
        
        if (this.isOpen) {
            this.querySelector('.ai-input')?.focus();
            this.analyzeUserContext();
        }
    }

    async handleQuery(query) {
        const input = this.querySelector('.ai-input');
        if (input) {
            input.value = '';
        }

        this.addUserMessage(query);
        
        // Simulate AI processing
        const response = await this.processQuery(query);
        this.addAIMessage(response);
        
        // Execute actions based on query
        this.executeAction(query);
    }

    async processQuery(query) {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const responses = {
            'Show me my tasks': 'Here are your current tasks:\n• Review Q4 budget proposal (Due: Tomorrow)\n• Team meeting preparation (Due: Friday)\n• Client presentation slides (Due: Next week)',
            'Schedule a meeting': 'I can help you schedule a meeting. What type of meeting would you like to create?',
            'Find documents': 'I found these relevant documents:\n• Q4 Strategy Document\n• Budget Guidelines 2024\n• Team Handbook',
            'Team availability': 'Current team status:\n• Sarah: Available (Online)\n• Mike: In meeting (2:00-3:00 PM)\n• Lisa: Available (Online)'
        };
        
        return responses[query] || `I understand you're asking about "${query}". Let me help you with that.`;
    }

    addUserMessage(message) {
        const conversation = this.querySelector('.ai-conversation');
        if (!conversation) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message ai-user';
        messageDiv.innerHTML = `
            <div class="ai-content">
                <p>${this.escapeHtml(message)}</p>
            </div>
            <div class="ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
        `;
        conversation.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addAIMessage(message) {
        const conversation = this.querySelector('.ai-conversation');
        if (!conversation) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message ai-system';
        messageDiv.innerHTML = `
            <div class="ai-avatar">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
            </div>
            <div class="ai-content">
                <p>${this.escapeHtml(message).replace(/\n/g, '<br>')}</p>
            </div>
        `;
        conversation.appendChild(messageDiv);
        this.scrollToBottom();
    }

    sendMessage() {
        const input = this.querySelector('.ai-input');
        if (!input) return;

        const message = input.value.trim();
        if (message) {
            this.handleQuery(message);
            input.value = '';
        }
    }

    executeAction(query) {
        // Execute actions based on user queries
        const queryLower = query.toLowerCase();
        if (queryLower.includes('tasks')) {
            document.querySelector('[data-page="tasks"]')?.click();
        } else if (queryLower.includes('meeting') || queryLower.includes('schedule')) {
            document.querySelector('[data-page="calendar"]')?.click();
        } else if (queryLower.includes('documents')) {
            document.querySelector('[data-page="documents"]')?.click();
        }
    }

    analyzeUserContext() {
        const currentTime = new Date().getHours();
        const userRole = this.userPreferences.role || 'employee';
        
        let contextMessage = '';
        if (currentTime < 12) {
            contextMessage = 'Good morning! I see you have 3 meetings scheduled today. Would you like me to help you prepare?';
        } else if (currentTime < 17) {
            contextMessage = 'Good afternoon! You have 2 tasks due today. Need help prioritizing?';
        } else {
            contextMessage = 'Good evening! Great work today. Would you like to review tomorrow\'s schedule?';
        }
        
        // Add contextual message if conversation is empty
        const conversation = this.querySelector('.ai-conversation');
        if (conversation?.children.length === 1) {
            setTimeout(() => {
                this.addAIMessage(contextMessage);
            }, 500);
        }
    }

    scrollToBottom() {
        const conversation = this.querySelector('.ai-conversation');
        if (conversation) {
            conversation.scrollTop = conversation.scrollHeight;
        }
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    initializeAI() {
        // Initialize AI with user preferences and context
        console.log('AI Assistant initialized');
    }
}

customElements.define('ai-assistant', AIAssistant); 