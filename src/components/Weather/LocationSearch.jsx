import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { IoCloseCircle } from 'react-icons/io5';

const LocationSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const handler = (e) => {
      if (
        suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setSuggestions([]);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) return setSuggestions([]);

      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://api.weatherapi.com/v1/search.json`, {
          params: {
            key: import.meta.env.VITE_WEATHERAPI_KEY || '9513a5a96d5047b094a53030251002',
            q: query,
          },
        });
        setSuggestions(data || []);
      } catch (error) {
        console.error('Suggestion error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const locationString = suggestion.lat && suggestion.lon
      ? `${suggestion.lat},${suggestion.lon}`
      : `${suggestion.name}`;

    onSearch?.(locationString);
    
    setQuery(suggestion.name);
    setSuggestions([]);
  };

  const clearInput = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  // Styles
  const formStyle = {
    width: '100%',
    position: 'relative',
  };

  const inputWrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 2.75rem 0.75rem 2.75rem',
    borderRadius: '1.5rem',
    fontSize: '1rem',
    backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    color: isDarkMode ? '#e2e8f0' : '#1e293b',
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
    boxShadow: isDarkMode 
      ? '0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)' 
      : '0 4px 6px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 0.6)',
    transition: 'all 0.2s ease',
    outline: 'none',
    backdropFilter: 'blur(8px)',
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '1rem',
    fontSize: '1rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    pointerEvents: 'none',
  };

  const clearButtonStyle = {
    position: 'absolute',
    right: '3.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    cursor: 'pointer',
    display: query ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem',
    fontSize: '1.25rem',
  };

  const searchButtonStyle = {
    position: 'absolute',
    right: '0.25rem',
    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.9)',
    border: 'none',
    borderRadius: '50%',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    fontSize: '1rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s ease',
  };

  const loaderStyle = {
    position: 'absolute',
    right: '3.5rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    fontSize: '0.75rem',
    fontWeight: '500',
  };

  const searchResultsStyle = {
    position: 'absolute',
    top: 'calc(100% + 0.5rem)',
    left: 0,
    right: 0,
    maxHeight: '300px',
    overflowY: 'auto',
    backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '0.75rem',
    boxShadow: isDarkMode 
      ? '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)' 
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
    border: isDarkMode
      ? '1px solid rgba(255, 255, 255, 0.08)'
      : '1px solid rgba(0, 0, 0, 0.05)',
    zIndex: 1500,
  };

  const sectionTitleStyle = {
    padding: '0.75rem 1rem 0.5rem',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    borderBottom: isDarkMode 
      ? '1px solid rgba(255, 255, 255, 0.1)' 
      : '1px solid rgba(0, 0, 0, 0.05)',
  };

  const suggestionItemStyle = {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
    fontSize: '0.95rem',
  };

  const suggestionItemHoverStyle = {
    backgroundColor: isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.1)',
  };

  const countryStyle = {
    fontSize: '0.85rem',
    color: isDarkMode ? '#94a3b8' : '#64748b',
    marginLeft: '0.5rem',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={inputWrapperStyle}>
        <FaSearch style={searchIconStyle} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city or coordinates..."
          style={inputStyle}
          onFocus={() => setIsFocused(true)}
          autoComplete="off"
          aria-label="Search for a location"
        />
        {isLoading && <span style={loaderStyle}>Loading...</span>}
        <button
          type="button"
          style={clearButtonStyle}
          onClick={clearInput}
          aria-label="Clear search"
        >
          <IoCloseCircle />
        </button>
        <button
          type="submit"
          style={searchButtonStyle}
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </div>

      {suggestions.length > 0 && (
        <div style={searchResultsStyle} ref={suggestionsRef}>
          <div style={sectionTitleStyle}>Search Results</div>
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${index}`}
              style={{
                ...suggestionItemStyle,
                ...(index % 2 === 0
                  ? { backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'rgba(249, 250, 251, 0.5)' }
                  : {}),
              }}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseOver={(e) => Object.assign(e.currentTarget.style, suggestionItemHoverStyle)}
              onMouseOut={(e) => {
                Object.assign(e.currentTarget.style, {
                  backgroundColor: index % 2 === 0
                    ? (isDarkMode ? 'rgba(45, 55, 72, 0.5)' : 'rgba(249, 250, 251, 0.5)')
                    : 'transparent',
                });
              }}
            >
              <span>{suggestion.name}</span>
              <span style={countryStyle}>{suggestion.country}</span>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default LocationSearch;
