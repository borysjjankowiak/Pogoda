import { createSlice } from "@reduxjs/toolkit";
const UNITS = ["C", "K", "F"];
const unitSlice = createSlice({
  name: "unit",
  initialState: { unit: "C" },
  reducers: {
    setUnit: (state, action) => {
      const next = action.payload;
      if (UNITS.includes(next)) state.unit = next;
    },
    cycleUnit: (state) => {
      const idx = UNITS.indexOf(state.unit);
      state.unit = UNITS[(idx + 1) % UNITS.length];
    },
  },
});

export const { setUnit, cycleUnit } = unitSlice.actions;
export default unitSlice.reducer;
