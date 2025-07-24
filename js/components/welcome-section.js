// 🏆 CONTEST-WINNING WELCOME SECTION - Enhanced with Accessibility & Creative Features
class SpectacularWelcomeSection extends HTMLElement {
    constructor() {
        super();
        this.mousePosition = { x: 0, y: 0 };
        this.particles = [];
        this.sparkles = [];
        this.animationFrame = null;
        this.isInitialized = false;
        this.floatingIcons = ['rocket', 'star', 'diamond', 'sparkle', 'magic', 'target', 'art', 'theater', 'rainbow', 'crystal'];
        this.mouseFollower = null;
        
        // Contest Enhancement Features
        this.recommendations = [];
        this.currentTime = new Date();
        this.activityData = [];
        this.progressData = {};
        this.keyboardNavIndex = 0;
        this.focusableElements = [];
    }

    connectedCallback() {
        console.log('🎨 Contest-Winning Welcome Section Loading...');
        
        // Initialize SVG icon library first and wait for it
        const initializeLibrary = () => {
            return new Promise((resolve) => {
                if (!window.svgIconLibrary) {
                    console.log('Loading SVG icon library...');
                    // Create script element to load SVG library
                    const script = document.createElement('script');
                    script.src = window.location.origin + '/js/components/svg-icon-library.js';
                    script.onload = () => {
                        console.log('SVG icon library loaded successfully!');
                        window.svgIconLibrary = new SVGIconLibrary();
                        resolve();
                    };
                    script.onerror = (error) => {
                        console.error('Failed to load SVG icon library:', error);
                        resolve(); // Continue anyway
                    };
                    document.head.appendChild(script);
                } else {
                    console.log('SVG icon library already loaded');
                    resolve();
                }
            });
        };

        // Initialize everything after SVG library is ready
        initializeLibrary().then(() => {
            // Add debug logging
            console.log('SVG library status:', !!window.svgIconLibrary);
            if (window.svgIconLibrary) {
                console.log('Available icons:', Object.keys(window.svgIconLibrary.icons));
            }

            this.initializeSpectacularEffects();
            this.setupAccessibilityFeatures();
            this.generateSmartRecommendations();
            this.setupMouseTracking();
            this.setupKeyboardNavigation();
            this.startAnimationLoop();
            this.startRealTimeUpdates();
            this.isInitialized = true;
            console.log('✨ Contest-Winning Welcome Section Ready!');

            // Force refresh icons after initialization
            this.refreshIcons();
        });
    }

