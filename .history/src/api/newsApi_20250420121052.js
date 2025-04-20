import axios from 'axios';

const API_KEY = '3a49483e1621d2056ba1034d191579db';
const BASE_URL = 'http://api.mediastack.com/v1/news';

// Mock data to use if API fails
const mockNewsData = {
  pagination: {
    limit: 12,
    offset: 0,
    count: 12,
    total: 48
  },
  data: [
    {
      title: "India's Economic Growth Projected to Accelerate",
      author: "Economic Times",
      description: "India's economy is projected to grow at 7.5% this fiscal year, surpassing expectations amid global economic challenges.",
      url: "https://example.com/india-economic-growth",
      source: "Economic Times",
      image: "https://source.unsplash.com/random/800x600/?economy",
      category: "business",
      language: "en",
      country: "in",
      published_at: "2025-04-18T09:23:00Z"
    },
    {
      title: "New Technology Hub Established in Bangalore",
      author: "Tech Daily",
      description: "A state-of-the-art technology hub has been inaugurated in Bangalore, expected to create over 10,000 jobs in the IT sector.",
      url: "https://example.com/bangalore-tech-hub",
      source: "Tech Daily",
      image: "https://source.unsplash.com/random/800x600/?technology",
      category: "technology",
      language: "en",
      country: "in",
      published_at: "2025-04-19T11:45:00Z"
    },
    {
      title: "Cricket Team Announces Lineup for Upcoming Tournament",
      author: "Sports Chronicle",
      description: "The national cricket team has announced its squad for the upcoming international tournament, featuring several new players.",
      url: "https://example.com/cricket-lineup",
      source: "Sports Chronicle",
      image: "https://source.unsplash.com/random/800x600/?cricket",
      category: "sports",
      language: "en",
      country: "in",
      published_at: "2025-04-19T14:30:00Z"
    },
    {
      title: "New Environmental Protection Measures Implemented",
      author: "Green News",
      description: "The government has introduced new measures to reduce carbon emissions and protect wildlife in key conservation areas.",
      url: "https://example.com/environmental-protection",
      source: "Green News",
      image: "https://source.unsplash.com/random/800x600/?environment",
      category: "science",
      language: "en",
      country: "in",
      published_at: "2025-04-17T08:15:00Z"
    },
    {
      title: "Major Film Festival Announces Lineup",
      author: "Entertainment Weekly",
      description: "The annual international film festival has announced its lineup, featuring over 100 films from 40 countries.",
      url: "https://example.com/film-festival",
      source: "Entertainment Weekly",
      image: "https://source.unsplash.com/random/800x600/?cinema",
      category: "entertainment",
      language: "en",
      country: "in",
      published_at: "2025-04-16T16:20:00Z"
    },
    {
      title: "Healthcare System Reforms Announced",
      author: "Health Today",
      description: "Comprehensive healthcare reforms have been announced, aimed at improving access to medical services in rural areas.",
      url: "https://example.com/healthcare-reforms",
      source: "Health Today",
      image: "https://source.unsplash.com/random/800x600/?healthcare",
      category: "health",
      language: "en",
      country: "in",
      published_at: "2025-04-18T10:45:00Z"
    },
    {
      title: "Stock Market Reaches New Heights",
      author: "Financial Express",
      description: "The stock market has reached a record high, driven by strong performance in the technology and pharmaceutical sectors.",
      url: "https://example.com/stock-market",
      source: "Financial Express",
      image: "https://source.unsplash.com/random/800x600/?stockmarket",
      category: "business",
      language: "en",
      country: "in",
      published_at: "2025-04-19T09:10:00Z"
    },
    {
      title: "New Education Policy Implementation Begins",
      author: "Education Times",
      description: "The implementation of the new national education policy has begun, with changes to curriculum and assessment methods.",
      url: "https://example.com/education-policy",
      source: "Education Times",
      image: "https://source.unsplash.com/random/800x600/?education",
      category: "general",
      language: "en",
      country: "in",
      published_at: "2025-04-17T12:30:00Z"
    },
    {
      title: "Infrastructure Development Project Launched",
      author: "Urban Development News",
      description: "A major infrastructure development project has been launched, including new highways and urban transit systems.",
      url: "https://example.com/infrastructure-project",
      source: "Urban Development News",
      image: "https://source.unsplash.com/random/800x600/?infrastructure",
      category: "general",
      language: "en",
      country: "in",
      published_at: "2025-04-18T14:15:00Z"
    },
    {
      title: "Advances in Artificial Intelligence Research",
      author: "Tech Innovation",
      description: "Researchers have announced significant advances in artificial intelligence, with potential applications in healthcare and education.",
      url: "https://example.com/ai-research",
      source: "Tech Innovation",
      image: "https://source.unsplash.com/random/800x600/?ai",
      category: "technology",
      language: "en",
      country: "in",
      published_at: "2025-04-16T11:20:00Z"
    },
    {
      title: "Cultural Festival Celebrates Heritage",
      author: "Cultural Chronicle",
      description: "A week-long cultural festival celebrating the country's diverse heritage has begun, featuring traditional music, dance, and art.",
      url: "https://example.com/cultural-festival",
      source: "Cultural Chronicle",
      image: "https://source.unsplash.com/random/800x600/?culture",
      category: "entertainment",
      language: "en",
      country: "in",
      published_at: "2025-04-19T13:40:00Z"
    },
    {
      title: "Scientific Discovery Could Transform Medicine",
      author: "Science Daily",
      description: "Scientists have made a breakthrough discovery that could transform the treatment of several chronic diseases.",
      url: "https://example.com/scientific-discovery",
      source: "Science Daily",
      image: "https://source.unsplash.com/random/800x600/?science",
      category: "science",
      language: "en",
      country: "in",
      published_at: "2025-04-17T15:50:00Z"
    }
  ]
};

