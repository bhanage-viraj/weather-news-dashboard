import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { 
  WiHumidity, 
  WiStrongWind, 
  WiThermometer, 
  WiBarometer
} from 'react-icons/wi';
import { FaMapMarkerAlt } from 'react-icons/fa';

const WeatherDisplay = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Use the WeatherAPI.com endpoint with HTTPS
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
          params: {
            key: import.meta.env.VITE_WEATHERAPI_KEY || '9513a5a96d5047b094a53030251002',
            q: location,
            days: 3,
            aqi: 'yes',
            alerts: 'no',
          }
        });
        
        if (response.data) {
          console.log('Weather data retrieved successfully:', response.data.location.name);
          
          // Save this location to recent locations
          saveToRecentLocations({
            name: response.data.location.name,
            country: response.data.location.country,
            lat: response.data.location.lat,
            lon: response.data.location.lon
          });

          setWeatherData(response.data);
          setError(null);
        } else {
          throw new Error('No data received from weather API');
        }
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(
          err.response?.data?.error?.message || 
          'Unable to fetch weather data. Please try again with a different location.'
        );
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  const saveToRecentLocations = (locationData) => {
    if (!locationData || !locationData.name) return;
    
    try {
      // Get existing recent locations from localStorage
      const storedLocations = localStorage.getItem('recentLocations');
      let recentLocations = storedLocations ? JSON.parse(storedLocations) : [];
      
      // Check if this location already exists
      const existingIndex = recentLocations.findIndex(loc => 
        loc.name === locationData.name && loc.country === locationData.country
      );
      
      if (existingIndex !== -1) {
        // Remove it to add it to the beginning (most recent)
        recentLocations.splice(existingIndex, 1);
      }
      
      // Add the new location to the beginning of the array
      recentLocations.unshift(locationData);
      
      // Limit to 5 recent locations
      if (recentLocations.length > 5) {
        recentLocations = recentLocations.slice(0, 5);
      }
      
      // Save back to localStorage
      localStorage.setItem('recentLocations', JSON.stringify(recentLocations));
      
      // If this is the first location, also set it as default
      if (!storedLocations || JSON.parse(storedLocations).length === 0) {
        localStorage.setItem('defaultLocation', JSON.stringify(locationData));
      }
    } catch (error) {
      console.error('Error saving to recent locations:', error);
    }
  };

  const containerStyle = {
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
  };

  const glassCardStyle = {
    background: isDarkMode
      ? 'rgba(26, 32, 44, 0.6)'
      : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    borderRadius: '1rem',
    boxShadow: isDarkMode
      ? '0 8px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
      : '0 8px 32px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.6) inset',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.6)',
    overflow: 'hidden',
  };

  const loadingStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '250px',
    gap: '1rem',
    color: isDarkMode ? '#a0aec0' : '#4a5568',
  };

  const errorStyle = {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.5)' : 'rgba(254, 226, 226, 0.7)',
    color: isDarkMode ? '#fecaca' : '#991b1b',
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.95rem',
    lineHeight: '1.5',
    backdropFilter: 'blur(4px)',
    boxShadow: isDarkMode
      ? '0 4px 6px rgba(0, 0, 0, 0.2)'
      : '0 4px 6px rgba(0, 0, 0, 0.05)',
  };

  const mainWeatherStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  };

  const currentWeatherStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.75rem',
    ...glassCardStyle
  };

  const locationContainerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1.5rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
  };

  const tempAndIconStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1.25rem',
    margin: '1.5rem 0',
    position: 'relative',
    zIndex: 1,
  };

  const temperatureStyle = {
    fontSize: '3.5rem',
    fontWeight: '700',
    background: isDarkMode
      ? 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)'
      : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: isDarkMode
      ? '0 2px 10px rgba(59, 130, 246, 0.5)'
      : '0 2px 10px rgba(59, 130, 246, 0.2)',
  };

  const weatherIconStyle = {
    width: '80px',
    height: '80px',
    filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.15))',
  };

  const weatherDetailsStyle = {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '0.25rem',
    minWidth: '40%',
  };

  const locationNameStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '0.25rem',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textShadow: isDarkMode 
      ? '0 2px 4px rgba(0, 0, 0, 0.5)' 
      : '0 1px 3px rgba(0, 0, 0, 0.2)',
    letterSpacing: '0.5px',
    textAlign: 'center',
    justifyContent: 'center',
  };

  const locationIconStyle = {
    fontSize: '1.25rem',
    color: isDarkMode ? '#f59e0b' : '#f97316',
    filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.3))',
  };

  const countryNameStyle = {
    fontSize: '1rem',
    fontWeight: '500',
    color: isDarkMode ? '#cbd5e1' : '#64748b',
    marginBottom: '0.75rem',
    letterSpacing: '0.3px',
  };

  const weatherConditionStyle = {
    fontSize: '1.25rem',
    color: isDarkMode ? '#d1d5db' : '#4b5563',
    fontWeight: '500',
  };

  const additionalInfoStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  };

  const infoCardStyle = {
    padding: '1.25rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...glassCardStyle,
  };

  const infoIconStyle = {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
  };

  const infoLabelStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    marginBottom: '0.5rem',
    fontWeight: '500',
  };

  const infoValueStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: isDarkMode ? '#f3f4f6' : '#1f2937',
  };

  const forecastStyle = {
    marginTop: '2rem',
  };

  const forecastTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const forecastCardsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.75rem',
  };

  const forecastCardStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...glassCardStyle,
  };

  const dayStyle = {
    fontSize: '0.95rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
  };

  const forecastIconStyle = {
    width: '50px',
    height: '50px',
    marginBottom: '0.75rem',
  };

  const forecastTempStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const highTempStyle = {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: isDarkMode ? '#f3f4f6' : '#1f2937',
  };

  const lowTempStyle = {
    fontSize: '0.95rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
  };

  if (loading) {
    return (
      <div style={loadingStyle}>
        <div className="spin" style={{
          width: '3rem',
          height: '3rem',
          border: `4px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
          borderTopColor: isDarkMode ? '#60a5fa' : '#3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        style={errorStyle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>{error}</p>
        <p style={{ 
          marginTop: '0.75rem', 
          fontSize: '0.875rem',
          color: isDarkMode ? '#9ca3af' : '#6b7280'
        }}>
          Try searching for a different location or check your API key.
        </p>
      </motion.div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const formatDay = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Ensure all icon URLs use HTTPS protocol
  const getSecureIconUrl = (iconUrl) => {
    if (iconUrl.startsWith('//')) {
      return `https:${iconUrl}`;
    } else if (iconUrl.startsWith('http://')) {
      return iconUrl.replace('http://', 'https://');
    }
    return iconUrl;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      style={containerStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={mainWeatherStyle}>
        <motion.div 
          style={currentWeatherStyle}
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div 
            style={locationContainerStyle}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <motion.div 
                style={locationNameStyle}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FaMapMarkerAlt style={locationIconStyle} aria-hidden="true" />
                <span>{weatherData.location.name}</span>
              </motion.div>
              {weatherData.location.country && (
                <motion.div 
                  style={countryNameStyle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {weatherData.location.country}
                </motion.div>
              )}
              <motion.div 
                style={weatherConditionStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {weatherData.current.condition.text}
              </motion.div>
            </div>
          </motion.div>
          
          <div style={tempAndIconStyle}>
            <motion.div 
              style={temperatureStyle}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              {Math.round(weatherData.current.temp_c)}°C
            </motion.div>
            <motion.img 
              src={getSecureIconUrl(weatherData.current.condition.icon)}
              alt={weatherData.current.condition.text}
              style={weatherIconStyle}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </motion.div>

        <div style={additionalInfoStyle}>
          <motion.div 
            style={infoCardStyle}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WiThermometer style={infoIconStyle} />
            <div style={infoLabelStyle}>Feels Like</div>
            <div style={infoValueStyle}>{Math.round(weatherData.current.feelslike_c)}°C</div>
          </motion.div>
          <motion.div 
            style={infoCardStyle}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WiHumidity style={infoIconStyle} />
            <div style={infoLabelStyle}>Humidity</div>
            <div style={infoValueStyle}>{weatherData.current.humidity}%</div>
          </motion.div>
          <motion.div 
            style={infoCardStyle}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WiStrongWind style={infoIconStyle} />
            <div style={infoLabelStyle}>Wind</div>
            <div style={infoValueStyle}>{weatherData.current.wind_kph} km/h</div>
          </motion.div>
          <motion.div 
            style={infoCardStyle}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <WiBarometer style={infoIconStyle} />
            <div style={infoLabelStyle}>Pressure</div>
            <div style={infoValueStyle}>{weatherData.current.pressure_mb} mb</div>
          </motion.div>
        </div>

        <motion.div 
          style={forecastStyle}
          variants={itemVariants}
        >
          <div style={forecastTitleStyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12h10"></path>
              <path d="M12 2v10"></path>
              <path d="M12 12l9 9"></path>
            </svg>
            3-Day Forecast
          </div>
          <div style={forecastCardsStyle}>
            {weatherData.forecast.forecastday.map((day, index) => (
              <motion.div 
                key={day.date} 
                style={forecastCardStyle}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                custom={index}
              >
                <div style={dayStyle}>
                  {index === 0 ? 'Today' : formatDay(day.date)}
                </div>
                <motion.img 
                  src={getSecureIconUrl(day.day.condition.icon)}
                  alt={day.day.condition.text}
                  style={forecastIconStyle}
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "loop" }}
                />
                <div style={forecastTempStyle}>
                  <span style={highTempStyle}>{Math.round(day.day.maxtemp_c)}°</span>
                  <span style={lowTempStyle}>{Math.round(day.day.mintemp_c)}°</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WeatherDisplay; 