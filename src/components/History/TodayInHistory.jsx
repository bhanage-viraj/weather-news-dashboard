import React, { useState, useEffect } from 'react';
import { fetchHistoricalEvents } from '../../api/historyApi';
import { useTheme } from '../../context/ThemeContext';

const TodayInHistory = () => {
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Events');
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadHistoricalData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Get current date
        const today = new Date();
        const month = today.getMonth() + 1; // getMonth() is zero-based
        const day = today.getDate();
        
        const data = await fetchHistoricalEvents(month, day);
        setHistoryData(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load historical data:', err);
        setError('Failed to load historical data. Please try again.');
        setLoading(false);
      }
    };
    
    loadHistoricalData();
  }, []);

  // Styling
  const containerStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    borderRadius: '0.5rem',
    boxShadow: isDarkMode 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  };

  const headerStyle = {
    padding: '1.25rem 1.5rem',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle = {
    marginRight: '0.75rem',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
  };

  const dateStyle = {
    fontSize: '0.875rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    marginTop: '0.25rem',
  };

  const tabsStyle = {
    display: 'flex',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
    scrollbarWidth: 'none', // Hide scrollbar in Firefox
  };

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.25rem',
    fontSize: '0.875rem',
    fontWeight: isActive ? '600' : '500',
    color: isActive 
      ? (isDarkMode ? '#60a5fa' : '#3b82f6') 
      : (isDarkMode ? '#9ca3af' : '#6b7280'),
    borderBottom: isActive 
      ? `2px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}` 
      : '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  });

  const contentStyle = {
    padding: '1.25rem 1.5rem',
    maxHeight: '30rem',
    overflowY: 'auto',
  };

  const eventItemStyle = {
    marginBottom: '1.25rem',
    paddingBottom: '1.25rem',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
  };

  const yearStyle = {
    display: 'inline-block',
    fontWeight: '600',
    fontSize: '0.875rem',
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
  };

  const eventTextStyle = {
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    fontSize: '0.9375rem',
    lineHeight: '1.5',
  };

  const linkStyle = {
    color: isDarkMode ? '#60a5fa' : '#3b82f6',
    textDecoration: 'underline',
    fontWeight: '500',
    transition: 'color 0.2s ease',
  };

  const emptyStateStyle = {
    padding: '3rem 1.5rem',
    textAlign: 'center',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={iconStyle}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Today in History
          </h2>
        </div>
        <div style={emptyStateStyle}>
          <div style={{
            display: 'inline-block',
            width: '3rem',
            height: '3rem',
            border: `3px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
            borderTopColor: isDarkMode ? '#60a5fa' : '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '1rem' }}>Loading historical events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h2 style={titleStyle}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={iconStyle}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Today in History
          </h2>
        </div>
        <div style={emptyStateStyle}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={{ color: '#ef4444', marginBottom: '1rem' }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!historyData) {
    return null;
  }

  // Format date nicely
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  // Get the events for the selected category
  const events = historyData.data[activeCategory] || [];
  
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            style={iconStyle}
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Today in History
        </h2>
        <div style={dateStyle}>{formattedDate}</div>
      </div>
      
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
                <div style={{ marginTop: '0.5rem' }}>
                  {event.links.map((link, linkIndex) => (
                    <a 
                      key={linkIndex}
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        ...linkStyle,
                        marginRight: linkIndex < event.links.length - 1 ? '0.75rem' : 0
                      }}
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div style={emptyStateStyle}>
            <p>No {activeCategory.toLowerCase()} found for this date.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayInHistory; 