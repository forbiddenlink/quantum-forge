// Weather Widget Component
class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.weatherData = null;
        this.location = 'San Francisco, CA';
        this.units = 'fahrenheit';
    }

    connectedCallback() {
        console.log('Weather Widget connected');
        this.render();
        this.setupEventListeners();
        this.loadWeatherData();
    }

    render() {
        this.innerHTML = `
            <div class="weather-widget">
                <div class="weather-header">
                    <h2 class="weather-title">Weather</h2>
                    <div class="weather-location">
                        <svg class="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${this.location}
                    </div>
                </div>

                <div class="weather-content">
                    <div class="current-weather">
                        <div class="weather-info">
                            <div class="temperature">
                                <span id="temperature">--</span>
                                <span class="temperature-unit">°F</span>
                            </div>
                            <p class="weather-description" id="weatherDescription">Loading...</p>
                            <div class="weather-details">
                                <div class="weather-detail">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    <span id="humidity">--%</span>
                                </div>
                                <div class="weather-detail">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-7.73A2 2 0 1 1 19 10H2"></path>
                                    </svg>
                                    <span id="windSpeed">-- mph</span>
                                </div>
                                <div class="weather-detail">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                    </svg>
                                    <span id="rainChance">--%</span>
                                </div>
                            </div>
                        </div>
                        <div class="weather-icon" id="weatherIcon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="5"></circle>
                                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
                            </svg>
                        </div>
                    </div>

                    <div class="forecast">
                        <div class="forecast-header">
                            <h3 class="forecast-title">5-Day Forecast</h3>
                            <div class="forecast-toggle">
                                <button class="toggle-btn active" data-unit="fahrenheit">°F</button>
                                <button class="toggle-btn" data-unit="celsius">°C</button>
                            </div>
                        </div>
                        <div class="forecast-list" id="forecastList">
                            <!-- Forecast items will be rendered here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Unit toggle buttons
        this.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.units = e.target.dataset.unit;
                this.updateWeatherDisplay();
                
                // Update active state
                this.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    async loadWeatherData() {
        try {
            // Mock weather data - in a real app, you'd fetch from a weather API
            this.weatherData = {
                current: {
                    temp: 72,
                    description: 'Partly Cloudy',
                    humidity: 65,
                    windSpeed: 8,
                    rainChance: 20,
                    icon: 'partly-cloudy'
                },
                forecast: [
                    { day: 'Mon', temp: 75, icon: 'sunny', description: 'Sunny' },
                    { day: 'Tue', temp: 68, icon: 'cloudy', description: 'Cloudy' },
                    { day: 'Wed', temp: 72, icon: 'partly-cloudy', description: 'Partly Cloudy' },
                    { day: 'Thu', temp: 70, icon: 'rainy', description: 'Light Rain' },
                    { day: 'Fri', temp: 76, icon: 'sunny', description: 'Sunny' }
                ]
            };
            
            this.updateWeatherDisplay();
        } catch (error) {
            console.error('Error loading weather data:', error);
            this.showError();
        }
    }

    updateWeatherDisplay() {
        if (!this.weatherData) return;

        const current = this.weatherData.current;
        
        // Update current weather
        this.querySelector('#temperature').textContent = current.temp;
        this.querySelector('#weatherDescription').textContent = current.description;
        this.querySelector('#humidity').textContent = `${current.humidity}%`;
        this.querySelector('#windSpeed').textContent = `${current.windSpeed} mph`;
        this.querySelector('#rainChance').textContent = `${current.rainChance}%`;
        
        // Update weather icon
        this.querySelector('#weatherIcon').innerHTML = this.getWeatherIcon(current.icon);
        
        // Update forecast
        this.updateForecast();
    }

    updateForecast() {
        const forecastList = this.querySelector('#forecastList');
        const forecast = this.weatherData.forecast;
        
        forecastList.innerHTML = forecast.map(day => `
            <div class="forecast-item">
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">
                    ${this.getWeatherIcon(day.icon)}
                </div>
                <div class="forecast-temp">${day.temp}°</div>
                <div class="forecast-desc">${day.description}</div>
            </div>
        `).join('');
    }

    getWeatherIcon(icon) {
        const icons = {
            sunny: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>`,
            cloudy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
            </svg>`,
            'partly-cloudy': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                <circle cx="12" cy="12" r="5"></circle>
            </svg>`,
            rainy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                <path d="M9 14l2 2 4-4"></path>
            </svg>`,
            stormy: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                <path d="M8 14l3 3 3-3"></path>
                <path d="M11 17l3-3 3 3"></path>
            </svg>`
        };
        return icons[icon] || icons.sunny;
    }

    showError() {
        this.querySelector('.weather-content').innerHTML = `
            <div class="weather-error">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                <h3>Unable to load weather</h3>
                <p>Please check your connection and try again</p>
            </div>
        `;
    }
}

customElements.define('weather-widget', WeatherWidget); 