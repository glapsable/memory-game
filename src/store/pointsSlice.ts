import { createSlice } from "@reduxjs/toolkit";

export const pointsSlice = createSlice({
  name: "points",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementPoints: (state) => {
      state.value += 20;
    },
    decrementPoints: (state) => {
      state.value -= 5;
    },
    resetPoints: (state) => {
      state.value = 0;
    },
  },
});

export const {
  incrementPoints,
  decrementPoints,
  resetPoints,
} = pointsSlice.actions;

export default pointsSlice.reducer;
