import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const SearchSection = ({ getWeatherDetails }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const favorites = useSelector((state) => state.favorites.cities);

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if (!formRef.current) return;
      if (!formRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const suggestions = useMemo(() => {
    if (!open) return [];
    const q = value.trim().toLowerCase();

    const list = q
      ? favorites.filter((c) => c.toLowerCase().includes(q))
      : favorites;

    return list.slice(0, 6);
  }, [favorites, open, value]);

  const runSearch = (city) => {
    const c = (city ?? "").trim();
    if (!c) return;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      c
    )}&appid=${API_KEY}&lang=pl`;

    getWeatherDetails(API_URL, c);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(false);
    runSearch(value);
  };

  const handlePickSuggestion = (city) => {
    setValue(city);
    setOpen(false);
    runSearch(city);
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit} ref={formRef}>
        <span className="material-symbols-rounded search-icon">search</span>

        <input
          type="search"
          placeholder="Wpisz miasto"
          className="search-input"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          autoComplete="off"
        />

        {/* ✅ Sugestie z ulubionych */}
        {open && favorites.length > 0 && (
          <div className="suggestions">
            {suggestions.length > 0 ? (
              suggestions.map((city) => (
                <button
                  key={city}
                  type="button"
                  className="suggestion-item"
                  onClick={() => handlePickSuggestion(city)}
                  title={`Wyszukaj: ${city}`}
                >
                  <span className="suggestion-left">
                    <span className="material-symbols-rounded suggestion-heart">favorite</span>
                    {city}
                  </span>
                </button>
              ))
            ) : (
              <div className="suggestion-empty">Brak dopasowań</div>
            )}
          </div>
        )}
      </form>

      <button className="location-button" type="button">
        <span className="material-symbols-rounded">my_location</span>
      </button>
    </div>
  );
};

export default SearchSection;
