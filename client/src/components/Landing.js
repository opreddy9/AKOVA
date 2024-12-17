import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//Fragments are needed when we want to render a group of elements without a parent element or component
function Landing() {
  return (
    <Fragment>
      <div>
        <div className="indexbody">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand mr-5" to="/">
              AKOVA
            </Link>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active mr-4">
                <Link className="nav-link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/register">
                  SIGNUP
                </Link>
              </li>
            </ul>
          </nav>
          <div className="container">
            <h1 className="h1 brand text-center">Akova</h1>
            <p className="text-center quote">
              Innovation distinguishes between a leader and a follower
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Landing;
