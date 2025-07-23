// 🚀 CONTEST-WINNING WELCOME SECTION - Spectacular Interactive Component
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
    }

    connectedCallback() {
        console.log('🎨 Spectacular Welcome Section Loading...');
        this.initializeSpectacularEffects();
        this.setupMouseTracking();
        this.startAnimationLoop();
        this.isInitialized = true;
        console.log('✨ Spectacular Welcome Section Ready!');
    }

    disconnectedCallback() {
        console.log('🎨 Spectacular Welcome Section Cleanup...');
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.cleanup();
    }

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
        
        console.log('🌟 All spectacular effects initialized!');
    }

    createParticleSystem(container) {
        // Enhanced particle system is already handled by CSS
        // Add additional particles container for dynamic ones
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        container.appendChild(particlesContainer);

        // Create dynamic particles
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

        // Create floating emoji icons
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

        // Create multiple sparkle particles
        for (let i = 0; i < 20; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            
            // Random position
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.left = Math.random() * 100 + '%';
            
            // Random animation delay
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

        // Create constellation lines
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

        // Create pulsing energy rings
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
            
            // Update mouse follower position
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
            
            // Add extra sparkles on hover
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
            
            // Position near mouse
            sparkle.style.top = (this.mousePosition.y + Math.random() * 100 - 50) + 'px';
            sparkle.style.left = (this.mousePosition.x + Math.random() * 100 - 50) + 'px';
            sparkle.style.animationDuration = '1s';
            
            sparklesContainer.appendChild(sparkle);
            
            // Remove after animation
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
        // Update any dynamic effects that need real-time updates
        this.updateParticleColors();
        this.updateSparkleIntensity();
    }

    updateParticleColors() {
        // Sync particle colors with the color picker theme
        const currentTheme = localStorage.getItem('userColor') || '#6366f1';
        const particles = document.querySelectorAll('.welcome-section .particle');
        
        particles.forEach((particle, index) => {
            const hue = this.hexToHue(currentTheme) + (index * 30);
            particle.style.filter = `hue-rotate(${hue}deg)`;
        });
    }

    updateSparkleIntensity() {
        // Vary sparkle intensity based on time
        const intensity = 0.5 + 0.5 * Math.sin(Date.now() * 0.001);
        const sparkles = document.querySelectorAll('.welcome-section .sparkle');
        
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = intensity;
        });
    }

    hexToHue(hex) {
        // Convert hex color to hue value
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

    // Enhanced interaction methods
    triggerSpectacularBurst() {
        // Create a spectacular burst effect when called
        const welcomeSection = document.querySelector('.welcome-section');
        if (!welcomeSection) return;

        // Create burst sparkles
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

    cleanup() {
        // Clean up temporary elements and event listeners
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
    console.log('🎨 Initializing Spectacular Welcome Section...');
    
    // Create the spectacular welcome section instance
    const spectacularWelcome = new SpectacularWelcomeSection();
    
    // Check if welcome section exists, if not wait a bit
    const checkAndInit = () => {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            spectacularWelcome.connectedCallback();
            console.log('✨ Spectacular Welcome Section initialized successfully!');
        } else {
            setTimeout(checkAndInit, 100);
        }
    };
    
    checkAndInit();
    
    // Add global access for triggering spectacular effects
    window.spectacularWelcome = spectacularWelcome;
});

// Add enhanced particles functionality
const EnhancedParticles = {
    create() {
        const particlesContainer = document.querySelector('.welcome-section .particles');
        if (!particlesContainer) {
            console.log('Creating particles container...');
            const welcomeSection = document.querySelector('.welcome-section');
            if (welcomeSection) {
                const container = document.createElement('div');
                container.className = 'particles';
                welcomeSection.appendChild(container);
                console.log('✨ Particles container created');
            }
        }
        
        // Create additional floating particles
        this.createFloatingParticles();
    },

    createFloatingParticles() {
        const container = document.querySelector('.welcome-section .particles');
        if (!container) return;
        
        const particleCount = 3;
        for (let i = 0; i < particleCount; i++) {
            if (!container.querySelector(`.particle:nth-child(${i + 1})`)) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                container.appendChild(particle);
            }
        }
        
        console.log(`🎯 ${particleCount} floating particles ensured`);
    }
};

// Initialize enhanced particles
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        EnhancedParticles.create();
    }, 500);
});

console.log('🚀 Spectacular Welcome Section Component Loaded!'); 