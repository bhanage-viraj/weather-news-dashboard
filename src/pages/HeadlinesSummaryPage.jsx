import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { fetchNews } from '../api/newsApi';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';

const HeadlinesSummaryPage = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const loadTopHeadlines = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch top headlines from various categories
        const categories = ['general', 'business', 'technology', 'entertainment', 'health', 'science', 'sports'];
        const headlinesData = {};
        
        for (const category of categories) {
          const response = await fetchNews({
            countries: 'in',
            categories: category,
            limit: 3, // Get top 3 headlines per category
            sort: 'published_desc'
          });
          
          if (response && response.data && response.data.length > 0) {
            headlinesData[category] = response.data;
          }
        }
        
        setHeadlines(headlinesData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch headlines summary:', err);
        // Since the API now falls back to mock data, this error handler will rarely be called
        // But we keep it for unexpected errors
        setError('An unexpected error occurred. Please try again later.');
        setLoading(false);
      }
    };
    
    loadTopHeadlines();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '8px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0,0,0,0.2)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
    padding: '16px',
    marginBottom: '20px'
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '16px',
    color: isDarkMode ? '#f1f5f9' : '#1f2937',
    borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
    paddingBottom: '8px'
  };

  const categoryHeadingStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginTop: '24px',
    marginBottom: '12px',
    color: isDarkMode ? '#f1f5f9' : '#1f2937',
    display: 'flex',
    alignItems: 'center'
  };

  const headlineItemStyle = {
    borderLeft: `3px solid ${isDarkMode ? '#3b82f6' : '#3b82f6'}`,
    paddingLeft: '12px',
    marginBottom: '16px',
    transition: 'transform 0.2s',
    cursor: 'pointer'
  };

  const headlineTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
    color: isDarkMode ? '#f1f5f9' : '#1f2937'
  };

  const headlineSourceStyle = {
    fontSize: '12px',
    color: isDarkMode ? '#94a3b8' : '#6b7280'
  };

  const getCategoryIcon = (category) => {
    const icons = {
      general: '📰',
      business: '💼',
      technology: '💻',
      entertainment: '🎬',
      health: '🏥',
      science: '🔬',
      sports: '⚽'
    };
    
    return icons[category] || '📰';
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div style={{
          backgroundColor: isDarkMode ? '#450a0a' : '#fee2e2',
          borderLeft: `4px solid ${isDarkMode ? '#b91c1c' : '#ef4444'}`,
          color: isDarkMode ? '#fecaca' : '#b91c1c',
          padding: '1rem',
          borderRadius: '0.375rem'
        }}>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Today's Headlines Summary</h1>
        <p style={{ 
          marginBottom: '24px',
          color: isDarkMode ? '#cbd5e1' : '#4b5563'
        }}>
          A summary of the top stories from various categories for {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        
        {Object.keys(headlines).map(category => (
          <div key={category}>
            <h2 style={categoryHeadingStyle}>
              <span style={{ marginRight: '8px' }}>{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            
            {headlines[category].map((headline, index) => (
              <a 
                key={`${headline.title}-${index}`}
                href={headline.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <div 
                  style={headlineItemStyle} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(8px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <h3 style={headlineTitleStyle}>
                    {headline.title}
                  </h3>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '12px',
                    color: isDarkMode ? '#94a3b8' : '#6b7280'
                  }}>
                    <span style={headlineSourceStyle}>Source: {headline.source}</span>
                    <span>{formatDate(headline.published_at)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default HeadlinesSummaryPage; 