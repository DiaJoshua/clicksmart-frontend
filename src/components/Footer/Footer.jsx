import React from "react";
import "./Footer.css";
import logo2 from "../../assets/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#">Articles</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">PNP Branch</a></li>
            <li><a href="#">PNP Contact</a></li>
            <li><a href="#">Emails</a></li>
            <li>
              <a
                href="https://www.facebook.com/anticybercrimegroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                Social Media Links
              </a>
            </li>
          </ul>
        </div>
        <div className="logo">
          <a href="index.html">
            <Link to="/" aria-label="Navigate to Homepage">
            <img src={logo2} alt="ClickSmart Logo" />
            </Link>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Privacy Policy | Cookie Policy | Do Not Sell Any Personal Information | Terms & Conditions
        </p>
        <p>All Rights Reserved &copy;2025</p>
      </div>
    </footer>
  );
};

export default Footer;
