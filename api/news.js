import axios from 'axios';

// Array of API keys to rotate through when rate limits are exceeded
const API_KEYS = [
  '1d90ef3fff1ffbae553730cea09ad1e8',
  '97bfb71f23f142eef98500ea16681a01', 
  '6b7b9bf554b7d642c5d18e7d18712d89'
];

// Get API key from environment variable or use the first one from the array
let currentKeyIndex = 0;

export default async function handler(req, res) {
  let attemptCount = 0;
  const maxAttempts = API_KEYS.length;

  // Try each API key until one works or we run out of keys
  async function attemptFetch() {
    if (attemptCount >= maxAttempts) {
      throw new Error('All API keys have exceeded their rate limits');
    }

    const currentKey = process.env.MEDIASTACK_API_KEY || API_KEYS[currentKeyIndex];
    
    try {
      const response = await axios.get('http://api.mediastack.com/v1/news', {
        params: {
          access_key: currentKey,
          ...req.query,
        },
      });
      
      return response.data;
    } catch (error) {
      // If we hit a rate limit (429) or unauthorized (401), try the next key
      if (error.response && (error.response.status === 429 || error.response.status === 401)) {
        console.log(`API key ${currentKeyIndex} (${currentKey.substring(0, 5)}...) rate limited or invalid. Trying next key.`);
        currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
        attemptCount++;
        return attemptFetch(); // Recursively try the next key
      }
      
      // For other errors, just throw them to be caught by the main handler
      throw error;
    }
  }

  try {
    const data = await attemptFetch();
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch news', 
      message: error.message,
      rateLimited: attemptCount >= maxAttempts
    });
  }
} 