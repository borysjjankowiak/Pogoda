const KEY = "pogoda_state_v1";

export const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);

    const unit = parsed?.unit;
    const favorites = parsed?.favorites;

    const safeUnit = unit === "C" || unit === "K" || unit === "F" ? unit : "C";
    const safeFavorites = Array.isArray(favorites)
      ? favorites.filter((x) => typeof x === "string" && x.trim()).slice(0, 50)
      : [];

    return {
      unit: { unit: safeUnit },
      favorites: { cities: safeFavorites },
    };
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("persist: nie udało się wczytać stanu", err);
    }
    return undefined;
  }
};

export const savePersistedState = (state) => {
  try {
    const payload = {
      unit: state.unit.unit,
      favorites: state.favorites.cities,
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("persist: nie udało się zapisać stanu", err);
    }
  }
};
