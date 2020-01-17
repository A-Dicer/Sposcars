import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";


const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Main/" component={Login} />
        <Route exact path="/Main/:id" component={Main} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>;

export default App;
