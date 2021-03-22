import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Container, Toolbar, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const useStyles = makeStyles({
  layoutWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  mainWrapper: {
    flexGrow: 1,
  },
  toolbar: {
    justifyContent: "space-between",
  },
  appBar: {
    marginBottom: 10,
  },
});

export const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const name = useSelector((state: RootState) => state.userName.value);
  const points = useSelector((state: RootState) => state.points.value);

  return (
    <Container>
      <div className={classes.layoutWrapper}>
        <AppBar className={classes.appBar} position="static">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6">Memory game</Typography>
            <Typography variant="h6">Player: {name}</Typography>
            <Typography variant="h6">{points} points</Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.mainWrapper}>{children}</main>
      </div>
    </Container>
  );
};

export default Layout;
