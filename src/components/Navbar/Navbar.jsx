import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo/logo.png";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/close.svg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking a link (Mobile Fix)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <Link to="/" aria-label="Navigate to Homepage">
          <img src={logo} alt="ClickSmart" />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        <img
          src={menuOpen ? closeIcon : menuIcon}
          alt="Menu Toggle"
          className="menu-icon"
        />
      </button>

      {/* Navigation Menu */}
      <nav className={`nav-center ${menuOpen ? "show" : ""}`} aria-label="Main Navigation">
        <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
          <li><Link to="/Reporting" onClick={closeMenu}>Cybercrime Guide</Link></li>
          <li><Link to="/CybercrimeStats" onClick={closeMenu}>Cybercrime Statistics</Link></li>
          <li><Link to="/About" onClick={closeMenu}>About Us</Link></li>
          <li><Link to="/ResourcesHub" onClick={closeMenu}>Resources Hub</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
