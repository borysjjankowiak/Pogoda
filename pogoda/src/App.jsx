import { useState } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const getWeatherDetails = async (API_URL, city) => {
    try {
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Nie znaleziono miasta: ${city}`);
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      {error && (
        <p style={{ color: "#ffb3b3", textAlign: "center", paddingBottom: "10px" }}>
          {error}
        </p>
      )}

      {weatherData && (
        <div className="weather-section">
          <CurrentWeather weather={weatherData} />

          <div className="hourly-forecast">
            <ul className="weather-list">
              <HourlyWeatherItem />
              <HourlyWeatherItem />
              <HourlyWeatherItem />
              <HourlyWeatherItem />
              <HourlyWeatherItem />
              <HourlyWeatherItem />
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
