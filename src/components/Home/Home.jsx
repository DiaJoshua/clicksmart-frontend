import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot";
import NewsArticles from "../NewsArticles/NewsArticles";
import cybercrime from "../../assets/cybercrime.jpg";
import whatBG from "../../assets/background/whatBG.svg";
import circleArrowBtn from "../../assets/circleArrowBtn.svg";

const Home = () => {
  const [openSections, setOpenSections] = useState([]);

  const toggleAccordion = (section) => {
    setOpenSections((prevSections) =>
      prevSections.includes(section)
        ? prevSections.filter((item) => item !== section)
        : [...prevSections, section]
    );
  };

  useEffect(() => {
    const adjustSectionHeight = () => {
      const sections = document.querySelectorAll(".hero, .clicksmart-info, .news-section");
      const viewportHeight = window.innerHeight;

      sections.forEach((section) => {
        if (section.classList.contains("clicksmart-info")) {
          section.style.minHeight = viewportHeight * 0.8 + "px"; /* Slightly smaller height */
        } else if (section.classList.contains("news-section")) {
          section.style.minHeight = viewportHeight * 0.75 + "px"; /* Keep News Section smaller */
        } else {
          section.style.minHeight = viewportHeight + "px"; /* Full viewport for Hero */
        }
      });
    };

    // Adjust on load and when resizing
    window.addEventListener("load", adjustSectionHeight);
    window.addEventListener("resize", adjustSectionHeight);

    return () => {
      window.removeEventListener("load", adjustSectionHeight);
      window.removeEventListener("resize", adjustSectionHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-left">
            <h1>
              In the first quarter of 2024, Cybercrime cases in the Philippines
              rose by 22%, with thousands falling victim to scams, identity
              theft, and online fraud.
            </h1>
            <p>
              ClickSmart is here to empower you by providing tools, knowledge,
              and guidance to help you protect yourself and stay one step ahead
              of cybercriminals. Awareness and vigilance are our best defenses
              against this growing threat.
            </p>
          </div>
          <div className="hero-right">
            <a
              href="https://www.facebook.com/PhilippineSTAR/photos/from-january-to-march-2024-the-acg-recorded-4469-cybercrimes-compared-to-3668-ca/842508764579671/?_rdr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={cybercrime} alt="Cybercrime Awareness" />
            </a>
          </div>
        </div>
      </section>

      {/* What is ClickSmart? */}
      <section id="clicksmart-for" className="clicksmart-info">
        <div className="container">
          <div className="clicksmart-left">
            <img src={whatBG} alt="Cybercrime Awareness" />
          </div>
          <div className="clicksmart-right">
            <h1>What is ClickSmart?</h1>
            <p className="p1">
              ClickSmart is your <strong>free online ally</strong> against cybercrime, designed specifically for Filipinos. Our platform features an <strong>AI-powered chatbot</strong> that answers your questions about cyber threats and guides you on reporting incidents to the Philippine National Police (PNP) Anti-Cybercrime Group.
            </p>

            <p className="p2">
              Cybercrime can affect anyone, but with ClickSmart's resources, you can stay informed and protected. Join us today and take charge of your digital safety!
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Section */}
      <NewsArticles />

      {/* How It Works */}
      <section className="how-it-works">
        <h2>Here's how it works:</h2>
        <div className="accordion">
          {/* Learn Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(1)}>
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>LEARN:</span>
            </div>
            <div
              className={`accordion-content ${openSections.includes(1) ? 'open' : ''}`}
            >
              <h4>Understand the Threats</h4>
              <ul>
                <li>Dive into our Cybercrime Guide, a comprehensive resource that explains various types of cybercrime, how they occur, and how to stay protected.</li>
                <li>Interactive Chatbot Assistance: Need quick answers or clarification? Our friendly ClickBot is here 24/7 to answer your questions, offer personalized advice, and guide you through the site.</li>
                <li>Access examples and scenarios to better understand how cybercriminals operate.</li>
              </ul>
            </div>
          </div>

          {/* Assess Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(2)}>
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>ASSESS:</span>
            </div>
            <div
              className={`accordion-content ${openSections.includes(2) ? 'open' : ''}`}
            >
              <h4>Gauge Your Knowledge</h4>
              <ul>
                <li>Before or after going through our guides, take a <strong>Cybercrime Awareness Quiz.</strong></li>
                <li>The quiz evaluates your current understanding of cybercrime and suggests areas for improvement.</li>
                <li>Results include tailored recommendations to strengthen your knowledge and security practices.</li>
                <li>Challenge yourself with periodic assessments to track your learning progress over time.</li>
              </ul>
            </div>
          </div>

          {/* Report Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(3)}>
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>REPORT:</span>
            </div>
            <div
              className={`accordion-content ${openSections.includes(3) ? 'open' : ''}`}
            >
              <h4>Take Action When It Matters</h4>
              <ul>
                <li>
                  If you suspect or know you’ve been targeted by cybercrime, use our <Link to="/Reporting">Reporting Guide</Link> to find step-by-step guidance on how to report incidents.
                </li>
                <li>Direct links to relevant authorities or agencies in the Philippines are available to ensure prompt action.</li>
                <li>If unsure about the reporting process, ask ChatBot to guide you through it interactively.</li>
              </ul>
            </div>
          </div>

          {/* Stay Updated Section */}
          <div className="accordion-item">
            <div className="accordion-header" onClick={() => toggleAccordion(4)}>
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>STAY UPDATED:</span>
            </div>
            <div
              className={`accordion-content ${openSections.includes(4) ? 'open' : ''}`}
            >
              <h4>Keep Yourself Ahead</h4>
              <ul>
                <li>Visit our <Link to="/CybercrimeStats">Cybercrime Statistics</Link> section to see the latest data on cybercrime trends in the Philippines.</li>
                <li>Follow updates in our <Link to="/ResourcesHub">Resources Hub</Link>, featuring the latest news, expert articles, and resources about cybersecurity.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

export default Home;
