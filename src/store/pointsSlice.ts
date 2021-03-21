import { createSlice } from "@reduxjs/toolkit";

export const pointsSlice = createSlice({
  name: "points",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementPoints: (state) => {
      state.value += 1;
    },
  },
});

export const { incrementPoints } = pointsSlice.actions;

export default pointsSlice.reducer;
