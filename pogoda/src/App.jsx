import { useEffect, useState } from "react";
import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import FeaturedCities from "./components/FeaturedCities";

const kelvinToC = (k) => Math.round(k - 273.15);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastDays, setForecastDays] = useState([]); // ✅ losowe małe kafelki
  const [error, setError] = useState(null);

  const [featuredWeatherByCity, setFeaturedWeatherByCity] = useState({});

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const FEATURED_CITIES = ["Wrocław", "Warszawa", "Dubaj", "Moskwa", "Reykjavík", "Waszyngton"];

  const buildWeatherUrl = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&lang=pl`;

  const DAY_ICONS = [
    "icons/clear-day.svg",
    "icons/cloudy-day.svg",
    "icons/day-rain.svg",
    "icons/day-drizzle.svg",
    "icons/day-snow.svg",
    "icons/fog-day.svg",
    "icons/haze-day.svg",
    "icons/thunderstorms-day.svg",
    "icons/mist.svg",
  ];

  const generateRandomForecast = (baseTempC, daysCount = 6) => {
    const start = new Date();
    start.setHours(12, 0, 0, 0);

    let temp = baseTempC;

    return Array.from({ length: daysCount }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + (i + 1));
      temp = temp + randomInt(-1, 1);

      return {
        dateObj: d,
        tempC: temp,
        iconPath: pickRandom(DAY_ICONS),
      };
    });
  };

  const applyCityWeather = (data) => {
    setWeatherData(data);

    const baseTempC = kelvinToC(data?.main?.temp ?? 273.15);
    setForecastDays(generateRandomForecast(baseTempC, 6));
  };

  const getWeatherDetails = async (API_URL, city) => {
    try {
      setError(null);

      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Nie znaleziono miasta: ${city}`);
      }

      const data = await response.json();
      applyCityWeather(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastDays([]);
    }
  };

  useEffect(() => {
    let isCancelled = false;

    const loadFeatured = async () => {
      try {
        const results = await Promise.allSettled(
          FEATURED_CITIES.map(async (city) => {
            const res = await fetch(buildWeatherUrl(city));
            if (!res.ok) throw new Error(city);
            const data = await res.json();
            return { city, data };
          })
        );

        if (isCancelled) return;

        const next = {};
        for (const r of results) {
          if (r.status === "fulfilled") next[r.value.city] = r.value.data;
        }
        setFeaturedWeatherByCity(next);
      } catch {
      }
    };

    loadFeatured();
    return () => {
      isCancelled = true;
    };
  }, []); 

  const handleSelectFeaturedCity = (city) => {
    setError(null);


    const cached = featuredWeatherByCity[city];
    if (cached) {
      applyCityWeather(cached);
      return;
    }

    getWeatherDetails(buildWeatherUrl(city), city);
  };

  const handleBackToHome = () => {
    setWeatherData(null);
    setForecastDays([]);
    setError(null);
  };

  return (
    <div className="container">
      <SearchSection getWeatherDetails={getWeatherDetails} />

      {!weatherData && (
        <FeaturedCities
          cities={FEATURED_CITIES}
          weatherByCity={featuredWeatherByCity}
          onSelectCity={handleSelectFeaturedCity}
        />
      )}

      {error && (
        <p style={{ color: "#ffb3b3", textAlign: "center", paddingBottom: "10px" }}>
          {error}
        </p>
      )}

      {weatherData && (
        <div className="weather-section">
          <button className="back-button" type="button" onClick={handleBackToHome}>
            ← Wróć
          </button>

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
