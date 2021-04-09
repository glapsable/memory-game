import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Routes from "../routes/routes";
import { RootState } from "../store/store";
import { resetName } from "../store/nameSlice";
import { resetPoints } from "../store/pointsSlice";
import useCheckIfName from "../hooks/useNameCheck";

const useStyles = makeStyles({
  rankingWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    maxWidth: 500,
    margin: "auto",
    height: "100%",
  },
});

export const ScorePage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const ranking = useSelector((state: RootState) => state.ranking);
  const dispatch = useDispatch();

  useCheckIfName();

  const startNewGameHandler = () => {
    dispatch(resetName());
    dispatch(resetPoints());
    history.push(Routes.INITIAL_PAGE);
  };

  return (
    <div className={classes.rankingWrapper}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Player</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Points</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ranking
              .slice()
              .sort((a, b) => {
                return b.score - a.score;
              })
              .map((row, index) => (
                <TableRow key={row.player}>
                  <TableCell component="th" scope="row">
                    {index + 1}. {row.player}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="primary" onClick={startNewGameHandler}>
        Play again!
      </Button>
    </div>
  );
};

export default ScorePage;
