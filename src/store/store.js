import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./unitSlice";
import favoritesReducer from "./favoritesSlice";
import { loadPersistedState, savePersistedState } from "./persist";

const preloadedState = loadPersistedState();

export const store = configureStore({
  reducer: {
    unit: unitReducer,
    favorites: favoritesReducer,
  },
  preloadedState,
});

let saveTimer = null;
store.subscribe(() => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    savePersistedState(store.getState());
  }, 150);
});

export default store;
