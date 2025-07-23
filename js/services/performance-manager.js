// Enhanced Performance Manager - Proactive Memory Leak Prevention
class PerformanceManager {
    constructor() {
        this.componentIntervals = new Map(); // component -> Set of intervals
        this.componentTimeouts = new Map();  // component -> Set of timeouts
        this.componentObservers = new Map(); // component -> Set of observers
        this.componentCharts = new Map();    // component -> Set of charts
        this.isLowPowerMode = false;
        this.cleanupCallbacks = new Map();   // component -> cleanup function
        
        console.log('🎯 Enhanced Performance Manager initialized');
        
        // Monitor for memory pressure
        this.startMemoryMonitoring();
        
        // Periodic cleanup check
        this.setupPeriodicCleanup();
    }

    // Register a component for resource management
    registerComponent(componentName, cleanupCallback = null) {
        if (!this.componentIntervals.has(componentName)) {
            this.componentIntervals.set(componentName, new Set());
            this.componentTimeouts.set(componentName, new Set());
            this.componentObservers.set(componentName, new Set());
            this.componentCharts.set(componentName, new Set());
            
            if (cleanupCallback) {
                this.cleanupCallbacks.set(componentName, cleanupCallback);
            }
            
            console.log(`📝 Component registered: ${componentName}`);
        }
    }

    // Create a managed interval that auto-cleans with component
    createManagedInterval(componentName, callback, interval, options = {}) {
        const { 
            maxExecutions = Infinity, 
            stopOnHidden = true,
            updateFrequency = 1 
        } = options;
        
        let executions = 0;
        let isVisible = !document.hidden;
        
        // Respect low power mode
        const actualInterval = this.isLowPowerMode ? interval * 2 : interval;
        
        const managedCallback = () => {
            // Skip if page is hidden and stopOnHidden is true
            if (stopOnHidden && document.hidden) {
                return;
            }
            
            // Skip if low power mode and this execution should be skipped
            if (this.isLowPowerMode && Math.random() > (1 / updateFrequency)) {
                return;
            }
            
            try {
                callback();
                executions++;
                
                // Auto-stop after max executions
                if (executions >= maxExecutions) {
                    this.clearManagedInterval(componentName, intervalId);
                }
            } catch (error) {
                console.error(`Error in managed interval for ${componentName}:`, error);
                this.clearManagedInterval(componentName, intervalId);
            }
        };
        
        const intervalId = setInterval(managedCallback, actualInterval);
        
        // Track interval
        if (!this.componentIntervals.has(componentName)) {
            this.registerComponent(componentName);
        }
        this.componentIntervals.get(componentName).add(intervalId);
        
        // Listen for visibility changes
        const visibilityHandler = () => {
            isVisible = !document.hidden;
        };
        document.addEventListener('visibilitychange', visibilityHandler);
        
        return {
            id: intervalId,
            stop: () => this.clearManagedInterval(componentName, intervalId),
            pause: () => this.pauseManagedInterval(componentName, intervalId),
            resume: () => this.resumeManagedInterval(componentName, intervalId)
        };
    }

