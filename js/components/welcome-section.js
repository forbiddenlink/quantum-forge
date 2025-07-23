// 🏆 CONTEST-WINNING WELCOME SECTION - Enhanced with Accessibility & Creative Features
class SpectacularWelcomeSection extends HTMLElement {
    constructor() {
        super();
        this.mousePosition = { x: 0, y: 0 };
        this.particles = [];
        this.sparkles = [];
        this.animationFrame = null;
        this.isInitialized = false;
        this.floatingIcons = ['🚀', '⭐', '💎', '🌟', '✨', '🎯', '🎨', '🎭', '🌈', '🔮'];
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
        this.initializeSpectacularEffects();
        this.setupAccessibilityFeatures();
        this.generateSmartRecommendations();
        this.setupMouseTracking();
        this.setupKeyboardNavigation();
        this.startAnimationLoop();
        this.startRealTimeUpdates();
        this.isInitialized = true;
        console.log('✨ Contest-Winning Welcome Section Ready!');
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
        // Make stat items interactive
        const statItems = container.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Statistic: ${item.textContent.trim()}, click to see details`);
            
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showStatDetails(item, index);
                }
            });
            
            item.addEventListener('click', () => {
                this.showStatDetails(item, index);
            });
        });

        // Enhance quick action buttons
        const quickActions = container.querySelectorAll('.quick-actions .btn');
        quickActions.forEach((btn, index) => {
            btn.setAttribute('aria-label', `Quick action: ${btn.textContent.trim()}`);
            
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.executeQuickAction(btn, index);
                }
            });
        });

        // Enhance event cards
        const eventCards = container.querySelectorAll('.event-card');
        eventCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Event: ${card.textContent.trim()}, click to view details`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showEventDetails(card, index);
                }
            });
        });
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
        card.className = 'recommendation-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Recommendation: ${recommendation.title}. ${recommendation.description}. ${recommendation.reason}`);
        
        card.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: var(--space-3);">
                <div style="flex: 1;">
                    <h4 style="margin: 0 0 var(--space-1) 0; font-weight: 600; font-size: 0.875rem;">
                        ${recommendation.title}
                    </h4>
                    <p style="margin: 0 0 var(--space-2) 0; font-size: 0.75rem; opacity: 0.9;">
                        ${recommendation.description}
                    </p>
                    <span style="font-size: 0.625rem; opacity: 0.7; font-style: italic;">
                        ${recommendation.reason}
                    </span>
                </div>
                <div class="priority-indicator ${recommendation.priority}" style="
                    width: 12px; 
                    height: 12px; 
                    border-radius: 50%; 
                    background: ${recommendation.priority === 'high' ? '#ef4444' : recommendation.priority === 'medium' ? '#f59e0b' : '#6b7280'};
                    flex-shrink: 0;
                "></div>
            </div>
        `;
        
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
        const insights = [
            '🎯 Your productivity peaks at 10 AM',
            '📈 Project Alpha is 78% complete',
            '🏆 You\'re on track to exceed monthly goals',
            '⚡ 4 quick wins available in your backlog'
        ];
        
        const insightsContainer = document.createElement('div');
        insightsContainer.style.marginTop = 'var(--space-4)';
        
        insights.forEach(insight => {
            const insightElement = document.createElement('div');
            insightElement.className = 'ai-insight';
            insightElement.textContent = insight;
            insightElement.setAttribute('role', 'status');
            insightElement.setAttribute('aria-label', `AI insight: ${insight}`);
            insightsContainer.appendChild(insightElement);
        });
        
        container.appendChild(insightsContainer);
        console.log('🤖 AI insights created!');
    }

    createRealTimeIndicators(container) {
        const indicators = [
            'Team Activity',
            'System Status',
            'Project Updates'
        ];
        
        indicators.forEach(indicator => {
            const element = document.createElement('div');
            element.className = 'live-indicator';
            element.innerHTML = `
                <div class="live-dot"></div>
                <span>${indicator}</span>
            `;
            element.setAttribute('role', 'status');
            element.setAttribute('aria-label', `Live indicator for ${indicator}`);
            element.style.margin = 'var(--space-2) var(--space-3)';
            container.appendChild(element);
        });
        
        console.log('📡 Real-time indicators created!');
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
        // Remove any existing popup
        const existingPopup = document.querySelector('.stat-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        const popup = document.createElement('div');
        popup.className = 'stat-popup';
        popup.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            font-size: 0.875rem;
            z-index: 1000;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: popupAppear 0.3s ease;
        `;
        
        popup.innerHTML = `
            <div style="font-weight: 600; margin-bottom: 8px;">${name}</div>
            <div style="font-size: 1.5rem; font-weight: 900; color: #10b981; margin-bottom: 8px;">${value}</div>
            <div style="font-size: 0.75rem; opacity: 0.8;">Click anywhere to close</div>
        `;
        
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

    createFloatingIcons(container) {
        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'floating-icons';
        container.appendChild(iconsContainer);

        for (let i = 0; i < 6; i++) {
            const icon = document.createElement('div');
            icon.className = 'floating-icon';
            icon.textContent = this.floatingIcons[i % this.floatingIcons.length];
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
}

// Register the custom element
customElements.define('spectacular-welcome-section', SpectacularWelcomeSection);

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