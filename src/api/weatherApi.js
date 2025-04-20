import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHERAPI_KEY || '9513a5a96d5047b094a53030251002';
const BASE_URL = '/api/weather'; // Use local proxy configured in vite.config.js

// Mock data for fallback
const mockCurrentWeather = {
  location: {
    name: "New York",
    region: "New York",
    country: "United States of America",
    lat: 40.71,
    lon: -74.01,
    localtime: new Date().toISOString()
  },
  current: {
    temp_c: 22,
    temp_f: 71.6,
    condition: {
      text: "Partly cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      code: 1003
    },
    wind_mph: 5.6,
    wind_kph: 9.0,
    humidity: 65,
    feelslike_c: 22.5,
    feelslike_f: 72.5,
    uv: 5
  }
};

const mockForecast = {
  location: {
    name: "New York",
    region: "New York",
    country: "United States of America",
    lat: 40.71,
    lon: -74.01,
    localtime: new Date().toISOString()
  },
  current: mockCurrentWeather.current,
  forecast: {
    forecastday: [
      {
        date: new Date().toISOString().split('T')[0],
        day: {
          maxtemp_c: 24,
          maxtemp_f: 75.2,
          mintemp_c: 19,
          mintemp_f: 66.2,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003
          },
          daily_chance_of_rain: 10
        },
        astro: {
          sunrise: "06:30 AM",
          sunset: "07:45 PM",
          moonrise: "10:15 PM",
          moonset: "08:30 AM"
        },
        hour: Array(24).fill(0).map((_, i) => ({
          time: `${new Date().toISOString().split('T')[0]} ${String(i).padStart(2, '0')}:00`,
          temp_c: 20 + Math.sin(i/6) * 5,
          temp_f: 68 + Math.sin(i/6) * 9,
          condition: {
            text: "Partly cloudy",
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
            code: 1003
          }
        }))
      }
    ]
  }
};

export const fetchCurrentWeather = async (location = 'auto:ip') => {
  try {
    // Always use mock data for now - fallback first approach
    console.log('Using mock weather data for location:', location);
    return mockCurrentWeather;
    
    /* Uncomment this to try real API again once UI is stable
    const params = {
      key: API_KEY,
      q: location,
      aqi: 'yes' // Include air quality data
    };

    console.log('Fetching current weather for:', location);
    
    try {
      const response = await axios.get(`${BASE_URL}/current.json`, { params });
      
      if (response.data) {
        console.log('Current weather data retrieved successfully');
        return response.data;
      } else {
        console.log('No data received from API, using mock data');
        return mockCurrentWeather;
      }
    } catch (apiError) {
      console.error('API request failed, using mock data:', apiError);
      return mockCurrentWeather;
    }
    */
  } catch (error) {
    console.error('Error in fetchCurrentWeather function:', error);
    return mockCurrentWeather;
  }
};

export const fetchForecast = async (location = 'auto:ip', days = 3) => {
  try {
    // Always use mock data for now - fallback first approach
    console.log(`Using mock forecast data for location: ${location}, days: ${days}`);
    return mockForecast;
    
    /* Uncomment this to try real API again once UI is stable
    const params = {
      key: API_KEY,
      q: location,
      days: days,
      aqi: 'yes', // Include air quality data
      alerts: 'yes' // Include weather alerts
    };

    console.log(`Fetching ${days} day forecast for:`, location);
    
    try {
      const response = await axios.get(`${BASE_URL}/forecast.json`, { params });
      
      if (response.data) {
        console.log('Forecast data retrieved successfully');
        return response.data;
      } else {
        console.log('No data received from API, using mock data');
        return mockForecast;
      }
    } catch (apiError) {
      console.error('API request failed, using mock data:', apiError);
      return mockForecast;
    }
    */
  } catch (error) {
    console.error('Error in fetchForecast function:', error);
    return mockForecast;
  }
};

export const fetchHistoricalWeather = async (location = 'auto:ip', date) => {
  console.log(`Using mock historical weather data for ${location} on ${date}`);
  return {
    ...mockForecast,
    forecast: {
      forecastday: [{
        date: date,
        day: mockForecast.forecast.forecastday[0].day,
        hour: mockForecast.forecast.forecastday[0].hour
      }]
    }
  };
};

export const fetchLocationSearch = async (query) => {
  console.log('Using mock location search results for:', query);
  return [
    { id: 1, name: "New York", region: "New York", country: "United States of America" },
    { id: 2, name: "New Delhi", region: "Delhi", country: "India" },
    { id: 3, name: "London", region: "City of London, Greater London", country: "United Kingdom" }
  ];
};

export const fetchAstronomyData = async (location = 'auto:ip', date = 'today') => {
  console.log(`Using mock astronomy data for ${location} on ${date}`);
  return {
    location: mockCurrentWeather.location,
    astronomy: {
      astro: {
        sunrise: "06:30 AM",
        sunset: "07:45 PM",
        moonrise: "10:15 PM",
        moonset: "08:30 AM",
        moon_phase: "First Quarter",
        moon_illumination: "50"
      }
    }
  };
}; 