import React, { Component } from "react";
import { HashRouter as Router, Link } from "react-router-dom";

export default class Weather extends Component {
  render() {
    return (
      <div className="weather-page">
        <h1 className="weather-head">Procrastinate now, don't put it off</h1>
        <Link className="fact-page" to="/">
          Home Page
        </Link>
      </div>
    );
  }
}
