import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo/logo.svg";
import { Link } from "react-router-dom";
import menuIcon from "../../assets/icons/menu.svg"; // Ensure this exists
import closeIcon from "../../assets/icons/close.svg"; // Ensure this exists

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Toggle Menu Visibility
  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Close menu when clicking a link (Mobile Fix)
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Detect Scroll for "scrolled" Class
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

  // Detect Screen Resize & Force Menu Button on Mobile/Zoomed-in Mode
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 1024 || window.devicePixelRatio >= 2) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkMobile(); // Run on first load
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Navigate to Homepage"
          >
            <img src={logo} alt="ClickSmart" />
          </Link>
        </div>

        {/* Mobile Menu Button (Always Appears on Mobile & 200% Zoom) */}
        {isMobile && (
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <img
              src={menuOpen ? closeIcon : menuIcon}
              alt="Menu Toggle"
              className="menu-icon"
            />
          </button>
        )}

        {/* Navigation Menu */}
        <nav
          className={`nav-center ${menuOpen ? "show" : ""}`}
          aria-label="Main Navigation"
        >
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>
              <Link
                to="/Reporting"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Cybercrime Guide
              </Link>
            </li>
            <li>
              <Link
                to="/CybercrimeStats"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Cybercrime Statistics
              </Link>
            </li>
            <li>
              <Link
                to="/About"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/ResourcesHub"
                onClick={() => {
                  closeMenu();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Resources Hub
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
