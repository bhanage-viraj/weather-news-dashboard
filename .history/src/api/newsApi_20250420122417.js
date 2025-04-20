import axios from 'axios';

const API_KEY = '3a49483e1621d2056ba1034d191579db';
const BASE_URL = 'https://api.mediastack.com/v1/news'; // Use HTTPS if you're on a paid plan

export const fetchNews = async (params = { countries: 'in' }) => {
  try {
    const requestParams = {
      access_key: API_KEY,
      sort: params.sort || 'published_desc',
      ...params,
    };

    console.log('Fetching news with params:', requestParams);

    const response = await axios.get(BASE_URL, { params: requestParams });

    if (response.data && response.data.data) {
      console.log('API response successful:', response.data);
      return response.data;
    } else {
      console.error('API response missing data:', response.data);
      throw new Error('No data received from news API');
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
