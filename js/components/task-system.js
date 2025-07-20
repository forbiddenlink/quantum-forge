// Task System Component
class TaskSystem extends HTMLElement {
    constructor() {
        super();
        this.tasks = [];
        this.filter = 'all';
        this.sortBy = 'priority';
    }

    connectedCallback() {
        console.log('Task System connected');
        this.loadTasks();
        this.render();
        this.setupEventListeners();
    }

    loadTasks() {
        this.tasks = [
            {
                id: 1,
                title: 'Complete homepage redesign',
                description: 'Update the main landing page with new design system',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Maya Patel',
                dueDate: '2024-01-15',
                tags: ['design', 'frontend'],
                progress: 75
            },
            {
                id: 2,
                title: 'API documentation review',
                description: 'Review and update API documentation for v2.1',
                priority: 'medium',
                status: 'completed',
                assignee: 'David Kim',
                dueDate: '2024-01-10',
                tags: ['backend', 'documentation'],
                progress: 100
            },
            {
                id: 3,
                title: 'Mobile app testing',
                description: 'Conduct comprehensive testing on iOS and Android',
                priority: 'high',
                status: 'pending',
                assignee: 'Sophie Chen',
                dueDate: '2024-01-20',
                tags: ['testing', 'mobile'],
                progress: 0
            },
            {
                id: 4,
                title: 'Database optimization',
                description: 'Optimize query performance and add indexes',
                priority: 'low',
                status: 'in-progress',
                assignee: 'David Kim',
                dueDate: '2024-01-25',
                tags: ['backend', 'database'],
                progress: 45
            },
            {
                id: 5,
                title: 'User research interviews',
                description: 'Conduct user interviews for feature validation',
                priority: 'medium',
                status: 'pending',
                assignee: 'Emma Wilson',
                dueDate: '2024-01-18',
                tags: ['research', 'ux'],
                progress: 0
            }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="task-system">
                <div class="task-header">
                    <h2 class="task-title">Task Management</h2>
                    <div class="task-actions">
                        <button class="btn primary" id="addTaskBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"></path>
                            </svg>
                            Add Task
                        </button>
                        <button class="btn" id="viewAllBtn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11H1l8-8 8 8h-8v8H9z"></path>
                            </svg>
                            View All
                        </button>
                    </div>
                </div>

                <div class="task-filters">
                    <div class="filter-group">
                        <label class="filter-label">Filter:</label>
                        <select class="filter-select" id="statusFilter">
                            <option value="all">All Tasks</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label class="filter-label">Sort by:</label>
                        <select class="filter-select" id="sortBy">
                            <option value="priority">Priority</option>
                            <option value="dueDate">Due Date</option>
                            <option value="assignee">Assignee</option>
                            <option value="progress">Progress</option>
                        </select>
                    </div>
                </div>

                <div class="task-list" id="taskList">
                    <!-- Tasks will be rendered here -->
                </div>
            </div>
        `;
        
        this.renderTasks();
    }

    renderTasks() {
        const taskList = this.querySelector('#taskList');
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11H1l8-8 8 8h-8v8H9z"></path>
                        </svg>
                    </div>
                    <h3 class="empty-title">No tasks found</h3>
                    <p class="empty-description">Try adjusting your filters or add a new task to get started.</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-card" data-task-id="${task.id}">
                <div class="task-header-row">
                    <div class="task-info">
                        <h3 class="task-name">${task.title}</h3>
                        <p class="task-description">${task.description}</p>
                    </div>
                    <div class="task-priority ${task.priority}">
                        <span class="priority-dot"></span>
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </div>
                </div>
                
                <div class="task-meta">
                    <div class="task-assignee">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v8m0 8v3"></path>
                            <path d="M5.6 5.6l5.7 5.7m0 0l5.7-5.7"></path>
                        </svg>
                        ${task.assignee}
                    </div>
                    <div class="task-due-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${new Date(task.dueDate).toLocaleDateString()}
                    </div>
                    <div class="task-status ${task.status}">
                        ${task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                    </div>
                </div>

                <div class="task-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${task.progress}%"></div>
                    </div>
                    <span class="progress-text">${task.progress}%</span>
                </div>

                <div class="task-tags">
                    ${task.tags.map(tag => `<span class="task-tag">${tag}</span>`).join('')}
                </div>

                <div class="task-actions">
                    <button class="task-action-btn" data-action="view" data-task-id="${task.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                    </button>
                    <button class="task-action-btn" data-action="edit" data-task-id="${task.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="task-action-btn" data-action="complete" data-task-id="${task.id}">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getFilteredTasks() {
        let filtered = this.tasks;
        
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

    getPriorityColor(priority) {
        const colors = {
            high: 'var(--error-500)',
            medium: 'var(--warning-500)',
            low: 'var(--success-500)'
        };
        return colors[priority] || 'var(--gray-500)';
    }

    setupEventListeners() {
        // Filter and sort controls
        this.querySelector('#statusFilter').addEventListener('change', (e) => {
            this.filter = e.target.value;
            this.renderTasks();
        });

        this.querySelector('#sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.renderTasks();
        });

        // Action buttons
        this.querySelector('#addTaskBtn').addEventListener('click', () => {
            this.addNewTask();
        });

        this.querySelector('#viewAllBtn').addEventListener('click', () => {
            this.viewAllTasks();
        });

        // Task action buttons
        this.querySelector('#taskList').addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.task-action-btn');
            if (!actionBtn) return;

            const action = actionBtn.dataset.action;
            const taskId = parseInt(actionBtn.dataset.taskId);

            switch (action) {
                case 'view':
                    this.viewTask(taskId);
                    break;
                case 'edit':
                    this.editTask(taskId);
                    break;
                case 'complete':
                    this.updateTaskStatus(taskId);
                    break;
            }
        });
    }

    updateTaskList() {
        this.renderTasks();
    }

    updateTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = task.status === 'completed' ? 'in-progress' : 'completed';
            if (task.status === 'completed') {
                task.progress = 100;
            }
            this.updateTaskList();
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

    addNewTask() {
        console.log('Add new task');
        // Implement new task creation
    }

    viewAllTasks() {
        console.log('View all tasks');
        // Implement view all tasks functionality
    }
}

customElements.define('task-system', TaskSystem); 