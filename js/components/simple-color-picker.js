// Simple Color Picker - CLEAN VERSION WITH ENHANCED DESIGN
class SimpleColorPicker extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.currentColor = localStorage.getItem('userColor') || '#6366f1';
        console.log('🎨 Color picker initialized with:', this.currentColor);
    }

    connectedCallback() {
        console.log('🎨 Color picker connecting...');
        this.createToggleButton();
        this.createPanel();
        this.loadSavedColor();
        console.log('🎨 Color picker ready!');
    }

    loadSavedColor() {
        if (this.currentColor) {
            console.log('🎨 Loading saved color:', this.currentColor);
            this.applyColor(this.currentColor);
        }
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.className = 'simple-color-toggle';
        button.innerHTML = '🎨';
        button.style.cssText = `
            position: fixed !important;
            top: 80px !important;
            right: 20px !important;
            width: 56px;
            height: 56px;
            border: none;
            border-radius: 50%;
            background: ${this.currentColor};
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 999 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            transition: all 0.3s ease;
            border: 2px solid rgba(255,255,255,0.9);
            transform: none !important;
            margin: 0 !important;
            padding: 0 !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('🎨 Toggle clicked');
            this.toggle();
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.boxShadow = '0 6px 16px rgba(0,0,0,0.35)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
        });

        document.body.appendChild(button);
        this.toggleButton = button;
        console.log('🎨 Toggle button created and added to body');
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.className = 'simple-color-panel';

        // Get theme for dynamic styling
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

        panel.style.cssText = `
            position: fixed !important;
            top: 145px !important;
            right: 20px !important;
            width: 340px;
            background: ${isDarkMode
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)'
            };
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
            border-radius: 20px;
            padding: 24px;
            box-shadow: 
                0 20px 25px -5px rgba(0, 0, 0, ${isDarkMode ? '0.4' : '0.1'}),
                0 10px 10px -5px rgba(0, 0, 0, ${isDarkMode ? '0.2' : '0.04'}),
                inset 0 1px 0 rgba(255, 255, 255, ${isDarkMode ? '0.1' : '0.9'});
            z-index: 998 !important;
            transform: translateX(calc(100% + 30px)) scale(0.9) !important;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            max-height: 80vh;
            overflow-y: auto;
            margin: 0 !important;
            opacity: 0;
            visibility: hidden;
            color: ${isDarkMode ? '#f1f5f9' : '#1e293b'};
        `;

        // Modern color palette with better readability (darker tones)
        const colors = [
            { color: '#4f46e5', name: 'Indigo', desc: 'Classic & Professional' },
            { color: '#2563eb', name: 'Blue', desc: 'Trust & Stability' },
            { color: '#0891b2', name: 'Cyan', desc: 'Fresh & Modern' },
            { color: '#059669', name: 'Emerald', desc: 'Growth & Success' },
            { color: '#65a30d', name: 'Lime', desc: 'Energy & Nature' },
            { color: '#d97706', name: 'Amber', desc: 'Warmth & Creativity' },
            { color: '#dc2626', name: 'Red', desc: 'Bold & Dynamic' },
            { color: '#c2185b', name: 'Pink', desc: 'Playful & Creative' },
            { color: '#7c3aed', name: 'Violet', desc: 'Luxury & Innovation' },
            { color: '#475569', name: 'Slate', desc: 'Minimal & Clean' },
            { color: '#b91c1c', name: 'Crimson', desc: 'Power & Passion' },
            { color: '#6d28d9', name: 'Purple', desc: 'Royal & Sophisticated' }
        ];

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h3 style="margin: 0; font-size: 18px; font-weight: 700; background: linear-gradient(135deg, var(--primary-500, #6366f1) 0%, var(--primary-600, #4f46e5) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        🎨 Theme Palette
                    </h3>
                    <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.7;">Choose your perfect color theme</p>
                </div>
                <button class="close-btn" style="
                    background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
                    border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
                    font-size: 14px;
                    cursor: pointer;
                    color: ${isDarkMode ? '#e2e8f0' : '#64748b'};
                    padding: 8px;
                    border-radius: 10px;
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s ease;
                    font-weight: 500;
                ">✕</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;">
                    ${colors.map(item => `
                        <div class="color-option" data-color="${item.color}" style="
                            position: relative;
                            background: linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%);
                            border: 2px solid ${item.color}20;
                            border-radius: 16px;
                            padding: 16px 12px;
                            cursor: pointer;
                            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                            text-align: center;
                            backdrop-filter: blur(5px);
                            overflow: hidden;
                        ">
                            <div style="
                                width: 32px;
                                height: 32px;
                                background: linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%);
                                border-radius: 12px;
                                margin: 0 auto 8px auto;
                                box-shadow: 0 4px 12px ${item.color}40;
                                position: relative;
                                overflow: hidden;
                            ">
                                <div style="
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    right: 0;
                                    bottom: 0;
                                    background: linear-gradient(45deg, rgba(255,255,255,0.2) 0%, transparent 50%);
                                "></div>
                            </div>
                            <div style="font-size: 13px; font-weight: 600; margin-bottom: 2px; color: ${item.color};">${item.name}</div>
                            <div style="font-size: 10px; opacity: 0.6; line-height: 1.2;">${item.desc}</div>
                            <div class="selection-indicator" style="
                                position: absolute;
                                top: 8px;
                                right: 8px;
                                width: 18px;
                                height: 18px;
                                background: ${item.color};
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 10px;
                                color: white;
                                font-weight: bold;
                                opacity: 0;
                                transform: scale(0);
                                transition: all 0.2s ease;
                            ">✓</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; opacity: 0.8;">Custom Color</div>
                <input type="color" value="${this.currentColor}" 
                       class="custom-color-input"
                       style="
                           width: 100%;
                           height: 50px;
                           border: 2px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
                           border-radius: 12px;
                           cursor: pointer;
                           background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
                           transition: all 0.2s ease;
                       "
                       title="Choose a custom color">
            </div>
            
            <div style="
                background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
                border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'};
                border-radius: 12px;
                padding: 16px;
                text-align: center;
            ">
                <div style="font-size: 12px; opacity: 0.7; margin-bottom: 8px;">Current Theme</div>
                <div style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--primary-500, #4f46e5);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 13px;
                    font-weight: 600;
                    box-shadow: 0 4px 12px rgba(var(--user-primary-h, 248), var(--user-primary-s, 85%), var(--user-primary-l, 63%), 0.3);
                ">
                    <div style="
                        width: 16px;
                        height: 16px;
                        background: rgba(255, 255, 255, 0.3);
                        border-radius: 50%;
                    "></div>
                    <span class="current-color-name">Indigo</span>
                </div>
            </div>
        `;

        // Enhanced event listeners for smooth interactions
        panel.querySelectorAll('.color-option').forEach(option => {
            const color = option.dataset.color;
            const indicator = option.querySelector('.selection-indicator');

            option.addEventListener('mouseenter', () => {
                option.style.transform = 'translateY(-4px) scale(1.02)';
                option.style.borderColor = color + '60';
                option.style.boxShadow = `0 8px 25px ${color}25`;
            });

            option.addEventListener('mouseleave', () => {
                option.style.transform = 'translateY(0) scale(1)';
                option.style.borderColor = color + '20';
                option.style.boxShadow = 'none';
            });

            option.addEventListener('click', () => {
                // Visual feedback
                option.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    option.style.transform = 'translateY(-4px) scale(1.02)';
                }, 150);

                // Update selection indicator
                panel.querySelectorAll('.selection-indicator').forEach(ind => {
                    ind.style.opacity = '0';
                    ind.style.transform = 'scale(0)';
                });
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1)';

                // Apply color
                this.applyColor(color);

                // Update current color display
                const colorName = colors.find(c => c.color === color)?.name || 'Custom';
                panel.querySelector('.current-color-name').textContent = colorName;

                // Close after short delay
                setTimeout(() => this.close(), 800);
            });
        });

        // Close button functionality
        panel.querySelector('.close-btn').addEventListener('click', () => this.close());
        panel.querySelector('.close-btn').addEventListener('mouseenter', (e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
            e.target.style.transform = 'scale(1.1)';
        });
        panel.querySelector('.close-btn').addEventListener('mouseleave', (e) => {
            e.target.style.background = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            e.target.style.transform = 'scale(1)';
        });

        // Custom color input functionality
        const customInput = panel.querySelector('.custom-color-input');
        customInput.addEventListener('change', (e) => {
            const color = e.target.value;
            console.log('🎨 Custom color selected:', color);
            this.applyColor(color);

            // Update current color display
            panel.querySelector('.current-color-name').textContent = 'Custom';

            // Show all selection indicators as inactive since this is custom
            panel.querySelectorAll('.selection-indicator').forEach(ind => {
                ind.style.opacity = '0';
                ind.style.transform = 'scale(0)';
            });

            // Close after short delay
            setTimeout(() => this.close(), 800);
        });

        customInput.addEventListener('mouseenter', () => {
            customInput.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
            customInput.style.transform = 'scale(1.02)';
        });

        customInput.addEventListener('mouseleave', () => {
            customInput.style.borderColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
            customInput.style.transform = 'scale(1)';
        });

        // Add click outside to close
        document.addEventListener('click', (e) => {
            if (this.isOpen && !panel.contains(e.target) && !this.toggleButton.contains(e.target)) {
                this.close();
            }
        });

        document.body.appendChild(panel);
        this.panel = panel;

        // Set current selection indicator
        this.updateCurrentSelection();

        console.log('🎨 Enhanced color panel created');
    }

    updateCurrentSelection() {
        if (!this.panel) return;

        console.log('🎨 Updating selection for:', this.currentColor);

        // Update selection indicators
        const indicators = this.panel.querySelectorAll('.selection-indicator');
        const options = this.panel.querySelectorAll('.color-option');

        options.forEach((option, index) => {
            const indicator = indicators[index];
            if (option.dataset.color === this.currentColor) {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1)';
            } else {
                indicator.style.opacity = '0';
                indicator.style.transform = 'scale(0)';
            }
        });
    }

    getColorName(color) {
        const colorNames = {
            '#4f46e5': 'Indigo',
            '#2563eb': 'Blue',
            '#0891b2': 'Cyan',
            '#059669': 'Emerald',
            '#65a30d': 'Lime',
            '#d97706': 'Amber',
            '#dc2626': 'Red',
            '#c2185b': 'Pink',
            '#7c3aed': 'Violet',
            '#475569': 'Slate',
            '#b91c1c': 'Crimson',
            '#6d28d9': 'Purple'
        };
        return colorNames[color] || 'Custom';
    }

    applyColor(color) {
        console.log('🎨 APPLYING COLOR COMPREHENSIVELY:', color);

        const root = document.documentElement;

        // Convert hex to RGB for color variations
        const rgb = this.hexToRgb(color);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

        // Generate comprehensive color palette
        const palette = this.generateColorPalette(hsl);

        console.log('🎨 Generated palette:', palette);

        // Update ALL primary color variables
        root.style.setProperty('--primary-50', palette.primary50);
        root.style.setProperty('--primary-100', palette.primary100);
        root.style.setProperty('--primary-200', palette.primary200);
        root.style.setProperty('--primary-300', palette.primary300);
        root.style.setProperty('--primary-400', palette.primary400);
        root.style.setProperty('--primary-500', color);
        root.style.setProperty('--primary-600', palette.primary600);
        root.style.setProperty('--primary-700', palette.primary700);
        root.style.setProperty('--primary-800', palette.primary800);
        root.style.setProperty('--primary-900', palette.primary900);

        // Update common color variables
        root.style.setProperty('--accent-color', palette.primary400);
        root.style.setProperty('--primary-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
        root.style.setProperty('--accent-rgb', this.hexToRgbString(palette.primary400));

        // Update gradient variables
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${color}, ${palette.primary600})`);
        root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${palette.primary400}, ${palette.primary500})`);

        // Update focus and interaction colors
        root.style.setProperty('--focus-ring', color);
        root.style.setProperty('--border-primary', palette.primary200);

        // Update toggle button immediately
        if (this.toggleButton) {
            this.toggleButton.style.background = color;
        }

        // Update current color
        this.currentColor = color;

        // Save to localStorage
        localStorage.setItem('userColor', color);

        // Force multiple repaints
        document.body.offsetHeight;
        root.offsetHeight;

        // Trigger custom event for components to update
        window.dispatchEvent(new CustomEvent('themeColorChanged', {
            detail: {
                color,
                palette,
                rgb,
                hsl
            }
        }));

        console.log('🎨 COLOR APPLIED COMPREHENSIVELY:', color);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 99, g: 102, b: 241 }; // fallback
    }

    hexToRgbString(hex) {
        const rgb = this.hexToRgb(hex);
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    }

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };

        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    generateColorPalette(hsl) {
        const { h, s } = hsl;

        return {
            primary50: this.hslToHex(h, Math.max(s - 40, 10), 96),
            primary100: this.hslToHex(h, Math.max(s - 20, 20), 92),
            primary200: this.hslToHex(h, s, 85),
            primary300: this.hslToHex(h, s, 75),
            primary400: this.hslToHex(h, s, 65),
            primary500: this.hslToHex(h, s, 55), // base color
            primary600: this.hslToHex(h, s, 45),
            primary700: this.hslToHex(h, s, 35),
            primary800: this.hslToHex(h, s, 25),
            primary900: this.hslToHex(h, s, 15)
        };
    }

    toggle() {
        this.isOpen = !this.isOpen;
        console.log('🎨 Panel now:', this.isOpen ? 'OPEN' : 'CLOSED');

        if (this.isOpen) {
            this.panel.style.transform = 'translateX(0) scale(1)';
            this.panel.style.opacity = '1';
            this.panel.style.visibility = 'visible';
            this.updateCurrentSelection();
        } else {
            this.close();
        }
    }

    close() {
        this.isOpen = false;
        this.panel.style.transform = 'translateX(calc(100% + 30px)) scale(0.9)';
        this.panel.style.opacity = '0';
        setTimeout(() => {
            if (!this.isOpen) {
                this.panel.style.visibility = 'hidden';
            }
        }, 400);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed !important;
            top: 150px !important;
            right: 20px !important;
            background: ${this.currentColor};
            color: white;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            z-index: 1000 !important;
            opacity: 0;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(0,0,0,0.2);
            border: 1px solid rgba(255,255,255,0.2);
            transform: translateY(-10px) !important;
            margin: 0 !important;
            backdrop-filter: blur(10px);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 100);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    }
}

customElements.define('simple-color-picker', SimpleColorPicker);
