import { useEffect } from "react";
import "./Footer.css";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  // ✅ Automatically click the correct section if a hash is present in the URL
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the `#`
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  return (
    <footer className="footer">
      <div className="container">
        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/reporting"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Cybercrime Guide
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                About ClickSmart
              </Link>
            </li>
            <li>
              <Link
                to="/ResourcesHub"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Resources Hub
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li>
              <Link
                to="/ResourcesHub#pnp-acg"
                onClick={() => {
                  const element = document.getElementById("pnp-acg");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                PNP-ACG Branches
              </Link>
            </li>
            <li>
              <Link
                to="/ResourcesHub#devcontacts"
                onClick={() => {
                  const element = document.getElementById("devcontacts");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Developer Team Contacts
              </Link>
            </li>
            <li>
              <Link
                to="/ResourcesHub#offline"
                onClick={() => {
                  const element = document.getElementById("offline");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Downloadable Material
              </Link>
            </li>
            <li>
              <a
                href="https://www.facebook.com/messages/t/880299735387855"
                target="_blank"
                rel="noopener noreferrer"
              >
                Direct Message PNP-ACG
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/anticybercrimegroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                ACG Social Media Link
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 ClickSmart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
