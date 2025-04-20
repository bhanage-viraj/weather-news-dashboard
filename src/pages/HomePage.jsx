import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import NewsList from '../components/News/NewsList';
import TopicsFilter from '../components/News/TopicsFilter';
import WeatherCard from '../components/Weather/WeatherCard';
import SearchBar from '../components/Search/SearchBar';
import HeadlinesSummaryButton from '../components/HeadlinesSummaryButton';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchKeywords, setSearchKeywords] = useState('');
  const { isDarkMode } = useTheme();

  const handleSearch = (query) => {
    setSearchKeywords(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchKeywords(''); // Clear search when changing category
  };

  // Dynamic styles
  const mainContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  };

  const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 350px',
    gap: '2rem',
    marginTop: '1.5rem',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr',
    }
  };

  const newsContainerStyle = {
    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
    borderRadius: '0.75rem',
    boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.2)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '1.5rem',
    marginBottom: '2rem',
  };

  const headerStyle = {
    padding: '0.5rem 0 1.5rem 0',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
    marginBottom: '1.5rem',
  };

  const historyLinkStyle = {
    backgroundColor: isDarkMode ? '#4f46e5' : '#3b82f6',
    color: 'white',
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    boxShadow: isDarkMode ? '0 4px 6px rgba(79, 70, 229, 0.3)' : '0 4px 6px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.2s ease',
  };

  return (
    <Layout>
      <div style={mainContainerStyle}>
        <div style={gridContainerStyle}>
          {/* Main Content - News */}
          <div>
            <div style={newsContainerStyle}>
              <div style={headerStyle}>
                <h1 style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '700', 
                  marginBottom: '1rem',
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
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
                  >
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                    <path d="M18 14h-8"></path>
                    <path d="M15 18h-5"></path>
                    <path d="M10 6h8v4h-8V6Z"></path>
                  </svg>
                  Latest News
                </h1>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                  <SearchBar onSearch={handleSearch} />
                  
                  <TopicsFilter 
                    selectedCategory={selectedCategory} 
                    onCategoryChange={handleCategoryChange} 
                  />
                </div>
              </div>
              
              <div>
                <h2 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '600', 
                  marginBottom: '1.5rem',
                  color: isDarkMode ? '#f1f5f9' : '#1f2937'
                }}>
                  {searchKeywords 
                    ? `Search Results for "${searchKeywords}"` 
                    : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
                </h2>
                
                <NewsList 
                  category={selectedCategory} 
                  keywords={searchKeywords} 
                />
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link to="/headlines-summary" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
                color: isDarkMode ? '#f3f4f6' : '#1f2937',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontWeight: '500',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                View Headlines Summary
              </Link>
            </div>
          </div>

          {/* Sidebar - Weather and History */}
          <div>
            {/* Weather Card */}
            <div style={{ marginBottom: '2rem', position: 'sticky', top: '5.5rem' }}>
              <WeatherCard />
              
              <Link to="/today-in-history" style={historyLinkStyle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                View Today in History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 