import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import pointsReducer from "./pointsSlice";

export default configureStore({
  reducer: {
    userName: nameReducer,
    points: pointsReducer,
  },
});
