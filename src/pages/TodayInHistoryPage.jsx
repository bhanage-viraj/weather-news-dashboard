import React, { useState, useEffect } from 'react';
import { fetchHistoricalEvents } from '../api/historyApi';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const TodayInHistoryPage = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Events');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return {
      month: today.getMonth() + 1,
      day: today.getDate()
    };
  });
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadHistoricalData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchHistoricalEvents(selectedDate.month, selectedDate.day);
        setHistoryData(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load historical data:', err);
        setError('Failed to load historical data. Please try again.');
        setLoading(false);
      }
    };
    
    loadHistoricalData();
  }, [selectedDate.month, selectedDate.day]);

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    setSelectedDate({
      month: date.getMonth() + 1,
      day: date.getDate()
    });
  };

  // Format date for input field
  const formatDateForInput = () => {
    const date = new Date();
    date.setMonth(selectedDate.month - 1);
    date.setDate(selectedDate.day);
    return `${date.getFullYear()}-${String(selectedDate.month).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
  };

  // Styling
  const pageStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  };

  const headerStyle = {
    marginBottom: '2rem',
    textAlign: 'center',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    marginBottom: '0.5rem',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    marginBottom: '2rem',
  };

  const datePickerContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '1rem',
  };

  const datePickerStyle = {
    padding: '0.625rem 1rem',
    backgroundColor: isDarkMode ? '#374151' : '#fff',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    border: `1px solid ${isDarkMode ? '#4b5563' : '#d1d5db'}`,
    borderRadius: '0.375rem',
    fontSize: '1rem',
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: isDarkMode 
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.4)' 
      : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const tabsContainerStyle = {
    backgroundColor: isDarkMode ? '#111827' : '#f8fafc',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e2e8f0'}`,
    padding: '0 1rem',
  };

  const tabsStyle = {
    display: 'flex',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  };

  const tabStyle = (isActive) => ({
    padding: '1rem 1.5rem',
    fontSize: '1rem',
    fontWeight: isActive ? '600' : '500',
    color: isActive 
      ? (isDarkMode ? '#60a5fa' : '#3b82f6') 
      : (isDarkMode ? '#9ca3af' : '#64748b'),
    borderBottom: isActive 
      ? `3px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}` 
      : '3px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const contentStyle = {
    padding: '2rem',
    maxHeight: '60vh',
    overflowY: 'auto',
  };

  const eventItemStyle = {
    marginBottom: '2rem',
    paddingBottom: '2rem',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e2e8f0'}`,
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const yearStyle = {
    display: 'inline-block',
    fontWeight: '700',
    fontSize: '1rem',
    color: 'white',
    backgroundColor: isDarkMode ? '#4f46e5' : '#3b82f6',
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    marginBottom: '0.75rem',
  };

  const eventTextStyle = {
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    fontSize: '1.125rem',
    lineHeight: '1.6',
  };

  const linksContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
  };

  const linkStyle = {
    color: 'white',
    backgroundColor: isDarkMode ? '#4f46e5' : '#3b82f6',
    textDecoration: 'none',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.2s ease',
    display: 'inline-block',
  };

  const buttonStyle = {
    padding: '0.625rem 1.25rem',
    backgroundColor: isDarkMode ? '#4f46e5' : '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  };

  const loadingContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '20rem',
    padding: '2rem',
  };
  
  const navLinkStyle = {
    display: 'inline-block',
    marginTop: '2rem',
    padding: '0.75rem 1.5rem',
    backgroundColor: isDarkMode ? '#4f46e5' : '#3b82f6',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    fontWeight: '500',
    boxShadow: isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.2)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  // Format date nicely
  const formattedDate = new Date(`${selectedDate.month}/${selectedDate.day}/2023`).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  if (loading) {
    return (
      <Layout>
        <div style={pageStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Today in History</h1>
            <p style={subtitleStyle}>Discover what happened on this day throughout history</p>
          </div>
          <div style={cardStyle}>
            <div style={loadingContainerStyle}>
              <div style={{
                width: '4rem',
                height: '4rem',
                border: `4px solid ${isDarkMode ? '#2d3748' : '#e2e8f0'}`,
                borderTopColor: isDarkMode ? '#60a5fa' : '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '1.5rem',
              }}></div>
              <p style={{ 
                fontSize: '1.125rem',
                color: isDarkMode ? '#a0aec0' : '#4a5568',
              }}>
                Loading historical events...
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/" style={navLinkStyle}>Back to Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={pageStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Today in History</h1>
            <p style={subtitleStyle}>Discover what happened on this day throughout history</p>
          </div>
          <div style={cardStyle}>
            <div style={loadingContainerStyle}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ 
                  color: '#ef4444',
                  marginBottom: '1.5rem',
                }}
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={{ 
                fontSize: '1.125rem',
                color: isDarkMode ? '#f87171' : '#ef4444',
                marginBottom: '1.5rem',
              }}>
                {error}
              </p>
              <button 
                onClick={() => loadHistoricalData()}
                style={buttonStyle}
              >
                Try Again
              </button>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/" style={navLinkStyle}>Back to Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!historyData) {
    return null;
  }

  // Get the events for the selected category
  const events = historyData.data[activeCategory] || [];

  return (
    <Layout>
      <div style={pageStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Today in History</h1>
          <p style={subtitleStyle}>Discover what happened on this day throughout history</p>
          
          <div style={datePickerContainerStyle}>
            <input 
              type="date" 
              value={formatDateForInput()}
              onChange={handleDateChange}
              style={datePickerStyle}
            />
            <button 
              onClick={() => {
                const today = new Date();
                setSelectedDate({
                  month: today.getMonth() + 1,
                  day: today.getDate()
                });
              }}
              style={buttonStyle}
            >
              Today
            </button>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{
            padding: '1.5rem 2rem',
            borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e2e8f0'}`,
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: isDarkMode ? '#e2e8f0' : '#1e293b',
              margin: 0
            }}>
              {formattedDate}
            </h2>
          </div>
          
          <div style={tabsContainerStyle}>
            <div style={tabsStyle}>
              {['Events', 'Births', 'Deaths'].map(category => (
                <div 
                  key={category}
                  style={tabStyle(category === activeCategory)}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          
          <div style={contentStyle}>
            {events.length > 0 ? (
              events.map((event, index) => (
                <div 
                  key={`${event.year}-${index}`} 
                  style={{
                    ...eventItemStyle,
                    borderBottom: index === events.length - 1 ? 'none' : eventItemStyle.borderBottom
                  }}
                >
                  <div style={yearStyle}>{event.year}</div>
                  <div style={eventTextStyle} dangerouslySetInnerHTML={{ __html: event.no_year_html }}></div>
                  
                  {event.links && event.links.length > 0 && (
                    <div style={linksContainerStyle}>
                      {event.links.map((link, linkIndex) => (
                        <a 
                          key={linkIndex}
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={linkStyle}
                        >
                          {link.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center',
                padding: '3rem 1rem',
                color: isDarkMode ? '#9ca3af' : '#6b7280',
              }}>
                <p style={{ fontSize: '1.125rem' }}>No {activeCategory.toLowerCase()} found for this date.</p>
              </div>
            )}
          </div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={navLinkStyle}>Back to Home</Link>
        </div>
      </div>
    </Layout>
  );
};

export default TodayInHistoryPage; 