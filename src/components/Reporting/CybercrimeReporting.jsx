import { useState } from "react";
import "./Reporting.css";

const CybercrimeReporting = () => {
  // **State Variables**
  const [selectedType, setSelectedType] = useState("");
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isWarningVisible, setIsWarningVisible] = useState(false);

  // **Cybercrime Report Data**
  const reportData = {
    "identity-theft": {
      title: "Identity Theft",
      agencies: [
        { name: "PNP-ACG", contact: "(632) 723-0401 / acg@pnp.gov.ph", link: "https://acg.pnp.gov.ph" },
        { name: "NBI Cybercrime Division", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
        { name: "National Privacy Commission (NPC)", contact: "(632) 8234-2228 / complaints@privacy.gov.ph", link: "https://privacy.gov.ph" }
      ],
      steps: [
        "Secure your accounts: Change passwords & enable Two-Factor Authentication (2FA).",
        "Gather evidence: Take screenshots of unauthorized transactions and messages.",
        "Report identity theft to PNP-ACG, NBI Cybercrime Division, or NPC."
      ],
      tip: "Monitor your credit and bank statements regularly for unauthorized activities."
    },
    "online-scams": {
      title: "Online Scams & Fraud",
      agencies: [
        { name: "PNP-ACG", contact: "(632) 723-0401 / acg@pnp.gov.ph", link: "https://acg.pnp.gov.ph" },
        { name: "NBI Cybercrime Division", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
        { name: "DTI (for e-commerce fraud)", contact: "Hotline: 1-384 / consumercare@dti.gov.ph", link: "https://www.dti.gov.ph" }
      ],
      steps: [
        "Take screenshots of scam messages, fake seller profiles, and fraudulent websites.",
        "Report small-scale scams to PNP-ACG; large-scale fraud to NBI Cybercrime Division.",
        "For e-commerce scams (Shopee/Lazada fraud), file a report with DTI."
      ],
      tip: "Verify online sellers before making payments. Avoid deals that seem too good to be true."
    },
    "phishing": {
        title: "Phishing & Online Fraud",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401 / acg@pnp.gov.ph", link: "https://acg.pnp.gov.ph" },
            { name: "NBI Cybercrime Division", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
            { name: "CICC", contact: "Hotline: 1326 / complaints@cicc.gov.ph", link: "https://cicc.gov.ph" }
        ],
        steps: [
            "Do not click on suspicious links or provide personal information.",
            "Report phishing emails and websites to Google Safe Browsing and Microsoft Security.",
            "If financial fraud occurred, report it to your bank and BSP."
        ],
        tip: "Always verify links before entering login credentials or financial details."
    },

    "cyberbullying": {
        title: "Cyberbullying & Online Harassment",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401 / acg@pnp.gov.ph", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
            { name: "DepEd (for student victims)", contact: "DepEd Child Protection Committee", link: "https://www.deped.gov.ph" }
        ],
        steps: [
            "Take screenshots of abusive messages, posts, or threats.",
            "Block and report the offender on the social media platform.",
            "Report to PNP-ACG or NBI-CCD for investigation.",
            "If the victim is a student, report the incident to the DepEd Child Protection Committee."
        ],
        tip: "Do not engage with cyberbullies—block and report them immediately."
    },
    "sextortion": {
        title: "Sextortion & Online Blackmail",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" }
        ],
        steps: [
            "Do NOT give in to demands or send more explicit content.",
            "Block the blackmailer and take screenshots of threats.",
            "Report the case immediately to PNP-ACG or NBI-CCD.",
            "If the content was shared, request takedown from social media platforms."
        ],
        tip: "Never share intimate images online—even with people you trust."
    },

    "cyber-libel": {
        title: "Cyber Libel & Defamation",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
            { name: "DOJ Office of Cybercrime", contact: "(632) 8523-8481 / cybercrime@doj.gov.ph", link: "https://www.doj.gov.ph" }
        ],
        steps: [
            "Gather evidence: Take screenshots of defamatory posts or messages.",
            "If false accusations are spreading online, issue a clarification statement.",
            "Report to PNP-ACG or NBI-CCD if the defamatory post is damaging your reputation.",
            "Consult a lawyer to file a formal complaint under RA 10175 (Cybercrime Prevention Act)."
        ],
        tip: "Be careful of what you post online—cyber libel is a punishable offense."
    },

    "hacking": {
        title: "Hacking & Unauthorized Access",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI Cybercrime Division", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" }
        ],
        steps: [
            "If you suspect your account has been hacked, immediately change passwords and enable 2FA.",
            "Gather evidence: Take screenshots of suspicious login activities or unauthorized transactions.",
            "Report hacking cases to PNP-ACG, NBI Cybercrime Division, or DICT Cybersecurity Bureau.",
            "Notify the affected online service (Facebook, Google, bank, etc.) to recover your account."
        ],
        tip: "Use strong passwords and avoid using the same credentials across multiple accounts."
    },

    "insider-threats": {
        title: "Insider Threats & Data Leaks",
        agencies: [
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" },
            { name: "NBI Cybercrime Division", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" }
        ],
        steps: [
            "If you suspect an insider is leaking sensitive data, immediately secure affected systems.",
            "Gather logs, messages, or internal reports as evidence.",
            "Report the incident to DICT Cybersecurity Bureau, NBI Cybercrime Division, or PNP-ACG.",
            "Implement security measures such as access control and employee monitoring."
        ],
        tip: "Limit employee access to sensitive company information to reduce insider threats."
    },

    "cyber-espionage": {
        title: "Cyber Espionage & Spying",
        agencies: [
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" },
            { name: "NBI Cybercrime Division", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "National Intelligence Coordinating Agency (NICA)", contact: "info@nica.gov.ph", link: "https://www.nica.gov.ph" }
        ],
        steps: [
            "If you suspect cyber espionage, document unusual system activity and data transfers.",
            "Disconnect affected devices from the network to prevent further access.",
            "Report the incident to DICT Cybersecurity Bureau, NBI Cybercrime Division, or NICA.",
            "Implement security policies to prevent data breaches and espionage attempts."
        ],
        tip: "Use encrypted communication channels for sensitive company or government discussions."
    },

    "child-exploitation": {
        title: "Child Exploitation & Online Grooming",
        agencies: [
            { name: "PNP-WCPC", contact: "(632) 410-3213 / wcpc@pnp.gov.ph", link: "https://pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231 / ccd@nbi.gov.ph", link: "https://nbi.gov.ph" },
            { name: "Interpol Crimes Against Children", contact: "Report Online", link: "https://www.interpol.int/en/Crimes/Crimes-against-children" }
        ],
        steps: [
            "Immediately report any online sexual exploitation of children to PNP-WCPC or NBI-CCD.",
            "If the case involves an international predator, report it to Interpol.",
            "Do not delete any evidence (messages, images, transaction records) before reporting.",
            "If the content was shared online, request an immediate takedown from social media platforms."
        ],
        tip: "If a child is in immediate danger, contact PNP-WCPC emergency hotline instead of filing an online report."
    },

    "sexting-blackmail": {
        title: "Sexting Blackmail & Threats",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" }
        ],
        steps: [
            "Do not comply with blackmail demands—never send more explicit material.",
            "Take screenshots of messages, threats, and blackmail attempts.",
            "Report the blackmailer’s social media accounts for impersonation and abuse.",
            "File an official complaint with PNP-ACG or NBI-CCD."
        ],
        tip: "Avoid sharing intimate images online, even with trusted individuals."
    },

    "revenge-porn": {
        title: "Revenge Porn & Non-Consensual Image Sharing",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "DOJ Office of Cybercrime", contact: "(632) 8523-8481 / cybercrime@doj.gov.ph", link: "https://www.doj.gov.ph" }
        ],
        steps: [
            "Gather evidence: Save copies of leaked content and blackmail messages.",
            "Report non-consensual image sharing to the platform (Facebook, Instagram, TikTok, etc.).",
            "File an official complaint with PNP-ACG or NBI-CCD for legal action.",
            "If the case leads to psychological distress, seek help from mental health professionals."
        ],
        tip: "Revenge porn is a criminal offense under RA 10175 (Cybercrime Prevention Act)."
    },
    
    "financial-fraud": {
        title: "Financial Fraud & Online Scams",
        agencies: [
            { name: "Bangko Sentral ng Pilipinas (BSP)", contact: "(632) 8708-7087 / consumeraffairs@bsp.gov.ph", link: "https://www.bsp.gov.ph" },
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" }
        ],
        steps: [
            "If you notice unauthorized transactions, immediately contact your bank to freeze your account.",
            "Gather proof such as emails, receipts, and chat logs of the fraudulent transaction.",
            "Report the fraud to BSP (for banks), PNP-ACG, or NBI-CCD for further investigation.",
            "Avoid responding to suspicious messages requesting financial information."
        ],
        tip: "Enable SMS/email notifications for financial transactions to detect unauthorized payments early."
    },

    "ransomware": {
        title: "Ransomware Attacks & Data Hijacking",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" }
        ],
        steps: [
            "Disconnect infected devices from the internet immediately to prevent further encryption.",
            "Do NOT pay the ransom—this does not guarantee data recovery.",
            "Scan for malware and attempt to restore files from backups.",
            "Report the ransomware attack to PNP-ACG, NBI-CCD, or DICT Cybersecurity Bureau.",
            "If company data is affected, follow proper cybersecurity protocols for breach management."
        ],
        tip: "Regularly back up important files offline to prevent data loss from ransomware attacks."
    },

    "ransomware-as-a-service": {
        title: "Ransomware-as-a-Service (RaaS) Attacks",
        agencies: [
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" },
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" }
        ],
        steps: [
            "If your organization is targeted by RaaS, isolate infected devices immediately.",
            "Do not negotiate or pay ransom demands—this only funds future attacks.",
            "Report the attack to DICT Cybersecurity Bureau, PNP-ACG, or NBI-CCD.",
            "Strengthen cybersecurity protocols, use endpoint protection, and implement regular security audits."
        ],
        tip: "Organizations should conduct regular cybersecurity training to prevent RaaS attacks."
    },

    "ddos-attacks": {
        title: "Distributed Denial of Service (DDoS) Attacks",
        agencies: [
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" },
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" }
        ],
        steps: [
            "If your website is under a DDoS attack, contact your hosting provider immediately.",
            "Enable DDoS mitigation tools such as firewalls and rate-limiting.",
            "Report the attack to DICT Cybersecurity Bureau, PNP-ACG, or NBI-CCD.",
            "Monitor network traffic and block suspicious IP addresses."
        ],
        tip: "Use cloud-based DDoS protection services to minimize attack impact."
    },

    "election-cybercrime": {
        title: "Election Cybercrime & Voter Manipulation",
        agencies: [
            { name: "Commission on Elections (COMELEC)", contact: "(632) 525-9294 / info@comelec.gov.ph", link: "https://comelec.gov.ph" },
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" }
        ],
        steps: [
            "If you suspect election fraud or hacking, report it immediately to COMELEC.",
            "Document evidence of fake websites, disinformation, or voter manipulation tactics.",
            "Report cyberattacks on election systems to DICT Cybersecurity Bureau or PNP-ACG.",
            "Do not share unverified election-related news to prevent misinformation."
        ],
        tip: "Always verify election-related information through official government sources."
    },

    "deepfake-scams": {
        title: "Deepfake Scams & AI-Generated Fraud",
        agencies: [
            { name: "PNP-ACG", contact: "(632) 723-0401", link: "https://acg.pnp.gov.ph" },
            { name: "NBI-CCD", contact: "(632) 8523-8231", link: "https://nbi.gov.ph" },
            { name: "DICT Cybersecurity Bureau", contact: "1326 / cybersecurity@dict.gov.ph", link: "https://dict.gov.ph" }
        ],
        steps: [
            "Verify suspicious videos or audio clips before believing or sharing them.",
            "Use reverse image search or AI detection tools to check for deepfakes.",
            "If deepfake content is used for blackmail or fraud, report it to PNP-ACG or NBI-CCD.",
            "If it involves political manipulation or misinformation, report to social media platforms."
        ],
        tip: "Always verify video and voice messages before acting on them, especially those requesting money or personal data."
    }

  };
  

  // **Handle Selection Change**
  const handleSelectChange = (event) => {
    const crimeType = event.target.value;
    setSelectedType(crimeType);
    setSelectedCrime(reportData[crimeType] || null);
    
    // **Show Table & Warning if Valid Selection**
    if (reportData[crimeType]) {
      setIsTableVisible(true);
      setIsWarningVisible(true);
    } else {
      setIsTableVisible(false);
      setIsWarningVisible(false);
    }
  };

  return (
    <section className="report-cybercrime">
      <div className="container">
        <h2>How to Report Cybercrime in the Philippines</h2>
        <p style={{ fontSize: "1.3rem" }}>
          If you are a victim of cybercrime, follow these simple steps to report it to the appropriate authorities.
        </p>

        {/* Step-by-Step Guide */}
        <div className="report-guide">
          <h3>Step-by-Step Guide to Reporting Cybercrime</h3>
          <ol>
            <li><strong>Gather Evidence:</strong> Take screenshots, save messages, and collect proof related to the cybercrime.</li>
            <li><strong>Identify the Right Agency:</strong> Different agencies handle different cybercrimes.</li>
            <li><strong>File an Online or In-Person Report:</strong> Use official reporting websites or visit the nearest cybercrime office.</li>
            <li><strong>Submit Required Documents:</strong> Bring valid ID, screenshots, complaint forms, and proof of the crime.</li>
            <li><strong>Follow Up:</strong> Track your report status by contacting the agency for case updates.</li>
          </ol>
        </div>
        <hr />

        {/* Cybercrime Type Dropdown */}
        <div className="cybercrime-selection">
          <label htmlFor="cybercrime-type"><strong>Select a Cybercrime Type:</strong></label>
          <select id="cybercrime-type" value={selectedType} onChange={handleSelectChange}>
            <option value="">-- Select Cybercrime Type --</option>
            {Object.entries(reportData).map(([key, crime]) => (
              <option key={key} value={key}>{crime.title}</option>
            ))}
          </select>
        </div>

        {/* "What Should You Do?" Section */}
        {selectedCrime && (
          <div className="what-to-do">
            <h3>What Should You Do?</h3>
            <ul>
              {selectedCrime.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            <p><strong>TIP:</strong> {selectedCrime.tip}</p>
          </div>
        )}

        {/* Table for Reporting Agencies */}
        {isTableVisible && (
          <div id="report-details">
            <table>
              <thead>
                <tr>
                  <th>Where to Report</th>
                  <th>Contact Information</th>
                  <th>Online Report Link</th>
                </tr>
              </thead>
              <tbody>
                {selectedCrime.agencies.map((agency, index) => (
                  <tr key={index}>
                    <td>{agency.name}</td>
                    <td>{agency.contact}</td>
                    <td>
                      <a href={agency.link} target="_blank" rel="noopener noreferrer" style={{ color: "#D14D4D  ", fontWeight: "bold" }}>
                        Report Here
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Warning Box */}
        {isWarningVisible && (
          <div className="warning-box">
            <p>
              <strong>Warning:</strong> Avoid fake reporting websites and unofficial pages. Always report cybercrimes to the government agencies listed above.
            </p>
          </div>
        )}

        {/* Data Disclaimer */}
        <p className="data-disclaimer">
          <strong>Note:</strong> The information in this section, including the dropdown data and table details, is subject to updates and revisions by the development team.
          Details may change over time to ensure accuracy and relevance.
        </p>
      </div>
    </section>
  );
};

export default CybercrimeReporting;
