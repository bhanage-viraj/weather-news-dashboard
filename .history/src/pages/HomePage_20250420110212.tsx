import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import NewsList from '../components/News/NewsList';
import TopicsFilter from '../components/News/TopicsFilter';
import WeatherCard from '../components/Weather/WeatherCard';
import HistoryCard from '../components/History/HistoryCard';
import SearchBar from '../components/Search/SearchBar';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [searchKeywords, setSearchKeywords] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchKeywords(query);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchKeywords(''); // Clear search when changing category
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          
          <TopicsFilter xxa
            selectedCategory={selectedCategory} 
            onCategoryChange={handleCategoryChange} 
          />
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {searchKeywords 
                ? `Search Results for "${searchKeywords}"` 
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
            </h2>
            
            <NewsList 
              category={selectedCategory} 
              keywords={searchKeywords} 
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <WeatherCard />
          <HistoryCard />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage; 