export class ChartManager {
    constructor() {
        this.charts = new Map();
        this.contexts = new WeakMap();
        this.options = new WeakMap();
    }

    async createChart(canvasId, config) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) throw new Error(`Canvas with id ${canvasId} not found`);

        // Cleanup existing chart if any
        await this.destroyChart(canvasId);

        // Set default options for performance
        const enhancedConfig = this.enhanceConfig(config);

        try {
            const chart = new Chart(canvas.getContext('2d'), enhancedConfig);
            this.charts.set(canvasId, chart);
            this.contexts.set(chart, canvas.getContext('2d'));
            this.options.set(chart, enhancedConfig);

            // Start monitoring performance
            this.startMonitoring(chart, canvasId);

            return chart;
        } catch (error) {
            console.error('Chart creation failed:', error);
            this.renderFallback(canvas);
            throw error;
        }
    }

    enhanceConfig(config) {
        return {
            ...config,
            options: {
                ...config.options,
                animation: {
                    duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    ...config.options?.plugins,
                    legend: {
                        ...config.options?.plugins?.legend,
                        labels: {
                            ...config.options?.plugins?.legend?.labels,
                            font: {
                                family: 'system-ui, -apple-system, sans-serif'
                            }
                        }
                    }
                }
            }
        };
    }

    async destroyChart(canvasId) {
        const chart = this.charts.get(canvasId);
        if (chart) {
            // Stop performance monitoring
            this.stopMonitoring(chart);

            // Cleanup chart resources
            chart.destroy();
            this.charts.delete(canvasId);
            this.contexts.delete(chart);
            this.options.delete(chart);
        }
    }

    startMonitoring(chart, canvasId) {
        const startTime = performance.now();

        window.performanceMonitor?.startMeasure(`chart-${canvasId}`);

        chart.options.plugins.beforeDraw = (chart) => {
            const renderTime = performance.now() - startTime;
            window.performanceMonitor?.recordMetric({
                entryType: 'chart-render',
                name: canvasId,
                duration: renderTime
            });
        };
    }

    stopMonitoring(chart) {
        if (chart.options.plugins.beforeDraw) {
            delete chart.options.plugins.beforeDraw;
        }
    }

    renderFallback(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#666';
        ctx.font = '14px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText('Chart unavailable', canvas.width / 2, canvas.height / 2);
    }

    getPerformanceReport() {
        const report = {};
        this.charts.forEach((chart, id) => {
            report[id] = {
                renderTime: window.performanceMonitor?.getAverageMetric(`chart-${id}`),
                memoryUsage: window.performanceMonitor?.getMemoryUsage()
            };
        });
        return report;
    }
}

// Create global instance
window.chartManager = new ChartManager();
