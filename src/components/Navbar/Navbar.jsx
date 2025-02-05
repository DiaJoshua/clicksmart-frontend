import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import arrowIcon from "../../assets/icons/arrow.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" aria-label="Navigate to Homepage">
          <img src={logo} alt="ClickSmart" />
        </Link>
      </div>

      {/* Button for toggling the menu */}
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        onClick={toggleMenu}
      >
        <img
          src={arrowIcon}
          alt="Toggle menu"
          className={`arrow-icon ${menuOpen ? "rotate" : ""}`} 
        />
      </button>

      {/* Navigation menu */}
      <nav className={`nav-center ${menuOpen ? "show" : ""}`} aria-label="Main Navigation">
        <ul className="nav-links">
          <li><Link to="/Reporting">Cybercrime Guide</Link></li>
          <li><Link to="/CybercrimeStats">Cybercrime Statistics</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/ResourcesHub">Resources Hub</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
