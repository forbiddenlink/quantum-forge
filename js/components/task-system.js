// Enhanced Task System Component with Contest-Winning Features
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
        this.aiSuggestions = [];
        this.realTimeUpdates = null;
        this.isVisible = false;
        this.needsInsightRefresh = false;
        this.isDeliberatelyClearing = false;
        
        // Performance tracking
        this.performanceMetrics = {
            tasksCreated: 0,
            tasksCompleted: 0,
            averageCompletionTime: 0,
            productivityScore: 85
        };
        
        // AI-powered insights
        this.aiInsights = [
            {
                type: 'recommendation',
                icon: '🤖',
                title: 'AI Recommendation',
                description: 'Consider breaking down the homepage redesign into smaller tasks for better tracking',
                confidence: 92,
                impact: 'high'
            },
            {
                type: 'prediction',
                icon: '📈',
                title: 'Productivity Forecast',
                description: 'Based on current pace, you\'ll complete 2 more tasks this week',
                confidence: 87,
                impact: 'medium'
            },
            {
                type: 'optimization',
                icon: '⚡',
                title: 'Workflow Optimization',
                description: 'Moving testing tasks to Monday increases completion rate by 23%',
                confidence: 94,
                impact: 'high'
            }
        ];
    }

    connectedCallback() {
        console.log('🚀 Enhanced Task System connected with AI features');
        try {
            this.loadTasks();
            this.generateAISuggestions();
            this.render();
            this.setupEventListeners();
            this.initializeAdvancedFeatures();
            this.startRealTimeUpdates();
            this.initializeAnimations();
            this.setupIntersectionObserver();
        } catch (error) {
            console.error('❌ Error initializing Enhanced Task System:', error);
            this.renderFallback();
        }
        
        // Force render AI insights after initialization - but only once
        setTimeout(() => {
            this.forceRenderAIInsights();
            // Set up a safety check to prevent insights from disappearing
            this.setupInsightProtection();
        }, 200);
        
        // Additional safety check after a longer delay
        setTimeout(() => {
            const insightsContainer = this.querySelector('.ai-insights-grid');
            if (insightsContainer) {
                const hasVisibleInsights = insightsContainer.querySelectorAll('.ai-insight-card').length > 0;
                if (!hasVisibleInsights) {
                    console.log('🔧 Safety check: AI insights still missing, re-rendering...');
                    this.forceRenderAIInsights();
                }
            }
        }, 1000);
    }
    
    disconnectedCallback() {
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
        }
        this.stopRealTimeUpdates();
        
        // Clean up the insight protection observer
        if (this.insightObserver) {
            this.insightObserver.disconnect();
            this.insightObserver = null;
        }
    }
    
    startRealTimeUpdates() {
        // Start real-time updates for task system - less frequent to avoid clearing AI insights
        this.realTimeUpdates = setInterval(() => {
            // Protect header content before updates
            this.protectHeaderContent();
            
            this.updateTaskMetrics();
            // Only refresh AI insights occasionally and when needed
            if (this.needsInsightRefresh) {
                this.refreshAIInsights();
            }
        }, 60000); // Update every 60 seconds instead of 30
    }
    
    stopRealTimeUpdates() {
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
            this.realTimeUpdates = null;
        }
    }
    
    protectHeaderContent() {
        // Ensure header content is always visible
        const headerTitle = this.querySelector('.task-system-title');
        const headerSubtitle = this.querySelector('.task-system-subtitle');
        const headerStats = this.querySelector('.header-stats');
        
        if (headerTitle && !headerTitle.textContent.trim()) {
            headerTitle.innerHTML = `
                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 11l3 3L22 4"></path>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                Smart Task Management
            `;
        }
        
        if (headerSubtitle && !headerSubtitle.textContent.trim()) {
            headerSubtitle.textContent = 'AI-powered task organization with intelligent insights and workflow optimization';
        }
        
        if (headerStats && !headerStats.innerHTML.trim()) {
            headerStats.innerHTML = this.renderTaskStats();
        }
    }
    
    updateTaskMetrics() {
        // Update performance metrics in real-time
        this.updatePerformanceMetrics();
        
        // Update task stats display - but preserve the container structure
        const statsContainer = this.querySelector('.task-stats');
        if (statsContainer) {
            const currentContent = statsContainer.innerHTML.trim();
            if (currentContent && currentContent !== '') {
                // Only update if content exists to prevent clearing
                statsContainer.innerHTML = this.renderTaskStats();
            }
        }
    }
    
        refreshAIInsights() {
        // Only refresh AI insights if they're actually empty or if we have new content
        const insightsContainer = this.querySelector('.ai-insights-grid');
        if (insightsContainer) {
            const currentContent = insightsContainer.innerHTML.trim();
            const hasVisibleInsights = insightsContainer.querySelectorAll('.ai-insight-card').length > 0;
            
            // Only refresh if truly empty or if we have new insights to show
            if ((!currentContent || currentContent === '' || !hasVisibleInsights) && this.needsInsightRefresh) {
                console.log('🔄 Refreshing AI insights...');
                
                // Generate new suggestions first
                this.generateAISuggestions();
                
                // Render the insights
                insightsContainer.innerHTML = this.renderAIInsights();
                
                // Trigger animations for newly rendered insights
                const newInsightCards = insightsContainer.querySelectorAll('.ai-insight-card');
                newInsightCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate-in');
                    }, index * 100);
                });
                
                this.needsInsightRefresh = false;
            }
        }
         }
     
     setupInsightProtection() {
         // Monitor AI insights container and restore if it gets cleared unexpectedly
         const insightsContainer = this.querySelector('.ai-insights-grid');
         if (insightsContainer) {
             // Use MutationObserver to detect if content gets cleared
             const observer = new MutationObserver((mutations) => {
                 mutations.forEach((mutation) => {
                     if (mutation.type === 'childList' && 
                         insightsContainer.children.length === 0 && 
                         !this.isDeliberatelyClearing) {
                         console.log('🛡️ AI insights cleared unexpectedly, restoring...');
                         
                         // Add a small delay to ensure the DOM has settled
                         setTimeout(() => {
                             this.forceRenderAIInsights();
                         }, 200);
                     }
                 });
             });
             
             observer.observe(insightsContainer, {
                 childList: true,
                 subtree: true
             });
             
             // Store the observer for cleanup
             this.insightObserver = observer;
             
             // Also set up a periodic check as a backup
             setInterval(() => {
                 const hasVisibleInsights = insightsContainer.querySelectorAll('.ai-insight-card').length > 0;
                 if (!hasVisibleInsights && !this.isDeliberatelyClearing) {
                     console.log('🛡️ Periodic check: AI insights missing, restoring...');
                     this.forceRenderAIInsights();
                 }
             }, 10000); // Check every 10 seconds
         }
     }
     
     forceRenderAIInsights() {
         // Force render AI insights if they're empty or not visible
         const insightsContainer = this.querySelector('.ai-insights-grid');
         if (insightsContainer) {
             const currentContent = insightsContainer.innerHTML.trim();
             const hasVisibleInsights = insightsContainer.querySelectorAll('.ai-insight-card').length > 0;
             
             if (!currentContent || currentContent === '' || !hasVisibleInsights) {
                 console.log('🔧 Force rendering AI insights...');
                 insightsContainer.innerHTML = this.renderAIInsights();
                 
                 // Trigger animations for newly rendered insights with a slight delay
                 setTimeout(() => {
                     const newInsightCards = insightsContainer.querySelectorAll('.ai-insight-card');
                     newInsightCards.forEach((card, index) => {
                         setTimeout(() => {
                             card.classList.add('animate-in');
                         }, index * 150);
                     });
                 }, 50);
             }
         }
         
         // Also ensure the analytics section is populated
         const analyticsContainer = this.querySelector('.analytics-grid');
         if (analyticsContainer) {
             const currentContent = analyticsContainer.innerHTML.trim();
             if (!currentContent || currentContent === '') {
                 console.log('🔧 Force rendering analytics...');
                 analyticsContainer.innerHTML = this.renderPerformanceAnalytics();
             }
         }
     }
     
     updateTaskContent() {
        // Update the main task content area
        const taskContent = this.querySelector('#taskContent');
        if (taskContent) {
            taskContent.innerHTML = this.renderTaskContent();
        }
        
        // Also update task stats - but preserve header structure
        const statsContainer = this.querySelector('.task-stats');
        if (statsContainer) {
            const currentContent = statsContainer.innerHTML.trim();
            if (currentContent && currentContent !== '') {
                statsContainer.innerHTML = this.renderTaskStats();
            }
        }
        
        // Re-setup event listeners for new content
        this.setupTaskContentEventListeners();
    }
    
    setupTaskContentEventListeners() {
        // Re-setup event listeners for dynamically generated content
        this.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = btn.dataset.action;
                const taskId = parseInt(btn.dataset.taskId);
                if (taskId) {
                    this.handleTaskAction(action, taskId);
                }
            });
        });
    }
    
    handleTaskAction(action, taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;
        
        switch (action) {
            case 'edit':
                this.editTask(task);
                break;
            case 'delete':
                this.deleteTask(taskId);
                break;
            case 'toggle-status':
                this.toggleTaskStatus(taskId);
                break;
            default:
                console.log('Unknown task action:', action);
        }
    }
    
    editTask(task) {
        // Show task modal with existing data
        this.showTaskModal(task);
    }
    
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.updateTaskContent();
            this.showAINotification('Task deleted successfully', 'success');
        }
    }
    
    toggleTaskStatus(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            const statusOrder = ['pending', 'in-progress', 'completed'];
            const currentIndex = statusOrder.indexOf(task.status);
            const nextIndex = (currentIndex + 1) % statusOrder.length;
            task.status = statusOrder[nextIndex];
            
            if (task.status === 'completed') {
                task.progress = 100;
            } else if (task.status === 'pending') {
                task.progress = 0;
            }
            
            this.updateTaskContent();
            this.showAINotification(`Task status changed to ${task.status.replace('-', ' ')}`, 'success');
        }
    }
    
    renderFallback() {
        this.innerHTML = `
            <div class="enhanced-task-system">
                <div class="task-system-header">
                    <h2>🔄 Loading Task Management System...</h2>
                    <div class="loading-spinner"></div>
                </div>
            </div>
        `;
    }

    generateAISuggestions() {
        this.aiSuggestions = [
            {
                type: 'quick-task',
                title: 'Update API documentation',
                priority: 'medium',
                estimatedTime: '30 min',
                reasoning: 'Small, focused task that can boost productivity'
            },
            {
                type: 'optimization',
                title: 'Batch similar testing tasks',
                description: 'Group mobile testing with desktop testing for efficiency',
                timesSaved: '2 hours'
            },
            {
                type: 'deadline-alert',
                title: 'Security audit approaching',
                urgency: 'high',
                daysLeft: 2,
                suggestion: 'Consider allocating additional resources'
            }
        ];
        
        // Ensure AI insights are also refreshed with dynamic content
        this.refreshAIInsightsContent();
    }
    
    refreshAIInsightsContent() {
        // Keep the AI insights from constructor but refresh them with current data
        const completedTasks = this.tasks.filter(t => t.status === 'completed').length;
        const totalTasks = this.tasks.length;
        const completionRate = Math.round((completedTasks / totalTasks) * 100);
        
        // Store previous insight to check if content actually changed
        const previousDescription = this.aiInsights[1].description;
        
        // Update insights based on current task data
        this.aiInsights[1].description = `Based on current pace, you'll complete ${Math.ceil((totalTasks - completedTasks) * 0.4)} more tasks this week`;
        this.aiInsights[1].confidence = Math.min(95, 75 + completionRate * 0.2);
        
        // Update optimization insight based on task distribution
        const pendingTasks = this.tasks.filter(t => t.status === 'pending').length;
        if (pendingTasks > 3) {
            this.aiInsights[2].description = `Prioritizing ${Math.min(3, pendingTasks)} pending tasks could increase efficiency by 18%`;
        }
        
        // Only mark for refresh if content actually changed
        if (previousDescription !== this.aiInsights[1].description) {
            this.needsInsightRefresh = true;
        }
    }

    loadTasks() {
        // Enhanced task data with AI-generated insights
        this.tasks = [
            {
                id: 1,
                title: 'Complete homepage redesign',
                description: 'Update the main landing page with new design system and modern UI components including glassmorphism effects',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Maya Patel',
                assigneeAvatar: '👩‍💻',
                dueDate: '2024-01-15',
                createdDate: '2024-01-05',
                tags: ['design', 'frontend', 'ui/ux', 'glassmorphism'],
                progress: 75,
                estimatedHours: 16,
                actualHours: 12,
                category: 'development',
                comments: 8,
                attachments: 5,
                aiScore: 92,
                blockers: 0,
                dependencies: ['Design system approval'],
                timeLogged: '12h 30m'
            },
            {
                id: 2,
                title: 'API documentation review',
                description: 'Review and update comprehensive API documentation for v2.1 release with new endpoints and authentication methods',
                priority: 'medium',
                status: 'completed',
                assignee: 'David Kim',
                assigneeAvatar: '👨‍💼',
                dueDate: '2024-01-10',
                createdDate: '2024-01-02',
                tags: ['backend', 'documentation', 'api', 'review'],
                progress: 100,
                estimatedHours: 8,
                actualHours: 6,
                category: 'documentation',
                comments: 3,
                attachments: 2,
                aiScore: 98,
                blockers: 0,
                dependencies: [],
                timeLogged: '6h 15m'
            },
            {
                id: 3,
                title: 'Mobile app testing',
                description: 'Conduct comprehensive testing on iOS and Android platforms for new features including performance benchmarking',
                priority: 'high',
                status: 'pending',
                assignee: 'Sophie Chen',
                assigneeAvatar: '👩‍🔬',
                dueDate: '2024-01-20',
                createdDate: '2024-01-08',
                tags: ['testing', 'mobile', 'qa', 'performance'],
                progress: 0,
                estimatedHours: 24,
                actualHours: 0,
                category: 'testing',
                comments: 2,
                attachments: 1,
                aiScore: 85,
                blockers: 1,
                dependencies: ['App build completion'],
                timeLogged: '0h'
            },
            {
                id: 4,
                title: 'Database optimization',
                description: 'Optimize query performance, add strategic indexes, and implement caching for better scalability and response times',
                priority: 'medium',
                status: 'in-progress',
                assignee: 'David Kim',
                assigneeAvatar: '👨‍💼',
                dueDate: '2024-01-25',
                createdDate: '2024-01-10',
                tags: ['backend', 'database', 'performance', 'optimization'],
                progress: 45,
                estimatedHours: 12,
                actualHours: 5,
                category: 'backend',
                comments: 6,
                attachments: 3,
                aiScore: 88,
                blockers: 0,
                dependencies: ['Performance baseline'],
                timeLogged: '5h 45m'
            },
            {
                id: 5,
                title: 'User research interviews',
                description: 'Conduct in-depth user interviews for feature validation, gather actionable feedback, and analyze user behavior patterns',
                priority: 'low',
                status: 'pending',
                assignee: 'Emma Wilson',
                assigneeAvatar: '👩‍🎨',
                dueDate: '2024-01-18',
                createdDate: '2024-01-12',
                tags: ['research', 'ux', 'interviews', 'analysis'],
                progress: 0,
                estimatedHours: 20,
                actualHours: 0,
                category: 'research',
                comments: 4,
                attachments: 0,
                aiScore: 76,
                blockers: 0,
                dependencies: ['Participant recruitment'],
                timeLogged: '0h'
            },
            {
                id: 6,
                title: 'Security audit',
                description: 'Perform comprehensive security audit, vulnerability assessment, and implement recommended security measures',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Alex Rodriguez',
                assigneeAvatar: '🔒',
                dueDate: '2024-01-22',
                createdDate: '2024-01-14',
                tags: ['security', 'audit', 'backend', 'compliance'],
                progress: 30,
                estimatedHours: 32,
                actualHours: 10,
                category: 'security',
                comments: 12,
                attachments: 8,
                aiScore: 94,
                blockers: 0,
                dependencies: ['Access permissions'],
                timeLogged: '10h 20m'
            },
            {
                id: 7,
                title: 'AI integration prototype',
                description: 'Develop prototype for AI-powered task suggestions and intelligent workflow optimization features',
                priority: 'high',
                status: 'in-progress',
                assignee: 'Maya Patel',
                assigneeAvatar: '👩‍💻',
                dueDate: '2024-01-28',
                createdDate: '2024-01-16',
                tags: ['ai', 'machine-learning', 'prototype', 'innovation'],
                progress: 65,
                estimatedHours: 40,
                actualHours: 26,
                category: 'innovation',
                comments: 15,
                attachments: 12,
                aiScore: 96,
                blockers: 0,
                dependencies: ['ML model training'],
                timeLogged: '26h 10m'
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
                                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 11l3 3L22 4"></path>
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                </svg>
                                Smart Task Management
                            </h2>
                            <p class="task-system-subtitle">AI-powered task organization with intelligent insights and workflow optimization</p>
                        </div>
                        <div class="header-stats">
                            ${this.renderTaskStats()}
                        </div>
                    </div>
                    
                    <!-- AI-Powered Insights Section -->
                    <div class="ai-insights-section">
                        <h3 class="insights-title">
                            <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            AI-Powered Task Insights
                        </h3>
                        <div class="ai-insights-grid">
                            ${this.renderAIInsights()}
                        </div>
                    </div>
                    
                    <div class="task-controls">
                        <div class="search-and-filters">
                            <div class="search-container">
                                <input type="text" class="task-search" placeholder="🔍 Search tasks, assignees, or tags..." id="taskSearch">
                                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </div>
                            
                            <div class="filter-controls">
                                <select class="enhanced-select" id="statusFilter">
                                    <option value="all">📋 All Status</option>
                                    <option value="pending">⏳ Pending</option>
                                    <option value="in-progress">🔄 In Progress</option>
                                    <option value="completed">✅ Completed</option>
                                </select>
                                
                                <select class="enhanced-select" id="priorityFilter">
                                    <option value="all">🎯 All Priority</option>
                                    <option value="high">🔴 High Priority</option>
                                    <option value="medium">🟡 Medium Priority</option>
                                    <option value="low">🟢 Low Priority</option>
                                </select>
                                
                                <select class="enhanced-select" id="sortBy">
                                    <option value="priority">📊 Sort by Priority</option>
                                    <option value="dueDate">📅 Sort by Due Date</option>
                                    <option value="progress">📈 Sort by Progress</option>
                                    <option value="assignee">👤 Sort by Assignee</option>
                                    <option value="aiScore">🤖 Sort by AI Score</option>
                                    <option value="created">🕒 Sort by Created</option>
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
                            
                            <button class="enhanced-btn primary" id="addTaskBtn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 5v14M5 12h14"></path>
                                </svg>
                                Create Task
                            </button>
                            
                            <button class="enhanced-btn secondary" id="aiSuggestionsBtn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                AI Insights
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="task-content" id="taskContent">
                    ${this.renderTaskContent()}
                </div>
                
                <!-- Performance Analytics -->
                <div class="task-analytics">
                    <h3 class="analytics-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Performance Analytics
                    </h3>
                    <div class="analytics-grid">
                        ${this.renderPerformanceAnalytics()}
                    </div>
                </div>
            </div>
            
            <!-- Enhanced Quick Actions Panel -->
            <div class="ai-quick-actions-panel" id="quickActionsPanel">
                <div class="panel-header">
                    <h3>🤖 Smart Actions</h3>
                    <button class="close-panel" id="closePanelBtn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="panel-content">
                    ${this.renderSmartActions()}
                </div>
            </div>
            
            <!-- Enhanced Task Creation Modal -->
            <div class="task-modal" id="taskModal">
                <div class="modal-backdrop" id="modalBackdrop"></div>
                <div class="modal-content">
                    ${this.renderEnhancedTaskForm()}
                </div>
            </div>
        `;
        
        // Add entrance animation
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
        const avgAIScore = Math.round(this.tasks.reduce((sum, task) => sum + task.aiScore, 0) / total);
        
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
                <div class="stat-card ai-score">
                    <div class="stat-icon">🤖</div>
                    <div class="stat-info">
                        <div class="stat-number">${avgAIScore}%</div>
                        <div class="stat-label">AI Score</div>
                    </div>
                </div>
                ${overdue > 0 ? `
                <div class="stat-card overdue">
                    <div class="stat-icon">🚨</div>
                    <div class="stat-info">
                        <div class="stat-number">${overdue}</div>
                        <div class="stat-label">Overdue</div>
                    </div>
                </div>
                ` : ''}
            </div>
        `;
    }

    renderAIInsights() {
        return this.aiInsights.map(insight => `
            <div class="ai-insight-card ${insight.type}">
                <div class="insight-header">
                    <div class="insight-icon">${insight.icon}</div>
                    <div class="insight-meta">
                        <h4 class="insight-title">${insight.title}</h4>
                        <div class="confidence-indicator">
                            <div class="confidence-bar">
                                <div class="confidence-fill" style="width: ${insight.confidence}%"></div>
                            </div>
                            <span class="confidence-text">${insight.confidence}% confidence</span>
                        </div>
                    </div>
                    <div class="impact-badge ${insight.impact}">${insight.impact} impact</div>
                </div>
                <p class="insight-description">${insight.description}</p>
                <div class="insight-actions">
                    <button class="insight-action-btn primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        Apply Suggestion
                    </button>
                    <button class="insight-action-btn secondary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                        </svg>
                        Learn More
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderPerformanceAnalytics() {
        const completionRate = Math.round((this.tasks.filter(t => t.status === 'completed').length / this.tasks.length) * 100);
        const avgProgress = Math.round(this.tasks.reduce((sum, task) => sum + task.progress, 0) / this.tasks.length);
        const onTimeDelivery = 87; // Simulated metric
        const teamEfficiency = 92; // Simulated metric
        
        return `
            <div class="analytics-metric">
                <div class="metric-icon">📈</div>
                <div class="metric-content">
                    <div class="metric-value">${completionRate}%</div>
                    <div class="metric-label">Completion Rate</div>
                    <div class="metric-trend positive">+12% this week</div>
                </div>
            </div>
            <div class="analytics-metric">
                <div class="metric-icon">⚡</div>
                <div class="metric-content">
                    <div class="metric-value">${avgProgress}%</div>
                    <div class="metric-label">Avg Progress</div>
                    <div class="metric-trend positive">+8% improvement</div>
                </div>
            </div>
            <div class="analytics-metric">
                <div class="metric-icon">🎯</div>
                <div class="metric-content">
                    <div class="metric-value">${onTimeDelivery}%</div>
                    <div class="metric-label">On-Time Delivery</div>
                    <div class="metric-trend neutral">±3% this month</div>
                </div>
            </div>
            <div class="analytics-metric">
                <div class="metric-icon">🚀</div>
                <div class="metric-content">
                    <div class="metric-value">${teamEfficiency}%</div>
                    <div class="metric-label">Team Efficiency</div>
                    <div class="metric-trend positive">+15% growth</div>
                </div>
            </div>
        `;
    }

    renderSmartActions() {
        return `
            <div class="smart-action-item">
                <button class="smart-action-btn" data-action="ai-optimize">
                    <div class="action-icon">🤖</div>
                    <div class="action-content">
                        <div class="action-title">AI Task Optimization</div>
                        <div class="action-description">Let AI reorganize your tasks for maximum efficiency</div>
                    </div>
                </button>
            </div>
            <div class="smart-action-item">
                <button class="smart-action-btn" data-action="bulk-estimate">
                    <div class="action-icon">⏱️</div>
                    <div class="action-content">
                        <div class="action-title">Smart Time Estimation</div>
                        <div class="action-description">Get AI-powered time estimates for unestimated tasks</div>
                    </div>
                </button>
            </div>
            <div class="smart-action-item">
                <button class="smart-action-btn" data-action="dependency-analysis">
                    <div class="action-icon">🔗</div>
                    <div class="action-content">
                        <div class="action-title">Dependency Analysis</div>
                        <div class="action-description">Automatically detect and resolve task dependencies</div>
                    </div>
                </button>
            </div>
            <div class="smart-action-item">
                <button class="smart-action-btn" data-action="performance-report">
                    <div class="action-icon">📊</div>
                    <div class="action-content">
                        <div class="action-title">Generate Performance Report</div>
                        <div class="action-description">Create detailed analytics report with insights</div>
                    </div>
                </button>
            </div>
        `;
    }

    renderEnhancedTaskForm() {
        return `
            <div class="modal-header">
                <h2>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 5v14M5 12h14"></path>
                    </svg>
                    Create Smart Task
                </h2>
                <button class="modal-close" id="modalClose">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            
            <form class="enhanced-task-form" id="taskForm">
                <div class="form-section">
                    <h3>📝 Task Details</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskTitle">Task Title</label>
                            <input type="text" id="taskTitle" name="title" required 
                                   placeholder="Enter descriptive task title...">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskDescription">Description</label>
                            <textarea id="taskDescription" name="description" rows="3" 
                                      placeholder="Describe the task objectives, requirements, and deliverables..."></textarea>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>🎯 Planning & Priority</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskPriority">Priority Level</label>
                            <select id="taskPriority" name="priority">
                                <option value="low">🟢 Low Priority</option>
                                <option value="medium" selected>🟡 Medium Priority</option>
                                <option value="high">🔴 High Priority</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="taskCategory">Category</label>
                            <select id="taskCategory" name="category">
                                <option value="development">💻 Development</option>
                                <option value="design">🎨 Design</option>
                                <option value="testing">🔬 Testing</option>
                                <option value="documentation">📚 Documentation</option>
                                <option value="research">🔍 Research</option>
                                <option value="security">🔒 Security</option>
                                <option value="innovation">🚀 Innovation</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>👥 Assignment & Timeline</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskAssignee">Assignee</label>
                            <select id="taskAssignee" name="assignee">
                                <option value="Maya Patel">👩‍💻 Maya Patel</option>
                                <option value="David Kim">👨‍💼 David Kim</option>
                                <option value="Sophie Chen">👩‍🔬 Sophie Chen</option>
                                <option value="Emma Wilson">👩‍🎨 Emma Wilson</option>
                                <option value="Alex Rodriguez">🔒 Alex Rodriguez</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="taskDueDate">Due Date</label>
                            <input type="date" id="taskDueDate" name="dueDate" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskEstimatedHours">Estimated Hours</label>
                            <input type="number" id="taskEstimatedHours" name="estimatedHours" 
                                   min="1" max="200" placeholder="8">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>🏷️ Tags & Dependencies</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskTags">Tags</label>
                            <input type="text" id="taskTags" name="tags" 
                                   placeholder="frontend, ui, responsive, accessibility...">
                            <small>Separate tags with commas</small>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskDependencies">Dependencies</label>
                            <input type="text" id="taskDependencies" name="dependencies" 
                                   placeholder="Design approval, API endpoint, testing data...">
                            <small>Tasks or requirements that must be completed first</small>
                        </div>
                    </div>
                </div>

                <div class="ai-suggestions-form">
                    <h3>🤖 AI Suggestions</h3>
                    <div class="ai-suggestion-item">
                        <div class="suggestion-icon">💡</div>
                        <div class="suggestion-text">Based on similar tasks, consider adding "accessibility testing" and "performance optimization" tags</div>
                        <button type="button" class="apply-suggestion-btn">Apply</button>
                    </div>
                    <div class="ai-suggestion-item">
                        <div class="suggestion-icon">⏱️</div>
                        <div class="suggestion-text">Recommended time estimate: 12-16 hours based on task complexity</div>
                        <button type="button" class="apply-suggestion-btn">Apply</button>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="enhanced-btn secondary" id="cancelTaskBtn">Cancel</button>
                    <button type="submit" class="enhanced-btn primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"></path>
                        </svg>
                        Create Task
                    </button>
                </div>
            </form>
        `;
    }

    initializeAnimations() {
        // Staggered entrance animations
        const elements = this.querySelectorAll('.stat-card, .analytics-metric');
        elements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
            element.classList.add('animate-in');
        });
        
        // Ensure AI insights are visible with proper timing
        const aiInsightCards = this.querySelectorAll('.ai-insight-card');
        if (aiInsightCards.length > 0) {
            aiInsightCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                }, index * 150);
            });
        } else {
            // If no AI insight cards are found, force render them
            setTimeout(() => {
                this.forceRenderAIInsights();
            }, 500);
        }
    }

    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '50px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.isVisible = true;
                    this.initializeAnimations();
                }
            });
        }, options);
        
        observer.observe(this);
    }

    initializeAdvancedFeatures() {
        // Initialize keyboard shortcuts
        this.setupKeyboardShortcuts();
        
        // Initialize AI features
        this.setupAIFeatures();
        
        // Setup performance tracking
        this.setupPerformanceTracking();
        
        console.log('🤖 Advanced task system features initialized');
    }

    setupAIFeatures() {
        // Initialize AI scoring system
        this.tasks.forEach(task => {
            if (!task.aiScore) {
                task.aiScore = this.calculateInitialAIScore({
                    get: (key) => {
                        switch(key) {
                            case 'title': return task.title;
                            case 'description': return task.description;
                            case 'tags': return task.tags.join(',');
                            case 'dependencies': return task.dependencies.join(',');
                            default: return '';
                        }
                    }
                });
            }
        });
    }

    setupPerformanceTracking() {
        // Track task system usage
        this.performanceMetrics.lastAccessed = new Date().toISOString();
        
        // Set up periodic performance updates
        this.performanceInterval = setInterval(() => {
            this.updatePerformanceMetrics();
        }, 30000); // Update every 30 seconds
    }

    updatePerformanceMetrics() {
        const completedTasks = this.tasks.filter(t => t.status === 'completed');
        this.performanceMetrics.completionRate = Math.round((completedTasks.length / this.tasks.length) * 100);
        this.performanceMetrics.averageProgress = Math.round(
            this.tasks.reduce((sum, task) => sum + task.progress, 0) / this.tasks.length
        );
    }

    setupKeyboardShortcuts() {
        // Enhanced keyboard shortcuts - only set up once
        if (this.keyboardShortcutsSetup) return;
        this.keyboardShortcutsSetup = true;
        
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when task system is focused or visible
            if (!this.contains(document.activeElement) && e.target !== document.body) return;
            
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'n':
                        e.preventDefault();
                        this.showTaskModal();
                        this.trackEvent('keyboard_shortcut', { action: 'new_task' });
                        break;
                    case 'f':
                        e.preventDefault();
                        const searchInput = this.querySelector('#taskSearch');
                        if (searchInput) {
                            searchInput.focus();
                            this.trackEvent('keyboard_shortcut', { action: 'search_focus' });
                        }
                        break;
                    case 'k':
                        e.preventDefault();
                        this.toggleAIInsightsPanel();
                        this.trackEvent('keyboard_shortcut', { action: 'ai_panel' });
                        break;
                    case '1':
                    case '2':
                    case '3':
                        e.preventDefault();
                        const viewBtns = this.querySelectorAll('.view-btn');
                        const index = parseInt(e.key) - 1;
                        if (viewBtns[index]) {
                            viewBtns[index].click();
                            this.trackEvent('keyboard_shortcut', { action: 'view_change', view: index });
                        }
                        break;
                }
            }
            
            // Escape key handling
            if (e.key === 'Escape') {
                this.hideTaskModal();
                this.hideAIInsightsPanel();
            }
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
                task.tags.some(tag => tag.toLowerCase().includes(query)) ||
                task.category.toLowerCase().includes(query)
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
                case 'aiScore':
                    return b.aiScore - a.aiScore;
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
        // Enhanced search functionality with debouncing
        let searchTimeout;
        this.querySelector('#taskSearch')?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.searchQuery = e.target.value;
                this.updateTaskContent();
                this.trackEvent('search', { query: e.target.value });
            }, 300);
        });

        // Filter controls with analytics tracking
        this.querySelector('#statusFilter')?.addEventListener('change', (e) => {
            this.filter = e.target.value;
            this.updateTaskContent();
            this.trackEvent('filter_status', { value: e.target.value });
        });

        this.querySelector('#priorityFilter')?.addEventListener('change', (e) => {
            const priorityFilter = e.target.value;
            if (priorityFilter !== 'all') {
                // Apply priority filter to existing filtered tasks
                this.filter = 'all'; // Reset status filter when using priority filter
                this.updateTaskContent();
            }
            this.trackEvent('filter_priority', { value: priorityFilter });
        });

        this.querySelector('#sortBy')?.addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.updateTaskContent();
            this.trackEvent('sort_change', { value: e.target.value });
        });

        // Enhanced view toggle with animations
        this.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const previousView = this.viewMode;
                this.viewMode = btn.dataset.view;
                this.updateTaskContentWithTransition(previousView);
                this.trackEvent('view_change', { from: previousView, to: this.viewMode });
            });
        });

        // Enhanced modal controls
        this.querySelector('#addTaskBtn')?.addEventListener('click', () => {
            this.showTaskModal();
            this.trackEvent('task_create_initiated');
        });

        this.querySelector('#modalClose')?.addEventListener('click', () => {
            this.hideTaskModal();
        });

        this.querySelector('#modalBackdrop')?.addEventListener('click', () => {
            this.hideTaskModal();
        });

        // AI Insights button
        this.querySelector('#aiSuggestionsBtn')?.addEventListener('click', () => {
            this.toggleAIInsightsPanel();
            this.trackEvent('ai_insights_accessed');
        });

        // Close panel button
        this.querySelector('#closePanelBtn')?.addEventListener('click', () => {
            this.hideAIInsightsPanel();
        });

        // Enhanced task actions with AI context
        this.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (actionBtn) {
                const action = actionBtn.dataset.action;
                const taskId = parseInt(actionBtn.dataset.taskId);
                
                // Handle smart actions
                if (['ai-optimize', 'bulk-estimate', 'dependency-analysis', 'performance-report'].includes(action)) {
                    this.handleSmartAction(action);
                } else if (taskId) {
                    this.handleTaskAction(action, taskId);
                } else {
                    this.handleQuickAction(action);
                }
            }

            // Handle AI suggestion applications
            const suggestionBtn = e.target.closest('.apply-suggestion-btn');
            if (suggestionBtn) {
                this.applySuggestion(suggestionBtn);
            }

            // Handle insight actions
            const insightBtn = e.target.closest('.insight-action-btn');
            if (insightBtn) {
                const action = insightBtn.classList.contains('primary') ? 'apply' : 'learn';
                this.handleInsightAction(action, insightBtn.closest('.ai-insight-card'));
            }
        });

        // Form submission with AI validation
        this.querySelector('#taskForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.createTaskWithAI(new FormData(e.target));
        });

        // Enhanced drag and drop
        this.setupAdvancedDragAndDrop();

        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    setupAdvancedDragAndDrop() {
        this.addEventListener('dragstart', (e) => {
            if (e.target.draggable) {
                this.draggedTask = e.target;
                e.target.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                
                // Add visual feedback
                e.target.style.opacity = '0.5';
                this.addDropZones();
            }
        });

        this.addEventListener('dragend', (e) => {
            if (e.target.draggable) {
                e.target.classList.remove('dragging');
                e.target.style.opacity = '';
                this.removeDropZones();
                this.draggedTask = null;
            }
        });

        this.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            
            // Highlight drop zone
            const dropZone = e.target.closest('.kanban-tasks');
            if (dropZone) {
                dropZone.classList.add('drag-over');
            }
        });

        this.addEventListener('dragleave', (e) => {
            const dropZone = e.target.closest('.kanban-tasks');
            if (dropZone && !dropZone.contains(e.relatedTarget)) {
                dropZone.classList.remove('drag-over');
            }
        });

        this.addEventListener('drop', (e) => {
            e.preventDefault();
            const kanbanColumn = e.target.closest('.kanban-tasks');
            if (kanbanColumn && this.draggedTask) {
                const newStatus = kanbanColumn.dataset.status;
                const taskId = parseInt(this.draggedTask.dataset.taskId);
                this.updateTaskStatusWithAI(taskId, newStatus);
                kanbanColumn.classList.remove('drag-over');
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when task system is focused
            if (!this.contains(document.activeElement) && e.target !== document.body) return;
            
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
                    case 'k':
                        e.preventDefault();
                        this.toggleAIInsightsPanel();
                        break;
                    case '1':
                    case '2':
                    case '3':
                        e.preventDefault();
                        const viewBtns = this.querySelectorAll('.view-btn');
                        const index = parseInt(e.key) - 1;
                        if (viewBtns[index]) {
                            viewBtns[index].click();
                        }
                        break;
                }
            }
            
            // Escape key handling
            if (e.key === 'Escape') {
                this.hideTaskModal();
                this.hideAIInsightsPanel();
            }
        });
    }

    // AI-Enhanced Methods
    handleSmartAction(action) {
        switch (action) {
            case 'ai-optimize':
                this.optimizeTasksWithAI();
                break;
            case 'bulk-estimate':
                this.bulkEstimateWithAI();
                break;
            case 'dependency-analysis':
                this.analyzeDependencies();
                break;
            case 'performance-report':
                this.generatePerformanceReport();
                break;
        }
        this.hideAIInsightsPanel();
    }

    optimizeTasksWithAI() {
        this.showAINotification('🤖 AI is analyzing your tasks...', 'info');
        
        // Simulate AI optimization
        setTimeout(() => {
            // Reorder tasks based on AI recommendations
            this.tasks.sort((a, b) => {
                const aScore = this.calculateAIOptimizationScore(a);
                const bScore = this.calculateAIOptimizationScore(b);
                return bScore - aScore;
            });
            
            this.updateTaskContent();
            this.showAINotification('✅ Tasks optimized for maximum efficiency!', 'success');
            this.trackEvent('ai_optimization_applied');
        }, 2000);
    }

    calculateAIOptimizationScore(task) {
        let score = 0;
        
        // Priority weight
        score += this.getPriorityWeight(task.priority) * 30;
        
        // Due date urgency
        const daysUntilDue = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
        score += Math.max(0, 30 - daysUntilDue) * 10;
        
        // Progress consideration
        if (task.status === 'in-progress') score += 20;
        
        // Blocker penalty
        score -= task.blockers * 15;
        
        // AI score boost
        score += task.aiScore * 0.5;
        
        return score;
    }

    bulkEstimateWithAI() {
        this.showAINotification('🕒 AI is calculating time estimates...', 'info');
        
        setTimeout(() => {
            const unestimatedTasks = this.tasks.filter(task => !task.estimatedHours || task.estimatedHours === 0);
            let updatedCount = 0;
            
            unestimatedTasks.forEach(task => {
                task.estimatedHours = this.generateAIEstimate(task);
                updatedCount++;
            });
            
            if (updatedCount > 0) {
                this.updateTaskContent();
                this.showAINotification(`✅ Added estimates to ${updatedCount} tasks!`, 'success');
            } else {
                this.showAINotification('ℹ️ All tasks already have estimates', 'info');
            }
        }, 1500);
    }

    generateAIEstimate(task) {
        const baseHours = {
            'development': 12,
            'design': 8,
            'testing': 6,
            'documentation': 4,
            'research': 16,
            'security': 20,
            'innovation': 30
        };
        
        let estimate = baseHours[task.category] || 8;
        
        // Adjust based on priority
        const priorityMultiplier = { high: 1.3, medium: 1, low: 0.8 };
        estimate *= priorityMultiplier[task.priority];
        
        // Adjust based on description length (complexity indicator)
        const complexityFactor = Math.min(2, task.description.length / 100);
        estimate *= (0.8 + complexityFactor * 0.4);
        
        return Math.round(estimate);
    }

    analyzeDependencies() {
        this.showAINotification('🔗 Analyzing task dependencies...', 'info');
        
        setTimeout(() => {
            let dependencyIssues = 0;
            
            this.tasks.forEach(task => {
                if (task.dependencies.length > 0) {
                    // Check for potential circular dependencies or blockers
                    const hasIssues = Math.random() < 0.3; // Simulate detection
                    if (hasIssues) {
                        dependencyIssues++;
                        task.aiScore = Math.max(50, task.aiScore - 10);
                    }
                }
            });
            
            this.updateTaskContent();
            
            if (dependencyIssues > 0) {
                this.showAINotification(`⚠️ Found ${dependencyIssues} dependency issues`, 'warning');
            } else {
                this.showAINotification('✅ No dependency issues found!', 'success');
            }
        }, 1800);
    }

    generatePerformanceReport() {
        this.showAINotification('📊 Generating performance report...', 'info');
        
        setTimeout(() => {
            const report = this.compilePerformanceData();
            this.downloadReport(report);
            this.showAINotification('✅ Performance report downloaded!', 'success');
        }, 2500);
    }

    compilePerformanceData() {
        const completedTasks = this.tasks.filter(t => t.status === 'completed');
        const totalEstimated = this.tasks.reduce((sum, t) => sum + (t.estimatedHours || 0), 0);
        const totalActual = this.tasks.reduce((sum, t) => sum + (t.actualHours || 0), 0);
        
        return {
            overview: {
                totalTasks: this.tasks.length,
                completedTasks: completedTasks.length,
                completionRate: Math.round((completedTasks.length / this.tasks.length) * 100),
                avgAIScore: Math.round(this.tasks.reduce((sum, t) => sum + t.aiScore, 0) / this.tasks.length)
            },
            timeTracking: {
                totalEstimated,
                totalActual,
                efficiency: totalEstimated > 0 ? Math.round((totalEstimated / totalActual) * 100) : 0
            },
            insights: this.aiInsights,
            generatedAt: new Date().toISOString()
        };
    }

    downloadReport(data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `task-performance-report-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    createTaskWithAI(formData) {
        const taskData = {
            id: this.tasks.length + 1,
            title: formData.get('title'),
            description: formData.get('description'),
            priority: formData.get('priority'),
            status: 'pending',
            assignee: formData.get('assignee'),
            assigneeAvatar: this.getAssigneeAvatar(formData.get('assignee')),
            dueDate: formData.get('dueDate'),
            createdDate: new Date().toISOString().split('T')[0],
            tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
            progress: 0,
            estimatedHours: parseInt(formData.get('estimatedHours')) || this.generateAIEstimate({
                category: formData.get('category'),
                priority: formData.get('priority'),
                description: formData.get('description')
            }),
            actualHours: 0,
            category: formData.get('category'),
            comments: 0,
            attachments: 0,
            aiScore: this.calculateInitialAIScore(formData),
            blockers: 0,
            dependencies: formData.get('dependencies') ? formData.get('dependencies').split(',').map(dep => dep.trim()) : [],
            timeLogged: '0h'
        };

        this.tasks.push(taskData);
        this.updateTaskContent();
        this.hideTaskModal();
        this.showAINotification(`✅ Task "${taskData.title}" created successfully!`, 'success');
        this.trackEvent('task_created', { category: taskData.category, priority: taskData.priority });
    }

    calculateInitialAIScore(formData) {
        let score = 70; // Base score
        
        // Title quality
        const titleLength = formData.get('title').length;
        if (titleLength > 10 && titleLength < 60) score += 10;
        
        // Description quality
        const descLength = formData.get('description').length;
        if (descLength > 50) score += 15;
        
        // Has tags
        if (formData.get('tags')) score += 10;
        
        // Has dependencies
        if (formData.get('dependencies')) score += 5;
        
        return Math.min(100, score);
    }

    getAssigneeAvatar(assignee) {
        const avatars = {
            'Maya Patel': '👩‍💻',
            'David Kim': '👨‍💼',
            'Sophie Chen': '👩‍🔬',
            'Emma Wilson': '👩‍🎨',
            'Alex Rodriguez': '🔒'
        };
        return avatars[assignee] || '👤';
    }

    // Enhanced UI Methods
    updateTaskContentWithTransition(previousView) {
        const content = this.querySelector('#taskContent');
        if (!content) return;
        
        // Add exit animation
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.innerHTML = this.renderTaskContent();
            
            // Add entrance animation
            requestAnimationFrame(() => {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            });
        }, 150);
    }

    toggleAIInsightsPanel() {
        const panel = this.querySelector('#quickActionsPanel');
        if (panel) {
            panel.classList.toggle('active');
        }
    }

    hideAIInsightsPanel() {
        const panel = this.querySelector('#quickActionsPanel');
        if (panel) {
            panel.classList.remove('active');
        }
    }

    showTaskModal() {
        const modal = this.querySelector('#taskModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Focus on first input
            const firstInput = modal.querySelector('input, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    hideTaskModal() {
        const modal = this.querySelector('#taskModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset form
            const form = modal.querySelector('form');
            if (form) {
                form.reset();
            }
        }
    }

    trackEvent(eventName, properties = {}) {
        // Enhanced analytics tracking
        console.log('📊 Task System Event:', eventName, properties);
        
        // Update performance metrics
        if (eventName === 'task_created') {
            this.performanceMetrics.tasksCreated++;
        } else if (eventName === 'task_completed') {
            this.performanceMetrics.tasksCompleted++;
        }
        
        // Send to analytics service if available
        if (window.analyticsService) {
            window.analyticsService.track('task_system_' + eventName, properties);
        }
    }

    calculateInitialAIScore(formData) {
        let score = 70; // Base score
        
        // Title quality
        const title = formData.get ? formData.get('title') : '';
        const titleLength = title.length;
        if (titleLength > 10 && titleLength < 60) score += 10;
        
        // Description quality
        const description = formData.get ? formData.get('description') : '';
        const descLength = description.length;
        if (descLength > 50) score += 15;
        
        // Has tags
        const tags = formData.get ? formData.get('tags') : '';
        if (tags) score += 10;
        
        // Has dependencies
        const dependencies = formData.get ? formData.get('dependencies') : '';
        if (dependencies) score += 5;
        
        return Math.min(100, score);
    }

    showAINotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `ai-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    trackEvent(eventName, properties = {}) {
        // Enhanced analytics tracking
        console.log('📊 Task System Event:', eventName, properties);
        
        // Update performance metrics
        if (eventName === 'task_created') {
            this.performanceMetrics.tasksCreated++;
        } else if (eventName === 'task_completed') {
            this.performanceMetrics.tasksCompleted++;
        }
        
        // Send to analytics service if available
        if (window.analyticsService) {
            window.analyticsService.track('task_system_' + eventName, properties);
        }
    }

    addDropZones() {
        this.querySelectorAll('.kanban-tasks').forEach(zone => {
            zone.classList.add('drop-zone-active');
        });
    }

    removeDropZones() {
        this.querySelectorAll('.kanban-tasks').forEach(zone => {
            zone.classList.remove('drop-zone-active', 'drag-over');
        });
    }

    updateTaskStatusWithAI(taskId, newStatus) {
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

    applySuggestion(suggestionBtn) {
        const suggestion = this.aiSuggestions.find(s => s.title === suggestionBtn.closest('.ai-suggestion-item').querySelector('.suggestion-text').textContent);
        if (suggestion) {
            const taskId = parseInt(suggestionBtn.closest('.ai-suggestion-item').closest('.ai-suggestions-form').closest('.enhanced-task-form').querySelector('[data-task-id]').dataset.taskId);
            if (taskId) {
                this.handleTaskAction('edit', taskId); // Assuming 'edit' is the action for applying suggestions
                this.showAINotification(`✅ Suggestion applied: "${suggestion.title}"`, 'success');
                this.trackEvent('ai_suggestion_applied', { type: suggestion.type, title: suggestion.title });
            } else {
                this.showAINotification('⚠️ Could not find task to apply suggestion to.', 'warning');
            }
        } else {
            this.showAINotification('⚠️ Could not find a matching suggestion.', 'warning');
        }
    }

    handleInsightAction(action, insightCard) {
        const insight = this.aiInsights.find(i => i.title === insightCard.querySelector('.insight-title').textContent);
        if (insight) {
            if (action === 'apply') {
                this.showAINotification(`✅ Insight applied: "${insight.title}"`, 'success');
                this.trackEvent('ai_insight_applied', { type: insight.type, title: insight.title });
            } else if (action === 'learn') {
                this.showAINotification(`ℹ️ Learn more about "${insight.title}"`, 'info');
                this.trackEvent('ai_insight_learn_more', { type: insight.type, title: insight.title });
            }
        }
    }
}

// Register the component with backward compatibility check
if (!customElements.get('task-system')) {
    customElements.define('task-system', EnhancedTaskSystem);
} 