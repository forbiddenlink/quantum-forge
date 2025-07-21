// Enhanced Task System Component with Modern UI and Advanced Features
class EnhancedTaskSystem extends HTMLElement {
    constructor() {
        super();
        this.tasks = [];
        this.filter = 'all';
        this.sortBy = 'priority';
        this.viewMode = 'cards'; // cards, list, kanban
        this.searchQuery = '';
        this.isInitialized = false;
        this.draggedTask = null;
        this.animationDelay = 0;
    }

    connectedCallback() {
        console.log('Enhanced Task System connected');
        console.log('Task System Element:', this);
        try {
            this.loadTasks();
            console.log('Tasks loaded:', this.tasks.length);
            this.render();
            console.log('Task System rendered');
            this.setupEventListeners();
            this.initializeAdvancedFeatures();
            this.startRealTimeUpdates();
            this.initializeAnimations();
        } catch (error) {
            console.error('Error initializing Enhanced Task System:', error);
            console.error('Error details:', error.stack);
            this.renderFallback();
        }
    }
    
    renderFallback() {
        this.innerHTML = `
            <div class="enhanced-task-system">
                <div class="task-system-header">
                    <h2>Task Management System</h2>
                    <p>Loading tasks...</p>
                </div>
            </div>
        `;
    }

