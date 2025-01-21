const headers = {
    "User-Agent": "YourAppName (your@email.com)"
};
const locations = {
    EST: { city: 'New York', lat: 40.7128, lon: -74.0060 },
    CST: { city: 'Chicago', lat: 41.8781, lon: -87.6298 },
    MST: { city: 'Denver', lat: 39.7392, lon: -104.9903 },
    PST: { city: 'Los Angeles', lat: 34.0522, lon: -118.2437 }
};

async function fetchWeather(timeZone) {
    const { city, lat, lon } = locations[timeZone];
    const pointURL = `https://api.weather.gov/points/${lat},${lon}`;

    try {
        const pointResponse = await fetch(pointURL);
        if (!pointResponse.ok) throw new Error('Failed to get grid info');
        const pointData = await pointResponse.json();

        const forecastUrl = pointData.properties.forecast;

        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) throw new Error('Failed to get Forecast');
        const forecastData = await forecastResponse.json();

        const currentWeather = forecastData.properties.periods[0];
        updateWeatherIcon(currentWeather.shortForecast);
        document.querySelector('#city').textContent = `${city}`;
        document.querySelector('#temperature').textContent = `${currentWeather.temperature} °F`;
        document.querySelector('#wind-speed').textContent = `${currentWeather.windSpeed}`;
        document.querySelector('#condition').textContent = currentWeather.shortForecast;
        document.querySelector('#wind-chill').textContent = calculateWindChill(currentWeather.temperature, parseFloat(currentWeather.windSpeed));
    } catch (error) {
        console.error('Weather fetch error: ', error)
    }
}

function updateWeatherIcon(condition) {
    const weatherIcon = document.querySelector('#weather-icon');
    
    if (condition === 'Sunny') {
        weatherIcon.textContent = '🌞';
    } else if (condition === 'Rainy') {
        weatherIcon.textContent = '🌧️';
    } else if (condition === 'Snowy') {
        weatherIcon.textContent = '❄️';
    } else if (condition === 'Cloudy') {
        weatherIcon.textContent = '☁️';
    } else {
        weatherIcon.textContent = '🌤️';
    }
}

function calculateWindChill(temp, windSpeed) {
    if (temp <= 50 && windSpeed > 3) {
        return (35.74 + 0.6215 * temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * temp * Math.pow(windSpeed, 0.16)).toFixed(2) + " °F";
    }
    return "N/A*"
}
document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => fetchWeather(button.dataset.timeZone));
});
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('MST');
});