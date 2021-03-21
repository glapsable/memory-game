import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IRankingItem {
  player: string;
  score: number;
}

export const rankinglice = createSlice({
  name: "ranking",
  initialState: [] as IRankingItem[],
  reducers: {
    addPlayer: (state, action: PayloadAction<IRankingItem>) => {
      const newPlayer = {
        player: action.payload.player,
        score: action.payload.score,
      };
      state.push(newPlayer);
    },
  },
});

export const { addPlayer } = rankinglice.actions;

export default rankinglice.reducer;
