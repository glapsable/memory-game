import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, TextField} from "@material-ui/core";

export interface InitialPageProps {}

const useStyles = makeStyles((theme: Theme) => createStyles({
  initialPageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  userInputsWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  nameInput: {
    marginBottom: theme.spacing(5)
  }
}));

export const InitialPage: React.FC<InitialPageProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.initialPageWrapper}>
      <div className={classes.userInputsWrapper}>
        <TextField className={classes.nameInput} label="User name" />
        <Button variant="contained" color="primary">
          Start game!
        </Button>
      </div>
    </div>
  );
};

export default InitialPage;