// EMERGENCY MEMORY LEAK FIX - Enhanced Version
console.log('🚨 ENHANCED EMERGENCY MEMORY LEAK FIX ACTIVATED');

// Track all intervals and timeouts globally
window.activeIntervals = new Set();
window.activeTimeouts = new Set();
window.activeAnimationFrames = new Set();
window.activeEventListeners = new Map();

// Override setInterval to track all intervals
const originalSetInterval = window.setInterval;
window.setInterval = function(callback, delay, ...args) {
    const id = originalSetInterval.call(window, callback, delay, ...args);
    window.activeIntervals.add(id);
    console.log(`📊 Interval created: ${id} (Total: ${window.activeIntervals.size})`);
    return id;
};

// Override clearInterval to track cleanup
const originalClearInterval = window.clearInterval;
window.clearInterval = function(id) {
    const result = originalClearInterval.call(window, id);
    window.activeIntervals.delete(id);
    console.log(`✅ Interval cleared: ${id} (Remaining: ${window.activeIntervals.size})`);
    return result;
};

// Override setTimeout to track timeouts
const originalSetTimeout = window.setTimeout;
window.setTimeout = function(callback, delay, ...args) {
    const id = originalSetTimeout.call(window, callback, delay, ...args);
    window.activeTimeouts.add(id);
    
    // Auto-remove from tracking when timeout completes
    const wrappedCallback = (...callbackArgs) => {
        window.activeTimeouts.delete(id);
        return callback(...callbackArgs);
    };
    
    return originalSetTimeout.call(window, wrappedCallback, delay, ...args);
};

// Override clearTimeout
const originalClearTimeout = window.clearTimeout;
window.clearTimeout = function(id) {
    const result = originalClearTimeout.call(window, id);
    window.activeTimeouts.delete(id);
    return result;
};

// Override requestAnimationFrame
const originalRequestAnimationFrame = window.requestAnimationFrame;
window.requestAnimationFrame = function(callback) {
    const wrappedCallback = (...args) => {
        window.activeAnimationFrames.delete(id);
        return callback(...args);
    };
    
    const id = originalRequestAnimationFrame.call(window, wrappedCallback);
    window.activeAnimationFrames.add(id);
    return id;
};

// Override cancelAnimationFrame
const originalCancelAnimationFrame = window.cancelAnimationFrame;
window.cancelAnimationFrame = function(id) {
    const result = originalCancelAnimationFrame.call(window, id);
    window.activeAnimationFrames.delete(id);
    return result;
};

// Enhanced cleanup function
window.emergencyCleanup = function() {
    console.log('🚨 ENHANCED EMERGENCY CLEANUP ACTIVATED');
    
    let cleaned = 0;
    
    // Clear all tracked intervals
    window.activeIntervals.forEach(id => {
        originalClearInterval(id);
        cleaned++;
    });
    window.activeIntervals.clear();
    
    // Clear all tracked timeouts
    window.activeTimeouts.forEach(id => {
        originalClearTimeout(id);
        cleaned++;
    });
    window.activeTimeouts.clear();
    
    // Cancel all animation frames
    window.activeAnimationFrames.forEach(id => {
        originalCancelAnimationFrame(id);
        cleaned++;
    });
    window.activeAnimationFrames.clear();
    
    // Use performance manager if available
    if (window.performanceManager && typeof window.performanceManager.emergencyCleanupAll === 'function') {
        const pmCleaned = window.performanceManager.emergencyCleanupAll();
        cleaned += pmCleaned;
        console.log(`🎯 Performance Manager cleaned: ${pmCleaned} resources`);
    }
    
    console.log(`🧹 Enhanced emergency cleanup complete! Cleaned ${cleaned} items`);
    
    // Force garbage collection if available
    if (window.gc) {
        window.gc();
        console.log('♻️ Garbage collection triggered');
    }
    
    return cleaned;
};

// Smart cleanup with debouncing and throttling
let cleanupTimeout = null;
const smartCleanup = () => {
    if (cleanupTimeout) return;
    
    cleanupTimeout = setTimeout(() => {
        const intervalCount = window.activeIntervals.size;
        const timeoutCount = window.activeTimeouts.size;
        const frameCount = window.activeAnimationFrames.size;
        const total = intervalCount + timeoutCount + frameCount;
        
        // Only log if there's a significant change
        if (total > window.lastTotalResources + 10 || total < window.lastTotalResources - 10) {
            console.debug(`Resource count changed: ${total} active resources`);
            window.lastTotalResources = total;
        }
        
        // Progressive cleanup thresholds
        if (total > 50) {
            console.debug('Initiating progressive cleanup...');
            // Clean old animation frames first
            window.activeAnimationFrames.forEach(id => {
                if (!document.querySelector('[data-animation-id="' + id + '"]')) {
                    originalCancelAnimationFrame(id);
                    window.activeAnimationFrames.delete(id);
                }
            });
        }
        
        // Only trigger emergency cleanup in extreme cases
        if (total > 200) {
            console.warn('🚨 Resource threshold exceeded, cleaning up...');
            window.emergencyCleanup();
        }
        
        cleanupTimeout = null;
    }, 30000); // Much longer interval
};

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    console.log('Page unloading, triggering emergency cleanup...');
    window.emergencyCleanup();
});

// Enhanced emergency cleanup with better UX
window.addEventListener('keydown', (e) => {
    // Ctrl+Shift+C for emergency cleanup
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        const cleaned = window.emergencyCleanup();
        
        // Show better notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            font-family: Inter, sans-serif;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        notification.innerHTML = `
            <div style="font-weight: 600;">✅ Emergency Cleanup Complete</div>
            <div style="font-size: 0.875rem; opacity: 0.9;">Cleaned ${cleaned} resources</div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    // Ctrl+Shift+S for status report
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        const stats = {
            intervals: window.activeIntervals.size,
            timeouts: window.activeTimeouts.size,
            frames: window.activeAnimationFrames.size
        };
        
        if (window.performanceManager) {
            const pmStats = window.performanceManager.getResourceStats();
            Object.assign(stats, pmStats);
        }
        
        console.log('📊 Resource Status:', stats);
        alert(`Resource Status:\nIntervals: ${stats.intervals}\nTimeouts: ${stats.timeouts}\nFrames: ${stats.frames}\nTotal: ${stats.intervals + stats.timeouts + stats.frames}`);
    }
});

console.log('🛡️ Enhanced memory leak protection active');
console.log('💡 Press Ctrl+Shift+C for emergency cleanup');
console.log('💡 Press Ctrl+Shift+S for status report'); 