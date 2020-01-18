import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Inspector from "./pages/Inspector";


const App = () =>
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Main/" component={Login} />
        <Route exact path="/Main/:id" component={Main} />
        <Route exact path="/Inspector/" component={Inspector} />
        <Route component={Login} />
      </Switch>
    </div>
  </Router>;

export default App;
