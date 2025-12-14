const SearchSection = ({ getWeatherDetails }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const handleCitySearch = (e) => {
    e.preventDefault();

    const searchInput = e.target.querySelector(".search-input");
    const city = searchInput.value.trim();

    if (!city) return;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&lang=pl`;

    getWeatherDetails(API_URL, city);
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-rounded">search</span>
        <input
          type="search"
          placeholder="Wpisz miasto"
          className="search-input"
        />
      </form>
      <button className="location-button" type="button">
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default SearchSection;
