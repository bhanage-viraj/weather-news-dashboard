# MuffinLabs Today in History API Integration

This project integrates the MuffinLabs "Today in History" API to display historical events, births, and deaths that occurred on the current date throughout history.

## API Overview

The API is free to use and does not require authentication. It provides historical data for any date in the following format:

```
https://history.muffinlabs.com/date/[month]/[day]
```

For example, to get events for April 20th:
```
https://history.muffinlabs.com/date/4/20
```

## API Implementation

The implementation is located in `src/api/historyApi.js` and includes two main functions:

### 1. fetchHistoricalEvents

```javascript
const historyData = await fetchHistoricalEvents(month, day);
```

**Parameters:**
- `month`: Month (1-12) or null for current month
- `day`: Day (1-31) or null for current day

**Returns:**
A JSON object containing:
- `date`: The date in "Month Day" format
- `url`: URL to the Wikipedia page for this date
- `data`: Object containing three arrays:
  - `Events`: Historical events
  - `Births`: Notable births
  - `Deaths`: Notable deaths

Each event object contains:
- `year`: The year the event occurred
- `text`: Description of the event
- `html`: HTML formatted description with the year
- `no_year_html`: HTML formatted description without the year
- `links`: Array of Wikipedia links related to the event

### 2. fetchRandomHistoricalEvents

```javascript
const randomEvents = await fetchRandomHistoricalEvents(count, month, day);
```

**Parameters:**
- `count`: Number of events to return
- `month`: Month (1-12) or null for current month
- `day`: Day (1-31) or null for current day

**Returns:**
An array of randomly selected events from all categories (events, births, deaths), with an added `eventType` property to identify the category.

## Components

The implementation includes a `TodayInHistory` component that displays the historical data with tabs for Events, Births, and Deaths. This component:

- Automatically fetches data for the current date
- Provides tab navigation between the three categories
- Displays the year, description, and relevant Wikipedia links for each item
- Includes loading and error states

## Usage Example

```jsx
import React from 'react';
import TodayInHistory from './components/History/TodayInHistory';

const HistorySection = () => {
  return (
    <div>
      <h2>Historical Events</h2>
      <TodayInHistory />
    </div>
  );
};
```

## Sample Response

```json
{
  "date": "April 20",
  "url": "https://wikipedia.org/wiki/April_20",
  "data": {
    "Events": [
      {
        "year": "1303",
        "text": "The Sapienza University of Rome is instituted by Pope Boniface VIII.",
        "html": "1303 - The Sapienza University of Rome is instituted by Pope Boniface VIII.",
        "no_year_html": "The Sapienza University of Rome is instituted by Pope Boniface VIII.",
        "links": [
          {
            "title": "Sapienza University of Rome",
            "link": "https://wikipedia.org/wiki/Sapienza_University_of_Rome"
          },
          {
            "title": "Pope Boniface VIII",
            "link": "https://wikipedia.org/wiki/Pope_Boniface_VIII"
          }
        ]
      }
    ],
    "Births": [...],
    "Deaths": [...]
  }
}
```

## Data Attribution

All data is sourced from Wikipedia via the MuffinLabs API. Links to the original Wikipedia articles are provided for each event.

## Resources

- [MuffinLabs History API](https://history.muffinlabs.com/)
- [GitHub Repository](https://github.com/muffinlabs/history.js) 