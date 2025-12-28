const ICONS = {
  Clear: {day: "icons/clear-day.svg", night: "icons/clear-night.svg"},
  Clouds: {day: "icons/cloudy-day.svg", night: "icons/cloudy-night.svg"},
  Rain: {day: "icons/day-rain.svg", night: "icons/night-rain.svg"},
  Drizzle: {day: "icons/day-drizzle.svg", night: "icons/night-drizzle.svg"},
  Thunderstorm: {day: "icons/thunderstorms-day.svg", night: "icons/thunderstorms-night.svg"},
  Snow: {day: "icons/day-snow.svg", night: "icons/night-snow.svg"},
  Fog: {day: "icons/fog-day.svg", night: "icons/fog-night.svg"},
  Haze: {day: "icons/haze-day.svg", night: "icons/haze-night.svg"},
  Mist: {day: "icons/mist.svg", night: "icons/mist.svg" },

const FALLBACK = { day: "icons/cloudy-day.svg", night: "icons/cloudy-night.svg" };

export const getWeatherIcon = (main, iconCode) => {
  const isNight = iconCode?.includes("n");
  const timeKey = isNight ? "night" : "day";

  const entry = ICONS[main] ?? FALLBACK;
  return entry[timeKey];
};
