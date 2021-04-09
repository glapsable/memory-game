import React, { useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardView, { ICard } from "../components/CardView/CardView";
import Routes from "../routes/routes";
import { incrementPoints, decrementPoints } from "../store/pointsSlice";
import { RootState } from "../store/store";
import { addPlayer } from "../store/rankingSlice";
import useCheckIfName from "../hooks/useNameCheck";
import {
  setCardIsFlipped,
  setCardCanFlip,
  setFirstCard,
  setSecondCard,
  resetFirstAndSecondCard,
} from "../store/cardsSlice";

const useStyles = makeStyles({
  gridItem: {
    textAlign: "center",
  },
});

export const GamePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.userName.value);
  const points = useSelector((state: RootState) => state.points.value);
  const cards = useSelector((state: RootState) => state.cards.allCards);
  const firstCard = useSelector((state: RootState) => state.cards.firstCard);
  const secondCard = useSelector((state: RootState) => state.cards.secondCard);

  useCheckIfName();

  const onSuccessGuess = useCallback(() => {
    if (firstCard !== null && secondCard !== null) {
      dispatch(setCardCanFlip({ cardId: firstCard.id, canFlip: false }));
      dispatch(setCardCanFlip({ cardId: secondCard.id, canFlip: false }));
      dispatch(resetFirstAndSecondCard());
      dispatch(incrementPoints());
    }
  }, [dispatch, firstCard, secondCard]);

  const onFailureGuess = useCallback(() => {
    if (firstCard !== null && secondCard !== null) {
      setTimeout(() => {
        dispatch(setCardIsFlipped({ cardId: firstCard.id, isFlipped: true }));
        dispatch(setCardIsFlipped({ cardId: secondCard.id, isFlipped: true }));
      }, 1000);
      dispatch(resetFirstAndSecondCard());
      dispatch(decrementPoints());
    }
  }, [dispatch, firstCard, secondCard]);

  useEffect(() => {
    if (!firstCard || !secondCard) {
      return;
    }
    if (firstCard.imageUrl === secondCard.imageUrl) {
      onSuccessGuess();
    } else {
      onFailureGuess();
    }
  }, [cards, firstCard, onFailureGuess, onSuccessGuess, secondCard]);

  const cardClickHandler = (card: ICard) => {
    if (!card.canFlip) {
      return;
    }
    if (
      (firstCard && card.id === firstCard.id) ||
      (secondCard && card.id === secondCard.id)
    ) {
      return;
    }

    dispatch(setCardIsFlipped({ cardId: card.id, isFlipped: false }));

    if (firstCard) {
      dispatch(setSecondCard(card));
    } else {
      dispatch(setFirstCard(card));
    }
  };

  useEffect(() => {
    const isAnyCardLeft = cards.some((card) => card.canFlip);

    if (!isAnyCardLeft) {
      setTimeout(() => {
        history.push(Routes.SCORE_PAGE);
      }, 1000);
      dispatch(addPlayer({ player: name, score: points }));
    }
  }, [cards, dispatch, history, name, points]);

  return (
    <Grid container>
      {cards.map((card) => {
        return (
          <Grid
            className={classes.gridItem}
            item
            xs={12}
            sm={6}
            md={3}
            key={card.id}
          >
            <CardView card={card} onClick={() => cardClickHandler(card)} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default GamePage;
