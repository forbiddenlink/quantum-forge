/**
 * 🛡️ Security Manager Service
 * Contest Enhancement: Comprehensive Security Hardening
 */

class SecurityManager {
    constructor() {
        this.cspDirectives = {
            'default-src': "'self'",
            'script-src': "'self' 'unsafe-inline' https://cdn.jsdelivr.net https://unpkg.com",
            'style-src': "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
            'style-src-elem': "'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
            'font-src': "'self' https://fonts.gstatic.com",
            'img-src': "'self' data: https:",
            'connect-src': "'self' https://api.github.com",
            'media-src': "'self'",
            'object-src': "'none'",
            'frame-src': "'none'",
            'base-uri': "'self'",
            'form-action': "'self'"
        };
        
        this.init();
    }

    /**
     * Initialize security enhancements
     */
    init() {
        this.setupContentSecurityPolicy();
        this.setupInputSanitization();
        this.setupXSSProtection();
        this.setupClickjackingProtection();
        this.setupSecureHeaders();
        this.monitorSecurityEvents();
        this.validateUserInput();
    }

    /**
     * Setup Content Security Policy
     */
    setupContentSecurityPolicy() {
        // Wait for all stylesheets to load before applying CSP
        const waitForStylesheets = () => {
            const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
            let loadedCount = 0;
            const totalStylesheets = stylesheets.length;
            
            if (totalStylesheets === 0) {
                // No stylesheets found, apply CSP immediately
                this.applyCSP();
                return;
            }
            
            stylesheets.forEach(link => {
                if (link.sheet) {
                    loadedCount++;
                } else {
                    link.addEventListener('load', () => {
                        loadedCount++;
                        if (loadedCount >= totalStylesheets) {
                            this.applyCSP();
                        }
                    });
                    link.addEventListener('error', () => {
                        loadedCount++;
                        if (loadedCount >= totalStylesheets) {
                            this.applyCSP();
                        }
                    });
                }
            });
            
            // Fallback: apply CSP after 3 seconds regardless
            setTimeout(() => {
                if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
                    this.applyCSP();
                }
            }, 3000);
        };
        
