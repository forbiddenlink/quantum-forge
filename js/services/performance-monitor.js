// Performance Monitor Service
class PerformanceMonitor {
    constructor() {
        this.isMonitoring = false;
        this.freezeThreshold = 100; // ms
        this.lastFrameTime = performance.now();
        this.frameCount = 0;
        this.slowFrames = 0;
        this.freezeCount = 0;

        // Performance metrics
        this.metrics = {
            fps: 0,
            averageFrameTime: 0,
            slowFrames: 0,
            freezes: 0,
            memoryUsage: 0
        };

        this.startMonitoring();
    }

    startMonitoring() {
        if (this.isMonitoring) return;

        this.isMonitoring = true;
        this.monitorFrameRate();
        this.monitorMemory();
        this.monitorLongTasks();

        console.log('🔍 Performance monitoring started');
    }

    stopMonitoring() {
        this.isMonitoring = false;
        console.log('🛑 Performance monitoring stopped');
    }

    monitorFrameRate() {
        const measureFrameRate = () => {
            if (!this.isMonitoring) return;

            const currentTime = performance.now();
            const frameTime = currentTime - this.lastFrameTime;
            this.lastFrameTime = currentTime;

            this.frameCount++;

            // Detect slow frames with higher threshold
            if (frameTime > 200) { // Increased from 100ms to 200ms
                this.slowFrames++;
                this.freezeCount++;
                console.warn(`⚠️ Slow frame detected: ${frameTime.toFixed(2)}ms`);

                // If too many freezes, enable emergency mode
                if (this.freezeCount > 10) { // Increased from 5 to 10
                    this.enableEmergencyMode();
                }
            }

            // Calculate FPS every 2 seconds (reduced frequency)
            if (this.frameCount % 240 === 0) { // Changed from 120 to 240 for less frequent checks
                const fps = Math.round(60000 / frameTime);
                this.metrics.fps = fps;
                this.metrics.averageFrameTime = frameTime;
                this.metrics.slowFrames = this.slowFrames;
                this.metrics.freezes = this.freezeCount;

                // Log performance issues with higher threshold
                if (fps < 20) { // Changed from 30 to 20
                    console.warn(`⚠️ Low FPS detected: ${fps}`);
                }

                // Reset counters
                this.frameCount = 0;
                this.slowFrames = 0;
            }

            requestAnimationFrame(measureFrameRate);
        };

        requestAnimationFrame(measureFrameRate);
    }

    monitorMemory() {
        if ('memory' in performance) {
            this.memoryInterval = setInterval(() => {
                if (!this.isMonitoring) return;

                try {
                    const memory = performance.memory;
                    this.metrics.memoryUsage = memory.usedJSHeapSize / 1024 / 1024; // MB

                    // Warn if memory usage is high
                    if (this.metrics.memoryUsage > 100) { // 100MB
                        console.warn(`⚠️ High memory usage: ${this.metrics.memoryUsage.toFixed(2)}MB`);
                    }
                } catch (error) {
                    console.warn('Memory monitoring error:', error);
                }
            }, 10000); // Increased from 5000ms to 10000ms
        }
    }

    monitorLongTasks() {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 100) { // Increased from 50ms to 100ms
                        console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                        this.freezeCount++;

                        if (this.freezeCount > 8) { // Increased from 3 to 8
                            this.enableEmergencyMode();
                        }
                    }
                });
            });

            observer.observe({ entryTypes: ['longtask'] });
        }
    }

    enableEmergencyMode() {
        console.warn('🚨 Emergency mode enabled - reducing performance load');

        // Stop all intervals
        if (window.performanceManager) {
            window.performanceManager.emergencyCleanupAll();
        }

        // Disable animations
        document.body.style.setProperty('--animation-duration', '0ms');
        document.body.style.setProperty('--transition-duration', '0ms');

        // Reduce update frequencies
        this.reduceUpdateFrequencies();

        // Reset freeze counter
        this.freezeCount = 0;

        // Show user notification only once per session
        if (!this.warningShown) {
            this.showPerformanceWarning();
            this.warningShown = true;
        }
    }

    reduceUpdateFrequencies() {
        // Find all setInterval calls and increase their intervals
        const intervals = window.performanceManager?.intervals;
        if (intervals) {
            intervals.forEach((interval, key) => {
                window.performanceManager.updateInterval(key, interval.interval * 4);
            });
        }
    }

    showPerformanceWarning() {
        // Check if warning already exists
        if (document.querySelector('.performance-warning')) {
            return;
        }

        const warning = document.createElement('div');
        warning.className = 'performance-warning';
        warning.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-family: sans-serif;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        warning.innerHTML = `
            <h4>Performance Optimized</h4>
            <p>Performance optimizations have been applied to ensure smooth operation.</p>
            <button onclick="this.parentElement.remove()" style="background: white; color: #ef4444; border: none; padding: 0.5rem 1rem; border-radius: 4px; margin-top: 0.5rem; cursor: pointer;">Dismiss</button>
        `;

        document.body.appendChild(warning);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (warning.parentElement) {
                warning.remove();
            }
        }, 8000);
    }

    getMetrics() {
        return this.metrics;
    }

    resetMetrics() {
        this.frameCount = 0;
        this.slowFrames = 0;
        this.freezeCount = 0;
        this.metrics = {
            fps: 0,
            averageFrameTime: 0,
            slowFrames: 0,
            freezes: 0,
            memoryUsage: 0
        };
    }
}

// Export for use in components
window.performanceMonitor = new PerformanceMonitor();
console.log('Performance monitor initialized'); 