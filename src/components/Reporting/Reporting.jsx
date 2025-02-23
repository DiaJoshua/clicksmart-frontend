import React from "react";
import "./Reporting.css";
import Cybercriminals from "./Cybercriminals";
import CybercrimeGuide from "./CybercrimeGuide";
import CybercrimeReporting from "./CybercrimeReporting";

const Reporting = () => {
  return (
    <div className="reporting-page">
      {/* Cybercrime Hero Section */}
      <section className="cybercrime-intro">
        <div className="container">
          <div className="hero-center">
            <h1>What is Cybercrime?</h1>
            <p>
              Cybercrime includes illegal activities carried out using the
              internet or digital systems, from online scams to hacking and
              identity theft. With cyber threats evolving daily, knowing how to
              spot and prevent them is your first line of defense—explore this
              guide to stay protected.
            </p>
          </div>

          <div className="hero-content">
            <h2>Cybercrime in the Philippines</h2>
            <p>
              Cybercrime cases in the Philippines surged by{" "}
              <strong>22% in 2024</strong>, with online scams, hacking, and
              identity theft leading the threats. Many victims never report
              these crimes due to lack of awareness or fear of legal
              complexities.
            </p>

            <h2>Why It Matters Now More Than Ever</h2>
            <p>
              In a world where almost everything is connected online, cybercrime
              is no longer just a threat—it’s a reality affecting millions. From
              financial fraud to data breaches, understanding cyber risks is
              essential for safeguarding yourself and your community.
            </p>

            {/* Quiz Call-to-Action */}
            <div className="hero-quiz">
              <p>
                Are you prepared for the digital dangers ahead?
                <br /> Take a quick assessment to test your knowledge and learn
                how to stay safe.
              </p>
              <a href="/AssessmentForm" className="quiz-btn">
                Take a Quick Assessment
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cybercriminals Section */}
      <Cybercriminals />

      {/* Cybercrime Guide Section */}
      <CybercrimeGuide />

       {/*How to Report Cybercrime Guide Section */}
       <CybercrimeReporting />

    </div>
  );
};

export default Reporting;
