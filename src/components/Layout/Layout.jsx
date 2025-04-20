import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.4,
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#0f172a' : '#f8fafc',
      color: isDarkMode ? '#f1f5f9' : '#333333',
      transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out'
    }}>
      <Header />
      <motion.main
        style={{ 
          flexGrow: 1,
          width: '100%',
          margin: '0 auto',
          padding: '1.5rem 0 3rem 0',
          display: 'flex',
          flexDirection: 'column',
        }}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.25rem',
          position: 'relative',
        }}>
          {children}
        </div>
      </motion.main>
      
    </div>
  );
};

export default Layout; 