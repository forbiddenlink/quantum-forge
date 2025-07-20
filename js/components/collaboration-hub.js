// Real-time Collaboration Hub Component
class CollaborationHub extends HTMLElement {
    constructor() {
        super();
        this.activeUsers = [];
        this.sharedDocuments = [];
        this.collaborativeSpaces = [];
        this.isConnected = false;
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeCollaboration();
        this.startRealTimeUpdates();
    }

    render() {
        this.innerHTML = `
            <div class="collaboration-hub">
                <div class="hub-header">
                    <h3 class="hub-title">Live Collaboration</h3>
                    <div class="connection-status ${this.isConnected ? 'connected' : 'disconnected'}">
                        <span class="status-dot"></span>
                        <span class="status-text">${this.isConnected ? 'Connected' : 'Connecting...'}</span>
                    </div>
                </div>
                
                <div class="hub-content">
                    <div class="active-users-section">
                        <h4>Active Team Members</h4>
                        <div class="users-grid" id="activeUsersGrid">
                            ${this.renderActiveUsers()}
                        </div>
                    </div>
                    
                    <div class="shared-documents-section">
                        <h4>Shared Documents</h4>
                        <div class="documents-list" id="sharedDocumentsList">
                            ${this.renderSharedDocuments()}
                        </div>
                    </div>
                    
                    <div class="collaborative-spaces-section">
                        <h4>Collaborative Spaces</h4>
                        <div class="spaces-grid" id="collaborativeSpacesGrid">
                            ${this.renderCollaborativeSpaces()}
                        </div>
                    </div>
                </div>
                
                <div class="hub-actions">
                    <button class="btn secondary" id="createSpace">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Create Space
                    </button>
                    <button class="btn secondary" id="shareDocument">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        Share Document
                    </button>
                </div>
            </div>
        `;
    }

