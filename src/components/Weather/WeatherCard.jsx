import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaExclamationCircle } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import { FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import LocationSearch from './LocationSearch';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';
import axios from 'axios';

const WeatherCard = ({ isDetailPage = false }) => {
  const [searchedLocation, setSearchedLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // On mount, try to get the default location from localStorage
  useEffect(() => {
    loadDefaultLocation();
  }, []);
  
  const loadDefaultLocation = () => {
    setIsLoading(true);
    try {
      const defaultLocationJson = localStorage.getItem('defaultLocation');
      if (defaultLocationJson) {
        const defaultLocation = JSON.parse(defaultLocationJson);
        
        // Use lat,lon if available for more precise location
        if (defaultLocation.lat && defaultLocation.lon) {
          fetchWeatherData(`${defaultLocation.lat},${defaultLocation.lon}`);
        } else {
          fetchWeatherData(defaultLocation.name);
        }
        
        console.log('Loaded default location:', defaultLocation.name);
      } else {
        // If no saved location, default to auto:ip
        fetchWeatherData('auto:ip');
      }
    } catch (error) {
      console.error('Error loading default location:', error);
      setError('Could not load your saved location. Using your current location instead.');
      fetchWeatherData('auto:ip');
    }
  };

  const fetchWeatherData = async (location) => {
    if (!location) return;
    
    setIsLoading(true);
    setError(null);
    setSearchedLocation(location);
    
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
        
        // Save this location as the default
        saveAsDefaultLocation({
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
      // Provide more user-friendly error messages
      if (err.response?.status === 400) {
        setError('Location not found. Please try a different city name, postal code, or coordinates.');
      } else if (err.response?.status === 401 || err.response?.status === 403) {
        setError('API key error. Please check your weather API credentials.');
      } else if (err.response?.status >= 500) {
        setError('Weather service is temporarily unavailable. Please try again later.');
      } else {
        setError(
          err.response?.data?.error?.message || 
          'Unable to fetch weather data. Please try again with a different location.'
        );
      }
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const saveAsDefaultLocation = (locationData) => {
    if (!locationData || !locationData.name) return;
    
    try {
      localStorage.setItem('defaultLocation', JSON.stringify(locationData));
    } catch (error) {
      console.error('Error saving default location:', error);
    }
  };

  const handleLocationSearch = (locationValue) => {
    if (locationValue) {
      fetchWeatherData(locationValue);
    }
  };

  const handleRetry = () => {
    setError(null);
    loadDefaultLocation();
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on the search container or the header links
    if (e.target.closest('.search-container') || e.target.closest('.forecast-link')) {
      return;
    }
    
    if (weatherData) {
      navigate('/weather-details', { state: { weatherData } });
    }
  };

  // Get secure icon URL
  const getSecureIconUrl = (iconUrl) => {
    if (!iconUrl) return '';
    if (iconUrl.startsWith('//')) {
      return `https:${iconUrl}`;
    } else if (iconUrl.startsWith('http://')) {
      return iconUrl.replace('http://', 'https://');
    }
    return iconUrl;
  };

  // Get AQI color and label
  const getAqiInfo = (aqiValue) => {
    if (!aqiValue && aqiValue !== 0) return { color: '#9ca3af', label: 'N/A' };
    
    if (aqiValue <= 50) return { color: '#10b981', label: 'Good' };
    if (aqiValue <= 100) return { color: '#fbbf24', label: 'Moderate' };
    if (aqiValue <= 150) return { color: '#f97316', label: 'Unhealthy for Sensitive Groups' };
    if (aqiValue <= 200) return { color: '#ef4444', label: 'Unhealthy' };
    if (aqiValue <= 300) return { color: '#7c3aed', label: 'Very Unhealthy' };
    return { color: '#7f1d1d', label: 'Hazardous' };
  };

  const containerStyle = {
    backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: isDarkMode 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    backdropFilter: 'blur(10px)',
    position: 'relative',
    zIndex: 10,
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.7)' : 'rgba(249, 250, 251, 0.7)',
    position: 'relative',
    zIndex: 15,
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: isDarkMode ? '#f1f5f9' : '#1e293b',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  const sunIconStyle = {
    color: isDarkMode ? '#f59e0b' : '#f97316',
    fontSize: isDetailPage ? '2rem' : '1.75rem',
    filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.5))',
  };

  const linkStyle = {
    display: isDetailPage ? 'none' : 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: isDarkMode ? '#ffffff' : '#ffffff',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    background: isDarkMode ? 'rgba(37, 99, 235, 0.8)' : 'rgba(59, 130, 246, 0.8)',
    border: isDarkMode ? '1px solid rgba(96, 165, 250, 0.4)' : '1px solid rgba(59, 130, 246, 0.6)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transform: 'translateZ(0)',
  };

  const searchContainerStyle = {
    padding: '1rem 1.5rem',
    borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.4)' : 'rgba(249, 250, 251, 0.4)',
    position: 'relative',
    zIndex: 1000,
  };

  const contentStyle = {
    padding: isDetailPage ? '0.5rem' : '1rem 1.5rem 1.5rem',
    position: 'relative',
    zIndex: 1,
  };

  const errorStyle = {
    padding: '1.25rem',
    marginBottom: '1.25rem',
    borderRadius: '0.75rem',
    backgroundColor: isDarkMode ? 'rgba(127, 29, 29, 0.4)' : 'rgba(254, 226, 226, 0.7)',
    color: isDarkMode ? '#fecaca' : '#991b1b',
    fontSize: '0.95rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    border: isDarkMode ? '1px solid rgba(248, 113, 113, 0.2)' : '1px solid rgba(248, 113, 113, 0.4)',
  };

  const retryButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: isDarkMode ? '#fecaca' : '#991b1b',
    background: isDarkMode ? 'rgba(153, 27, 27, 0.2)' : 'rgba(252, 165, 165, 0.3)',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    width: 'fit-content',
    cursor: 'pointer',
    border: isDarkMode ? '1px solid rgba(248, 113, 113, 0.3)' : '1px solid rgba(248, 113, 113, 0.5)',
    transition: 'all 0.2s ease',
  };

  const emptyStateStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2.5rem 1.5rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    textAlign: 'center',
    background: isDarkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(241, 245, 249, 0.5)',
    borderRadius: '1rem',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const weatherContainerStyle = {
    borderRadius: '0.75rem',
    overflow: 'hidden',
    background: isDarkMode ? 'rgba(17, 24, 39, 0.5)' : 'rgba(255, 255, 255, 0.5)',
    backdropFilter: 'blur(8px)',
    padding: '1rem',
    border: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    textAlign: 'center',
  };

  const locationDisplayStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5rem 0',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
  };

  const locationPinStyle = {
    color: isDarkMode ? '#f59e0b' : '#f97316',
    fontSize: '1.25rem',
  };

  const mainWeatherStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem 0',
  };

  const temperatureDisplayStyle = {
    fontSize: '3.75rem',
    fontWeight: '700',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    textShadow: isDarkMode 
      ? '0 0 15px rgba(96, 165, 250, 0.5)' 
      : '0 0 15px rgba(59, 130, 246, 0.2)',
    marginBottom: '0.5rem',
    lineHeight: '1',
  };

  const conditionIconStyle = {
    width: '4rem',
    height: '4rem',
  };

  const aqiContainerStyle = {
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center',
    marginTop: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    background: isDarkMode 
      ? 'rgba(30, 41, 59, 0.4)' 
      : 'rgba(241, 245, 249, 0.6)',
  };

  const aqiLabelStyle = {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    marginBottom: '0.25rem',
  };

  const aqiValueStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const aqiBadgeStyle = (color) => ({
    display: 'inline-block',
    width: '0.75rem',
    height: '0.75rem',
    borderRadius: '50%',
    backgroundColor: color,
    marginRight: '0.25rem',
  });

  const placeholderIconStyle = {
    fontSize: '2.5rem', 
    marginBottom: '1.25rem', 
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    opacity: 0.9,
  };

  const moreDetailsTextStyle = {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem', 
    marginTop: '0.75rem',
  };

  const decorativeElements = () => (
    <>
      <div style={{
        position: 'absolute',
        top: '3rem',
        right: '2rem',
        width: '12rem',
        height: '12rem',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, rgba(59, 130, 246, 0) 70%)' 
          : 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(30px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} aria-hidden="true" />
      
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '1rem',
        width: '8rem',
        height: '8rem',
        background: isDarkMode 
          ? 'radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, rgba(244, 114, 182, 0) 70%)' 
          : 'radial-gradient(circle, rgba(244, 114, 182, 0.05) 0%, rgba(244, 114, 182, 0) 70%)',
        borderRadius: '50%',
        filter: 'blur(25px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} aria-hidden="true" />
    </>
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.1 : 0.4,
        staggerChildren: prefersReducedMotion ? 0 : 0.08
      }
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Animation styles
  const spinKeyframes = {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  };

  const spinAnimationStyle = {
    animation: 'spin 1s linear infinite',
  };

  return (
    <motion.div
      style={containerStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`weather-card ${isDarkMode ? 'dark' : 'light'}`}
      onClick={handleCardClick}
    >
      <div style={headerStyle}>
        <motion.div style={titleStyle} variants={itemVariants}>
          <WiDaySunny style={sunIconStyle} aria-hidden="true" />
          Weather
        </motion.div>
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="forecast-link"
        >
          <Link to="/weather-forecast" style={linkStyle}>
            View Forecast <FiChevronRight style={{ marginLeft: '0.25rem' }} />
          </Link>
        </motion.div>
      </div>

      <motion.div style={searchContainerStyle} variants={itemVariants} className="search-container">
        <LocationSearch onSearch={handleLocationSearch} />
      </motion.div>

      <motion.div style={contentStyle} variants={itemVariants}>
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              style={errorStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <FaExclamationCircle style={{ marginTop: '0.15rem' }} />
                <span>{error}</span>
              </div>
              <div
                onClick={handleRetry}
                style={retryButtonStyle}
                role="button"
                tabIndex={0}
              >
                <FiRefreshCw /> Try Again
              </div>
            </motion.div>
          )}

          {isLoading ? (
            <motion.div
              key="loading"
              style={{
                padding: '2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <LoadingSpinner size={40} color={isDarkMode ? '#60a5fa' : '#3b82f6'} />
            </motion.div>
          ) : weatherData ? (
            <motion.div
              key="weather"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={weatherContainerStyle}
              whileHover={{ 
                transform: 'translateY(-5px)',
                boxShadow: isDarkMode 
                  ? '0 15px 30px rgba(0, 0, 0, 0.25)' 
                  : '0 15px 30px rgba(0, 0, 0, 0.1)' 
              }}
            >
              <div style={locationDisplayStyle}>
                <FaMapMarkerAlt style={locationPinStyle} />
                <span>{weatherData.location.name}, {weatherData.location.country}</span>
              </div>

              <div style={mainWeatherStyle}>
                <div style={temperatureDisplayStyle}>
                  {Math.round(weatherData.current.temp_c)}°C
                </div>
                {weatherData.current.condition.icon && (
                  <img 
                    src={getSecureIconUrl(weatherData.current.condition.icon)} 
                    alt={weatherData.current.condition.text} 
                    style={conditionIconStyle}
                  />
                )}
                
                {weatherData.current.air_quality && (
                  <div style={aqiContainerStyle}>
                    <div style={aqiLabelStyle}>AIR QUALITY</div>
                    {weatherData.current.air_quality['us-epa-index'] !== undefined ? (
                      <div style={aqiValueStyle}>
                        <span style={aqiBadgeStyle(getAqiInfo(weatherData.current.air_quality['us-epa-index']).color)}></span>
                        {getAqiInfo(weatherData.current.air_quality['us-epa-index']).label}
                      </div>
                    ) : (
                      <div style={aqiValueStyle}>Not Available</div>
                    )}
                  </div>
                )}

                <div style={moreDetailsTextStyle}>
                  Tap for more details <FiChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              style={emptyStateStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaSearch style={placeholderIconStyle} />
              <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                Search for a location to see weather information
              </p>
              <p style={{ fontSize: '0.875rem' }}>
                You can search by city name, postal code, or coordinates
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {decorativeElements()}
    </motion.div>
  );
};

export default WeatherCard;