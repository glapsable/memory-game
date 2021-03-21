import { createSlice } from "@reduxjs/toolkit";

export const nameSlice = createSlice({
  name: "userName",
  initialState: {
    value: "",
  },
  reducers: {
    changeName: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeName } = nameSlice.actions;

export default nameSlice.reducer;
