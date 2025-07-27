// Dynamic Color Picker - Contest Show-Stopper Feature
class DynamicColorPicker extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.currentTheme = {
            hue: 270, // Default violet
            saturation: 80,
            lightness: 50,
            name: 'Violet'
        };
        this.presetThemes = [
            { name: 'Violet', hue: 270, saturation: 80, lightness: 50, icon: '💜' },
            { name: 'Emerald', hue: 150, saturation: 75, lightness: 45, icon: '🌿' },
            { name: 'Amber', hue: 45, saturation: 85, lightness: 60, icon: '🌅' },
            { name: 'Red', hue: 0, saturation: 85, lightness: 60, icon: '❤️' },
            { name: 'Blue', hue: 210, saturation: 90, lightness: 55, icon: '🌊' },
            { name: 'Cyan', hue: 195, saturation: 100, lightness: 50, icon: '💠' },
            { name: 'Lime', hue: 160, saturation: 70, lightness: 55, icon: '🌱' },
            { name: 'Custom', hue: 248, saturation: 85, lightness: 63, icon: '🎨' }
        ];
        this.colorHistory = [];
    }

    connectedCallback() {
        this.loadSavedTheme();
        this.render();
        this.setupEventListeners();
        // Remove createToggleButton() as we'll use the header's button
    }

    loadSavedTheme() {
        try {
            const saved = localStorage.getItem('userTheme');
            if (saved) {
                this.currentTheme = JSON.parse(saved);
                this.applyTheme(this.currentTheme);
            } else {
                // If no saved theme, apply the default Violet theme
                this.applyTheme(this.presetThemes[0]); // Violet is at index 0
            }
        } catch (error) {
            console.error('Error loading theme:', error);
            // Fall back to default Violet theme
            this.applyTheme(this.presetThemes[0]); // Violet is at index 0
        }
    }

    saveTheme(theme) {
        localStorage.setItem('userTheme', JSON.stringify(theme));
        this.colorHistory.unshift({ ...theme });
        if (this.colorHistory.length > 10) {
            this.colorHistory = this.colorHistory.slice(0, 10);
        }
        localStorage.setItem('colorHistory', JSON.stringify(this.colorHistory));
    }

    createToggleButton() {
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
            background: var(--primary-500);
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
            toggleBtn.style.background = 'var(--primary-600)';
        });

        toggleBtn.addEventListener('mouseleave', () => {
            toggleBtn.style.transform = 'scale(1)';
            toggleBtn.style.background = 'var(--primary-500)';
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
                    <div class="theme-preview-card">
                        <h4>${this.currentTheme.name}</h4>
                        <div class="theme-colors">
                            <div class="color-dot" style="background: hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, ${Math.min(this.currentTheme.lightness + 20, 95)}%);"></div>
                            <div class="color-dot" style="background: hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, ${this.currentTheme.lightness}%);"></div>
                            <div class="color-dot" style="background: hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, ${Math.max(this.currentTheme.lightness - 20, 5)}%);"></div>
                        </div>
                    </div>
                </div>

                <div class="preset-themes">
                    <h4>Quick Themes</h4>
                    <div class="preset-grid">
                        ${this.presetThemes.map(theme => `
                            <button class="preset-theme ${this.currentTheme.name === theme.name ? 'active' : ''}" 
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
                                <button class="history-item ${this.currentTheme.name === theme.name ? 'active' : ''}" 
                                        data-theme='${JSON.stringify(theme)}'>
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
        this.querySelector('.picker-close')?.addEventListener('click', () => this.toggle());

        this.querySelectorAll('.preset-theme').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = JSON.parse(e.currentTarget.dataset.theme);
                this.currentTheme = { ...theme };
                this.applyTheme(this.currentTheme);
                this.render();
            });
        });

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

        this.querySelector('#randomTheme')?.addEventListener('click', () => {
            this.generateRandomTheme();
        });

        this.querySelector('#saveTheme')?.addEventListener('click', () => {
            this.saveTheme(this.currentTheme);
            this.showNotification('Theme saved! 🎨');
        });

        this.querySelectorAll('.history-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = JSON.parse(e.currentTarget.dataset.theme);
                this.currentTheme = { ...theme };
                this.applyTheme(this.currentTheme);
                this.render();
            });
        });

        // Handle document clicks for closing the picker
        document.addEventListener('click', (e) => {
            // Only handle close events, let header handle open
            if (this.isOpen &&
                !this.contains(e.target) &&
                !e.target.closest('#toggleColorPicker') &&
                !e.target.closest('.color-picker-panel')) {
                this.isOpen = false;
                this.render();
                console.log('Color picker closed by outside click');
                document.dispatchEvent(new CustomEvent('colorPickerToggled', {
                    detail: { isOpen: false }
                }));
            }
        });
    }

    updateSliderTracks() {
        const hueTrack = this.querySelector('.hue-track');
        if (hueTrack) {
            hueTrack.style.background = 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))';
        }

        const satTrack = this.querySelector('.saturation-track');
        if (satTrack) {
            satTrack.style.background = `linear-gradient(to right, hsl(${this.currentTheme.hue}, 0%, ${this.currentTheme.lightness}%), hsl(${this.currentTheme.hue}, 100%, ${this.currentTheme.lightness}%))`;
        }

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

        // Update color picker button color
        const toggleButton = document.querySelector('#toggleColorPicker');
        if (toggleButton) {
            toggleButton.style.setProperty('--button-color', `hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, ${this.currentTheme.lightness}%)`);
        }
    }

    applyTheme(theme) {
        const colors = this.generateColorPalette(theme);
        Object.entries(colors).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        this.saveTheme(theme);
        this.updatePreview();

        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: theme
        }));
    }

    generateColorPalette(theme) {
        const { hue, saturation, lightness } = theme;
        return {
            'primary-h': hue,
            'primary-s': saturation + '%',
            'primary-l': lightness + '%',
            'primary-100': `hsl(${hue}, ${saturation}%, ${Math.min(lightness + 40, 98)}%)`,
            'primary-200': `hsl(${hue}, ${saturation}%, ${Math.min(lightness + 30, 97)}%)`,
            'primary-300': `hsl(${hue}, ${saturation}%, ${Math.min(lightness + 20, 95)}%)`,
            'primary-400': `hsl(${hue}, ${saturation}%, ${Math.min(lightness + 10, 95)}%)`,
            'primary-500': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            'primary-600': `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 10, 5)}%)`,
            'primary-700': `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 20, 5)}%)`,
            'accent-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            'welcome-bg-start': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            'welcome-bg-end': `hsl(${hue}, ${saturation}%, ${Math.max(lightness - 20, 5)}%)`,
            'button-primary': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            'link-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`
        };
    }

    generateRandomTheme() {
        const randomHue = Math.floor(Math.random() * 360);
        const randomSat = Math.floor(Math.random() * 40) + 60;  // 60-100%
        const randomLight = Math.floor(Math.random() * 30) + 45; // 45-75%

        this.currentTheme = {
            name: 'Random',
            hue: randomHue,
            saturation: randomSat,
            lightness: randomLight
        };

        this.applyTheme(this.currentTheme);
        this.render();
        this.showNotification('Generated a random theme! ✨');
    }

    toggle() {
        const wasOpen = this.isOpen;
        this.isOpen = !this.isOpen;

        console.log(`Color picker toggling from ${wasOpen} to ${this.isOpen}`);

        // Force panel update
        this.render();

        // Update any listeners
        document.dispatchEvent(new CustomEvent('colorPickerToggled', {
            detail: {
                isOpen: this.isOpen,
                previous: wasOpen
            }
        }));

        // Debug info
        console.log('Color picker rendered, current DOM state:',
            this.querySelector('.color-picker-panel')?.classList.contains('open'));
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'color-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: var(--primary-500);
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
