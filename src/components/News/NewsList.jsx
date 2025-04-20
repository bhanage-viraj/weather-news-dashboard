import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../api/newsApi';
import NewsCard from './NewsCard';
import { useTheme } from '../../context/ThemeContext';

const NewsList = ({ category, keywords }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'bookmarked'
  const [bookmarkedNews, setBookmarkedNews] = useState([]);
  const { isDarkMode } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  // Add media query detection for responsive grid
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine number of columns based on window width
  const getGridColumns = () => {
    if (windowWidth >= 1024) {
      return 'repeat(3, 1fr)';
    } else if (windowWidth >= 768) {
      return 'repeat(2, 1fr)';
    } else {
      return 'repeat(1, 1fr)';
    }
  };

  // Fetch news when category, keywords, or page changes
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          countries: 'in',
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage,
        };
        
        // Add category filter if provided
        if (category && category !== 'general') {
          params.categories = category;
        }
        
        // Add keywords filter if provided
        if (keywords) {
          params.keywords = keywords;
        }
        
        const response = await fetchNews(params);
        setNews(response.data);
        
        const total = response.pagination.total;
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (err) {
        // Since the API now falls back to mock data, this error handler will rarely be called
        // But we keep it for unexpected errors
        setError('An unexpected error occurred. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (activeTab === 'all') {
      loadNews();
    }
  }, [category, keywords, currentPage, activeTab]);

  // Handle bookmarked news
  useEffect(() => {
    // Load bookmarked news from localStorage
    loadBookmarkedNews();

    // Set up event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom bookmark events within the same window
    window.addEventListener('bookmarkChanged', loadBookmarkedNews);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('bookmarkChanged', loadBookmarkedNews);
    };
  }, []);

  // Reload bookmarks when switching to bookmarks tab
  useEffect(() => {
    if (activeTab === 'bookmarked') {
      loadBookmarkedNews();
    }
  }, [activeTab]);

  const handleStorageChange = (e) => {
    if (e.key === 'newsBookmarks') {
      loadBookmarkedNews();
    }
  };

  const loadBookmarkedNews = () => {
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    // Sort by bookmarked time (newest first)
    bookmarks.sort((a, b) => new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt));
    setBookmarkedNews(bookmarks);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerStyle = {
    overflow: 'hidden',
  };

  const tabsContainerStyle = {
    display: 'flex',
    marginBottom: '20px',
    borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
  };

  const tabStyle = (isActive) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isDarkMode ? (isActive ? '#ffffff' : '#94a3b8') : (isActive ? '#111827' : '#6b7280'),
    borderBottom: isActive ? `2px solid ${isDarkMode ? '#60a5fa' : '#3b82f6'}` : 'none',
    transition: 'all 0.3s ease',
  });

  const loadingStyle = {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '16rem'
  };

  const errorStyle = {
    backgroundColor: isDarkMode ? '#4a1c24' : '#fee2e2',
    borderLeft: '4px solid #ef4444',
    color: isDarkMode ? '#fca5a5' : '#b91c1c',
    padding: '1rem',
    borderRadius: '0.375rem'
  };

  const emptyStyle = {
    backgroundColor: isDarkMode ? '#4a481e' : '#fef3c7',
    borderLeft: '4px solid #f59e0b',
    color: isDarkMode ? '#fcd34d' : '#b45309',
    padding: '1rem',
    borderRadius: '0.375rem'
  };

  const emptyBookmarksStyle = {
    padding: '2rem',
    textAlign: 'center',
    color: isDarkMode ? '#94a3b8' : '#6b7280',
    backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
    borderRadius: '0.5rem',
    margin: '1rem 0',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: getGridColumns(),
    gap: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      <div style={tabsContainerStyle}>
        <div 
          style={tabStyle(activeTab === 'all')} 
          onClick={() => setActiveTab('all')}
        >
          All News
        </div>
        <div 
          style={tabStyle(activeTab === 'bookmarked')} 
          onClick={() => setActiveTab('bookmarked')}
        >
          Bookmarks ({bookmarkedNews.length})
        </div>
      </div>

      {activeTab === 'all' ? (
        <>
          {loading && (
            <div style={loadingStyle}>
              <div style={{
                animation: 'spin 1s linear infinite',
                border: '4px solid rgba(0, 0, 0, 0.1)',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                height: '3rem',
                width: '3rem'
              }}></div>
            </div>
          )}

          {error && <div style={errorStyle}><p>{error}</p></div>}

          {!loading && !error && news.length === 0 && (
            <div style={emptyStyle}>
              <p>No news found. Try adjusting your search criteria.</p>
            </div>
          )}

          {!loading && !error && news.length > 0 && (
            <div style={gridStyle}>
              {news.map((item, index) => (
                <NewsCard key={`${item.url}-${index}`} news={item} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          {bookmarkedNews.length === 0 ? (
            <div style={emptyBookmarksStyle}>
              <h3 style={{ marginBottom: '10px', fontSize: '1.2rem' }}>No bookmarked news yet</h3>
              <p>Click the bookmark icon on any news card to save it for later.</p>
            </div>
          ) : (
            <div style={gridStyle}>
              {bookmarkedNews.map((item, index) => (
                <NewsCard key={`${item.url}-${index}`} news={item} />
              ))}
            </div>
          )}
        </>
      )}

      {activeTab === 'all' && totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '2rem' 
        }}>
          <nav style={{ 
            display: 'inline-flex', 
            borderRadius: '0.375rem', 
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' 
          }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem 0 0 0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: currentPage === 1 ? '#f3f4f6' : 'white',
                color: currentPage === 1 ? '#9ca3af' : '#2563eb',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  onClick={() => handlePageChange(pageNum)}
                  style={{
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: currentPage === pageNum ? '#2563eb' : 'white',
                    color: currentPage === pageNum ? 'white' : '#2563eb',
                    border: 'none'
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0 0.375rem 0.375rem 0',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: currentPage === totalPages ? '#f3f4f6' : 'white',
                color: currentPage === totalPages ? '#9ca3af' : '#2563eb',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                border: 'none'
              }}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default NewsList; 