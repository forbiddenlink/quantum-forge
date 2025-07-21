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
        
        const adjustedInterval = this.isLowPowerMode ? interval * 2 : interval;
        
        const intervalId = setInterval(() => {
            const counter = this.updateCounters.get(key) || 0;
            this.updateCounters.set(key, counter + 1);
            
            // Check if we should update based on frequency
            const updateFrequency = options.updateFrequency || 1;
            if (counter % updateFrequency === 0) {
                callback();
            }
            
            // Stop after max updates
            if (counter >= this.maxUpdates) {
                this.clearInterval(key);
                console.log(`🛑 ${key} updates stopped to save resources`);
            }
        }, adjustedInterval);
        
        this.intervals.set(key, {
            id: intervalId,
            interval: adjustedInterval,
            originalInterval: interval,
            callback,
            options
        });
        
        console.log(`📊 Registered interval: ${key} (${adjustedInterval}ms)`);
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
        const stats = {
            activeIntervals: this.intervals.size,
            lowPowerMode: this.isLowPowerMode,
            updateCounters: Object.fromEntries(this.updateCounters)
        };
        
        console.log('📈 Performance Stats:', stats);
        return stats;
    }
}

// Export for use in components
window.performanceManager = new PerformanceManager();
console.log('Performance manager initialized'); 