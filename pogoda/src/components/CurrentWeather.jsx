const CurrentWeather = () => {
  return (
    <div className="current-weather">
      <h1>WARSZAWA</h1>
      <img src="icons/rainy.svg" alt="" className="weather-icon" />

      <h2 className="temperature">
        21<span>°C</span>
      </h2>

      <p className="description">Deszczowo</p>

      <div className="szczegoly">
        <div className="szczegoly-item">
            <span className="material-symbols-outlined">water</span>
          <p>Suma opadów:</p>
          <h5>20mm</h5>
        </div>
        <div className="szczegoly-item">
          <span className="material-symbols-rounded">air</span>
          <p>Prędkość wiatru:</p>
          <h5>20km/h</h5>
        </div>
        <div className="szczegoly-item">
          <span className="material-symbols-rounded">water_drop</span>
          <p>Możliwe opady:</p>
          <h5>85%</h5>
        </div>
        <div className="szczegoly-item">
          <span className="material-symbols-outlined">explore</span>
          <p>Kierunek wiatru:</p>
          <h5>143°SE</h5>
        </div>
        <div className="szczegoly-item">
        <span className="material-symbols-outlined">cloud_alert</span>
          <p>Stopień zachmurzenia:</p>
          <h5>7</h5>
        </div>
      </div>
    </div>
  );
};


export default CurrentWeather
