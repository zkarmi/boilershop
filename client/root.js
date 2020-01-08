import React from "react";
import { HashRouter as Router, Link } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <nav className="nav">
        Already a member?
        <div>
          <form action="/api/auth/login" method="put">
            <input type="text" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" name="login" value="login" />
          </form>
        </div>
      </nav>
      <div>
        New? Click{" "}
        <Link to="/signup" className="links">
          here
        </Link>{" "}
        to signup.
      </div>
      <Router>
        <main>
          <div></div>
          <div id="main-links">
            <Link to="/allProducts" className="links">
              Shop All
            </Link>
            <Link to="/weather" className="links">
              Check The Weather
            </Link>
            <Link to="/facts" className="links">
              Interesting Facts
            </Link>
            <Link to="/fails" className="links">
              Watch Fails
            </Link>
          </div>
          <img
            className="main-pic"
            src={
              "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/18157600_1906077179604196_2966474633906820503_n.jpg?_nc_cat=110&_nc_ohc=cxWVbBLPdQcAQnSa7aiSi5S5fmG3FwJ3bYevoVdUJOc6O5sjFWfBTzLnQ&_nc_ht=scontent-iad3-1.xx&oh=cc587d0ff0deae052fbffcd0bdbbd857&oe=5E992A20"
            }
          />
        </main>
      </Router>
    </div>
  );
};

export default Root;
