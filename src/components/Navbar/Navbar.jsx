import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/" aria-label="Navigate to Homepage">
          <img src={logo} alt="ClickSmart Logo" />
        </Link>
      </div>
      <nav className="nav-center" aria-label="Main Navigation">
        <ul className="nav-links">
          <li><Link to="/Reporting">Reporting Guide</Link></li>
          <li><Link to="/CybercrimeStatistics">Cybercrime Statistics</Link></li>
          <li><Link to="/About">About Us</Link></li>
          <li><Link to="/NewsArticles">Help Center</Link></li>
        </ul>
      </nav>
      <div className="language-selector">
        <label htmlFor="language-select" className="visually-hidden">
          Select Language
        </label>
        <select id="language-select" aria-label="Language Selector">
          <option value="en">English (English)</option>
          <option value="tl">Tagalog</option>
        </select>
      </div>
    </header>
  );
};

export default Navbar;
