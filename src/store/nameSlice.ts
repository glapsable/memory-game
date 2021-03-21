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
    resetName: (state) => {
      state.value = "";
    },
  },
});

export const { changeName, resetName } = nameSlice.actions;

export default nameSlice.reducer;
