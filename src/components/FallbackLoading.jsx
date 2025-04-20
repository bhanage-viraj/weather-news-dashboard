import React from 'react';

const FallbackLoading = ({ message = "Loading content..." }) => {
  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      backgroundColor: '#f0f9ff',
      borderRadius: '0.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      margin: '1rem',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid rgba(59, 130, 246, 0.2)',
        borderLeft: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }} />
      <p style={{
        fontSize: '1rem',
        color: '#1e3a8a',
        fontWeight: '500'
      }}>
        {message}
      </p>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FallbackLoading; 