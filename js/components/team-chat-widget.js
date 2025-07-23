// Modern Team Chat Widget - Contest Enhancement
class TeamChatWidget extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.isMinimized = false;
        this.onlineUsers = this.generateMockUsers();
        this.messages = this.generateMockMessages();
        this.currentUser = { id: 'user-1', name: 'Liz Thompson', avatar: '👩‍💼', status: 'online' };
        this.typingUsers = [];
        this.messageCount = 0;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.startRealTimeSimulation();
        console.log('🗨️ Team Chat Widget initialized');
    }

    disconnectedCallback() {
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }
    }

    generateMockUsers() {
        return [
            { id: 'user-2', name: 'Alex Chen', avatar: '👨‍💻', status: 'online', lastSeen: 'now' },
            { id: 'user-3', name: 'Sarah Johnson', avatar: '👩‍🎨', status: 'online', lastSeen: 'now' },
            { id: 'user-4', name: 'Mike Rodriguez', avatar: '👨‍🔬', status: 'away', lastSeen: '5 min ago' },
            { id: 'user-5', name: 'Emma Wilson', avatar: '👩‍📊', status: 'online', lastSeen: 'now' },
            { id: 'user-6', name: 'David Kim', avatar: '👨‍⚡', status: 'busy', lastSeen: '2 min ago' }
        ];
    }

    generateMockMessages() {
        return [
            {
                id: 1,
                userId: 'user-2',
                userName: 'Alex Chen',
                avatar: '👨‍💻',
                message: 'Hey team! Just finished the new API documentation. Check it out! 🚀',
                timestamp: new Date(Date.now() - 15 * 60000),
                type: 'text'
            },
            {
                id: 2,
                userId: 'user-3',
                userName: 'Sarah Johnson',
                avatar: '👩‍🎨',
                message: 'Great work Alex! The new design mockups are ready for review too 🎨',
                timestamp: new Date(Date.now() - 10 * 60000),
                type: 'text'
            },
            {
                id: 3,
                userId: 'user-5',
                userName: 'Emma Wilson',
                avatar: '👩‍📊',
                message: 'Perfect timing! I\'ll review both after the 2pm meeting ✅',
                timestamp: new Date(Date.now() - 5 * 60000),
                type: 'text'
            }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="team-chat-widget ${this.isOpen ? 'open' : ''} ${this.isMinimized ? 'minimized' : ''}" role="complementary" aria-label="Team Chat">
                <!-- Chat Toggle Button -->
                <button class="chat-toggle-btn" aria-label="Toggle team chat" aria-expanded="${this.isOpen}">
                    <div class="chat-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span class="unread-indicator" ${this.messageCount === 0 ? 'style="display: none"' : ''}>${this.messageCount}</span>
                    </div>
                    <span class="chat-label">Team Chat</span>
                </button>

                <!-- Chat Panel -->
                <div class="chat-panel" role="dialog" aria-label="Team chat panel">
                    <!-- Chat Header -->
                    <div class="chat-header">
                        <div class="chat-header-content">
                            <h3>Team Chat</h3>
                            <div class="online-count">
                                <span class="online-indicator"></span>
                                ${this.onlineUsers.filter(u => u.status === 'online').length + 1} online
                            </div>
                        </div>
                        <div class="chat-header-actions">
                            <button class="chat-action-btn" title="Minimize" aria-label="Minimize chat">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                            </button>
                            <button class="chat-close-btn" title="Close chat" aria-label="Close chat">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Online Users -->
                    <div class="online-users-section">
                        <div class="online-users-scroll">
                            ${this.renderOnlineUsers()}
                        </div>
                    </div>

                    <!-- Messages Area -->
                    <div class="chat-messages" id="chatMessages" role="log" aria-live="polite" aria-label="Chat messages">
                        ${this.renderMessages()}
                    </div>

                    <!-- Typing Indicator -->
                    <div class="typing-indicator ${this.typingUsers.length === 0 ? 'hidden' : ''}" id="typingIndicator">
                        <div class="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span class="typing-text">${this.getTypingText()}</span>
                    </div>

                    <!-- Message Input -->
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <input 
                                type="text" 
                                class="chat-input" 
                                placeholder="Type a message..." 
                                maxlength="500"
                                aria-label="Type a message"
                                autocomplete="off"
                            >
                            <button class="chat-send-btn" aria-label="Send message" disabled>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </div>
                        <div class="chat-input-actions">
                            <button class="input-action-btn" title="Add emoji" aria-label="Add emoji">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                                </svg>
                            </button>
                            <button class="input-action-btn" title="Attach file" aria-label="Attach file">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderOnlineUsers() {
        const allUsers = [this.currentUser, ...this.onlineUsers];
        return allUsers.map(user => `
            <div class="online-user ${user.status}" data-user-id="${user.id}">
                <div class="user-avatar">
                    <span class="avatar-emoji">${user.avatar}</span>
                    <span class="status-dot ${user.status}"></span>
                </div>
                <span class="user-name">${user.name}</span>
            </div>
        `).join('');
    }

    renderMessages() {
        return this.messages.map(message => `
            <div class="chat-message ${message.userId === this.currentUser.id ? 'own-message' : ''}" data-message-id="${message.id}">
                <div class="message-avatar">
                    <span class="avatar-emoji">${message.avatar}</span>
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-author">${message.userName}</span>
                        <span class="message-time">${this.formatTime(message.timestamp)}</span>
                    </div>
                    <div class="message-text">${message.message}</div>
                </div>
            </div>
        `).join('');
    }

    getTypingText() {
        if (this.typingUsers.length === 0) return '';
        if (this.typingUsers.length === 1) return `${this.typingUsers[0]} is typing...`;
        if (this.typingUsers.length === 2) return `${this.typingUsers.join(' and ')} are typing...`;
        return `${this.typingUsers.slice(0, -1).join(', ')} and ${this.typingUsers[this.typingUsers.length - 1]} are typing...`;
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        
        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
        return timestamp.toLocaleDateString();
    }

    setupEventListeners() {
        const toggleBtn = this.querySelector('.chat-toggle-btn');
        const closeBtn = this.querySelector('.chat-close-btn');
        const minimizeBtn = this.querySelector('.chat-action-btn');
        const chatInput = this.querySelector('.chat-input');
        const sendBtn = this.querySelector('.chat-send-btn');

        toggleBtn?.addEventListener('click', () => this.toggleChat());
        closeBtn?.addEventListener('click', () => this.closeChat());
        minimizeBtn?.addEventListener('click', () => this.minimizeChat());

        chatInput?.addEventListener('input', (e) => this.handleInputChange(e));
        chatInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        sendBtn?.addEventListener('click', () => this.sendMessage());

        // Emoji and file attachment buttons
        this.querySelectorAll('.input-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.currentTarget.title;
                if (title.includes('emoji')) {
                    this.showEmojiPicker();
                } else if (title.includes('file')) {
                    this.showFileUpload();
                }
            });
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        this.messageCount = 0;
        this.updateDisplay();
        
        if (this.isOpen) {
            // Focus on input when opened
            setTimeout(() => {
                const input = this.querySelector('.chat-input');
                input?.focus();
            }, 300);
            
            // Announce to screen readers
            this.announceToScreenReader('Team chat opened');
        } else {
            this.announceToScreenReader('Team chat closed');
        }
    }

    closeChat() {
        this.isOpen = false;
        this.isMinimized = false;
        this.updateDisplay();
        this.announceToScreenReader('Team chat closed');
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        this.updateDisplay();
        this.announceToScreenReader(this.isMinimized ? 'Team chat minimized' : 'Team chat restored');
    }

    handleInputChange(e) {
        const value = e.target.value.trim();
        const sendBtn = this.querySelector('.chat-send-btn');
        
        if (sendBtn) {
            sendBtn.disabled = value.length === 0;
        }

        // Simulate typing indicator
        if (value.length > 0) {
            this.simulateTyping();
        }
    }

    sendMessage() {
        const input = this.querySelector('.chat-input');
        const message = input?.value.trim();
        
        if (!message) return;

        const newMessage = {
            id: Date.now(),
            userId: this.currentUser.id,
            userName: this.currentUser.name,
            avatar: this.currentUser.avatar,
            message: message,
            timestamp: new Date(),
            type: 'text'
        };

        this.messages.push(newMessage);
        input.value = '';
        
        const sendBtn = this.querySelector('.chat-send-btn');
        if (sendBtn) sendBtn.disabled = true;

        this.updateMessages();
        this.scrollToBottom();
        
        // Simulate response
        setTimeout(() => {
            this.simulateResponse();
        }, 1000 + Math.random() * 2000);
    }

    simulateResponse() {
        const responses = [
            "Thanks for the update! 👍",
            "Looking good! Let's discuss this in the next meeting.",
            "Great idea! I'll work on that.",
            "Perfect timing! ⚡",
            "Sounds like a plan! 🚀",
            "I'll check that out now.",
            "Awesome work everyone! 🎉"
        ];
        
        const randomUser = this.onlineUsers[Math.floor(Math.random() * this.onlineUsers.length)];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
            id: Date.now(),
            userId: randomUser.id,
            userName: randomUser.name,
            avatar: randomUser.avatar,
            message: randomResponse,
            timestamp: new Date(),
            type: 'text'
        };

        this.messages.push(responseMessage);
        this.updateMessages();
        this.scrollToBottom();
        
        // Show notification if chat is closed
        if (!this.isOpen) {
            this.messageCount++;
            this.updateDisplay();
        }
    }

    simulateTyping() {
        // Randomly add/remove typing users
        if (Math.random() > 0.7 && this.typingUsers.length === 0) {
            const randomUser = this.onlineUsers[Math.floor(Math.random() * this.onlineUsers.length)];
            this.typingUsers.push(randomUser.name);
            this.updateTypingIndicator();
            
            setTimeout(() => {
                this.typingUsers = [];
                this.updateTypingIndicator();
            }, 2000 + Math.random() * 3000);
        }
    }

    startRealTimeSimulation() {
        // Simulate real-time activity
        this.realTimeInterval = setInterval(() => {
            if (Math.random() > 0.85) {
                this.simulateRandomMessage();
            }
            
            if (Math.random() > 0.9) {
                this.updateUserStatuses();
            }
        }, 10000);
    }

    simulateRandomMessage() {
        const messages = [
            "Coffee break anyone? ☕",
            "The new dashboard looks amazing! 🔥",
            "Meeting starts in 5 minutes",
            "Great job on the presentation today!",
            "Anyone free for a quick sync?",
            "Lunch recommendation: the new cafe downtown! 🥪"
        ];
        
        const randomUser = this.onlineUsers[Math.floor(Math.random() * this.onlineUsers.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const newMessage = {
            id: Date.now(),
            userId: randomUser.id,
            userName: randomUser.name,
            avatar: randomUser.avatar,
            message: randomMessage,
            timestamp: new Date(),
            type: 'text'
        };

        this.messages.push(newMessage);
        
        if (this.isOpen) {
            this.updateMessages();
            this.scrollToBottom();
        } else {
            this.messageCount++;
            this.updateDisplay();
        }
    }

    updateUserStatuses() {
        // Randomly update user statuses
        this.onlineUsers.forEach(user => {
            if (Math.random() > 0.8) {
                const statuses = ['online', 'away', 'busy'];
                user.status = statuses[Math.floor(Math.random() * statuses.length)];
            }
        });
        
        if (this.isOpen) {
            const usersSection = this.querySelector('.online-users-scroll');
            if (usersSection) {
                usersSection.innerHTML = this.renderOnlineUsers();
            }
        }
    }

    updateDisplay() {
        this.className = `team-chat-widget ${this.isOpen ? 'open' : ''} ${this.isMinimized ? 'minimized' : ''}`;
        
        const unreadIndicator = this.querySelector('.unread-indicator');
        if (unreadIndicator) {
            unreadIndicator.textContent = this.messageCount;
            unreadIndicator.style.display = this.messageCount > 0 ? 'flex' : 'none';
        }
        
        const toggleBtn = this.querySelector('.chat-toggle-btn');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', this.isOpen.toString());
        }
    }

    updateMessages() {
        const messagesContainer = this.querySelector('#chatMessages');
        if (messagesContainer) {
            messagesContainer.innerHTML = this.renderMessages();
        }
    }

    updateTypingIndicator() {
        const indicator = this.querySelector('#typingIndicator');
        if (indicator) {
            indicator.className = `typing-indicator ${this.typingUsers.length === 0 ? 'hidden' : ''}`;
            const text = indicator.querySelector('.typing-text');
            if (text) {
                text.textContent = this.getTypingText();
            }
        }
    }

    scrollToBottom() {
        const messagesContainer = this.querySelector('#chatMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    showEmojiPicker() {
        // Simple emoji picker implementation
        const emojis = ['😀', '😍', '🚀', '👍', '👏', '❤️', '💪', '🔥', '✅', '🎉'];
        const input = this.querySelector('.chat-input');
        if (input) {
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            input.value += randomEmoji;
            input.focus();
            
            const event = new Event('input', { bubbles: true });
            input.dispatchEvent(event);
        }
    }

    showFileUpload() {
        // Simulate file upload
        this.announceToScreenReader('File upload feature coming soon');
        console.log('📎 File upload clicked - feature in development');
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Register the custom element
customElements.define('team-chat-widget', TeamChatWidget); 