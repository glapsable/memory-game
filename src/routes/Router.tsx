import React from "react";
import {Switch, Route} from 'react-router-dom';
import {Routes} from "./routes";
import InitialPage from "../views/InitialPage";
import GamePage from "../views/GamePage";
import ScorePage from "../views/ScorePage";

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path={Routes.INITIAL_PAGE} component={InitialPage} />
      <Route path={Routes.GAME_PAGE} component={GamePage} />
      <Route path={Routes.SCORE_PAGE} component={ScorePage} />
    </Switch>
  );
}

export default Router;
