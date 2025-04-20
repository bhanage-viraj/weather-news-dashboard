import React from 'react';

// Conditionally import framer-motion with fallbacks for components
// This helps prevent runtime errors if framer-motion has issues loading
export const safeMotion = () => {
  try {
    return require('framer-motion');
  } catch (err) {
    console.warn('Framer Motion not loaded properly, using fallbacks');
    // Return fallback objects that mimic framer-motion API
    return {
      motion: {
        div: (props) => <div {...props} />,
        button: (props) => <button {...props} />,
        span: (props) => <span {...props} />,
        ul: (props) => <ul {...props} />,
        li: (props) => <li {...props} />,
        svg: (props) => <svg {...props} />,
        path: (props) => <path {...props} />,
        nav: (props) => <nav {...props} />,
        header: (props) => <header {...props} />,
        main: (props) => <main {...props} />,
        a: (props) => <a {...props} />,
        p: (props) => <p {...props} />,
        // Add more as needed
      },
      AnimatePresence: ({ children }) => <>{children}</>,
      useAnimation: () => ({
        start: () => Promise.resolve(),
        stop: () => {},
      }),
      useMotionValue: (initial) => ({ get: () => initial, set: () => {} }),
      useTransform: () => ({ get: () => 0, set: () => {} }),
    };
  }
};

// Fallback motion components if needed
export const MotionDiv = ({ children, ...props }) => {
  try {
    const { motion } = require('framer-motion');
    return <motion.div {...props}>{children}</motion.div>;
  } catch (err) {
    return <div {...props}>{children}</div>;
  }
};

export const MotionButton = ({ children, ...props }) => {
  try {
    const { motion } = require('framer-motion');
    return <motion.button {...props}>{children}</motion.button>;
  } catch (err) {
    return <button {...props}>{children}</button>;
  }
};

export const SafeAnimatePresence = ({ children, ...props }) => {
  try {
    const { AnimatePresence } = require('framer-motion');
    return <AnimatePresence {...props}>{children}</AnimatePresence>;
  } catch (err) {
    return <>{children}</>;
  }
};

export default safeMotion; 