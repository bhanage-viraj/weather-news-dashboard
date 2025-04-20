import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer style={{ 
      backgroundColor: isDarkMode ? '#0f172a' : '#1f2937', 
      color: 'white', 
      padding: '1.5rem 0', 
      marginTop: '2.5rem' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem' 
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Indian News Dashboard</h3>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#9ca3af', marginTop: '0.25rem' }}>Stay updated with latest news and more.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="#" style={{ color: isDarkMode ? '#94a3b8' : '#9ca3af', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}>About</a>
            <a href="#" style={{ color: isDarkMode ? '#94a3b8' : '#9ca3af', marginBottom: '0.5rem', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</a>
            <a href="#" style={{ color: isDarkMode ? '#94a3b8' : '#9ca3af', textDecoration: 'none', transition: 'color 0.2s' }}>Contact</a>
          </div>
        </div>
        <div style={{ 
          marginTop: '1.5rem', 
          borderTop: `1px solid ${isDarkMode ? '#1e293b' : '#374151'}`, 
          paddingTop: '1rem', 
          textAlign: 'center', 
          color: isDarkMode ? '#94a3b8' : '#9ca3af' 
        }}>
          <p>&copy; {new Date().getFullYear()} Indian News Dashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 