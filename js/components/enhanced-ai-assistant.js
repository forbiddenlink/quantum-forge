// Enhanced AI Assistant with Contest-Winning Features
class EnhancedAIAssistant extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.conversation = [];
        this.userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
        this.voiceEnabled = false;
        this.recognition = null;
        this.synthesis = null;
        this.contextualSuggestions = [];
        this.predictionEngine = null;
    }

    connectedCallback() {
        this.initializeVoiceRecognition();
        this.initializeSpeechSynthesis();
        this.render();
        this.setupEventListeners();
        this.initializeAI();
        this.startContextualAnalysis();
    }

    disconnectedCallback() {
        console.log('Enhanced AI Assistant disconnecting...');
        if (this.contextualAnalysisInterval) {
            clearInterval(this.contextualAnalysisInterval);
            this.contextualAnalysisInterval = null;
        }
        console.log('Enhanced AI Assistant cleanup complete');
    }

    render() {
        this.innerHTML = `
            <div class="enhanced-ai-assistant ${this.isOpen ? 'open' : ''}">
                <button class="ai-toggle enhanced" aria-label="Toggle AI Assistant" aria-expanded="${this.isOpen}">
                    <div class="ai-toggle-content">
                        <svg class="ai-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        <div class="ai-status">
                            <span class="status-dot ${this.voiceEnabled ? 'listening' : ''}"></span>
                        </div>
                    </div>
                </button>
                
                <div class="ai-panel enhanced" role="dialog" aria-label="Enhanced AI Assistant">
                    <div class="ai-header">
                        <div class="ai-title">
                            <h3>Quantum AI Assistant</h3>
                            <span class="ai-subtitle">Powered by Advanced AI</span>
                        </div>
                        <div class="ai-controls">
                            <button class="ai-voice-toggle" aria-label="Toggle voice mode">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </button>
                            <button class="ai-close" aria-label="Close AI Assistant">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="ai-conversation">
                        <div class="ai-message ai-system">
                            <div class="ai-avatar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                            </div>
                            <div class="ai-content">
                                <p>Hello! I'm your enhanced AI assistant. I can help you with tasks, answer questions, and even understand voice commands!</p>
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
                        <div class="input-wrapper">
                            <input type="text" class="ai-input enhanced" placeholder="Ask me anything or use voice..." aria-label="AI Assistant input">
                            <button class="ai-voice-btn" aria-label="Voice input">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                    <line x1="12" y1="19" x2="12" y2="23"></line>
                                    <line x1="8" y1="23" x2="16" y2="23"></line>
                                </svg>
                            </button>
                        </div>
                        <button class="ai-send enhanced" aria-label="Send message">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>

                    <div class="ai-predictions">
                        <h4>Smart Suggestions</h4>
                        <div class="predictions-list">
                            ${this.renderPredictions()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderPredictions() {
        const predictions = [
            { text: 'Complete Q4 budget review', confidence: 0.95, type: 'task' },
            { text: 'Schedule team retrospective', confidence: 0.88, type: 'meeting' },
            { text: 'Review design system updates', confidence: 0.82, type: 'document' },
            { text: 'Check team availability', confidence: 0.78, type: 'collaboration' }
        ];

        return predictions.map(prediction => `
            <div class="prediction-item" data-prediction="${prediction.text}">
                <div class="prediction-content">
                    <span class="prediction-text">${prediction.text}</span>
                    <span class="prediction-confidence">${Math.round(prediction.confidence * 100)}%</span>
                </div>
                <div class="prediction-type ${prediction.type}">${this.getTypeIcon(prediction.type)}</div>
            </div>
        `).join('');
    }

    getTypeIcon(type) {
        const icons = {
            task: '📋',
            meeting: '📅',
            document: '📄',
            collaboration: '👥'
        };
        return icons[type] || '📋';
    }

    initializeVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onstart = () => {
                this.voiceEnabled = true;
                this.updateVoiceStatus();
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.handleVoiceInput(transcript);
            };

            this.recognition.onend = () => {
                this.voiceEnabled = false;
                this.updateVoiceStatus();
            };
        }
    }

    initializeSpeechSynthesis() {
        if ('speechSynthesis' in window) {
            this.synthesis = window.speechSynthesis;
        }
    }

    updateVoiceStatus() {
        const statusDot = this.querySelector('.status-dot');
        const voiceBtn = this.querySelector('.ai-voice-btn');
        
        if (statusDot) {
            statusDot.classList.toggle('listening', this.voiceEnabled);
        }
        
        if (voiceBtn) {
            voiceBtn.classList.toggle('active', this.voiceEnabled);
        }
    }

    handleVoiceInput(transcript) {
        const input = this.querySelector('.ai-input');
        if (input) {
            input.value = transcript;
        }
        this.handleQuery(transcript);
    }

    speakResponse(text) {
        if (this.synthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.9;
            utterance.pitch = 1;
            this.synthesis.speak(utterance);
        }
    }

    setupEventListeners() {
        const assistant = this.querySelector('.enhanced-ai-assistant');
        const toggle = this.querySelector('.ai-toggle');
        const close = this.querySelector('.ai-close');
        const input = this.querySelector('.ai-input');
        const send = this.querySelector('.ai-send');
        const voiceBtn = this.querySelector('.ai-voice-btn');
        const suggestions = this.querySelectorAll('.ai-suggestion');
        const predictions = this.querySelectorAll('.prediction-item');

        toggle?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        close?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        send?.addEventListener('click', (e) => {
            e.preventDefault();
            this.sendMessage();
        });

        voiceBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleVoiceInput();
        });

        suggestions.forEach(suggestion => {
            suggestion.addEventListener('click', (e) => {
                const query = e.target.dataset.query;
                if (query) {
                    this.handleQuery(query);
                }
            });
        });

        predictions.forEach(prediction => {
            prediction.addEventListener('click', (e) => {
                const text = e.currentTarget.dataset.prediction;
                if (text) {
                    this.handleQuery(text);
                }
            });
        });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !assistant.contains(e.target)) {
                this.toggle();
            }
        });
    }

    toggleVoiceInput() {
        if (this.recognition) {
            if (this.voiceEnabled) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        }
    }

    async handleQuery(query) {
        const input = this.querySelector('.ai-input');
        if (input) {
            input.value = '';
        }

        this.addUserMessage(query);
        
        // Enhanced AI processing with context
        const response = await this.processEnhancedQuery(query);
        this.addAIMessage(response);
        
        // Speak response if voice is enabled
        if (this.voiceEnabled) {
            this.speakResponse(response);
        }
        
        this.executeAction(query);
        this.updatePredictions();
    }

    async processEnhancedQuery(query) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const enhancedResponses = {
            'Show me my tasks': 'Here are your current tasks:\n• Review Q4 budget proposal (Due: Tomorrow)\n• Team meeting preparation (Due: Friday)\n• Client presentation slides (Due: Next week)\n\nWould you like me to help prioritize these?',
            'Schedule a meeting': 'I can help you schedule a meeting. What type of meeting would you like to create?\n\nOptions:\n• Team standup\n• Project review\n• Client meeting\n• One-on-one',
            'Find documents': 'I found these relevant documents:\n• Q4 Strategy Document (Updated 2 hours ago)\n• Budget Guidelines 2024 (Most viewed)\n• Team Handbook (Recently updated)\n\nWould you like me to open any of these?',
            'Team availability': 'Current team status:\n• Sarah: Available (Online) - Working on Q4 budget\n• Mike: In meeting (2:00-3:00 PM) - Client call\n• Lisa: Available (Online) - Reviewing documents\n\nWould you like to schedule a meeting with any of them?'
        };
        
        return enhancedResponses[query] || `I understand you're asking about "${query}". Let me help you with that. I can also provide more specific assistance if you'd like.`;
    }

    updatePredictions() {
        // Update predictions based on user behavior
        const predictionsList = this.querySelector('.predictions-list');
        if (predictionsList) {
            const newPredictions = this.generateNewPredictions();
            predictionsList.innerHTML = newPredictions.map(prediction => `
                <div class="prediction-item" data-prediction="${prediction.text}">
                    <div class="prediction-content">
                        <span class="prediction-text">${prediction.text}</span>
                        <span class="prediction-confidence">${Math.round(prediction.confidence * 100)}%</span>
                    </div>
                    <div class="prediction-type ${prediction.type}">${this.getTypeIcon(prediction.type)}</div>
                </div>
            `).join('');
        }
    }

    generateNewPredictions() {
        // Generate contextual predictions based on user behavior
        return [
            { text: 'Update project status', confidence: 0.92, type: 'task' },
            { text: 'Review team performance', confidence: 0.85, type: 'collaboration' },
            { text: 'Prepare weekly report', confidence: 0.78, type: 'document' },
            { text: 'Schedule 1:1 meetings', confidence: 0.75, type: 'meeting' }
        ];
    }

    startContextualAnalysis() {
        // Analyze user behavior for better predictions - STORE THE INTERVAL
        this.contextualAnalysisInterval = setInterval(() => {
            this.analyzeUserContext();
        }, 60000); // Every minute
    }

    analyzeUserContext() {
        const currentTime = new Date().getHours();
        const userRole = this.userPreferences.role || 'employee';
        
        // Update contextual suggestions based on time and role
        this.contextualSuggestions = this.generateContextualSuggestions(currentTime, userRole);
    }

    generateContextualSuggestions(time, role) {
        const suggestions = [];
        
        if (time < 12) {
            suggestions.push('Review today\'s priorities');
            suggestions.push('Check team availability');
        } else if (time < 17) {
            suggestions.push('Update project status');
            suggestions.push('Schedule tomorrow\'s tasks');
        } else {
            suggestions.push('Prepare daily summary');
            suggestions.push('Plan for tomorrow');
        }
        
        if (role === 'manager') {
            suggestions.push('Review team performance');
            suggestions.push('Schedule 1:1 meetings');
        }
        
        return suggestions;
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
        const queryLower = query.toLowerCase();
        if (queryLower.includes('tasks')) {
            document.querySelector('[data-page="tasks"]')?.click();
        } else if (queryLower.includes('meeting') || queryLower.includes('schedule')) {
            document.querySelector('[data-page="calendar"]')?.click();
        } else if (queryLower.includes('documents')) {
            document.querySelector('[data-page="documents"]')?.click();
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

    toggle() {
        this.isOpen = !this.isOpen;
        const assistant = this.querySelector('.enhanced-ai-assistant');
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

    initializeAI() {
        console.log('Enhanced AI Assistant initialized with voice capabilities');
    }
}

customElements.define('enhanced-ai-assistant', EnhancedAIAssistant); 