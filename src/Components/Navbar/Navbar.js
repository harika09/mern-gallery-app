import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper bd-container">
        <div className="nav-logo">
          <Link to="/" className="navbar-logo">
            LOGO
          </Link>
        </div>

        <div className="nav-list">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link to="/" className="nav-links">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/post" className="nav-links">
                Post Memory
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
