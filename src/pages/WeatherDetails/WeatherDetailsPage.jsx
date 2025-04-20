import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt } from 'react-icons/fa';
import { WiThermometer, WiHumidity, WiStrongWind, WiBarometer, WiSunrise, WiSunset } from 'react-icons/wi';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import Layout from '../../components/Layout/Layout';
import { getWeatherIcon } from '../../utils/weatherIcons.jsx';

const WeatherDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const weatherData = location.state?.weatherData;

  const handleBack = () => {
    navigate(-1);
  };

  // Function to get secure icon URL
  const getSecureIconUrl = (iconUrl) => {
    if (!iconUrl) return '';
    if (iconUrl.startsWith('//')) {
      return `https:${iconUrl}`;
    } else if (iconUrl.startsWith('http://')) {
      return iconUrl.replace('http://', 'https://');
    }
    return iconUrl;
  };

  // Format time (e.g., for sunrise/sunset)
  const formatTime = (timeString) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return timeString;
    }
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

  const formatDay = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { weekday: 'long' });
    } catch (e) {
      return dateStr;
    }
  };

  const containerStyle = {
    maxWidth: '800px',
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

  const locationHeaderStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const locationNameStyle = {
    fontSize: '2rem',
    fontWeight: '700',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.25rem',
  };

  const locationIconStyle = {
    color: isDarkMode ? '#f59e0b' : '#f97316',
  };

  const currentWeatherStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  };

  const temperatureStyle = {
    fontSize: '4rem',
    fontWeight: '700',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    textShadow: isDarkMode 
      ? '0 0 15px rgba(96, 165, 250, 0.5)' 
      : '0 0 15px rgba(59, 130, 246, 0.2)',
  };

  const conditionStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const conditionIconStyle = {
    width: '5rem',
    height: '5rem',
  };

  const conditionTextStyle = {
    fontSize: '1.25rem',
    fontWeight: '500',
    color: isDarkMode ? '#e2e8f0' : '#334155',
    marginTop: '0.5rem',
  };

  const sectionTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    borderBottom: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    paddingBottom: '0.5rem',
  };

  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const detailItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
  };

  const detailIconStyle = {
    fontSize: '2rem',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
  };

  const detailLabelStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    fontWeight: '500',
  };

  const detailValueStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
  };

  const aqiSectionStyle = {
    marginBottom: '2rem',
  };

  const aqiGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1rem',
  };

  const aqiItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    borderRadius: '0.75rem',
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
  };

  const aqiLabelStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    fontWeight: '500',
    marginBottom: '0.5rem',
  };

  const aqiValueStyle = {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
  };

  const forecastSectionStyle = {
    marginBottom: '1rem',
  };

  const forecastGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  };

  const forecastCardStyle = {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.5)',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const dayStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    marginBottom: '1rem',
  };

  const forecastContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const forecastIconStyle = {
    width: '3.5rem',
    height: '3.5rem',
  };

  const forecastTempStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const highTempStyle = {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: isDarkMode ? '#f1f5f9' : '#0f172a',
  };

  const lowTempStyle = {
    fontSize: '1.125rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
  };

  const conditionSummaryStyle = {
    fontSize: '0.95rem',
    color: isDarkMode ? '#cbd5e1' : '#475569',
    textAlign: 'center',
  };

  if (!weatherData) {
    return (
      <Layout>
        <div style={containerStyle}>
          <div style={headerStyle}>
            <button style={backButtonStyle} onClick={handleBack}>
              <FaArrowLeft /> Back
            </button>
            <h1 style={titleStyle}>Weather Details</h1>
          </div>
          <div style={{
            ...cardStyle,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '3rem'
          }}>
            <p style={{ fontSize: '1.125rem', textAlign: 'center' }}>
              No weather data available. Please go back and search for a location.
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <button style={backButtonStyle} onClick={handleBack}>
            <FaArrowLeft /> Back
          </button>
          <h1 style={titleStyle}>Weather Details</h1>
        </div>

        <motion.div 
          style={cardStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div style={locationHeaderStyle}>
            <div style={locationNameStyle}>
              <FaMapMarkerAlt style={locationIconStyle} />
              {weatherData.location.name}
            </div>
            <div>
              {weatherData.location.region && `${weatherData.location.region}, `}
              {weatherData.location.country}
            </div>
          </div>

          <div style={currentWeatherStyle}>
            <div style={temperatureStyle}>
              {Math.round(weatherData.current.temp_c)}°C
            </div>
            <div style={conditionStyle}>
              <div style={{ ...conditionIconStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '5rem' }}>
                {getWeatherIcon(weatherData.current.condition.code, weatherData.current.is_day)}
              </div>
              <div style={conditionTextStyle}>
                {weatherData.current.condition.text}
              </div>
            </div>
          </div>

          <div>
            <h2 style={sectionTitleStyle}>Current Conditions</h2>
            <div style={detailsGridStyle}>
              <div style={detailItemStyle}>
                <WiThermometer style={detailIconStyle} />
                <div style={detailLabelStyle}>Feels Like</div>
                <div style={detailValueStyle}>{Math.round(weatherData.current.feelslike_c)}°C</div>
              </div>
              <div style={detailItemStyle}>
                <WiHumidity style={detailIconStyle} />
                <div style={detailLabelStyle}>Humidity</div>
                <div style={detailValueStyle}>{weatherData.current.humidity}%</div>
              </div>
              <div style={detailItemStyle}>
                <WiStrongWind style={detailIconStyle} />
                <div style={detailLabelStyle}>Wind</div>
                <div style={detailValueStyle}>{weatherData.current.wind_kph} km/h</div>
              </div>
              <div style={detailItemStyle}>
                <WiBarometer style={detailIconStyle} />
                <div style={detailLabelStyle}>Pressure</div>
                <div style={detailValueStyle}>{weatherData.current.pressure_mb} mb</div>
              </div>
              <div style={detailItemStyle}>
                <WiSunrise style={detailIconStyle} />
                <div style={detailLabelStyle}>Sunrise</div>
                <div style={detailValueStyle}>
                  {weatherData.forecast?.forecastday[0]?.astro?.sunrise || 'N/A'}
                </div>
              </div>
              <div style={detailItemStyle}>
                <WiSunset style={detailIconStyle} />
                <div style={detailLabelStyle}>Sunset</div>
                <div style={detailValueStyle}>
                  {weatherData.forecast?.forecastday[0]?.astro?.sunset || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {weatherData.current.air_quality && (
            <div style={aqiSectionStyle}>
              <h2 style={sectionTitleStyle}>Air Quality</h2>
              <div style={aqiGridStyle}>
                {weatherData.current.air_quality['us-epa-index'] !== undefined && (
                  <div style={aqiItemStyle}>
                    <div style={aqiLabelStyle}>EPA Index</div>
                    <div style={{
                      ...aqiValueStyle,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}>
                      <span style={{
                        display: 'inline-block',
                        width: '0.75rem',
                        height: '0.75rem',
                        borderRadius: '50%',
                        backgroundColor: getAqiInfo(weatherData.current.air_quality['us-epa-index']).color,
                      }}></span>
                      {getAqiInfo(weatherData.current.air_quality['us-epa-index']).label}
                    </div>
                  </div>
                )}
                {weatherData.current.air_quality.co && (
                  <div style={aqiItemStyle}>
                    <div style={aqiLabelStyle}>Carbon Monoxide (CO)</div>
                    <div style={aqiValueStyle}>{weatherData.current.air_quality.co.toFixed(1)} μg/m³</div>
                  </div>
                )}
                {weatherData.current.air_quality.o3 && (
                  <div style={aqiItemStyle}>
                    <div style={aqiLabelStyle}>Ozone (O₃)</div>
                    <div style={aqiValueStyle}>{weatherData.current.air_quality.o3.toFixed(1)} μg/m³</div>
                  </div>
                )}
                {weatherData.current.air_quality.pm2_5 && (
                  <div style={aqiItemStyle}>
                    <div style={aqiLabelStyle}>PM2.5</div>
                    <div style={aqiValueStyle}>{weatherData.current.air_quality.pm2_5.toFixed(1)} μg/m³</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {weatherData.forecast && weatherData.forecast.forecastday && (
            <div style={forecastSectionStyle}>
              <h2 style={sectionTitleStyle}>3-Day Forecast</h2>
              <div style={forecastGridStyle}>
                {weatherData.forecast.forecastday.map((day, index) => (
                  <div key={day.date} style={forecastCardStyle}>
                    <div style={dayStyle}>
                      {index === 0 ? 'Today' : formatDay(day.date)}
                    </div>
                    <div style={forecastContentStyle}>
                      <div style={{ ...forecastIconStyle, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3.5rem' }}>
                        {getWeatherIcon(day.day.condition.code, day.day.is_day)}
                      </div>
                      <div style={forecastTempStyle}>
                        <div style={highTempStyle}>{Math.round(day.day.maxtemp_c)}°C</div>
                        <div style={lowTempStyle}>{Math.round(day.day.mintemp_c)}°C</div>
                      </div>
                    </div>
                    <div style={conditionSummaryStyle}>
                      {day.day.condition.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default WeatherDetailsPage; 