import { useState, useEffect, useRef, useMemo  } from "react";
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

const Chatbot = () => {
  // Basic states
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "🔹Hello there! I’m your cybercrime awareness assistant.🔹",
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
  const categoryFiles = useMemo(() => [
    { key: "Cybercrime", file: "CybercrimeCategory.json" },
    { key: "Cyber Espionage", file: "CyberEspionageCategory.json" },
    { key: "Data Breach", file: "DataBreachCategory.json" },
    { key: "Financial Fraud", file: "FinancialFraudCategory.json" },
    { key: "Hacking", file: "HackingCategory.json" },
    { key: "Identity Theft", file: "IdentityTheftCategory.json" },
    { key: "Ransomware", file: "Ransomware%20Category.json" },
    { key: "DDoS Attack", file: "DdosAttackCategory.json" },
  ], []);

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

  // Similarity-based best match (if needed)
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
    if (highestScore > 0.6) {
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

  // Send message handler – uses overrideInput if provided (from hierarchical selection)
  const handleSendMessage = async (overrideInput) => {
    const userQuery = overrideInput ? overrideInput : input;
    if (botTyping || !userQuery.trim()) return;
    const words = userQuery.trim().split(/\s+/);
    const trimmedInput = words.slice(0, MAX_INPUT_WORDS).join(" ");
    const userMsg = { text: trimmedInput, sender: "user" };
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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={botTyping}
              />
              <button onClick={handleSendMessage} disabled={botTyping}>
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
