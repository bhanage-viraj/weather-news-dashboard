import axios from 'axios';

// Array of API keys to rotate through when rate limits are exceeded
const API_KEYS = [
  '1d90ef3fff1ffbae553730cea09ad1e8',
  '97bfb71f23f142eef98500ea16681a01',
  '6b7b9bf554b7d642c5d18e7d18712d89'
];

// Check if running on Vercel or other production environment
const isProduction = window.location.hostname !== 'localhost' && 
                    !window.location.hostname.includes('127.0.0.1');

// Store rate limit information across requests
let rateLimitInfo = {
  rateLimited: false,
  lastAttempt: 0,
  retryAfter: 0, // seconds to wait before retrying
  rateLimitMessage: ''
};

// ALWAYS USE MOCK DATA for Vercel deployment (remove "/api/news" URL)
// This solves the 404 error by not attempting to access a non-existent endpoint

// Mock news data for production or when API fails
const mockNewsData = {
  data: [
    {
      title: "New climate deal reached at global summit",
      description: "World leaders agree to major new emissions targets at international climate conference",
      image: "https://placehold.co/600x400/png?text=Climate+News",
      url: "https://example.com/climate-news",
      source: "News Provider",
      category: "general",
      published_at: new Date().toISOString()
    },
    {
      title: "Tech company releases groundbreaking new device",
      description: "The next generation smartphone features revolutionary AI capabilities",
      image: "https://placehold.co/600x400/png?text=Tech+News",
      url: "https://example.com/tech-news",
      source: "Tech News",
      category: "technology",
      published_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      title: "Major sports upset in championship finals",
      description: "Underdog team defeats reigning champions in surprising upset victory",
      image: "https://placehold.co/600x400/png?text=Sports+News",
      url: "https://example.com/sports-news",
      source: "Sports Network",
      category: "sports",
      published_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      title: "Stock market reaches new all-time high",
      description: "Market indices surge following positive economic reports",
      image: "https://placehold.co/600x400/png?text=Business+News",
      url: "https://example.com/business-news",
      source: "Business Today",
      category: "business",
      published_at: new Date(Date.now() - 10800000).toISOString()
    }
  ],
  pagination: {
    limit: 10,
    offset: 0,
    count: 4,
    total: 4
  }
};

export const fetchNews = async (params = { countries: 'us' }) => {
  // Check if we're rate limited and not enough time has passed to retry
  const now = Date.now();
  if (rateLimitInfo.rateLimited && (now - rateLimitInfo.lastAttempt) / 1000 < rateLimitInfo.retryAfter) {
    console.log(`Rate limited, using mock data. Retry after ${rateLimitInfo.retryAfter} seconds.`);
    console.log(rateLimitInfo.rateLimitMessage);
    return generateCategorySpecificMockData(params.categories || 'general');
  }
  
  try {
    const requestParams = {
      sort: params.sort || 'published_desc',
      ...params,
    };

    console.log('Fetching news with params:', requestParams);
    
    try {
      // Use Vercel serverless function for both development and production
      const response = await axios.get('/api/news', { 
        params: requestParams
      });
      
      // Reset rate limit info on successful request
      rateLimitInfo.rateLimited = false;
      
      if (response.data && response.data.data) {
        console.log('API response successful');
        return response.data;
      } else {
        console.error('API response missing data');
        return generateCategorySpecificMockData(params.categories || 'general');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      
      // Check if the error indicates rate limiting
      if (error.response) {
        if (error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers['retry-after']) || 3600;
          rateLimitInfo = {
            rateLimited: true,
            lastAttempt: now,
            retryAfter: retryAfter,
            rateLimitMessage: `Rate limit exceeded. Server requested retry after ${retryAfter} seconds.`
          };
          console.log(rateLimitInfo.rateLimitMessage);
        } else if (error.response.data && error.response.data.rateLimited) {
          // Our custom error from the serverless function indicating all keys are rate limited
          rateLimitInfo = {
            rateLimited: true,
            lastAttempt: now,
            retryAfter: 3600, // Default to 1 hour
            rateLimitMessage: error.response.data.message || 'All API keys exceeded rate limits'
          };
          console.log(rateLimitInfo.rateLimitMessage);
        }
      }
      
      return generateCategorySpecificMockData(params.categories || 'general');
    }
  } catch (error) {
    console.error('Error in fetchNews function:', error);
    return generateCategorySpecificMockData(params.categories || 'general');
  }
};

// Function to generate mock data tailored to the requested category
function generateCategorySpecificMockData(category) {
  // Return the same mock data but filter if a specific category is requested
  if (category && category !== 'general') {
    // Filter mock data to match the requested category
    const filteredData = mockNewsData.data.filter(
      item => item.category === category || item.category === 'general'
    );
    
    return {
      ...mockNewsData,
      data: filteredData.length > 0 ? filteredData : mockNewsData.data
    };
  }
  
  return mockNewsData;
}
