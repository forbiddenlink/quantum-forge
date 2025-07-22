// Enhanced Welcome Section Component - Dream Intranet Homepage
class WelcomeSection {
    constructor() {
        this.init();
        this.particles = [];
        this.animationFrame = null;
    }

    init() {
        this.updateGreeting();
        this.initializeStats();
        this.initializeEventsList();
        this.initializeShortcuts();
        this.addDataAttributesToStats();
        this.initializeParticles();
        this.initializeProgressBars();
        this.initializeHoverEffects();
        this.initializeRealTimeUpdates();
        
        // Update greeting and stats periodically
        setInterval(() => this.updateGreeting(), 60000); // Every minute
        setInterval(() => this.updateStats(), 30000); // Every 30 seconds
        setInterval(() => this.updateEvents(), 120000); // Every 2 minutes
        
        // Start particle animation
        this.animateParticles();
    }

    initializeParticles() {
        const particlesContainer = document.querySelector('.welcome-section .particles');
        if (!particlesContainer) {
            // Create particles container if it doesn't exist
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                const particles = document.createElement('div');
                particles.className = 'particles';
                welcomeSection.appendChild(particles);
                
                // Add particle elements
                for (let i = 0; i < 3; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'particle';
                    particles.appendChild(particle);
                }
            }
        }
    }

    animateParticles() {
        const particles = document.querySelectorAll('.welcome-section .particle');
        particles.forEach((particle, index) => {
            const delay = index * 2000;
            setTimeout(() => {
                particle.style.animationDelay = `${delay}ms`;
            }, delay);
        });
    }

    initializeProgressBars() {
        // Add progress bars to stats
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach(stat => {
            const progressBar = document.createElement('div');
            progressBar.className = 'stat-progress';
            progressBar.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                height: 2px;
                background: linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.3));
                border-radius: 1px;
                transform: scaleX(0);
                transform-origin: left;
                transition: transform 1s ease-out;
            `;
            stat.appendChild(progressBar);
            
            // Animate progress bar
            setTimeout(() => {
                progressBar.style.transform = 'scaleX(1)';
            }, 500 + Math.random() * 1000);
        });
    }

    initializeHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('.stat-item, .event-card, .quick-actions .btn');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
            
            element.addEventListener('mouseleave', () => {
                this.removeRippleEffects(element);
            });
        });
    }

    createRippleEffect(event) {
        const element = event.currentTarget;
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        element.appendChild(ripple);
        
        // Add ripple animation CSS if not exists
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    removeRippleEffects(element) {
        const ripples = element.querySelectorAll('.ripple-effect');
        ripples.forEach(ripple => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        });
    }

    initializeRealTimeUpdates() {
        // Simulate real-time data updates
        setInterval(() => {
            this.updateRandomStat();
        }, 15000); // Every 15 seconds
    }

    updateRandomStat() {
        const statItems = document.querySelectorAll('.stat-item .stat-number');
        if (statItems.length === 0) return;
        
        const randomStat = statItems[Math.floor(Math.random() * statItems.length)];
        const currentValue = parseInt(randomStat.textContent);
        const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        const newValue = Math.max(0, currentValue + change);
        
        if (newValue !== currentValue) {
            this.animateNumber(randomStat, currentValue, newValue);
            
            // Add visual feedback
            randomStat.style.color = change > 0 ? '#10b981' : change < 0 ? '#f87171' : 'inherit';
            setTimeout(() => {
                randomStat.style.color = 'inherit';
            }, 2000);
        }
    }

    addDataAttributesToStats() {
        // Add data-value attributes for animation if they don't exist
        const stats = [
            { selector: '.stat-item[aria-label*="Active projects"] .stat-number', value: 12 },
            { selector: '.stat-item[aria-label*="Team members"] .stat-number', value: 8 },
            { selector: '.stat-item[aria-label*="meetings"] .stat-number', value: 3 },
            { selector: '.stat-item[aria-label*="Tasks completed"] .stat-number', value: 24 },
            { selector: '.stat-item[aria-label*="due today"] .stat-number', value: 5 },
            { selector: '.stat-item[aria-label*="Overdue"] .stat-number', value: 2 }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.selector);
            if (element && !element.dataset.value) {
                element.dataset.value = stat.value;
            }
        });
    }

    updateGreeting() {
        const hour = new Date().getHours();
        const greetingElement = document.querySelector('.greeting');
        
        if (!greetingElement) return;

        let greeting = 'Good morning';
        let emoji = '🌅';
        
        if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
            emoji = '☀️';
        } else if (hour >= 17) {
            greeting = 'Good evening';
            emoji = '🌆';
        }

        // Animate greeting change
        greetingElement.style.opacity = '0';
        greetingElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            greetingElement.textContent = `${emoji} ${greeting}`;
            greetingElement.style.opacity = '1';
            greetingElement.style.transform = 'translateY(0)';
        }, 300);
    }

    initializeStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach((stat, index) => {
            const value = parseInt(stat.dataset.value || stat.textContent);
            // Stagger animation
            setTimeout(() => {
                this.animateNumber(stat, 0, value);
            }, index * 200);
        });
    }

    animateNumber(element, start, end) {
        const duration = 1500;
        const steps = 60;
        const increment = (end - start) / steps;
        let current = start;
        const interval = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                clearInterval(timer);
                element.textContent = end;
            } else {
                element.textContent = Math.round(current);
            }
        }, interval);
    }

    initializeEventsList() {
        const toggleButton = document.querySelector('.events-toggle');
        const eventsList = document.querySelector('.events-list');

        if (!toggleButton || !eventsList) return;

        toggleButton.addEventListener('click', () => {
            eventsList.classList.toggle('collapsed');
            toggleButton.classList.toggle('collapsed');
            toggleButton.setAttribute('aria-expanded', 
                eventsList.classList.contains('collapsed') ? 'false' : 'true'
            );
        });

        // Add event countdown timers
        this.initializeEventCountdowns();
    }

    initializeEventCountdowns() {
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            const timeElement = card.querySelector('.event-time');
            if (timeElement) {
                this.addCountdownTimer(card, timeElement);
            }
        });
    }

    addCountdownTimer(card, timeElement) {
        const timeText = timeElement.textContent;
        const timeMatch = timeText.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
        
        if (timeMatch) {
            const hour = parseInt(timeMatch[1]);
            const minute = parseInt(timeMatch[2]);
            const period = timeMatch[3];
            
            // Convert to 24-hour format
            let hour24 = hour;
            if (period === 'PM' && hour !== 12) hour24 += 12;
            if (period === 'AM' && hour === 12) hour24 = 0;
            
            const eventTime = new Date();
            eventTime.setHours(hour24, minute, 0, 0);
            
            // If event time has passed today, set it to tomorrow
            if (eventTime < new Date()) {
                eventTime.setDate(eventTime.getDate() + 1);
            }
            
            const countdownElement = document.createElement('div');
            countdownElement.className = 'event-countdown';
            countdownElement.style.cssText = `
                font-size: 0.75rem;
                color: rgba(255, 255, 255, 0.7);
                margin-top: 0.5rem;
                font-weight: 500;
            `;
            
            card.appendChild(countdownElement);
            
            const updateCountdown = () => {
                const now = new Date();
                const diff = eventTime - now;
                
                if (diff > 0) {
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    
                    if (hours > 0) {
                        countdownElement.textContent = `Starts in ${hours}h ${minutes}m`;
                    } else {
                        countdownElement.textContent = `Starts in ${minutes}m`;
                    }
                } else {
                    countdownElement.textContent = 'Starting now';
                }
            };
            
            updateCountdown();
            setInterval(updateCountdown, 60000); // Update every minute
        }
    }

    initializeShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (!e.ctrlKey) return;

            const shortcuts = {
                'n': () => document.querySelector('[data-shortcut="Ctrl+N"]')?.click(),
                't': () => document.querySelector('[data-shortcut="Ctrl+T"]')?.click(),
                'm': () => document.querySelector('[data-shortcut="Ctrl+M"]')?.click(),
                'd': () => document.querySelector('[data-shortcut="Ctrl+D"]')?.click()
            };

            if (shortcuts[e.key.toLowerCase()]) {
                e.preventDefault();
                shortcuts[e.key.toLowerCase()]();
                
                // Visual feedback for shortcut
                this.showShortcutFeedback(e.key.toUpperCase());
            }
        });
    }

    showShortcutFeedback(key) {
        const feedback = document.createElement('div');
        feedback.className = 'shortcut-feedback';
        feedback.textContent = `Ctrl+${key}`;
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (feedback.parentNode) {
                    feedback.parentNode.removeChild(feedback);
                }
            }, 300);
        }, 1000);
        
        // Add animation CSS if not exists
        if (!document.querySelector('#shortcut-animations')) {
            const style = document.createElement('style');
            style.id = 'shortcut-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateStats() {
        // In a real application, this would fetch updated stats from the server
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const currentValue = parseInt(stat.textContent);
            const newValue = parseInt(stat.dataset.value || currentValue);
            if (currentValue !== newValue) {
                this.animateNumber(stat, currentValue, newValue);
            }
        });
    }

    updateEvents() {
        // Simulate event updates
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            // Add subtle pulse animation to indicate updates
            card.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
        
        // Add pulse animation CSS if not exists
        if (!document.querySelector('#pulse-animation')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation';
            style.textContent = `
                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.02); }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the welcome section
document.addEventListener('DOMContentLoaded', () => {
    new WelcomeSection();
}); 