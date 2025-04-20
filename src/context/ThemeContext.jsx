import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Safely check for browser environment
  const isBrowser = typeof window !== 'undefined';
  
  // Initialize state with a function to avoid execution during server-side rendering
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (!isBrowser) return false;
    
    try {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    } catch (error) {
      console.error('Error accessing localStorage or media query:', error);
      return false;
    }
  });

  // Apply theme classes and save preference
  useEffect(() => {
    if (!isBrowser) return;
    
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [isDarkMode, isBrowser]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};