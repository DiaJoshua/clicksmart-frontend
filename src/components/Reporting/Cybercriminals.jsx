import React, { useState } from "react";
import "./Reporting.css";
import hackerImg from "../../assets/typesCCriminals/Hacker.png";
import cyberOrgImg from "../../assets/typesCCriminals/cyberOrgs.png";
import scammerImg from "../../assets/typesCCriminals/scammer.png";
import doxxerImg from "../../assets/typesCCriminals/doxxer.png";
import terroristImg from "../../assets/typesCCriminals/cTerrorist.png";
import insiderImg from "../../assets/typesCCriminals/insider.png";
import bullyImg from "../../assets/typesCCriminals/cBully.png";
import darkWebImg from "../../assets/typesCCriminals/darkWeb.png";
import deepfakeImg from "../../assets/typesCCriminals/deepfake.png";
import iotScamImg from "../../assets/typesCCriminals/iotScam.png";
import nftScamImg from "../../assets/typesCCriminals/nftScam.png";

const cybercriminalsData = [
    {
        id: "hackers",
        img: hackerImg,
        title: "Hackers",
        description: "Individuals who gain unauthorized access to systems for different reasons.",
        details: [
          "Black Hat Hackers – Exploit security flaws for malicious intent.",
          "White Hat Hackers – Security experts who help companies find vulnerabilities legally.",
          "Grey Hat Hackers – Sometimes help fix security issues after breaking in.",
          "Red Hat Hackers – Actively attack black hat hackers.",
          "Blue Hat Hackers – Security testers hired by companies before product launches.",
          "Script Kiddies – Use pre-made hacking tools with no deep knowledge.",
          "Insider Hackers – Employees who exploit internal systems.",
        ],
      },
      {
        id: "cybercriminal-org",
        img: cyberOrgImg,
        title: "Cybercriminal Organizations",
        description: "Cybercrime groups that work together for large-scale digital crime.",
        details: [
          "Cyber Mafia – Organized groups committing large-scale cybercrime.",
          "Advanced Persistent Threat (APT) Groups – State-sponsored hackers for espionage.",
          "Dark Web Syndicates – Trade stolen data, hacking tools, and illegal goods.",
        ],
      },
      {
        id: "financial-criminals",
        img: scammerImg,
        title: "Scammers & Fraudsters",
        description: "Cybercriminals who deceive people or businesses to steal money or financial data.",
        details: [
          "Phishers – Trick victims into revealing sensitive data.",
          "Online Scammers – Fake investment and Ponzi schemes.",
          "Romance Scammers – Pretend to be in love to steal money.",
          "Crypto Scammers – Fake crypto investments, rug pulls.",
          "Credit Card Fraudsters – Steal and use credit card data.",
          "BEC Criminals – Impersonate executives to trick companies into wiring money.",
          "Money Mules – Help cybercriminals launder stolen money.",
        ],
      },
      {
        id: "cyber-extortionists",
        img: doxxerImg,
        title: "Cyber Extortionists",
        description: "Cybercriminals who demand money by threatening victims.",
        details: [
          "Ransomware Attackers – Encrypt files, demand ransom.",
          "Doxxers – Expose private info to blackmail victims.",
          "Fake Kidnapping Scammers – Pretend to have kidnapped someone and demand ransom.",
          "Sextortionists – Threaten to leak explicit content.",
        ],
      },
      {
        id: "cyber-terrorists",
        img: terroristImg,
        title: "Cyber Terrorists",
        description: "Cybercriminals who attack for ideological, political, or military reasons.",
        details: [
          "State-Sponsored Hackers – Government-backed espionage.",
          "Hacktivists – Protestors using hacking (e.g., Anonymous).",
          "Digital Saboteurs – Attack government or corporate networks to disrupt operations.",
          "Election Hackers – Manipulate elections with cyberattacks.",
        ],
      },
      {
        id: "insider-threats",
        img: insiderImg,
        title: "The Insider Threats",
        description: "Cybercriminals who steal trade secrets, manipulate data, or sabotage businesses.",
        details: [
          "Insider Threats – Employees who leak or misuse sensitive company data.",
          "Corporate Spies – Steal business secrets.",
          "Whistleblower Hackers – Leak classified information.",
          "Supply Chain Attackers – Target software suppliers to gain access to bigger systems.",
        ],
      },
      {
        id: "cyberbullies",
        img: bullyImg,
        title: "Cyberbullies & Harassers",
        description: "Criminals who harass, intimidate, or exploit others online.",
        details: [
          "Cyberstalkers – Track and harass victims online.",
          "Trolls – Provoke users with offensive comments.",
          "Revenge Porn Criminals – Share private images without consent.",
          "Catfishers – Pretend to be someone else online to manipulate victims.",
        ],
      },
      {
        id: "dark-web",
        img: darkWebImg,
        title: "Dark Web Criminals",
        description: "Cybercriminals operating in the dark web, a hidden part of the internet.",
        details: [
          "Darknet Vendors – Sell stolen data, hacking tools.",
          "Drug & Weapon Traders – Sell illegal goods anonymously.",
          "Human Traffickers – Use the dark web for illegal activities.",
        ],
      },
      {
        id: "ai-criminals",
        img: deepfakeImg,
        title: "AI Cybercriminals",
        description: "Cybercriminals using artificial intelligence (AI) for digital crime.",
        details: [
          "Deepfake Scammers – Use AI to create fake videos or voices for fraud.",
          "Automated Hacking Bots – AI systems that attack multiple targets automatically.",
          "AI-Powered Phishing – AI-generated scam messages that mimic real people.",
        ],
      },
      {
        id: "iot-hackers",
        img: iotScamImg,
        title: "IoT Hackers",
        description: "Cybercriminals who target Internet of Things (IoT) devices.",
        details: [
          "Smart Home Hackers – Control smart locks and cameras.",
          "Self-Driving Car Hackers – Exploit vulnerabilities in autonomous vehicles.",
          "Botnet Creators – Use malware to hijack IoT devices.",
        ],
      },
      {
        id: "nft-scammers",
        img: nftScamImg,
        title: "NFT & Crypto Scammers",
        description: "Cybercriminals who exploit NFTs, blockchain, and cryptocurrency platforms.",
        details: [
          "Rug Pull Scammers – Fake NFT projects that steal investor money.",
          "Fake Crypto Exchanges – Phishing sites that steal wallet access.",
          "Smart Contract Exploiters – Hackers who manipulate DeFi platforms.",
        ],
      },
    ];

