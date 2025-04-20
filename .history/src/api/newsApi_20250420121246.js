import axios from 'axios';

const API_KEY = '3a49483e1621d2056ba1034d191579db';
const BASE_URL = 'http://api.mediastack.com/v1/news';



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