# WeatherAPI.com Integration

This project uses WeatherAPI.com to fetch weather data, air quality information, forecasts, and more. Below is documentation on how it's integrated and how to use it in our application.

## Setup

1. Get your API key from [WeatherAPI.com](https://www.weatherapi.com/)
2. Add your API key to the `.env` file (or directly in the weatherApi.js file):
   ```
   VITE_WEATHERAPI_KEY=your_api_key_here
   ```

## API Features

The integration includes the following WeatherAPI.com endpoints:

1. **Current Weather**: Real-time weather data with air quality
2. **Forecast**: 3-day weather forecast with alerts
3. **Historical Weather**: Past weather data
4. **Location Search**: Search for locations by name
5. **Astronomy**: Sun/moon rise and set times

## API Usage

### Basic Usage

```javascript
import { 
  fetchCurrentWeather,
  fetchForecast,
  fetchHistoricalWeather,
  fetchLocationSearch,
  fetchAstronomyData
} from '../api/weatherApi';

// Fetch current weather data
const currentWeather = await fetchCurrentWeather('London');

// Fetch forecast data with days parameter
const forecast = await fetchForecast('New York', 3);
```

### Location Parameter

All API functions accept a location parameter that can be provided in any of these formats:

- City name: `'Paris'`
- Latitude,Longitude: `'48.8567,2.3508'`
- US Zip code: `'10001'`
- UK postcode: `'SW1'`
- IP address: `'100.0.0.1'`
- Auto IP detection: `'auto:ip'` (default if not specified)

### Available Functions

#### Current Weather

```javascript
const weather = await fetchCurrentWeather(location);
```

Returns current weather data including:
- Location details
- Temperature (°C and °F)
- Feels like temperature
- Wind speed and direction
- Humidity, pressure, and precipitation
- Condition text and icon
- Air quality data (requires 'aqi=yes' parameter)

#### Weather Forecast

```javascript
const forecast = await fetchForecast(location, days);
```

Parameters:
- `location`: Location query (default: 'auto:ip')
- `days`: Number of forecast days (1-14, default: 3)

Returns forecast data including:
- Daily forecasts (max/min temperature, condition, etc.)
- Hourly forecasts
- Weather alerts (if any)
- Air quality forecast

#### Historical Weather

```javascript
const history = await fetchHistoricalWeather(location, date);
```

Parameters:
- `location`: Location query
- `date`: Date in 'YYYY-MM-DD' format (must be on or after 1st Jan, 2010)

Returns historical weather data for the specified date.

#### Location Search

```javascript
const locations = await fetchLocationSearch(query);
```

Returns an array of location matches including:
- Name, region, country
- Latitude and longitude
- Timezone

#### Astronomy Data

```javascript
const astronomy = await fetchAstronomyData(location, date);
```

Parameters:
- `location`: Location query
- `date`: Date for astronomy data (default: 'today')

Returns astronomy data including:
- Sunrise and sunset times
- Moonrise and moonset times
- Moon phase and illumination

## Components

The WeatherAPI implementation is used in the following components:

1. **WeatherDisplay**: Shows current weather, forecast, and air quality
2. **LocationSearch**: Allows searching for different locations

## Air Quality Index (AQI)

Our implementation displays the US EPA Air Quality Index with these levels:

| Index | Level | Color |
|-------|-------|-------|
| 1 | Good | #00E400 |
| 2 | Moderate | #FFFF00 |
| 3 | Unhealthy for Sensitive Groups | #FF7E00 |
| 4 | Unhealthy | #FF0000 |
| 5 | Very Unhealthy | #99004C |
| 6 | Hazardous | #7E0023 |

## Limitations and Features

- Free plan allows up to 1,000,000 calls per month
- Includes air quality data (AQI)
- Includes weather alerts
- Supports multiple languages (not implemented in our code yet)
- Historical data available from 1st Jan, 2010

## Error Handling

All API functions include error handling. Here's how to implement error handling in your components:

```javascript
try {
  const data = await fetchCurrentWeather('London');
  // Process data
} catch (error) {
  console.error('Error fetching weather data:', error);
  // Handle error in UI
}
```

## Additional Resources

- [WeatherAPI.com Documentation](https://www.weatherapi.com/docs/)
- [WeatherAPI.com Dashboard](https://www.weatherapi.com/my/) 