const Cybercriminals = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");

  // Handle card click
  const handleCardClick = (id, event) => {
    event.stopPropagation(); // Prevents event bubbling

    // Toggle the active state
    setActiveCard(activeCard === id ? null : id);

    // Adjust section height dynamically
    setTimeout(() => {
      const cardElement = document.getElementById(id);
      if (cardElement) {
        const newHeight = activeCard === id ? "100vh" : `${cardElement.scrollHeight + 150}px`;
        setSectionHeight(newHeight);
      }
    }, 300);
  };

  // Handle clicking outside to close all cards
  const handleOutsideClick = (event) => {
    if (!event.target.closest(".cybercriminal-card")) {
      setActiveCard(null);
      setSectionHeight("100vh");
    }
  };

  return (
    <section className="cybercriminals" style={{ minHeight: sectionHeight }} onClick={handleOutsideClick}>
      <div className="container">
        <h2>Types of Cybercriminals</h2>
        <p className="cybercriminals-intro" >
          Before exploring cybercrimes, let’s first identify those who commit them. Click to learn more.
        </p>

        <div className="cybercriminal-grid">
          {cybercriminalsData.map((criminal) => (
            <div
              key={criminal.id}
              id={criminal.id}
              className={`cybercriminal-card ${activeCard === criminal.id ? "active" : ""}`}
              onClick={(event) => handleCardClick(criminal.id, event)}
            >
              <img src={criminal.img} alt={criminal.title} />
              <h3>{criminal.title}</h3>
              <p className="cyber-description">
                <strong>{criminal.description}</strong>
              </p>
              {activeCard === criminal.id && (
                <p className="cyber-info">
                  {criminal.details.map((detail, index) => (
                    <span key={index}>
                      <strong>{detail.split(" – ")[0]}</strong> – {detail.split(" – ")[1]}
                      <br />
                    </span>
                  ))}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="cybercriminals-note">
          <strong>
            However, as technology evolves, new types of cybercriminals will continue to emerge.
          </strong>{" "}
          Staying informed about their tactics is crucial in protecting yourself from digital threats.
        </p>
      </div>
    </section>
  );
};

export default Cybercriminals;
