// Theme and Navigation Management
let welcomeSection = null; // Store welcome section ins    // Add global test function that creates its own color picker
    window.testColorPicker = function() {
        console.log('🧪 Creating standalone color picker');
        
        // Remove any existing color picker panel
        const existingPanel = document.querySelector('.standalone-color-picker');
        if (existingPanel) {
            existingPanel.remove();
        }
        
        // Create a simple standalone color picker panel
        const panel = document.createElement('div');
        panel.className = 'standalone-color-picker';
        panel.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            width: 300px;
            height: 400px;
            background: white;
            border: 3px solid red;
            border-radius: 10px;
            z-index: 99999;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        `;
        
        panel.innerHTML = `
            <div style="margin-bottom: 15px;">
                <h3 style="margin: 0 0 10px 0;">🎨 Color Picker</h3>
                <button onclick="this.parentElement.parentElement.remove()" style="float: right; background: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">✕</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Hue: <span id="hueValue">270</span></label><br>
                <input type="range" id="hueSlider" min="0" max="360" value="270" style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Saturation: <span id="satValue">80</span>%</label><br>
                <input type="range" id="satSlider" min="0" max="100" value="80" style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <label>Lightness: <span id="lightValue">50</span>%</label><br>
                <input type="range" id="lightSlider" min="0" max="100" value="50" style="width: 100%;">
            </div>
            
            <div style="margin-bottom: 15px;">
                <div id="colorPreview" style="width: 100%; height: 50px; border: 1px solid #ccc; background: hsl(270, 80%, 50%);"></div>
            </div>
            
            <button onclick="generateRandomColor()" style="width: 100%; padding: 10px; background: #007cba; color: white; border: none; cursor: pointer; margin-bottom: 10px;">🎲 Random Color</button>
            <button onclick="applySelectedColor()" style="width: 100%; padding: 10px; background: #28a745; color: white; border: none; cursor: pointer;">✅ Apply Color</button>
        `;
        
        document.body.appendChild(panel);
        
        // Set up event listeners
        const hueSlider = panel.querySelector('#hueSlider');
        const satSlider = panel.querySelector('#satSlider');
        const lightSlider = panel.querySelector('#lightSlider');
        const preview = panel.querySelector('#colorPreview');
        
        function updateColor() {
            const h = hueSlider.value;
            const s = satSlider.value;
            const l = lightSlider.value;
            
            panel.querySelector('#hueValue').textContent = h;
            panel.querySelector('#satValue').textContent = s;
            panel.querySelector('#lightValue').textContent = l;
            
            const color = `hsl(${h}, ${s}%, ${l}%)`;
            preview.style.background = color;
            
            // Apply to page using multiple methods to ensure it works
            const root = document.documentElement;
            
            // Method 1: Set the base HSL variables
            root.style.setProperty('--primary-h', h);
            root.style.setProperty('--primary-s', s + '%');
            root.style.setProperty('--primary-l', l + '%');
            
            // Method 2: Calculate all the color variations
            const variations = [
                { name: '--primary-50', lightness: Math.min(parseInt(l) + 45, 95) },
                { name: '--primary-100', lightness: Math.min(parseInt(l) + 40, 90) },
                { name: '--primary-200', lightness: Math.min(parseInt(l) + 30, 85) },
                { name: '--primary-300', lightness: Math.min(parseInt(l) + 20, 80) },
                { name: '--primary-400', lightness: Math.min(parseInt(l) + 10, 75) },
                { name: '--primary-500', lightness: parseInt(l) },
                { name: '--primary-600', lightness: Math.max(parseInt(l) - 10, 10) },
                { name: '--primary-700', lightness: Math.max(parseInt(l) - 20, 10) },
                { name: '--primary-800', lightness: Math.max(parseInt(l) - 30, 10) },
                { name: '--primary-900', lightness: Math.max(parseInt(l) - 40, 10) }
            ];
            
            variations.forEach(variation => {
                root.style.setProperty(variation.name, `hsl(${h}, ${s}%, ${variation.lightness}%)`);
            });
            
            // Method 3: Set specific component colors
            root.style.setProperty('--accent-color', `hsl(${h}, ${s}%, ${l}%)`);
            root.style.setProperty('--button-primary', `hsl(${h}, ${s}%, ${l}%)`);
            root.style.setProperty('--link-color', `hsl(${h}, ${s}%, ${l}%)`);
            
            // Method 4: Force update common elements
            const elementsToUpdate = [
                '.btn.primary',
                '.action-button',
                'a',
                '.primary-color',
                '.accent-color'
            ];
            
            elementsToUpdate.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.setProperty('background-color', `hsl(${h}, ${s}%, ${l}%)`, 'important');
                });
            });
            
            console.log(`🎨 Color updated to H:${h} S:${s}% L:${l}%`);
        }
        
        hueSlider.addEventListener('input', updateColor);
        satSlider.addEventListener('input', updateColor);
        lightSlider.addEventListener('input', updateColor);
        
        // Global functions for buttons
        window.generateRandomColor = function() {
            hueSlider.value = Math.floor(Math.random() * 360);
            satSlider.value = Math.floor(Math.random() * 40) + 60;
            lightSlider.value = Math.floor(Math.random() * 30) + 45;
            updateColor();
        };
        
        window.applySelectedColor = function() {
            const h = hueSlider.value;
            const s = satSlider.value;
            const l = lightSlider.value;
            
            // Save to localStorage
            localStorage.setItem('userTheme', JSON.stringify({
                hue: parseInt(h),
                saturation: parseInt(s),
                lightness: parseInt(l),
                name: 'Custom'
            }));
            
            alert('Color theme saved!');
        };
        
        console.log('🧪 Standalone color picker created and shown');
    };

    // Add debug function to check component registration
    window.debugColorPicker = function() {
        console.log('🔍 Color picker debug info:');
        const colorPicker = document.querySelector('dynamic-color-picker');
        const isRegistered = customElements.get('dynamic-color-picker');
        
        console.log('Component registered:', !!isRegistered);
        console.log('Element found:', !!colorPicker);
        
        if (colorPicker) {
            console.log('Element connected:', colorPicker.isConnected);
            console.log('Element innerHTML length:', colorPicker.innerHTML.length);
            console.log('Element methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(colorPicker)));
            console.log('ConnectedCallback available:', typeof colorPicker.connectedCallback);
            
            // Try to manually call connectedCallback
            console.log('🔧 Manually calling connectedCallback...');
            if (colorPicker.connectedCallback) {
                colorPicker.connectedCallback();
            }
        }
    };nup
let performanceMonitor = null;
let analyticsServiceInstance = null;

document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Quantum Forge - Loading...');

    // Create and ensure header is visible with !important styles
    if (!document.querySelector('app-header')) {
        console.log('⚠️ Header not found, creating...');
        try {
            const appHeader = document.createElement('app-header');
            document.querySelector('.dashboard').prepend(appHeader);

            // Force header visibility with !important styles
            const headerStyles = {
                'display': 'block !important',
                'visibility': 'visible !important',
                'opacity': '1 !important',
                'position': 'sticky !important',
                'top': '0 !important',
                'z-index': '100 !important',
                'width': '100% !important'
            };

            // Apply forced styles
            requestAnimationFrame(() => {
                if (appHeader) {
                    Object.entries(headerStyles).forEach(([property, value]) => {
                        appHeader.style.setProperty(property, value.replace(' !important', ''), 'important');
                    });

                    // Also ensure inner header visibility
                    const innerHeader = appHeader.querySelector('.header, header');
                    if (innerHeader) {
                        innerHeader.style.setProperty('display', 'flex', 'important');
                        innerHeader.style.setProperty('visibility', 'visible', 'important');
                        innerHeader.style.setProperty('opacity', '1', 'important');
                    }

                    console.log('✅ Header created and forced visible');
                }
            });
        } catch (error) {
            console.error('❌ Failed to create header:', error);
        }
    }

    // Give the header more time to initialize and check again
    await new Promise(resolve => setTimeout(resolve, 250));

    // Initialize ColorPicker immediately
    const colorPicker = document.querySelector('dynamic-color-picker');
    if (colorPicker) {
        // Ensure the color picker is connected to theme system
        colorPicker.addEventListener('themeChange', (e) => {
            const { hue, saturation, lightness } = e.detail;
            applyColorTheme({ hue, saturation, lightness });
        });
        console.log('✅ Color picker initialized');

        // Set up color picker toggle button connection
        setTimeout(() => {
            const toggleButton = document.querySelector('#toggleColorPicker');
            const colorPicker = document.querySelector('dynamic-color-picker');
            
            // Force initialize the color picker if it's not initialized
            if (colorPicker && colorPicker.innerHTML.trim() === '') {
                console.log('🎨 Color picker not initialized, forcing initialization...');
                try {
                    // Initialize properties
                    colorPicker.currentTheme = {
                        hue: 270,
                        saturation: 80, 
                        lightness: 50,
                        name: 'Violet'
                    };
                    colorPicker.isOpen = false;
                    colorPicker.presetThemes = [
                        { name: 'Violet', hue: 270, saturation: 80, lightness: 50, icon: '💜' },
                        { name: 'Emerald', hue: 150, saturation: 75, lightness: 45, icon: '🌿' },
                        { name: 'Amber', hue: 45, saturation: 85, lightness: 60, icon: '🌅' }
                    ];
                    colorPicker.colorHistory = [];
                    
                    // Force render
                    if (colorPicker.render) {
                        colorPicker.render();
                        console.log('🎨 Render called, innerHTML length now:', colorPicker.innerHTML.length);
                    }
                    
                    // Try connectedCallback
                    if (colorPicker.connectedCallback) {
                        colorPicker.connectedCallback();
                        console.log('🎨 ConnectedCallback called');
                    }
                } catch (error) {
                    console.error('🎨 Error during forced initialization:', error);
                }
            }
            
            // Set up the toggle functionality
            if (colorPicker) {
                console.log('🎨 Setting up color picker toggle functionality...');
                
                // Override the toggle method
                colorPicker.toggle = function() {
                    console.log('🎨 TOGGLE CALLED! Current state:', this.isOpen);
                    
                    // Toggle state
                    this.isOpen = !this.isOpen;
                    console.log('🎨 New state:', this.isOpen);

                    // Get panel element
                    const panel = this.querySelector('.color-picker-panel');
                    console.log('🎨 Panel found:', !!panel);
                    
                    if (panel) {
                        if (this.isOpen) {
                            // Position the panel relative to the header button
                            panel.style.position = 'fixed';
                            panel.style.top = '70px';
                            panel.style.right = '20px';
                            panel.style.zIndex = '99999';
                            panel.style.display = 'block';
                            panel.style.opacity = '1';
                            panel.style.visibility = 'visible';
                            panel.style.transform = 'translateY(0)';
                            panel.style.backgroundColor = '#ffffff';
                            panel.style.border = '3px solid #ff0000';
                            panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
                            panel.classList.add('open');
                            console.log('🎨 Panel opened and positioned');
                            
                            // Set up internal event listeners
                            this.setupInternalEventListeners();
                        } else {
                            panel.style.display = 'none';
                            panel.style.opacity = '0';
                            panel.style.visibility = 'hidden';
                            panel.classList.remove('open');
                            console.log('🎨 Panel closed');
                        }
                    } else {
                        console.log('🎨 NO PANEL FOUND!');
                    }
                };
                
                // Add the setupInternalEventListeners method
                colorPicker.setupInternalEventListeners = function() {
                    console.log('🎨 Setting up internal event listeners');
                    
                    // Close button
                    const closeBtn = this.querySelector('.picker-close');
                    if (closeBtn) {
                        closeBtn.onclick = () => {
                            console.log('🎨 Close button clicked');
                            this.toggle();
                        };
                    }

                    // Preset theme buttons
                    this.querySelectorAll('.preset-theme').forEach(btn => {
                        btn.onclick = (e) => {
                            console.log('🎨 Preset theme clicked');
                            const theme = JSON.parse(e.currentTarget.dataset.theme);
                            this.currentTheme = { ...theme };
                            if (this.applyTheme) {
                                this.applyTheme(this.currentTheme);
                            }
                            // Update active state
                            this.querySelectorAll('.preset-theme').forEach(b => b.classList.remove('active'));
                            e.currentTarget.classList.add('active');
                        };
                    });

                    // Color sliders
                    this.querySelectorAll('.color-slider').forEach(slider => {
                        slider.oninput = (e) => {
                            console.log('🎨 Slider changed:', e.target.id, e.target.value);
                            const property = e.target.id.replace('Slider', '');
                            if (this.currentTheme) {
                                this.currentTheme[property] = parseInt(e.target.value);
                                if (this.applyTheme) {
                                    this.applyTheme(this.currentTheme);
                                }
                            }
                        };
                    });

                    // Random theme button
                    const randomBtn = this.querySelector('#randomTheme');
                    if (randomBtn) {
                        randomBtn.onclick = () => {
                            console.log('🎨 Random theme clicked');
                            const randomHue = Math.floor(Math.random() * 360);
                            const randomSat = Math.floor(Math.random() * 40) + 60;
                            const randomLight = Math.floor(Math.random() * 30) + 45;
                            
                            this.currentTheme = {
                                name: 'Random',
                                hue: randomHue,
                                saturation: randomSat,
                                lightness: randomLight
                            };
                            
                            if (this.applyTheme) {
                                this.applyTheme(this.currentTheme);
                            }
                        };
                    }

                    console.log('🎨 Internal event listeners set up');
                };
            }
            
            // Connect header button to color picker
            if (toggleButton && colorPicker) {
                console.log('🎨 Connecting header button to color picker');
                
                // Remove any existing listeners
                toggleButton.removeEventListener('click', toggleButton._colorPickerHandler);
                
                // Create and store the handler
                toggleButton._colorPickerHandler = (e) => {
                    console.log('🎨 Header button clicked!');
                    e.preventDefault();
                    e.stopPropagation();
                    colorPicker.toggle();
                };
                
                toggleButton.addEventListener('click', toggleButton._colorPickerHandler);
                console.log('✅ Header button connected to color picker');
            } else {
                console.warn('❌ Header button or color picker not found');
                console.log('Toggle button found:', !!toggleButton);
                console.log('Color picker found:', !!colorPicker);
            }
        }, 1000); // Give components more time to initialize
    } else {
        console.warn('❌ Color picker not found in DOM');
    }

    // Add global test function for debugging
    window.testColorPicker = function () {
        console.log('🧪 Test color picker function called');
        const colorPicker = document.querySelector('dynamic-color-picker');
        if (colorPicker && colorPicker.toggle) {
            console.log('🧪 Calling color picker toggle');
            colorPicker.toggle();
        } else {
            console.error('🧪 Color picker or toggle method not found', {
                colorPicker: !!colorPicker,
                toggleMethod: !!(colorPicker && colorPicker.toggle)
            });
        }
    };

    // Debug: Check if custom elements are registered 
    console.log('🔍 Checking custom element registration...');
    const customElementsToCheck = [
        'app-header', // Add header to check first
        'analytics-dashboard',
        'task-system',
        'enhanced-knowledge-hub',
        'live-activity-feed',
        'smart-insights-dashboard',
        'wellness-tracker',
        'team-spotlight',
        'company-news',
        'collaboration-hub',
        'office-visualizer',
        'enhanced-interactive-poll',
        'weather-widget',
        'achievement-system',
        'company-culture-showcase',
        'dynamic-color-picker'
    ];

    customElementsToCheck.forEach(tagName => {
        const isRegistered = customElements.get(tagName);
        console.log(`${isRegistered ? '✅' : '❌'} ${tagName}: ${isRegistered ? 'Registered' : 'NOT REGISTERED'}`);
    });

    // Debug: Check if elements exist in DOM
    console.log('🔍 Checking DOM elements...');
    customElementsToCheck.forEach(tagName => {
        const elements = document.querySelectorAll(tagName);
        console.log(`📦 ${tagName}: ${elements.length} elements found`);
        elements.forEach((el, index) => {
            console.log(`  - Element ${index}:`, el);
            console.log(`    - innerHTML length: ${el.innerHTML.length}`);
            console.log(`    - children count: ${el.children.length}`);
        });
    });

    // Initialize services first
    console.log('🎨 Initializing core services...');
    initializeTheme();

    // Notify that theme system is ready
    document.dispatchEvent(new CustomEvent('theme-system-ready'));

    // Wait a moment for theme system to be ready before initializing components
    setTimeout(() => {
        console.log('🏗️ Initializing components...');
        initializeSidebar();
        initializeKeyboardShortcuts();

        // Force sidebar background fix - deferred to allow components to load
        setTimeout(forceSidebarLightMode, 100);

        // Force light theme and fix white backgrounds - deferred to allow header to initialize
        setTimeout(forceLightThemeAndFixBackgrounds, 200);
    }, 50);    // Initialize performance monitoring
    if (window.PerformanceMonitor) {
        performanceMonitor = new window.PerformanceMonitor();
        performanceMonitor.startMonitoring();
        console.log('Performance monitoring started');
    }

    // Initialize welcome section if it exists
    const welcomeElement = document.querySelector('.welcome-section');
    if (welcomeElement && typeof WelcomeSection !== 'undefined') {
        welcomeSection = new WelcomeSection();
        console.log('Welcome section initialized');
    } else if (welcomeElement) {
        console.log('Welcome section element found but WelcomeSection class not available');
    }

    // Initialize analytics service if available
    if (window.analyticsService) {
        console.log('Starting analytics service...');
        analyticsServiceInstance = window.analyticsService;
        analyticsServiceInstance.startRealTimeUpdates();
        analyticsServiceInstance.generateMockData();
    }

    console.log('✅ Quantum Forge - Ready!');

    // Additional fix after components are loaded
    setTimeout(() => {
        forceLightThemeAndFixBackgrounds();
    }, 2000);

    // Fallback: If components are not rendering, show fallback content
    setTimeout(() => {
        console.log('🔍 Checking component rendering status...');
        const componentsToCheck = [
            'analytics-dashboard',
            'task-system',
            'enhanced-knowledge-hub'
        ];

        let hasEmptyComponents = false;
        componentsToCheck.forEach(tagName => {
            const elements = document.querySelectorAll(tagName);
            elements.forEach(el => {
                console.log(`🔍 Checking ${tagName}:`, {
                    innerHTML: el.innerHTML.length,
                    offsetWidth: el.offsetWidth,
                    offsetHeight: el.offsetHeight,
                    display: getComputedStyle(el).display,
                    visibility: getComputedStyle(el).visibility,
                    opacity: getComputedStyle(el).opacity,
                    position: getComputedStyle(el).position,
                    zIndex: getComputedStyle(el).zIndex
                });

                if (el.innerHTML.trim().length === 0) {
                    console.warn(`⚠️ Empty component detected: ${tagName}`);
                    hasEmptyComponents = true;

                    // Add fallback content
                    el.innerHTML = `
                        <div style="padding: 20px; background: rgba(255,255,255,0.1); border-radius: 8px; text-align: center; color: white;">
                            <h3>${tagName.replace('-', ' ').toUpperCase()}</h3>
                            <p>Component is loading...</p>
                            <div style="width: 40px; height: 40px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
                        </div>
                    `;
                } else if (el.offsetWidth === 0 || el.offsetHeight === 0) {
                    console.warn(`⚠️ Component has no dimensions: ${tagName}`, {
                        width: el.offsetWidth,
                        height: el.offsetHeight,
                        display: getComputedStyle(el).display,
                        visibility: getComputedStyle(el).visibility
                    });

                    // Force visibility
                    el.style.display = 'block';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    el.style.width = '100%';
                    el.style.height = 'auto';
                    el.style.minHeight = '200px';
                }
            });
        });

        if (hasEmptyComponents) {
            console.log('🛠️ Applied fallback content to empty components');
        }

        // Test: Try to manually create a component
        console.log('🧪 Testing manual component creation...');
        try {
            const testElement = document.createElement('analytics-dashboard');
            console.log('✅ Manual component creation successful:', testElement);

            // Check if the component has a constructor
            const constructor = customElements.get('analytics-dashboard');
            if (constructor) {
                console.log('✅ Component constructor found:', constructor);
                console.log('✅ Component prototype:', constructor.prototype);
            } else {
                console.log('❌ Component constructor not found');
            }
        } catch (error) {
            console.error('❌ Manual component creation failed:', error);
        }
    }, 3000); // Wait 3 seconds for components to render
});

// Cleanup when page is unloaded
window.addEventListener('beforeunload', () => {
    console.log('Page unloading, cleaning up all services...');

    if (welcomeSection && welcomeSection.destroy) {
        welcomeSection.destroy();
    }

    if (performanceMonitor && performanceMonitor.stopMonitoring) {
        performanceMonitor.stopMonitoring();
    }

    if (analyticsServiceInstance && analyticsServiceInstance.destroy) {
        analyticsServiceInstance.destroy();
    }

    console.log('All services cleaned up');
});

// Enhanced loading screen management
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Hiding loading screen...');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.3s ease-out';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
            console.log('Loading screen hidden successfully');
        }, 300);
    } else {
        console.log('Loading screen not found');
    }
}

// Single loading screen management with state tracking
let isLoadingScreenHidden = false;

// Create a promise-based loading screen manager
const loadingManager = {
    hideLoadingScreen: function () {
        if (isLoadingScreenHidden) return;

        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            isLoadingScreenHidden = true;
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.3s ease-out';

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.classList.remove('loading');
            }, 300);
        }
    },

    onDOMReady: new Promise(resolve => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', resolve);
        } else {
            resolve();
        }
    }),

    onLoad: new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    })
};

// Hide loading screen when either DOM is ready or window is loaded
Promise.race([
    loadingManager.onDOMReady.then(() => setTimeout(loadingManager.hideLoadingScreen, 100)),
    loadingManager.onLoad.then(() => setTimeout(loadingManager.hideLoadingScreen, 50))
]);

// Enhanced Theme Management with Dynamic Workspace Themes
function initializeTheme() {
    try {
        // Use ThemeService to handle theme initialization if available
        if (window.ThemeService) {
            window.ThemeService.initialize();
        } else {
            console.warn('ThemeService not found, using legacy theme initialization');

            // Force light theme for new users
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                console.log('🔄 Clearing dark theme preference, forcing light mode');
                localStorage.removeItem('theme');
            }

            const theme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
            document.body.setAttribute('data-theme', theme);

            // Load saved user theme (new system with hue/saturation/lightness)
            const savedUserTheme = localStorage.getItem('userTheme');
            if (savedUserTheme) {
                try {
                    const themeData = JSON.parse(savedUserTheme);
                    if (themeData && typeof themeData.hue === 'number' &&
                        typeof themeData.saturation === 'number' &&
                        typeof themeData.lightness === 'number') {
                        applyColorTheme(themeData);
                    } else {
                        throw new Error('Invalid theme data structure');
                    }
                } catch (e) {
                    console.warn('Failed to parse saved theme:', e);
                    localStorage.removeItem('userTheme');
                }
            }
        }
    } catch (error) {
        console.warn('Failed to initialize theme:', error);
        // Apply default theme
        const defaultTheme = {
            hue: 270,
            saturation: 80,
            lightness: 50,
            name: 'Default'
        };
        applyColorTheme(defaultTheme);
    }
}

// Helper function to apply color theme (mirrors dynamic-color-picker logic)
function applyColorTheme(theme) {
    // Use ThemeService if available
    if (window.ThemeService) {
        window.ThemeService.applyColorTheme(theme);
        return;
    }

    // Add transition class before making changes
    document.documentElement.classList.add('theme-transition');

    try {
        // Set root HSL variables that control all derived colors
        document.documentElement.style.setProperty('--primary-h', theme.hue);
        document.documentElement.style.setProperty('--primary-s', theme.saturation + '%');
        document.documentElement.style.setProperty('--primary-l', theme.lightness + '%');

        // Set user theme variables that components use directly
        document.documentElement.style.setProperty('--user-primary-h', theme.hue);
        document.documentElement.style.setProperty('--user-primary-s', theme.saturation + '%');
        document.documentElement.style.setProperty('--user-primary-l', theme.lightness + '%');

        // Calculate derived colors
        const baseColor = `hsl(${theme.hue}, ${theme.saturation}%, ${theme.lightness}%)`;
        const darkerColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness - 20, 5)}%)`;
        const lighterColor = `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness + 20, 95)}%)`;

        // Set all derived color variables
        document.documentElement.style.setProperty('--primary-200', lighterColor);
        document.documentElement.style.setProperty('--primary-300', `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness * 1.4, 95)}%)`);
        document.documentElement.style.setProperty('--primary-400', `hsl(${theme.hue}, ${theme.saturation}%, ${Math.min(theme.lightness * 1.2, 90)}%)`);
        document.documentElement.style.setProperty('--primary-500', baseColor);
        document.documentElement.style.setProperty('--primary-600', darkerColor);
        document.documentElement.style.setProperty('--primary-700', `hsl(${theme.hue}, ${theme.saturation}%, ${Math.max(theme.lightness * 0.6, 10)}%)`);

        // Legacy color overrides for older components
        document.documentElement.style.setProperty('--accent-color', baseColor);
        document.documentElement.style.setProperty('--button-primary', baseColor);
        document.documentElement.style.setProperty('--link-color', baseColor);
        document.documentElement.style.setProperty('--welcome-bg-start', baseColor);
        document.documentElement.style.setProperty('--welcome-bg-end', darkerColor);

        // Force a reflow to ensure all color changes are applied
        void document.documentElement.offsetHeight;

        console.log('✅ Theme applied successfully:', theme);
        return true;
    } catch (error) {
        console.error('❌ Error applying theme:', error);
        return false;
    } finally {
        // Remove transition class after changes are applied
        requestAnimationFrame(() => {
            document.documentElement.classList.remove('theme-transition');
        });
    }
}

