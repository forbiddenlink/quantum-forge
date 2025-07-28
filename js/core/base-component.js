export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.isInitialized = false;
        this.animationFrame = null;
        this.intersectionObserver = null;
        this.resizeObserver = null;
        this.isVisible = false;
        this.needsRefresh = false;
    }

    connectedCallback() {
        if (this.isInitialized) return;
        this.setupIntersectionObserver();
        this.setupResizeObserver();
        this.render();
        this.setupEventListeners();
        this.isInitialized = true;
    }

    setupIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                this.isVisible = entry.isIntersecting;
                if (this.isVisible && this.needsRefresh) {
                    this.refresh();
                }
            });
        });
        this.intersectionObserver.observe(this);
    }

    setupResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            if (this.isVisible) {
                this.handleResize(entries[0]);
            } else {
                this.needsRefresh = true;
            }
        });
        this.resizeObserver.observe(this);
    }

    handleResize(entry) {
        // Override in child classes
    }

    refresh() {
        if (this.isVisible) {
            this.render();
            this.needsRefresh = false;
        }
    }

    render() {
        // Override in child classes
        this.renderFallback();
    }

    renderFallback() {
        console.log('🔄 Rendering fallback UI...');
        this.innerHTML = `
            <div class="${this.tagName.toLowerCase()} fallback">
                <div class="component-header">
                    <h2 class="component-title">${this.constructor.name}</h2>
                    <p class="component-subtitle">Loading enhanced features...</p>
                </div>
                <div class="fallback-content">
                    <div class="loading-spinner"></div>
                    <p>Initializing component...</p>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Override in child classes
    }

    disconnectedCallback() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.intersectionObserver?.disconnect();
        this.resizeObserver?.disconnect();
        this.cleanup();
    }

    cleanup() {
        // Override in child classes for additional cleanup
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = 'position: absolute; left: -10000px;';
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
}
