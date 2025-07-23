// Centralized Chart.js Manager - Performance Optimized
class ChartManager {
    constructor() {
        this.charts = new Map();
        this.isChartJSLoaded = false;
        this.loadPromise = null;
        this.maxCharts = 10; // Limit total charts
        this.observedCharts = new Set();
        
        // Chart.js default configuration
        this.defaultConfig = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 300, // Reduced from default 1000ms
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            },
            elements: {
                line: {
                    tension: 0.4
                },
                point: {
                    radius: 3,
                    hoverRadius: 5
                }
            }
        };
        
        // Performance monitoring
        this.performanceMetrics = {
            chartsCreated: 0,
            chartsDestroyed: 0,
            averageRenderTime: 0,
            memoryUsage: 0
        };
        
        this.initializeChartJS();
    }

    async initializeChartJS() {
        if (this.isChartJSLoaded) return;
        
        if (this.loadPromise) return this.loadPromise;
        
        this.loadPromise = new Promise((resolve, reject) => {
            if (window.Chart) {
                this.isChartJSLoaded = true;
                this.configureChartDefaults();
                resolve();
                return;
            }
            
            // Load Chart.js only once globally
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => {
                this.isChartJSLoaded = true;
                this.configureChartDefaults();
                console.log('📊 Chart.js loaded globally');
                resolve();
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
        
        return this.loadPromise;
    }

    configureChartDefaults() {
        if (!window.Chart) return;
        
        // Set global defaults for better performance
        Chart.defaults.animation.duration = 300;
        Chart.defaults.responsive = true;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.interaction.intersect = false;
        Chart.defaults.interaction.mode = 'index';
        
        // Reduce default animations for performance
        Chart.defaults.elements.point.radius = 2;
        Chart.defaults.elements.point.hoverRadius = 4;
        Chart.defaults.elements.line.tension = 0.4;
    }

    async createChart(canvasId, config) {
        const startTime = performance.now();
        
        // Check chart limit
        if (this.charts.size >= this.maxCharts) {
            console.warn(`⚠️ Chart limit reached (${this.maxCharts}). Destroying oldest chart.`);
            this.destroyOldestChart();
        }
        
        await this.initializeChartJS();
        
        const canvas = document.getElementById(canvasId) || document.querySelector(`#${canvasId}`);
        if (!canvas) {
            console.error(`Canvas element not found: ${canvasId}`);
            return null;
        }
        
        // Destroy existing chart if exists
        if (this.charts.has(canvasId)) {
            this.destroyChart(canvasId);
        }
        
        // Merge with default config for performance
        const mergedConfig = this.mergeConfigs(this.defaultConfig, config);
        
        try {
            const chart = new Chart(canvas, mergedConfig);
            this.charts.set(canvasId, {
                chart,
                created: Date.now(),
                lastUpdate: Date.now(),
                updateCount: 0
            });
            
            // Track performance
            const renderTime = performance.now() - startTime;
            this.performanceMetrics.chartsCreated++;
            this.performanceMetrics.averageRenderTime = 
                (this.performanceMetrics.averageRenderTime + renderTime) / 2;
            
            console.log(`📊 Chart created: ${canvasId} (${renderTime.toFixed(2)}ms)`);
            
            // Set up intersection observer for performance
            this.observeChart(canvasId, canvas);
            
            return chart;
        } catch (error) {
            console.error(`Error creating chart ${canvasId}:`, error);
            return null;
        }
    }

    observeChart(canvasId, canvas) {
        if (!window.IntersectionObserver) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const chartData = this.charts.get(canvasId);
                if (!chartData) return;
                
                if (entry.isIntersecting) {
                    // Chart is visible, allow updates
                    chartData.visible = true;
                } else {
                    // Chart is not visible, pause updates
                    chartData.visible = false;
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(canvas);
        this.observedCharts.add({ observer, canvasId });
    }

    updateChart(canvasId, newData, options = {}) {
        const chartData = this.charts.get(canvasId);
        if (!chartData) {
            console.warn(`Chart not found: ${canvasId}`);
            return false;
        }
        
        // Skip update if chart is not visible (performance optimization)
        if (chartData.visible === false && !options.forceUpdate) {
            return false;
        }
        
        const { chart } = chartData;
        
        // Update data
        if (newData.labels) {
            chart.data.labels = newData.labels;
        }
        
        if (newData.datasets) {
            chart.data.datasets = newData.datasets;
        }
        
        // Update with minimal animation if requested
        const updateOptions = options.animate === false ? 'none' : 'active';
        chart.update(updateOptions);
        
        // Track update metrics
        chartData.lastUpdate = Date.now();
        chartData.updateCount++;
        
        return true;
    }

    destroyChart(canvasId) {
        const chartData = this.charts.get(canvasId);
        if (!chartData) return false;
        
        try {
            chartData.chart.destroy();
            this.charts.delete(canvasId);
            this.performanceMetrics.chartsDestroyed++;
            
            // Clean up observer
            this.observedCharts.forEach(observed => {
                if (observed.canvasId === canvasId) {
                    observed.observer.disconnect();
                    this.observedCharts.delete(observed);
                }
            });
            
            console.log(`📊 Chart destroyed: ${canvasId}`);
            return true;
        } catch (error) {
            console.error(`Error destroying chart ${canvasId}:`, error);
            return false;
        }
    }

    destroyOldestChart() {
        let oldestChart = null;
        let oldestTime = Date.now();
        
        this.charts.forEach((data, id) => {
            if (data.created < oldestTime) {
                oldestTime = data.created;
                oldestChart = id;
            }
        });
        
        if (oldestChart) {
            this.destroyChart(oldestChart);
        }
    }

    destroyAllCharts() {
        console.log('🧹 Destroying all charts...');
        const chartIds = Array.from(this.charts.keys());
        chartIds.forEach(id => this.destroyChart(id));
        
        // Clean up all observers
        this.observedCharts.forEach(observed => {
            observed.observer.disconnect();
        });
        this.observedCharts.clear();
    }

    getChartCount() {
        return this.charts.size;
    }

    getPerformanceReport() {
        return {
            activeCharts: this.charts.size,
            totalCreated: this.performanceMetrics.chartsCreated,
            totalDestroyed: this.performanceMetrics.chartsDestroyed,
            averageRenderTime: `${this.performanceMetrics.averageRenderTime.toFixed(2)}ms`,
            memoryEfficiency: `${((this.performanceMetrics.chartsDestroyed / this.performanceMetrics.chartsCreated) * 100).toFixed(1)}%`
        };
    }

    mergeConfigs(defaultConfig, userConfig) {
        return {
            ...defaultConfig,
            ...userConfig,
            options: {
                ...defaultConfig.options,
                ...userConfig.options,
                plugins: {
                    ...defaultConfig.plugins,
                    ...userConfig.options?.plugins
                }
            }
        };
    }

    // Cleanup method for page unload
    cleanup() {
        this.destroyAllCharts();
        console.log('📊 Chart Manager cleaned up');
    }
}

// Global chart manager instance
window.chartManager = new ChartManager();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.chartManager) {
        window.chartManager.cleanup();
    }
});

console.log('📊 Chart Manager initialized - Performance optimized!'); 