import React from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiDayShowers,
  WiNightAltShowers,
  WiThunderstorm,
  WiSnow,
  WiSnowflakeCold,
  WiFog,
  WiSmoke,
  WiDust,
  WiDayHaze,
  WiNightFog,
  WiStormShowers,
  WiWindy,
  WiHurricane,
} from 'react-icons/wi';

/**
 * Maps WeatherAPI.com condition codes to appropriate weather icons
 * https://www.weatherapi.com/docs/weather_conditions.json
 * 
 * @param {number} code - Weather condition code
 * @param {number|boolean} isDay - Optional. 1 for day, 0 for night. If not provided, will use current time
 * @returns {JSX.Element} - Weather icon component
 */
export const getWeatherIcon = (code, isDay) => {
  // Determine if it's day or night
  const isDayTime = isDay !== undefined ? Boolean(isDay) : !isNight();
  
  // Sun / Clear
  if ([1000].includes(code)) {
    return isDayTime ? <WiDaySunny /> : <WiNightClear />;
  }
  
  // Partly cloudy
  if ([1003].includes(code)) {
    return isDayTime ? <WiDayCloudy /> : <WiNightAltCloudy />;
  }
  
  // Cloudy
  if ([1006, 1009].includes(code)) {
    return <WiCloud />;
  }
  
  // Overcast
  if ([1030].includes(code)) {
    return <WiCloudy />;
  }
  
  // Mist, Fog, Freezing fog
  if ([1135, 1147].includes(code)) {
    return isDayTime ? <WiFog /> : <WiNightFog />;
  }
  
  // Patchy rain
  if ([1063, 1180, 1183, 1186, 1189, 1240].includes(code)) {
    return isDayTime ? <WiDayRain /> : <WiNightAltRain />;
  }
  
  // Rain
  if ([1192, 1195, 1243, 1246].includes(code)) {
    return <WiRain />;
  }
  
  // Showers
  if ([1072, 1150, 1153, 1168, 1171].includes(code)) {
    return isDayTime ? <WiDayShowers /> : <WiNightAltShowers />;
  }
  
  // Thunderstorm
  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return <WiThunderstorm />;
  }
  
  // Storms
  if ([1117, 1264, 1267].includes(code)) {
    return <WiStormShowers />;
  }
  
  // Snow
  if ([1066, 1069, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1261, 1264].includes(code)) {
    return <WiSnow />;
  }
  
  // Freezing
  if ([1198, 1201, 1204, 1207, 1237, 1249, 1252].includes(code)) {
    return <WiSnowflakeCold />;
  }
  
  // Smoke
  if ([1030].includes(code)) {
    return <WiSmoke />;
  }
  
  // Dust
  if ([1137].includes(code)) {
    return <WiDust />;
  }
  
  // Haze
  if ([1143].includes(code)) {
    return <WiDayHaze />;
  }
  
  // Windy
  if ([1030].includes(code)) {
    return <WiWindy />;
  }
  
  // Hurricane, Tornado
  if ([1117].includes(code)) {
    return <WiHurricane />;
  }

  // Default
  return isDayTime ? <WiDaySunny /> : <WiNightClear />;
};

/**
 * Helper function to determine if it's nighttime
 * This is a fallback when the API doesn't provide is_day parameter
 * 
 * @returns {boolean} - Whether it's currently night
 */
const isNight = () => {
  const hours = new Date().getHours();
  return hours >= 18 || hours < 6;
}; 