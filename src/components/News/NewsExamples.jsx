import React, { useState, useEffect } from 'react';
import { fetchNews } from '../../api/newsApi';

const NewsExamples = () => {
  const [examples, setExamples] = useState({
    basic: null,
    withCategory: null,
    withKeywords: null,
    withCountries: null,
    withDateRange: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const loadExamples = async () => {
      try {
        // Basic example
        const basic = await fetchNews({
          limit: 3,
          sort: 'published_desc'
        });

        // With specific category
        const withCategory = await fetchNews({
          categories: 'technology',
          limit: 3
        });

        // With keywords search
        const withKeywords = await fetchNews({
          keywords: 'climate change',
          limit: 3
        });

        // With specific countries
        const withCountries = await fetchNews({
          countries: 'us,gb',
          limit: 3
        });

        // With date range (last 7 days)
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        
        const formatDate = (date) => {
          return date.toISOString().split('T')[0]; // YYYY-MM-DD format
        };
        
        const withDateRange = await fetchNews({
          date: `${formatDate(lastWeek)},${formatDate(today)}`,
          limit: 3
        });

        setExamples({
          basic,
          withCategory,
          withKeywords,
          withCountries, 
          withDateRange,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error loading examples:', error);
        setExamples(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to load examples'
        }));
      }
    };

    loadExamples();
  }, []);

  if (examples.loading) {
    return <div>Loading examples...</div>;
  }

  if (examples.error) {
    return <div>Error: {examples.error}</div>;
  }

  return (
    <div className="news-examples">
      <h2>MediaStack API Examples</h2>
      
      <section>
        <h3>Basic News Query</h3>
        <pre>{JSON.stringify(examples.basic?.data?.slice(0, 1), null, 2)}</pre>
      </section>

      <section>
        <h3>Technology News</h3>
        <pre>{JSON.stringify(examples.withCategory?.data?.slice(0, 1), null, 2)}</pre>
      </section>

      <section>
        <h3>News with Keywords "climate change"</h3>
        <pre>{JSON.stringify(examples.withKeywords?.data?.slice(0, 1), null, 2)}</pre>
      </section>

      <section>
        <h3>News from US and UK</h3>
        <pre>{JSON.stringify(examples.withCountries?.data?.slice(0, 1), null, 2)}</pre>
      </section>

      <section>
        <h3>News from Last 7 Days</h3>
        <pre>{JSON.stringify(examples.withDateRange?.data?.slice(0, 1), null, 2)}</pre>
      </section>
    </div>
  );
};

export default NewsExamples; 