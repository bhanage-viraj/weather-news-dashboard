import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'medium', color, text, showText = true }) => {
  const { isDarkMode } = useTheme();
  
  // Size can be a number or a preset size name
  let spinnerSize, strokeWidth;
  if (typeof size === 'number') {
    spinnerSize = size;
    strokeWidth = Math.max(3, Math.round(size / 10));
  } else {
    const sizes = {
      small: { spinner: 24, thickness: 3 },
      medium: { spinner: 40, thickness: 4 },
      large: { spinner: 60, thickness: 5 },
    };
    spinnerSize = sizes[size]?.spinner || sizes.medium.spinner;
    strokeWidth = sizes[size]?.thickness || sizes.medium.thickness;
  }
  
  const spinnerColor = color || (isDarkMode ? '#60a5fa' : '#3b82f6');
  const trackColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
  const textColor = isDarkMode ? '#e2e8f0' : '#4b5563';
  
  const defaultText = text !== undefined ? text : 'Loading...';
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
  };
  
  return (
    <div style={containerStyle}>
      <motion.div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          borderRadius: '50%',
          position: 'relative',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Track circle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: `${strokeWidth}px solid ${trackColor}`,
            borderRadius: '50%',
          }}
        />
        
        {/* Spinner circle */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: `${strokeWidth}px solid transparent`,
            borderTopColor: spinnerColor,
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: 'linear',
          }}
          className="spin"
        />
      </motion.div>
      
      {showText && defaultText && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          style={{
            fontSize: typeof size !== 'number' && size === 'large' ? '1rem' : '0.875rem',
            color: textColor,
            fontWeight: '500',
            marginTop: '0.5rem',
          }}
        >
          {defaultText}
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner; 