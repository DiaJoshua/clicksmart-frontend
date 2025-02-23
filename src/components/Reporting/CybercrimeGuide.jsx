import React, { useState, useEffect } from "react";
import "./Reporting.css";
import CybercrimeLaws from "./CybercrimeLaws"; // Import the modal component


// Import images directly
import personalImg from "../../assets/icons/personalCC.png";
import governmentImg from "../../assets/icons/governmentCC.png";
import corporateImg from "../../assets/icons/corporateCC.png";
import emergingImg from "../../assets/icons/emergingCC.png";

  const cybercrimeData = [
    {
      id: "personal",
      img: personalImg,
      title: "Personal Cybercrimes",
      description:
        "Personal cybercrime refers to digital crimes that directly target individuals, affecting their finances, personal security, privacy, or reputation. These crimes often involve identity theft, scams, financial fraud, harassment, hacking, and data breaches that impact an individual rather than a business or government entity.",
      crimes: [
        { type: "scams-online-fraud", name: "Scams & Online Fraud" },
        { type: "financial-fraud", name: "Financial Fraud" },
        { type: "identity-theft", name: "Identity Theft" },
        { type: "phishing-attacks", name: "Phishing Attacks" },
        { type: "ransomware-malware-attacks", name: "Ransomware & Malware" },
        { type: "hacking-unauthorized-account-access", name: "Hacking & Unauthorized Access" },
        { type: "cyberstalking-online-harassment", name: "Cyberstalking & Online Harassment" },
        { type: "sextortion-revenge-porn", name: "Sextortion & Revenge Porn" },
        { type: "online-shopping-fraud", name: "Online Shopping Fraud" },
        { type: "fake-social-media-profiles-catfishing", name: "Fake Social Media Profiles & Catfishing" },
        { type: "online-defamation-doxxing", name: "Online Defamation & Doxxing" },
        { type: "child-exploitation-grooming", name: "Child Exploitation & Grooming" },
      ],
    },
    {
      id: "government",
      img: governmentImg,
      title: "Government & Critical Infrastructure Cybercrimes",
      description:
        "Government & Critical Infrastructure Cybercrimes target government systems, public services, and national security rather than individuals or businesses. These cybercrimes can have large-scale consequences, including data breaches, infrastructure disruptions, election interference, and cyber espionage.",
      crimes: [
        { type: "cyberterrorism", name: "Cyberterrorism" },
        { type: "cyberwarfare", name: "Cyberwarfare & Espionage" },
        { type: "infrastructure-attacks", name: "Attacks on Critical Infrastructure" },
        { type: "gov-hacking", name: "Hacking of Government Websites" },
        { type: "election-fraud", name: "Election Cybercrime & Fake News" },
      ],
    },
    {
      id: "corporate",
      img: corporateImg,
      title: "Corporate/Business Cybercrimes",
      description:
        "Cybercrimes that impact businesses, organizations, and enterprises. These include financial fraud, corporate espionage, data breaches, and cyberattacks that threaten the security and operations of companies.",
      crimes: [
        { type: "bec-fraud", name: "Business Email Compromise (BEC) & CEO Fraud" },
        { type: "corporate-espionage", name: "Corporate Espionage (Trade Secrets Theft)" },
        { type: "ransomware-business", name: "Ransomware Attacks on Businesses" },
        { type: "insider-threat", name: "Insider Threats & Employee Data Leaks" },
        { type: "ddos-attacks", name: "Distributed Denial of Service (DDoS) Attacks" },
        { type: "supply-chain", name: "Supply Chain Cyber Attacks" },
      ],
    },
    {
      id: "emerging",
      img: emergingImg,
      title: "Emerging Cybercrime Threats",
      description:
        "As technology evolves, new cybercrime threats emerge, using AI, quantum computing, and virtual environments to exploit victims in innovative ways.",
      crimes: [
        { type: "ai-cybercrime", name: "AI-Powered Cybercrime (Deepfakes & AI Phishing)" },
        { type: "metaverse-crime", name: "Cybercrime in the Metaverse & Virtual Worlds" },
        { type: "quantum-hacking", name: "Quantum Hacking (Breaking Encryption)" },
        { type: "raas", name: "Ransomware-as-a-Service (RaaS)" },
        { type: "iot-attacks", name: "Advanced IoT Cyber Attacks" },
      ],
    },
  ];

  const cybercrimeDetails = [
    {
      id: "scams-online-fraud",
      title: "Scams & Online Fraud",
      description:
        "Scammers trick victims into giving money or personal information through deception. This includes investment fraud, fake online stores, job scams, and romance scams.",

      details: [
        {
          sectionTitle: "Common Types of Scams in the Philippines:",
          items: [
            {
              title: "Investment Scams (Ponzi, Pyramid Schemes)",
              description:
                "Fraudsters promise high returns with little to no risk, luring victims into investing in fake schemes. Early investors may receive small payouts to build trust, but eventually, the scam collapses, and people lose their money.",
            },
            {
              title: "Online Shopping Scams",
              description:
                "Fraudulent sellers pretend to sell products online but never deliver the items or send defective ones.",
            },
            {
              title: "Fake Job Offers",
              description:
                'Scammers pose as employers, promising high-paying jobs but requiring applicants to pay a "training fee" or "processing fee" upfront.',
            },
            {
              title: "Lottery & Prize Scams",
              description:
                "Victims receive fake notifications claiming they have won a prize but must pay taxes or fees to claim it.",
            },
            {
              title: "Romance Scams",
              description:
                "Scammers pretend to be in a romantic relationship with victims, gaining their trust and eventually asking for money.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "The KAPA Community Ministry International Scam stole over ₱50 billion from Filipinos by promising 30% monthly returns on investments.",
            },
            {
              description:
                "Fake Shopee and Lazada sellers scammed thousands of buyers by advertising high-quality gadgets and sending fake or non-existent products.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ Targets individuals who voluntarily send money or personal information." },
            { description: "✔ Victims suffer financial loss directly, rather than a business being affected." },
            { description: "✔ Scams usually manipulate personal trust, such as fake relationships or investment promises." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Verify companies & sellers before transacting." },
            { description: "✅ Never send money to strangers online." },
            { description: "✅ Check official sources before responding to prize notifications." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 Securities & Exchange Commission (SEC)" },
            { description: "📌 DTI (for e-commerce scams)" },
          ],
        },
      ],
    },
    {
      id: "financial-fraud",
      title: "Financial Fraud",
      description:
        "Financial fraud occurs when criminals gain unauthorized access to banking details, credit card information, or e-wallet accounts to steal money.",
  
      details: [
        {
          sectionTitle: "Common Types of Financial Fraud in the Philippines:",
          items: [
            {
              title: "Credit Card Fraud",
              description:
                "Scammers use stolen card details to make unauthorized transactions.",
            },
            {
              title: "Bank Account Takeover",
              description:
                "Criminals hack into a victim's online banking account and withdraw money.",
            },
            {
              title: "ATM Skimming",
              description:
                "Devices are secretly placed on ATMs to steal card details.",
            },
            {
              title: "E-Wallet Fraud",
              description:
                "Scammers trick users into giving away GCash or PayMaya login credentials.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A GCash phishing scam tricked victims into sharing OTP codes, allowing scammers to withdraw money from their accounts.",
            },
            {
              description:
                "A victim’s BDO online banking account was hacked, leading to unauthorized fund transfers.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            {
              description: "✔ Directly affects an individual's finances.",
            },
            {
              description:
                "✔ Unlike corporate fraud, financial fraud targets personal banking details.",
            },
            {
              description: "✔ Criminals exploit personal digital security weaknesses.",
            },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Enable two-factor authentication (2FA) on banking apps." },
            { description: "✅ Never share your OTP (One-Time Password) with anyone." },
            { description: "✅ Monitor your bank transactions regularly." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Your bank’s fraud department" },
            { description: "📌 PNP-ACG (for hacking cases)" },
          ],
        },
      ],
    },
    {
      id: "identity-theft",
      title: "Identity Theft",
      description:
        "Identity theft occurs when criminals steal personal information (name, ID, banking details) to impersonate victims and commit fraud.",
  
      details: [
        {
          sectionTitle: "Common Types of Identity Theft in the Philippines:",
          items: [
            {
              title: "Loan Fraud",
              description:
                "Criminals use stolen identities to apply for loans in someone else’s name.",
            },
            {
              title: "SIM Card Fraud",
              description:
                "Fraudsters register SIM cards under another person's identity.",
            },
            {
              title: "Fake Social Media Profiles",
              description:
                "Scammers create accounts using stolen personal data to deceive others.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A scammer used a stolen National ID to apply for multiple bank loans under another person’s name.",
            },
            {
              description:
                "Victims’ passport details were leaked in a data breach, exposing them to fraud.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            {
              description: "✔ Criminals steal personal details to commit fraud.",
            },
            {
              description: "✔ The financial or legal consequences directly harm the individual.",
            },
            {
              description: "✔ Victims may suffer long-term consequences like legal or credit issues.",
            },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Shred personal documents before disposal." },
            { description: "✅ Check bank statements for suspicious activity." },
            { description: "✅ Use strong passwords for online banking & government accounts." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 NBI Cybercrime Division" },
            { description: "📌 PNP-ACG" },
          ],
        },
      ],
    },
    {
      id: "phishing-attacks",
      title: "Phishing Attacks",
      description:
        "Phishing is a form of cybercrime where criminals trick victims into providing personal information, login credentials, or financial details.",
  
      details: [
        {
          sectionTitle: "Common Types of Phishing Attacks in the Philippines:",
          items: [
            {
              title: "Email Phishing",
              description:
                "Fraudulent emails pretending to be from banks, government agencies, or trusted companies.",
            },
            {
              title: "Smishing (SMS Phishing)",
              description:
                "Fake messages sent via SMS, tricking users into clicking malicious links.",
            },
            {
              title: "Vishing (Voice Phishing)",
              description:
                "Phone calls from scammers posing as customer service agents to steal banking details.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A fake BDO email asked customers to verify their accounts, tricking them into entering their login details on a phishing website.",
            },
            {
              description:
                "A smishing scam (SMS phishing) sent texts pretending to be from the Bureau of Internal Revenue (BIR) to steal taxpayer information.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            {
              description: "✔ Targets individuals through emails, texts, or fake websites.",
            },
            {
              description: "✔ The goal is to steal personal data (bank logins, passwords, ID numbers).",
            },
            {
              description: "✔ Affects personal security rather than corporate or government systems.",
            },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Never click on suspicious links from emails or text messages." },
            { description: "✅ Verify with official customer support before providing personal details." },
            { description: "✅ Check email senders carefully (banks use official domains)." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Banks & Financial Institutions" },
            { description: "📌 PNP-ACG" },
          ],
        },
      ],
    },
    {
      id: "ransomware-malware-attacks",
      title: "Ransomware & Malware Attacks",
      description:
        "Ransomware and malware are malicious software programs designed to steal data, spy on users, or lock files until a ransom is paid.",
  
      details: [
        {
          sectionTitle: "Common Types of Ransomware & Malware Attacks in the Philippines:",
          items: [
            {
              title: "Ransomware",
              description:
                "Locks a victim’s files and demands payment for recovery.",
            },
            {
              title: "Spyware",
              description:
                "Secretly monitors a victim’s online activity.",
            },
            {
              title: "Trojans & Worms",
              description:
                "Malicious programs that infect computers and spread across networks.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "Philippine hospitals and government agencies have been hit by ransomware attacks, locking critical records.",
            },
            {
              description:
                "Many Filipinos have downloaded fake software updates that secretly installed malware on their devices.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            {
              description: "✔ Targets individuals' personal devices (laptops, smartphones, home computers).",
            },
            {
              description: "✔ Unlike corporate ransomware attacks, these crimes affect personal files and finances.",
            },
            {
              description: "✔ Victims face financial loss and personal data exposure.",
            },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Don’t download software from unknown sources." },
            { description: "✅ Use strong antivirus programs and update software regularly." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 DICT Cybersecurity Bureau" },
            { description: "📌 PNP-ACG" },
          ],
        },
      ],
    },
    {
      id: "hacking-unauthorized-account-access",
      title: "Hacking & Unauthorized Account Access",
      description:
        "Hacking is the unauthorized access to a person's computer, online account, or device to steal, modify, or misuse personal information.",
  
      details: [
        {
          sectionTitle: "Common Types of Hacking in the Philippines:",
          items: [
            {
              title: "Social Media Account Hacking",
              description:
                "Cybercriminals take control of a victim’s Facebook, Instagram, or email accounts and use them for scams or blackmail.",
            },
            {
              title: "Credential Stuffing",
              description:
                "Hackers use stolen usernames and passwords from data breaches to access accounts.",
            },
            {
              title: "Spyware Attacks",
              description:
                "Hackers install malicious software that secretly monitors a victim’s activity.",
            },
            {
              title: "Remote Access Trojans (RATs)",
              description:
                "Malicious programs give hackers complete control over a victim's device.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "Victims reported that Facebook accounts were hacked and used for investment scams, messaging friends to 'borrow money.'",
            },
            {
              description:
                "A hacker took over a student's email account and blackmailed them for money in exchange for access.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ Hackers steal or damage individual accounts (email, social media, banking)." },
            { description: "✔ Unlike corporate hacking, these attacks do not target a company’s IT system." },
            { description: "✔ Personal privacy and security are directly compromised." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Use strong, unique passwords for every account." },
            { description: "✅ Enable Two-Factor Authentication (2FA) on social media and banking apps." },
            { description: "✅ Avoid logging into accounts on public computers or shared devices." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 NBI Cybercrime Division" },
          ],
        },
      ],
    },
    {
      id: "cyberstalking-online-harassment",
      title: "Cyberstalking & Online Harassment",
      description:
        "Cyberstalking is the repeated use of the internet to harass, intimidate, or threaten a person, while online harassment includes cyberbullying, doxxing, and trolling.",
  
      details: [
        {
          sectionTitle: "Common Types of Cyberstalking in the Philippines:",
          items: [
            {
              title: "Threatening Messages",
              description:
                "Stalkers send repeated threats through social media or email.",
            },
            {
              title: "Doxxing",
              description:
                "Stalkers publicly expose personal details, such as home addresses or phone numbers, to incite harassment.",
            },
            {
              title: "Impersonation & Fake Profiles",
              description:
                "Cybercriminals create fake accounts to harass or spread false information about victims.",
            },
            {
              title: "Unwanted Tracking",
              description:
                "Stalkers monitor a victim’s online activity and real-time location without consent.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A woman’s ex-boyfriend stalked her online, repeatedly sending threats and tracking her whereabouts through fake accounts.",
            },
            {
              description:
                "A celebrity experienced cyber harassment when a group leaked their personal information online, leading to death threats.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ The harassment affects one individual, not an organization." },
            { description: "✔ The intent is to cause emotional distress to the victim." },
            { description: "✔ Personal privacy is violated, leading to mental and emotional harm." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Block & report online stalkers on social media platforms." },
            { description: "✅ Limit the personal information you share publicly." },
            { description: "✅ Strengthen privacy settings on all social media accounts." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP Women and Children Protection Center (WCPC) (if the victim is a woman or child)" },
            { description: "📌 PNP-ACG (for general cyber harassment cases)" },
          ],
        },
      ],
    },
    {
      id: "sextortion-revenge-porn",
      title: "Sextortion & Revenge Porn",
      description:
        "Sextortion happens when criminals threaten to release explicit photos or videos of a victim unless they receive money or personal favors. Revenge porn involves sharing intimate images or videos without the victim’s consent to humiliate or blackmail them.",
  
      details: [
        {
          sectionTitle: "Common Types of Sextortion in the Philippines:",
          items: [
            {
              title: "Fake Online Lovers",
              description:
                "Scammers build relationships online and then blackmail victims with sensitive content.",
            },
            {
              title: "Hacked Private Content",
              description:
                "Cybercriminals hack cloud storage or phones to steal private photos.",
            },
            {
              title: "Live Video Threats",
              description:
                "Fraudsters secretly record private video calls and use them for extortion.",
            },
            {
              title: "Ex-Partner Revenge",
              description:
                "Former partners leak explicit content to ruin a victim's reputation.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A young woman was blackmailed after sharing private photos with a fake online boyfriend.",
            },
            {
              description:
                "A hacker stole private videos from cloud storage and demanded money from victims.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ The crime directly targets an individual’s privacy and reputation." },
            { description: "✔ The blackmail and emotional distress affect a single victim, not a company or organization." },
            { description: "✔ Unlike corporate cybercrimes, sextortion is based on personal relationships and trust violations." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Never share sensitive content online or with untrusted people." },
            { description: "✅ Use strong passwords & encryption for cloud storage." },
            { description: "✅ If threatened, report immediately and do not engage with blackmailers." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP Women & Children Protection Center (WCPC)" },
            { description: "📌 NBI Cybercrime Division" },
          ],
        },
      ],
    },
    {
      id: "online-shopping-fraud",
      title: "Online Shopping Fraud",
      description:
        "Online shopping fraud happens when scammers set up fake online stores or impersonate sellers to deceive buyers into sending money for non-existent or defective products.",
  
      details: [
        {
          sectionTitle: "Common Types of Online Shopping Fraud in the Philippines:",
          items: [
            {
              title: "Fake Online Stores",
              description:
                "Fraudsters create websites or social media pages selling products they don’t actually have.",
            },
            {
              title: "Counterfeit Product Scams",
              description:
                "Sellers advertise original brands but send cheap knock-offs.",
            },
            {
              title: "Non-Delivery Scams",
              description:
                "Buyers pay, but the seller disappears without delivering the item.",
            },
            {
              title: "Payment Redirection Scams",
              description:
                "Fraudsters trick buyers into making payments outside secure e-commerce platforms.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "Victims of the 'COD iPhone Scam' paid for an iPhone but received a box of soap instead.",
            },
            {
              description:
                "Fake Lazada and Shopee sellers tricked customers into paying for 'brand-new' items but sent damaged or non-functional products.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ Scammers target individual buyers, not businesses, tricking them into buying fake or non-existent products." },
            { description: "✔ The financial loss directly affects the victim, not a company’s financial system." },
            { description: "✔ Unlike corporate fraud, these scams exploit personal trust and consumer vulnerability." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Buy from verified sellers on trusted platforms." },
            { description: "✅ Use cash-on-delivery (COD) whenever possible." },
            { description: "✅ Check seller reviews & ratings before purchasing." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 DTI Fair Trade Enforcement Bureau" },
            { description: "📌 PNP-ACG (for online payment fraud cases)" },
          ],
        },
      ],
    },
    {
      id: "fake-social-media-profiles-catfishing",
      title: "Fake Social Media Profiles & Catfishing",
      description:
        "Catfishing is when cybercriminals create fake social media accounts to deceive people into relationships, scams, or fraud.",
  
      details: [
        {
          sectionTitle: "Common Types of Catfishing in the Philippines:",
          items: [
            {
              title: "Romance Scams",
              description:
                "Fraudsters pose as attractive individuals to build relationships and trick victims into sending money.",
            },
            {
              title: "Fake Business Profiles",
              description:
                "Scammers impersonate businesses or influencers to deceive customers.",
            },
            {
              title: "Identity Theft Catfishing",
              description:
                "Criminals steal real identities to create convincing fake accounts.",
            },
            {
              title: "Political Manipulation",
              description:
                "Fake accounts spread misinformation or manipulate elections.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A Filipina nurse in Dubai lost ₱1 million after falling for a 'US soldier' who asked for money to 'travel and marry her.'",
            },
            {
              description:
                "A fake influencer account tricked people into sending money for 'exclusive coaching services.'",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ The deception is aimed at an individual, often for romance scams, fraud, or manipulation." },
            { description: "✔ Unlike corporate impersonation fraud, catfishing is usually for emotional or financial exploitation of a specific person." },
            { description: "✔ Victims suffer emotional distress and financial loss." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Do a reverse image search on profile pictures to check for stolen identities." },
            { description: "✅ Never send money or personal details to strangers online." },
            { description: "✅ Be skeptical of people who refuse video calls or in-person meetings." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Facebook or Instagram Help Center (for fake profiles)" },
            { description: "📌 PNP-ACG (for fraud cases linked to catfishing)" },
          ],
        },
      ],
    },
    {
      id: "online-defamation-doxxing",
      title: "Online Defamation & Doxxing",
      description:
        "Online defamation involves spreading false information about someone to damage their reputation, while doxxing refers to leaking private information online to incite harassment.",
  
      details: [
        {
          sectionTitle: "Common Types of Online Defamation in the Philippines:",
          items: [
            {
              title: "False Accusations",
              description:
                "Fake news or rumors are spread to ruin someone’s reputation.",
            },
            {
              title: "Leaked Private Conversations",
              description:
                "Personal messages are shared publicly to embarrass the victim.",
            },
            {
              title: "Doxxing",
              description:
                "Private data like addresses, phone numbers, or workplace details are leaked online.",
            },
            {
              title: "Edited Images & Videos",
              description:
                "Manipulated media is used to misrepresent victims.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A local politician was targeted by fake news claiming they were involved in corruption.",
            },
            {
              description:
                "A student’s home address was leaked online, leading to harassment from strangers.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ The harm is directed at an individual’s reputation." },
            { description: "✔ Unlike business-related defamation, this type of cybercrime involves false accusations, rumors, or leaks of personal information." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Report false content to platform moderators (Facebook, Twitter, YouTube)." },
            { description: "✅ Monitor your digital footprint and remove sensitive data online." },
            { description: "✅ Seek legal action if defamation leads to serious consequences." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP-ACG (for cyber harassment cases)" },
            { description: "📌 Department of Justice (DOJ) – for libel & cyber libel cases" },
          ],
        },
      ],
    },
    {
      id: "child-exploitation-grooming",
      title: "Child Exploitation & Grooming",
      description:
        "Child exploitation happens when criminals use the internet to manipulate minors into inappropriate actions, while grooming refers to building trust with minors for abuse.",
  
      details: [
        {
          sectionTitle: "Common Types of Child Exploitation in the Philippines:",
          items: [
            {
              title: "Online Sexual Exploitation of Children (OSEC)",
              description:
                "Criminals force minors into inappropriate acts for live-streamed abuse.",
            },
            {
              title: "Grooming on Social Media",
              description:
                "Predators contact minors pretending to be friends.",
            },
            {
              title: "Child Trafficking Networks",
              description:
                "Dark web groups trade child exploitation materials.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenario:",
          items: [
            {
              description:
                "The Philippines is a global hotspot for OSEC, with many cases involving foreign predators paying Filipinos to exploit children online.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Personal Cybercrime?",
          items: [
            { description: "✔ The crime directly harms a minor on a personal level." },
            { description: "✔ Predators manipulate and exploit children, making it a highly personal and psychological crime." },
            { description: "✔ Unlike corporate cybercrimes, this involves private interactions between criminals and victims." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Monitor children’s online activity and educate them about online dangers." },
            { description: "✅ Report suspicious messages or online predators immediately." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 PNP-WCPC (Women & Children Protection Center)" },
            { description: "📌 NBI Cybercrime Division" },
          ],
        },
      ],
    },
    {
      id: "cyberterrorism",
      title: "Cyberterrorism",
      description:
        "Cyberterrorism refers to the use of digital attacks to disrupt, damage, or threaten government services, critical infrastructure, or national security. This includes hacking into government databases, launching cyberattacks on utilities, or spreading fear through digital means.",
  
      details: [
        {
          sectionTitle: "Common Types of Cyberterrorism in the Philippines:",
          items: [
            {
              title: "Defacement of Government Websites",
              description:
                "Hackers replace official web pages with propaganda or threats.",
            },
            {
              title: "Cyber Attacks on Critical Infrastructure",
              description:
                "Cyberterrorists target power grids, water systems, or emergency services.",
            },
            {
              title: "Disruptive Digital Propaganda",
              description:
                "Cybercriminals spread extremist content to radicalize individuals.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "The Philippine military reported cyber threats from foreign hacking groups trying to disrupt national security operations.",
            },
            {
              description:
                "In 2016, the Philippine government’s 'Comelec' database was hacked, exposing the personal information of 55 million registered voters.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Government & Critical Infrastructure Cybercrime?",
          items: [
            { description: "✔ Targets national security, government systems, or critical public services." },
            { description: "✔ Unlike corporate cybercrimes, cyberterrorism affects entire countries, not private businesses." },
            { description: "✔ Attacks are meant to cause panic, disrupt essential services, or destabilize governments." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Governments must strengthen cybersecurity defenses and train staff against cyber threats." },
            { description: "✅ Use secure, encrypted communication for sensitive information." },
            { description: "✅ Regularly audit and upgrade government networks to detect vulnerabilities." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Department of Information and Communications Technology (DICT) – Cybersecurity Bureau" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Armed Forces of the Philippines (AFP) Cyber Group (for national security threats)" },
          ],
        },
      ],
    },
    {
      id: "cyberwarfare",
      title: "Cyberwarfare & Espionage",
      description:
        "Cyberwarfare involves state-sponsored attacks on another country’s digital infrastructure, while cyber espionage refers to covert cyber activities that steal classified or sensitive government information.",
  
      details: [
        {
          sectionTitle: "Common Types of Cyberwarfare & Espionage in the Philippines:",
          items: [
            {
              title: "Hacking of Government & Military Systems",
              description:
                "Foreign cybercriminals steal national security intelligence or compromise operations.",
            },
            {
              title: "Spyware on Government Officials",
              description:
                "Malware records sensitive conversations or digital activity of key officials.",
            },
            {
              title: "Cyber Attacks on Financial & Diplomatic Institutions",
              description:
                "Hackers disrupt government banking systems or international relations.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "In 2023, Philippine government agencies were targeted by foreign cyber-espionage groups, stealing classified intelligence.",
            },
            {
              description:
                "Chinese hacking groups were suspected of cyber intrusions in Philippine military networks.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Government & Critical Infrastructure Cybercrime?",
          items: [
            { description: "✔ Conducted by foreign state-sponsored hackers or cybercriminals with political motives." },
            { description: "✔ Targets national defense, government institutions, and diplomatic organizations." },
            { description: "✔ Unlike personal hacking cases, these attacks involve international intelligence and security threats, aiming to gain intelligence or disrupt a country’s cyber defenses." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Invest in stronger cybersecurity for national defense and government agencies." },
            { description: "✅ Classified documents should be stored in highly secure, offline environments." },
            { description: "✅ Monitor foreign cyber activity for potential security threats and conduct regular security drills to test digital defenses." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Security Council – Cyber Intelligence Unit" },
            { description: "📌 DICT Cybersecurity Bureau" },
            { description: "📌 NBI Cybercrime Division" },
          ],
        },
      ],
    },
    {
      id: "infrastructure-attacks",
      title: "Attacks on Critical Infrastructure",
      description:
        "Critical infrastructure cyberattacks target essential services like power grids, water supply, healthcare systems, transportation, and communication networks. These attacks can cause service disruptions, economic losses, and public safety risks.",
  
      details: [
        {
          sectionTitle: "Common Types of Attacks on Critical Infrastructure in the Philippines:",
          items: [
            {
              title: "Cyber Attacks on Power & Water Systems",
              description:
                "Hackers shut down utilities or cause malfunctions.",
            },
            {
              title: "Public Transportation Disruptions",
              description:
                "Cybercriminals manipulate train and traffic control systems.",
            },
            {
              title: "Disruptive Digital Propaganda",
              description:
                "Hackers disrupt hospital IT systems, endangering patient care.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "In 2019, the Manila Light Rail Transit (LRT) ticketing system was hacked, causing disruptions in train operations.",
            },
            {
              description:
                "In 2020, cybercriminals targeted Philippine government hospitals, locking patient data with ransomware.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Government & Critical Infrastructure Cybercrime?",
          items: [
            { description: "✔ The attack affects national infrastructure, not private businesses." },
            { description: "✔ Disrupts essential services such as electricity, water, healthcare, and transportation." },
            { description: "✔ Unlike financial fraud or hacking, these attacks directly harm public welfare and national security." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Strengthen cybersecurity measures in critical infrastructure sectors." },
            { description: "✅ Train personnel in recognizing cyber threats." },
            { description: "✅ Implement real-time monitoring systems to detect attacks early." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Department of Information and Communications Technology (DICT) – Cybersecurity Bureau" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 PNP-ACG (for infrastructure-related cybercrimes)" },
          ],
        },
      ],
    },
    {
      id: "gov-hacking",
      title: "Government Website Hacking",
      description:
        "Hackers compromise official government portals, steal classified information, or deface websites to spread misinformation.",
  
      details: [
        {
          sectionTitle: "Common Types of Cyberterrorism in the Philippines:",
          items: [
            {
              title: "Government Website Defacement",
              description:
                "Hackers replace official content with propaganda or offensive material.",
            },
            {
              title: "Theft of Citizen & Government Data",
              description:
                "Cybercriminals steal national ID, passport, or election data.",
            },
            {
              title: "Tampering with Public Records",
              description:
                "Hackers modify land titles, tax records, or legal documents.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "The Department of Health’s vaccine registration system was targeted by hackers attempting to alter records.",
            },
            {
              description:
                "In 2016, hackers defaced the Philippine government’s Bureau of Customs website, replacing its homepage with messages protesting against corruption.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Government & Critical Infrastructure Cybercrime?",
          items: [
            { description: "✔ Targets national security, government systems, or critical public services." },
            { description: "✔ Unlike corporate cybercrimes, cyberterrorism affects entire countries, not private businesses." },
            { description: "✔ Attacks are meant to cause panic, disrupt essential services, or destabilize governments." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Governments must strengthen cybersecurity defenses and train staff against cyber threats." },
            { description: "✅ Strengthen cybersecurity defenses on government networks." },
            { description: "✅ Implement multi-factor authentication for accessing government portals." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Department of Information and Communications Technology (DICT) – Cybersecurity Bureau" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
          ],
        },
      ],
    },
    {
      id: "election-fraud",
      title: "Election Cybercrime & Fake News",
      description:
        "Election cybercrime involves using digital methods to manipulate elections, spread false information, or compromise voting systems.",
  
      details: [
        {
          sectionTitle: "Common Types of Election Cybercrime & Fake News in the Philippines:",
          items: [
            {
              title: "Voter Data Leaks",
              description:
                "Cybercriminals steal and sell voter information.",
            },
            {
              title: "Fake News & Social Media Manipulation",
              description:
                "Troll farms spread misinformation to influence elections.",
            },
            {
              title: "Hacking of Voting Systems",
              description:
                "Hackers attempt to manipulate electronic voting machines.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "The 'Comeleak' hack in 2016 exposed voter records from the Commission on Elections (Comelec).",
            },
            {
              description:
                "Political troll farms spread fake news on social media to manipulate voter opinion.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Government & Critical Infrastructure Cybercrime?",
          items: [
            { description: "✔ Affects the integrity of national elections, not individual voters." },
            { description: "✔ Fake news campaigns influence political decisions at a national level." },
            { description: "✔ Unlike online scams, this type of crime impacts democratic institutions." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Governments must strengthen cybersecurity defenses and train staff against cyber threats." },
            { description: "✅ Public education on identifying fake news." },
            { description: "✅ Strict regulations on political ads and social media campaigns." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Sumbongko@votesafe.ph - For allegations of vote buying, prohibited campaign materials, and other election offenses." },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
          ],
        },
      ],
    },
    {
      id: "bec-fraud",
      title: "Business Email Compromise (BEC) & CEO Fraud",
      description:
        "Business Email Compromise (BEC) occurs when criminals impersonate company executives or employees to trick businesses into transferring money or disclosing sensitive data.",
  
      details: [
        {
          sectionTitle: "Common Types of BEC in the Philippines:",
          items: [
            {
              title: "Fake CEO Email Scams",
              description:
                "Cybercriminals spoof company executives' emails to request urgent money transfers.",
            },
            {
              title: "Supplier Payment Fraud",
              description:
                "Attackers pose as vendors and provide fake bank account details for payments.",
            },
            {
              title: "Payroll Diversion Scams",
              description:
                "Hackers change employee payroll details to receive salaries fraudulently.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "In 2022, a local company lost ₱10 million after cybercriminals spoofed the CEO’s email and ordered an unauthorized bank transfer.",
            },
            {
              description:
                "Several BPO firms reported supplier fraud, where fake invoices were sent to finance departments.",
            },
            {
              description:
                "Hackers pretended to be suppliers and tricked an accounting department into paying fake invoices.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ Targets businesses and their financial transactions, not individuals." },
            { description: "✔ Exploits business processes, such as invoicing and supplier payments." },
            { description: "✔ Affects company funds, customer data, and operational security." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Verify all email requests for large transactions through a secondary communication channel (e.g., phone call)." },
            { description: "✅ Train employees to recognize fake email addresses and phishing attempts." },
            { description: "✅ Enable multi-factor authentication (MFA) for email accounts." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "corporate-espionage",
      title: "Corporate Espionage (Trade Secrets Theft)",
      description:
        "Corporate espionage involves stealing business strategies, client databases, or trade secrets for financial gain or competitive advantage.",
  
      details: [
        {
          sectionTitle: "Common Types of Corporate Espionage in the Philippines:",
          items: [
            {
              title: "Insider Threats",
              description:
                "Employees steal confidential company data and sell it to competitors.",
            },
            {
              title: "Hacking into Competitor Networks",
              description:
                "Cybercriminals infiltrate rival companies to steal product designs or patents.",
            },
            {
              title: "Supply Chain Attacks",
              description:
                "Hackers compromise third-party vendors to access sensitive business data.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A former employee of a tech company leaked proprietary software designs to a competitor.",
            },
            {
              description:
                "A manufacturing firm reported unauthorized access to its blueprint database, raising concerns about foreign espionage.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ Targets businesses rather than individuals or government agencies." },
            { description: "✔ Involves data theft that affects a company’s revenue, innovation, and market advantage." },
            { description: "✔ Unlike hacking-for-profit, espionage focuses on long-term competitive gains." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Restrict access to confidential files." },
            { description: "✅ Monitor employee activity for unusual data transfers." },
            { description: "✅ Encrypt sensitive business documents and communications." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "ransomware-business",
      title: "Ransomware Attacks on Businesses",
      description:
        "Ransomware is malware that locks a company’s files or systems and demands ransom payments in exchange for restoring access.",
  
      details: [
        {
          sectionTitle: "Common Types of Ransomware Attacks on Businesses in the Philippines:",
          items: [
            {
              title: "Double Extortion Ransomware",
              description:
                "Hackers encrypt company data and threaten to leak it.",
            },
            {
              title: "Ransomware on Financial Institutions",
              description:
                "Attackers target banks, e-wallet providers, and fintech companies.",
            },
            {
              title: "Supply Chain Ransomware",
              description:
                "Criminals attack a company’s IT provider, affecting multiple businesses.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A Philippine-based financial services company paid millions to hackers after losing access to customer data.",
            },
            {
              description:
                "Another financial services company was forced to pay millions in ransom to restore their encrypted files.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ Targets business-critical systems, not personal files." },
            { description: "✔ Ransom demands are usually in millions, aimed at companies with large budgets." },
            { description: "✔ Disrupts business operations, supply chains, and customer services." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Regularly back up critical business data." },
            { description: "✅ It is recommended for a company to use cybersecurity tools to detect and block ransomware." },
            { description: "✅ Employees shall avoid clicking on suspicious email attachments." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "insider-threat",
      title: "Insider Threats & Employee Data Leaks",
      description:
        "Insider threats involve employees, contractors, or partners who misuse company access to steal, sabotage, or leak corporate data.",
  
      details: [
        {
          sectionTitle: "Common Types of Insider Threats & Employee Data Leaks in the Philippines:",
          items: [
            {
              title: "Employee Selling Customer Data",
              description:
                "Workers steal and sell personal client records to third parties.",
            },
            {
              title: "Disgruntled Employee Sabotage",
              description:
                "Ex-employees delete or corrupt company data as revenge.",
            },
            {
              title: "Unauthorized Data Sharing",
              description:
                "Employees transfer sensitive business files to external devices.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A call center employee was caught selling customer credit card data on the dark web.",
            },
            {
              description:
                "A fired IT staff member deleted an entire business database, causing financial losses.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ The perpetrator is an insider with company access." },
            { description: "✔ Directly impacts business operations and reputation." },
            { description: "✔ Unlike hacking, the attacker has legitimate access but misuses it." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Limit employee access to sensitive files." },
            { description: "✅ Monitor activity logs for unusual data transfers." },
            { description: "✅ Use identity access management (IAM) tools to track internal threats." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "ddos-attacks",
      title: "Distributed Denial of Service (DDoS) Attacks",
      description:
        "DDoS attacks flood company websites or networks with excessive traffic, making them unavailable to customers.",
  
      details: [
        {
          sectionTitle: "Common Types of DDoS Attacks in the Philippines:",
          items: [
            {
              title: "E-Commerce Website Downtime",
              description:
                "Attackers target online businesses, preventing transactions.",
            },
            {
              title: "Banking System Overload",
              description:
                "DDoS attacks disrupt online banking services.",
            },
            {
              title: "DDoS-for-Hire Attacks",
              description:
                "Cybercriminals sell DDoS services to competitors for sabotage.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A Philippine-based e-commerce store was attacked by flooding their server, making it inaccessible for two days.",
            },
            {
              description:
                "Several local banks experienced temporary outages due to DDoS attacks in 2023.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ Targets business operations rather than personal accounts." },
            { description: "✔ Used as financial extortion or competitive sabotage." },
            { description: "✔ Affects revenue, customer trust, and service reliability." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Use DDoS protection services to filter malicious traffic." },
            { description: "✅ Implement load balancing solutions to handle traffic surges." },
            { description: "✅ Monitor for unusual spikes in network activity." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
          ],
        },
      ],
    },
    {
      id: "supply-chain",
      title: "Supply Chain Cyber Attacks",
      description:
        "A supply chain cyber attack occurs when cybercriminals exploit vulnerabilities in third-party vendors, suppliers, or service providers to compromise a business. Instead of attacking the company directly, hackers target weaker security points within a company’s external network to gain unauthorized access.",
  
      details: [
        {
          sectionTitle: "Common Types of Supply Chain Cyber Attacks in the Philippines:",
          items: [
            {
              title: "Software Supply Chain Attacks",
              description:
                "Hackers infect software updates with malware, which spreads to businesses using the compromised software.",
            },
            {
              title: "Third-Party Data Breaches",
              description:
                "Cybercriminals hack suppliers or contractors to steal company data.",
            },
            {
              title: "Vendor-Based Phishing Attacks",
              description:
                "Attackers impersonate legitimate vendors to trick employees into granting access or sending money.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "In 2021, a major Philippine e-commerce company suffered a data breach after hackers infiltrated a third-party logistics provider.",
            },
            {
              description:
                "Ransomware was installed on corporate computers through a fake software update, affecting multiple businesses.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Corporate/Business Cybercrime?",
          items: [
            { description: "✔ Targets businesses by infiltrating their suppliers or IT service providers." },
            { description: "✔ Affects entire supply chains, leading to widespread operational disruptions." },
            { description: "✔ Often leads to financial and operational losses across multiple companies." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Verify all third-party vendors for cybersecurity compliance." },
            { description: "✅ Regularly update and patch software to prevent supply chain malware." },
            { description: "✅ Monitor supplier networks for suspicious activity." },
            { description: "✅ Require strong cybersecurity policies for all business partners." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
          ],
        },
      ],
    },
    {
      id: "ai-cybercrime",
      title: "AI-Powered Cybercrime (Deepfakes & AI Phishing Attacks)",
      description:
        "AI-powered cybercrime uses artificial intelligence to commit fraud, impersonation, and hacking. Criminals leverage deepfake technology and AI-generated messages to scam victims or manipulate information.",
  
      details: [
        {
          sectionTitle: "Common Types of AI-Powered Cybercrime in the Philippines:",
          items: [
            {
              title: "Deepfake Scams",
              description:
                "AI-generated videos or voices impersonate celebrities, politicians, or executives to deceive the public.",
            },
            {
              title: "AI-Generated Phishing",
              description:
                "AI creates convincing scam emails or messages, making it harder to detect phishing attempts.",
            },
            {
              title: "AI-Driven Cyber Attacks",
              description:
                "AI-powered hacking tools automate password cracking and system breaches.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "Deepfake videos of politicians were circulated during elections to spread misinformation.",
            },
            {
              description:
                "AI-generated chatbots were used to phish bank account credentials from Filipinos.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Emerging Cybercrime Threat?",
          items: [
            { description: "✔ AI makes scams more convincing and harder to detect." },
            { description: "✔ Deepfakes can be used to spread fake news, financial scams, or reputational damage." },
            { description: "✔ AI-generated cyberattacks are expected to increase with advancing technology." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Verify the authenticity of suspicious videos, voice recordings, or emails." },
            { description: "✅ Use AI-detection tools to spot deepfakes." },
            { description: "✅ Train employees to recognize AI-generated phishing attempts." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "metaverse-crime",
      title: "Cybercrime in the Metaverse & Virtual Worlds",
      description:
        "Cybercrime in the metaverse involves illegal activities in virtual spaces where users interact through avatars and digital assets. Criminals exploit virtual economies, NFT ownership, and identity theft.",
  
      details: [
        {
          sectionTitle: "Common Types of Cybercrime in the Metaverse & Virtual Worlds:",
          items: [
            {
              title: "Metaverse Identity Theft",
              description:
                "Criminals steal avatars or user accounts to scam others.",
            },
            {
              title: "NFT & Virtual Asset Scams",
              description:
                "Fake NFT projects trick people into investing in non-existent digital assets.",
            },
            {
              title: "Virtual Harassment & Assault",
              description:
                "Criminals harass or manipulate users in virtual reality (VR) environments.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A Filipino NFT investor lost ₱500,000 after buying fake NFTs from a fraudulent marketplace.",
            },
            {
              description:
                "A metaverse-based scam targeted online gamers, selling fake virtual properties.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Emerging Cybercrime Threat?",
          items: [
            { description: "✔ The metaverse is a growing economy, making it a prime target for fraud." },
            { description: "✔ Cybercriminals can impersonate users or steal virtual assets." },
            { description: "✔ Law enforcement struggles to regulate crimes in decentralized virtual spaces." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Report suspicious activities on metaverse platforms." },
            { description: "✅ Use strong security measures for metaverse accounts." },
            { description: "✅ Be cautious when investing in digital assets like NFTs." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Metaverse Support Services" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "quantum-hacking",
      title: "Quantum Hacking (Breaking Encryption with Quantum Computing)",
      description:
        "Quantum hacking refers to the future risk of quantum computers breaking encryption, allowing criminals to decrypt classified information and personal data.",
  
      details: [
        {
          sectionTitle: "Common Types of Quantum Hacking:",
          items: [
            {
              title: "Quantum Decryption of Financial Transactions",
              description:
                "Hackers could bypass banking security and steal money.",
            },
            {
              title: "National Security Risks",
              description:
                "Foreign actors could decrypt government intelligence and military secrets.",
            },
            {
              title: "Corporate Espionage",
              description:
                "Hackers could access protected business data that was previously secure with quantum computing.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "Government agencies are preparing for quantum threats that could compromise national security.",
            },
            {
              description:
                "Banks are upgrading encryption protocols to prevent future quantum cyberattacks.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Emerging Cybercrime Threat?",
          items: [
            { description: "✔ Quantum computing will eventually break traditional encryption." },
            { description: "✔ Cybercriminals can store stolen encrypted data and decrypt it in the future." },
            { description: "✔ Sensitive government and corporate information could be exposed." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Adopt post-quantum encryption technologies." },
            { description: "✅ Upgrade cybersecurity infrastructure before quantum computers become mainstream." },
            { description: "✅ Monitor quantum computing developments closely." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 DICT Cybersecurity Bureau" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "raas",
      title: "Ransomware-as-a-Service (RaaS)",
      description:
        "Ransomware-as-a-Service (RaaS) is a cybercrime business model where criminals sell or rent ransomware tools to less-skilled hackers, making ransomware attacks more widespread.",
  
      details: [
        {
          sectionTitle: "Common Types of RaaS in the Philippines:",
          items: [
            {
              title: "Dark Web Ransomware Marketplaces",
              description:
                "Cybercriminals sell ransomware kits to anyone willing to launch an attack.",
            },
            {
              title: "Small Business Attacks",
              description:
                "Hackers target SMEs that lack strong cybersecurity defenses.",
            },
            {
              title: "Critical Infrastructure Ransomware",
              description:
                "Hospitals, banks, and government agencies are vulnerable to ransomware extortion.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A local business lost ₱3 million after a RaaS attack encrypted their customer database.",
            },
            {
              description:
                "Hackers targeted healthcare providers, locking patient records until ransom was paid.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Emerging Cybercrime Threat?",
          items: [
            { description: "✔ Ransomware attacks are easier to launch, even for inexperienced criminals." },
            { description: "✔ The rise of cryptocurrency makes ransom payments harder to trace." },
            { description: "✔ Cybercriminals can attack more victims using pre-made ransomware kits." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Regularly back up important files offline." },
            { description: "✅ Use endpoint security solutions to detect ransomware." },
            { description: "✅ Avoid clicking on suspicious links or downloading unknown files." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 Philippine National Police - Anti-Cybercrime Group (PNP-ACG)" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },
    {
      id: "iot-attacks",
      title: "Advanced Internet of Things (IoT) Cyber Attacks",
      description:
        "IoT attacks target internet-connected devices, such as smart home systems, security cameras, and industrial equipment.",
  
      details: [
        {
          sectionTitle: "Common Types of IoT Attacks in the Philippines:",
          items: [
            {
              title: "Smart Home Device Hacking",
              description:
                "Cybercriminals hack into smart cameras, locks, or appliances.",
            },
            {
              title: "IoT-Based DDoS Attacks",
              description:
                "Hackers use thousands of infected IoT devices to launch cyberattacks.",
            },
            {
              title: "Industrial IoT Sabotage",
              description:
                "Criminals tamper with factory sensors to disrupt production.",
            },
          ],
        },
        {
          sectionTitle: "Example Scenarios:",
          items: [
            {
              description:
                "A hacker took control of a family's smart security cameras, spying on their home.",
            },
            {
              description:
                "An IoT-based cyberattack shut down servers in Philippine banks, causing service disruptions.",
            },
          ],
        },
        {
          sectionTitle: "Why is it Emerging Cybercrime Threat?",
          items: [
            { description: "✔ IoT devices often have weak security, making them easy targets." },
            { description: "✔ More people are using smart homes, increasing attack surfaces." },
            { description: "✔ Hackers can control or sabotage critical infrastructure using IoT vulnerabilities." },
          ],
        },
        {
          sectionTitle: "How to Prevent It:",
          items: [
            { description: "✅ Change default passwords on IoT devices." },
            { description: "✅ Regularly update firmware to fix security flaws." },
            { description: "✅ Disable unnecessary IoT features that expose devices to risks." },
          ],
        },
        {
          sectionTitle: "Where to Report:",
          items: [
            { description: "📌 National Privacy Commission (NPC)" },
            { description: "📌 DICT Cybersecurity Bureau" },
            { description: "📌 National Bureau of Investigation (NBI) – Cybercrime Division" },
            { description: "📌 The Cybercrime Investigation and Coordinating Center (CICC)" },
          ],
        },
      ],
    },

  ];

  const CybercrimeGuide = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCrime, setSelectedCrime] = useState(null);
    const [isLawsModalOpen, setIsLawsModalOpen] = useState(false);
  
    const openCategory = (category) => {
      setSelectedCategory(category);
      setSelectedCrime(null);
    };
  
    const openCrime = (crimeType) => {
      setSelectedCrime(crimeType);
    };
  
    const closeFirstModal = () => {
      setSelectedCategory(null);
    };
  
    const closeSecondModal = () => {
      setSelectedCrime(null);
    };
  
    const selectedCrimeData = cybercrimeDetails.find((crime) => crime.id === selectedCrime);
  
    return (
      <section className="cybercrime-guides">
        <div className="container">
          <h2>TYPES OF CYBERCRIME</h2>
          <p>Cybercrime comes in many forms. Select a category below to understand its impact and how to stay safe.</p>
  
          {/* Cybercrime Categories */}
          <div className="guide-grid">
            {cybercrimeData.map((category) => (
              <div key={category.id} className="guide-wrapper" onClick={() => openCategory(category)}>
                <div className="guide-card">
                  <img src={category.img} alt={category.title} />
                </div>
                <p className="guide-text">{category.title}</p>
              </div>
            ))}
          </div>

            {/* Cybercrime Insight Section */}
            <div className="cybercrime-insight">
                <p>
                  <strong>Empower Yourself Against Cybercrime:</strong>  
                  Awareness is your first line of defense against cybercriminals.  
                  Understanding your rights under <strong>Philippine law</strong> helps you <strong>stay protected</strong> and <strong>take action</strong>.  
                  <strong>The Cybercrime Prevention Act of 2012 (RA 10175)</strong> provides legal measures to combat digital crimes, ensuring accountability for online threats.  
                  <button className="learn-more-btn" onClick={() => setIsLawsModalOpen(true)}>
                    <strong>Click here</strong>
                  </button> to learn more about your rights.
                </p>
              </div>

              {/* Cybercrime Laws Modal */}
              <CybercrimeLaws isOpen={isLawsModalOpen} onClose={() => setIsLawsModalOpen(false)} />
  
            {/* First Modal: Cybercrime List */}
            {selectedCategory && (
            <div id="cybercrime-modal" className={`cybercrime-modal first-modal ${selectedCategory ? "active" : ""}`} onClick={closeFirstModal}>
            <div className="modal-content first-modal-content" onClick={(e) => e.stopPropagation()}>
                
                {/* 🔹 Corrected Title with Proper ID */}
                <h2 id="modal-title" className="modal-title">{selectedCategory.title}</h2>

                {/* 🔹 Corrected Description with Proper ID */}
                <p id="modal-description">{selectedCategory.description}</p>

                {/* 🔹 Ensuring Correct Grid Structure */}
                <div id="modal-grid" className="modal-grid">
                    {selectedCategory.crimes.map((crime) => (
                    <div key={crime.type} className="cybercrime-card" onClick={() => openCrime(crime.type)}>
                        <h3>{crime.name}</h3>
                    </div>
                    ))}
                </div>

                {/* 🔹 Note Section - Matches Original HTML */}
                <p className="modal-note">
                    ⚠️ <strong>Note:</strong> The information provided in this section is subject to updates and revisions by
                    the development team. Cybercrime trends are constantly evolving, and details may change over time to
                    ensure accuracy and relevance.
                </p>

                </div>
            </div>
            )}

            {/* Second Modal: Cybercrime Descriptions */}
            {selectedCrimeData && (
            <div id="cybercrime-second-modal" className="cybercrime-details-modal active" onClick={closeSecondModal}>
              <div className="cybercrime-details-content" onClick={(e) => e.stopPropagation()}>
                <div className="cybercrime-details-container">
                  
                  {/* Cybercrime Title */}
                  <h2 className="cybercrime-details-title">{selectedCrimeData.title}</h2>

                  {/* Cybercrime Description */}
                  <p className="cybercrime-details-description"><strong>What is it?</strong> {selectedCrimeData.description}</p>

                  {/* Sections with Lists */}
                  {selectedCrimeData.details.map((section, index) => (
                    <div key={index} className="cybercrime-details">
                      <p><strong className="sectiontitle">{section.sectionTitle}</strong></p>
                      <ul>
                        {section.items.map((item, i) => (
                          <li key={i}>
                            {item.title && <strong>{item.title} </strong>}
                            {item.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  };
  
  export default CybercrimeGuide;