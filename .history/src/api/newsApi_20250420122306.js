import axios from 'axios';

const API_KEY = '3a49483e1621d2056ba1034d191579db';
const BASE_URL = 'https://api.mediastack.com/v1/news'; // Use HTTPS

// Mock data placeholders (make sure these exist in your file)
import { mockNewsData, extraMockNews } from './mockNews';

export const fetchNews = async (params = { countries: 'in' }) => {
  try {
    const requestParams = {
      access_key: API_KEY,
      sort: params.sort || 'published_desc',
      ...params,
    };

    console.log('Fetching news with params:', requestParams);

    const response = await axios.get(BASE_URL, {
      params: requestParams,
    });

    if (response.data && response.data.data) {
      console.log('API response successful:', response.data);
      return response.data;
    } else {
      console.error('API response missing data:', response.data);
      throw new Error('No data received from news API');
    }
  } catch (apiError) {
    console.error('API request failed, using mock data:', apiError);

    // Fallback using mock data
    console.log('Using mock data instead');
    const filteredData = { ...mockNewsData };
    let allNewsData = [...mockNewsData.data];

    // Append extra category-specific news if available
    if (params.categories && extraMockNews[params.categories]) {
      allNewsData = allNewsData.concat(extraMockNews[params.categories]);
    }

    // Filter by category if specified
    if (params.categories) {
      allNewsData = allNewsData.filter(
        (item) => item.category === params.categories
      );
    }

    // Apply pagination
    const offset = params.offset || 0;
    const limit = params.limit || 12;

    filteredData.data = allNewsData.slice(offset, offset + limit);
    filteredData.pagination = {
      count: filteredData.data.length,
      total: allNewsData.length,
      offset,
      limit,
    };

    return filteredData;
  }
};
