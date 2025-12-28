import { useSelector } from "react-redux";
import { formatTemp } from "../utils/temperature";

const HourlyWeatherItem = ({ dateObj, tempK, iconPath }) => {
  const unit = useSelector((state) => state.unit.unit);
  const formattedDate = dateObj.toLocaleDateString("pl-PL", {day: "2-digit", month: "2-digit"});
  const { value, symbol } = formatTemp(tempK, unit);
  return (
    <li className="weather-item">
      <p className="description">{formattedDate}</p>
      <img src={iconPath} alt="" className="weather-icon" />
      <p className="temperature">
        {value}
        <span>{symbol}</span>
      </p>
    </li>
  );
};
export default HourlyWeatherItem;