// Add more mock news entries to have enough items for each category
const extraMockNews = {
  business: [
    {
      title: "New Startup Raises $50 Million in Funding",
      author: "Business Insider",
      description: "A promising new tech startup has secured $50 million in Series A funding to expand its operations globally.",
      url: "https://example.com/startup-funding",
      source: "Business Insider",
      image: "https://source.unsplash.com/random/800x600/?startup",
      category: "business",
      language: "en",
      country: "in",
      published_at: "2025-04-19T10:30:00Z"
    },
    {
      title: "Major Merger Announced Between Leading Corporations",
      author: "Financial Times",
      description: "Two industry giants have announced a merger that will create one of the largest companies in the sector.",
      url: "https://example.com/corporate-merger",
      source: "Financial Times",
      image: "https://source.unsplash.com/random/800x600/?merger",
      category: "business",
      language: "en",
      country: "in",
      published_at: "2025-04-18T08:45:00Z"
    },
    {
      title: "New Trade Agreement to Boost Regional Economy",
      author: "Economic Journal",
      description: "A new trade agreement has been signed that is expected to significantly boost economic growth in the region.",
      url: "https://example.com/trade-agreement",
      source: "Economic Journal",
      image: "https://source.unsplash.com/random/800x600/?trade",
      category: "business",
      language: "en",
      country: "in",
      published_at: "2025-04-17T12:20:00Z"
    }
  ],
  technology: [
    {
      title: "Revolutionary AI Technology Developed by Research Team",
      author: "Tech Crunch",
      description: "A research team has developed a revolutionary AI technology that could transform various industries.",
      url: "https://example.com/ai-technology",
      source: "Tech Crunch",
      image: "https://source.unsplash.com/random/800x600/?ai-tech",
      category: "technology",
      language: "en",
      country: "in",
      published_at: "2025-04-18T14:10:00Z"
    },
    {
      title: "Next Generation Smartphone Unveiled with Advanced Features",
      author: "Gadget Review",
      description: "A major tech company has unveiled its next-generation smartphone with several groundbreaking features.",
      url: "https://example.com/smartphone-launch",
      source: "Gadget Review",
      image: "https://source.unsplash.com/random/800x600/?smartphone",
      category: "technology",
      language: "en",
      country: "in",
      published_at: "2025-04-19T09:30:00Z"
    },
    {
      title: "Quantum Computing Breakthrough Achieved by Scientists",
      author: "Science Tech News",
      description: "Scientists have achieved a significant breakthrough in quantum computing that could revolutionize data processing.",
      url: "https://example.com/quantum-computing",
      source: "Science Tech News",
      image: "https://source.unsplash.com/random/800x600/?quantum",
      category: "technology",
      language: "en",
      country: "in",
      published_at: "2025-04-17T16:45:00Z"
    }
  ],
  entertainment: [
    {
      title: "Blockbuster Movie Sets New Box Office Record",
      author: "Entertainment Weekly",
      description: "A highly anticipated blockbuster has broken all previous box office records in its opening weekend.",
      url: "https://example.com/movie-record",
      source: "Entertainment Weekly",
      image: "https://source.unsplash.com/random/800x600/?movie",
      category: "entertainment",
      language: "en",
      country: "in",
      published_at: "2025-04-19T11:20:00Z"
    },
    {
      title: "Popular Music Festival Announces Star-Studded Lineup",
      author: "Music Today",
      description: "A popular annual music festival has announced its lineup featuring several international stars.",
      url: "https://example.com/music-festival",
      source: "Music Today",
      image: "https://source.unsplash.com/random/800x600/?festival",
      category: "entertainment",
      language: "en",
      country: "in",
      published_at: "2025-04-18T15:30:00Z"
    }
  ],
  sports: [
    {
      title: "National Team Wins Championship in Thrilling Final",
      author: "Sports Chronicle",
      description: "The national team has won the championship after a thrilling final match that went into overtime.",
      url: "https://example.com/championship-win",
      source: "Sports Chronicle",
      image: "https://source.unsplash.com/random/800x600/?trophy",
      category: "sports",
      language: "en",
      country: "in",
      published_at: "2025-04-19T18:15:00Z"
    },
    {
      title: "Star Athlete Signs Record-Breaking Contract",
      author: "Sports Daily",
      description: "A star athlete has signed a record-breaking contract with a major team, making sports history.",
      url: "https://example.com/athlete-contract",
      source: "Sports Daily",
      image: "https://source.unsplash.com/random/800x600/?athlete",
      category: "sports",
      language: "en",
      country: "in",
      published_at: "2025-04-18T12:40:00Z"
    },
    {
      title: "New Sports Stadium Construction Announced",
      author: "Sports Business",
      description: "Plans for a new state-of-the-art sports stadium have been announced, set to be completed within two years.",
      url: "https://example.com/stadium-construction",
      source: "Sports Business",
      image: "https://source.unsplash.com/random/800x600/?stadium",
      category: "sports",
      language: "en",
      country: "in",
      published_at: "2025-04-17T09:50:00Z"
    }
  ],
  health: [
    {
      title: "Breakthrough in Medical Research Offers Hope for Patients",
      author: "Health Journal",
      description: "A breakthrough in medical research is offering new hope for patients with previously untreatable conditions.",
      url: "https://example.com/medical-breakthrough",
      source: "Health Journal",
      image: "https://source.unsplash.com/random/800x600/?medical",
      category: "health",
      language: "en",
      country: "in",
      published_at: "2025-04-19T10:15:00Z"
    },
    {
      title: "New Fitness Trend Taking the Country by Storm",
      author: "Wellness Magazine",
      description: "A new fitness trend is rapidly gaining popularity across the country, appealing to people of all ages.",
      url: "https://example.com/fitness-trend",
      source: "Wellness Magazine",
      image: "https://source.unsplash.com/random/800x600/?fitness",
      category: "health",
      language: "en",
      country: "in",
      published_at: "2025-04-18T14:50:00Z"
    }
  ],
  science: [
    {
      title: "Astronomers Discover New Planet in Habitable Zone",
      author: "Science Today",
      description: "Astronomers have discovered a new planet in the habitable zone of a nearby star system, raising possibilities for extraterrestrial life.",
      url: "https://example.com/planet-discovery",
      source: "Science Today",
      image: "https://source.unsplash.com/random/800x600/?planet",
      category: "science",
      language: "en",
      country: "in",
      published_at: "2025-04-19T09:45:00Z"
    },
    {
      title: "Revolutionary Renewable Energy Technology Developed",
      author: "Green Science",
      description: "Scientists have developed a revolutionary renewable energy technology that could significantly reduce carbon emissions.",
      url: "https://example.com/renewable-energy",
      source: "Green Science",
      image: "https://source.unsplash.com/random/800x600/?renewable",
      category: "science",
      language: "en",
      country: "in",
      published_at: "2025-04-18T11:30:00Z"
    }
  ]
};

