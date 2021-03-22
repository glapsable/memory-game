import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import deepcopy from "deepcopy";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardView, { ICard } from "../components/CardView/CardView";
import cardImages from "../cards";
import Routes from "../routes/routes";
import { incrementPoints, decrementPoints } from "../store/pointsSlice";
import { RootState } from "../store/store";
import { addPlayer } from "../store/rankingSlice";

const useStyles = makeStyles({
  gridItem: {
    textAlign: "center",
  },
});

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

export const GamePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.userName.value);
  const points = useSelector((state: RootState) => state.points.value);
  const [cards, setCards] = useState<ICard[]>(generateCards(TOTAL_CARDS_COUNT));
  const [firstCard, setFirstCard] = useState<ICard | null>(null);
  const [secondCard, setSecondCard] = useState<ICard | null>(null);

  useEffect(() => {
    if (!name) {
      history.push(Routes.INITIAL_PAGE);
    }
  }, [history, name]);

  const setCardIsFlipped = (cardId: string, isFlipped: boolean) => {
    setCards((prevState) =>
      prevState.map((card) => {
        if (card.id === cardId) {
          return { ...card, isFlipped };
        }
        return card;
      })
    );
  };

  const setCardCanFlip = (cardId: string, canFlip: boolean) => {
    setCards((prevState) =>
      prevState.map((card) => {
        if (card.id === cardId) {
          return { ...card, canFlip };
        }
        return card;
      })
    );
  };

  const resetFirstAndSecondCards = () => {
    setFirstCard(null);
    setSecondCard(null);
  };

  const onSuccessGuess = useCallback(() => {
    if (firstCard !== null && secondCard !== null) {
      setCardCanFlip(firstCard.id, false);
      setCardCanFlip(secondCard.id, false);
      setCardIsFlipped(firstCard.id, false);
      setCardIsFlipped(secondCard.id, false);
      resetFirstAndSecondCards();
      dispatch(incrementPoints());
    }
  }, [dispatch, firstCard, secondCard]);

  const onFailureGuess = useCallback(() => {
    if (firstCard !== null && secondCard !== null) {
      const firstCardId = firstCard.id;
      const secondCardId = secondCard.id;
      setTimeout(() => {
        setCardIsFlipped(firstCardId, true);
        setCardIsFlipped(secondCardId, true);
      }, 1000);
      resetFirstAndSecondCards();
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

    setCardIsFlipped(card.id, false);

    if (firstCard) {
      setSecondCard(card);
    } else {
      setFirstCard(card);
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
