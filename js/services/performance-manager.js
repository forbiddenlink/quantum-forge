// Performance Manager Service
class PerformanceManager {
    constructor() {
        this.intervals = new Map();
        this.updateCounters = new Map();
        this.maxUpdates = 15; // Stop updates after 15 cycles
        this.isLowPowerMode = false;
        this.performanceThreshold = 0.8; // 80% CPU usage threshold
        
        // Monitor performance
        this.initializePerformanceMonitoring();
        
        // Check for low power mode
        this.checkLowPowerMode();
    }

    initializePerformanceMonitoring() {
        // Monitor frame rate and performance with reduced frequency
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measurePerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 2000) { // Changed from 1000ms to 2000ms
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                // If FPS drops below 30, enable low power mode
                if (fps < 30 && !this.isLowPowerMode) {
                    this.enableLowPowerMode();
                } else if (fps > 50 && this.isLowPowerMode) {
                    this.disableLowPowerMode();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measurePerformance);
        };
        
        requestAnimationFrame(measurePerformance);
    }

    checkLowPowerMode() {
        // Check if device is on battery power
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                if (battery.level < 0.2) { // Less than 20% battery
                    this.enableLowPowerMode();
                }
            });
        }
        
        // Check for reduced motion preference
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.enableLowPowerMode();
        }
    }

    enableLowPowerMode() {
        this.isLowPowerMode = true;
        console.log('🔋 Low power mode enabled');
        
        // Reduce update frequencies
        this.intervals.forEach((interval, key) => {
            this.updateInterval(key, interval.interval * 2); // Double the interval
        });
    }

    disableLowPowerMode() {
        this.isLowPowerMode = false;
        console.log('⚡ Normal power mode restored');
        
        // Restore normal update frequencies
        this.intervals.forEach((interval, key) => {
            this.updateInterval(key, interval.originalInterval);
        });
    }

    registerInterval(key, callback, interval, options = {}) {
        // Clear existing interval if any
        this.clearInterval(key);
        
        // Aggressive performance optimization
        const baseInterval = Math.max(interval, 3000); // Minimum 3 seconds
        const adjustedInterval = this.isLowPowerMode ? baseInterval * 3 : baseInterval;
        
        // Reduce max updates further
        const maxUpdatesForKey = options.critical ? 20 : 10;
        
        const intervalId = setInterval(() => {
            const counter = this.updateCounters.get(key) || 0;
            this.updateCounters.set(key, counter + 1);
            
            // Check if we should update based on frequency (skip more updates)
            const updateFrequency = options.updateFrequency || 2; // Default skip every other
            if (counter % updateFrequency === 0) {
                try {
                    callback();
                } catch (error) {
                    console.error(`Error in interval ${key}:`, error);
                    this.clearInterval(key); // Stop broken intervals
                }
            }
            
            // Stop after max updates (reduced limits)
            if (counter >= maxUpdatesForKey) {
                this.clearInterval(key);
                console.log(`🛑 ${key} updates stopped (${counter} cycles completed)`);
            }
        }, adjustedInterval);
        
        this.intervals.set(key, {
            id: intervalId,
            interval: adjustedInterval,
            originalInterval: interval,
            callback,
            options,
            maxUpdates: maxUpdatesForKey,
            startTime: Date.now()
        });
        
        console.log(`📊 Registered interval: ${key} (${adjustedInterval}ms, max: ${maxUpdatesForKey})`);
        
        // Auto-cleanup after 2 minutes for non-critical intervals
        if (!options.critical) {
            setTimeout(() => {
                if (this.intervals.has(key)) {
                    this.clearInterval(key);
                    console.log(`⏰ Auto-cleared interval: ${key} (2 min timeout)`);
                }
            }, 120000);
        }
    }

    updateInterval(key, newInterval) {
        const interval = this.intervals.get(key);
        if (interval) {
            this.clearInterval(key);
            this.registerInterval(key, interval.callback, newInterval, interval.options);
        }
    }

    clearInterval(key) {
        const interval = this.intervals.get(key);
        if (interval) {
            clearInterval(interval.id);
            this.intervals.delete(key);
            this.updateCounters.delete(key);
        }
    }

    clearAllIntervals() {
        this.intervals.forEach((interval, key) => {
            clearInterval(interval.id);
        });
        this.intervals.clear();
        this.updateCounters.clear();
        console.log('🧹 All intervals cleared');
    }

    getPerformanceStats() {
        const now = Date.now();
        const intervalDetails = [];
        
        this.intervals.forEach((data, key) => {
            const runtime = (now - data.startTime) / 1000;
            const counter = this.updateCounters.get(key) || 0;
            intervalDetails.push({
                key,
                runtime: `${runtime.toFixed(1)}s`,
                cycles: counter,
                maxCycles: data.maxUpdates,
                interval: `${data.interval}ms`,
                remaining: data.maxUpdates - counter
            });
        });
        
        const stats = {
            activeIntervals: this.intervals.size,
            lowPowerMode: this.isLowPowerMode,
            totalCycles: Array.from(this.updateCounters.values()).reduce((a, b) => a + b, 0),
            intervalDetails,
            memoryStatus: this.getMemoryStatus()
        };
        
        console.log('📈 Enhanced Performance Stats:', stats);
        return stats;
    }
    
    getMemoryStatus() {
        if (performance.memory) {
            return {
                used: `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
                total: `${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
                limit: `${(performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)}MB`
            };
        }
        return { status: 'unavailable' };
    }
    
    // Emergency cleanup method
    emergencyCleanup() {
        console.log('🚨 EMERGENCY CLEANUP: Clearing all intervals');
        this.clearAllIntervals();
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
        
        // Clear any remaining timers
        const highestId = setTimeout(() => {}, 0);
        for (let i = 0; i < highestId; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
        
        console.log('🧹 Emergency cleanup completed');
    }
}

// Export for use in components
window.performanceManager = new PerformanceManager();
console.log('Performance manager initialized'); 