// Helper function to convert hex to HSL
function hexToHsl(hex) {
    try {
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
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

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    } catch (error) {
        console.warn('Failed to convert hex to HSL:', hex);
        return null;
    }
}

function detectPreferredTheme() {
    // Check if user has manually set a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme; // Use saved preference
    }

    // Default to light mode for new users - no more dark mode default
    return 'light';
}

function darkenColor(color, amount) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(255 * amount);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

// Theme toggle function - used by header component and settings
function toggleTheme() {
    // Use ThemeService if available
    if (window.ThemeService) {
        return window.ThemeService.toggleTheme();
    }

    // Legacy fallback
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Add transition class
    document.body.classList.add('theme-transition');

    // Change theme
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update theme icon in header if it exists
    const header = document.querySelector('app-header');
    if (header && header.updateThemeIcon) {
        header.updateThemeIcon(newTheme);
    }

    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);

    return newTheme;
}

// Make toggleTheme globally available
window.toggleTheme = toggleTheme;

// Mobile sidebar handling
function initializeSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (!menuToggle || !sidebar) return;

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });
}

// Global Search
function initializeSearch() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;

    const searchInput = searchContainer.querySelector('input[type="search"]');
    const searchButton = searchContainer.querySelector('button');

    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (searchInput && searchInput.value.trim()) {
                handleSearch({ target: searchInput });
            }
        });
    }
}

