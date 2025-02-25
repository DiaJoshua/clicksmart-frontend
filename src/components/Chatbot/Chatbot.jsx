import { useState, useEffect, useRef, useMemo } from "react";
import "./Chatbot.css";
import bot from "../../assets/icons/bot.png";

// Utility functions for text similarity
const editDistance = (s1, s2) => {
  let costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i === 0) {
        costs[j] = j;
      } else if (j > 0) {
        let newValue = costs[j - 1];
        if (s1.charAt(i - 1) !== s2.charAt(j - 1))
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
};

const similarityScore = (str1, str2) => {
  let longer = str1.length > str2.length ? str1 : str2;
  let shorter = str1.length > str2.length ? str2 : str1;
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (
    (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength)
  );
};

const normalizeText = (text) => {
  return text.toLowerCase().trim().replace(/['’]/g, ""); // Removes apostrophes
};

// Step 1: Define Approved Cybercrime Topics
const approvedCybercrimeScope = [
  // General Cybercrime & Security Topics
  "cybercrime",
  "cybersecurity",
  "information security",
  "infosec",
  "online security",
  "phishing",
  "hacking",
  "ethical hacking",
  "white hat hacker",
  "black hat hacker",
  "ransomware",
  "data breach",
  "identity theft",
  "fraud prevention",
  "online scams",
  "scam detection",
  "digital safety",
  "cyber attack",
  "threat intelligence",
  "cyber resilience",
  "data privacy",
  "security awareness",

  // Specific Cybercrime Threats
  "social engineering",
  "malware",
  "spyware",
  "adware",
  "trojan",
  "botnet",
  "denial of service",
  "dos attack",
  "ddos attack",
  "brute force attack",
  "man-in-the-middle attack",
  "zero-day vulnerability",
  "advanced persistent threat",
  "credential stuffing",
  "clickjacking",
  "keylogger",
  "exploit kits",
  "rootkit",
  "backdoor",
  "dns hijacking",
  "session hijacking",
  "payload injection",
  "malvertising",
  "watering hole attack",
  "rogue software",
  "worm",
  "trojan horse",

  // Online Scams & Financial Cybercrime
  "cyber fraud",
  "investment fraud",
  "romance scams",
  "fake job scams",
  "crypto scams",
  "pyramid scheme",
  "ponzi scheme",
  "wire fraud",
  "check fraud",
  "advance fee fraud",
  "email fraud",
  "lottery scam",
  "money mule",
  "identity fraud",
  "imposter scams",
  "fake tech support scam",
  "nigerian prince scam",
  "fake invoice scam",
  "charity fraud",
  "social media scams",
  "social media hacking",
  "fake website scams",
  "rental scams",
  "loan scams",
  "credit card fraud",
  "account takeover fraud",
  "synthetic identity fraud",

  // General Hacking Knowledge
  "what is hacking",
  "how does hacking work",
  "types of hackers",
  "why do hackers attack",
  "why do hackers target businesses",

  // Hacking Techniques
  "common hacking techniques",
  "phishing attacks",
  "malware attacks",
  "social engineering hacking",
  "brute-force attack",
  "password cracking",
  "exploiting software vulnerabilities",
  "keylogging",
  "session hijacking",

  // Password & Account Hacking
  "how do hackers steal passwords",
  "brute force attack",
  "dictionary attack",
  "credential stuffing",
  "how to protect my online accounts",
  "best practices to prevent hacking",

  // Network & Wi-Fi Hacking
  "public wifi hacking risks",
  "how do hackers steal data on public wifi",
  "man in the middle attack",
  "how to secure home wifi",
  "wifi encryption",
  "best wifi security practices",

  // Mobile & Computer Hacking
  "how do hackers access mobile phones",
  "phone hacking signs",
  "how do I know if my computer is hacked",
  "how to recover from a hack",
  "best practices to secure my phone",
  "how to secure my laptop",

  // Social Media & Email Hacking
  "how do hackers take over social media accounts",
  "how do hackers steal facebook accounts",
  "how do hackers access email accounts",
  "how to recover hacked facebook",
  "how to recover hacked instagram",
  "how to protect social media from hackers",
  "how to secure my email",

  // Ethical Hacking & Cybersecurity Careers
  "what is ethical hacking",
  "difference between ethical and black hat hacking",
  "how ethical hackers help businesses",
  "what is penetration testing",
  "how to become a cybersecurity expert",
  "cybersecurity career path",

  // Laws & Penalties for Hacking in the Philippines
  "is hacking illegal in the philippines",
  "penalties for hacking in the philippines",
  "philippine cyber laws",
  "government agencies investigating hacking",
  "reporting hacking incidents",
  "anti-cybercrime laws in the philippines",

  // Hacking Prevention & Cybersecurity Best Practices
  "how to protect myself from hackers",
  "best security practices against hackers",
  "importance of software updates",
  "how to improve cybersecurity for businesses",
  "best practices for online safety",
  "preventing hacking attempts",
  "hack",
  "hacked",
  "hacker",
  "hackers",
  "ransom",
  "hacking",

  // Privacy & Personal Data Protection
  "password security",
  "password hygiene",
  "two-factor authentication",
  "2fa",
  "multi-factor authentication",
  "mfa",
  "vpn",
  "firewall",
  "encryption",
  "public key encryption",
  "dark web monitoring",
  "data security",
  "gdpr",
  "ccpa",
  "privacy policies",
  "cookie tracking",
  "device fingerprinting",
  "anonymization",
  "secure browsing",
  "digital footprint",
  "privacy invasion",
  "identity protection",

  // Cyberbullying, Harassment, & Online Threats
  "cyberbullying",
  "cyber harassment",
  "cyberstalking",
  "online defamation",
  "doxxing",
  "sextortion",
  "revenge porn",
  "deepfake abuse",
  "catfishing",
  "trolling",
  "hate speech online",
  "online threats",
  "cyber extortion",
  "impersonation fraud",
  "blackmail scams",
  "intellectual property theft",

  // Social Engineering & Fraudulent Activities
  "fraudulent websites",
  "smishing",
  "vishing",
  "business email compromise",
  "spoofing",
  "email spoofing",
  "caller ID spoofing",
  "CEO fraud",
  "fake job offers",
  "fake social media accounts",
  "fake online stores",
  "fake reviews",
  "scam calls",
  "phishing emails",
  "spear phishing",
  "whaling attack",
  "phishing kits",
  "fake online marketplaces",

  // Cyber Laws & Reporting Cybercrime
  "cyber laws",
  "digital forensics",
  "cybercrime penalties",
  "reporting scams",
  "reporting cybercrime",
  "international cyber laws",
  "computer fraud act",
  "data protection laws",
  "digital rights",
  "internet safety laws",
  "internet censorship",
  "anti-money laundering",
  "electronic fraud laws",
  "reporting identity theft",
  "law enforcement cybercrime",

  // Network & System Security
  "penetration testing",
  "pentesting",
  "ethical hacking",
  "black box testing",
  "white box testing",
  "bug bounty",
  "security patching",
  "patch management",
  "security audits",
  "forensic analysis",
  "security tokens",
  "biometric security",
  "zero-trust security",
  "network forensics",
  "cloud security",
  "endpoint security",
  "email security",
  "website security",
  "database security",
  "iot security",
  "api security",
  "devsecops",
  "honeypots",
  "intrusion detection",

  // Commonly Used Attack Methods & Techniques
  "sql injection",
  "code injection",
  "xml injection",
  "clickjacking",
  "cross-site scripting",
  "xss attack",
  "cross-site request forgery",
  "csrf attack",
  "buffer overflow",
  "directory traversal attack",
  "dll hijacking",
  "rfi attack",
  "lfi attack",
  "remote code execution",
  "session fixation",
  "privilege escalation",
  "cloud-based attacks",
  "mobile malware",
  "sms-based attacks",
  "bluetooth hacking",

  // Dark Web & Illicit Cyber Activities (Awareness & Prevention)
  "dark web",
  "deep web",
  "dark web markets",
  "dark web scams",
  "illegal marketplaces",
  "stolen credentials",
  "black market websites",
  "anonymity networks",
  "tor browser",
  "bitcoin laundering",
  "illicit bitcoin transactions",
  "dark web identity theft",

  // Security Best Practices
  "cyber hygiene",
  "best security practices",
  "preventing data breaches",
  "securing online accounts",
  "social media privacy",
  "phishing awareness",
  "safe browsing",
  "password manager",
  "strong passwords",
  "2fa importance",
  "how to report cybercrime",
  "preventing ransomware",
  "securing mobile devices",
  "contacts",

  // **General Chatbot & ClickSmart-Related Queries**
  "clicksmart",
  "what is clicksmart",
  "clicksmart chatbot",
  "clicksmart mission",
  "clicksmart project",
  "clicksmart cybersecurity",
  "who are you",
  "what can you do",
  "chatbot help",
  "about clicksmart",
  "help",
  "hi",
  "hello",
  "hey",
  "how are you",
  "greetings",
  "good morning",
  "good afternoon",
  "good evening",
  "chatbot information",
  "who created clicksmart",
  "clicksmart features",
  "clicksmart resources",
  "clicksmart contact",
  "clicksmart support",
  "clicksmart government affiliation",
  "clicksmart security",
  "clicksmart chatbot features",
  "clicksmart chatbot safety",
  "clicksmart free to use",
  "clicksmart anonymous use",
  "clicksmart information",
  "clicksmart privacy policy",
  "clicksmart scam reporting",
  "clicksmart educational material",
  "clicksmart target audience",
  "clicksmart plans",
  "clicksmart developers",
  "clicksmart project goals",

  // **General Conversation & Assistance**
  "can you help me",
  "i need help",
  "assist me",
  "can i ask a question",
  "who shall I contact with?",
  "how do I file a complaint?",
  "how can you help me",
  "what help do you provide",
  "what can you do",
  "how do i use this chatbot",
  "how does this chatbot work",
  "explain cybercrime",
  "explain cybersecurity",
  "what is malware",
  "what is ransomware",
  "what is hacking",
  "what is phishing",
  "how to report a scam",
  "how to report cybercrime",
  "how to protect my password",
  "how to stay safe online",
  "what are common online scams",
  "best security practices",
  "how to secure my email",
  "how to enable 2fa",
  "what is smishing",
  "what is vishing",
  "what is spyware",
  "how does malware spread",
  "types of cyber attacks",
  "what is ethical hacking",
  "what is penetration testing",
  "is this a scam",
  "how to verify a website",
  "how to recognize phishing emails",
  "steps to report cybercrime",
  "ways to recover hacked account",
  "best password managers",
  "how to recognize fake websites",
  "cybersecurity tips for beginners",
  "how do hackers steal passwords",
  "how to avoid financial fraud",
  "best VPNs for security",
  "how to browse safely",
  "does encryption protect me",
  "cybersecurity for businesses",

  // Law Enforcement & Reporting
  "who to contact for cybercrime",
  "law enforcement contacts",
  "how do i file a complaint",
  "report cybercrime philippines",
  "contact pnp acg",
  "nbi cybercrime",
  "reporting scams hotline",
  "philippine cyber laws",
  "cybercrime investigation",
  "anti-money laundering council",
  "report identity theft",
  "report hacking",
  "report financial fraud",
];

// Function to Check if a Query is Unrelated**
const isUnrelatedQuery = (query) => {
  const lowerQuery = normalizeText(query);

  // If exact match is found, allow it
  if (approvedCybercrimeScope.some((keyword) => lowerQuery.includes(keyword))) {
    return false;
  }

  // **Use Fuzzy Matching for Typos**
  for (let keyword of approvedCybercrimeScope) {
    if (similarityScore(lowerQuery, keyword) >= 0.85) {
      return false; // Allow query if it's at least 85% similar
    }
  }

  return true; // Block only if no relevant matches are found
};

const isMaliciousQuery = (query) => {
  const lowerQuery = normalizeText(query);

  const safeKeywords = [
    // General Cybersecurity Topics
    "cyberterrorism",
    "cyber warfare",
    "hacking",
    "cybercrime",
    "phishing",
    "data breach",
    "financial fraud",
    "ransomware",
    "identity theft",
    "ddos attack",
    "cyber espionage",
    "malware",
    "cybersecurity",
    "cybercriminals",
    "cyberattacks",
    "security",
    "data security",
    "data privacy",
    "laws",
    "penalties",
    "penalty",
    "botnet",

    // Specific Cyber Threats & Attacks
    "brute-force attacks",
    "man-in-the-middle",
    "stuffing attack",
    "ddos",
    "social engineering",
    "child exploitation",
    "cyber harassment",
    "cyberbullying",
    "espionage",
    "victim",

    // Authentication & Protection Measures
    "2fa",
    "two factor authentication",

    // Related Cybersecurity Topics & Terms
    "hack",
    "hacked",
    "hacker",
    "hackers",
    "ransom",
  ];

  // Allow queries that contain safe cybersecurity terms
  if (safeKeywords.some((keyword) => lowerQuery.includes(keyword))) {
    return false;
  }

  // Malicious keywords that should be blocked
  const blockedKeywords = [
    // Violence & Terrorism
    "bomb",
    "how to make a bomb",
    "build a bomb",
    "make a homemade explosive",
    "how to detonate",
    "how to assassinate",
    "terrorist attack plans",
    "terrorist recruitment",
    "join a terrorist group",
    "terrorist funding",
    "how to cause destruction",
    "hijack a plane",
    "how to incite violence",
    "how to start a riot",
    "illegal weapons trade",
    "how to join a militia",
    "how to buy an illegal gun",
    "buy unregistered firearm",
    "how to get away with murder",
    "how to start a war",
    "mass shooting guide",
    "how to make a flamethrower",
    "how to poison someone",
    "how to get a sniper rifle",
    "how to become a hitman",

    // Hacking & Cybercrime
    "how to hack into",
    "hack into",
    "steal password",
    "bypass security",
    "ddos service",
    "crack software",
    "how to steal data",
    "phishing kit",
    "dark web access",
    "how to clone a credit card",
    "hacking tutorial",
    "blackhat hacking",
    "how to install a keylogger",
    "how to create a keylogger",
    "rat malware",
    "how to make exploits",
    "how to make mod menus",
    "how to make bloatware",
    "how to make a spyware",
    "how to make a malware",
    "how to make a virus",
    "trojan virus",
    "brute force attack",
    "sql injection",
    "how to perform sql injection",
    "wifi hacking",
    "how to hack wifi",
    "ransomware creation",
    "carding method",
    "hacking a bank account",
    "hacking credit card info",
    "stealing paypal accounts",
    "hacking tutorial for beginners",
    "anonymous hacking guide",
    "how to become an anonymous hacker",
    "stealing personal data",
    "how to create undetectable malware",
    "stealing social security numbers",
    "how to access someone’s phone remotely",
    "how to hack a mobile phone",
    "how to hack an ATM",
    "how to make a phishing website",
    "how to steal cryptocurrency",
    "how to disable antivirus",
    "how to disable firewall",
    "how to spread malware",

    // Fraud & Financial Crimes
    "buy fake id",
    "buy stolen credit card",
    "fake documents",
    "money laundering",
    "how to scam people",
    "bank fraud",
    "atm skimmer",
    "fake paypal balance",
    "how to forge a signature",
    "deepfake scam",
    "identity theft method",
    "fake loan application",
    "counterfeit money",
    "credit card fraud",
    "stealing social security numbers",
    "how to steal someone’s bank details",
    "how to fake a bank statement",
    "forging documents",
    "how to cash out stolen credit cards",
    "how to withdraw money from hacked account",
    "how to create a fake business for fraud",
    "how to create deepfake videos to scam people",

    // Drug-Related Crimes
    "buy drugs",
    "how to make drugs",
    "sell cocaine",
    "drug trafficking",
    "how to smuggle drugs",
    "drug cartel contact",
    "buy prescription drugs online",
    "dark web drugs",
    "make meth",
    "opium production",
    "black market medicine",
    "buy fentanyl",
    "how to make heroin",
    "how to make LSD",
    "order drugs online",
    "where to buy illegal drugs",
    "darknet drug marketplace",

    // Human Exploitation & Abuse
    "human trafficking",
    "sell organs",
    "child abuse",
    "dark web hitman",
    "hire an assassin",
    "illegal adoption",
    "how to kidnap",
    "sex trafficking",
    "illegal human experiments",
    "rape guide",
    "pedophile chat",
    "incest forums",
    "grooming minors",
    "child pornography",
    "bestiality",
    "where to hire a hitman",
    "where to find underage girls",
    "how to blackmail someone",
    "how to exploit minors",
    "how to run a human trafficking ring",
    "how to buy slaves",
    "how to exploit vulnerable people",

    // Black Market & Dark Web Activities
    "hire a hitman",
    "buy fake passport",
    "buy fake driver's license",
    "dark web market",
    "credit card dump",
    "bitcoin money laundering",
    "buy counterfeit money",
    "smuggle weapons",
    "sell human remains",
    "illicit arms trade",
    "fake social security number",
    "stolen identity market",
    "how to access the dark web",
    "how to buy things from the dark web",
    "how to hire a hacker online",
    "best places to buy fake documents",
    "best websites to buy illegal items",
    "where to buy stolen credit cards",

    // Unethical & Dangerous Activities
    "how to disappear",
    "fake death",
    "fake suicide note",
    "how to frame someone",
    "how to escape law enforcement",
    "anarchist cookbook",
    "how to poison someone",
    "how to cheat taxes",
    "deepfake creation",
    "fake news manipulation",
    "how to spread misinformation",
    "create hoax websites",
    "fake alibi service",
    "how to fake a pregnancy",
    "how to fake medical records",
    "how to manipulate people",
    "how to spread conspiracy theories",
    "how to create fake social media accounts",
    "how to manipulate elections",
    "how to scam elderly people",
    "how to get away with financial fraud",
    "how to cheat on insurance claims",
    "how to fake academic degrees",
    "how to create counterfeit money",
    "how to run an online scam business",
    "how to manipulate financial markets",

    // Common Malicious Phrases with "?" (Sensitive)
    "how do i make a bomb?",
    "how do i hack into a bank?",
    "how do i scam people?",
    "how can i steal someone's password?",
    "how do i disable security cameras?",
    "how do i become a hacker?",
    "how do i buy illegal drugs online?",
    "how can i get fake documents?",
    "how can i launder money?",
    "where can i hire a hitman?",
    "how can i buy a stolen credit card?",
    "how do i access the dark web?",
    "how can i create undetectable malware?",
    "how do i buy an illegal firearm?",
    "how do i exploit a security vulnerability?",
    "where can i find a hacking tutorial?",
    "how do i make ransomware?",
    "how can i blackmail someone?",
    "how do i access someone’s private data?",
    "how do i spread malware?",
    "how do i run a Ponzi scheme?",
    "how do i scam people out of their money?",
    "where can i find a pedophile chat?",
    "how do i make fake money?",
    "how do i create a fake identity?",

    // Medical & Health Queries
    "migraine",
    "headache",
    "fever",
    "flu",
    "antibiotics",
    "pain relief",
    "stomach ache",
    "depression",
    "mental health",
    "therapy",
    "doctor recommendation",
    "cancer treatment",
    "heart disease",
    "cholesterol",
    "blood pressure",
    "diabetes",
    "first aid",
    "CPR instructions",
    "how to treat",
    "what medicine should I take",
    "is this symptom serious",
    "home remedies for",
    "should I see a doctor",
    "medical emergency",
    "allergy treatment",
    "covid symptoms",
    "common cold remedies",
    "best vitamins for",
    "how to lose weight",
    "how to gain weight",
    "is it safe to take",
    "medication side effects",
    "drug interactions",

    // Mental Health & Counseling
    "therapy",
    "counseling",
    "psychiatrist",
    "how to deal with stress",
    "how to handle anxiety",
    "suicide prevention",
    "self-harm help",
    "mental illness symptoms",
    "coping mechanisms for",
    "depression treatment",

    // Nutrition & Lifestyle
    "diet tips",
    "best food for",
    "nutrition advice",
    "healthy recipes",
    "weight loss programs",
    "intermittent fasting",
    "exercise routines",
    "calories in",
    "is this food healthy",
    "how to get fit",

    // Sexual Health & Medications
    "pregnancy symptoms",
    "birth control",
    "safe sex",
    "STD symptoms",
    "contraceptive methods",
    "emergency contraception",
    "morning after pill",
    "erectile dysfunction treatment",
    "libido enhancement",
    "is this normal",
    "testosterone levels",
    "hormone therapy",
  ];

  //Block if Query Contains Any Malicious Phrase
  if (blockedKeywords.some((keyword) => lowerQuery.includes(keyword))) {
    return true;
  }

  return false; // accepts the query if is SAFE
};

const Chatbot = () => {
  // Basic states
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello there! I’m your cybercrime awareness assistant.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const MAX_INPUT_WORDS = 75;

  // States for rules-based responses (from chatbot_dataset.json)
  const [chatbotData, setChatbotData] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);

  // Hierarchical menu states for category → title → question navigation
  const [menuLevel, setMenuLevel] = useState("categories"); // "categories", "titles", "questions"
  const [categoriesData, setCategoriesData] = useState({}); // Data loaded from category JSON files
  const [currentCategory, setCurrentCategory] = useState(null);
  const [setCurrentTitle] = useState(null);
  const [currentSuggestions, setCurrentSuggestions] = useState([]);

  // List of category file names and display names
  const categoryFiles = useMemo(
    () => [
      { key: "Cybercrime", file: "CybercrimeCategory.json" },
      { key: "Cyber Espionage", file: "CyberEspionageCategory.json" },
      { key: "Data Breach", file: "DataBreachCategory.json" },
      { key: "Financial Fraud", file: "FinancialFraudCategory.json" },
      { key: "Hacking", file: "HackingCategory.json" },
      { key: "Identity Theft", file: "IdentityTheftCategory.json" },
      { key: "Ransomware", file: "Ransomware%20Category.json" },
      { key: "DDoS Attack", file: "DdosAttackCategory.json" },
    ],
    []
  );

  // Load conversation history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem("chatConversationHistory");
    if (storedHistory) setConversationHistory(JSON.parse(storedHistory));
  }, []);

  // Save conversation history on change
  useEffect(() => {
    localStorage.setItem(
      "chatConversationHistory",
      JSON.stringify(conversationHistory)
    );
  }, [conversationHistory]);

  // Fetch hierarchical category data from each JSON file
  useEffect(() => {
    const fetchAllCategories = async () => {
      let loadedData = {};
      for (let cat of categoryFiles) {
        try {
          const response = await fetch(
            `http://localhost:3000/Chatbot/${cat.file}`
          );
          const data = await response.json();
          // Each JSON file is expected to have an object with an array "categories"
          loadedData[cat.key] = data.categories;
        } catch (error) {
          console.error(`Error loading ${cat.file}:`, error);
        }
      }
      setCategoriesData(loadedData);
      // Set suggestions as the category keys
      setCurrentSuggestions(Object.keys(loadedData));
    };

    fetchAllCategories();
  }, [categoryFiles]);

  // Fetch rules-based chatbot dataset
  useEffect(() => {
    fetch("http://localhost:3000/Chatbot/chatbot_dataset.json")
      .then((response) => response.json())
      .then((data) => {
        setChatbotData(data);
        console.log("Chatbot dataset loaded!", data);
      })
      .catch((error) => console.error("Error loading chatbot dataset:", error));
  }, []);

  // Auto-scroll to the bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Toggle the chatbox open/closed and reset hierarchical menu if opening
  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && Object.keys(categoriesData).length > 0) {
      resetMenu();
    }
  };

  // Hierarchical menu functions
  const handleSuggestionSelect = (suggestion) => {
    if (menuLevel === "categories") {
      // When a category is selected, update to titles within that category
      setCurrentCategory(suggestion);
      setMenuLevel("titles");
      const titles = categoriesData[suggestion].map((item) => item.title);
      setCurrentSuggestions(titles);
    } else if (menuLevel === "titles") {
      // When a title is selected, update to the questions for that title
      setCurrentTitle(suggestion);
      setMenuLevel("questions");
      const categoryItem = categoriesData[currentCategory].find(
        (item) => item.title === suggestion
      );
      if (categoryItem) {
        setCurrentSuggestions(categoryItem.questions);
      }
    } else if (menuLevel === "questions") {
      // When a question is selected, send that question as input
      setInput(suggestion);
      handleSendMessage(suggestion);
      resetMenu();
    }
  };

  const handleBack = () => {
    if (menuLevel === "questions") {
      setMenuLevel("titles");
      const titles = categoriesData[currentCategory].map((item) => item.title);
      setCurrentSuggestions(titles);
    } else if (menuLevel === "titles") {
      setMenuLevel("categories");
      setCurrentSuggestions(Object.keys(categoriesData));
    }
  };

  const resetMenu = () => {
    setMenuLevel("categories");
    setCurrentCategory(null);
    setCurrentTitle(null);
    setCurrentSuggestions(Object.keys(categoriesData));
  };

  // Rules-based response lookup (if available)
  const get_rules_based_response = (question) => {
    const lowerQuestion = question.toLowerCase().trim();
    return chatbotData[lowerQuestion] || null;
  };

  // Similarity-based best match (if needed) (Fuzzy Matching)
  const getBestMatch = (input) => {
    input = input.toLowerCase().trim();
    if (!chatbotData || Object.keys(chatbotData).length === 0) return null;
    let bestMatch = null,
      highestScore = 0;
    Object.keys(chatbotData).forEach((question) => {
      let score = similarityScore(input, question.toLowerCase());
      if (score > highestScore) {
        highestScore = score;
        bestMatch = question;
      }
    });
    if (highestScore > 0.75) {
      return chatbotData[bestMatch];
    }
    return null;
  };

  // Update conversation history for contextual responses
  const updateConversationHistory = (newMessage) => {
    setConversationHistory((prev) => {
      const updated = [...prev, newMessage];
      return updated.length > 3 ? updated.slice(1) : updated;
    });
  };

  // Function to correct typos using fuzzy matching
  const correctTypo = (query) => {
    let bestMatch = null;
    let highestScore = 0.0;

    // Check against known cybercrime terms
    for (let term of approvedCybercrimeScope) {
      let score = similarityScore(query, term);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = term;
      }
    }

    // If match is at least 85% similar, return corrected term
    return highestScore >= 0.85 ? bestMatch : query;
  };
  const inputRef = useRef(null);

  const handleSendMessage = async (overrideInput) => {
    let userQuery = overrideInput ? overrideInput : input;
    if (botTyping || !userQuery.trim()) return;

    userQuery = correctTypo(userQuery); // Correct typo before checking scope
    const words = userQuery.trim().split(/\s+/);
    const trimmedInput = words.slice(0, MAX_INPUT_WORDS).join(" ");
    const userMsg = { text: trimmedInput, sender: "user" };

    // Immediately Block Malicious Queries (BEFORE Setting botTyping)
    if (isMaliciousQuery(trimmedInput)) {
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ I cannot assist with that query. Let's keep the conversation focused on cybercrime awareness.",
          sender: "bot",
        },
      ]);
      setInput("");
      setBotTyping(false); // Ensures chatbot does not get stuck
      inputRef.current?.focus();
      return;
    }

    // Ignore Queries Unrelated to Cybercrime**
    if (isUnrelatedQuery(trimmedInput)) {
      setMessages((prev) => [
        ...prev,
        {
          text: "🚫 I'm here to assist with cybercrime-related topics only. Try asking me about online scams, hacking, or cybersecurity!",
          sender: "bot",
        },
      ]);
      setInput("");
      setBotTyping(false);

      inputRef.current?.focus();
      return;
    }

    // Proceed with Valid User Input
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBotTyping(true);

    const rulesResponse = get_rules_based_response(trimmedInput);
    const bestMatchResponse = getBestMatch(trimmedInput);

    if (rulesResponse || bestMatchResponse) {
      const responseText = rulesResponse || bestMatchResponse;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: formatResponse(responseText), sender: "bot" },
        ]);
        setBotTyping(false);
        updateConversationHistory(trimmedInput);
        resetMenu();

        inputRef.current?.focus();
      }, 1000);
    } else {
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmedInput }),
        });
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { text: formatResponse(data.response), sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, there was an error. Please try again.",
            sender: "bot",
          },
        ]);
      }
      setBotTyping(false);
      resetMenu();

      inputRef.current?.focus();
    }
  };

  // Format bot responses with basic markup
  const formatResponse = (response) =>
    response
      .replace(/- /g, "✅ ")
      .replace(/• /g, "✅ ")
      .replace(/● /g, "✅ ")
      .replace(/✅/g, "✅ ")
      .replace(/⚠️/g, "⚠️ ")
      .replace(/💡/g, "💡 ")
      .replace(/(^|\n)([^:\n]+):/g, "$1<strong>$2</strong>:")
      .replace(/(^|\n)([^-\n]+) - /g, "$1<strong>$2</strong> - ")
      .replace(/(^|\n)(\d+)\./g, "$1<strong>$2.</strong>")
      .replace(/(TIP:|Tip:)/g, "<strong>💡 TIP:</strong>")
      .replace(/(WARNING:|Warning:)/g, "<strong>⚠️ WARNING:</strong>")
      .replace(/(NOTE:|Note:)/g, "<strong>📌 NOTE:</strong>")
      .replace(/\n\n/g, "<br><br>")
      .replace(/\n/g, "<br>");

  return (
    <>
      <button
        className="chatbot-widget"
        onClick={toggleChatbox}
        aria-label="Open chatbot"
      >
        <img src={bot} alt="Chatbot" />
      </button>
      {isOpen && (
        <>
          {/* Floating Suggestions Container rendered outside of chatbox */}
          {currentSuggestions.length > 0 && (
            <div className="chatbot-suggestions-container">
              {currentSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-button"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
              {menuLevel !== "categories" && (
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              )}
            </div>
          )}
          <div className="chatbox-container">
            <div
              className="chatbox-header"
              onClick={toggleChatbox}
              role="button"
              tabIndex={0}
            >
              ClickSmart Chatbot
              <button className="chatbox-close" aria-label="Close chatbot">
                ✖
              </button>
            </div>
            <div className="chatbox-body">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${msg.sender}`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}
              {botTyping && <div className="bot-typing">...</div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chatbox-footer">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={botTyping}
              />
              <button
                type="button"
                onClick={() => handleSendMessage()} // Ensures click event fires correctly
                disabled={botTyping}
              >
                {" "}
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
