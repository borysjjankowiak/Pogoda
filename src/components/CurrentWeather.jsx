import { useSelector } from "react-redux";
import { getWeatherIcon } from "../utils/weatherIcons";
import { formatTemp } from "../utils/temperature";
import WeatherDetailItem from "./WeatherDetailItem";

const CurrentWeather = ({ weather }) => {
  const unit = useSelector((state) => state.unit.unit);

  if (!weather) return null;

  const w = weather.weather?.[0];
  const main = w?.main;
  const description = w?.description ?? "";
  const iconCode = w?.icon;

  const windSpeed = weather.wind?.speed;
  const windDeg = weather.wind?.deg;
  const clouds = weather.clouds?.all;
  const humidity = weather.main?.humidity;

  const { value, symbol } = formatTemp(weather.main?.temp, unit);

  return (
    <div className="current-weather">
      <h1>{weather.name}</h1>

      <img
        src={getWeatherIcon(main, iconCode)}
        alt={description || `Ikona pogody: ${weather.name}`}
        className="weather-icon"
      />

      <h2 className="temperature">
        {value}
        <span>{symbol}</span>
      </h2>

      <p className="description">{description}</p>

      <div className="szczegoly">
        <WeatherDetailItem
          icon="air"
          label="Prędkość wiatru"
          value={
            windSpeed != null ? (
              <>
                {Math.round(windSpeed)} <span>m/s</span>
              </>
            ) : (
              "-"
            )
          }
        />

        <WeatherDetailItem
          iconClass="material-symbols-outlined"
          icon="explore"
          label="Kierunek wiatru"
          value={windDeg != null ? `${windDeg}°` : "-"}
        />

        <WeatherDetailItem
          iconClass="material-symbols-outlined"
          icon="cloud"
          label="Zachmurzenie"
          value={clouds != null ? `${clouds}%` : "-"}
        />

        <WeatherDetailItem
          icon="water_drop"
          label="Wilgotność"
          value={humidity != null ? `${humidity}%` : "-"}
        />
      </div>
    </div>
  );
};

export default CurrentWeather;
