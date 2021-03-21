import React, { useCallback, useEffect, useMemo, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import deepcopy from "deepcopy";
import CardView, { ICard } from "../components/CardView/CardView";
import cardImages from "../cards";

const useStyles = makeStyles({
  gamePageWrapper: {},
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
  const [cards, setCards] = useState<ICard[]>(generateCards(TOTAL_CARDS_COUNT));
  const [canFlip, setCanFlip] = useState<boolean>(true);
  const [firstCard, setFirstCard] = useState<ICard | null>(null);
  const [secondCard, setSecondCard] = useState<ICard | null>(null);

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     let index = 0;
  //     // eslint-disable-next-line no-restricted-syntax
  //     for (const card of cards) {
  //       setTimeout(
  //         () => setCardIsFlipped(card.id, true),
  //         (index += index * 100)
  //       );
  //       setTimeout(() => setCanFlip(true), cards.length * 100);
  //     }
  //   });
  // });

  // useEffect(() => {
  //   setCanFlip(true);
  //   cards.forEach((card) => {
  //     setCardIsFlipped(card.id, true);
  //   });
  // }, [cards]);

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
    }
  }, [firstCard, secondCard]);

  const onFailureGuess = useCallback(() => {
    if (firstCard !== null && secondCard !== null) {
      const firstCardId = firstCard.id;
      const secondCardId = secondCard.id;
      setTimeout(() => {
        setCardIsFlipped(firstCardId, true);
        setCardIsFlipped(secondCardId, true);
      }, 1000);
      resetFirstAndSecondCards();
    }
  }, [firstCard, secondCard]);

  useEffect(() => {
    if (!firstCard || !secondCard) {
      return;
    }
    if (firstCard.id === secondCard.id) {
      onSuccessGuess();
    } else {
      onFailureGuess();
    }
  }, [firstCard, onFailureGuess, onSuccessGuess, secondCard]);

  const cardClickHandler = (card: ICard) => {
    if (!canFlip) {
      return;
    }
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

  return (
    <div className={classes.gamePageWrapper}>
      <Typography variant="h6">THE GAME</Typography>
      <Grid container>
        {cards.map((card) => {
          return (
            <Grid item xs={3} key={card.id}>
              <CardView card={card} onClick={() => cardClickHandler(card)} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GamePage;
