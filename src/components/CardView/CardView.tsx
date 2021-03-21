import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

export interface ICard {
  id: string;
  imageUrl: string;
  isFlipped: boolean;
  canFlip: boolean;
}

interface CardViewProps {
  card: ICard;
  onClick: () => void;
}

const useStyles = makeStyles({
  cardContainer: {
    width: 200,
    height: 300,
    perspective: 600,
    border: "none",
    backgroundColor: "unset",
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
  card: {
    width: "100%",
    height: "100%",
    position: "relative",
    transition: "transform 1s",
    transformStyle: "preserve-3d",
  },
  cardFace: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backfaceVisibility: "hidden",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  cardFaceFront: ({ card }: { card: ICard }) => {
    const backgroundUrl = `${process.env.PUBLIC_URL}${card.imageUrl}`;
    return {
      backgroundImage: `url(${backgroundUrl})`,
    };
  },
  cardFaceBack: () => {
    const backgroundUrl = `${process.env.PUBLIC_URL}/images/purple_back.jpg`;
    return {
      backgroundImage: `url(${backgroundUrl})`,
      transform: "rotateY(180deg)",
    };
  },
  cardIsFlipped: {
    transform: "rotateY(180deg)",
  },
});

export const CardView: React.FC<CardViewProps> = ({ card, onClick }) => {
  const classes = useStyles({ card });

  return (
    <button className={classes.cardContainer} type="button" onClick={onClick}>
      <div
        className={clsx(classes.card, card.isFlipped && classes.cardIsFlipped)}
      >
        <div className={clsx(classes.cardFace, classes.cardFaceFront)} />
        <div className={clsx(classes.cardFace, classes.cardFaceBack)} />
      </div>
    </button>
  );
};

export default CardView;
