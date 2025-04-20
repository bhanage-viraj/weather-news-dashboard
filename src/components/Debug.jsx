import React, { Component, useEffect } from 'react';

// Add global error handler
export const ErrorLogger = () => {
  useEffect(() => {
    // Save original console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    // Override console.error
    console.error = (...args) => {
      // Log to original console
      originalConsoleError.apply(console, args);
      
      // Add error to DOM for visibility
      const errorContainer = document.getElementById('error-log-container') || createErrorContainer();
      const errorElement = document.createElement('div');
      errorElement.style.color = '#ef4444';
      errorElement.style.marginBottom = '8px';
      errorElement.innerText = `ERROR: ${args.map(arg => 
        typeof arg === 'string' ? arg : JSON.stringify(arg)
      ).join(' ')}`;
      errorContainer.appendChild(errorElement);
    };
    
    // Override console.warn
    console.warn = (...args) => {
      // Log to original console
      originalConsoleWarn.apply(console, args);
      
      // Add warning to DOM for visibility
      const errorContainer = document.getElementById('error-log-container') || createErrorContainer();
      const warnElement = document.createElement('div');
      warnElement.style.color = '#f59e0b';
      warnElement.style.marginBottom = '8px';
      warnElement.innerText = `WARNING: ${args.map(arg => 
        typeof arg === 'string' ? arg : JSON.stringify(arg)
      ).join(' ')}`;
      errorContainer.appendChild(warnElement);
    };
    
    // Add global error handler
    window.onerror = (message, source, lineno, colno, error) => {
      console.error(`GLOBAL ERROR: ${message}`, `Source: ${source}:${lineno}:${colno}`, error);
      return false;
    };
    
    // Add unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      console.error('UNHANDLED PROMISE REJECTION:', event.reason);
    });
    
    return () => {
      // Restore original console methods
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
      window.onerror = null;
      window.removeEventListener('unhandledrejection', () => {});
    };
  }, []);
  
  return null;
};

const createErrorContainer = () => {
  // Create a container for error logs if it doesn't exist
  const container = document.createElement('div');
  container.id = 'error-log-container';
  container.style.position = 'fixed';
  container.style.bottom = '0';
  container.style.left = '0';
  container.style.right = '0';
  container.style.maxHeight = '200px';
  container.style.overflowY = 'auto';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  container.style.color = 'white';
  container.style.padding = '10px';
  container.style.fontFamily = 'monospace';
  container.style.fontSize = '12px';
  container.style.zIndex = '9999';
  
  // Add a clear button
  const clearButton = document.createElement('button');
  clearButton.innerText = 'Clear Errors';
  clearButton.style.backgroundColor = '#1f2937';
  clearButton.style.color = 'white';
  clearButton.style.border = 'none';
  clearButton.style.padding = '5px 10px';
  clearButton.style.marginBottom = '10px';
  clearButton.style.borderRadius = '4px';
  clearButton.style.cursor = 'pointer';
  clearButton.onclick = () => {
    container.innerHTML = '';
    container.appendChild(clearButton);
  };
  
  container.appendChild(clearButton);
  document.body.appendChild(container);
  return container;
};

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          margin: '2rem',
          padding: '1rem',
          backgroundColor: '#fee2e2',
          border: '1px solid #ef4444',
          borderRadius: '0.5rem',
          color: '#b91c1c'
        }}>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
            <summary>Show Error Details</summary>
            <p>{this.state.error && this.state.error.toString()}</p>
            <p>Component Stack:</p>
            <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 