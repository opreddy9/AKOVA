import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav2() {
  const navigate = useNavigate();
  const onLogout = async (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("profession");
    navigate("/login");
  };
  //button navbar toggle is used to access collapsable navbar items
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark ">
        <div className="container text-white">
          <Link className="navbar-brand" to="/investor_dashboard">
            Akova
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar1"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbar1">
            <ul className="navbar-nav nav nav-fill w-100">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/investments_accepted">
                  Your Investments
                </Link>
              </li>
              <li className="nav-item text-white">
                <Link
                  className="nav-link text-white"
                  to="/investor_profile"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    onLogout(e);
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Nav2;