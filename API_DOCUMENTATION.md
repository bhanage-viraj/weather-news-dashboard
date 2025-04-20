# MediaStack API Integration

This project uses the MediaStack API to fetch news data. Below is documentation on how to use it within our application.

## Setup

1. Get your API key from [MediaStack](https://mediastack.com/)
2. Add your API key to the `.env` file:
   ```
   VITE_MEDIASTACK_API_KEY=your_api_key_here
   ```

## API Usage

The MediaStack API is integrated in our application through the `src/api/newsApi.js` file.

### Basic Usage

```javascript
import { fetchNews } from '../api/newsApi';

// Basic usage
const response = await fetchNews();
const newsArticles = response.data;
```

### Available Parameters

Here are the parameters you can use with the `fetchNews` function:

| Parameter    | Description                                         | Example                             |
|--------------|-----------------------------------------------------|-------------------------------------|
| sources      | Specific news sources to include/exclude            | `sources: 'cnn,-bbc'`              |
| categories   | News categories to include/exclude                  | `categories: 'business,-sports'`    |
| countries    | Countries to include/exclude                        | `countries: 'us,gb,-de'`            |
| languages    | Languages to include/exclude                        | `languages: 'en,-de'`               |
| keywords     | Search terms (can use exclusions)                   | `keywords: 'climate change -trump'` |
| date         | Specific date or date range                         | `date: '2023-01-01,2023-01-31'`     |
| sort         | Sorting order                                       | `sort: 'published_desc'`            |
| limit        | Number of results per page (max 100)                | `limit: 25`                         |
| offset       | Pagination offset                                   | `offset: 100`                       |

### Example Queries

#### Fetch News from a Specific Category

```javascript
const techNews = await fetchNews({
  categories: 'technology',
  limit: 10
});
```

#### Search for News with Keywords

```javascript
const searchResults = await fetchNews({
  keywords: 'artificial intelligence',
  limit: 15
});
```

#### Get News from Specific Countries

```javascript
const usAndUkNews = await fetchNews({
  countries: 'us,gb',
  limit: 20
});
```

#### Date Range Query

```javascript
const newsFromLastWeek = await fetchNews({
  date: '2023-04-01,2023-04-07',
  limit: 30
});
```

#### Combining Parameters

```javascript
const customQuery = await fetchNews({
  categories: 'business',
  countries: 'us',
  keywords: 'startup funding',
  limit: 10,
  sort: 'published_desc'
});
```

## MediaStack API Limitations

- Free plan users are limited to:
  - HTTP connections only (no HTTPS)
  - News with a 30-minute delay
  - Limited request volume
- For real-time news and HTTPS support, upgrade to a paid plan

## Error Handling

The `fetchNews` function includes error handling for common MediaStack API errors. Here's how to implement error handling in your components:

```javascript
try {
  const response = await fetchNews({
    keywords: 'example query'
  });
  // Process response
} catch (error) {
  console.error('Error fetching news:', error.message);
  // Handle error in UI
}
```

## Additional Resources

- [MediaStack API Documentation](https://mediastack.com/documentation)
- [MediaStack Dashboard](https://mediastack.com/dashboard) (for monitoring API usage) 