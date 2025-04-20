import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if the link is active
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ 
      backgroundColor: isDarkMode ? '#111827' : '#1d4ed8', 
      color: 'white', 
      boxShadow: isDarkMode 
        ? '0 4px 10px -1px rgba(0, 0, 0, 0.3)'
        : '0 4px 10px -1px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0.75rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ 
          fontSize: '1.35rem', 
          fontWeight: 'bold',
          margin: 0,
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Link 
            to="/" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            aria-label="Home"
          >
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </motion.svg>
            <span className="site-title" style={{
              '@media (max-width: 500px)': {
                fontSize: '1.1rem'
              }
            }}>
              Weather & News
            </span>
          </Link>
        </h1>
        
        {/* Desktop Navigation */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          '@media (max-width: 768px)': {
            display: 'none',
          }
        }}>
          <nav role="navigation" aria-label="Main navigation">
            <ul style={{ 
              display: 'flex', 
              listStyle: 'none',
              margin: 0,
              padding: 0,
              gap: '1.5rem'
            }}>
              <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: isActive('/') ? '600' : '500',
                  opacity: isActive('/') ? 1 : 0.85,
                  padding: '0.5rem 0',
                  borderBottom: isActive('/') ? '2px solid white' : 'none',
                  transition: 'opacity 0.2s ease, font-weight 0.2s ease',
                }}
                aria-current={isActive('/') ? 'page' : undefined}
                >
                  Dashboard
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/headlines-summary" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: isActive('/headlines-summary') ? '600' : '500',
                  opacity: isActive('/headlines-summary') ? 1 : 0.85,
                  padding: '0.5rem 0',
                  borderBottom: isActive('/headlines-summary') ? '2px solid white' : 'none',
                  transition: 'opacity 0.2s ease, font-weight 0.2s ease',
                }}
                aria-current={isActive('/headlines-summary') ? 'page' : undefined}
                >
                  Headlines
                </Link>
              </motion.li>
              <motion.li whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                <Link to="/today-in-history" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontWeight: isActive('/today-in-history') ? '600' : '500',
                  opacity: isActive('/today-in-history') ? 1 : 0.85,
                  padding: '0.5rem 0',
                  borderBottom: isActive('/today-in-history') ? '2px solid white' : 'none',
                  transition: 'opacity 0.2s ease, font-weight 0.2s ease',
                }}
                aria-current={isActive('/today-in-history') ? 'page' : undefined}
                >
                  History
                </Link>
              </motion.li>
            </ul>
          </nav>
          <motion.button 
            onClick={toggleTheme}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              marginLeft: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              outline: 'none',
            }}
            whileHover={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.svg 
                  key="sun"
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </motion.svg>
              ) : (
                <motion.svg 
                  key="moon"
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        
        {/* Mobile Menu Button */}
        <div style={{ 
          display: 'none', 
          '@media (max-width: 768px)': {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }
        }}>
          <motion.button 
            onClick={toggleTheme}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              outline: 'none',
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDarkMode ? (
                <motion.svg 
                  key="sun"
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </motion.svg>
              ) : (
                <motion.svg 
                  key="moon"
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.3 }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
          
          <motion.button
            onClick={toggleMenu}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '0.5rem',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              backgroundColor: isDarkMode ? '#1e293b' : '#1e40af',
              borderTop: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
            }}
          >
            <nav 
              style={{ padding: '1rem' }}
              role="navigation" 
              aria-label="Mobile navigation"
            >
              <ul style={{ 
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <li>
                  <Link 
                    to="/" 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: isActive('/') 
                        ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)') 
                        : 'transparent',
                      fontWeight: isActive('/') ? '600' : '500',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive('/') ? 'page' : undefined}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/headlines-summary" 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: isActive('/headlines-summary') 
                        ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)') 
                        : 'transparent',
                      fontWeight: isActive('/headlines-summary') ? '600' : '500',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive('/headlines-summary') ? 'page' : undefined}
                  >
                    Headlines
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/today-in-history" 
                    style={{ 
                      color: 'white', 
                      textDecoration: 'none',
                      display: 'block',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: isActive('/today-in-history') 
                        ? (isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)') 
                        : 'transparent',
                      fontWeight: isActive('/today-in-history') ? '600' : '500',
                    }}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={isActive('/today-in-history') ? 'page' : undefined}
                  >
                    History
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 