// Weather Service
class WeatherService {
    constructor() {
        this.API_KEY = ''; // User needs to provide their OpenWeatherMap API key
        this.BASE_URL = 'https://api.openweathermap.org/data/2.5';
        this.defaultLocation = { lat: 40.7128, lon: -74.0060 }; // Default to New York
    }

    async getCurrentLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            return {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };
        } catch (error) {
            console.warn('Could not get location, using default:', error);
            return this.defaultLocation;
        }
    }

    async getCurrentWeather() {
        try {
            if (!this.API_KEY) {
                throw new Error('API key not set. Please set your OpenWeatherMap API key.');
            }

            const location = await this.getCurrentLocation();
            const response = await fetch(
                `${this.BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${this.API_KEY}&units=imperial`
            );

            if (!response.ok) {
                throw new Error('Weather API request failed');
            }

            const data = await response.json();
            
            return {
                temp: Math.round(data.main.temp),
                conditions: data.weather[0].main,
                humidity: data.main.humidity,
                wind: Math.round(data.wind.speed),
                rain: data.rain ? Math.round(data.rain['1h'] * 100) : 0,
                icon: this.getWeatherIcon(data.weather[0].icon)
            };
        } catch (error) {
            console.error('Error fetching weather:', error);
            throw error;
        }
    }

    async getForecast() {
        try {
            if (!this.API_KEY) {
                throw new Error('API key not set. Please set your OpenWeatherMap API key.');
            }

            const location = await this.getCurrentLocation();
            const response = await fetch(
                `${this.BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${this.API_KEY}&units=imperial`
            );

            if (!response.ok) {
                throw new Error('Forecast API request failed');
            }

            const data = await response.json();
            
            // Get next 3 days forecast
            const forecast = data.list
                .filter(item => new Date(item.dt * 1000).getHours() === 12) // Get noon forecasts
                .slice(0, 3)
                .map(item => ({
                    day: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp: Math.round(item.main.temp),
                    conditions: item.weather[0].main,
                    icon: this.getWeatherIcon(item.weather[0].icon)
                }));

            return forecast;
        } catch (error) {
            console.error('Error fetching forecast:', error);
            throw error;
        }
    }

    getWeatherIcon(code) {
        // Map OpenWeatherMap icon codes to our custom SVG icons
        const iconMap = {
            '01d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>`,
            '01n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>`,
            '02d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '02n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '03d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '03n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '04d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '04n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 7h.01M7 3h5a7 7 0 0 1 0 14h-5a7 7 0 1 1 0-14z"></path>
            </svg>`,
            '09d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                <path d="M8 19v1"></path>
                <path d="M8 14v1"></path>
                <path d="M16 19v1"></path>
                <path d="M16 14v1"></path>
                <path d="M12 21v1"></path>
                <path d="M12 16v1"></path>
            </svg>`,
            '09n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                <path d="M8 19v1"></path>
                <path d="M8 14v1"></path>
                <path d="M16 19v1"></path>
                <path d="M16 14v1"></path>
                <path d="M12 21v1"></path>
                <path d="M12 16v1"></path>
            </svg>`,
            '10d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                <path d="M8 19v1"></path>
                <path d="M8 14v1"></path>
                <path d="M16 19v1"></path>
                <path d="M16 14v1"></path>
                <path d="M12 21v1"></path>
                <path d="M12 16v1"></path>
            </svg>`,
            '10n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"></path>
                <path d="M8 19v1"></path>
                <path d="M8 14v1"></path>
                <path d="M16 19v1"></path>
                <path d="M16 14v1"></path>
                <path d="M12 21v1"></path>
                <path d="M12 16v1"></path>
            </svg>`,
            '11d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
                <polyline points="13 11 9 17 15 17 11 23"></polyline>
            </svg>`,
            '11n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
                <polyline points="13 11 9 17 15 17 11 23"></polyline>
            </svg>`,
            '13d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
                <line x1="8" y1="16" x2="8.01" y2="16"></line>
                <line x1="8" y1="20" x2="8.01" y2="20"></line>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                <line x1="12" y1="22" x2="12.01" y2="22"></line>
                <line x1="16" y1="16" x2="16.01" y2="16"></line>
                <line x1="16" y1="20" x2="16.01" y2="20"></line>
            </svg>`,
            '13n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
                <line x1="8" y1="16" x2="8.01" y2="16"></line>
                <line x1="8" y1="20" x2="8.01" y2="20"></line>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
                <line x1="12" y1="22" x2="12.01" y2="22"></line>
                <line x1="16" y1="16" x2="16.01" y2="16"></line>
                <line x1="16" y1="20" x2="16.01" y2="20"></line>
            </svg>`,
            '50d': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 5h14"></path>
                <path d="M5 9h14"></path>
                <path d="M5 13h14"></path>
                <path d="M5 17h14"></path>
            </svg>`,
            '50n': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 5h14"></path>
                <path d="M5 9h14"></path>
                <path d="M5 13h14"></path>
                <path d="M5 17h14"></path>
            </svg>`
        };

        return iconMap[code] || iconMap['01d']; // Default to clear sky if icon not found
    }
}

// Export as singleton
export const weatherService = new WeatherService(); 