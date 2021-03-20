import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

export interface ScorePageProps {}

const useStyles = makeStyles({});

export const ScorePage: React.FC<ScorePageProps> = () => {
  const classes = useStyles();
  return <div>Score page</div>;
};

export default ScorePage;