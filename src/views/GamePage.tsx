import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export interface GamePageProps {}

const useStyles = makeStyles({});

export const GamePage: React.FC<GamePageProps> = () => {
  const classes = useStyles();
  return <div>Game page</div>;
};

export default GamePage;