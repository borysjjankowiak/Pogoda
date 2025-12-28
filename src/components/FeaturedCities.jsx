import { useSelector } from "react-redux";
import { getWeatherIcon } from "../utils/weatherIcons";
import { formatTemp } from "../utils/temperature";

const FeaturedCities = ({ cities, weatherByCity, onSelectCity }) => {
  const unit = useSelector((state) => state.unit.unit);

  return (
    <div className="featured">
      <h3 className="featured-title">Popularne miasta</h3>

      <div className="featured-grid">
        {cities.map((city) => {
          const data = weatherByCity[city];

          if (!data) {
            return (
                <button key={city} className="featured-card" type="button" disabled>
                <div className="featured-city">{city}</div>
                <div className="featured-sub">Ładowanie...</div>
              </button>
            );
          }

          const main = data.weather?.[0]?.main;
          const iconCode = data.weather?.[0]?.icon;
          const description = data.weather?.[0]?.description ?? "";
          const { value, symbol } = formatTemp(data.main?.temp, unit);

          return (
            <button
              key={city}
              className="featured-card"
              type="button"
              onClick={() => onSelectCity(city)}
              title={`Pokaż pogodę: ${city}`}
            >
              <div className="featured-top">
                <div className="featured-city">{data.name ?? city}</div>
                <img className="featured-icon" src={getWeatherIcon(main, iconCode)} alt={description || `Ikona pogody: ${city}`} />
              </div>

              <div className="featured-temp">
                {value}{symbol}
              </div>

              <div className="featured-sub">{description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCities;
