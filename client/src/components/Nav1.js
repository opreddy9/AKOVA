import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
function Nav1() {
    const navigate=useNavigate();
    const onLogout = async (e) => {
        localStorage.removeItem("token");
        localStorage.removeItem("profession");
        navigate("/login");
      };
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark ">
          <div className="container text-white">
                <Link className="navbar-brand" to="/student_dashboard">
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
                      <Link className="nav-link text-white" to="/yourIdeas">
                        Your Ideas
                      </Link>
                    </li>
                    <li className="nav-item text-white">
                      <Link
                        className="nav-link text-white"
                        to="/student_profile"
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

export default Nav1;
