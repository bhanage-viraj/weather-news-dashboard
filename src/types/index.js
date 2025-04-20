export interface NewsItem {
  author: string | null;
  title: string;
  description: string;
  url: string;
  source: string;
  image: string | null;
  category: string;
  language: string;
  country: string;
  published_at: string;
}

export interface NewsResponse {
  pagination: {
    limit: number;
    offset: number;
    count: number;
    total: number;
  };
  data: NewsItem[];
}

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface AirQualityData {
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}

export interface HistoricalEvent {
  text: string;
  year: number;
  pages: {
    title: string;
    content_urls: {
      desktop: {
        page: string;
      }
    }
  }[];
}

export interface HistoryResponse {
  events: HistoricalEvent[];
} 