function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    const searchableElements = document.querySelectorAll([
        '.event-title',
        '.project-title',
        '.news-title',
        '.quick-link-text',
        '.spotlight-name',
        '.spotlight-role'
    ].join(','));

    searchableElements.forEach(element => {
        const container = element.closest('.widget, .event-item, .project-item, .news-item, .quick-link');
        const text = element.textContent.toLowerCase();

        if (query === '') {
            container.style.display = '';
            container.style.opacity = '1';
            return;
        }

        if (text.includes(query)) {
            container.style.display = '';
            container.style.opacity = '1';
            highlightText(element, query);
        } else {
            container.style.opacity = '0.5';
        }
    });
}

function highlightText(element, query) {
    const text = element.textContent;
    const regex = new RegExp(`(${query})`, 'gi');
    element.innerHTML = text.replace(regex, '<mark>$1</mark>');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Weather updates
async function updateWeather() {
    try {
        const weatherWidget = document.querySelector('weather-widget');
        if (weatherWidget && weatherWidget.updateWeather) {
            await weatherWidget.updateWeather();
        }
    } catch (error) {
        console.error('Weather update failed:', error);
    }
}

// Number animation utility
function animateNumber(start, end, callback, duration = 1000) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(start + (end - start) * progress);
        callback(currentValue);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Initialize enhanced keyboard shortcuts with accessibility support
 * Includes focus management, screen reader announcements, and mobile-friendly navigation
 * @since v2.0.0 - Contest Enhancement
 */
function initializeKeyboardShortcuts() {
    try {
        // Detect keyboard usage for enhanced focus indicators
        let isUsingKeyboard = false;

        document.addEventListener('keydown', (e) => {
            isUsingKeyboard = true;
            document.body.classList.add('keyboard-user');

            // Command palette toggle - Ctrl/Cmd + K
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const commandPalette = document.querySelector('command-palette');
                if (commandPalette && commandPalette.toggle) {
                    commandPalette.toggle();
                    announceToScreenReader('Command palette toggled');
                }
            }

            // Theme toggle - Ctrl/Cmd + T
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                const newTheme = toggleTheme();
                announceToScreenReader(`Theme changed to ${newTheme} mode`);
            }

            // Help dialog - F1 or Shift + ?
            if (e.key === 'F1' || (e.shiftKey && e.key === '?')) {
                e.preventDefault();
                const helpDialog = document.querySelector('help-dialog');
                if (helpDialog && helpDialog.toggle) {
                    helpDialog.toggle();
                    announceToScreenReader('Help dialog opened');
                }
            }

            // AI Assistant - Ctrl/Cmd + /
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                const aiAssistant = document.querySelector('ai-assistant');
                if (aiAssistant && aiAssistant.toggle) {
                    aiAssistant.toggle();
                    announceToScreenReader('AI Assistant toggled');
                }
            }

            // Escape key - close open dialogs and panels
            if (e.key === 'Escape') {
                const openPanels = document.querySelectorAll('.ai-assistant.open, .command-palette.active, .help-dialog.open');
                if (openPanels.length > 0) {
                    openPanels.forEach(panel => {
                        if (panel.classList.contains('open')) panel.classList.remove('open');
                        if (panel.classList.contains('active')) panel.classList.remove('active');
                    });
                    announceToScreenReader('Panel closed');
                }
            }

            // Focus management - Tab navigation enhancement
            if (e.key === 'Tab') {
                // Ensure visible focus indicators
                document.body.classList.add('keyboard-user');
            }
        });

        // Remove keyboard user class on mouse usage
        document.addEventListener('mousedown', () => {
            isUsingKeyboard = false;
            document.body.classList.remove('keyboard-user');
        });

        // Re-add on focus to handle tab navigation
        document.addEventListener('focusin', () => {
            if (isUsingKeyboard) {
                document.body.classList.add('keyboard-user');
            }
        });

    } catch (error) {
        console.error('Error initializing keyboard shortcuts:', error);
    }
}

