import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import deepcopy from "deepcopy";
import { ICard } from "../components/CardView/CardView";
import cardImages from "../cards";

interface CardsState {
  allCards: ICard[];
  firstCard: ICard | null;
  secondCard: ICard | null;
}

const TOTAL_CARDS_COUNT = 12;

const shuffleArray = (array: any[]) => {
  return array.sort(() => 0.5 - Math.random());
};

const generateCards: (count: number) => ICard[] = (count) => {
  if (count % 2 !== 0) {
    throw Error("Only even numbers!");
  }
  const cards = shuffleArray(cardImages)
    .slice(0, count / 2)
    .map((imageUrl: string) => ({
      id: uuidv4(),
      imageUrl: `images/cards/${imageUrl}`,
      isFlipped: true,
      canFlip: true,
    }))
    .flatMap((e) => [e, { ...deepcopy(e), id: uuidv4() }]);

  return shuffleArray(cards);
};

const initialState: CardsState = {
  allCards: generateCards(TOTAL_CARDS_COUNT),
  firstCard: null,
  secondCard: null,
};

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setFirstCard: (state, action: PayloadAction<ICard>) => {
      state.firstCard = action.payload;
    },
    setSecondCard: (state, action: PayloadAction<ICard>) => {
      state.secondCard = action.payload;
    },
    setCardIsFlipped: (
      state,
      action: PayloadAction<{ cardId: string; isFlipped: boolean }>
    ) => {
      state.allCards = state.allCards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, isFlipped: action.payload.isFlipped };
        }
        return card;
      });
    },
    setCardCanFlip: (
      state,
      action: PayloadAction<{ cardId: string; canFlip: boolean }>
    ) => {
      state.allCards = state.allCards.map((card) => {
        if (card.id === action.payload.cardId) {
          return { ...card, canFlip: action.payload.canFlip };
        }
        return card;
      });
    },
    resetFirstAndSecondCard: (state) => {
      state.firstCard = null;
      state.secondCard = null;
    },
  },
});

export const {
  setFirstCard,
  setSecondCard,
  setCardIsFlipped,
  setCardCanFlip,
  resetFirstAndSecondCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
