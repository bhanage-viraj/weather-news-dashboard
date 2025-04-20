import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getWeatherIcon } from '../../utils/weatherIcons.jsx';
import { motion } from 'framer-motion';

const WeatherForecast = ({ forecast }) => {
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [forecast]);

  if (!forecast || !forecast.forecastday) {
    return null;
  }

  const containerStyle = {
    marginTop: '1.5rem',
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: isDarkMode 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease',
    border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'}`,
    backdropFilter: 'blur(8px)',
  };

  const titleStyle = {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1rem',
    borderBottom: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'}`,
    paddingBottom: '0.5rem',
    color: isDarkMode ? '#e2e8f0' : '#1a202c',
    transition: 'color 0.3s ease',
  };

  const forecastGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '0.75rem',
  };

  const dayCardStyle = {
    padding: '0.75rem',
    borderRadius: '0.5rem',
    backgroundColor: isDarkMode ? 'rgba(23, 34, 51, 0.7)' : 'rgba(249, 250, 251, 0.7)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    border: `1px solid ${isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(226, 232, 240, 0.8)'}`,
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: isDarkMode 
        ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
        : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
  };

  const dayNameStyle = {
    fontSize: '0.875rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: isDarkMode ? '#e2e8f0' : '#1a202c',
    transition: 'color 0.3s ease',
  };

  const iconStyle = {
    fontSize: '2rem',
    margin: '0.5rem 0',
    color: isDarkMode ? '#90cdf4' : '#4299e1',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  };

  const tempStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem',
  };

  const highTempStyle = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: isDarkMode ? '#f59e0b' : '#d97706',
    transition: 'color 0.3s ease',
  };

  const lowTempStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    transition: 'color 0.3s ease',
  };

  // Get day name from date
  const getDayName = (dateStr) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateStr);
    return days[date.getDay()];
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Determine the title based on the number of days available
  const daysCount = forecast.forecastday.length;
  const forecastTitle = `${daysCount}-Day Forecast`;

  return (
    <motion.div 
      style={containerStyle}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <h3 style={titleStyle}>{forecastTitle}</h3>
      <div style={forecastGridStyle}>
        {forecast.forecastday.map((day, index) => (
          <motion.div 
            key={day.date}
            style={dayCardStyle}
            variants={itemVariants}
            whileHover={{ y: -4, boxShadow: isDarkMode 
              ? '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)' 
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
          >
            <div style={dayNameStyle}>
              {index === 0 ? 'Today' : getDayName(day.date)}
            </div>
            <motion.div 
              style={iconStyle}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {getWeatherIcon(day.day.condition.code, day.day.is_day)}
            </motion.div>
            <div style={tempStyle}>
              <span style={highTempStyle}>{Math.round(day.day.maxtemp_c)}°</span>
              <span style={lowTempStyle}>{Math.round(day.day.mintemp_c)}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WeatherForecast; 