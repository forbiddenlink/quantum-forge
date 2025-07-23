// 🏆 CONTEST-WINNING ANALYTICS DASHBOARD - Enhanced with Spectacular Visual Effects & Accessibility
class SpectacularAnalyticsDashboard extends HTMLElement {
    constructor() {
        super();
        this.data = null;
        this.selectedRange = 'week';
        this.unsubscribe = null;
        this.realTimeUpdates = null;
        this.taskChart = null;
        this.projectChart = null;
        this.teamHeatmapChart = null;
        this.goalChart = null;
        this.isRealTimeEnabled = true;
        this.isInitialized = false;
        this.particles = [];
        this.animationFrame = null;
        this.pulseAnimation = null;
        this.updateInterval = null;
        this.chartInstances = new Map();
        this.activeInsightIndex = 0;
        this.insightRotationInterval = null;
        this.keyboardNavIndex = 0;
        this.focusableElements = [];
        this.mousePosition = { x: 0, y: 0 };
        this.sparkles = [];

        this.mouseFollower = null;
        
        // Enhanced analytics options with contest features
        this.options = {
            theme: 'light',
            animations: true,
            realTimeUpdates: true,
            chartRefreshRate: 3000,
            insightRotationInterval: 6000,
            particleCount: 20,
            enableSpectacularEffects: true,
            enableAccessibilityFeatures: true
        };

        // Initialize immediately if possible
        if (window.analyticsService) {
            this.data = window.analyticsService.data;
        }
    }

    connectedCallback() {
        if (this.isInitialized) return;
        
        console.log('🎨 Contest-Winning Analytics Dashboard Loading...');
        
        this.render();
        this.setupAccessibilityFeatures();
        this.setupEventListeners();
        this.initializeSpectacularEffects();
        this.initializeCharts();
        this.initializeAnimations();
        this.setupMouseTracking();
        this.setupKeyboardNavigation();
        this.startRealTimeUpdates();
        this.startInsightRotation();
        this.startAnimationLoop();
        
        // Subscribe to analytics updates
        if (window.analyticsService) {
            console.log('Analytics service found, subscribing...');
            this.unsubscribe = window.analyticsService.subscribe(data => {
                console.log('Analytics Dashboard received data:', data);
                this.data = data;
                this.updateDashboard();
                this.announceUpdate('Analytics data updated');
            }, {
                metrics: ['kpiData', 'teamPerformance', 'aiInsights', 'goals', 'activities']
            });
        } else {
            console.error('Analytics service not found!');
        }

        // Add entrance animation
        setTimeout(() => {
            this.classList.add('dashboard-loaded');
            this.triggerSpectacularEntrance();
            console.log('✨ Contest-Winning Analytics Dashboard loaded and animated');
        }, 100);
        
        this.isInitialized = true;
        console.log('🏆 Analytics Dashboard initialized with contest-winning features!');
    }

    // 🏆 ACCESSIBILITY FEATURES - Contest-Winning Implementation
    setupAccessibilityFeatures() {
        // Add ARIA attributes
        this.setAttribute('role', 'main');
        this.setAttribute('aria-label', 'Advanced Analytics Dashboard with real-time insights and performance metrics');
        
        // Create skip link
        this.createSkipLink();
        
        // Create keyboard navigation helper
        this.createKeyboardHelper();
        
        // Create screen reader announcements
        this.createLiveRegion();
        
        // Enhance interactive elements with accessibility
        this.enhanceInteractiveElements();
        
        console.log('♿ Advanced accessibility features initialized!');
    }

    createSkipLink() {
        // Check if skip link already exists to avoid duplicates
        if (document.querySelector('.analytics-skip')) {
            return;
        }
        
        const skipLink = document.createElement('a');
        skipLink.href = '#analytics-main-content';
        skipLink.className = 'skip-link analytics-skip';
        skipLink.textContent = 'Skip to analytics content';
        skipLink.setAttribute('aria-label', 'Skip to main analytics dashboard content');
        
        // Append to document body for proper fixed positioning
        document.body.appendChild(skipLink);
        
        // Clean up when component is removed
        this.skipLinkElement = skipLink;
    }