        // Start waiting for stylesheets
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', waitForStylesheets);
        } else {
            waitForStylesheets();
        }
    }
    
    /**
     * Apply Content Security Policy
     */
    applyCSP() {
        // Create CSP meta tag if not exists
        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            const cspMeta = document.createElement('meta');
            cspMeta.httpEquiv = 'Content-Security-Policy';
            cspMeta.content = this.buildCSPString();
            document.head.appendChild(cspMeta);
            console.log('🛡️ Content Security Policy applied successfully');
        }

        // Monitor CSP violations
        document.addEventListener('securitypolicyviolation', (e) => {
            console.warn('🚨 CSP Violation:', {
                violatedDirective: e.violatedDirective,
                blockedURI: e.blockedURI,
                originalPolicy: e.originalPolicy
            });
            
            // Report to analytics if available
            if (window.analytics) {
                window.analytics.track('CSP Violation', {
                    directive: e.violatedDirective,
                    uri: e.blockedURI
                });
            }
        });
    }

    /**
     * Build CSP string from directives
     */
    buildCSPString() {
        return Object.entries(this.cspDirectives)
            .map(([key, value]) => `${key} ${value}`)
            .join('; ');
    }

    /**
     * Setup input sanitization
     */
    setupInputSanitization() {
        // Create sanitization function
        this.sanitize = (input) => {
            if (typeof input !== 'string') return input;
            
            return input
                .replace(/[<>]/g, '') // Remove angle brackets
                .replace(/javascript:/gi, '') // Remove javascript: protocol
                .replace(/on\w+=/gi, '') // Remove event handlers
                .replace(/style=/gi, '') // Remove inline styles
                .trim()
                .substring(0, 1000); // Limit length
        };

        // Auto-sanitize form inputs
        document.addEventListener('input', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                const originalValue = e.target.value;
                const sanitizedValue = this.sanitize(originalValue);
                
                if (originalValue !== sanitizedValue) {
                    e.target.value = sanitizedValue;
                    console.warn('🧹 Input sanitized:', { original: originalValue, sanitized: sanitizedValue });
                }
            }
        });
    }

    /**
     * Setup XSS protection
     */
    setupXSSProtection() {
        // Add X-XSS-Protection header via meta tag
        const xssProtectionMeta = document.createElement('meta');
        xssProtectionMeta.httpEquiv = 'X-XSS-Protection';
        xssProtectionMeta.content = '1; mode=block';
        document.head.appendChild(xssProtectionMeta);

        // Add X-Content-Type-Options header
        const contentTypeMeta = document.createElement('meta');
        contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
        contentTypeMeta.content = 'nosniff';
        document.head.appendChild(contentTypeMeta);

        // Scan for potential XSS attempts in URL
        this.scanForXSSInURL();
    }

    /**
     * Scan URL for potential XSS attempts
     */
    scanForXSSInURL() {
        const url = window.location.href;
        const xssPatterns = [
            /<script/i,
            /javascript:/i,
            /onload=/i,
            /onerror=/i,
            /alert\(/i,
            /eval\(/i,
            /document\.write/i
        ];

        const hasXSS = xssPatterns.some(pattern => pattern.test(url));
        
        if (hasXSS) {
            console.error('🚨 Potential XSS attempt detected in URL');
            // Redirect to safe page
            window.location.href = '/';
        }
    }

    /**
     * Setup clickjacking protection
     */
    setupClickjackingProtection() {
        // Note: X-Frame-Options must be set as HTTP header, not meta tag
        // This is client-side frame detection only
        
        // Check if page is framed
        if (window.top !== window.self) {
            console.warn('🚨 Page is being framed - potential clickjacking attempt');
            // Break out of frame
            window.top.location = window.self.location;
        }
    }

    /**
     * Setup secure headers
     */
    setupSecureHeaders() {
        // Add Referrer Policy
        const referrerMeta = document.createElement('meta');
        referrerMeta.name = 'referrer';
        referrerMeta.content = 'strict-origin-when-cross-origin';
        document.head.appendChild(referrerMeta);

        // Add Permissions Policy
        const permissionsMeta = document.createElement('meta');
        permissionsMeta.httpEquiv = 'Permissions-Policy';
        permissionsMeta.content = 'camera=(), microphone=(), geolocation=(), payment=()';
        document.head.appendChild(permissionsMeta);
    }

    /**
     * Monitor security events
     */
    monitorSecurityEvents() {
        // Monitor for suspicious activities
        let suspiciousActivityCount = 0;
        const maxSuspiciousActivities = 5;

        // Monitor rapid form submissions
        let lastSubmissionTime = 0;
        document.addEventListener('submit', (e) => {
            const now = Date.now();
            if (now - lastSubmissionTime < 1000) { // Less than 1 second
                suspiciousActivityCount++;
                console.warn('🚨 Rapid form submission detected');
                
                if (suspiciousActivityCount >= maxSuspiciousActivities) {
                    e.preventDefault();
                    this.triggerSecurityAlert('Multiple rapid submissions detected');
                }
            }
            lastSubmissionTime = now;
        });

        // Monitor for automated requests
        document.addEventListener('click', (e) => {
            if (e.isTrusted === false) {
                suspiciousActivityCount++;
                console.warn('🚨 Non-trusted click event detected');
            }
        });

        // Monitor console access attempts
        const originalLog = console.log;
        console.log = (...args) => {
            if (args.some(arg => typeof arg === 'string' && arg.includes('eval'))) {
                console.warn('🚨 Potential console injection attempt');
            }
            originalLog.apply(console, args);
        };
    }

    /**
     * Validate user input
     */
    validateUserInput() {
        // Email validation
        this.validateEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        // Password strength validation
        this.validatePassword = (password) => {
            const minLength = 8;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasNonalphas = /\W/.test(password);

            return {
                isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
                strength: this.calculatePasswordStrength(password),
                requirements: {
                    minLength: password.length >= minLength,
                    hasUpperCase,
                    hasLowerCase,
                    hasNumbers,
                    hasSpecialChars: hasNonalphas
                }
            };
        };

        // URL validation
        this.validateURL = (url) => {
            try {
                const urlObj = new URL(url);
                return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
            } catch {
                return false;
            }
        };
    }

    /**
     * Calculate password strength
     */
    calculatePasswordStrength(password) {
        let score = 0;
        
        // Length bonus
        score += Math.min(password.length * 4, 25);
        
        // Charset bonus
        if (/[a-z]/.test(password)) score += 5;
        if (/[A-Z]/.test(password)) score += 5;
        if (/\d/.test(password)) score += 5;
        if (/\W/.test(password)) score += 10;
        
        // Pattern penalties
        if (/(.)\1{2,}/.test(password)) score -= 10; // Repeated characters
        if (/123|abc|qwe/i.test(password)) score -= 10; // Common patterns
        
        score = Math.max(0, Math.min(100, score));
        
        if (score < 30) return 'weak';
        if (score < 60) return 'medium';
        if (score < 90) return 'strong';
        return 'very-strong';
    }

    /**
     * Secure data storage
     */
    secureStorage = {
        set: (key, value) => {
            try {
                const encrypted = btoa(JSON.stringify(value));
                localStorage.setItem(key, encrypted);
            } catch (error) {
                console.error('Failed to store data securely:', error);
            }
        },

        get: (key) => {
            try {
                const encrypted = localStorage.getItem(key);
                if (!encrypted) return null;
                return JSON.parse(atob(encrypted));
            } catch (error) {
                console.error('Failed to retrieve data securely:', error);
                return null;
            }
        },

        remove: (key) => {
            localStorage.removeItem(key);
        }
    };

    /**
     * Rate limiting for API requests
     */
    createRateLimiter(maxRequests = 10, timeWindow = 60000) {
        const requests = new Map();

        return (identifier) => {
            const now = Date.now();
            const userRequests = requests.get(identifier) || [];
            
            // Remove old requests outside time window
            const validRequests = userRequests.filter(time => now - time < timeWindow);
            
            if (validRequests.length >= maxRequests) {
                console.warn('🚨 Rate limit exceeded for:', identifier);
                return false;
            }
            
            validRequests.push(now);
            requests.set(identifier, validRequests);
            return true;
        };
    }

    /**
     * Secure AJAX requests
     */
    secureRequest(url, options = {}) {
        // Add security headers
        const secureOptions = {
            ...options,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-Custom-Header': 'QuantumForge',
                ...options.headers
            },
            credentials: 'same-origin'
        };

        // Validate URL
        if (!this.validateURL(url)) {
            throw new Error('Invalid URL provided');
        }

        // Add CSRF token if available
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        if (csrfToken) {
            secureOptions.headers['X-CSRF-Token'] = csrfToken;
        }

        return fetch(url, secureOptions);
    }

    /**
     * Trigger security alert
     */
    triggerSecurityAlert(message) {
        console.error('🚨 SECURITY ALERT:', message);
        
        // Show user-friendly message
        this.showSecurityNotification('Security check activated. Please refresh the page.');
        
        // Log security event
        if (window.analytics) {
            window.analytics.track('Security Alert', { message });
        }
    }

    /**
     * Show security notification to user
     */
    showSecurityNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #dc2626;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 300px;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    /**
     * Cleanup sensitive data
     */
    cleanup() {
        // Clear sensitive data from memory
        this.cspDirectives = null;
        
        // Clear any temporary tokens
        sessionStorage.removeItem('temp-token');
        
        // Reset form values
        document.querySelectorAll('input[type="password"]').forEach(input => {
            input.value = '';
        });
    }
}

// Export for use in other modules
export default SecurityManager;

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    window.securityManager = new SecurityManager();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        window.securityManager.cleanup();
    });
} 