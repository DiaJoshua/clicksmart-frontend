import "./About.css";
import computerBG from "../../assets/background/computerBG.png";  // Adjust the import path accordingly

const About = () => {
  return (
    <div className="about-page">
      {/* About Hero Section */}
      <section className="about-page-hero">
        <div className="about-container">
          <div className="about-hero-left">
            <h1>About <span style={{ color: "#7F5EFC" }}>ClickSmart</span></h1>
            <p className="p">
              <strong>ClickSmart</strong> is a free online platform dedicated to helping Filipinos stay informed and cautious online. With an <strong>AI-powered chatbot</strong> and <strong>educational resources</strong>, ClickSmart makes it easier to understand cyber threats, recognize scams, and learn how to report cybercrime to the Philippines authorities.
            </p>
            <p className="p">
              We believe that knowledge is the first line of defense — but ultimately, it is up to the individual to decide how to <strong>respond, react, and act upon the information they acquire</strong>. This project is based on the <strong>Protection Motivation Theory (PMT)</strong>, which says that people are more likely to protect themselves from cyber threats when they <strong>understand the risks, see how serious the threat is, and believe that safety measures work.</strong>
            </p>
          </div>
          <div className="about-hero-right">
            <img src={computerBG} alt="Cybercrime Awareness" />
          </div>
        </div>
      </section>

      {/* New Content Section: Made By Students */}
      <section className="about-page-made">
        <div className="about-container">
          <div className="about-made-left">
            {/* You can add additional content here if needed */}
          </div>
          <div className="about-made-right">
            <h1>Made by Students</h1>
            <p className="p">
              ClickSmart is a <strong>thesis project by students of National University Philippines</strong>, created to help <strong>raise awareness and educate Filipinos about online threats</strong>.
            </p>
            <p className="p">
              <strong>Cybercrime</strong> can happen to anyone, anywhere—no one is immune. But <strong>awareness</strong> is the first step toward staying safe. Our <strong>goal</strong> is to make cybersecurity information more accessible and easier to understand.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
