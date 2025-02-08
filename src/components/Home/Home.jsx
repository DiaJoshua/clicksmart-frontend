import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Chatbot from "../Chatbot/Chatbot";
import NewsArticles from "../NewsArticles/NewsArticles";
import heroSection from "../../assets/heroSection.png";
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
      const sections = document.querySelectorAll(
        ".hero, .clicksmart-info, .news-section"
      );
      const viewportHeight = window.innerHeight;

      sections.forEach((section) => {
        if (section.classList.contains("clicksmart-info")) {
          section.style.minHeight =
            viewportHeight * 0.8 + "px"; /* Slightly smaller height */
        } else if (section.classList.contains("news-section")) {
          section.style.minHeight =
            viewportHeight * 0.75 + "px"; /* Keep News Section smaller */
        } else {
          section.style.minHeight =
            viewportHeight + "px"; /* Full viewport for Hero */
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
              <span style={{ color: "#7F7EFC" }}>
                Experiencing a cybercrime
              </span>
              <span style={{ fontWeight: 450 }}>
                 {" "} from a careless click can cost you, but a smart click can save
                you.
              </span>
              <span style={{ fontWeight: 600 }}>ClickSmart!</span>
            </h1>
            <p>
              ClickSmart is here to empower you by providing tools, knowledge,
              and guidance to help you protect yourself and stay one step ahead
              of cybercriminals. Awareness and vigilance are our best defenses
              against this growing threat.
            </p>
          </div>
          <div className="hero-right">
            <img src={heroSection} alt="Cybercrime Awareness" />
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
              ClickSmart is your <strong>free online ally</strong> against
              cybercrime, designed specifically for Filipinos. Our platform
              features an <strong>AI-powered chatbot</strong> that answers your
              questions about cyber threats and guides you on reporting
              incidents to the Philippine National Police (PNP) Anti-Cybercrime
              Group.
            </p>

            <p className="p2">
              Cybercrime can affect anyone, but with ClickSmart's resources, you
              can stay informed and protected. Join us today and take charge of
              your digital safety!
            </p>
          </div>
        </div>
      </section>

      {/* News Articles Section */}
      <NewsArticles />

      {/* How It Works */}
      <section className="how-it-works">
        <h2>
          Here's how <span style={{ color: "#7F7EFC" }}>ClickSmart</span> works:
        </h2>

        <div className="accordion">
          {/* Learn Section */}
          <div className="accordion-item">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(1)}
            >
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>LEARN:</span>
            </div>
            <div
              className={`accordion-content ${
                openSections.includes(1) ? "open" : ""
              }`}
            >
              <h4>Understand the Threats</h4>
              <ul>
                <li>
                  Dive into our <Link to="/Reporting" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}> <strong>Cybercrime Guide</strong>
                  </Link>, a comprehensive resource that
                  explains various types of cybercrime, how they occur, and how
                  to stay protected.
                </li>
                <li>
                  Interactive Chatbot Assistance: Need quick answers or
                  clarification? Our friendly ClickBot is here 24/7 to answer
                  your questions, offer personalized advice, and guide you
                  through the site.
                </li>
                <li>
                  Access examples and scenarios to better understand how
                  cybercriminals operate.
                </li>
              </ul>
            </div>
          </div>

          {/* Assess Section */}
          <div className="accordion-item">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(2)}
            >
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>ASSESS:</span>
            </div>
            <div
              className={`accordion-content ${
                openSections.includes(2) ? "open" : ""
              }`}
            >
              <h4>Gauge Your Knowledge</h4>
              <ul>
                <li>
                  Take our{" "}
                  <Link to="/AssessmentForm" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}> <strong>Cybercrime Awareness Quiz</strong>
                  </Link>{" "}
                  to check your knowledge of online threats.
                </li>
                <li>
                  After completing the quiz, you will see your total score.
                </li>
                <li>
                  Review your answers to see which questions you got wrong and
                  learn from your mistakes.
                </li>
                <li>
                  Retake the quiz anytime to track your progress and improve
                  your awareness.
                </li>
              </ul>
            </div>
          </div>

          {/* Report Section */}
          <div className="accordion-item">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(3)}
            >
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>REPORT:</span>
            </div>
            <div
              className={`accordion-content ${
                openSections.includes(3) ? "open" : ""
              }`}
            >
              <h4>Take Action When It Matters</h4>
              <ul>
                <li>
                  If you suspect or know you’ve been targeted by cybercrime,
                  redirect to <Link to="/Reporting" >Reporting Guide</Link> and
                  scroll down to find step-by-step guidance on how to report
                  incidents.
                </li>
                <li>
                  It has direct links to relevant authorities or agencies in the
                  Philippines are available to ensure prompt action.
                </li>
                <li>
                  If unsure about the reporting process, ask ChatBot to guide
                  you through it interactively.
                </li>
              </ul>
            </div>
          </div>

          {/* Stay Updated Section */}
          <div className="accordion-item">
            <div
              className="accordion-header"
              onClick={() => toggleAccordion(4)}
            >
              <button className="circle-arrow-btn">
                <img src={circleArrowBtn} alt="Expand/Collapse" />
              </button>
              <span>STAY UPDATED:</span>
            </div>
            <div
              className={`accordion-content ${
                openSections.includes(4) ? "open" : ""
              }`}
            >
              <h4>Keep Yourself Ahead</h4>
              <ul>
                <li>
                  Visit our {" "}
                  <Link to="/CybercrimeStats" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Cybercrime Statistics</Link> {" "}
                   section for the latest data on cybercrime trends in the
                  Philippines.
                </li>
                <li>
                  Download <strong>offline resources</strong>, including
                  <strong> {" "}infographics and educational materials</strong>, from
                  our {" "} <Link to="/ResourcesHub" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Resources Hub</Link>.
                </li>
                <li>
                  Find official
                  <strong> {" "} PNP Anti-Cybercrime Group contact details</strong> and
                  other important <strong>hotlines</strong> to report cybercrime
                  incidents.
                </li>
                <li>
                  Get in touch with the
                  <strong> {" "} ClickSmart development team</strong> for inquiries or
                  support.
                </li>
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
