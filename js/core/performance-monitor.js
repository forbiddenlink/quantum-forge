export class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observations = new Map();
        this.setupObserver();
    }

    setupObserver() {
        this.observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.recordMetric(entry);
            }
        });

        // Observe key performance metrics
        this.observer.observe({
            entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input']
        });
    }

    recordMetric(entry) {
        const metrics = this.metrics.get(entry.entryType) || [];
        metrics.push({
            value: entry.value || entry.duration,
            startTime: entry.startTime,
            timestamp: Date.now()
        });
        this.metrics.set(entry.entryType, metrics);
    }

    startMeasure(name) {
        performance.mark(`${name}-start`);
    }

    endMeasure(name) {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
    }

    getComponentMetrics(componentName) {
        return {
            renderTime: this.getAverageMetric(`${componentName}-render`),
            updateTime: this.getAverageMetric(`${componentName}-update`),
            memory: this.getMemoryUsage()
        };
    }

    getAverageMetric(name) {
        const metrics = this.metrics.get(name) || [];
        if (metrics.length === 0) return 0;
        
        const sum = metrics.reduce((acc, curr) => acc + curr.value, 0);
        return sum / metrics.length;
    }

    getMemoryUsage() {
        if (performance.memory) {
            return {
                usedJSHeapSize: performance.memory.usedJSHeapSize,
                totalJSHeapSize: performance.memory.totalJSHeapSize,
                jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }

    generateReport() {
        return {
            fcp: this.getAverageMetric('paint'),
            lcp: this.getAverageMetric('largest-contentful-paint'),
            cls: this.getAverageMetric('layout-shift'),
            fid: this.getAverageMetric('first-input'),
            memory: this.getMemoryUsage(),
            components: Array.from(this.metrics.entries())
                .filter(([key]) => key.includes('-render') || key.includes('-update'))
                .reduce((acc, [key, value]) => {
                    acc[key] = this.getAverageMetric(key);
                    return acc;
                }, {})
        };
    }
}

// Create global instance
window.performanceMonitor = new PerformanceMonitor();
