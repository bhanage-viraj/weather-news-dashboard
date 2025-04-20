import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const HeadlinesSummaryButton = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  return (
    <button
      onClick={() => navigate('/headlines-summary')}
      style={{
        backgroundColor: isDarkMode ? '#1e40af' : '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: '0.375rem',
        padding: '0.75rem 1rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? '#1e3a8a' : '#2563eb';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = isDarkMode ? '#1e40af' : '#3b82f6';
      }}a
    >
      <span style={{ marginRight: '8px' }}>📰</span>
      View Today's Headlines Summary
    </button>
  );
};

export default HeadlinesSummaryButton; 