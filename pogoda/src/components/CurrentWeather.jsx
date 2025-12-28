import { getWeatherIcon } from "../utils/weatherIcons";


const CurrentWeather = ({ weather }) => {
  if (!weather) return null;

  const tempC = Math.round(weather.main.temp - 273.15);
  const main = weather.weather?.[0]?.main;
  const description = weather.weather?.[0]?.description ?? "";
  const iconCode = weather.weather?.[0]?.icon;

  const windSpeed = weather.wind?.speed;
  const windDeg = weather.wind?.deg;
  const clouds = weather.clouds?.all;
  const humidity = weather.main?.humidity;

  return (
    <div className="current-weather">
      <h1>{weather.name}</h1>

      <img
        src={getWeatherIcon(main, iconCode)}
        alt={description}
        className="weather-icon"
      />

      <h2 className="temperature">
        {tempC}
        <span>°C</span>
      </h2>

      <p className="description">{description}</p>

      <div className="szczegoly">
        <div className="szczegoly-item">
          <span className="material-symbols-rounded">air</span>
          <p>Prędkość wiatru</p>
          <h5>{Math.round(windSpeed)} <span>m/s</span></h5>
        </div>

        <div className="szczegoly-item">
          <span className="material-symbols-outlined">explore</span>
          <p>Kierunek wiatru</p>
          <h5>{windDeg}°</h5>
        </div>

        <div className="szczegoly-item">
          <span className="material-symbols-outlined">cloud</span>
          <p>Zachmurzenie</p>
          <h5>{clouds}%</h5>
        </div>

        <div className="szczegoly-item">
          <span className="material-symbols-rounded">water_drop</span>
          <p>Wilgotność</p>
          <h5>{humidity}%</h5>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