    disconnectedCallback() {
        console.log('🎨 Spectacular Welcome Section Cleanup...');
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
        }
        this.cleanup();
    }

    // 🏆 ACCESSIBILITY FEATURES
    setupAccessibilityFeatures() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) return;

        // Add ARIA attributes
        welcomeSection.setAttribute('role', 'main');
        welcomeSection.setAttribute('aria-label', 'Welcome dashboard with interactive statistics and upcoming events');
        
        // Add skip link
        this.createSkipLink(welcomeSection);
        
        // Add keyboard navigation helper
        this.createKeyboardHelper(welcomeSection);
        
        // Add screen reader announcements
        this.createLiveRegion(welcomeSection);
        
        // Make interactive elements focusable
        this.enhanceInteractiveElements(welcomeSection);
        
        console.log('♿ Accessibility features initialized!');
    }

    createSkipLink(container) {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        container.appendChild(skipLink);
    }

    createKeyboardHelper(container) {
        const helper = document.createElement('div');
        helper.className = 'keyboard-nav-helper';
        helper.innerHTML = `
            <span>Use <kbd>Tab</kbd> to navigate, <kbd>Enter</kbd> to activate, <kbd>Esc</kbd> to reset focus</span>
        `;
        container.appendChild(helper);
    }

    createLiveRegion(container) {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'welcome-announcements';
        container.appendChild(liveRegion);
        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    enhanceInteractiveElements(container) {
        // Make all interactive elements focusable and add click handlers
        const interactiveElements = container.querySelectorAll('button, .btn, .event-card, .insight-card, .stat-item');
        
        interactiveElements.forEach((element, index) => {
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            
            // Add SVG icons to buttons
            if (element.classList.contains('btn')) {
                const buttonText = element.textContent.trim();
                let iconName = '';
                
                // Map button text to icon names
                switch (buttonText.toLowerCase()) {
                    case 'new task':
                        iconName = 'plus';
                        break;
                    case 'my tasks':
                        iconName = 'page-tasks';
                        break;
                    case 'schedule':
                        iconName = 'schedule';
                        break;
                    case 'documents':
                        iconName = 'documentation';
                        break;
                    default:
                        iconName = 'default';
                }
                
                // Remove any existing icons
                const existingIcon = element.querySelector('.btn-icon');
                if (existingIcon) {
                    existingIcon.remove();
                }
                
                // Create and add the icon
                if (window.svgIconLibrary) {
                    const iconElement = window.svgIconLibrary.createIconElement(iconName, 'btn-icon');
                    // Insert icon before any text
                    element.insertBefore(iconElement, element.firstChild);
                    
                    // Ensure icon is visible and properly styled
                    iconElement.style.cssText = `
                        display: inline-flex !important;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        margin-right: 8px;
                        vertical-align: middle;
                        color: currentColor;
                    `;

                    // Ensure the SVG inside is visible and properly sized
                    const svg = iconElement.querySelector('svg');
                    if (svg) {
                        svg.style.cssText = `
                            width: 100%;
                            height: 100%;
                            display: block;
                        `;
                    }
                }
                
                element.addEventListener('click', (e) => {
                    this.handleQuickActionClick(e, element);
                });
            } else if (element.classList.contains('event-card')) {
                element.addEventListener('click', (e) => {
                    this.handleEventCardClick(e, element);
                });
            } else if (element.classList.contains('insight-card')) {
                element.addEventListener('click', (e) => {
                    this.handleInsightCardClick(e, element);
                });
            } else if (element.classList.contains('stat-item')) {
                element.addEventListener('click', (e) => {
                    this.handleStatItemClick(e, element);
                });
            }
            
            // Add keyboard support
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });
        
        console.log('♿ Enhanced interactive elements:', interactiveElements.length);
    }

    // Handle quick action button clicks
    handleQuickActionClick(event, button) {
        const buttonText = button.textContent.trim();
        console.log('🎯 Quick action clicked:', buttonText);
        
        switch (buttonText) {
            case 'New Task':
                window.location.href = '/pages/tasks.html';
                break;
            case 'My Tasks':
                window.location.href = '/pages/tasks.html';
                break;
            case 'Schedule':
                window.location.href = '/pages/calendar.html';
                break;
            case 'Documents':
                window.location.href = '/pages/documents.html';
                break;
            default:
                console.log('Unknown quick action:', buttonText);
        }
        
        // Announce to screen reader
        this.announceToScreenReader(`Navigating to ${buttonText}`);
    }

    // Handle event card clicks
    handleEventCardClick(event, card) {
        const eventTitle = card.querySelector('.event-title')?.textContent;
        console.log('📅 Event card clicked:', eventTitle);
        
        // Navigate to calendar page
        window.location.href = '/pages/calendar.html';
        
        this.announceToScreenReader(`Opening calendar for ${eventTitle}`);
    }

    // Handle insight card clicks
    handleInsightCardClick(event, card) {
        const insightTitle = card.querySelector('h4')?.textContent;
        console.log('💡 Insight card clicked:', insightTitle);
        
        // Navigate to analytics page for insights
        window.location.href = '/pages/analytics.html';
        
        this.announceToScreenReader(`Viewing analytics for ${insightTitle}`);
    }

    // Handle stat item clicks
    handleStatItemClick(event, statItem) {
        const statLabel = statItem.querySelector('.stat-label')?.textContent;
        console.log('📊 Stat item clicked:', statLabel);
        
        // Navigate to appropriate page based on stat type
        switch (statLabel) {
            case 'Active Projects':
                window.location.href = '/pages/projects.html';
                break;
            case 'Team Online':
                window.location.href = '/pages/team.html';
                break;
            case 'Today\'s Meetings':
                window.location.href = '/pages/calendar.html';
                break;
            case 'Tasks Done':
            case 'Due Today':
            case 'Overdue':
                window.location.href = '/pages/tasks.html';
                break;
            default:
                console.log('Unknown stat type:', statLabel);
        }
        
        this.announceToScreenReader(`Viewing details for ${statLabel}`);
    }

    // 🎯 KEYBOARD NAVIGATION
    setupKeyboardNavigation() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) return;

        welcomeSection.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    this.resetFocus();
                    break;
                case 'h':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.showKeyboardShortcuts();
                    }
                    break;
                case 's':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.triggerSpectacularBurst();
                        this.announceToScreenReader('Spectacular visual effect triggered!');
                    }
                    break;
            }
        });

        console.log('⌨️ Keyboard navigation setup complete!');
    }

    resetFocus() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.focus();
            this.announceToScreenReader('Focus reset to welcome section');
        }
    }

    showKeyboardShortcuts() {
        const shortcuts = `
            Keyboard Shortcuts:
            • Tab: Navigate between elements
            • Enter/Space: Activate buttons and cards
            • Escape: Reset focus
            • Ctrl+H: Show this help
            • Ctrl+S: Trigger visual effects
        `;
        this.announceToScreenReader('Keyboard shortcuts help displayed');
        // You could show this in a modal or tooltip
        console.log(shortcuts);
    }

    // 🤖 SMART RECOMMENDATIONS
    generateSmartRecommendations() {
        const currentHour = this.currentTime.getHours();
        const dayOfWeek = this.currentTime.getDay();
        
        this.recommendations = [
            {
                id: 'focus-time',
                title: '🎯 Focus Time',
                description: 'Block 2 hours for deep work on Project Alpha',
                priority: 'high',
                reason: 'Based on your most productive hours',
                action: () => this.scheduleDeepWork(),
                timeRelevant: currentHour >= 9 && currentHour <= 11
            },
            {
                id: 'team-standup',
                title: '👥 Team Check-in',
                description: 'Quick sync with your remote teammates',
                priority: 'medium',
                reason: 'Your team is online now',
                action: () => this.startTeamCheckIn(),
                timeRelevant: currentHour >= 10 && currentHour <= 12
            },
            {
                id: 'learning-break',
                title: '📚 Skill Building',
                description: 'Complete JavaScript fundamentals module',
                priority: 'low',
                reason: 'You have 30 minutes until your next meeting',
                action: () => this.openLearningModule(),
                timeRelevant: true
            },
            {
                id: 'wellness-reminder',
                title: '🧘 Wellness Break',
                description: 'Take a 5-minute mindfulness break',
                priority: 'medium',
                reason: 'You\'ve been working for 2 hours straight',
                action: () => this.startWellnessBreak(),
                timeRelevant: currentHour % 2 === 0
            }
        ];

        // Filter recommendations based on time relevance
        this.recommendations = this.recommendations.filter(rec => rec.timeRelevant);
        
        console.log('🤖 Smart recommendations generated:', this.recommendations.length);
    }

    // 📊 DATA VISUALIZATION
    createProgressVisualization(container, data) {
        const vizContainer = document.createElement('div');
        vizContainer.className = 'data-viz-container';
        vizContainer.setAttribute('role', 'img');
        vizContainer.setAttribute('aria-label', `Progress visualization showing ${data.label} at ${data.percentage}% completion`);
        
        const progressRing = this.createProgressRing(data.percentage, data.color);
        const label = document.createElement('div');
        label.textContent = data.label;
        label.style.textAlign = 'center';
        label.style.marginTop = '8px';
        label.style.fontSize = '0.875rem';
        label.style.fontWeight = '600';
        
        vizContainer.appendChild(progressRing);
        vizContainer.appendChild(label);
        container.appendChild(vizContainer);
        
        // Animate the progress ring
        setTimeout(() => {
            this.animateProgressRing(progressRing, data.percentage);
        }, 500);
        
        return vizContainer;
    }

    createProgressRing(percentage, color = '#ffffff') {
        const size = 80;
        const strokeWidth = 4;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'progress-ring');
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('class', 'progress-ring-circle');
        circle.setAttribute('cx', size / 2);
        circle.setAttribute('cy', size / 2);
        circle.setAttribute('r', radius);
        
        const progress = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        progress.setAttribute('class', 'progress-ring-progress');
        progress.setAttribute('cx', size / 2);
        progress.setAttribute('cy', size / 2);
        progress.setAttribute('r', radius);
        progress.setAttribute('stroke', color);
        progress.style.strokeDasharray = `0 ${circumference}`;
        
        svg.appendChild(circle);
        svg.appendChild(progress);
        
        return svg;
    }

    animateProgressRing(svg, percentage) {
        const progress = svg.querySelector('.progress-ring-progress');
        const radius = 36; // (80 - 4) / 2
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        
        progress.style.strokeDasharray = `${circumference} ${circumference}`;
        progress.style.strokeDashoffset = circumference;
        
        // Trigger animation
        requestAnimationFrame(() => {
            progress.style.strokeDashoffset = offset;
        });
    }

    // 🎭 REAL-TIME ACTIVITY UPDATES
    startRealTimeUpdates() {
        this.realTimeInterval = setInterval(() => {
            this.updateActivityIndicators();
            this.refreshRecommendations();
            this.updateProgressData();
        }, 30000); // Update every 30 seconds
        
        console.log('📡 Real-time updates started!');
    }

    updateActivityIndicators() {
        const liveIndicators = document.querySelectorAll('.live-indicator');
        liveIndicators.forEach(indicator => {
            // Simulate real-time data updates
            const randomActivity = Math.floor(Math.random() * 5) + 1;
            const activityText = this.generateActivityText(randomActivity);
            
            if (indicator.textContent !== activityText) {
                indicator.textContent = activityText;
                this.announceToScreenReader(`Activity update: ${activityText}`);
            }
        });
    }

    generateActivityText(activityType) {
        const activities = [
            '3 teammates just joined',
            'New document shared',
            '2 tasks completed',
            'Meeting starting soon',
            'Achievement unlocked!'
        ];
        return activities[activityType - 1] || 'Activity detected';
    }

    // 🎨 ENHANCED VISUAL EFFECTS
    initializeSpectacularEffects() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) {
            console.warn('Welcome section not found, creating default container');
            return;
        }

        // Add all the spectacular visual elements
        this.createParticleSystem(welcomeSection);
        this.createFloatingIcons(welcomeSection);
        this.createSparkles(welcomeSection);
        this.createAuroraEffect(welcomeSection);
        this.createConstellationPattern(welcomeSection);
        this.createWaveDistortion(welcomeSection);
        this.createMouseFollower(welcomeSection);
        this.createHolographicOverlay(welcomeSection);
        this.createEnergyRings(welcomeSection);
        this.createSmartRecommendationsUI(welcomeSection);
        this.createAIInsights(welcomeSection);
        this.createRealTimeIndicators(welcomeSection);
        
        console.log('🌟 All spectacular effects initialized!');
    }

    createSmartRecommendationsUI(container) {
        if (this.recommendations.length === 0) return;
        
        const recommendationsContainer = document.createElement('div');
        recommendationsContainer.className = 'smart-recommendations';
        recommendationsContainer.setAttribute('role', 'region');
        recommendationsContainer.setAttribute('aria-label', 'Smart recommendations based on your activity');
        
        const title = document.createElement('h3');
        title.textContent = '🤖 Smart Recommendations';
        title.style.marginBottom = 'var(--space-3)';
        title.style.fontSize = '1.125rem';
        title.style.fontWeight = '600';
        
        container.appendChild(title);
        
        this.recommendations.slice(0, 3).forEach((rec, index) => {
            const card = this.createRecommendationCard(rec, index);
            recommendationsContainer.appendChild(card);
        });
        
        container.appendChild(recommendationsContainer);
        console.log('🤖 Smart recommendations UI created!');
    }

    createRecommendationCard(recommendation, index) {
        const card = document.createElement('div');
        card.className = 'card card-glass recommendation-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Recommendation: ${recommendation.title}`);

        const icon = document.createElement('div');
        icon.className = 'icon-base icon-lg';
        icon.innerHTML = this.getIconSvg(recommendation.type);

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h4');
        title.className = 'card-title';
        title.textContent = recommendation.title;

        const description = document.createElement('p');
        description.className = 'card-subtitle';
        description.textContent = recommendation.description;

        content.appendChild(title);
        content.appendChild(description);
        card.appendChild(icon);
        card.appendChild(content);

        card.addEventListener('click', () => {
            this.executeRecommendation(recommendation, index);
        });
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.executeRecommendation(recommendation, index);
            }
        });
        
        return card;
    }

    createAIInsights(container) {
        const insights = document.createElement('div');
        insights.className = 'card card-glass ai-insight';
        insights.setAttribute('role', 'region');
        insights.setAttribute('aria-label', 'AI-powered insights');

        const icon = document.createElement('div');
        icon.className = 'icon-base icon-lg';
        icon.innerHTML = this.getIconSvg('ai');

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h4');
        title.className = 'card-title';
        title.textContent = 'AI Insights';

        content.appendChild(title);
        insights.appendChild(icon);
        insights.appendChild(content);

        container.appendChild(insights);
    }

    createRealTimeIndicators(container) {
        const indicators = document.createElement('div');
        indicators.className = 'card card-glass live-indicator';
        indicators.setAttribute('role', 'status');
        indicators.setAttribute('aria-label', 'Real-time activity indicators');

        const icon = document.createElement('div');
        icon.className = 'icon-base icon-lg';
        icon.innerHTML = this.getIconSvg('activity');

        const content = document.createElement('div');
        content.className = 'card-content';

        const title = document.createElement('h4');
        title.className = 'card-title';
        title.textContent = 'Live Activity';

        const dot = document.createElement('div');
        dot.className = 'live-dot';

        content.appendChild(title);
        indicators.appendChild(icon);
        indicators.appendChild(content);
        indicators.appendChild(dot);

        container.appendChild(indicators);
    }

    // 🎯 ACTION HANDLERS
    executeRecommendation(recommendation, index) {
        this.announceToScreenReader(`Executing recommendation: ${recommendation.title}`);
        console.log(`🎯 Executing recommendation: ${recommendation.title}`);
        
        // Trigger visual feedback
        this.createActionFeedback(recommendation.title);
        
        // Execute the action
        if (recommendation.action) {
            recommendation.action();
        }
        
        // Remove the executed recommendation
        this.recommendations.splice(index, 1);
        this.refreshRecommendationsUI();
    }

    createActionFeedback(actionName) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
        `;
        feedback.textContent = `✅ ${actionName}`;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 3000);
    }

    showStatDetails(statElement, index) {
        const statName = statElement.querySelector('.stat-label')?.textContent || 'Statistic';
        const statValue = statElement.querySelector('.stat-number')?.textContent || 'N/A';
        
        this.announceToScreenReader(`Showing details for ${statName}: ${statValue}`);
        console.log(`📊 Stat Details: ${statName} = ${statValue}`);
        
        // Create a visual popup or detailed view
        this.createStatPopup(statName, statValue, statElement);
    }

    createStatPopup(name, value, element) {
        const popup = document.createElement('div');
        popup.className = 'card card-glass';
        popup.style.position = 'absolute';
        popup.style.zIndex = '1000';

        const header = document.createElement('div');
        header.className = 'card-header';

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = name;

        const closeButton = document.createElement('button');
        closeButton.className = 'button button-secondary';
        closeButton.innerHTML = `<span class="icon-base">${this.getIconSvg('close')}</span>`;

        header.appendChild(title);
        header.appendChild(closeButton);

        const content = document.createElement('div');
        content.className = 'card-content';
        content.innerHTML = `
            <div class="stat-value">${value}</div>
            <div class="stat-chart"></div>
        `;

        popup.appendChild(header);
        popup.appendChild(content);

        // Position the popup
        const rect = element.getBoundingClientRect();
        popup.style.top = (rect.bottom + 10) + 'px';
        popup.style.left = rect.left + 'px';
        
        document.body.appendChild(popup);
        
        // Auto-close after 3 seconds or on click
        const closePopup = () => {
            if (popup.parentNode) {
                popup.style.animation = 'popupDisappear 0.3s ease forwards';
                setTimeout(() => {
                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                }, 300);
            }
        };
        
        setTimeout(closePopup, 3000);
        document.addEventListener('click', closePopup, { once: true });
    }

    // Include all the previous methods for particles, mouse tracking, etc.
    createParticleSystem(container) {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        container.appendChild(particlesContainer);

        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = `particle`;
            particlesContainer.appendChild(particle);
        }

        console.log('🎯 Enhanced particle system created!');
    }

    getIconSvg(type) {
        const icons = {
            'rocket': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>`,
            'star': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>`,
            'diamond': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>`,
            'sparkle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`,
            'magic': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                <circle cx="12" cy="12" r="10"></circle>
            </svg>`,
            'target': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>`,
            'art': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 3h18v18H3z"></path>
                <path d="M9 9h6v6H9z"></path>
                <path d="M3 9h6v6H3z"></path>
                <path d="M15 9h6v6h-6z"></path>
            </svg>`,
            'theater': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <path d="M8 8h8v8H8z"></path>
                <path d="M12 16v2"></path>
            </svg>`,
            'rainbow': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"></path>
                <path d="M12 6c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z"></path>
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
            </svg>`,
            'crystal': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
            'ai': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
            'activity': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
            </svg>`,
            'close': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            </svg>`
        };
        return icons[type] || icons['star'];
    }

    createFloatingIcons(container) {
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'floating-icons';
        container.appendChild(iconsContainer);

        for (let i = 0; i < 6; i++) {
            const icon = document.createElement('div');
            icon.className = 'floating-icon';
            icon.innerHTML = this.getIconSvg(this.floatingIcons[i % this.floatingIcons.length]);
            iconsContainer.appendChild(icon);
        }

        console.log('🌟 Floating icons created!');
    }

    createSparkles(container) {
        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'sparkles';
        container.appendChild(sparklesContainer);

        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 3 + 's';
            
            sparklesContainer.appendChild(sparkle);
        }

        console.log('✨ Sparkle particles created!');
    }

    createAuroraEffect(container) {
        const aurora = document.createElement('div');
        aurora.className = 'aurora-effect';
        container.appendChild(aurora);
        console.log('🌈 Aurora effect created!');
    }

    createConstellationPattern(container) {
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        container.appendChild(constellation);

        for (let i = 0; i < 4; i++) {
            const line = document.createElement('div');
            line.className = 'constellation-line';
            constellation.appendChild(line);
        }

        console.log('⭐ Constellation pattern created!');
    }

    createWaveDistortion(container) {
        const wave = document.createElement('div');
        wave.className = 'wave-distortion';
        container.appendChild(wave);
        console.log('🌊 Wave distortion effect created!');
    }

    createMouseFollower(container) {
        this.mouseFollower = document.createElement('div');
        this.mouseFollower.className = 'mouse-follower';
        container.appendChild(this.mouseFollower);
        console.log('🎯 Mouse follower created!');
    }

    createHolographicOverlay(container) {
        const hologram = document.createElement('div');
        hologram.className = 'holographic-overlay';
        container.appendChild(hologram);
        console.log('🔮 Holographic overlay created!');
    }

    createEnergyRings(container) {
        const ringsContainer = document.createElement('div');
        ringsContainer.className = 'energy-rings';
        container.appendChild(ringsContainer);

        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'energy-ring';
            ringsContainer.appendChild(ring);
        }

        console.log('🎯 Energy rings created!');
    }

    setupMouseTracking() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) return;

        welcomeSection.addEventListener('mousemove', (e) => {
            const rect = welcomeSection.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
            
            if (this.mouseFollower) {
                this.mouseFollower.style.left = this.mousePosition.x + 'px';
                this.mouseFollower.style.top = this.mousePosition.y + 'px';
            }
        });

        welcomeSection.addEventListener('mouseenter', () => {
            this.enhanceAnimationsOnHover();
        });

        welcomeSection.addEventListener('mouseleave', () => {
            this.resetAnimationsOnLeave();
        });

        console.log('🎯 Mouse tracking setup complete!');
    }

    enhanceAnimationsOnHover() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.setProperty('--animation-speed', '0.5s');
            this.createTemporarySparkles();
        }
    }

    resetAnimationsOnLeave() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.setProperty('--animation-speed', '1s');
        }
    }

    createTemporarySparkles() {
        const sparklesContainer = document.querySelector('.welcome-section .sparkles');
        if (!sparklesContainer) return;

        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle temporary';
            
            sparkle.style.top = (this.mousePosition.y + Math.random() * 100 - 50) + 'px';
            sparkle.style.left = (this.mousePosition.x + Math.random() * 100 - 50) + 'px';
            sparkle.style.animationDuration = '1s';
            
            sparklesContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateDynamicEffects();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
        console.log('🎭 Animation loop started!');
    }

    updateDynamicEffects() {
        this.updateParticleColors();
        this.updateSparkleIntensity();
    }

    updateParticleColors() {
        const currentTheme = localStorage.getItem('userColor') || '#6366f1';
        const particles = document.querySelectorAll('.welcome-section .particle');
        
        particles.forEach((particle, index) => {
            const hue = this.hexToHue(currentTheme) + (index * 30);
            particle.style.filter = `hue-rotate(${hue}deg)`;
        });
    }

    updateSparkleIntensity() {
        const intensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);
        const sparkles = document.querySelectorAll('.welcome-section .sparkle');
        
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = intensity;
        });
    }

    hexToHue(hex) {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        
        if (max !== min) {
            const d = max - min;
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return h * 360;
    }

    triggerSpectacularBurst() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) return;

        for (let i = 0; i < 50; i++) {
            this.createBurstSparkle(i);
        }

        console.log('💥 Spectacular burst triggered!');
    }

    createBurstSparkle(index) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle burst';
        sparkle.style.position = 'absolute';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.borderRadius = '50%';
        sparkle.style.background = `hsl(${index * 7}, 80%, 70%)`;
        sparkle.style.top = '50%';
        sparkle.style.left = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10';
        
        const angle = (index / 50) * Math.PI * 2;
        const distance = 100 + Math.random() * 200;
        const duration = 2000 + Math.random() * 1000;
        
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0
            },
            { 
                transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1)`,
                opacity: 1,
                offset: 0.3
            },
            { 
                transform: `translate(calc(-50% + ${targetX * 1.5}px), calc(-50% + ${targetY * 1.5}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        };
        
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.appendChild(sparkle);
        }
    }

    // Placeholder methods for recommendation actions
    scheduleDeepWork() {
        console.log('🎯 Scheduling deep work session...');
    }

    startTeamCheckIn() {
        console.log('👥 Starting team check-in...');
    }

    openLearningModule() {
        console.log('📚 Opening learning module...');
    }

    startWellnessBreak() {
        console.log('🧘 Starting wellness break...');
    }

    executeQuickAction(button, index) {
        const actionName = button.textContent.trim();
        this.announceToScreenReader(`Executing quick action: ${actionName}`);
        console.log(`⚡ Quick action: ${actionName}`);
        this.createActionFeedback(actionName);
    }

    showEventDetails(card, index) {
        const eventTitle = card.querySelector('.event-title')?.textContent || 'Event';
        this.announceToScreenReader(`Showing details for event: ${eventTitle}`);
        console.log(`📅 Event details: ${eventTitle}`);
    }

    refreshRecommendations() {
        this.generateSmartRecommendations();
        this.refreshRecommendationsUI();
    }

    refreshRecommendationsUI() {
        const existingContainer = document.querySelector('.smart-recommendations');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection && this.recommendations.length > 0) {
            this.createSmartRecommendationsUI(welcomeSection);
        }
    }

    updateProgressData() {
        // Simulate progress updates
        this.progressData = {
            projects: Math.floor(Math.random() * 20) + 80,
            goals: Math.floor(Math.random() * 15) + 75,
            learning: Math.floor(Math.random() * 25) + 60
        };
    }

    cleanup() {
        const tempSparkles = document.querySelectorAll('.sparkle.temporary');
        tempSparkles.forEach(sparkle => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        });
        
        console.log('🧹 Spectacular effects cleanup complete!');
    }

    // Add new method to refresh icons
    refreshIcons() {
        console.log('Refreshing icons...');
        
        // Check if SVG library is loaded
        if (!window.svgIconLibrary) {
            console.error('SVG library not loaded yet, retrying in 500ms...');
            setTimeout(() => this.refreshIcons(), 500);
            return;
        }

        const buttons = document.querySelectorAll('.welcome-section .btn');
        console.log('Found buttons:', buttons.length);
        
        buttons.forEach(button => {
            // Get the text content without the icon
            const buttonText = Array.from(button.childNodes)
                .filter(node => node.nodeType === Node.TEXT_NODE)
                .map(node => node.textContent.trim())
                .join('')
                .toLowerCase();
                
            console.log('Processing button:', buttonText);
            
            let iconName = '';
            switch (buttonText) {
                case 'new task':
                    iconName = 'plus';
                    break;
                case 'my tasks':
                    iconName = 'page-tasks';
                    break;
                case 'schedule':
                    iconName = 'schedule';
                    break;
                case 'documents':
                    iconName = 'documentation';
                    break;
                default:
                    console.log('Unknown button text:', buttonText);
                    iconName = 'default';
            }
            
            // Remove any existing icons
            const existingIcon = button.querySelector('.btn-icon');
            if (existingIcon) {
                console.log('Removing existing icon');
                existingIcon.remove();
            }
            
            // Create and add the icon
            console.log('Creating icon:', iconName);
            const iconElement = window.svgIconLibrary.createIconElement(iconName, 'btn-icon');
            
            // Insert icon before any text
            button.insertBefore(iconElement, button.firstChild);
            
            // Ensure icon is visible and properly styled
            iconElement.style.cssText = `
                display: inline-flex !important;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                margin-right: 8px;
                vertical-align: middle;
                color: currentColor;
                opacity: 1 !important;
                visibility: visible !important;
                position: relative !important;
                z-index: 2 !important;
            `;

            // Ensure the SVG inside is visible and properly sized
            const svg = iconElement.querySelector('svg');
            if (svg) {
                svg.style.cssText = `
                    width: 100% !important;
                    height: 100% !important;
                    display: block !important;
                    stroke: currentColor !important;
                    stroke-width: 2 !important;
                    fill: none !important;
                    opacity: 1 !important;
                    visibility: visible !important;
                `;
            } else {
                console.error('No SVG found in icon element');
            }
        });
    }
}

// Register the custom element
if (!customElements.get('spectacular-welcome-section')) {
    customElements.define('spectacular-welcome-section', SpectacularWelcomeSection);
    console.log('✅ spectacular-welcome-section custom element registered successfully!');
} else {
    console.log('⚠️ spectacular-welcome-section already registered, skipping');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Contest-Winning Welcome Section...');
    
    const spectacularWelcome = new SpectacularWelcomeSection();
    
    const checkAndInit = () => {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            spectacularWelcome.connectedCallback();
            console.log('✨ Contest-Winning Welcome Section initialized successfully!');
        } else {
            setTimeout(checkAndInit, 100);
        }
    };
    
    checkAndInit();
    
    // Add global access for triggering spectacular effects
    window.spectacularWelcome = spectacularWelcome;
});

// Add CSS animations for popups
const style = document.createElement('style');
style.textContent = `
    @keyframes popupAppear {
        from { opacity: 0; transform: translateY(-10px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    @keyframes popupDisappear {
        from { opacity: 1; transform: translateY(0) scale(1); }
        to { opacity: 0; transform: translateY(-10px) scale(0.95); }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🏆 Contest-Winning Welcome Section Component Loaded!'); 