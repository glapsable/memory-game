import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export interface LayoutProps {}

export enum DataTests {}

const useStyles = makeStyles({
  layoutWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  },
  mainWrapper: {
    flexGrow: 1
  }
});

export const Layout: React.FC<LayoutProps> = ({children}) => {
  const classes = useStyles();

  return (
    <Container>
    <div className={classes.layoutWrapper}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">
              Memory game
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.mainWrapper}>
          {children}
        </main>
    </div>
    </Container>
  );
};

export default Layout;