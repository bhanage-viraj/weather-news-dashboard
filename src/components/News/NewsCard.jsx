import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const NewsCard = ({ news }) => {
  const [imageError, setImageError] = useState(false);
  const [defaultImage, setDefaultImage] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Generate a random image based on category
  useEffect(() => {
    setDefaultImage(getCategoryImage(news.category, news.title));
    
    // Check if this news item is bookmarked
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    setIsBookmarked(bookmarks.some(item => item.url === news.url));
  }, [news.category, news.title, news.url]);
  
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

  const handleImageError = () => {
    setImageError(true);
  };
  
  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmarks = JSON.parse(localStorage.getItem('newsBookmarks') || '[]');
    
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarks.filter(item => item.url !== news.url);
      localStorage.setItem('newsBookmarks', JSON.stringify(updatedBookmarks));
    } else {
      // Add to bookmarks
      bookmarks.push({
        ...news,
        bookmarkedAt: new Date().toISOString()
      });
      localStorage.setItem('newsBookmarks', JSON.stringify(bookmarks));
    }
    
    setIsBookmarked(!isBookmarked);
    
    // Dispatch a custom event for other components to react to bookmark changes
    window.dispatchEvent(new CustomEvent('bookmarkChanged', {
      detail: {
        newsItem: news,
        isBookmarked: !isBookmarked
      }
    }));
  };

  // Default image based on category with variation
  const getCategoryImage = (category, title) => {
    const seed = hashString(title || '');
    
    // Multiple image options per category
    const categoryMap = {
      general: [
        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      business: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      technology: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      entertainment: [
        'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      health: [
        'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      science: [
        'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576086213369-97a306d36557?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ],
      sports: [
        'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1471295253337-3ceaaedca402?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
      ]
    };
    
    // Normalize category name
    const normalizedCategory = (category || 'general').toLowerCase();
    
    // Get array of images for this category or use general if not found
    const imageArray = categoryMap[normalizedCategory] || categoryMap.general;
    
    // Use the seed to pick a specific image
    const imageIndex = seed % imageArray.length;
    
    return imageArray[imageIndex];
  };
  
  // Simple hash function to generate consistent results for the same title
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? '#1e293b' : 'white',
    borderRadius: '8px',
    boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0,0,0,0.2)' : '0 4px 6px -1px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    marginBottom: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease'
  };

  const imageContainerStyle = { 
    height: '200px', 
    overflow: 'hidden', 
    position: 'relative' 
  };

  const defaultImageContainerStyle = { 
    height: '200px', 
    backgroundColor: isDarkMode ? '#334155' : '#f3f4f6', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative'
  };

  const imageStyle = { 
    width: '100%', 
    height: '100%', 
    objectFit: 'cover',
    transition: 'transform 0.3s ease'
  };

  const categoryLabelContainerStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '8px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    color: 'white'
  };

  const categoryLabelStyle = { 
    backgroundColor: '#3b82f6', 
    color: 'white',
    fontSize: '12px',
    fontWeight: '500',
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'inline-block'
  };

  const contentContainerStyle = { 
    padding: '16px', 
    flexGrow: 1, 
    display: 'flex', 
    flexDirection: 'column' 
  };

  const dateStyle = { 
    fontSize: '12px', 
    color: isDarkMode ? '#94a3b8' : '#6b7280' 
  };

  const titleStyle = { 
    fontSize: '18px', 
    fontWeight: '600', 
    color: isDarkMode ? '#f1f5f9' : '#1f2937',
    marginBottom: '8px',
    lineHeight: '1.3'
  };

  const descriptionStyle = { 
    fontSize: '14px', 
    color: isDarkMode ? '#cbd5e1' : '#4b5563', 
    marginBottom: '16px',
    flexGrow: 1,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const footerStyle = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto' 
  };

  const sourceStyle = { 
    fontSize: '12px', 
    color: isDarkMode ? '#94a3b8' : '#6b7280' 
  };

  const readMoreStyle = { 
    fontSize: '14px', 
    fontWeight: '500', 
    textDecoration: 'none',
    padding: '6px 12px',
    backgroundColor: isDarkMode ? '#1e40af' : '#eff6ff',
    color: isDarkMode ? 'white' : '#2563eb',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  const bookmarkIconStyle = {
    cursor: 'pointer',
    color: isBookmarked ? '#f59e0b' : isDarkMode ? '#94a3b8' : '#6b7280',
    fontSize: '24px',
    transition: 'color 0.2s ease, transform 0.2s ease',
  };

  return (
    <motion.div 
      style={cardStyle}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {(news.image && !imageError) ? (
        <div style={imageContainerStyle}>
          <img 
            src={news.image} 
            alt={news.title} 
            style={imageStyle}
            onError={handleImageError}
          />
          <div style={categoryLabelContainerStyle}>
            <span style={categoryLabelStyle}>
              {news.category || 'General'}
            </span>
          </div>
        </div>
      ) : (
        <div style={defaultImageContainerStyle}>
          <img 
            src={defaultImage} 
            alt={news.category || 'News'} 
            style={Object.assign({}, imageStyle, { opacity: 0.7 })}
          />
          <div style={categoryLabelContainerStyle}>
            <span style={categoryLabelStyle}>
              {news.category || 'General'}
            </span>
          </div>
        </div>
      )}
      <div style={contentContainerStyle}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
          <span style={dateStyle}>{formatDate(news.published_at)}</span>
        </div>
        <h3 style={titleStyle}>
          {news.title}
        </h3>
        <p style={descriptionStyle}>
          {news.description}
        </p>
        <div style={footerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={sourceStyle}>Source: {news.source}</span>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleBookmark}
              style={bookmarkIconStyle}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              )}
            </motion.div>
          </div>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            style={readMoreStyle}
          >
            Read More
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard; 