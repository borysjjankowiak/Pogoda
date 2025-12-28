const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE = "https://api.openweathermap.org/data/2.5/weather";

export const buildCityWeatherUrl = (city) =>
  `${BASE}?q=${encodeURIComponent(city)}&appid=${API_KEY}&lang=pl`;

export const buildCoordsWeatherUrl = (lat, lon) =>
  `${BASE}?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=pl`;