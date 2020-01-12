import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Picks from "./pages/Picks";


const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Picks} />
      </Switch>
    </div>
  </Router>;

export default App;
