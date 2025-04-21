import axios from 'axios';

const API_KEY = '1d90ef3fff1ffbae553730cea09ad1e8';
const BASE_URL = 'http://api.mediastack.com/v1/news'; // Must be absolute URL

const mockNewsData = {
  data: [
    {
      title: "New climate deal reached at global summit",
      description: "World leaders agree to major new emissions targets at international climate conference",
      image: "https://placehold.co/600x400/png?text=Climate+News",
      url: "#",
      source: "News Provider",
      category: "general",
      published_at: new Date().toISOString()
    },
    {
      title: "Tech company releases groundbreaking new device",
      description: "The next generation smartphone features revolutionary AI capabilities",
      image: "https://placehold.co/600x400/png?text=Tech+News",
      url: "#",
      source: "Tech News",
      category: "technology",
      published_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      title: "Major sports upset in championship finals",
      description: "Underdog team defeats reigning champions in surprising upset victory",
      image: "https://placehold.co/600x400/png?text=Sports+News",
      url: "#",
      source: "Sports Network",
      category: "sports",
      published_at: new Date(Date.now() - 7200000).toISOString()
    },
    {
      title: "Stock market reaches new all-time high",
      description: "Market indices surge following positive economic reports",
      image: "https://placehold.co/600x400/png?text=Business+News",
      url: "#",
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
  try {
    const requestParams = {
      access_key: API_KEY,
      sort: params.sort || 'published_desc',
      ...params,
    };

    console.log('Fetching news with params:', requestParams);

    try {
      const response = await axios.get(BASE_URL, { params: requestParams });

      if (response.data && response.data.data) {
        console.log('API response successful:', response.data);
        return response.data;
      } else {
        console.error('API response missing data:', response.data);
        console.log('Falling back to mock data');
        return mockNewsData;
      }
    } catch (error) {
      console.error('Error fetching news:', error);

      if (error.response && error.response.status === 429) {
        console.log('API rate limit exceeded, using mock data');
        return mockNewsData;
      }

      console.log('Other API error, using mock data');
      return mockNewsData;
    }
  } catch (error) {
    console.error('Error in fetchNews function:', error);
    return mockNewsData;
  }
};
