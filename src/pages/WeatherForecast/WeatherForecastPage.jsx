import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { WiDaySunny } from 'react-icons/wi';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import LocationSearch from '../../components/Weather/LocationSearch';
import WeatherForecast from '../../components/Weather/WeatherForecast';
import LoadingSpinner from '../../components/LoadingSpinner';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';

const WeatherForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to load the default location on component mount
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
    
    try {
      // Use the WeatherAPI.com endpoint with HTTPS
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
        params: {
          key: import.meta.env.VITE_WEATHERAPI_KEY || '9513a5a96d5047b094a53030251002',
          q: location,
          days: 7, // Get 7 days for the forecast
          aqi: 'yes',
          alerts: 'no',
        }
      });
      
      if (response.data) {
        console.log('Weather forecast data retrieved successfully');
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

  const handleLocationSearch = (locationValue) => {
    if (locationValue) {
      fetchWeatherData(locationValue);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleRetry = () => {
    loadDefaultLocation();
  };

  const containerStyle = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '1.5rem',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    fontSize: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem',
    marginRight: '1rem',
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
    fontSize: '1.75rem',
    filter: 'drop-shadow(0 0 8px rgba(251, 146, 60, 0.5))',
  };

  const cardStyle = {
    borderRadius: '1rem',
    overflow: 'hidden',
    background: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : 'rgba(255, 255, 255, 0.8)',
    boxShadow: isDarkMode 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    marginBottom: '2rem',
  };

  const searchContainerStyle = {
    marginBottom: '2rem',
  };

  const loadingContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    flexDirection: 'column',
    gap: '1rem',
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
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
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

  const locationInfoStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
  };

  const locationNameStyle = {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    marginBottom: '0.25rem',
  };

  const locationDetailsStyle = {
    fontSize: '1rem',
    color: isDarkMode ? '#cbd5e1' : '#475569',
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <button style={backButtonStyle} onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h1 style={titleStyle}>
            <WiDaySunny style={sunIconStyle} />
            Weather Forecast
          </h1>
        </div>

        <motion.div 
          style={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={searchContainerStyle}>
            <LocationSearch onSearch={handleLocationSearch} />
          </div>

          {isLoading ? (
            <div style={loadingContainerStyle}>
              <LoadingSpinner size={40} color={isDarkMode ? '#60a5fa' : '#3b82f6'} />
              <p>Loading forecast data...</p>
            </div>
          ) : error ? (
            <motion.div 
              style={errorStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{error}</p>
              <button 
                onClick={handleRetry} 
                style={retryButtonStyle}
              >
                <FiRefreshCw /> Try Again
              </button>
            </motion.div>
          ) : weatherData ? (
            <>
              <div style={locationInfoStyle}>
                <div style={locationNameStyle}>
                  {weatherData.location.name}
                </div>
                <div style={locationDetailsStyle}>
                  {weatherData.location.region && `${weatherData.location.region}, `}
                  {weatherData.location.country}
                </div>
              </div>
              
              <WeatherForecast forecast={weatherData.forecast} />
            </>
          ) : (
            <div style={loadingContainerStyle}>
              <p>Search for a location to see weather forecast</p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default WeatherForecastPage; 