/**
 * Announce messages to screen readers for accessibility
 * Creates a temporary live region to communicate dynamic changes
 * @param {string} message - The message to announce to screen readers
 * @since v2.0.0 - Contest Enhancement
 */
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Force sidebar to have white background in light mode
function forceSidebarLightMode() {
    let isInitialized = false;
    let debounceTimeout = null;

    function applySidebarFix() {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        debounceTimeout = setTimeout(() => {
            const sidebar = document.querySelector('.sidebar');
            const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

            if (sidebar && !isDarkMode && !isInitialized) {
                // Remove any existing background styles
                sidebar.style.removeProperty('background');
                sidebar.style.removeProperty('background-color');
                sidebar.style.removeProperty('background-image');

                // Force white background once
                sidebar.style.setProperty('background', '#ffffff', 'important');
                sidebar.style.setProperty('background-color', '#ffffff', 'important');
                sidebar.style.setProperty('background-image', 'none', 'important');

                // Set CSS custom properties once
                sidebar.style.setProperty('--bg-elevated', '#ffffff', 'important');
                sidebar.style.setProperty('--sidebar-bg', '#ffffff', 'important');

                isInitialized = true;
            }
        }, 100);
    }

    // Apply only once
    applySidebarFix();

    // Watch for theme changes - single observer
    const observer = new MutationObserver((mutations) => {
        const themeChanged = mutations.some(mutation =>
            mutation.type === 'attributes' &&
            mutation.attributeName === 'data-theme'
        );

        if (themeChanged) {
            isInitialized = false;
            applySidebarFix();
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
}

// Force light theme and set solid backgrounds
function forceLightThemeAndFixBackgrounds() {
    console.log('🚨 Force light theme and set solid backgrounds...');

    // Force light theme
    document.documentElement.setAttribute('data-theme', 'light');
    document.body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');

    // Set solid backgrounds for all dashboard components
    function setSolidBackgrounds() {
        const dashboardComponents = document.querySelectorAll(`
            analytics-dashboard,
            task-system,
            enhanced-knowledge-hub,
            live-activity-feed,
            smart-insights-dashboard,
            wellness-tracker,
            team-spotlight,
            company-news,
            collaboration-hub,
            office-visualizer,
            enhanced-interactive-poll,
            weather-widget,
            achievement-system,
            *[class*="dashboard-item"]
        `);

        dashboardComponents.forEach(element => {
            element.style.setProperty('background', 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)', 'important');
            element.style.setProperty('background-image', 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)', 'important');
            element.style.setProperty('backdrop-filter', 'none', 'important');
            element.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
            element.style.setProperty('color', 'white', 'important');
        });

        // Fix any elements with white backgrounds
        const whiteBackgroundElements = document.querySelectorAll('*[style*="background: white"], *[style*="background-color: white"]');
        whiteBackgroundElements.forEach(element => {
            if (!element.closest('.welcome-section')) {
                element.style.setProperty('background', 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)', 'important');
                element.style.setProperty('background-image', 'linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%)', 'important');
                element.style.setProperty('color', 'white', 'important');
            }
        });
    }

    // Apply fixes immediately and after delays
    setSolidBackgrounds();
    setTimeout(setSolidBackgrounds, 100);
    setTimeout(setSolidBackgrounds, 500);
    setTimeout(setSolidBackgrounds, 1000);

    // Set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
        setSolidBackgrounds();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log('✅ Light theme forced and solid backgrounds applied');
}