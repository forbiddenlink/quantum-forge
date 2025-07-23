// Dynamic Color Picker - Contest Show-Stopper Feature
class DynamicColorPicker extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.currentTheme = {
            hue: 248, // Default purple
            saturation: 85,
            lightness: 63,
            name: 'Purple Magic'
        };
        this.presetThemes = [
            { name: 'Purple Magic', hue: 248, saturation: 85, lightness: 63, icon: '💜' },
            { name: 'Ocean Blue', hue: 210, saturation: 90, lightness: 55, icon: '🌊' },
            { name: 'Forest Green', hue: 150, saturation: 75, lightness: 45, icon: '🌿' },
            { name: 'Sunset Orange', hue: 25, saturation: 85, lightness: 60, icon: '🌅' },
            { name: 'Rose Gold', hue: 340, saturation: 75, lightness: 65, icon: '🌹' },
            { name: 'Galaxy Purple', hue: 270, saturation: 80, lightness: 50, icon: '🌌' },
            { name: 'Electric Blue', hue: 195, saturation: 100, lightness: 50, icon: '⚡' },
            { name: 'Mint Fresh', hue: 160, saturation: 70, lightness: 55, icon: '🌱' }
        ];
        this.colorHistory = [];
    }

    connectedCallback() {
        this.loadSavedTheme();
        this.render();
        this.setupEventListeners();
        this.createToggleButton();
    }

    loadSavedTheme() {
        const saved = localStorage.getItem('userTheme');
        if (saved) {
            this.currentTheme = JSON.parse(saved);
            this.applyTheme(this.currentTheme);
        }
    }

    saveTheme(theme) {
        localStorage.setItem('userTheme', JSON.stringify(theme));
        
        // Add to history
        this.colorHistory.unshift(theme);
        if (this.colorHistory.length > 10) {
            this.colorHistory = this.colorHistory.slice(0, 10);
        }
        localStorage.setItem('colorHistory', JSON.stringify(this.colorHistory));
    }

    createToggleButton() {
        // Create floating toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'color-picker-toggle';
        toggleBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a10 10 0 0 0 0 20 10 10 0 0 1 0-20z"></path>
            </svg>
        `;
        toggleBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            background: var(--primary-600);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            z-index: 999;
            box-shadow: var(--shadow-lg);
            transition: all var(--duration-normal) var(--ease);
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        toggleBtn.addEventListener('mouseenter', () => {
            toggleBtn.style.transform = 'scale(1.1)';
            toggleBtn.style.background = 'var(--primary-700)';
        });
        
        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.transform = 'scale(1)';
            toggleBtn.style.background = 'var(--primary-600)';
        });
        
        toggleBtn.addEventListener('click', () => this.toggle());
        
        document.body.appendChild(toggleBtn);
    }

    render() {
        this.innerHTML = `
            <div class="color-picker-panel ${this.isOpen ? 'open' : ''}">
                <div class="color-picker-header">
                    <h3 class="picker-title">
                        <span class="picker-icon">🎨</span>
                        Customize Your Colors
                    </h3>
                    <button class="picker-close" aria-label="Close color picker">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                
                <div class="current-theme-preview">
                    <div class="theme-preview-card" style="background: var(--primary-500);">
                        <h4>${this.currentTheme.name}</h4>
                        <div class="theme-colors">
                            <div class="color-dot" style="background: var(--primary-300);"></div>
                            <div class="color-dot" style="background: var(--primary-500);"></div>
                            <div class="color-dot" style="background: var(--primary-700);"></div>
                        </div>
                    </div>
                </div>

                <div class="preset-themes">
                    <h4>Quick Themes</h4>
                    <div class="preset-grid">
                        ${this.presetThemes.map(theme => `
                            <button class="preset-theme ${this.isCurrentTheme(theme) ? 'active' : ''}" 
                                    data-theme='${JSON.stringify(theme)}'>
                                <span class="preset-icon">${theme.icon}</span>
                                <span class="preset-name">${theme.name}</span>
                                <div class="preset-color" style="background: hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%);"></div>
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="custom-color-section">
                    <h4>Custom Color</h4>
                    <div class="color-controls">
                        <div class="control-group">
                            <label>Hue</label>
                            <div class="slider-container">
                                <input type="range" 
                                       class="color-slider hue-slider" 
                                       min="0" 
                                       max="360" 
                                       value="${this.currentTheme.hue}"
                                       data-property="hue">
                                <div class="slider-track hue-track"></div>
                            </div>
                            <span class="slider-value">${this.currentTheme.hue}°</span>
                        </div>
                        
                        <div class="control-group">
                            <label>Saturation</label>
                            <div class="slider-container">
                                <input type="range" 
                                       class="color-slider saturation-slider" 
                                       min="0" 
                                       max="100" 
                                       value="${this.currentTheme.saturation}"
                                       data-property="saturation">
                                <div class="slider-track saturation-track"></div>
                            </div>
                            <span class="slider-value">${this.currentTheme.saturation}%</span>
                        </div>
                        
                        <div class="control-group">
                            <label>Lightness</label>
                            <div class="slider-container">
                                <input type="range" 
                                       class="color-slider lightness-slider" 
                                       min="20" 
                                       max="80" 
                                       value="${this.currentTheme.lightness}"
                                       data-property="lightness">
                                <div class="slider-track lightness-track"></div>
                            </div>
                            <span class="slider-value">${this.currentTheme.lightness}%</span>
                        </div>
                    </div>
                </div>

                <div class="theme-actions">
                    <button class="btn secondary" id="randomTheme">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M16 3h5v5M21 3l-5 5M8 3H3v5M3 3l5 5M16 21h5v-5M21 21l-5-5M8 21H3v-5M3 21l5-5"></path>
                        </svg>
                        Surprise Me
                    </button>
                    <button class="btn primary" id="saveTheme">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        Save Theme
                    </button>
                </div>

                ${this.colorHistory.length > 0 ? `
                    <div class="color-history">
                        <h4>Recent Colors</h4>
                        <div class="history-grid">
                            ${this.colorHistory.slice(0, 6).map(theme => `
                                <button class="history-item" data-theme='${JSON.stringify(theme)}'>
                                    <div class="history-color" style="background: hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%);"></div>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;

        this.updateSliderTracks();
    }

    setupEventListeners() {
        // Close button
        this.querySelector('.picker-close')?.addEventListener('click', () => this.toggle());
        
        // Preset themes
        this.querySelectorAll('.preset-theme').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = JSON.parse(e.currentTarget.dataset.theme);
                this.applyTheme(theme);
                this.currentTheme = theme;
                this.render();
            });
        });

        // Color sliders
        this.querySelectorAll('.color-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const property = e.target.dataset.property;
                const value = parseInt(e.target.value);
                
                this.currentTheme[property] = value;
                this.currentTheme.name = 'Custom';
                
                this.applyTheme(this.currentTheme);
                this.updateSliderValue(e.target);
                this.updatePreview();
            });
        });

        // Random theme
        this.querySelector('#randomTheme')?.addEventListener('click', () => {
            this.generateRandomTheme();
        });

        // Save theme
        this.querySelector('#saveTheme')?.addEventListener('click', () => {
            this.saveTheme(this.currentTheme);
            this.showNotification('Theme saved! 🎨');
        });

        // History items
        this.querySelectorAll('.history-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = JSON.parse(e.currentTarget.dataset.theme);
                this.applyTheme(theme);
                this.currentTheme = theme;
                this.render();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.contains(e.target) && !e.target.closest('.color-picker-toggle')) {
                this.toggle();
            }
        });
    }

    updateSliderTracks() {
        // Update hue track with rainbow gradient
        const hueTrack = this.querySelector('.hue-track');
        if (hueTrack) {
            hueTrack.style.background = 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))';
        }

        // Update saturation track
        const satTrack = this.querySelector('.saturation-track');
        if (satTrack) {
            satTrack.style.background = `linear-gradient(to right, hsl(${this.currentTheme.hue}, 0%, ${this.currentTheme.lightness}%), hsl(${this.currentTheme.hue}, 100%, ${this.currentTheme.lightness}%))`;
        }

        // Update lightness track
        const lightTrack = this.querySelector('.lightness-track');
        if (lightTrack) {
            lightTrack.style.background = `linear-gradient(to right, hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 0%), hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 50%), hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 100%))`;
        }
    }

    updateSliderValue(slider) {
        const valueDisplay = slider.parentElement.parentElement.querySelector('.slider-value');
        const unit = slider.dataset.property === 'hue' ? '°' : '%';
        valueDisplay.textContent = slider.value + unit;
    }

    updatePreview() {
        const preview = this.querySelector('.theme-preview-card');
        if (preview) {
            preview.style.background = `hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, ${this.currentTheme.lightness}%)`;
            preview.querySelector('h4').textContent = this.currentTheme.name;
        }
        this.updateSliderTracks();
    }

    applyTheme(theme) {
        document.documentElement.style.setProperty('--user-primary-h', theme.hue);
        document.documentElement.style.setProperty('--user-primary-s', theme.saturation + '%');
        document.documentElement.style.setProperty('--user-primary-l', theme.lightness + '%');
        
        // Trigger a custom event for other components to respond
        document.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: theme 
        }));
    }

    generateRandomTheme() {
        const themes = [
            'Cosmic Purple', 'Ocean Breeze', 'Forest Whisper', 'Sunset Glow',
            'Rose Dawn', 'Electric Storm', 'Mint Splash', 'Golden Hour'
        ];
        
        const randomTheme = {
            name: themes[Math.floor(Math.random() * themes.length)],
            hue: Math.floor(Math.random() * 360),
            saturation: Math.floor(Math.random() * 40) + 60, // 60-100%
            lightness: Math.floor(Math.random() * 30) + 45   // 45-75%
        };

        this.currentTheme = randomTheme;
        this.applyTheme(randomTheme);
        this.render();
        this.showNotification(`Applied ${randomTheme.name}! ✨`);
    }

    isCurrentTheme(theme) {
        return theme.hue === this.currentTheme.hue && 
               theme.saturation === this.currentTheme.saturation && 
               theme.lightness === this.currentTheme.lightness;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        this.render();
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'color-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--primary-600);
            color: white;
            padding: 12px 20px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            opacity: 0;
            transform: translateY(-20px);
            transition: all var(--duration-normal) var(--ease);
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

customElements.define('dynamic-color-picker', DynamicColorPicker); 