import React, { useState } from "react";
import "./Reporting.css";

const CybercrimeLaws = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Ensure the modal only renders when needed

  return (
    <div className="cybercrime-laws-modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>&times;</span>
        <h2>Philippine Cybercrime Laws</h2>
        <div className="modal-body">
          
                    {/* 1. Cybercrime Prevention Act of 2012 */}
                    <p><strong>1. Cybercrime Prevention Act of 2012 (Republic Act No. 10175)</strong></p>
          <p>This is the main law that criminalizes cybercrime in the Philippines. It defines and penalizes offenses such as:</p>
          <ul>
            <li>Illegal access to computer systems or data.</li>
            <li>Illegal interception of data.</li>
            <li>Data interference (altering, damaging, or deleting data).</li>
            <li>System interference (hindering the functioning of a computer or network).</li>
            <li>Misuse of devices (producing, selling, or distributing tools for cybercrime).</li>
            <li>Cyber-squatting.</li>
            <li>Computer-related forgery and fraud.</li>
            <li>Identity theft.</li>
            <li>Cybersex and child pornography.</li>
            <li>Libel committed through computer systems.</li>
          </ul>
          <p>The law also establishes the Cybercrime Investigation and Coordination Center (CICC) to oversee cybercrime prevention and response.</p>

          {/* 2. Data Privacy Act of 2012 */}
          <p><strong>2. Data Privacy Act of 2012 (Republic Act No. 10173)</strong></p>
          <p>This law protects individuals' personal data in information and communications systems in both the government and private sectors. Key provisions include:</p>
          <ul>
            <li>Regulation of the collection, processing, storage, and disclosure of personal data.</li>
            <li>Establishment of the National Privacy Commission (NPC) to enforce the law.</li>
            <li>Rights of data subjects, including the right to access, correct, and object to the processing of their personal data.</li>
            <li>Requirements for data controllers and processors to implement security measures and report data breaches.</li>
            <li>Penalties for unauthorized processing, negligence, and other violations of the law.</li>
          </ul>

          {/* 3. Anti-Photo and Video Voyeurism Act of 2009 */}
          <p><strong>3. Anti-Photo and Video Voyeurism Act of 2009 (Republic Act No. 9995)</strong></p>
          <p>This law criminalizes the unauthorized recording, sharing, or distribution of private photos or videos, especially those involving nudity or sexual acts. It also penalizes the installation of surveillance devices to capture such content without consent.</p>

          {/* 4. Electronic Commerce Act of 2000 */}
          <p><strong>4. Electronic Commerce Act of 2000 (Republic Act No. 8792)</strong></p>
          <p>This law provides legal recognition for electronic documents, signatures, and transactions. It also includes provisions on cybercrime, such as:</p>
          <ul>
            <li>Penalizing hacking and piracy of electronic data.</li>
            <li>Addressing issues related to electronic evidence in legal proceedings.</li>
          </ul>

          {/* 5. Access Devices Regulation Act of 1998 */}
          <p><strong>5. Access Devices Regulation Act of 1998 (Republic Act No. 8484)</strong></p>
          <p>This law targets crimes involving credit cards, debit cards, and other access devices. It penalizes unauthorized use, counterfeiting, and fraudulent activities related to these devices.</p>

          {/* 6. Revised Penal Code */}
          <p><strong>6. Revised Penal Code (Act No. 3815)</strong></p>
          <p>Certain provisions of the Revised Penal Code, such as those on libel, fraud, and theft, may apply to cybercrimes when committed using digital means.</p>

          {/* 7. Anti-Wiretapping Law */}
          <p><strong>7. Anti-Wiretapping Law (Republic Act No. 4200)</strong></p>
          <p>This law prohibits the unauthorized interception or recording of private communications, which can apply to cybercrimes involving eavesdropping or data interception.</p>

          {/* 8. Anti-Child Pornography Act of 2009 */}
          <p><strong>8. Anti-Child Pornography Act of 2009 (Republic Act No. 9775)</strong></p>
          <p>This law criminalizes the production, distribution, and possession of child pornography, including those committed online.</p>

          {/* 9. Anti-Bullying Act of 2013 */}
          <p><strong>9. Anti-Bullying Act of 2013 (Republic Act No. 10627)</strong></p>
          <p>This law addresses bullying in schools, including cyberbullying, and requires schools to adopt policies to prevent and respond to such incidents.</p>

          {/* 10. Bayanihan to Heal as One Act */}
          <p><strong>10. Bayanihan to Heal as One Act (Republic Act No. 11469)</strong></p>
          <p>During the COVID-19 pandemic, this law included provisions penalizing the spread of false information online, which can be considered a cybercrime.</p>

          {/* 11. Anti-Terrorism Act of 2020 */}
          <p><strong>11. Anti-Terrorism Act of 2020 (Republic Act No. 11479)</strong></p>
          <p>While primarily focused on terrorism, this law includes provisions on surveillance and data collection, which may intersect with data privacy concerns. It allows law enforcement to monitor and intercept communications of suspected terrorists, subject to judicial oversight.</p>

          {/* 12. SIM Card Registration Act */}
          <p><strong>12. SIM Card Registration Act (Republic Act No. 11934)</strong></p>
          <p>Enacted in 2022, this law requires the registration of all SIM cards in the Philippines to curb cybercrimes such as scams, phishing, and anonymous online threats. It aims to enhance accountability and traceability in telecommunications.</p>

          {/* 13. Ease of Doing Business Act */}
          <p><strong>13. Ease of Doing Business and Efficient Government Service Delivery Act of 2018 (Republic Act No. 11032)</strong></p>
          <p>This law promotes the use of digital platforms for government transactions, which indirectly emphasizes the importance of data privacy and cybersecurity in public services.</p>

          {/* 14. International Commitments */}
          <p><strong>14. International Commitments</strong></p>
          <p>While not a law, this is a strategic framework developed by the Department of Information and Communications Technology (DICT) to strengthen the country's cybersecurity posture. It includes measures to protect critical infrastructure, combat cybercrime, and enhance public awareness.</p>

          {/* 15. Anti-Money Laundering Act of 2001 */}
          <p><strong>15. Anti-Money Laundering Act of 2001 (Republic Act No. 9160, as amended)</strong></p>
          <p>The Philippines is a signatory to international agreements and conventions related to cybercrime and data privacy, such as:</p>
          <ul>
            <li>Penalizing hacking and piracy of electronic data.</li>
            <li>Addressing issues related to electronic evidence in legal proceedings.</li>
          </ul>

          {/* 16. Intellectual Property Code of the Philippines */}
          <p><strong>16. Intellectual Property Code of the Philippines (Republic Act No. 8293)</strong></p>
          <p>This law protects intellectual property rights, including online piracy, software infringement, and other digital copyright violations. It is relevant to cybercrimes involving intellectual property theft.</p>

          {/* 17. Anti-Trafficking in Persons Act of 2003 */}
          <p><strong>17. Anti-Trafficking in Persons Act of 2003 (Republic Act No. 9208, as amended by RA 10364)</strong></p>
          <p>This law addresses human trafficking, including online exploitation and cybersex trafficking. It penalizes the use of digital platforms for trafficking activities.</p>

          {/* 18. Anti-Online Sexual Abuse or Exploitation of Children Act */}
          <p><strong>18. Anti-Online Sexual Abuse or Exploitation of Children (OSAEC) Act (Republic Act No. 11930)</strong></p>
          <p>Enacted in 2022, this law specifically targets online sexual abuse and exploitation of children, including the production and distribution of child sexual abuse materials (CSAM) online.</p>

          {/* 19. Freedom of Information Executive Order */}
          <p><strong>19. Freedom of Information (FOI) Executive Order No. 2 (2016)</strong></p>
          <p>While promoting transparency in government, this executive order also emphasizes the protection of personal data and sensitive information in public records.</p>

          {/* 20. Rules on Cybercrime Warrants */}
          <p><strong>20. Rules on Cybercrime Warrants (A.M. No. 17-11-03-SC)</strong></p>
          <p>Issued by the Supreme Court, these rules provide guidelines for law enforcement in obtaining warrants for cybercrime investigations, ensuring compliance with constitutional rights and data privacy principles.</p>

          {/* 21. Bank Secrecy Law */}
          <p><strong>21. Bank Secrecy Law (Republic Act No. 1405)</strong></p>
          <p>This law protects the confidentiality of bank deposits, which is relevant to cybersecurity and data privacy in the financial sector.</p>

          {/* 22. Consumer Act of the Philippines */}
          <p><strong>22. Consumer Act of the Philippines (Republic Act No. 7394)</strong></p>
          <p>This law protects consumers from unfair trade practices, including online scams, fraudulent transactions, and misleading digital advertisements.</p>

          {/* 23. National Privacy Commission (NPC) Issuances */}
          <p><strong>23. National Privacy Commission (NPC) Issuances</strong></p>
          <p>The NPC, under the Data Privacy Act of 2012, issues guidelines, advisories, and circulars to clarify and enforce data privacy regulations. Examples include:</p>
          <ul>
            <li>Data Privacy Compliance Guidelines</li>
            <li>Rules on Data Breach Notification</li>
            <li>Guidelines on Consent and Data Sharing</li>
          </ul>

          {/* 24. Rules on Electronic Evidence */}
          <p><strong>24. Rules on Electronic Evidence (A.M. No. 01-7-01-SC)</strong></p>
          <p>These rules, issued by the Supreme Court, govern the admissibility and use of electronic evidence in legal proceedings, ensuring proper handling of digital data.</p>

          {/* 25. Anti-Fake News Laws */}
          <p><strong>25. Anti-Fake News Laws</strong></p>
          <p>Several bills have been proposed to combat the spread of fake news and disinformation online, though none have been enacted into law as of October 2023.</p>

          {/* 26. Anti-Cyberbullying Provisions in the Anti-Bullying Act */}
          <p><strong>26. Anti-Cyberbullying Provisions in the Anti-Bullying Act (RA 10627)</strong></p>
          <p>While already mentioned, it’s worth noting that this law specifically addresses cyberbullying in educational institutions, requiring schools to implement policies to prevent and address such incidents.</p>


          {/* Close Button */}
          <div className="close-section">
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CybercrimeLaws;