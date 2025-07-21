// Welcome Section Component
class WelcomeSection {
    constructor() {
        this.init();
    }

    init() {
        this.updateGreeting();
        this.initializeStats();
        this.initializeEventsList();
        this.initializeShortcuts();
        this.addDataAttributesToStats();
        
        // Update greeting and stats periodically
        setInterval(() => this.updateGreeting(), 60000); // Every minute
        setInterval(() => this.updateStats(), 30000); // Every 30 seconds
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
        if (hour >= 12 && hour < 17) {
            greeting = 'Good afternoon';
        } else if (hour >= 17) {
            greeting = 'Good evening';
        }

        greetingElement.textContent = greeting;
    }

    initializeStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const value = parseInt(stat.dataset.value || stat.textContent);
            this.animateNumber(stat, 0, value);
        });
    }

    animateNumber(element, start, end) {
        const duration = 1000;
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
            }
        });
    }

    initializeProgressBar() {
        const progressBar = document.querySelector('.progress-bar-fill');
        const progressText = document.querySelector('.progress-percentage');
        
        if (!progressBar || !progressText) return;

        // Calculate completion percentage based on tasks
        const totalTasks = document.querySelector('[aria-label="Tasks completed"] .stat-number');
        const dueTasks = document.querySelector('[aria-label="Tasks due today"] .stat-number');
        const overdueTasks = document.querySelector('[aria-label="Overdue tasks"] .stat-number');

        if (!totalTasks || !dueTasks || !overdueTasks) return;

        const completed = parseInt(totalTasks.dataset.value);
        const due = parseInt(dueTasks.dataset.value);
        const overdue = parseInt(overdueTasks.dataset.value);
        const total = completed + due + overdue;

        const percentage = Math.round((completed / total) * 100);
        
        // Animate progress bar
        progressBar.style.width = '0%';
        setTimeout(() => {
            progressBar.style.width = `${percentage}%`;
            this.animateNumber(progressText, 0, percentage);
        }, 100);
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
}

// Initialize the welcome section
document.addEventListener('DOMContentLoaded', () => {
    new WelcomeSection();
}); 