    loadTasks() {
        // Enhanced task data with more realistic details
        this.tasks = [
            {
                id: 1,
                title: 'Complete homepage redesign',
                description: 'Update the main landing page with new design system and modern UI components',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Maya Patel',
                assigneeAvatar: '👩‍💻',
                dueDate: '2024-01-15',
                createdDate: '2024-01-05',
                tags: ['design', 'frontend', 'ui/ux'],
                progress: 75,
                estimatedHours: 16,
                actualHours: 12,
                category: 'development',
                comments: 3,
                attachments: 2
            },
            {
                id: 2,
                title: 'API documentation review',
                description: 'Review and update API documentation for v2.1 release with new endpoints',
                priority: 'medium',
                status: 'completed',
                assignee: 'David Kim',
                assigneeAvatar: '👨‍💼',
                dueDate: '2024-01-10',
                createdDate: '2024-01-02',
                tags: ['backend', 'documentation', 'api'],
                progress: 100,
                estimatedHours: 8,
                actualHours: 6,
                category: 'documentation',
                comments: 1,
                attachments: 1
            },
            {
                id: 3,
                title: 'Mobile app testing',
                description: 'Conduct comprehensive testing on iOS and Android platforms for the new features',
                priority: 'high',
                status: 'pending',
                assignee: 'Sophie Chen',
                assigneeAvatar: '👩‍🔬',
                dueDate: '2024-01-20',
                createdDate: '2024-01-08',
                tags: ['testing', 'mobile', 'qa'],
                progress: 0,
                estimatedHours: 24,
                actualHours: 0,
                category: 'testing',
                comments: 0,
                attachments: 0
            },
            {
                id: 4,
                title: 'Database optimization',
                description: 'Optimize query performance and add indexes for better scalability',
                priority: 'medium',
                status: 'in-progress',
                assignee: 'David Kim',
                assigneeAvatar: '👨‍💼',
                dueDate: '2024-01-25',
                createdDate: '2024-01-10',
                tags: ['backend', 'database', 'performance'],
                progress: 45,
                estimatedHours: 12,
                actualHours: 5,
                category: 'backend',
                comments: 2,
                attachments: 1
            },
            {
                id: 5,
                title: 'User research interviews',
                description: 'Conduct user interviews for feature validation and gather feedback',
                priority: 'low',
                status: 'pending',
                assignee: 'Emma Wilson',
                assigneeAvatar: '👩‍🎨',
                dueDate: '2024-01-18',
                createdDate: '2024-01-12',
                tags: ['research', 'ux', 'interviews'],
                progress: 0,
                estimatedHours: 20,
                actualHours: 0,
                category: 'research',
                comments: 1,
                attachments: 0
            },
            {
                id: 6,
                title: 'Security audit',
                description: 'Perform comprehensive security audit and vulnerability assessment',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Alex Rodriguez',
                assigneeAvatar: '🔒',
                dueDate: '2024-01-22',
                createdDate: '2024-01-14',
                tags: ['security', 'audit', 'backend'],
                progress: 30,
                estimatedHours: 32,
                actualHours: 10,
                category: 'security',
                comments: 5,
                attachments: 3
            }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="enhanced-task-system">
                <div class="task-system-header">
                    <div class="header-content">
                        <div class="header-title">
                            <h2 class="task-system-title">
                                Task Management
                            </h2>
                            <p class="task-system-subtitle">Organize and track your team's progress efficiently</p>
                        </div>
                        <div class="header-stats">
                            ${this.renderTaskStats()}
                        </div>
                    </div>
                    
                    <div class="task-controls">
                        <div class="search-and-filters">
                            <div class="search-container">
                                <input type="text" class="task-search" placeholder="Search tasks..." id="taskSearch">
                                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </div>
                            
                            <div class="filter-controls">
                                <select class="enhanced-select" id="statusFilter">
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                
                                <select class="enhanced-select" id="priorityFilter">
                                    <option value="all">All Priority</option>
                                    <option value="high">High Priority</option>
                                    <option value="medium">Medium Priority</option>
                                    <option value="low">Low Priority</option>
                                </select>
                                
                                <select class="enhanced-select" id="sortBy">
                                    <option value="priority">Sort by Priority</option>
                                    <option value="dueDate">Sort by Due Date</option>
                                    <option value="progress">Sort by Progress</option>
                                    <option value="assignee">Sort by Assignee</option>
                                    <option value="created">Sort by Created</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="action-controls">
                            <div class="view-toggle">
                                <button class="view-btn active" data-view="cards" title="Card View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                    </svg>
                                </button>
                                <button class="view-btn" data-view="list" title="List View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="8" y1="6" x2="21" y2="6"></line>
                                        <line x1="8" y1="12" x2="21" y2="12"></line>
                                        <line x1="8" y1="18" x2="21" y2="18"></line>
                                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                    </svg>
                                </button>
                                <button class="view-btn" data-view="kanban" title="Kanban View">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="3" y="3" width="6" height="18"></rect>
                                        <rect x="11" y="8" width="6" height="13"></rect>
                                        <rect x="19" y="5" width="2" height="16"></rect>
                                    </svg>
                                </button>
                            </div>
                            
                            <button class="btn primary enhanced-btn" id="addTaskBtn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 5v14M5 12h14"></path>
                                </svg>
                                Add Task
                            </button>
                            
                            <button class="btn secondary enhanced-btn" id="bulkActionsBtn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 11l3 3L22 4"></path>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                Bulk Actions
                            </button>
                        </div>
                    </div>
                </div>

                <div class="task-content" id="taskContent">
                    ${this.renderTaskContent()}
                </div>
                
                <div class="task-insights">
                    <h3 class="insights-title">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
                        </svg>
                        Task Insights
                    </h3>
                    <div class="insights-grid">
                        ${this.renderInsights()}
                    </div>
                </div>
            </div>
            
            <!-- Quick Actions Panel -->
            <div class="quick-actions-panel" id="quickActionsPanel">
                <div class="panel-header">
                    <h3>Quick Actions</h3>
                    <button class="close-panel" id="closePanelBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="panel-content">
                    <div class="quick-action-item">
                        <button class="quick-action-btn" data-action="add-task">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Add New Task
                        </button>
                    </div>
                    <div class="quick-action-item">
                        <button class="quick-action-btn" data-action="filter-high">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 6h18l-7 7v8l-4-2v-6L3 6z"></path>
                            </svg>
                            Show High Priority
                        </button>
                    </div>
                    <div class="quick-action-item">
                        <button class="quick-action-btn" data-action="mark-complete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"></path>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            Mark Selected Complete
                        </button>
                    </div>
                    <div class="quick-action-item">
                        <button class="quick-action-btn" data-action="export">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Export Tasks
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- Task Creation Modal -->
            <div class="task-modal" id="taskModal">
                <div class="modal-backdrop" id="modalBackdrop"></div>
                <div class="modal-content">
                    ${this.renderTaskForm()}
                </div>
            </div>
        `;
        
        // Add entrance animation class
        requestAnimationFrame(() => {
            this.classList.add('animate-in');
        });
    }

    renderTaskStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.status === 'completed').length;
        const inProgress = this.tasks.filter(task => task.status === 'in-progress').length;
        const pending = this.tasks.filter(task => task.status === 'pending').length;
        const overdue = this.tasks.filter(task => new Date(task.dueDate) < new Date() && task.status !== 'completed').length;
        
        return `
            <div class="task-stats">
                <div class="stat-card total">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                        <div class="stat-number">${total}</div>
                        <div class="stat-label">Total Tasks</div>
                    </div>
                </div>
                <div class="stat-card completed">
                    <div class="stat-icon">✅</div>
                    <div class="stat-info">
                        <div class="stat-number">${completed}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
                <div class="stat-card in-progress">
                    <div class="stat-icon">🔄</div>
                    <div class="stat-info">
                        <div class="stat-number">${inProgress}</div>
                        <div class="stat-label">In Progress</div>
                    </div>
                </div>
                <div class="stat-card pending">
                    <div class="stat-icon">⏳</div>
                    <div class="stat-info">
                        <div class="stat-number">${pending}</div>
                        <div class="stat-label">Pending</div>
                    </div>
                </div>
                <div class="stat-card overdue">
                    <div class="stat-icon">🚨</div>
                    <div class="stat-info">
                        <div class="stat-number">${overdue}</div>
                        <div class="stat-label">Overdue</div>
                    </div>
                </div>
            </div>
        `;
    }

    renderInsights() {
        const insights = [
            {
                type: 'positive',
                icon: '📈',
                title: 'Productivity Trending Up',
                description: 'Task completion rate has increased by 23% this week',
                metric: '+23%'
            },
            {
                type: 'info',
                icon: '⚡',
                title: 'Quick Wins Available',
                description: '3 tasks can be completed in under 30 minutes',
                metric: '3 tasks'
            },
            {
                type: 'warning',
                icon: '⏰',
                title: 'Upcoming Deadlines',
                description: '2 high-priority tasks due within 2 days',
                metric: '2 days'
            }
        ];

        return insights.map(insight => `
            <div class="insight-card ${insight.type}">
                <div class="insight-icon">${insight.icon}</div>
                <div class="insight-content">
                    <h4>${insight.title}</h4>
                    <p>${insight.description}</p>
                    <div class="insight-metric">${insight.metric}</div>
                </div>
            </div>
        `).join('');
    }

    initializeAnimations() {
        // Add staggered animations to stat cards
        const statCards = this.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('animate-in');
        });

        // Add entrance animations to insights
        const insightCards = this.querySelectorAll('.insight-card');
        insightCards.forEach((card, index) => {
            card.style.animationDelay = `${(index + statCards.length) * 0.1}s`;
            card.classList.add('animate-in');
        });
    }

    renderTaskContent() {
        switch (this.viewMode) {
            case 'list':
                return this.renderListView();
            case 'kanban':
                return this.renderKanbanView();
            default:
                return this.renderCardsView();
        }
    }

    renderCardsView() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            return this.renderEmptyState();
        }

        return `
            <div class="task-cards-container">
                <div class="task-cards-grid">
                    ${filteredTasks.map(task => this.renderTaskCard(task)).join('')}
                </div>
            </div>
        `;
    }

    renderListView() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            return this.renderEmptyState();
        }

        return `
            <div class="task-list-container">
                <div class="task-list-header">
                    <div class="list-column title-col">Task</div>
                    <div class="list-column assignee-col">Assignee</div>
                    <div class="list-column status-col">Status</div>
                    <div class="list-column priority-col">Priority</div>
                    <div class="list-column progress-col">Progress</div>
                    <div class="list-column due-col">Due Date</div>
                    <div class="list-column actions-col">Actions</div>
                </div>
                <div class="task-list-body">
                    ${filteredTasks.map(task => this.renderTaskListItem(task)).join('')}
                </div>
            </div>
        `;
    }

    renderKanbanView() {
        const statuses = ['pending', 'in-progress', 'completed'];
        const statusLabels = {
            'pending': 'To Do',
            'in-progress': 'In Progress',
            'completed': 'Done'
        };

        return `
            <div class="kanban-container">
                ${statuses.map(status => {
                    const tasks = this.getFilteredTasks().filter(task => task.status === status);
                    return `
                        <div class="kanban-column" data-status="${status}">
                            <div class="kanban-header">
                                <h3>${statusLabels[status]}</h3>
                                <span class="task-count">${tasks.length}</span>
                            </div>
                            <div class="kanban-tasks" data-status="${status}">
                                ${tasks.map(task => this.renderKanbanCard(task)).join('')}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderTaskCard(task) {
        const priorityIcon = this.getPriorityIcon(task.priority);
        const statusClass = task.status.replace('-', '');
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
        
        return `
            <div class="enhanced-task-card ${statusClass} ${isOverdue ? 'overdue' : ''}" 
                 data-task-id="${task.id}" 
                 draggable="true">
                <div class="task-card-header">
                    <div class="task-priority ${task.priority}">
                        <span class="priority-icon">${priorityIcon}</span>
                        <span class="priority-text">${task.priority.toUpperCase()}</span>
                    </div>
                    <div class="task-actions-dropdown">
                        <button class="action-btn dropdown-trigger" data-task-id="${task.id}">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="task-card-content">
                    <h3 class="task-title">${task.title}</h3>
                    <p class="task-description">${task.description}</p>
                    
                    <div class="task-tags">
                        ${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}
                    </div>
                </div>
                
                <div class="task-card-progress">
                    <div class="progress-header">
                        <span class="progress-label">Progress</span>
                        <span class="progress-percentage">${task.progress}%</span>
                    </div>
                    <div class="enhanced-progress-bar">
                        <div class="progress-fill" style="width: ${task.progress}%"></div>
                    </div>
                </div>
                
                <div class="task-card-meta">
                    <div class="task-assignee">
                        <div class="assignee-avatar">${task.assigneeAvatar}</div>
                        <span class="assignee-name">${task.assignee}</span>
                    </div>
                    
                    <div class="task-meta-items">
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span class="due-date ${isOverdue ? 'overdue' : ''}">${this.formatDate(task.dueDate)}</span>
                        </div>
                        
                        ${task.comments > 0 ? `
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                            <span>${task.comments}</span>
                        </div>
                        ` : ''}
                        
                        ${task.attachments > 0 ? `
                        <div class="meta-item">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                            </svg>
                            <span>${task.attachments}</span>
                        </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="task-status-badge ${task.status}">
                    ${this.getStatusIcon(task.status)}
                    <span>${task.status.replace('-', ' ').toUpperCase()}</span>
                </div>
            </div>
        `;
    }

    renderTaskListItem(task) {
        const priorityIcon = this.getPriorityIcon(task.priority);
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
        
        return `
            <div class="task-list-item ${task.status} ${isOverdue ? 'overdue' : ''}" data-task-id="${task.id}">
                <div class="list-column title-col">
                    <div class="task-title-cell">
                        <h4>${task.title}</h4>
                        <p>${task.description}</p>
                        <div class="task-tags-inline">
                            ${task.tags.slice(0, 3).map(tag => `<span class="task-tag-small">${tag}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="list-column assignee-col">
                    <div class="assignee-cell">
                        <div class="assignee-avatar">${task.assigneeAvatar}</div>
                        <span>${task.assignee}</span>
                    </div>
                </div>
                
                <div class="list-column status-col">
                    <div class="status-badge ${task.status}">
                        ${this.getStatusIcon(task.status)}
                        <span>${task.status.replace('-', ' ')}</span>
                    </div>
                </div>
                
                <div class="list-column priority-col">
                    <div class="priority-badge ${task.priority}">
                        <span class="priority-icon">${priorityIcon}</span>
                        <span>${task.priority}</span>
                    </div>
                </div>
                
                <div class="list-column progress-col">
                    <div class="progress-cell">
                        <div class="mini-progress-bar">
                            <div class="progress-fill" style="width: ${task.progress}%"></div>
                        </div>
                        <span class="progress-text">${task.progress}%</span>
                    </div>
                </div>
                
                <div class="list-column due-col">
                    <span class="due-date ${isOverdue ? 'overdue' : ''}">${this.formatDate(task.dueDate)}</span>
                </div>
                
                <div class="list-column actions-col">
                    <div class="task-actions">
                        <button class="action-btn" data-action="edit" data-task-id="${task.id}" title="Edit">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn" data-action="toggle-status" data-task-id="${task.id}" title="Toggle Status">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </button>
                        <button class="action-btn" data-action="delete" data-task-id="${task.id}" title="Delete">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    renderKanbanCard(task) {
        const priorityIcon = this.getPriorityIcon(task.priority);
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
        
        return `
            <div class="kanban-task-card ${task.priority} ${isOverdue ? 'overdue' : ''}" 
                 data-task-id="${task.id}" 
                 draggable="true">
                <div class="kanban-card-header">
                    <div class="priority-indicator ${task.priority}">
                        <span class="priority-icon">${priorityIcon}</span>
                    </div>
                    <button class="card-menu-btn" data-task-id="${task.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                        </svg>
                    </button>
                </div>
                
                <div class="kanban-card-content">
                    <h4 class="kanban-task-title">${task.title}</h4>
                    <p class="kanban-task-description">${task.description}</p>
                    
                    <div class="kanban-task-tags">
                        ${task.tags.slice(0, 2).map(tag => `<span class="task-tag-mini">${tag}</span>`).join('')}
                    </div>
                    
                    <div class="kanban-progress">
                        <div class="mini-progress-bar">
                            <div class="progress-fill" style="width: ${task.progress}%"></div>
                        </div>
                        <span class="progress-percentage">${task.progress}%</span>
                    </div>
                    
                    <div class="kanban-card-footer">
                        <div class="assignee-mini">
                            <div class="assignee-avatar-small">${task.assigneeAvatar}</div>
                        </div>
                        <div class="due-date-mini ${isOverdue ? 'overdue' : ''}">
                            ${this.formatDateShort(task.dueDate)}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmptyState() {
        return `
            <div class="empty-state-container">
                <div class="empty-state-content">
                    <div class="empty-state-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <h3 class="empty-state-title">No tasks found</h3>
                    <p class="empty-state-description">
                        ${this.searchQuery || this.filter !== 'all' ? 
                            'Try adjusting your filters or search terms.' : 
                            'Create your first task to get started with project management.'
                        }
                    </p>
                    <button class="btn primary" id="createFirstTaskBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Create First Task
                    </button>
                </div>
            </div>
        `;
    }

    renderTaskForm() {
        return `
            <div class="modal-header">
                <h2>Create New Task</h2>
                <button class="modal-close" id="modalClose">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <form class="task-form" id="taskForm">
                <div class="form-row">
                    <div class="form-group">
                        <label for="taskTitle">Task Title</label>
                        <input type="text" id="taskTitle" name="title" required 
                               placeholder="Enter task title...">
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="taskDescription">Description</label>
                        <textarea id="taskDescription" name="description" rows="3" 
                                  placeholder="Describe the task..."></textarea>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="taskPriority">Priority</label>
                        <select id="taskPriority" name="priority">
                            <option value="low">Low Priority</option>
                            <option value="medium" selected>Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="taskAssignee">Assignee</label>
                        <select id="taskAssignee" name="assignee">
                            <option value="Maya Patel">Maya Patel</option>
                            <option value="David Kim">David Kim</option>
                            <option value="Sophie Chen">Sophie Chen</option>
                            <option value="Emma Wilson">Emma Wilson</option>
                            <option value="Alex Rodriguez">Alex Rodriguez</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="taskDueDate">Due Date</label>
                        <input type="date" id="taskDueDate" name="dueDate" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="taskCategory">Category</label>
                        <select id="taskCategory" name="category">
                            <option value="development">Development</option>
                            <option value="design">Design</option>
                            <option value="testing">Testing</option>
                            <option value="documentation">Documentation</option>
                            <option value="research">Research</option>
                            <option value="security">Security</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="taskTags">Tags</label>
                        <input type="text" id="taskTags" name="tags" 
                               placeholder="Enter tags separated by commas...">
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn secondary" id="cancelTaskBtn">Cancel</button>
                    <button type="submit" class="btn primary">Create Task</button>
                </div>
            </form>
        `;
    }

    // Utility methods
    getPriorityIcon(priority) {
        const icons = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        };
        return icons[priority] || '⚪';
    }

    getStatusIcon(status) {
        const icons = {
            pending: '⏳',
            'in-progress': '🔄',
            completed: '✅'
        };
        return icons[status] || '❓';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';
        if (diffDays > 0 && diffDays <= 7) return `${diffDays} days`;
        if (diffDays < 0 && diffDays >= -7) return `${Math.abs(diffDays)} days ago`;

        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });
    }

    formatDateShort(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = date - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays === -1) return 'Yesterday';

        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
    }

    getFilteredTasks() {
        let filtered = this.tasks;
        
        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(task => 
                task.title.toLowerCase().includes(query) ||
                task.description.toLowerCase().includes(query) ||
                task.assignee.toLowerCase().includes(query) ||
                task.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }
        
        // Apply status filter
        if (this.filter !== 'all') {
            filtered = filtered.filter(task => task.status === this.filter);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            switch (this.sortBy) {
                case 'priority':
                    return this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority);
                case 'dueDate':
                    return new Date(a.dueDate) - new Date(b.dueDate);
                case 'assignee':
                    return a.assignee.localeCompare(b.assignee);
                case 'progress':
                    return b.progress - a.progress;
                case 'created':
                    return new Date(b.createdDate) - new Date(a.createdDate);
                default:
                    return 0;
            }
        });
        
        return filtered;
    }

    getPriorityWeight(priority) {
        const weights = { high: 3, medium: 2, low: 1 };
        return weights[priority] || 0;
    }

    setupEventListeners() {
        // Search functionality
        this.querySelector('#taskSearch')?.addEventListener('input', (e) => {
            this.searchQuery = e.target.value;
            this.updateTaskContent();
        });

        // Filter controls
        this.querySelector('#statusFilter')?.addEventListener('change', (e) => {
            this.filter = e.target.value;
            this.updateTaskContent();
        });

        this.querySelector('#sortBy')?.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.updateTaskContent();
        });

        // View toggle
        this.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.viewMode = btn.dataset.view;
                this.updateTaskContent();
            });
        });

        // Modal controls
        this.querySelector('#addTaskBtn')?.addEventListener('click', () => {
            this.showTaskModal();
        });

        this.querySelector('#modalClose')?.addEventListener('click', () => {
            this.hideTaskModal();
        });

        this.querySelector('#modalBackdrop')?.addEventListener('click', () => {
            this.hideTaskModal();
        });

        // Task actions
        this.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const taskId = parseInt(actionBtn.dataset.taskId);
                
                // Handle quick actions
                if (['add-task', 'filter-high', 'mark-complete', 'export'].includes(action)) {
                    this.handleQuickAction(action);
                } else {
                    this.handleTaskAction(action, taskId);
                }
            }
        });

        // Quick actions panel controls
        this.querySelector('#bulkActionsBtn')?.addEventListener('click', () => {
            this.toggleQuickActionsPanel();
        });

        this.querySelector('#closePanelBtn')?.addEventListener('click', () => {
            this.hideQuickActionsPanel();
        });

        // Drag and drop
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        this.addEventListener('dragstart', (e) => {
            if (e.target.draggable) {
                this.draggedTask = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            }
        });

        this.addEventListener('dragend', (e) => {
            if (e.target.draggable) {
                e.target.classList.remove('dragging');
                this.draggedTask = null;
            }
        });

        this.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
        });

        this.addEventListener('drop', (e) => {
            e.preventDefault();
            const kanbanColumn = e.target.closest('.kanban-tasks');
            if (kanbanColumn && this.draggedTask) {
                const newStatus = kanbanColumn.dataset.status;
                const taskId = parseInt(this.draggedTask.dataset.taskId);
                this.updateTaskStatus(taskId, newStatus);
            }
        });
    }

    updateTaskContent() {
        const content = this.querySelector('#taskContent');
        if (content) {
            content.innerHTML = this.renderTaskContent();
        }
        
        // Update stats
        const statsContainer = this.querySelector('.task-stats');
        if (statsContainer) {
            statsContainer.innerHTML = this.renderTaskStats().match(/<div class="task-stats">(.*?)<\/div>/s)[1];
        }
    }

    showTaskModal() {
        const modal = this.querySelector('#taskModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    hideTaskModal() {
        const modal = this.querySelector('#taskModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    handleTaskAction(action, taskId) {
        switch (action) {
            case 'edit':
                this.editTask(taskId);
                break;
            case 'toggle-status':
                this.toggleTaskStatus(taskId);
                break;
            case 'delete':
                this.deleteTask(taskId);
                break;
            case 'view':
                this.viewTask(taskId);
                break;
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const statusOrder = ['pending', 'in-progress', 'completed'];
            const currentIndex = statusOrder.indexOf(task.status);
            task.status = statusOrder[(currentIndex + 1) % statusOrder.length];
            
            if (task.status === 'completed') {
                task.progress = 100;
            } else if (task.status === 'pending') {
                task.progress = 0;
            }
            
            this.updateTaskContent();
            this.showNotification(`Task "${task.title}" status updated to ${task.status.replace('-', ' ')}`);
        }
    }

    updateTaskStatus(taskId, newStatus) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
            task.status = newStatus;
            
            if (newStatus === 'completed') {
                task.progress = 100;
            } else if (newStatus === 'pending') {
                task.progress = 0;
            }
            
            this.updateTaskContent();
            this.showNotification(`Task moved to ${newStatus.replace('-', ' ')}`);
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.updateTaskContent();
            this.showNotification('Task deleted successfully');
        }
    }

    editTask(taskId) {
        console.log('Edit task:', taskId);
        // Implement task editing functionality
    }

    viewTask(taskId) {
        console.log('View task:', taskId);
        // Implement task viewing functionality
    }

    initializeAdvancedFeatures() {
        // Initialize keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        this.showTaskModal();
                        break;
                    case 'f':
                        e.preventDefault();
                        this.querySelector('#taskSearch')?.focus();
                        break;
                }
            }
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            // Update progress for in-progress tasks
            this.tasks.forEach(task => {
                if (task.status === 'in-progress' && task.progress < 100) {
                    if (Math.random() < 0.1) { // 10% chance to update
                        task.progress = Math.min(100, task.progress + Math.floor(Math.random() * 5));
                        if (task.progress === 100) {
                            task.status = 'completed';
                        }
                    }
                }
            });
            
            if (Math.random() < 0.05) { // 5% chance to update
                this.updateTaskContent();
            }
        }, 10000); // Check every 10 seconds
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'task-notification';
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    // Quick Actions Panel Methods
    toggleQuickActionsPanel() {
        const panel = this.querySelector('#quickActionsPanel');
        if (panel) {
            panel.classList.toggle('active');
        }
    }

    hideQuickActionsPanel() {
        const panel = this.querySelector('#quickActionsPanel');
        if (panel) {
            panel.classList.remove('active');
        }
    }

    handleQuickAction(action) {
        switch (action) {
            case 'add-task':
                this.showTaskModal();
                this.hideQuickActionsPanel();
                break;
            case 'filter-high':
                this.querySelector('#priorityFilter').value = 'high';
                this.filter = 'all'; // Reset status filter
                this.updateTaskContent();
                this.hideQuickActionsPanel();
                this.showNotification('Showing high priority tasks');
                break;
            case 'mark-complete':
                this.markSelectedTasksComplete();
                this.hideQuickActionsPanel();
                break;
            case 'export':
                this.exportTasks();
                this.hideQuickActionsPanel();
                break;
        }
    }

    markSelectedTasksComplete() {
        // For now, mark all in-progress tasks as complete
        let completedCount = 0;
        this.tasks.forEach(task => {
            if (task.status === 'in-progress') {
                task.status = 'completed';
                task.progress = 100;
                completedCount++;
            }
        });
        
        if (completedCount > 0) {
            this.updateTaskContent();
            this.showNotification(`Marked ${completedCount} tasks as complete`);
        } else {
            this.showNotification('No in-progress tasks to complete');
        }
    }

    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'tasks_export.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showNotification('Tasks exported successfully');
    }
}

// Register the component with backward compatibility check
if (!customElements.get('task-system')) {
    customElements.define('task-system', EnhancedTaskSystem);
} 