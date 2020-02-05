import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Inspector from "./pages/Inspector";
import Sposcars from "./pages/Sposcars";
import Producer from "./pages/Producer";
import Leaderboard from "./pages/LeaderBoardPage";
import Players from "./pages/PlayersPage";

const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Main/" component={Login} />
        <Route exact path="/Main/:id" component={Main} />
        <Route exact path="/Sposcars" component={Sposcars} />
        <Route exact path="/Inspector/" component={Inspector} />
        <Route exact path="/Producer/Phil" component={Producer} />
        <Route exact path="/Producer/Players" component={Players} />
        {/* <Route exact path="/Producer/Category" component={Category} /> */}
        <Route exact path="/Producer/Leaderboard" component={Leaderboard} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>;

export default App;