    renderActiveUsers() {
        if (this.activeUsers.length === 0) {
            return '<div class="empty-state">No active users</div>';
        }

        return this.activeUsers.map(user => `
            <div class="user-card ${user.status}" data-user-id="${user.id}">
                <div class="user-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="status-indicator ${user.status}"></span>
                </div>
                <div class="user-info">
                    <h5 class="user-name">${user.name}</h5>
                    <p class="user-activity">${user.currentActivity}</p>
                </div>
                <div class="user-actions">
                    <button class="action-btn" title="Message" data-action="message" data-user-id="${user.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </button>
                    <button class="action-btn" title="Call" data-action="call" data-user-id="${user.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderSharedDocuments() {
        if (this.sharedDocuments.length === 0) {
            return '<div class="empty-state">No shared documents</div>';
        }

        return this.sharedDocuments.map(doc => `
            <div class="document-card" data-doc-id="${doc.id}">
                <div class="document-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                        <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                </div>
                <div class="document-info">
                    <h5 class="document-name">${doc.name}</h5>
                    <p class="document-meta">Shared by ${doc.sharedBy} • ${this.formatTime(doc.sharedAt)}</p>
                </div>
                <div class="document-actions">
                    <button class="action-btn" title="Open" data-action="open" data-doc-id="${doc.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderCollaborativeSpaces() {
        if (this.collaborativeSpaces.length === 0) {
            return '<div class="empty-state">No collaborative spaces</div>';
        }

        return this.collaborativeSpaces.map(space => `
            <div class="space-card" data-space-id="${space.id}">
                <div class="space-header">
                    <h5 class="space-name">${space.name}</h5>
                    <span class="space-type">${space.type}</span>
                </div>
                <div class="space-info">
                    <p class="space-description">${space.description}</p>
                    <div class="space-meta">
                        <span class="participant-count">${space.participants.length} participants</span>
                        <span class="last-activity">${this.formatTime(space.lastActivity)}</span>
                    </div>
                </div>
                <div class="space-actions">
                    <button class="action-btn" title="Join" data-action="join" data-space-id="${space.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const createSpaceBtn = this.querySelector('#createSpace');
        const shareDocumentBtn = this.querySelector('#shareDocument');

        createSpaceBtn?.addEventListener('click', () => this.createCollaborativeSpace());
        shareDocumentBtn?.addEventListener('click', () => this.shareDocument());

        // Delegate event listeners for dynamic content
        this.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const userId = actionBtn.dataset.userId;
                const docId = actionBtn.dataset.docId;
                const spaceId = actionBtn.dataset.spaceId;

                switch (action) {
                    case 'message':
                        this.sendMessage(userId);
                        break;
                    case 'call':
                        this.initiateCall(userId);
                        break;
                    case 'open':
                        this.openDocument(docId);
                        break;
                    case 'join':
                        this.joinSpace(spaceId);
                        break;
                }
            }
        });
    }

    initializeCollaboration() {
        // Simulate WebSocket connection
        setTimeout(() => {
            this.isConnected = true;
            this.updateConnectionStatus();
            this.loadMockData();
        }, 1000);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateActiveUsers();
            this.updateSharedDocuments();
            this.updateCollaborativeSpaces();
        }, 5000);
    }

    loadMockData() {
        // Mock active users
        this.activeUsers = [
            {
                id: 1,
                name: 'Sarah Chen',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'%3E%3Cpath d=\'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\'%3E%3C/path%3E%3Ccircle cx=\'12\' cy=\'7\' r=\'4\'%3E%3C/circle%3E%3C/svg%3E',
                status: 'online',
                currentActivity: 'Working on Q4 budget'
            },
            {
                id: 2,
                name: 'Mike Rodriguez',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'%3E%3Cpath d=\'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\'%3E%3C/path%3E%3Ccircle cx=\'12\' cy=\'7\' r=\'4\'%3E%3C/circle%3E%3C/svg%3E',
                status: 'away',
                currentActivity: 'In a meeting'
            },
            {
                id: 3,
                name: 'Lisa Thompson',
                avatar: 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\'%3E%3Cpath d=\'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\'%3E%3C/path%3E%3Ccircle cx=\'12\' cy=\'7\' r=\'4\'%3E%3C/circle%3E%3C/svg%3E',
                status: 'online',
                currentActivity: 'Reviewing documents'
            }
        ];

        // Mock shared documents
        this.sharedDocuments = [
            {
                id: 1,
                name: 'Q4 Strategy Document',
                sharedBy: 'Sarah Chen',
                sharedAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
            },
            {
                id: 2,
                name: 'Budget Guidelines 2024',
                sharedBy: 'Mike Rodriguez',
                sharedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
            }
        ];

        // Mock collaborative spaces
        this.collaborativeSpaces = [
            {
                id: 1,
                name: 'Project Alpha',
                type: 'Project',
                description: 'Cross-functional team working on new product launch',
                participants: ['Sarah Chen', 'Mike Rodriguez', 'Lisa Thompson'],
                lastActivity: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
            },
            {
                id: 2,
                name: 'Design Sprint',
                type: 'Workshop',
                description: 'Weekly design review and ideation session',
                participants: ['Lisa Thompson', 'Sarah Chen'],
                lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
            }
        ];

        this.render();
    }

    updateConnectionStatus() {
        const statusElement = this.querySelector('.connection-status');
        if (statusElement) {
            statusElement.className = `connection-status ${this.isConnected ? 'connected' : 'disconnected'}`;
            statusElement.querySelector('.status-text').textContent = this.isConnected ? 'Connected' : 'Connecting...';
        }
    }

    updateActiveUsers() {
        // Simulate user status changes
        this.activeUsers.forEach(user => {
            if (Math.random() > 0.8) {
                user.currentActivity = this.getRandomActivity();
            }
        });
        this.querySelector('#activeUsersGrid').innerHTML = this.renderActiveUsers();
    }

    updateSharedDocuments() {
        // Simulate new shared documents
        if (Math.random() > 0.9) {
            const newDoc = {
                id: Date.now(),
                name: `Document ${Math.floor(Math.random() * 1000)}`,
                sharedBy: this.activeUsers[Math.floor(Math.random() * this.activeUsers.length)].name,
                sharedAt: new Date()
            };
            this.sharedDocuments.unshift(newDoc);
            this.querySelector('#sharedDocumentsList').innerHTML = this.renderSharedDocuments();
        }
    }

    updateCollaborativeSpaces() {
        // Simulate space activity updates
        this.collaborativeSpaces.forEach(space => {
            if (Math.random() > 0.7) {
                space.lastActivity = new Date();
            }
        });
        this.querySelector('#collaborativeSpacesGrid').innerHTML = this.renderCollaborativeSpaces();
    }

    getRandomActivity() {
        const activities = [
            'Working on Q4 budget',
            'In a meeting',
            'Reviewing documents',
            'Collaborating on project',
            'Planning next sprint',
            'Updating status reports'
        ];
        return activities[Math.floor(Math.random() * activities.length)];
    }

    createCollaborativeSpace() {
        // Show modal for creating new space
        const spaceName = prompt('Enter space name:');
        if (spaceName) {
            const newSpace = {
                id: Date.now(),
                name: spaceName,
                type: 'Project',
                description: 'New collaborative space',
                participants: ['You'],
                lastActivity: new Date()
            };
            this.collaborativeSpaces.unshift(newSpace);
            this.querySelector('#collaborativeSpacesGrid').innerHTML = this.renderCollaborativeSpaces();
        }
    }

    shareDocument() {
        // Show modal for sharing document
        const docName = prompt('Enter document name:');
        if (docName) {
            const newDoc = {
                id: Date.now(),
                name: docName,
                sharedBy: 'You',
                sharedAt: new Date()
            };
            this.sharedDocuments.unshift(newDoc);
            this.querySelector('#sharedDocumentsList').innerHTML = this.renderSharedDocuments();
        }
    }

    sendMessage(userId) {
        const user = this.activeUsers.find(u => u.id == userId);
        if (user) {
            const message = prompt(`Send message to ${user.name}:`);
            if (message) {
                console.log(`Message sent to ${user.name}: ${message}`);
                // In a real app, this would send via WebSocket
            }
        }
    }

    initiateCall(userId) {
        const user = this.activeUsers.find(u => u.id == userId);
        if (user) {
            console.log(`Initiating call with ${user.name}`);
            // In a real app, this would initiate a video call
        }
    }

    openDocument(docId) {
        const doc = this.sharedDocuments.find(d => d.id == docId);
        if (doc) {
            console.log(`Opening document: ${doc.name}`);
            // In a real app, this would open the document
        }
    }

    joinSpace(spaceId) {
        const space = this.collaborativeSpaces.find(s => s.id == spaceId);
        if (space) {
            console.log(`Joining space: ${space.name}`);
            // In a real app, this would join the collaborative space
        }
    }

    formatTime(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
}

customElements.define('collaboration-hub', CollaborationHub); 