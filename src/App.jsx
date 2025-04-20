import { 
  BrowserRouter, 
  Routes, 
  Route,
  createRoutesFromChildren
} from 'react-router-dom';

// Page Components
import HomePage from './pages/HomePage';
import HeadlinesSummaryPage from './pages/HeadlinesSummaryPage';
import TodayInHistoryPage from './pages/TodayInHistoryPage';
import WeatherDetailsPage from './pages/WeatherDetails/WeatherDetailsPage';
import WeatherForecastPage from './pages/WeatherForecast/WeatherForecastPage';

import './index.css';

// Create custom router with future flags enabled
const Router = ({ children }) => {
  // Suppress warnings by explicitly setting future flags
  const futureOpts = {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  };
  
  return <BrowserRouter {...futureOpts}>{children}</BrowserRouter>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* News Pages */}
        <Route path="/headlines-summary" element={<HeadlinesSummaryPage />} />
        <Route path="/today-in-history" element={<TodayInHistoryPage />} />
        
        {/* Weather Pages */}
        <Route path="/weather-details" element={<WeatherDetailsPage />} />
        <Route path="/weather-forecast" element={<WeatherForecastPage />} />
      </Routes>
    </Router>
  );
}

export default App;