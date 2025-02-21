import React from "react";
import "./Reporting.css";
import Chatbot from "../Chatbot/Chatbot";
import { Link } from "react-router-dom"
import identify from "../../assets/icons/identify.png";
import evidence from "../../assets/icons/cevidence.png";
import contactcop from "../../assets/icons/contactcop.png";
import ensurereport from "../../assets/icons/ensurereport.png";

const Reporting = () => {
  return (
    <>
      <section className="report-page">
        <div className="container">
          <h1>Have anything to report?</h1>
          <p>Here's a step-by-step guide in reporting cybercrime activities in your area.</p>
          <Link to="/AssessmentForm" className="quiz-btn">Take a Quick Assessment</Link>
        </div>
      </section>

      <section className="steps-section container">
        <div className="step-card">
          <img src={identify} alt="Step 1: Identify the crime type" />
          <h3>Step 1</h3>
          <p>Identify the type of cybercrime you want to report.</p>
        </div>
        <div className="step-card">
          <img src={evidence} alt="Step 2: Collect evidence" />
          <h3>Step 2</h3>
          <p>Collect all evidence and documentation related to the crime.</p>
        </div>
        <div className="step-card">
          <img src={contactcop} alt="Step 3: Contact local authorities" />
          <h3>Step 3</h3>
          <p>Contact the appropriate local authorities or agencies.</p>
        </div>
        <div className="step-card">
          <img src={ensurereport} alt="Step 4: Ensure report processing" />
          <h3>Step 4</h3>
          <p>Follow up and ensure that your report is being processed.</p>
        </div>
      </section>
      {/* Chatbot */}
      <Chatbot />
    </>
  );
};

export default Reporting;