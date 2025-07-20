// Unified Search Component
class UnifiedSearch extends HTMLElement {
    constructor() {
        super();
        this.searchResults = [];
        this.searchIndex = null;
        this.isSearching = false;
        this.currentQuery = '';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.initializeSearchIndex();
    }

    render() {
        this.innerHTML = `
            <div class="search-container">
                <div class="search-header">
                    <h2 class="search-title">Search Everything</h2>
                    <div class="search-input-container">
                        <input type="text" class="search-input" placeholder="Find documents, people, projects, and more..." id="searchInput">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="M21 21l-4.35-4.35"></path>
                        </svg>
                    </div>
                    <div class="search-filters">
                        <button class="filter-chip active" data-filter="all">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                            </svg>
                            All
                        </button>
                        <button class="filter-chip" data-filter="documents">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                <polyline points="13 2 13 9 20 9"></polyline>
                            </svg>
                            Documents
                        </button>
                        <button class="filter-chip" data-filter="people">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            People
                        </button>
                        <button class="filter-chip" data-filter="projects">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                            Projects
                        </button>
                    </div>
                </div>

                <div class="search-content">
                    <div class="search-stats">
                        <div class="results-count" id="resultsCount">Ready to search</div>
                        <div class="search-sort">
                            <span class="sort-label">Sort by:</span>
                            <select class="sort-select" id="sortSelect">
                                <option value="relevance">Relevance</option>
                                <option value="date">Date</option>
                                <option value="name">Name</option>
                                <option value="type">Type</option>
                            </select>
                        </div>
                    </div>
                    <div class="search-results" id="searchResults">
                        <div class="search-placeholder">
                            <div class="placeholder-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </div>
                            <h3 class="placeholder-title">Search Everything</h3>
                            <p class="placeholder-description">Find documents, people, projects, and more across your organization</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        const searchInput = this.querySelector('#searchInput');
        const filterChips = this.querySelectorAll('.filter-chip');
        const sortSelect = this.querySelector('#sortSelect');

        // Search input
        searchInput.addEventListener('input', (e) => {
            this.currentQuery = e.target.value;
            this.performSearch();
        });

        // Filter chips
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                filterChips.forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                this.performSearch();
            });
        });

        // Sort select
        sortSelect.addEventListener('change', () => {
            this.displayResults();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    initializeSearchIndex() {
        // Mock search index - in a real app, this would be a proper search index
        this.searchIndex = {
            documents: [
                { id: 'doc1', title: 'Company Handbook', type: 'document', category: 'HR', date: '2024-01-15', author: 'Maya Patel', tags: ['handbook', 'hr', 'policies'] },
                { id: 'doc2', title: 'API Documentation v2.1', type: 'document', category: 'Technical', date: '2024-01-10', author: 'David Kim', tags: ['api', 'documentation', 'technical'] },
                { id: 'doc3', title: 'Design System Guidelines', type: 'document', category: 'Design', date: '2024-01-08', author: 'Emma Wilson', tags: ['design', 'system', 'guidelines'] },
                { id: 'doc4', title: 'Q4 Financial Report', type: 'document', category: 'Finance', date: '2024-01-05', author: 'David Kim', tags: ['finance', 'report', 'q4'] },
                { id: 'doc5', title: 'Security Policy Update', type: 'document', category: 'IT', date: '2024-01-03', author: 'Sophie Chen', tags: ['security', 'policy', 'it'] }
            ],
            people: [
                { id: 'person1', name: 'Maya Patel', role: 'HR Manager', department: 'Human Resources', email: 'maya.patel@company.com', avatar: 'MP' },
                { id: 'person2', name: 'David Kim', role: 'Senior Developer', department: 'Engineering', email: 'david.kim@company.com', avatar: 'DK' },
                { id: 'person3', name: 'Emma Wilson', role: 'UX Designer', department: 'Design', email: 'emma.wilson@company.com', avatar: 'EW' },
                { id: 'person4', name: 'David Kim', role: 'Financial Analyst', department: 'Finance', email: 'david.kim@company.com', avatar: 'DK' },
                { id: 'person5', name: 'Sophie Chen', role: 'IT Administrator', department: 'IT', email: 'sophie.chen@company.com', avatar: 'SC' }
            ],
            projects: [
                { id: 'proj1', name: 'Website Redesign', type: 'project', status: 'In Progress', lead: 'Emma Wilson', dueDate: '2024-02-15', progress: 75 },
                { id: 'proj2', name: 'Mobile App Development', type: 'project', status: 'Planning', lead: 'David Kim', dueDate: '2024-03-20', progress: 25 },
                { id: 'proj3', name: 'Database Migration', type: 'project', status: 'Completed', lead: 'Sophie Chen', dueDate: '2024-01-10', progress: 100 },
                { id: 'proj4', name: 'Marketing Campaign Q1', type: 'project', status: 'In Progress', lead: 'Maya Patel', dueDate: '2024-01-31', progress: 60 },
                { id: 'proj5', name: 'Security Audit', type: 'project', status: 'Planning', lead: 'David Kim', dueDate: '2024-02-28', progress: 10 }
            ]
        };
    }

    performSearch() {
        if (!this.currentQuery.trim()) {
            this.showEmptyState();
            return;
        }

        this.showLoading();
        
        // Simulate search delay
        setTimeout(() => {
            const activeFilter = this.querySelector('.filter-chip.active').dataset.filter;
            this.searchResults = this.searchData(this.currentQuery, activeFilter);
            this.displayResults();
        }, 300);
    }

    searchData(query, filter) {
        const results = [];
        const searchTerm = query.toLowerCase();

        if (filter === 'all' || filter === 'documents') {
            this.searchIndex.documents.forEach(doc => {
                if (doc.title.toLowerCase().includes(searchTerm) || 
                    doc.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
                    results.push({ ...doc, resultType: 'document' });
                }
            });
        }

        if (filter === 'all' || filter === 'people') {
            this.searchIndex.people.forEach(person => {
                if (person.name.toLowerCase().includes(searchTerm) || 
                    person.role.toLowerCase().includes(searchTerm) ||
                    person.department.toLowerCase().includes(searchTerm)) {
                    results.push({ ...person, resultType: 'person' });
                }
            });
        }

        if (filter === 'all' || filter === 'projects') {
            this.searchIndex.projects.forEach(project => {
                if (project.name.toLowerCase().includes(searchTerm) || 
                    project.lead.toLowerCase().includes(searchTerm)) {
                    results.push({ ...project, resultType: 'project' });
                }
            });
        }

        return results;
    }

    displayResults() {
        const resultsContainer = this.querySelector('#searchResults');
        const resultsCount = this.querySelector('#resultsCount');
        const sortBy = this.querySelector('#sortSelect').value;

        // Sort results
        this.searchResults.sort((a, b) => {
            switch (sortBy) {
                case 'date':
                    return new Date(b.date || b.dueDate) - new Date(a.date || a.dueDate);
                case 'name':
                    return (a.title || a.name || '').localeCompare(b.title || b.name || '');
                case 'type':
                    return a.resultType.localeCompare(b.resultType);
                default:
                    return 0; // relevance (keep original order)
            }
        });

        if (this.searchResults.length === 0) {
            this.showEmptyState();
            return;
        }

        resultsCount.textContent = `${this.searchResults.length} result${this.searchResults.length !== 1 ? 's' : ''} found`;

        resultsContainer.innerHTML = this.searchResults.map(result => this.renderResultItem(result)).join('');
    }

    renderResultItem(result) {
        const icons = {
            document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
            </svg>`,
            person: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            project: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
            </svg>`
        };

        const statusColors = {
            'In Progress': 'primary',
            'Completed': 'success',
            'Planning': 'warning'
        };

        return `
            <div class="search-result" data-result-id="${result.id}">
                <div class="result-icon">
                    ${icons[result.resultType]}
                </div>
                <div class="result-content">
                    <div class="result-header">
                        <h3 class="result-title">${result.title || result.name}</h3>
                        <div class="result-actions">
                            <button class="result-action" data-action="view" data-result-id="${result.id}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="result-action" data-action="share" data-result-id="${result.id}">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                                    <polyline points="16 6 12 2 8 6"></polyline>
                                    <line x1="12" y1="2" x2="12" y2="15"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="result-meta">
                        ${result.resultType === 'document' ? `
                            <span class="result-author">by ${result.author}</span>
                            <span class="result-date">${new Date(result.date).toLocaleDateString()}</span>
                            <span class="result-category">${result.category}</span>
                        ` : result.resultType === 'person' ? `
                            <span class="result-role">${result.role}</span>
                            <span class="result-department">${result.department}</span>
                            <span class="result-email">${result.email}</span>
                        ` : `
                            <span class="result-lead">Lead: ${result.lead}</span>
                            <span class="result-status ${statusColors[result.status] || 'default'}">${result.status}</span>
                            <span class="result-progress">${result.progress}% complete</span>
                        `}
                    </div>
                    ${result.tags ? `
                        <div class="result-tags">
                            ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    showLoading() {
        const resultsContainer = this.querySelector('#searchResults');
        const resultsCount = this.querySelector('#resultsCount');
        
        resultsCount.textContent = 'Searching...';
        resultsContainer.innerHTML = `
            <div class="search-loading">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"></path>
                </svg>
                <p>Searching...</p>
            </div>
        `;
    }

    showEmptyState() {
        const resultsContainer = this.querySelector('#searchResults');
        const resultsCount = this.querySelector('#resultsCount');
        
        resultsCount.textContent = 'No results found';
        resultsContainer.innerHTML = `
            <div class="search-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="M21 21l-4.35-4.35"></path>
                </svg>
                <h3>No results found</h3>
                <p>Try adjusting your search terms or filters</p>
            </div>
        `;
    }

    openResult(resultId) {
        console.log('Opening result:', resultId);
        // Implement result opening functionality
    }

    viewResult(resultId) {
        console.log('Viewing result:', resultId);
        // Implement result viewing functionality
    }

    shareResult(resultId) {
        console.log('Sharing result:', resultId);
        // Implement result sharing functionality
    }
}

customElements.define('unified-search', UnifiedSearch); 