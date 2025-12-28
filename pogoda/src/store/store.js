import { configureStore } from "@reduxjs/toolkit";
import unitReducer from "./unitSlice";

export const store = configureStore({
  reducer: {
    unit: unitReducer,
  },
});

export default store;
