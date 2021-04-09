import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./nameSlice";
import pointsReducer from "./pointsSlice";
import rankingReducer from "./rankingSlice";
import cardsReducer from "./cardsSlice";

const store = configureStore({
  reducer: {
    userName: nameReducer,
    points: pointsReducer,
    ranking: rankingReducer,
    cards: cardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
