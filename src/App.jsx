import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { cycleUnit } from "./store/unitSlice";
import { toggleFavorite } from "./store/favoritesSlice";

import SearchSection from "./components/SearchSection";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeatherItem from "./components/HourlyWeatherItem";
import FeaturedCities from "./components/FeaturedCities";

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const FEATURED_CITIES = [
  "Wrocław",
  "Warszawa",
  "Dubaj",
  "Moskwa",
  "Reykjavík",
  "Waszyngton",
];

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

const buildWeatherUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&lang=pl`;

const generateRandomForecast = (baseTempK, daysCount = 6) => {
  const start = new Date();
  start.setHours(12, 0, 0, 0);

  let tempK = baseTempK;

  return Array.from({ length: daysCount }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + (i + 1));
    tempK = tempK + randomInt(-1, 1);

    return {
      dateObj: d,
      tempK,
      iconPath: pickRandom(DAY_ICONS),
    };
  });
};

const App = () => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.unit.unit);
  const favorites = useSelector((state) => state.favorites.cities);

  const [weatherData, setWeatherData] = useState(null);
  const [forecastDays, setForecastDays] = useState([]); // trzymamy tempK
  const [error, setError] = useState(null);

  const [featuredWeatherByCity, setFeaturedWeatherByCity] = useState({});

  const applyCityWeather = (data) => {
    setWeatherData(data);

    const baseTempK = Number(data?.main?.temp ?? 273.15);
    setForecastDays(generateRandomForecast(baseTempK, 6));
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
      setError(err?.message ?? "Wystąpił błąd.");
      setWeatherData(null);
      setForecastDays([]);
    }
  };

  const getWeatherByCoords = async (lat, lon) => {
    try {
      setError(null);

      const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pl`;
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Nie udało się pobrać pogody dla lokalizacji.");
      }

      const data = await response.json();
      applyCityWeather(data);
    } catch (err) {
      setError(err?.message ?? "Wystąpił błąd.");
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
      } catch (err) {
        // ważne: blok nie może być pusty (no-empty)
        if (import.meta.env.DEV) {
          console.warn("Nie udało się pobrać danych featured", err);
        }
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

  const currentCity = (weatherData?.name ?? "").trim();
  const isFav =
    !!currentCity &&
    favorites.some((c) => c.trim().toLowerCase() === currentCity.toLowerCase());

  return (
    <div className="app-shell">
      <div className="top-menu">
        {weatherData && (
          <button
            className="menu-btn"
            type="button"
            onClick={handleBackToHome}
            aria-label="Wróć"
            title="Wróć"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
        )}

        <button
          className="menu-btn"
          type="button"
          onClick={() => dispatch(cycleUnit())}
          aria-label="Zmień jednostkę temperatury"
          title="Zmień jednostkę temperatury"
        >
          {unit === "C" ? "°C" : unit === "F" ? "°F" : "K"}
        </button>

        <button
          className={`menu-btn menu-heart ${isFav ? "is-active" : ""}`}
          type="button"
          disabled={!currentCity}
          onClick={() => dispatch(toggleFavorite(currentCity))}
          aria-label="Dodaj/usuń z ulubionych"
          title={isFav ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
          <span className="material-symbols-rounded">favorite</span>
        </button>
      </div>

      <div className="container">
        <SearchSection
          getWeatherDetails={getWeatherDetails}
          getWeatherByCoords={getWeatherByCoords}
        />

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
            <CurrentWeather weather={weatherData} />

            <div className="hourly-forecast">
              <ul className="weather-list">
                {forecastDays.map((d, idx) => (
                  <HourlyWeatherItem
                    key={idx}
                    dateObj={d.dateObj}
                    tempK={d.tempK}
                    iconPath={d.iconPath}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
