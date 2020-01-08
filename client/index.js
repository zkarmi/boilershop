// import css
import "../public/index.css";
import { render } from "react-dom";

// import react
import React from "react";
import ReactDOM from "react-dom";
import AllProducts from "./AllProducts";
import Root from "./root";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Facts from "./Facts";
import Weather from "./Weather";
import Fails from "./Fails";
render(
  <Router>
    <Switch>
      <Route exact path="/allProducts/" component={AllProducts} />
      <Route exact path="/" component={Root} />
      <Route exact path="/facts" component={Facts} />
      <Route exact path="/weather" component={Weather} />
      <Route exact path="/fails" component={Fails} />
    </Switch>
  </Router>,
  document.getElementById("app")
);
