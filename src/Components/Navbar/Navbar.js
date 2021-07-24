import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../Assets/image/favicon-32x32.png";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const navActive = () => setClick(!click);
  const closeNav = () => setClick(false);
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper bd-container">
        <div className="nav-logo">
          <Link to="/" onClick={closeNav} className="navbar-logo">
            <img src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="nav-list">
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" onClick={closeNav} className="nav-links">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/post" onClick={closeNav} className="nav-links">
                Post Memory
              </Link>
            </li>
          </ul>
        </div>
        {/* Click Nav-Menu Here */}
        <div
          className={click ? "menu-toggle active" : "menu-toggle"}
          onClick={navActive}
        ></div>
      </div>
    </div>
  );
}

export default Navbar;
