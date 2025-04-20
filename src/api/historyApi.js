import axios from 'axios';

const BASE_URL = 'https://history.muffinlabs.com/date';

/**
 * Fetch historical events for a specific date
 * @param {string|null} month - Month (1-12) or null for current month
 * @param {string|null} day - Day (1-31) or null for current day
 * @returns {Promise<Object>} - Historical data for the specified date
 */
export const fetchHistoricalEvents = async (month = null, day = null) => {
  try {
    // If month or day not provided, use current date
    if (!month || !day) {
      const today = new Date();
      month = month || (today.getMonth() + 1); // getMonth() is zero-based
      day = day || today.getDate();
    }

    // Format parameters as expected by the API
    const formattedMonth = parseInt(month, 10);
    const formattedDay = parseInt(day, 10);

    console.log(`Fetching historical events for ${formattedMonth}/${formattedDay}`);
    
    const response = await axios.get(`${BASE_URL}/${formattedMonth}/${formattedDay}`);
    
    if (response.data && response.data.data) {
      console.log('Historical events retrieved successfully');
      return response.data;
    } else {
      throw new Error('No data received from history API');
    }
  } catch (error) {
    console.error('Error fetching historical events:', error);
    throw error;
  }
};

/**
 * Get a random selection of events from a specific date in history
 * @param {number} count - Number of events to return
 * @param {string|null} month - Month (1-12) or null for current month
 * @param {string|null} day - Day (1-31) or null for current day
 * @returns {Promise<Array>} - Array of random historical events
 */
export const fetchRandomHistoricalEvents = async (count = 5, month = null, day = null) => {
  try {
    const historyData = await fetchHistoricalEvents(month, day);
    
    // Combine all types of historical data
    const allEvents = [
      ...(historyData.data.Events || []),
      ...(historyData.data.Births || []),
      ...(historyData.data.Deaths || [])
    ];
    
    // Shuffle array and take requested count
    const shuffled = allEvents.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    
    // Add event type to each item
    return selected.map(event => {
      const eventType = historyData.data.Events.includes(event) ? 'Event' : 
                        historyData.data.Births.includes(event) ? 'Birth' : 'Death';
      return { ...event, eventType };
    });
  } catch (error) {
    console.error('Error fetching random historical events:', error);
    throw error;
  }
}; 