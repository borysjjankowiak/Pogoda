import { useState } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";

const kelvinToC = (k) => Math.round(k - 273.15);

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastDays, setForecastDays] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  // ✅ tylko dzienne ikonki (pomijamy night)
  const DAY_ICONS = [
    "icons/clear-day.svg",
    "icons/cloudy-day.svg",
    "icons/day-rain.svg",
    "icons/day-drizzle.svg",
    "icons/day-snow.svg",
    "icons/fog-day.svg",
    "icons/haze-day.svg",
    "icons/thunderstorms-day.svg",
    "icons/mist.svg", // to nie jest "day", ale jest neutralne i masz tylko jedną wersję
  ];

  const getWeatherDetails = async (API_URL, city) => {
    try {
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Nie znaleziono miasta: ${city}`);

      const data = await response.json();
      setWeatherData(data);

      const baseTempC = kelvinToC(data.main.temp);

      const daysCount = 5; // możesz zmienić, jak chcesz
      const start = new Date();
      start.setHours(12, 0, 0, 0);

      let temp = baseTempC;

      const generated = Array.from({ length: daysCount }, (_, i) => {
        const d = new Date(start);
        d.setDate(d.getDate() + (i + 1));
        temp = temp + randomInt(-1, 1);

        // ✅ losowa ikonka tylko z dziennych
        const iconPath = pickRandom(DAY_ICONS);

        return {
          dateObj: d,
          tempC: temp,
          iconPath,
        };
      });

      setForecastDays(generated);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastDays([]);
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
              {forecastDays.map((d, idx) => (
                <HourlyWeatherItem
                  key={idx}
                  dateObj={d.dateObj}
                  tempC={d.tempC}
                  iconPath={d.iconPath}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
