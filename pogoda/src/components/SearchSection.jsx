const SearchSection = ({ getWeatherDetails }) => {
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const handleCitySearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector(".search-input");
        const API_URL=`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}`
        console.log("Szukane miasto:", searchInput.value);
        getWeatherDetails(API_URL);
    };
  return (
    <div className="search-section">
        <form className="search-form" onSubmit={handleCitySearch}>
          <span className="material-symbols-rounded">search</span>
          <input type="search" placeholder="Wpisz miasto" className="search-input" />
        </form>
        <button className="location-button">
          <span className="material-symbols-rounded">my_location</span>
        </button>
      </div>
  )
}

export default SearchSection
