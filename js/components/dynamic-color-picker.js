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
        if (window.ThemeManager) {
            this.loadSavedTheme();
            this.render();
            this.setupEventListeners();
        } else {
            // Wait for ThemeManager to be available
            window.addEventListener('themeManagerReady', () => {
                this.loadSavedTheme();
                this.render();
                this.setupEventListeners();
            }, { once: true });
        }
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
        // Listen for theme-system ready
        document.addEventListener('theme-system-ready', () => {
            console.log('🎨 Theme system ready, initializing color picker');
            this.loadSavedTheme();
            this.render();
        });

        this.querySelector('.picker-close')?.addEventListener('click', () => this.toggle());

        this.querySelectorAll('.preset-theme').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const theme = JSON.parse(e.currentTarget.dataset.theme);
                this.currentTheme = { ...theme };
                this.applyTheme(this.currentTheme);
                this.render();

                // Dispatch theme change event
                document.dispatchEvent(new CustomEvent('theme-changed', {
                    detail: { theme: this.currentTheme }
                }));
            });
        });

        // Enhanced slider interaction
        this.querySelectorAll('.color-slider').forEach(slider => {
            // Prevent text selection while dragging
            slider.addEventListener('mousedown', (e) => {
                e.preventDefault();
                document.body.style.userSelect = 'none';
            });

            slider.addEventListener('mouseup', () => {
                document.body.style.userSelect = '';
            });

            // Handle both input and change events
            ['input', 'change'].forEach(eventType => {
                slider.addEventListener(eventType, (e) => {
                    e.preventDefault();
                    const property = e.target.dataset.property;
                    const value = parseInt(e.target.value);

                    // Ensure valid value range
                    let normalizedValue = value;
                    if (property === 'hue') {
                        normalizedValue = Math.max(0, Math.min(360, value));
                    } else {
                        normalizedValue = Math.max(0, Math.min(100, value));
                    }

                    // Update current theme
                    this.currentTheme[property] = normalizedValue;
                    this.currentTheme.name = 'Custom';

                    try {
                        requestAnimationFrame(() => {
                            // Apply theme changes
                            document.documentElement.classList.add('theme-transition');
                            this.applyTheme(this.currentTheme);

                            // Update visuals
                            this.updateSliderValue(e.target);
                            this.updatePreview();
                            this.updateSliderTracks();

                            // Force repaint for smooth updates
                            void document.documentElement.offsetHeight;

                            // Notify theme changes
                            document.dispatchEvent(new CustomEvent('themeChanged', {
                                detail: {
                                    hue: this.currentTheme.hue,
                                    saturation: this.currentTheme.saturation,
                                    lightness: this.currentTheme.lightness
                                }
                            }));

                            // Clean up transition class
                            requestAnimationFrame(() => {
                                document.documentElement.classList.remove('theme-transition');
                            });
                        });
                    } catch (error) {
                        console.error('Failed to apply theme:', error);
                    }
                });
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
            if (this.isOpen) {
                console.log('🔍 Click detected while picker is open:', {
                    target: e.target.tagName,
                    id: e.target.id,
                    isInsidePicker: this.contains(e.target),
                    isToggleButton: e.target.closest('#toggleColorPicker') !== null,
                    isPanel: e.target.closest('.color-picker-panel') !== null
                });
            }

            if (this.isOpen &&
                !this.contains(e.target) &&
                !e.target.closest('#toggleColorPicker') &&
                !e.target.closest('.color-picker-panel')) {
                console.log('🔄 Closing color picker due to outside click');
                this.isOpen = false;
                this.render();
                document.dispatchEvent(new CustomEvent('colorPickerToggled', {
                    detail: { isOpen: false }
                }));
            }
        });
    }

    updateSliderTracks() {
        // Update hue track with fixed rainbow gradient
        const hueTrack = this.querySelector('.hue-slider .slider-track');
        if (hueTrack) {
            requestAnimationFrame(() => {
                hueTrack.style.setProperty('background', 'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%), hsl(180, 100%, 50%), hsl(240, 100%, 50%), hsl(300, 100%, 50%), hsl(360, 100%, 50%))', 'important');
            });
        }

        // Update saturation track based on current hue and lightness
        const satTrack = this.querySelector('.saturation-slider .slider-track');
        if (satTrack) {
            requestAnimationFrame(() => {
                satTrack.style.setProperty('background', `linear-gradient(to right, hsl(${this.currentTheme.hue}, 0%, ${this.currentTheme.lightness}%), hsl(${this.currentTheme.hue}, 100%, ${this.currentTheme.lightness}%))`, 'important');
            });
        }

        // Update lightness track based on current hue and saturation
        const lightTrack = this.querySelector('.lightness-slider .slider-track');
        if (lightTrack) {
            requestAnimationFrame(() => {
                lightTrack.style.setProperty('background', `linear-gradient(to right, hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 0%), hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 50%), hsl(${this.currentTheme.hue}, ${this.currentTheme.saturation}%, 100%))`, 'important');
            });
        }

        // Update slider thumbs to match current values
        this.querySelectorAll('.color-slider').forEach(slider => {
            const property = slider.dataset.property;
            const value = this.currentTheme[property];
            slider.value = value;

            // Update value display
            const valueDisplay = slider.closest('.control-group').querySelector('.slider-value');
            if (valueDisplay) {
                valueDisplay.textContent = value + (property === 'hue' ? '°' : '%');
            }
        });
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
        console.log('🎨 Applying theme:', theme);

        try {
            // First apply the base HSL variables that everything is calculated from
            const root = document.documentElement;
            root.style.setProperty('--primary-h', theme.hue);
            root.style.setProperty('--primary-s', theme.saturation + '%');
            root.style.setProperty('--primary-l', theme.lightness + '%');

            // Set user theme variables that some components use directly
            root.style.setProperty('--user-primary-h', theme.hue);
            root.style.setProperty('--user-primary-s', theme.saturation + '%');
            root.style.setProperty('--user-primary-l', theme.lightness + '%');

            // Calculate and set all derived colors
            const baseColor = `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`;
            const darkerColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`;
            const lighterColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`;

            // Apply comprehensive color variables
            root.style.setProperty('--primary-300', lighterColor);
            root.style.setProperty('--primary-400', baseColor);
            root.style.setProperty('--primary-500', baseColor);
            root.style.setProperty('--primary-600', darkerColor);
            root.style.setProperty('--accent-color', baseColor);
            root.style.setProperty('--accent-light', lighterColor);
            root.style.setProperty('--accent-dark', darkerColor);
            root.style.setProperty('--button-primary', baseColor);
            root.style.setProperty('--button-primary-hover', darkerColor);
            root.style.setProperty('--link-color', baseColor);
            root.style.setProperty('--link-hover', darkerColor);

            // Force immediate style recalculation and repaint
            requestAnimationFrame(() => {
                const _ = window.getComputedStyle(document.body).opacity;
                document.body.style.transform = 'none';

                requestAnimationFrame(() => {
                    document.body.style.transform = '';
                    // Update UI and save changes
                    this.updatePreview();
                    this.saveTheme(theme);
                });
            });

            console.log('✅ Theme applied successfully:', {
                hue: theme.hue,
                saturation: theme.saturation,
                lightness: theme.lightness,
                baseColor,
                darkerColor,
                lighterColor
            });

            return true;
        } catch (error) {
            console.error('❌ Error applying theme:', error);
            return false;
        }
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
        // Toggle state
        this.isOpen = !this.isOpen;

        // Get panel element
        const panel = this.querySelector('.color-picker-panel');
        if (!panel) return;

        if (this.isOpen) {
            // Show panel with animation
            panel.style.display = 'block';
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(-10px)';

            requestAnimationFrame(() => {
                panel.style.opacity = '1';
                panel.style.transform = 'translateY(0)';
            });

            // Add event listener for outside clicks
            document.addEventListener('click', this.handleOutsideClick);

            // Add event listener for escape key
            document.addEventListener('keydown', this.handleEscapeKey);
        } else {
            // Hide panel with animation
            panel.style.opacity = '0';
            panel.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                panel.style.display = 'none';
            }, 200); // Match transition duration

            // Remove event listeners
            document.removeEventListener('click', this.handleOutsideClick);
            document.removeEventListener('keydown', this.handleEscapeKey);
        }

        // Update ARIA attributes
        this.updateAccessibility();

        // Notify state change
        this.dispatchEvent(new CustomEvent('colorPickerToggled', {
            bubbles: true,
            composed: true,
            detail: { isOpen: this.isOpen }
        }));
    }

    handleOutsideClick = (e) => {
        if (!this.contains(e.target) && !e.target.closest('#toggleColorPicker')) {
            this.isOpen = false;
            this.toggle();
        }
    }

    handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            this.isOpen = false;
            this.toggle();
        }
    }

    updateAccessibility() {
        // Update button states
        const toggleButton = document.querySelector('#toggleColorPicker');
        if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', String(this.isOpen));
            toggleButton.setAttribute('aria-pressed', String(this.isOpen));
        }

        // Update container states
        const buttonContainer = document.querySelector('.color-picker-button');
        if (buttonContainer) {
            buttonContainer.classList.toggle('active', this.isOpen);
        }
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

// Define the custom element and notify ThemeService when defined
if (!customElements.get('dynamic-color-picker')) {
    customElements.define('dynamic-color-picker', DynamicColorPicker);
    console.log('✅ dynamic-color-picker defined');

    // Wait for ThemeService to be available, then notify
    if (window.ThemeService) {
        if (window.ThemeService.onColorPickerDefined) {
            window.ThemeService.onColorPickerDefined();
            console.log('✅ Color picker notified ThemeService of readiness');
        }
    } else {
        // Create an observer to watch for ThemeService availability
        const observer = new MutationObserver((mutations, obs) => {
            if (window.ThemeService && window.ThemeService.onColorPickerDefined) {
                window.ThemeService.onColorPickerDefined();
                console.log('✅ Color picker notified ThemeService of readiness');
                obs.disconnect(); // Clean up after notification
            }
        });

        // Observe the window object for ThemeService
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
} else {
    console.log('⚠️ dynamic-color-picker already defined');
}