export const fetchNews = async (params = { countries: 'in' }) => {
  try {
    // Set default values if not provided
    const requestParams = {
      access_key: API_KEY,
      sort: params.sort || 'published_desc', // Default sort by newest first
      ...params,
    };
    
    console.log('Fetching news with params:', requestParams);
    
    try {
      const response = await axios.get(BASE_URL, {
        params: requestParams,
      });
      
      // Check if the API returned data properly
      if (response.data && response.data.data) {
        console.log('API response successful:', response.data);
        return response.data;
      } else {
        console.error('API response missing data:', response.data);
        throw new Error('No data received from news API');
      }
    } catch (apiError) {
      console.error('API request failed, using mock data:', apiError);
      // If the API call fails, use mock data
      console.log('Using mock data instead');
      
      // Create a copy of mock data
      let filteredData = {...mockNewsData};
      let allNewsData = [...mockNewsData.data];
      
      // Add category-specific extra mock news if available
      if (params.categories && extraMockNews[params.categories]) {
        allNewsData = [...allNewsData, ...extraMockNews[params.categories]];
      }
      
      // Filter by category if provided
      if (params.categories) {
        allNewsData = allNewsData.filter(item => 
          item.category === params.categories
        );
      }
      
      // Apply pagination
      const offset = params.offset || 0;
      const limit = params.limit || 12;
      
      filteredData.data = allNewsData.slice(offset, offset + limit);
      filteredData.pagination.count = filteredData.data.length;
      filteredData.pagination.total = allNewsData.length;
      
      return filteredData;
    }
  } catch (error) {
    console.error('Error in fetchNews function:', error);
    throw error;
  }
}; 