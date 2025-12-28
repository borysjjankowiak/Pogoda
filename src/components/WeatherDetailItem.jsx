const WeatherDetailItem = ({iconClass = "material-symbols-rounded",icon,label,value,}) => {
  return (
    <div className="szczegoly-item">
      <span className={iconClass}>{icon}</span>
      <p>{label}</p>
      <h5>{value}</h5>
    </div>
  );
};

export default WeatherDetailItem;
