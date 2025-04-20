import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          placeholder="Search for news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '0.5rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.a375rem 0 0 0.375rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0 0.375rem 0.375rem 0',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar; 