    // Create managed timeout
    createManagedTimeout(componentName, callback, delay) {
        const timeoutId = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                console.error(`Error in managed timeout for ${componentName}:`, error);
            } finally {
                // Auto-remove from tracking
                if (this.componentTimeouts.has(componentName)) {
                    this.componentTimeouts.get(componentName).delete(timeoutId);
                }
            }
        }, delay);
        
        // Track timeout
        if (!this.componentTimeouts.has(componentName)) {
            this.registerComponent(componentName);
        }
        this.componentTimeouts.get(componentName).add(timeoutId);
        
        return timeoutId;
    }

    // Register an observer for cleanup
    registerObserver(componentName, observer) {
        if (!this.componentObservers.has(componentName)) {
            this.registerComponent(componentName);
        }
        this.componentObservers.get(componentName).add(observer);
    }

    // Register a chart for cleanup
    registerChart(componentName, chart) {
        if (!this.componentCharts.has(componentName)) {
            this.registerComponent(componentName);
        }
        this.componentCharts.get(componentName).add(chart);
    }

    // Clean up all resources for a component
    cleanupComponent(componentName) {
        let cleanedCount = 0;
        
        // Clear intervals
        if (this.componentIntervals.has(componentName)) {
            this.componentIntervals.get(componentName).forEach(id => {
                clearInterval(id);
                cleanedCount++;
            });
            this.componentIntervals.get(componentName).clear();
        }
        
        // Clear timeouts
        if (this.componentTimeouts.has(componentName)) {
            this.componentTimeouts.get(componentName).forEach(id => {
                clearTimeout(id);
                cleanedCount++;
            });
            this.componentTimeouts.get(componentName).clear();
        }
        
        // Disconnect observers
        if (this.componentObservers.has(componentName)) {
            this.componentObservers.get(componentName).forEach(observer => {
                if (observer && typeof observer.disconnect === 'function') {
                    observer.disconnect();
                    cleanedCount++;
                }
            });
            this.componentObservers.get(componentName).clear();
        }
        
        // Destroy charts
        if (this.componentCharts.has(componentName)) {
            this.componentCharts.get(componentName).forEach(chart => {
                if (chart && typeof chart.destroy === 'function') {
                    chart.destroy();
                    cleanedCount++;
                }
            });
            this.componentCharts.get(componentName).clear();
        }
        
        // Call custom cleanup callback
        if (this.cleanupCallbacks.has(componentName)) {
            try {
                this.cleanupCallbacks.get(componentName)();
                this.cleanupCallbacks.delete(componentName);
            } catch (error) {
                console.error(`Error in cleanup callback for ${componentName}:`, error);
            }
        }
        
        console.log(`🧹 Cleaned up ${cleanedCount} resources for ${componentName}`);
        return cleanedCount;
    }

    // Clear specific managed interval
    clearManagedInterval(componentName, intervalId) {
        clearInterval(intervalId);
        if (this.componentIntervals.has(componentName)) {
            this.componentIntervals.get(componentName).delete(intervalId);
        }
    }

    // Pause all intervals for a component
    pauseComponent(componentName) {
        // Implementation for pausing (would need to store interval data)
        console.log(`⏸️ Paused component: ${componentName}`);
    }

    // Resume all intervals for a component
    resumeComponent(componentName) {
        // Implementation for resuming
        console.log(`▶️ Resumed component: ${componentName}`);
    }

    // Enable low power mode
    enableLowPowerMode() {
        this.isLowPowerMode = true;
        console.log('🔋 Low power mode enabled - reducing resource usage');
        
        // Notify all components
        window.dispatchEvent(new CustomEvent('lowPowerModeEnabled'));
    }

    // Disable low power mode
    disableLowPowerMode() {
        this.isLowPowerMode = false;
        console.log('⚡ Low power mode disabled - normal operation restored');
        
        // Notify all components
        window.dispatchEvent(new CustomEvent('lowPowerModeDisabled'));
    }

    // Get resource usage stats
    getResourceStats() {
        let totalIntervals = 0;
        let totalTimeouts = 0;
        let totalObservers = 0;
        let totalCharts = 0;
        
        this.componentIntervals.forEach(intervals => totalIntervals += intervals.size);
        this.componentTimeouts.forEach(timeouts => totalTimeouts += timeouts.size);
        this.componentObservers.forEach(observers => totalObservers += observers.size);
        this.componentCharts.forEach(charts => totalCharts += charts.size);
        
        return {
            intervals: totalIntervals,
            timeouts: totalTimeouts,
            observers: totalObservers,
            charts: totalCharts,
            components: this.componentIntervals.size,
            isLowPowerMode: this.isLowPowerMode
        };
    }

    // Monitor for memory pressure
    startMemoryMonitoring() {
        this.createManagedInterval('PerformanceManager', () => {
            const stats = this.getResourceStats();
            const total = stats.intervals + stats.timeouts + stats.observers + stats.charts;
            
            // Auto-enable low power mode if too many resources
            if (total > 30 && !this.isLowPowerMode) {
                console.warn(`⚠️ High resource usage detected: ${total} resources`);
                this.enableLowPowerMode();
            }
            
            // Auto-disable if resources drop
            if (total < 15 && this.isLowPowerMode) {
                this.disableLowPowerMode();
            }
            
        }, 10000, { stopOnHidden: false });
    }

    // Setup periodic cleanup of orphaned resources
    setupPeriodicCleanup() {
        this.createManagedInterval('PerformanceManager', () => {
            // Clean up components that no longer exist in DOM
            this.componentIntervals.forEach((intervals, componentName) => {
                // Check if component still exists (basic heuristic)
                const element = document.querySelector(componentName.toLowerCase()) || 
                               document.querySelector(`[class*="${componentName.toLowerCase()}"]`);
                
                if (!element && intervals.size > 0) {
                    console.log(`🗑️ Cleaning up orphaned component: ${componentName}`);
                    this.cleanupComponent(componentName);
                }
            });
        }, 60000, { stopOnHidden: false }); // Every minute
    }

    // Emergency cleanup all
    emergencyCleanupAll() {
        let totalCleaned = 0;
        
        this.componentIntervals.forEach((intervals, componentName) => {
            totalCleaned += this.cleanupComponent(componentName);
        });
        
        console.log(`🚨 Emergency cleanup completed: ${totalCleaned} resources cleaned`);
        return totalCleaned;
    }

    // Destroy the performance manager
    destroy() {
        this.emergencyCleanupAll();
        console.log('💥 Performance Manager destroyed');
    }
}

// Initialize global performance manager
if (!window.performanceManager) {
    window.performanceManager = new PerformanceManager();
    console.log('🎯 Performance Manager available globally');
}

// Auto-cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.performanceManager) {
        window.performanceManager.emergencyCleanupAll();
    }
});

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceManager;
} 