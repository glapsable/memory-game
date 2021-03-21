import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import pointsReducer from "./pointsSlice";
import rankingReducer from "./rankingSlice";

const store = configureStore({
  reducer: {
    userName: nameReducer,
    points: pointsReducer,
    ranking: rankingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
