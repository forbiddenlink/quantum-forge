// Company News and Updates Component
class CompanyNews extends HTMLElement {
    constructor() {
        super();
        this.news = [];
        this.currentIndex = 0;
        this.autoplayInterval = null;
    }

    connectedCallback() {
        this.loadNews();
        this.render();
        this.setupEventListeners();
        this.startAutoplay();
    }

    disconnectedCallback() {
        this.stopAutoplay();
    }

    loadNews() {
        this.news = [
            {
                id: 1,
                title: "New Office Opening in San Francisco",
                excerpt: "We're excited to announce our new office opening in the heart of San Francisco's tech district.",
                category: "company",
                date: "2 hours ago",
                author: "Sarah Johnson",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%236366f1'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EOffice%3C/text%3E%3C/svg%3E",
                priority: "high"
            },
            {
                id: 2,
                title: "Q4 Goals: 95% Achievement Rate",
                excerpt: "Our team has achieved an impressive 95% completion rate for Q4 objectives. Great work everyone!",
                category: "achievement",
                date: "4 hours ago",
                author: "Mike Chen",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%2310b981'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3E95%%3C/text%3E%3C/svg%3E",
                priority: "medium"
            },
            {
                id: 3,
                title: "New Wellness Program Launch",
                excerpt: "Starting next month, we're introducing comprehensive wellness programs including yoga classes and mental health support.",
                category: "wellness",
                date: "1 day ago",
                author: "Lisa Rodriguez",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23f59e0b'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EWellness%3C/text%3E%3C/svg%3E",
                priority: "medium"
            },
            {
                id: 4,
                title: "Innovation Award Winners Announced",
                excerpt: "Congratulations to the Product Team for winning the annual Innovation Award for their groundbreaking work.",
                category: "recognition",
                date: "2 days ago",
                author: "David Kim",
                image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23ec4899'/%3E%3Ctext x='100' y='70' font-family='Arial' font-size='14' fill='white' text-anchor='middle'%3EAward%3C/text%3E%3C/svg%3E",
                priority: "high"
            }
        ];
    }

    render() {
        const currentNews = this.news[this.currentIndex];
        this.innerHTML = `
            <div class="company-news">
                <div class="news-header">
                    <h3 class="news-title">Company News</h3>
                    <div class="news-controls">
                        <button class="btn-icon small" id="prevNews" aria-label="Previous news">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="btn-icon small" id="nextNews" aria-label="Next news">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="news-content">
                    <div class="news-card ${currentNews.priority}">
                        <div class="news-image">
                            <img src="${currentNews.image}" alt="${currentNews.title}" loading="lazy">
                            <div class="news-category ${currentNews.category}">${this.getCategoryIcon(currentNews.category)} ${currentNews.category}</div>
                        </div>
                        <div class="news-details">
                            <h4 class="news-headline">${currentNews.title}</h4>
                            <p class="news-excerpt">${currentNews.excerpt}</p>
                            <div class="news-meta">
                                <span class="news-author">By ${currentNews.author}</span>
                                <span class="news-date">${currentNews.date}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="news-indicators">
                    ${this.news.map((_, index) => `
                        <button class="news-indicator ${index === this.currentIndex ? 'active' : ''}" 
                                data-index="${index}" 
                                aria-label="Go to news ${index + 1}">
                        </button>
                    `).join('')}
                </div>

                <div class="news-actions">
                    <button class="btn secondary" id="viewAllNews">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                        </svg>
                        View All News
                    </button>
                    <button class="btn secondary" id="shareNews">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                            <polyline points="16 6 12 2 8 6"></polyline>
                            <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        Share
                    </button>
                </div>
            </div>
        `;
    }

    getCategoryIcon(category) {
        const icons = {
            company: '🏢',
            achievement: '🏆',
            wellness: '🧘',
            recognition: '🎉',
            update: '📢'
        };
        return icons[category] || '📰';
    }

    setupEventListeners() {
        const prevBtn = this.querySelector('#prevNews');
        const nextBtn = this.querySelector('#nextNews');
        const indicators = this.querySelectorAll('.news-indicator');
        const viewAllBtn = this.querySelector('#viewAllNews');
        const shareBtn = this.querySelector('#shareNews');

        prevBtn?.addEventListener('click', () => this.showPrevious());
        nextBtn?.addEventListener('click', () => this.showNext());
        viewAllBtn?.addEventListener('click', () => this.viewAllNews());
        shareBtn?.addEventListener('click', () => this.shareNews());

        indicators.forEach(indicator => {
            indicator.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.showNews(index);
            });
        });

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;

        this.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
    }

    handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchEndX - touchStartX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                this.showPrevious();
            } else {
                this.showNext();
            }
        }
    }

    showPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.news.length) % this.news.length;
        this.updateDisplay();
    }

    showNext() {
        this.currentIndex = (this.currentIndex + 1) % this.news.length;
        this.updateDisplay();
    }

    showNews(index) {
        this.currentIndex = index;
        this.updateDisplay();
    }

    updateDisplay() {
        const newsCard = this.querySelector('.news-card');
        const indicators = this.querySelectorAll('.news-indicator');
        const currentNews = this.news[this.currentIndex];

        // Update news content
        newsCard.className = `news-card ${currentNews.priority}`;
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${currentNews.image}" alt="${currentNews.title}" loading="lazy">
                <div class="news-category ${currentNews.category}">${this.getCategoryIcon(currentNews.category)} ${currentNews.category}</div>
            </div>
            <div class="news-details">
                <h4 class="news-headline">${currentNews.title}</h4>
                <p class="news-excerpt">${currentNews.excerpt}</p>
                <div class="news-meta">
                    <span class="news-author">By ${currentNews.author}</span>
                    <span class="news-date">${currentNews.date}</span>
                </div>
            </div>
        `;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });

        // Animate transition
        newsCard.style.opacity = '0';
        setTimeout(() => {
            newsCard.style.opacity = '1';
        }, 150);
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.showNext();
        }, 5000); // Change every 5 seconds
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    viewAllNews() {
        // Navigate to full news page
        window.location.href = '/pages/news.html';
    }

    shareNews() {
        const currentNews = this.news[this.currentIndex];
        if (navigator.share) {
            navigator.share({
                title: currentNews.title,
                text: currentNews.excerpt,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${currentNews.title}\n\n${currentNews.excerpt}`);
            this.showNotification('News copied to clipboard!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

customElements.define('company-news', CompanyNews); 