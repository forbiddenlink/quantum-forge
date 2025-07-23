// Simple Color Picker - WORKING VERSION WITH COMPREHENSIVE COLOR UPDATES
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
        
        // Ensure it's added to body, not inside any other container
        document.body.appendChild(button);
        this.toggleButton = button;
        console.log('🎨 Toggle button created and added to body');
    }

    createPanel() {
        const panel = document.createElement('div');
        panel.className = 'simple-color-panel';
        panel.style.cssText = `
            position: fixed !important;
            top: 145px !important;
            right: 20px !important;
            width: 300px;
            background: white;
            border-radius: 16px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
            z-index: 998 !important;
            transform: translateX(calc(100% + 30px)) !important;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid #e5e7eb;
            max-height: 70vh;
            overflow-y: auto;
            margin: 0 !important;
            opacity: 0;
            visibility: hidden;
            backdrop-filter: blur(20px);
        `;

        const colors = [
            { color: '#6366f1', name: 'Indigo' },
            { color: '#3b82f6', name: 'Blue' },
            { color: '#10b981', name: 'Emerald' },
            { color: '#f59e0b', name: 'Amber' },
            { color: '#ef4444', name: 'Red' },
            { color: '#8b5cf6', name: 'Violet' },
            { color: '#06b6d4', name: 'Cyan' },
            { color: '#84cc16', name: 'Lime' }
        ];
        
        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="margin: 0; font-size: 16px; color: #1f2937; font-weight: 600;">🎨 Theme Colors</h3>
                <button class="close-btn" style="background: none; border: none; font-size: 18px; cursor: pointer; color: #6b7280; padding: 4px; border-radius: 6px; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">✕</button>
            </div>
            
            <div style="margin-bottom: 16px;">
                <p style="font-size: 13px; color: #6b7280; margin: 0 0 10px 0;">Choose a color theme:</p>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                    ${colors.map(item => `
                        <button class="color-option" data-color="${item.color}" title="${item.name}" style="
                            background: ${item.color}; 
                            width: 55px; 
                            height: 55px; 
                            border: 3px solid ${this.currentColor === item.color ? '#1f2937' : 'white'}; 
                            border-radius: 10px; 
                            cursor: pointer; 
                            transition: all 0.3s ease;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            box-shadow: 0 3px 10px rgba(0,0,0,0.15);
                        ">
                            <span class="checkmark" style="
                                color: white;
                                font-weight: bold;
                                font-size: 18px;
                                text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                                display: ${this.currentColor === item.color ? 'block' : 'none'};
                            ">✓</span>
                        </button>
                    `).join('')}
                </div>
            </div>
            
            <div style="margin-bottom: 16px;">
                <label style="display: block; font-size: 13px; color: #6b7280; margin-bottom: 6px; font-weight: 500;">Custom Color:</label>
                <input type="color" value="${this.currentColor}" 
                       style="width: 100%; height: 50px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 10px rgba(0,0,0,0.15);"
                       id="customColor">
            </div>
            
            <div style="font-size: 12px; color: #9ca3af; text-align: center; padding: 10px; background: #f9fafb; border-radius: 8px;">
                ✨ Changes apply instantly across the entire interface
            </div>
        `;

        // Event listeners
        const closeBtn = panel.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => this.toggle());
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = '#f3f4f6';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'none';
        });

        panel.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const color = btn.dataset.color;
                console.log('🎨 Color selected:', color);
                this.changeColor(color);
            });
            
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.25)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '0 3px 10px rgba(0,0,0,0.15)';
            });
        });

        const customInput = panel.querySelector('#customColor');
        customInput.addEventListener('change', (e) => {
            console.log('🎨 Custom color selected:', e.target.value);
            this.changeColor(e.target.value);
        });

        // Add click outside to close
        document.addEventListener('click', (e) => {
            if (this.isOpen && !panel.contains(e.target) && !this.toggleButton.contains(e.target)) {
                this.toggle();
            }
        });

        // Add to body, not inside any container
        document.body.appendChild(panel);
        this.panel = panel;
        console.log('🎨 Panel created and added to body');
    }

    updateSelectionIndicator() {
        if (!this.panel) return;
        
        console.log('🎨 Updating selection for:', this.currentColor);
        
        // Update all color option borders and checkmarks
        const colorOptions = this.panel.querySelectorAll('.color-option');
        colorOptions.forEach(btn => {
            const checkmark = btn.querySelector('.checkmark');
            if (btn.dataset.color === this.currentColor) {
                btn.style.border = '3px solid #1f2937';
                checkmark.style.display = 'block';
            } else {
                btn.style.border = '3px solid white';
                checkmark.style.display = 'none';
            }
        });
        
        // Update custom color input
        const customInput = this.panel.querySelector('#customColor');
        if (customInput) {
            customInput.value = this.currentColor;
        }
    }

    changeColor(color) {
        console.log('🎨 Changing from', this.currentColor, 'to', color);
        this.currentColor = color;
        
        // Apply immediately with comprehensive updates
        this.applyColor(color);
        this.updateSelectionIndicator();
        this.showNotification(`Theme updated to ${this.getColorName(color)}! 🎨`);
        
        console.log('🎨 Color change complete!');
    }

    getColorName(color) {
        const colorNames = {
            '#6366f1': 'Indigo',
            '#3b82f6': 'Blue', 
            '#10b981': 'Emerald',
            '#f59e0b': 'Amber',
            '#ef4444': 'Red',
            '#8b5cf6': 'Violet',
            '#06b6d4': 'Cyan',
            '#84cc16': 'Lime'
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
        root.style.setProperty('--primary-color', color);
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
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
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
        
        // Use direct style manipulation for reliable positioning
        if (this.isOpen) {
            this.panel.style.transform = 'translateX(0)';
            this.panel.style.opacity = '1';
            this.panel.style.visibility = 'visible';
            this.updateSelectionIndicator();
        } else {
            this.panel.style.transform = 'translateX(calc(100% + 30px))';
            // Use timeout to hide after animation
            setTimeout(() => {
                if (!this.isOpen) {
                    this.panel.style.opacity = '0';
                    this.panel.style.visibility = 'hidden';
                }
            }, 300);
        }
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