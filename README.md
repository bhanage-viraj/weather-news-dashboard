# Weather & News Dashboard

A modern React application that displays India-specific news with filtering by topics, a weather card with AQI information, and a section dedicated to "Today in History".

## Features

- **News Section**
  - India-specific news articles
  - Filter news by categories/topics
  - Search functionality
  - Pagination for browsing more articles

- **Weather Widget**
  - Current weather information for major Indian cities
  - Air Quality Index (AQI) display
  - Visual indicators for AQI levels

- **Today in History**
  - Shows historical events that happened on today's date
  - Links to more detailed information

## Technologies Used

- React + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- axios for API requests
- React Router for navigation

## APIs Used

- MediaStack API for news data
- OpenWeatherMap API for weather and AQI data
- Wikipedia API for historical events

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd weather-news-dashboard
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

To run this project, you may need to set up the following environment variables:

- `VITE_MEDIASTACK_API_KEY` - Your MediaStack API key
- `VITE_OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

## License

This project is licensed under the MIT License - see the LICENSE file for details.
