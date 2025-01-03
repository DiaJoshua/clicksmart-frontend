import React from "react";
import "./Home.css";
import cybercrime from "../../assets/cybercrime.jpg";
import question from"../../assets/icons/question.png";
import how from "../../assets/icons/how.png";
import manlaptop from "../../assets/manlaptop.png";
import manwithbot from"../../assets/manwithbot.png";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero split-layout">
        <div className="hero-left">
          <h1>In the first quarter of 2024, cybercrime cases in the Philippines rose by 22%, with thousands falling victim to scams, identity theft, and online fraud.</h1>
          <p>
            ClickSmart is here to empower you, providing tools, knowledge, and guidance to help you protect yourself and stay one step ahead of cybercriminals. Awareness and vigilance are our best defenses against this growing threat.
          </p>
        </div>
        <div className="hero-right">
          <img src={cybercrime} alt="Cybercrime Awareness" />
        </div>
      </section>

      {/* Floating Section with Links */}
      <section className="topics">
        <div className="container">
          <div className="topic">
            <img src={question} alt="What is ClickSmart" />
            <h2>What is ClickSmart for?</h2>
            <a href="#clicksmart-for" className="learn-more">Learn more</a>
          </div>
          <div className="topic">
            <img src={how} alt="How it works?" />
            <h2>How does ClickSmart Work?</h2>
            <a href="#clicksmart-work" className="learn-more">Learn more</a>
          </div>
        </div>
      </section>

      {/* What is ClickSmart for? Section */}
      <section id="clicksmart-for" className="clicksmart-info">
        <div className="container">
          <div className="clicksmart-left">
            <img src={manlaptop} alt="Cybercrime Awareness" />
          </div>
          <div className="clicksmart-right">
            <h2>What is ClickSmart for?</h2>
            <p className="p1">
              ClickSmart is a free online platform dedicated to helping Filipinos protect themselves against cybercrime. At its core is an AI-powered chatbot designed to answer frequently asked questions about cyber threats and provide step-by-step guidance for reporting incidents to the Philippine National Police (PNP) Anti-Cybercrime Group. The platform empowers users to recognize common threats like phishing and scams while encouraging proactive measures to safeguard their personal and digital lives.
            </p>
            <p className="p2">
              Cybercrime spares no one, it can strike anyone, anywhere, regardless of who you are. But with awareness and the right tools, you can fight back. ClickSmart, a thesis project by students of National University Philippines, is here to help you stay informed and protected.
            </p>
          </div>
        </div>
      </section>

      {/* How does ClickSmart Work? Section */}
      <section id="clicksmart-work" className="clicksmart-work">
        <div className="container">
          <div className="clicksmart-left">
            <h2>How does ClickSmart Work?</h2>
            <p className="p1">
              At the heart of the platform is an AI-powered chatbot that provides instant answers to your cybersecurity questions, helping you identify common cyber threats and guiding you through the process of reporting incidents. Whether you need to know how to recognize a phishing attempt or how to contact the Philippine National Police Anti-Cybercrime Group, the chatbot is here to assist 24/7.
            </p>
            <p className="p2">
              In addition to the chatbot, ClickSmart offers educational resources, including news on cybercrime trends, local cybercrime statistics, an offline PDF copy of the cybercrime guide, and assessments to test your knowledge on cybercrime or what you learn on this website. The website also provides practical tips for safeguarding your online presence and access to tools that simplify reporting cybercrime.
            </p>
          </div>
          <div className="clicksmart-right">
            <img src={manwithbot} alt="Cybercrime Awareness" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
