import React from "react";
import "./Footer.css";
import logo2 from "../../assets/logo/logo2.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Link></li>
            <li><Link to="/reporting" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Cybercrime Guide</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>About ClickSmart</Link></li>
            <li><Link to="/ResourcesHub" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Resources Hub</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><Link to="#">PNP Branches</Link></li>
            <li><Link to="#">Developer Team Contacts</Link></li>
            <li><Link to="#">Downloadable Material</Link></li>
            <li><a href="https://www.facebook.com/messages/t/880299735387855" target="_blank" rel="noopener noreferrer">Direct Message PNP-ACG</a></li>
            <li><a href="https://www.facebook.com/anticybercrimegroup" target="_blank" rel="noopener noreferrer">ACG Social Media Link</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms-of-use">Terms of Use</Link> | &copy; 2025 ClickSmart. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
