import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeName } from "../store/nameSlice";
import Routes from "../routes/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    initialPageWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    userInputsWrapper: {
      display: "flex",
      flexDirection: "column",
    },
    nameInput: {
      marginBottom: theme.spacing(5),
    },
  })
);

export const InitialPage: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();

  const clickStartButtonHandler = () => {
    dispatch(changeName(name));
    history.push(Routes.GAME_PAGE);
  };

  return (
    <div className={classes.initialPageWrapper}>
      <div className={classes.userInputsWrapper}>
        <TextField
          className={classes.nameInput}
          value={name}
          onChange={(event) => setName(event.target.value)}
          label="User name"
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!name}
          onClick={clickStartButtonHandler}
        >
          Start game!
        </Button>
      </div>
    </div>
  );
};

export default InitialPage;
