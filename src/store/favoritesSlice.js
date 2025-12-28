import { createSlice } from "@reduxjs/toolkit";

const normalize = (s) => (s ?? "").trim().toLowerCase();

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { cities: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const city = action.payload?.trim();
      if (!city) return;

      const idx = state.cities.findIndex((c) => normalize(c) === normalize(city));
      if (idx >= 0) state.cities.splice(idx, 1);
      else state.cities.unshift(city);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
