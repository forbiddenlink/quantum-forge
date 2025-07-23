// Smart Search Overlay with AI Suggestions - Contest Innovation Feature
class SmartSearchOverlay extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.searchResults = [];
        this.recentSearches = this.loadRecentSearches();
        this.suggestions = this.generateSmartSuggestions();
        this.searchHistory = [];
        this.currentQuery = '';
        this.selectedIndex = -1;
        this.searchCategories = ['All', 'People', 'Documents', 'Projects', 'Tasks', 'Meetings'];
        this.activeCategory = 'All';
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        console.log('🔍 Smart Search Overlay initialized');
    }

    disconnectedCallback() {
        document.removeEventListener('keydown', this.globalKeyHandler);
    }

    loadRecentSearches() {
        return JSON.parse(localStorage.getItem('recentSearches') || '[]');
    }

    saveRecentSearches() {
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches.slice(0, 10)));
    }

    generateSmartSuggestions() {
        return [
            { type: 'quick-action', icon: '📋', text: 'Create new task', action: 'create-task' },
            { type: 'quick-action', icon: '📅', text: 'Schedule meeting', action: 'schedule-meeting' },
            { type: 'quick-action', icon: '👥', text: 'Find teammate', action: 'find-people' },
            { type: 'quick-action', icon: '📁', text: 'Browse documents', action: 'browse-docs' },
            { type: 'contextual', icon: '🎯', text: 'My overdue tasks', action: 'overdue-tasks' },
            { type: 'contextual', icon: '📊', text: 'Team performance', action: 'team-stats' },
            { type: 'ai-insight', icon: '🤖', text: 'Show productivity insights', action: 'ai-insights' },
            { type: 'ai-insight', icon: '💡', text: 'Suggest next actions', action: 'ai-suggestions' }
        ];
    }

    render() {
        this.innerHTML = `
            <div class="smart-search-overlay ${this.isOpen ? 'open' : ''}" role="dialog" aria-label="Smart Search" aria-hidden="${!this.isOpen}">
                <div class="search-backdrop"></div>
                <div class="search-container">
                    <!-- Search Header -->
                    <div class="search-header">
                        <div class="search-input-container">
                            <div class="search-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                class="smart-search-input" 
                                placeholder="Search everything... (Ctrl+K)"
                                autocomplete="off"
                                spellcheck="false"
                                aria-label="Search input"
                                aria-expanded="${this.isOpen}"
                                aria-owns="search-results"
                            >
                            <div class="search-ai-indicator">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span>AI</span>
                            </div>
                            <button class="search-close" aria-label="Close search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        
                        <!-- Search Categories -->
                        <div class="search-categories">
                            ${this.searchCategories.map(category => `
                                <button class="category-btn ${category === this.activeCategory ? 'active' : ''}" data-category="${category}">
                                    ${this.getCategoryIcon(category)}
                                    ${category}
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Search Content -->
                    <div class="search-content">
                        <!-- Quick Suggestions (when no query) -->
                        <div class="quick-suggestions ${this.currentQuery ? 'hidden' : ''}" id="quickSuggestions">
                            <div class="suggestions-section">
                                <h3 class="suggestions-title">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    Smart Suggestions
                                </h3>
                                <div class="suggestions-grid">
                                    ${this.suggestions.map((suggestion, index) => `
                                        <div class="suggestion-item ${suggestion.type}" data-action="${suggestion.action}" data-index="${index}">
                                            <div class="suggestion-icon">${suggestion.icon}</div>
                                            <div class="suggestion-content">
                                                <span class="suggestion-text">${suggestion.text}</span>
                                                <span class="suggestion-type">${suggestion.type.replace('-', ' ')}</span>
                                            </div>
                                            <div class="suggestion-arrow">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>

                            ${this.recentSearches.length > 0 ? `
                                <div class="recent-searches-section">
                                    <h3 class="suggestions-title">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <polyline points="12 6 12 12 16 14"></polyline>
                                        </svg>
                                        Recent Searches
                                    </h3>
                                    <div class="recent-searches-list">
                                        ${this.recentSearches.map((search, index) => `
                                            <div class="recent-search-item" data-search="${search}" data-index="${index + this.suggestions.length}">
                                                <div class="recent-search-icon">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <path d="M12 15v5l-3-1-1 4-2-2-4 1v-5l3-1"></path>
                                                        <path d="M12 9v-4l3 1 1-4 2 2 4-1v4l-3 1"></path>
                                                        <circle cx="12" cy="12" r="3"></circle>
                                                    </svg>
                                                </div>
                                                <span class="recent-search-text">${search}</span>
                                                <button class="remove-recent" data-search="${search}" aria-label="Remove from recent searches">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                                    </svg>
                                                </button>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Search Results -->
                        <div class="search-results ${!this.currentQuery ? 'hidden' : ''}" id="searchResults" role="listbox" aria-label="Search results">
                            <div class="results-header">
                                <div class="results-count">
                                    <span id="resultsCount">0</span> results for "<span id="searchQuery">${this.currentQuery}</span>"
                                </div>
                                <div class="results-ai-badge">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                    </svg>
                                    AI Enhanced
                                </div>
                            </div>
                            <div class="results-list" id="resultsList">
                                <!-- Results will be populated here -->
                            </div>
                        </div>

                        <!-- No Results State -->
                        <div class="no-results hidden" id="noResults">
                            <div class="no-results-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="M21 21l-4.35-4.35"></path>
                                </svg>
                            </div>
                            <h3>No results found</h3>
                            <p>Try different keywords or browse our suggestions above</p>
                            <button class="try-ai-search">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                Ask AI for help
                            </button>
                        </div>
                    </div>

                    <!-- Search Footer -->
                    <div class="search-footer">
                        <div class="search-shortcuts">
                            <div class="shortcut-item">
                                <kbd>↑↓</kbd>
                                <span>Navigate</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Enter</kbd>
                                <span>Select</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Esc</kbd>
                                <span>Close</span>
                            </div>
                            <div class="shortcut-item">
                                <kbd>Tab</kbd>
                                <span>Categories</span>
                            </div>
                        </div>
                        <div class="search-powered-by">
                            <span>Powered by Quantum AI</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            'All': '🌐',
            'People': '👥',
            'Documents': '📄',
            'Projects': '📁',
            'Tasks': '✅',
            'Meetings': '📅'
        };
        return icons[category] || '🔍';
    }

    setupEventListeners() {
        const searchInput = this.querySelector('.smart-search-input');
        const closeBtn = this.querySelector('.search-close');
        const backdrop = this.querySelector('.search-backdrop');
        const categoryBtns = this.querySelectorAll('.category-btn');

        searchInput?.addEventListener('input', (e) => this.handleSearch(e));
        searchInput?.addEventListener('keydown', (e) => this.handleKeyNavigation(e));
        closeBtn?.addEventListener('click', () => this.close());
        backdrop?.addEventListener('click', () => this.close());

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCategoryChange(e));
        });

        // Handle suggestion clicks
        this.addEventListener('click', (e) => {
            if (e.target.closest('.suggestion-item')) {
                const item = e.target.closest('.suggestion-item');
                const action = item.dataset.action;
                this.executeSuggestion(action);
            }
            
            if (e.target.closest('.recent-search-item')) {
                const item = e.target.closest('.recent-search-item');
                const search = item.dataset.search;
                this.executeSearch(search);
            }
            
            if (e.target.closest('.remove-recent')) {
                e.stopPropagation();
                const search = e.target.closest('.remove-recent').dataset.search;
                this.removeRecentSearch(search);
            }
        });
    }

    setupKeyboardShortcuts() {
        this.globalKeyHandler = (e) => {
            // Ctrl+K or Cmd+K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.open();
            }
            
            // Escape to close
            if (e.key === 'Escape' && this.isOpen) {
                e.preventDefault();
                this.close();
            }
        };

        document.addEventListener('keydown', this.globalKeyHandler);
    }

    handleSearch(e) {
        const query = e.target.value;
        this.currentQuery = query;
        
        if (query.length === 0) {
            this.showSuggestions();
            return;
        }
        
        if (query.length < 2) {
            return;
        }
        
        // Debounce search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    handleKeyNavigation(e) {
        if (!this.isOpen) return;
        
        const items = this.querySelectorAll('.suggestion-item, .recent-search-item, .result-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, items.length - 1);
            this.updateSelection(items);
        }
        
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
            this.updateSelection(items);
        }
        
        if (e.key === 'Enter' && this.selectedIndex >= 0) {
            e.preventDefault();
            const selectedItem = items[this.selectedIndex];
            selectedItem?.click();
        }
        
        if (e.key === 'Tab') {
            e.preventDefault();
            this.cycleThroughCategories();
        }
    }

    handleCategoryChange(e) {
        const category = e.target.dataset.category;
        this.activeCategory = category;
        
        // Update active category
        this.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Re-run search if there's a query
        if (this.currentQuery) {
            this.performSearch(this.currentQuery);
        }
        
        this.announceToScreenReader(`Category changed to ${category}`);
    }

    cycleThroughCategories() {
        const currentIndex = this.searchCategories.indexOf(this.activeCategory);
        const nextIndex = (currentIndex + 1) % this.searchCategories.length;
        const nextCategory = this.searchCategories[nextIndex];
        
        const categoryBtn = this.querySelector(`[data-category="${nextCategory}"]`);
        categoryBtn?.click();
    }

    updateSelection(items) {
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedIndex);
        });
    }

    performSearch(query) {
        // Simulate AI-powered search
        const mockResults = this.generateMockResults(query);
        this.searchResults = mockResults;
        
        this.showResults();
        this.addToRecentSearches(query);
        
        // Announce results to screen readers
        this.announceToScreenReader(`${mockResults.length} results found for ${query}`);
    }

    generateMockResults(query) {
        const allResults = [
            { type: 'person', title: 'Alex Chen', subtitle: 'Senior Developer', icon: '👨‍💻', relevance: 0.9 },
            { type: 'person', title: 'Sarah Johnson', subtitle: 'UX Designer', icon: '👩‍🎨', relevance: 0.8 },
            { type: 'document', title: 'API Documentation', subtitle: 'Updated 2 hours ago', icon: '📄', relevance: 0.95 },
            { type: 'document', title: 'Design System Guide', subtitle: 'Created by Sarah', icon: '🎨', relevance: 0.7 },
            { type: 'project', title: 'Mobile App Redesign', subtitle: '80% complete', icon: '📱', relevance: 0.85 },
            { type: 'project', title: 'Dashboard Analytics', subtitle: 'In progress', icon: '📊', relevance: 0.6 },
            { type: 'task', title: 'Review pull request #123', subtitle: 'Due tomorrow', icon: '✅', relevance: 0.75 },
            { type: 'task', title: 'Update user documentation', subtitle: 'Assigned to you', icon: '📝', relevance: 0.9 },
            { type: 'meeting', title: 'Weekly Team Standup', subtitle: 'Tomorrow at 10 AM', icon: '📅', relevance: 0.8 }
        ];
        
        // Filter by category and query relevance
        return allResults
            .filter(result => {
                const matchesCategory = this.activeCategory === 'All' || 
                    (this.activeCategory === 'People' && result.type === 'person') ||
                    (this.activeCategory === 'Documents' && result.type === 'document') ||
                    (this.activeCategory === 'Projects' && result.type === 'project') ||
                    (this.activeCategory === 'Tasks' && result.type === 'task') ||
                    (this.activeCategory === 'Meetings' && result.type === 'meeting');
                
                const matchesQuery = result.title.toLowerCase().includes(query.toLowerCase()) ||
                    result.subtitle.toLowerCase().includes(query.toLowerCase());
                
                return matchesCategory && matchesQuery;
            })
            .sort((a, b) => b.relevance - a.relevance)
            .slice(0, 10);
    }

    showSuggestions() {
        this.querySelector('#quickSuggestions')?.classList.remove('hidden');
        this.querySelector('#searchResults')?.classList.add('hidden');
        this.querySelector('#noResults')?.classList.add('hidden');
        this.selectedIndex = -1;
    }

    showResults() {
        this.querySelector('#quickSuggestions')?.classList.add('hidden');
        this.querySelector('#noResults')?.classList.add('hidden');
        
        const resultsContainer = this.querySelector('#searchResults');
        const resultsList = this.querySelector('#resultsList');
        const resultsCount = this.querySelector('#resultsCount');
        const searchQuery = this.querySelector('#searchQuery');
        
        if (resultsContainer) resultsContainer.classList.remove('hidden');
        if (resultsCount) resultsCount.textContent = this.searchResults.length;
        if (searchQuery) searchQuery.textContent = this.currentQuery;
        
        if (resultsList) {
            if (this.searchResults.length === 0) {
                this.showNoResults();
                return;
            }
            
            resultsList.innerHTML = this.searchResults.map((result, index) => `
                <div class="result-item" data-type="${result.type}" data-index="${index}" role="option">
                    <div class="result-icon">${result.icon}</div>
                    <div class="result-content">
                        <div class="result-title">${this.highlightQuery(result.title)}</div>
                        <div class="result-subtitle">${result.subtitle}</div>
                        <div class="result-type">${result.type}</div>
                    </div>
                    <div class="result-relevance">
                        <div class="relevance-bar">
                            <div class="relevance-fill" style="width: ${result.relevance * 100}%"></div>
                        </div>
                        <span class="relevance-text">${Math.round(result.relevance * 100)}%</span>
                    </div>
                </div>
            `).join('');
        }
        
        this.selectedIndex = -1;
    }

    showNoResults() {
        this.querySelector('#searchResults')?.classList.add('hidden');
        this.querySelector('#noResults')?.classList.remove('hidden');
    }

    highlightQuery(text) {
        if (!this.currentQuery) return text;
        const regex = new RegExp(`(${this.currentQuery})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    executeSuggestion(action) {
        console.log(`🎯 Executing suggestion: ${action}`);
        this.announceToScreenReader(`Executing ${action.replace('-', ' ')}`);
        
        // Simulate suggestion execution
        setTimeout(() => {
            this.close();
        }, 300);
    }

    executeSearch(query) {
        const searchInput = this.querySelector('.smart-search-input');
        if (searchInput) {
            searchInput.value = query;
            this.currentQuery = query;
            this.performSearch(query);
        }
    }

    addToRecentSearches(query) {
        if (!query || query.length < 2) return;
        
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(search => search !== query);
        
        // Add to beginning
        this.recentSearches.unshift(query);
        
        // Keep only last 10
        this.recentSearches = this.recentSearches.slice(0, 10);
        
        this.saveRecentSearches();
    }

    removeRecentSearch(query) {
        this.recentSearches = this.recentSearches.filter(search => search !== query);
        this.saveRecentSearches();
        this.render();
        this.setupEventListeners();
    }

    open() {
        this.isOpen = true;
        this.render();
        this.setupEventListeners();
        
        document.body.style.overflow = 'hidden';
        
        // Focus on search input
        setTimeout(() => {
            const searchInput = this.querySelector('.smart-search-input');
            searchInput?.focus();
        }, 100);
        
        this.announceToScreenReader('Smart search opened');
    }

    close() {
        this.isOpen = false;
        this.currentQuery = '';
        this.selectedIndex = -1;
        this.render();
        this.setupEventListeners();
        
        document.body.style.overflow = '';
        
        this.announceToScreenReader('Smart search closed');
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
customElements.define('smart-search-overlay', SmartSearchOverlay); 