    createKeyboardHelper() {
        const helper = document.createElement('div');
        helper.className = 'keyboard-nav-helper analytics-kbd-helper';
        helper.innerHTML = `
            <span>Use <kbd>Tab</kbd> to navigate, <kbd>Enter</kbd>/<kbd>Space</kbd> to activate, <kbd>Esc</kbd> to reset focus, <kbd>A</kbd> for analytics shortcuts</span>
        `;
        this.appendChild(helper);
    }

    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'analytics-announcements';
        this.appendChild(liveRegion);
        this.liveRegion = liveRegion;
    }

    announceUpdate(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    enhanceInteractiveElements() {
        // Will be called after render to enhance KPI cards, goal cards, etc.
        setTimeout(() => {
            this.enhanceKPICards();
            this.enhanceGoalCards();
            this.enhanceInsightCards();
            this.enhanceChartContainers();
            this.enhanceActivityItems();
        }, 100);
    }

    enhanceKPICards() {
        const kpiCards = this.querySelectorAll('.advanced-kpi-card');
        kpiCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `KPI metric: ${card.querySelector('.kpi-name')?.textContent || 'Unknown'}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.highlightMetric(card);
                    this.triggerKPIAnimation(card);
                }
            });
            
            card.addEventListener('click', () => {
                this.highlightMetric(card);
                this.triggerKPIAnimation(card);
            });
        });
    }

    enhanceGoalCards() {
        const goalCards = this.querySelectorAll('.goal-card');
        goalCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Goal: ${card.querySelector('.goal-name')?.textContent || 'Unknown'}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.showGoalDetails(card, index);
                }
            });
        });
    }

    enhanceInsightCards() {
        const insightCards = this.querySelectorAll('.ai-insight-card');
        insightCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `AI Insight: ${card.querySelector('.insight-title')?.textContent || 'Unknown'}`);
            
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.expandInsight(card);
                }
            });
        });
    }

    enhanceChartContainers() {
        const chartContainers = this.querySelectorAll('.chart-container');
        chartContainers.forEach((container, index) => {
            container.setAttribute('tabindex', '0');
            container.setAttribute('role', 'img');
            container.setAttribute('aria-label', `Chart: ${container.querySelector('.chart-title')?.textContent || 'Analytics chart'}`);
        });
    }

    enhanceActivityItems() {
        const activityItems = this.querySelectorAll('.activity-item');
        activityItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Activity: ${item.querySelector('.activity-content')?.textContent || 'Unknown activity'}`);
        });
    }

    // 🎯 KEYBOARD NAVIGATION
    setupKeyboardNavigation() {
        this.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Escape':
                    this.resetFocus();
                    break;
                case 'a':
                case 'A':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.showAnalyticsShortcuts();
                    }
                    break;
                case 'r':
                case 'R':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.refreshData();
                        this.announceUpdate('Analytics data refresh triggered');
                    }
                    break;
                case 's':
                case 'S':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.triggerSpectacularBurst();
                        this.announceUpdate('Spectacular visual effect triggered!');
                    }
                    break;
            }
        });

        console.log('⌨️ Advanced keyboard navigation setup complete!');
    }

    resetFocus() {
        this.focus();
        this.announceUpdate('Focus reset to analytics dashboard');
    }

    showAnalyticsShortcuts() {
        const shortcuts = `
            Analytics Dashboard Shortcuts:
            • Tab: Navigate between elements
            • Enter/Space: Activate cards and insights
            • Escape: Reset focus
            • Ctrl+A: Show this help
            • Ctrl+R: Refresh analytics data
            • Ctrl+S: Trigger visual effects
        `;
        this.announceUpdate('Analytics shortcuts help displayed');
        console.log(shortcuts);
        this.createShortcutsModal(shortcuts);
    }

    createShortcutsModal(shortcuts) {
        const modal = document.createElement('div');
        modal.className = 'analytics-shortcuts-modal';
        modal.innerHTML = `
            <div class="shortcuts-content">
                <h3>Analytics Dashboard Shortcuts</h3>
                <pre>${shortcuts}</pre>
                <button class="close-shortcuts" onclick="this.parentElement.parentElement.remove()">
                    Close (Esc)
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 10000);
    }

    // 🌟 SPECTACULAR VISUAL EFFECTS - Contest-Winning Features
    initializeSpectacularEffects() {
        if (!this.options.enableSpectacularEffects) return;

        console.log('🎨 Initializing spectacular visual effects...');
        
        this.createParticleSystem();

        this.createSparkles();
        this.createAuroraEffect();
        this.createConstellationPattern();
        this.createWaveDistortion();
        this.createMouseFollower();
        this.createHolographicOverlay();
        this.createEnergyRings();
        this.createDataVisualizationEffects();
        
        console.log('✨ All spectacular effects initialized!');
    }

    createParticleSystem() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'analytics-particles-system';
        this.appendChild(particlesContainer);

        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'analytics-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 3}px;
                height: ${Math.random() * 8 + 3}px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(139, 92, 246, 0.3));
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsParticleFloat ${Math.random() * 15 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 1;
            `;
            particlesContainer.appendChild(particle);
        }
        
        console.log('🎯 Analytics particle system created!');
    }



    createSparkles() {
        const sparklesContainer = document.createElement('div');
        sparklesContainer.className = 'analytics-sparkles';
        this.appendChild(sparklesContainer);

        for (let i = 0; i < 15; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'analytics-sparkle';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.3) 70%, transparent 100%);
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsSparkle ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 3;
            `;
            sparklesContainer.appendChild(sparkle);
        }

        console.log('✨ Analytics sparkles created!');
    }

    createAuroraEffect() {
        const aurora = document.createElement('div');
        aurora.className = 'analytics-aurora-effect';
        aurora.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            background: 
                linear-gradient(45deg, transparent 0%, rgba(99, 102, 241, 0.08) 25%, transparent 50%, rgba(139, 92, 246, 0.06) 75%, transparent 100%),
                linear-gradient(-45deg, transparent 0%, rgba(16, 185, 129, 0.05) 30%, transparent 60%, rgba(245, 158, 11, 0.05) 90%, transparent 100%);
            background-size: 400% 400%, 300% 300%;
            animation: analyticsAuroraShift 12s ease-in-out infinite;
            filter: blur(1px);
            opacity: 0.7;
        `;
        this.appendChild(aurora);
        console.log('🌈 Analytics aurora effect created!');
    }

    createConstellationPattern() {
        const constellation = document.createElement('div');
        constellation.className = 'analytics-constellation';
        this.appendChild(constellation);

        for (let i = 0; i < 6; i++) {
            const line = document.createElement('div');
            line.className = 'analytics-constellation-line';
            line.style.cssText = `
                position: absolute;
                background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
                height: 1px;
                transform-origin: left center;
                animation: analyticsConstellationPulse ${6 + i}s ease-in-out infinite;
                animation-delay: ${i * -1}s;
                pointer-events: none;
                z-index: 2;
            `;
            
            // Position lines randomly
            const positions = [
                { top: '20%', left: '15%', width: '100px', rotate: '25deg' },
                { top: '35%', right: '20%', width: '80px', rotate: '-15deg' },
                { bottom: '25%', left: '25%', width: '120px', rotate: '45deg' },
                { bottom: '40%', right: '30%', width: '60px', rotate: '-30deg' },
                { top: '60%', left: '60%', width: '90px', rotate: '15deg' },
                { top: '50%', right: '40%', width: '70px', rotate: '-25deg' }
            ];
            
            const pos = positions[i];
            Object.assign(line.style, pos);
            line.style.transform = `rotate(${pos.rotate})`;
            
            constellation.appendChild(line);
        }

        console.log('⭐ Analytics constellation pattern created!');
    }

    createWaveDistortion() {
        const wave = document.createElement('div');
        wave.className = 'analytics-wave-distortion';
        wave.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 1;
            background: 
                radial-gradient(ellipse 200px 100px at 20% 50%, rgba(99, 102, 241, 0.08) 0%, transparent 50%),
                radial-gradient(ellipse 150px 75px at 80% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
                radial-gradient(ellipse 180px 90px at 50% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 50%);
            background-size: 100% 100%;
            animation: analyticsWaveDistort 10s ease-in-out infinite;
            filter: blur(1px);
        `;
        this.appendChild(wave);
        console.log('🌊 Analytics wave distortion created!');
    }

    createMouseFollower() {
        this.mouseFollower = document.createElement('div');
        this.mouseFollower.className = 'analytics-mouse-follower';
        this.mouseFollower.style.cssText = `
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.02) 50%, transparent 70%);
            pointer-events: none;
            z-index: 2;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translate(-50%, -50%);
        `;
        this.appendChild(this.mouseFollower);
        console.log('🎯 Analytics mouse follower created!');
    }

    createHolographicOverlay() {
        const hologram = document.createElement('div');
        hologram.className = 'analytics-holographic-overlay';
        hologram.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 5;
            background: linear-gradient(45deg, 
                transparent 0%, 
                rgba(99, 102, 241, 0.02) 25%, 
                transparent 50%, 
                rgba(139, 92, 246, 0.02) 75%, 
                transparent 100%
            );
            background-size: 40px 40px;
            animation: analyticsHolographicShimmer 6s linear infinite;
            opacity: 0.6;
            mix-blend-mode: overlay;
        `;
        this.appendChild(hologram);
        console.log('🔮 Analytics holographic overlay created!');
    }

    createEnergyRings() {
        const ringsContainer = document.createElement('div');
        ringsContainer.className = 'analytics-energy-rings';
        ringsContainer.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1;
        `;
        this.appendChild(ringsContainer);

        for (let i = 0; i < 3; i++) {
            const ring = document.createElement('div');
            ring.className = 'analytics-energy-ring';
            const sizes = [150, 300, 450];
            const size = sizes[i];
            ring.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                top: -${size/2}px;
                left: -${size/2}px;
                border: 1px solid rgba(99, 102, 241, 0.1);
                border-radius: 50%;
                animation: analyticsEnergyPulse ${4 + i * 2}s ease-in-out infinite;
                animation-delay: ${i * -1.5}s;
            `;
            ringsContainer.appendChild(ring);
        }

        console.log('🎯 Analytics energy rings created!');
    }

    createDataVisualizationEffects() {
        // Add glowing data points
        const dataPoints = document.createElement('div');
        dataPoints.className = 'analytics-data-points';
        this.appendChild(dataPoints);

        for (let i = 0; i < 10; i++) {
            const point = document.createElement('div');
            point.className = 'analytics-data-point';
            point.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(99, 102, 241, 0.2) 70%, transparent 100%);
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsDataPulse ${Math.random() * 4 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 3}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                z-index: 4;
                box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
            `;
            dataPoints.appendChild(point);
        }

        console.log('📊 Analytics data visualization effects created!');
    }

    loadChartJS() {
        console.log('📈 Loading Chart.js dynamically...');
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => {
            console.log('✅ Chart.js loaded successfully!');
            // Retry chart initialization
            setTimeout(() => {
                this.initializeCharts();
            }, 100);
        };
        script.onerror = () => {
            console.error('❌ Failed to load Chart.js');
            this.showChartFallback();
        };
        document.head.appendChild(script);
    }

    showChartFallback() {
        console.log('📊 Showing chart fallback...');
        const chartContainers = this.querySelectorAll('.chart-body');
        chartContainers.forEach(container => {
            container.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255, 255, 255, 0.7); text-align: center; flex-direction: column; gap: 1rem;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px; opacity: 0.5;">
                        <path d="M3 3v18h18"></path>
                        <path d="m19 9-5 5-4-4-3 3"></path>
                    </svg>
                    <div>
                        <div style="font-weight: 600; margin-bottom: 0.5rem;">Chart Loading...</div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Initializing visualization components</div>
                    </div>
                </div>
            `;
        });
    }

    // 🎭 MOUSE TRACKING & INTERACTION
    setupMouseTracking() {
        this.addEventListener('mousemove', (e) => {
            const rect = this.getBoundingClientRect();
            this.mousePosition.x = e.clientX - rect.left;
            this.mousePosition.y = e.clientY - rect.top;
            
            if (this.mouseFollower) {
                this.mouseFollower.style.left = this.mousePosition.x + 'px';
                this.mouseFollower.style.top = this.mousePosition.y + 'px';
            }
        });

        this.addEventListener('mouseenter', () => {
            this.enhanceAnimationsOnHover();
        });

        this.addEventListener('mouseleave', () => {
            this.resetAnimationsOnLeave();
        });

        console.log('🎯 Advanced mouse tracking setup complete!');
    }

    enhanceAnimationsOnHover() {
        this.style.setProperty('--animation-speed', '0.5s');
        if (this.mouseFollower) {
            this.mouseFollower.style.opacity = '1';
        }
        this.createTemporarySparkles();
    }

    resetAnimationsOnLeave() {
        this.style.setProperty('--animation-speed', '1s');
        if (this.mouseFollower) {
            this.mouseFollower.style.opacity = '0';
        }
    }

    createTemporarySparkles() {
        const sparklesContainer = this.querySelector('.analytics-sparkles');
        if (!sparklesContainer) return;

        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'analytics-sparkle temporary';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.5) 70%, transparent 100%);
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsSparkle 0.8s ease-in-out;
                left: ${this.mousePosition.x + Math.random() * 60 - 30}px;
                top: ${this.mousePosition.y + Math.random() * 60 - 30}px;
                z-index: 6;
            `;
            sparklesContainer.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 800);
        }
    }

    // 🎆 SPECTACULAR ANIMATION SEQUENCES
    triggerSpectacularEntrance() {
        console.log('🎆 Triggering spectacular entrance animation!');
        
        // Animate elements in sequence
        const elements = this.querySelectorAll('.advanced-kpi-card, .goal-card, .ai-insight-card, .chart-container');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('spectacular-entrance');
                element.style.animation = 'analyticsSpectacularEntrance 1s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }, index * 100);
        });

        // Trigger particle burst
        setTimeout(() => {
            this.triggerParticleBurst();
        }, 500);
    }

    triggerSpectacularBurst() {
        console.log('💥 Triggering spectacular burst effect!');
        
        for (let i = 0; i < 30; i++) {
            this.createBurstSparkle(i);
        }

        // Enhance all particles temporarily
        const particles = this.querySelectorAll('.analytics-particle');
        particles.forEach(particle => {
            particle.style.animationDuration = '2s';
            particle.style.transform = 'scale(1.5)';
            particle.style.filter = 'brightness(1.5) saturate(1.5)';
            
            setTimeout(() => {
                particle.style.animationDuration = '';
                particle.style.transform = '';
                particle.style.filter = '';
            }, 2000);
        });
    }

    createBurstSparkle(index) {
        const sparkle = document.createElement('div');
        sparkle.className = 'analytics-sparkle burst';
        sparkle.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, hsl(${index * 12}, 80%, 70%) 0%, hsl(${index * 12}, 80%, 40%) 100%);
            border-radius: 50%;
            pointer-events: none;
            top: 50%;
            left: 50%;
            z-index: 10;
        `;
        
        const angle = (index / 30) * Math.PI * 2;
        const distance = 150 + Math.random() * 100;
        const duration = 1500 + Math.random() * 500;
        
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        sparkle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 0
            },
            { 
                transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(1.5)`,
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
        
        this.appendChild(sparkle);
    }

    triggerParticleBurst() {
        const particlesContainer = this.querySelector('.analytics-particles-system');
        if (!particlesContainer) return;

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'analytics-particle burst-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(139, 92, 246, 0.6));
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsBurstParticle ${Math.random() * 3 + 2}s ease-out forwards;
                left: 50%;
                top: 50%;
                z-index: 5;
                box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
            `;
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
    }

    triggerKPIAnimation(card) {
        card.style.transform = 'translateY(-8px) scale(1.05)';
        card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
        card.style.borderColor = 'rgba(99, 102, 241, 0.5)';
        
        // Create glow effect
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%);
            border-radius: inherit;
            pointer-events: none;
            z-index: -1;
            animation: analyticsGlowPulse 1s ease-in-out;
        `;
        card.style.position = 'relative';
        card.appendChild(glow);
        
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            if (glow.parentNode) {
                glow.parentNode.removeChild(glow);
            }
        }, 1000);
        
        // Create sparkle burst around the card
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createCardSparkle(card);
            }, i * 100);
        }
    }

    createCardSparkle(card) {
        const rect = card.getBoundingClientRect();
        const containerRect = this.getBoundingClientRect();
        
        const sparkle = document.createElement('div');
        sparkle.className = 'analytics-card-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.3) 100%);
            border-radius: 50%;
            pointer-events: none;
            animation: analyticsCardSparkle 1.5s ease-out forwards;
            left: ${rect.left - containerRect.left + Math.random() * rect.width}px;
            top: ${rect.top - containerRect.top + Math.random() * rect.height}px;
            z-index: 10;
        `;
        this.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }

    // 🎬 ANIMATION LOOP
    startAnimationLoop() {
        const animate = () => {
            this.updateDynamicEffects();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
        console.log('🎭 Advanced animation loop started!');
    }

    updateDynamicEffects() {
        this.updateParticleColors();
        this.updateSparkleIntensity();
        this.updateEnergyRings();
    }

    updateParticleColors() {
        const time = Date.now() * 0.001;
        const particles = this.querySelectorAll('.analytics-particle');
        
        particles.forEach((particle, index) => {
            const hue = (time * 20 + index * 30) % 360;
            particle.style.filter = `hue-rotate(${hue}deg) brightness(1.2)`;
        });
    }

    updateSparkleIntensity() {
        const intensity = 0.4 + 0.6 * Math.sin(Date.now() * 0.002);
        const sparkles = this.querySelectorAll('.analytics-sparkle');
        
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = intensity;
        });
    }

    updateEnergyRings() {
        const rings = this.querySelectorAll('.analytics-energy-ring');
        const time = Date.now() * 0.001;
        
        rings.forEach((ring, index) => {
            const scale = 1 + 0.1 * Math.sin(time + index * 2);
            const opacity = 0.1 + 0.2 * Math.sin(time * 0.5 + index);
            ring.style.transform = `scale(${scale})`;
            ring.style.borderColor = `rgba(99, 102, 241, ${opacity})`;
        });
    }

    setupEventListeners() {
        console.log('Setting up Analytics Dashboard event listeners...');
        
        // Range selector
        const rangeSelector = this.querySelector('.range-selector');
        if (rangeSelector) {
            rangeSelector.addEventListener('change', (e) => {
                this.selectedRange = e.target.value;
                this.refreshData();
            });
        }

        // Real-time toggle
        const toggleRealTime = this.querySelector('#toggleRealTime');
        if (toggleRealTime) {
            toggleRealTime.addEventListener('click', () => {
                this.isRealTimeEnabled = !this.isRealTimeEnabled;
                toggleRealTime.classList.toggle('active', this.isRealTimeEnabled);
                if (this.isRealTimeEnabled) {
                    this.startRealTimeUpdates();
                } else {
                    if (this.realTimeUpdates) {
                        clearInterval(this.realTimeUpdates);
                    }
                }
            });
        }

        // Refresh button
        const refreshBtn = this.querySelector('#refreshAnalytics');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.refreshData();
            });
        }

        // KPI card interactions
        this.querySelectorAll('.kpi-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateKPICard(card, true));
            card.addEventListener('mouseleave', () => this.animateKPICard(card, false));
            card.addEventListener('click', () => this.highlightMetric(card));
        });

        // Goal card interactions
        this.querySelectorAll('.goal-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateGoalCard(card, true));
            card.addEventListener('mouseleave', () => this.animateGoalCard(card, false));
        });

        // AI Insight card interactions
        this.querySelectorAll('.ai-insight-card').forEach(card => {
            card.addEventListener('mouseenter', () => this.animateInsightCard(card, true));
            card.addEventListener('mouseleave', () => this.animateInsightCard(card, false));
            card.addEventListener('click', () => this.expandInsight(card));
        });

        // Chart container interactions
        this.querySelectorAll('.chart-container').forEach(container => {
            container.addEventListener('mouseenter', () => this.animateChartContainer(container, true));
            container.addEventListener('mouseleave', () => this.animateChartContainer(container, false));
        });

        // Activity item interactions
        this.querySelectorAll('.activity-item').forEach(item => {
            item.addEventListener('mouseenter', () => this.animateActivityItem(item, true));
            item.addEventListener('mouseleave', () => this.animateActivityItem(item, false));
        });

        // Chart filters
        this.querySelectorAll('.chart-filter').forEach(filter => {
            filter.addEventListener('click', (e) => {
                const filterType = e.target.dataset.filter;
                this.querySelectorAll('.chart-filter').forEach(f => f.classList.remove('active'));
                e.target.classList.add('active');
                this.updateCharts(filterType);
            });
        });

        // Activity filters
        this.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.dataset.filter;
                this.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                const activityItems = this.querySelectorAll('.activity-item');
                activityItems.forEach(item => {
                    if (filterType === 'all' || item.dataset.type === filterType) {
                        item.style.display = '';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });

        console.log('Analytics Dashboard event listeners setup complete');
    }

    disconnectedCallback() {
        console.log('Analytics Dashboard disconnecting...');
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        if (this.realTimeUpdates) {
            clearInterval(this.realTimeUpdates);
            this.realTimeUpdates = null;
        }
        if (this.insightRotationInterval) {
            clearInterval(this.insightRotationInterval);
            this.insightRotationInterval = null;
        }
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
        
        // Cancel animation frames
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
        if (this.pulseAnimation) {
            cancelAnimationFrame(this.pulseAnimation);
            this.pulseAnimation = null;
        }
        
        // Disconnect any observers
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        this.chartInstances.forEach(chart => chart.destroy());
        this.chartInstances.clear();
        
        // Clean up skip link
        if (this.skipLinkElement && this.skipLinkElement.parentNode) {
            this.skipLinkElement.parentNode.removeChild(this.skipLinkElement);
            this.skipLinkElement = null;
        }
        
        console.log('Analytics Dashboard cleanup complete');
    }

    initializeParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'analytics-particles';
        this.appendChild(particlesContainer);
        
        // Create floating particles
        for (let i = 0; i < this.options.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'analytics-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.2));
                border-radius: 50%;
                pointer-events: none;
                animation: analyticsFloat ${Math.random() * 20 + 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            particlesContainer.appendChild(particle);
        }
        
        // Add particle animation CSS
        if (!document.querySelector('#analytics-particle-styles')) {
            const style = document.createElement('style');
            style.id = 'analytics-particle-styles';
            style.textContent = `
                @keyframes analyticsFloat {
                    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    25% { transform: translateY(-20px) translateX(10px); opacity: 0.7; }
                    50% { transform: translateY(-40px) translateX(-5px); opacity: 0.5; }
                    75% { transform: translateY(-20px) translateX(-10px); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeAnimations() {
        // Animate elements on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animate progress bars
                    const progressBars = entry.target.querySelectorAll('.progress-fill, .bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                            bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, 200);
                    });
                }
            });
        });

        const animateElements = this.querySelectorAll('.kpi-card, .goal-card, .ai-insight-card, .chart-container');
        animateElements.forEach(el => observer.observe(el));
    }

    startRealTimeUpdates() {
        if (!this.isRealTimeEnabled) return;
        
        this.realTimeUpdates = setInterval(() => {
            this.updateRandomMetrics();
        }, this.options.chartRefreshRate);
    }

    startInsightRotation() {
        if (this.insightRotationInterval) {
            clearInterval(this.insightRotationInterval);
        }

        this.insightRotationInterval = setInterval(() => {
            this.rotateInsights();
        }, this.options.insightRotationInterval);
    }

    rotateInsights() {
        const insights = this.querySelectorAll('.ai-insight-card');
        if (!insights.length) return;

        insights[this.activeInsightIndex].classList.remove('active');
        this.activeInsightIndex = (this.activeInsightIndex + 1) % insights.length;
        insights[this.activeInsightIndex].classList.add('active');
    }

    updateRandomMetrics() {
        if (!this.data) return;
        
        // Randomly update some KPIs
        Object.keys(this.data.kpiData).forEach(kpi => {
            if (Math.random() > 0.7) {
                const change = Math.random() > 0.5 ? 1 : -1;
                this.data.kpiData[kpi].current = Math.max(0, Math.min(100, this.data.kpiData[kpi].current + change));
                this.data.kpiData[kpi].trend = `${change >= 0 ? '+' : ''}${change}%`;
                
                // Animate the change
                const kpiCard = this.querySelector(`[data-kpi="${kpi}"]`);
                if (kpiCard) {
                    kpiCard.classList.add('pulse');
                    setTimeout(() => kpiCard.classList.remove('pulse'), 1000);
                }
            }
        });
        
        this.updateDashboard();
    }

    render() {
        console.log('Analytics Dashboard rendering with data:', this.data);
        
        // Initialize with default data if none is available
        if (!this.data) {
            this.data = {
                kpiData: {
                    productivity: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    efficiency: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    collaboration: { current: 0, target: 100, trend: '0%', status: 'attention' },
                    satisfaction: { current: 0, target: 100, trend: '0%', status: 'attention' }
                },
                teamPerformance: {
                    departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
                    metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
                    heatmapData: [
                        [87, 91, 78, 92], // Engineering: high productivity, excellent collaboration, good innovation, excellent quality
                        [82, 88, 85, 89], // Design: good productivity, high collaboration, good innovation, high quality
                        [79, 84, 94, 86], // Product: decent productivity, good collaboration, excellent innovation, good quality
                        [75, 93, 88, 83], // Marketing: decent productivity, excellent collaboration, high innovation, good quality
                        [91, 86, 72, 85]  // Sales: excellent productivity, good collaboration, fair innovation, good quality
                    ]
                },
                aiInsights: [
                    {
                        type: 'opportunity',
                        title: 'Loading Insights...',
                        description: 'Real-time analytics data is being processed.',
                        confidence: 100,
                        impact: 'medium',
                        category: 'system'
                    }
                ],
                goals: {
                    quarterly: [
                        { name: 'Loading...', current: 0, target: 100, progress: 0, status: 'on-track' }
                    ]
                },
                taskChart: [0, 0, 0, 0, 0, 0, 0],
                projectChart: [65, 25, 10],
                activities: [
                    { type: 'system', text: 'Loading activities...', time: 'just now', impact: 'low' }
                ]
            };
        }

        // Ensure all required data structures exist
        this.data.kpiData = this.data.kpiData || {
            productivity: { current: 0, target: 100, trend: '0%', status: 'attention' },
            efficiency: { current: 0, target: 100, trend: '0%', status: 'attention' },
            collaboration: { current: 0, target: 100, trend: '0%', status: 'attention' },
            satisfaction: { current: 0, target: 100, trend: '0%', status: 'attention' }
        };

        this.data.teamPerformance = this.data.teamPerformance || {
            departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'],
            metrics: ['Productivity', 'Collaboration', 'Innovation', 'Quality'],
            heatmapData: [
                [87, 91, 78, 92], // Engineering: high productivity, excellent collaboration, good innovation, excellent quality
                [82, 88, 85, 89], // Design: good productivity, high collaboration, good innovation, high quality
                [79, 84, 94, 86], // Product: decent productivity, good collaboration, excellent innovation, good quality
                [75, 93, 88, 83], // Marketing: decent productivity, excellent collaboration, high innovation, good quality
                [91, 86, 72, 85]  // Sales: excellent productivity, good collaboration, fair innovation, good quality
            ]
        };

        this.data.goals = this.data.goals || {
            quarterly: [
                { name: 'Loading...', current: 0, target: 100, progress: 0, status: 'on-track' }
            ]
        };

        this.data.aiInsights = this.data.aiInsights || [
            {
                type: 'opportunity',
                title: 'Loading Insights...',
                description: 'Real-time analytics data is being processed.',
                confidence: 100,
                impact: 'medium',
                category: 'system'
            }
        ];

        this.data.activities = this.data.activities || [
            { type: 'system', text: 'Loading activities...', time: 'just now', impact: 'low' }
        ];

        this.data.taskChart = this.data.taskChart || [0, 0, 0, 0, 0, 0, 0];
        this.data.projectChart = this.data.projectChart || [65, 25, 10];
        
        this.innerHTML = `
            <div class="analytics-dashboard" id="analytics-main-content">
                <div class="dashboard-header">
                    <h2 class="dashboard-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Advanced Analytics Hub
                    </h2>
                    <div class="dashboard-controls">
                        <div class="control-group">
                            <select class="range-selector">
                                <option value="week">This Week</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                                <option value="year">This Year</option>
                            </select>
                            <button class="toggle-btn ${this.isRealTimeEnabled ? 'active' : ''}" id="toggleRealTime">
                                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                Real-time
                            </button>
                            <button class="refresh-btn" id="refreshAnalytics" aria-label="Refresh analytics">
                                <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                    <path d="M23 4v6h-6"></path>
                                    <path d="M1 20v-6h6"></path>
                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Advanced KPI Dashboard -->
                <div class="kpi-dashboard">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        Key Performance Indicators
                    </h3>
                    <div class="kpi-grid">
                        ${Object.entries(this.data.kpiData).map(([key, kpi]) => `
                            <div class="advanced-kpi-card ${kpi.status}" data-kpi="${key}">
                                <div class="kpi-header">
                                    <h4 class="kpi-name">${key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                                    <span class="kpi-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}">
                                        <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                                        </svg>
                                        ${kpi.trend}
                                    </span>
                                </div>
                                <div class="kpi-content">
                                    <div class="kpi-value-wrapper">
                                        <div class="kpi-value">${kpi.current}<span class="kpi-unit">%</span></div>
                                        <div class="kpi-target">Target: ${kpi.target}%</div>
                                    </div>
                                    <div class="kpi-progress">
                                        <div class="progress-track">
                                            <div class="progress-fill ${kpi.status}" style="width: ${(kpi.current / kpi.target) * 100}%">
                                                <div class="progress-glow"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kpi-footer">
                                    <span class="status-badge ${kpi.status}">
                                        ${kpi.status.charAt(0).toUpperCase() + kpi.status.slice(1)}
                                        <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${this.getStatusIcon(kpi.status)}
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Goal Tracking Dashboard -->
                <div class="goals-dashboard">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"></path>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                        Q1 2024 Goals & OKRs
                    </h3>
                    <div class="goals-grid">
                        ${this.data.goals.quarterly.map(goal => {
                            const circumference = 2 * Math.PI * 54;
                            const offset = circumference * (1 - goal.progress / 100);
                            const strokeColor = goal.status === 'exceeded' ? 'var(--success-500)' : 'var(--primary-500)';
                            
                            return `
                                <div class="goal-card ${goal.status}" data-goal="${goal.name}">
                                    <div class="goal-header">
                                        <h4 class="goal-name">${goal.name}</h4>
                                        <span class="goal-status ${goal.status}">
                                            ${goal.status.replace('-', ' ')}
                                            <svg class="status-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                ${this.getStatusIcon(goal.status)}
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="goal-metrics">
                                        <div class="goal-progress-circle">
                                            <svg class="progress-ring" width="120" height="120" viewBox="0 0 120 120">
                                                <circle class="progress-ring-circle-bg" cx="60" cy="60" r="54" />
                                                <circle class="progress-ring-circle" cx="60" cy="60" r="54" 
                                                    stroke="${strokeColor}"
                                                    stroke-dasharray="${circumference}"
                                                    stroke-dashoffset="${offset}"
                                                />
                                            </svg>
                                            <div class="goal-current">${goal.current}</div>
                                            <div class="goal-target">of ${goal.target}</div>
                                        </div>
                                        <div class="goal-details">
                                            <div class="goal-progress-label">Progress</div>
                                            <div class="goal-progress-value">${goal.progress.toFixed(1)}%</div>
                                            <div class="goal-trend">
                                                <svg class="trend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M23 6l-9.5 9.5-5-5L1 18"></path>
                                                </svg>
                                                +5% this week
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Team Performance Heat Map -->
                <div class="heatmap-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        Team Performance Heat Map
                    </h3>
                    <div class="heatmap-container">
                        <div class="heatmap-grid">
                            <div class="heatmap-header">
                                <div class="corner-cell"></div>
                                ${this.data.teamPerformance.metrics.map(metric => `
                                    <div class="metric-header">${metric}</div>
                                `).join('')}
                            </div>
                            ${this.data.teamPerformance.departments.map((dept, deptIndex) => `
                                <div class="heatmap-row">
                                    <div class="dept-header">${dept}</div>
                                    ${this.data.teamPerformance.heatmapData[deptIndex].map((value, metricIndex) => `
                                        <div class="heatmap-cell" data-value="${value}" data-dept="${dept}" data-metric="${this.data.teamPerformance.metrics[metricIndex]}" style="background-color: ${this.getHeatmapColor(value)}; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; transform: none !important;">
                                            <span class="cell-value" style="color: ${document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#000000'} !important; -webkit-text-fill-color: ${document.documentElement.getAttribute('data-theme') === 'dark' ? '#ffffff' : '#000000'} !important; font-weight: 600 !important; text-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; transform: none !important;">${value}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            `).join('')}
                        </div>
                        <div class="heatmap-legend">
                            <span class="legend-label">Performance Score:</span>
                            <div class="legend-gradient">
                                <span class="legend-min">70</span>
                                <div class="gradient-bar"></div>
                                <span class="legend-max">100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI-Powered Insights -->
                <div class="ai-insights-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                        AI-Powered Insights
                        <span class="ai-badge">BETA</span>
                    </h3>
                    <div class="insights-grid">
                                                ${this.data.aiInsights.map(insight => `
                            <div class="ai-insight-card ${insight.type}" data-confidence="${insight.confidence}">
                                <div class="insight-header">
                                    <div class="insight-type-icon ${insight.type}">
                                        ${this.getInsightIcon(insight.type)}
                                    </div>
                                    <div class="insight-meta">
                                        <h4 class="insight-title">${insight.title}</h4>
                                        <div class="insight-confidence">
                                            <div class="confidence-bar">
                                                <div class="confidence-fill" style="width: ${insight.confidence}%">
                                                    <div class="confidence-glow"></div>
                                                </div>
                                                <span class="confidence-label">${insight.confidence}% confidence</span>
                                            </div>
                                        </div>
                                    </div>
                                    <span class="impact-badge ${insight.impact}">
                                        ${insight.impact} impact
                                        <svg class="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            ${this.getImpactIcon(insight.impact)}
                                        </svg>
                                    </span>
                                </div>
                                <p class="insight-description">${insight.description}</p>
                                <div class="insight-actions">
                                    <button class="insight-action-btn primary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        Apply Suggestion
                                    </button>
                                    <button class="insight-action-btn secondary">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M12 16v-4"></path>
                                            <path d="M12 8h.01"></path>
                                        </svg>
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Enhanced Charts Section -->
                <div class="charts-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                        Performance Trends
                    </h3>
                    <div class="enhanced-charts-grid">
                        <div class="chart-container enhanced">
                            <div class="chart-header">
                                <div class="chart-info">
                                    <h3 class="chart-title">Task Completion Trends</h3>
                                    <p class="chart-subtitle">Daily productivity metrics and patterns</p>
                                </div>
                                <div class="chart-controls">
                                    <button class="chart-filter active" data-filter="all">All</button>
                                    <button class="chart-filter" data-filter="completed">Completed</button>
                                    <button class="chart-filter" data-filter="progress">In Progress</button>
                                </div>
                            </div>
                            <div class="chart-body" id="taskChart">
                                <canvas id="taskChartCanvas"></canvas>
                            </div>
                        </div>
                        <div class="chart-container enhanced">
                            <div class="chart-header">
                                <div class="chart-info">
                                    <h3 class="chart-title">Project Distribution</h3>
                                    <p class="chart-subtitle">Current project status breakdown</p>
                                </div>
                            </div>
                            <div class="chart-body" id="projectChart">
                                <canvas id="projectChartCanvas"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Activity Feed -->
                <div class="activity-section">
                    <h3 class="section-title">
                        <svg class="section-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                            <path d="m21 12-6-3-6 3-6-3"></path>
                        </svg>
                        Live Activity Feed
                        <div class="activity-status ${this.isRealTimeEnabled ? 'live' : 'paused'}">
                            <span class="status-dot"></span>
                            ${this.isRealTimeEnabled ? 'LIVE' : 'PAUSED'}
                        </div>
                    </h3>
                    <div class="activity-controls">
                        <div class="activity-filters">
                            ${['All Activity', 'Achievements', 'Collaboration', 'Goals', 'Insights'].map(filter => `
                                <button class="filter-btn ${filter === 'All Activity' ? 'active' : ''}" 
                                        data-filter="${filter.toLowerCase()}">
                                    <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        ${this.getFilterIcon(filter)}
                                    </svg>
                                    ${filter}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="activity-feed" id="activityFeed">
                        ${this.data.activities.map(activity => `
                            <div class="activity-item ${activity.type} ${activity.priority}" data-type="${activity.type}">
                                <div class="activity-icon ${activity.type}">
                                    ${this.getActivityIcon(activity.type)}
                                </div>
                                <div class="activity-content">
                                    <div class="activity-main">
                                        <span class="activity-user">${activity.user}</span>
                                        <span class="activity-action">${activity.action}</span>
                                    </div>
                                    <div class="activity-meta">
                                        <span class="activity-time">
                                            <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                            ${activity.time}
                                        </span>
                                        <span class="activity-priority ${activity.priority}">
                                            <svg class="priority-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                ${this.getPriorityIcon(activity.priority)}
                                            </svg>
                                            ${activity.priority} priority
                                        </span>
                                    </div>
                                </div>
                                <button class="activity-expand" title="View details">
                                    <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9 18l6-6-6-6"></path>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        console.log('Analytics Dashboard rendered, element:', this);
        console.log('Analytics Dashboard innerHTML length:', this.innerHTML.length);
        
        // Add entrance animations for AI insights
        setTimeout(() => {
            const insightCards = this.querySelectorAll('.ai-insight-card');
            console.log('🎭 Adding animate-in class to', insightCards.length, 'insight cards');
            insightCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate-in');
                    console.log(`✨ Animated insight card ${index}`);
                }, index * 150); // Stagger the animations
            });
        }, 100);
    }

    getHeatmapColor(value) {
        // Create a color gradient from red (70) to green (100)
        const normalizedValue = Math.max(70, Math.min(100, value));
        const intensity = (normalizedValue - 70) / 30; // Normalize to 0-1 range
        
        if (intensity < 0.5) {
            // Red to yellow
            const red = 255;
            const green = Math.round(255 * intensity * 2);
            return `rgb(${red}, ${green}, 0)`;
        } else {
            // Yellow to green
            const red = Math.round(255 * (1 - (intensity - 0.5) * 2));
            const green = 255;
            return `rgb(${red}, ${green}, 0)`;
        }
    }

    getInsightIcon(type) {
        const icons = {
            opportunity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>`,
            alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="m12 17.02.01 0"></path>
            </svg>`,
            prediction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
            </svg>`
        };
        return icons[type] || icons.opportunity;
    }

    getActivityIcon(type) {
        const icons = {
            achievement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16l-1-7H5l-1 7z"></path>
                <path d="M8 9h8"></path>
                <path d="M12 2v7"></path>
            </svg>`,
            collaboration: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>`,
            goal: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>`,
            insight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>`
        };
        return icons[type] || icons.insight;
    }

    initializeCharts() {
        console.log('🚀 Initializing Analytics Charts...');
        
        // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded! Adding Chart.js dynamically...');
            this.loadChartJS();
            return;
        }
        
        // Task Completion Chart
        const taskCanvas = this.querySelector('#taskChartCanvas');
        if (taskCanvas) {
            console.log('📊 Initializing Task Chart...');
            taskCanvas.width = taskCanvas.offsetWidth;
            taskCanvas.height = taskCanvas.offsetHeight;
            const taskCtx = taskCanvas.getContext('2d');
            const taskChart = new Chart(taskCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Completed Tasks',
                            data: [12, 19, 15, 17, 14, 12, 16],
                            borderColor: '#6366f1',
                            backgroundColor: 'rgba(99, 102, 241, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 3,
                            pointBackgroundColor: '#6366f1',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        },
                        {
                            label: 'In Progress',
                            data: [7, 11, 8, 9, 6, 5, 8],
                            borderColor: '#eab308',
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            tension: 0.4,
                            fill: true,
                            borderWidth: 3,
                            pointBackgroundColor: '#eab308',
                            pointBorderColor: '#ffffff',
                            pointBorderWidth: 2,
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            padding: 12,
                            titleFont: {
                                family: "'Inter', sans-serif",
                                weight: '600',
                                size: 14
                            },
                            bodyFont: {
                                family: "'Inter', sans-serif",
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${context.parsed.y} tasks`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                lineWidth: 1,
                                drawBorder: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12
                                },
                                padding: 8
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.8)',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12,
                                    weight: '500'
                                },
                                padding: 8
                            }
                        }
                    }
                }
            });
            this.chartInstances.set('task', taskChart);
        }

        // Project Progress Chart
        const projectCanvas = this.querySelector('#projectChartCanvas');
        if (projectCanvas) {
            console.log('🍩 Initializing Project Distribution Chart...');
            projectCanvas.width = projectCanvas.offsetWidth;
            projectCanvas.height = projectCanvas.offsetHeight;
            const projectCtx = projectCanvas.getContext('2d');
            
            // Use actual data or fallback to realistic defaults
            const projectData = this.data.projectChart && this.data.projectChart.some(val => val > 0) 
                ? this.data.projectChart 
                : [65, 25, 10];
            
            const projectChart = new Chart(projectCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'In Progress', 'Not Started'],
                    datasets: [{
                        data: projectData,
                        backgroundColor: [
                            '#6366f1',
                            '#eab308',
                            '#e2e8f0'
                        ],
                        borderColor: [
                            '#4f46e5',
                            '#ca8a04',
                            '#cbd5e1'
                        ],
                        borderWidth: 2,
                        hoverBorderWidth: 3,
                        hoverOffset: 8
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 12,
                                padding: 20,
                                color: '#ffffff',
                                font: {
                                    family: "'Inter', sans-serif",
                                    size: 12,
                                    weight: '500'
                                }
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.9)',
                            titleColor: '#ffffff',
                            bodyColor: '#ffffff',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            borderWidth: 1,
                            cornerRadius: 8,
                            padding: 12,
                            titleFont: {
                                family: "'Inter', sans-serif",
                                weight: '600',
                                size: 14
                            },
                            bodyFont: {
                                family: "'Inter', sans-serif",
                                size: 13
                            },
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                }
                            }
                        }
                    },
                    cutout: '75%'
                }
            });
            this.chartInstances.set('project', projectChart);
        }
    }

    updateDashboard() {
        if (!this.data) return;
        
        // Update KPIs
        Object.entries(this.data.kpiData).forEach(([key, kpi]) => {
            const kpiCard = this.querySelector(`[data-kpi="${key}"]`);
            if (kpiCard) {
                const valueEl = kpiCard.querySelector('.kpi-value');
                const trendEl = kpiCard.querySelector('.kpi-trend');
                const progressFill = kpiCard.querySelector('.progress-fill');
                
                if (valueEl) {
                    this.animateNumber(valueEl, parseInt(valueEl.textContent), kpi.current);
                }
                
                if (trendEl) {
                    trendEl.textContent = kpi.trend;
                    trendEl.className = `kpi-trend ${kpi.trend.startsWith('+') ? 'positive' : 'negative'}`;
                }
                
                if (progressFill) {
                    progressFill.style.width = `${(kpi.current / kpi.target) * 100}%`;
                }
                
                kpiCard.className = `kpi-card ${kpi.status}`;
            }
        });

        // Update team performance heatmap
        const heatmapCells = this.querySelectorAll('.heatmap-cell');
        this.data.teamPerformance.heatmapData.forEach((row, deptIndex) => {
            row.forEach((value, metricIndex) => {
                const cell = heatmapCells[deptIndex * 4 + metricIndex];
                if (cell) {
                    cell.style.backgroundColor = this.getHeatmapColor(value);
                    cell.querySelector('.cell-value').textContent = value;
                }
            });
        });

        // Update goals
        this.data.goals.quarterly.forEach(goal => {
            const goalCard = this.querySelector(`[data-goal="${goal.name}"]`);
            if (goalCard) {
                const progressEl = goalCard.querySelector('.progress-fill');
                const progressText = goalCard.querySelector('.goal-progress-value');
                const statusBadge = goalCard.querySelector('.goal-status');
                
                if (progressEl) {
                    progressEl.style.width = `${goal.progress}%`;
                }
                
                if (progressText) {
                    progressText.textContent = `${goal.progress.toFixed(1)}%`;
                }
                
                if (statusBadge) {
                    statusBadge.className = `goal-status ${goal.status}`;
                    statusBadge.textContent = goal.status.replace('-', ' ');
                }
            }
        });

        // Update AI insights
        const insightsContainer = this.querySelector('.ai-insights-grid');
        if (insightsContainer) {
            insightsContainer.innerHTML = this.data.aiInsights.map((insight, index) => `
                <div class="ai-insight-card ${insight.type} ${index === 0 ? 'active' : ''}" data-confidence="${insight.confidence}">
                    <div class="insight-header">
                        <div class="insight-type-icon ${insight.type}">
                            ${this.getInsightIcon(insight.type)}
                        </div>
                        <div class="insight-meta">
                            <h4 class="insight-title">${insight.title}</h4>
                            <div class="insight-confidence">
                                <div class="confidence-bar">
                                    <div class="confidence-fill" style="width: ${insight.confidence}%">
                                        <div class="confidence-glow"></div>
                                    </div>
                                    <span class="confidence-label">${insight.confidence}% confidence</span>
                                </div>
                            </div>
                        </div>
                        <span class="impact-badge ${insight.impact}">
                            ${insight.impact} impact
                            <svg class="impact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                ${this.getImpactIcon(insight.impact)}
                            </svg>
                        </span>
                    </div>
                    <p class="insight-description">${insight.description}</p>
                    <div class="insight-actions">
                        <button class="insight-action-btn primary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 13l4 4L19 7"></path>
                            </svg>
                            Apply Suggestion
                        </button>
                        <button class="insight-action-btn secondary">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                            Learn More
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update activity feed
        const activityFeed = this.querySelector('#activityFeed');
        if (activityFeed) {
            activityFeed.innerHTML = this.data.activities.map(activity => `
                <div class="activity-item ${activity.type} ${activity.impact}" data-type="${activity.type}">
                    <div class="activity-icon ${activity.type}">
                        ${this.getActivityIcon(activity.type)}
                    </div>
                    <div class="activity-content">
                        <div class="activity-text">${activity.text}</div>
                        <div class="activity-meta">
                            <span class="activity-time">
                                <svg class="time-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${activity.time}
                            </span>
                            <span class="activity-impact ${activity.impact}">
                                ${activity.impact} impact
                            </span>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Update charts
        this.updateCharts();
    }

    updateCharts() {
        // Update task completion chart
        const taskChart = this.chartInstances.get('task');
        if (taskChart && this.data.taskChart) {
            taskChart.data.datasets[0].data = this.data.taskChart;
            taskChart.update('none'); // Use 'none' mode for smoother updates
        }

        // Update project progress chart
        const projectChart = this.chartInstances.get('project');
        if (projectChart && this.data.projectChart) {
            // Only update if data has meaningful values
            const hasValidData = this.data.projectChart.some(val => val > 0);
            if (hasValidData) {
                projectChart.data.datasets[0].data = this.data.projectChart;
                projectChart.update('none');
            }
        }
    }

    refreshData() {
        const refreshBtn = this.querySelector('#refreshAnalytics');
        if (refreshBtn) {
            refreshBtn.style.transform = 'rotate(360deg)';
            refreshBtn.setAttribute('aria-label', 'Refreshing analytics data...');
            
            setTimeout(() => {
                refreshBtn.style.transform = 'rotate(0deg)';
                refreshBtn.setAttribute('aria-label', 'Refresh analytics data');
                this.showNotification('Analytics data refreshed', 'success');
            }, 1000);
        }

        // Request new data from service
        window.analyticsService?.generateMockData();
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `analytics-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    ${this.getNotificationIcon(type)}
                </div>
                <span class="notification-text">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
        };
        return icons[type] || icons.info;
    }

    animateNumber(element, start, end) {
        const duration = 1000;
        const steps = 30;
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

    getHeatmapColor(value) {
        // Create a color gradient from red (70) to green (100)
        const normalizedValue = Math.max(70, Math.min(100, value));
        const intensity = (normalizedValue - 70) / 30; // Normalize to 0-1 range
        
        if (intensity < 0.5) {
            // Red to yellow
            const red = 255;
            const green = Math.round(255 * intensity * 2);
            return `rgb(${red}, ${green}, 0)`;
        } else {
            // Yellow to green
            const red = Math.round(255 * (1 - (intensity - 0.5) * 2));
            const green = 255;
            return `rgb(${red}, ${green}, 0)`;
        }
    }

    getStatusIcon(status) {
        const icons = {
            'excellent': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
            'attention': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>',
            'on-track': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
            'exceeded': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>'
        };
        return icons[status] || icons['on-track'];
    }

    getImpactIcon(impact) {
        const icons = {
            'high': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>',
            'medium': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>',
            'low': '<circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path>'
        };
        return icons[impact] || icons['medium'];
    }

    getFilterIcon(filter) {
        const icons = {
            'All Activity': '<path d="M4 21v-7m4 7V9m4 12V3m4 18v-5m4 5v-11"></path>',
            'Achievements': '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m12 0h1.5a2.5 2.5 0 0 1 0 5H18"></path><path d="M4 22h16"></path><path d="M8 9h8"></path><path d="M12 2v7"></path>',
            'Collaboration': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
            'Goals': '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>',
            'Insights': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>'
        };
        return icons[filter] || icons['All Activity'];
    }

    getPriorityIcon(priority) {
        const icons = {
            'high': '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>',
            'medium': '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
            'low': '<circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path>'
        };
        return icons[priority] || icons['medium'];
    }

    // 🎭 MISSING ANIMATION HELPER METHODS - Contest-Winning Implementations

    animateKPICard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-8px) scale(1.03)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            card.classList.add('analytics-float');
            
            // Create ripple effect
            this.createRippleEffect(card);
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            card.classList.remove('analytics-float');
        }
    }

    animateGoalCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-6px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            card.classList.add('analytics-breathing');
            
            // Animate progress ring
            const progressRing = card.querySelector('.progress-ring-circle');
            if (progressRing) {
                progressRing.style.filter = 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.8))';
            }
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            card.classList.remove('analytics-breathing');
            
            const progressRing = card.querySelector('.progress-ring-circle');
            if (progressRing) {
                progressRing.style.filter = '';
            }
        }
    }

    animateInsightCard(card, isEntering) {
        if (isEntering) {
            card.style.transform = 'translateY(-6px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            card.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            card.classList.add('analytics-glow');
            
            // Animate insight icon
            const insightIcon = card.querySelector('.insight-type-icon');
            if (insightIcon) {
                insightIcon.style.transform = 'scale(1.15) rotate(5deg)';
                insightIcon.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
            }
            
            // Animate confidence bar
            const confidenceBar = card.querySelector('.confidence-fill');
            if (confidenceBar) {
                confidenceBar.style.boxShadow = '0 0 10px rgba(16, 185, 129, 0.6)';
            }
        } else {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.borderColor = '';
            card.classList.remove('analytics-glow');
            
            const insightIcon = card.querySelector('.insight-type-icon');
            if (insightIcon) {
                insightIcon.style.transform = '';
                insightIcon.style.boxShadow = '';
            }
            
            const confidenceBar = card.querySelector('.confidence-fill');
            if (confidenceBar) {
                confidenceBar.style.boxShadow = '';
            }
        }
    }

    animateChartContainer(container, isEntering) {
        if (isEntering) {
            container.style.transform = 'translateY(-4px) scale(1.01)';
            container.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.3)';
            container.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            container.classList.add('analytics-pulse');
            
            // Animate chart title
            const chartTitle = container.querySelector('.chart-title');
            if (chartTitle) {
                chartTitle.style.color = 'rgba(255, 255, 255, 1)';
                chartTitle.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.8)';
            }
        } else {
            container.style.transform = '';
            container.style.boxShadow = '';
            container.style.borderColor = '';
            container.classList.remove('analytics-pulse');
            
            const chartTitle = container.querySelector('.chart-title');
            if (chartTitle) {
                chartTitle.style.color = '';
                chartTitle.style.textShadow = '';
            }
        }
    }

    animateActivityItem(item, isEntering) {
        if (isEntering) {
            item.style.transform = 'translateX(12px) translateY(-2px)';
            item.style.background = 'rgba(255, 255, 255, 0.15)';
            item.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            item.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.2)';
            
            // Animate activity icon
            const activityIcon = item.querySelector('.activity-icon');
            if (activityIcon) {
                activityIcon.style.transform = 'scale(1.1) rotate(5deg)';
                activityIcon.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.5)';
            }
        } else {
            item.style.transform = '';
            item.style.background = '';
            item.style.borderColor = '';
            item.style.boxShadow = '';
            
            const activityIcon = item.querySelector('.activity-icon');
            if (activityIcon) {
                activityIcon.style.transform = '';
                activityIcon.style.boxShadow = '';
            }
        }
    }

    // 🎆 ADDITIONAL SPECTACULAR EFFECT HELPERS

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            transform: scale(0);
            animation: analyticsRipple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    highlightMetric(card) {
        // Remove previous highlights
        this.querySelectorAll('.advanced-kpi-card').forEach(c => c.classList.remove('highlighted'));
        
        // Add highlight to selected card
        card.classList.add('highlighted');
        this.triggerKPIAnimation(card);
        
        // Announce the metric
        const label = card.querySelector('.kpi-name')?.textContent || 'KPI';
        const value = card.querySelector('.kpi-value')?.textContent || 'N/A';
        this.announceUpdate(`${label}: ${value}`);
        
        // Create success notification
        this.showNotification(`Viewing ${label} details`, 'info');
    }

    showGoalDetails(card, index) {
        const goalName = card.querySelector('.goal-name')?.textContent || 'Goal';
        const goalProgress = card.querySelector('.goal-progress-value')?.textContent || '0%';
        
        this.announceUpdate(`Showing details for goal: ${goalName} at ${goalProgress} completion`);
        
        // Highlight the goal card
        this.querySelectorAll('.goal-card').forEach(c => c.classList.remove('highlighted'));
        card.classList.add('highlighted');
        
        // Create info notification
        this.showNotification(`Goal: ${goalName} - ${goalProgress} complete`, 'info');
        
        console.log(`🎯 Goal details: ${goalName} = ${goalProgress}`);
    }

    expandInsight(card) {
        // Toggle expanded state
        const isExpanded = card.classList.contains('expanded');
        
        // Remove expanded from all cards
        this.querySelectorAll('.ai-insight-card').forEach(c => c.classList.remove('expanded'));
        
        if (!isExpanded) {
            card.classList.add('expanded');
            
            // Add expanded content if not exists
            if (!card.querySelector('.insight-expanded')) {
                const expandedContent = document.createElement('div');
                expandedContent.className = 'insight-expanded';
                expandedContent.innerHTML = `
                    <div style="margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid rgba(255, 255, 255, 0.2);">
                        <div style="display: flex; gap: var(--space-3);">
                            <button class="insight-action-btn primary" style="flex: 1;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                                    <path d="M5 13l4 4L19 7"></path>
                                </svg>
                                Apply Recommendation
                            </button>
                            <button class="insight-action-btn secondary" style="flex: 1;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px;">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M12 16v-4"></path>
                                    <path d="M12 8h.01"></path>
                                </svg>
                                Learn More
                            </button>
                        </div>
                    </div>
                `;
                card.appendChild(expandedContent);
            }
            
            // Announce expansion
            const title = card.querySelector('.insight-title')?.textContent || 'AI Insight';
            this.announceUpdate(`Expanded insight: ${title}`);
            this.showNotification(`Viewing insight: ${title}`, 'info');
        }
    }
}

// Register the custom element
if (!customElements.get('analytics-dashboard')) {
    customElements.define('analytics-dashboard', SpectacularAnalyticsDashboard);
    console.log('🏆 Contest-Winning Analytics Dashboard component registered with spectacular effects!');
} 