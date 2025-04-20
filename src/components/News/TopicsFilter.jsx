import React from 'react';

const TopicsFilter = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'general', name: 'General' },
    { id: 'business', name: 'Business' },
    { id: 'entertainment', name: 'Entertainment' },
    { id: 'health', name: 'Health' },
    { id: 'science', name: 'Science' },
    { id: 'sports', name: 'Sports' },
    { id: 'technology', name: 'Technology' },
  ];

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Topics</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              backgroundColor: selectedCategory === category.id ? '#2563eb' : '#f3f4f6',
              color: selectedCategory === category.id ? 'white' : '#1f2937',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopicsFilter; 