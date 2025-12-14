const HourlyWeatherItem = ({ dateObj, tempC, iconPath }) => {
  const formattedDate = dateObj.toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
  });

  return (
    <li className="weather-item">
      <p className="description">{formattedDate}</p>
      <img src={iconPath} alt="" className="weather-icon" />
      <p className="temperature">{tempC}°C</p>
    </li>
  );
};

export default HourlyWeatherItem;
