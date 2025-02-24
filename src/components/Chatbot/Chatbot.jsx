import { useState, useEffect, useRef, useCallback } from "react";
import "./Chatbot.css";
import bot from "../../assets/icons/bot.png";

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
  const [chatbotData, setChatbotData] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsData, setSuggestionsData] = useState({});

  const MAX_INPUT_WORDS = 75;

  useEffect(() => {
    const storedHistory = localStorage.getItem("chatConversationHistory");
    if (storedHistory) setConversationHistory(JSON.parse(storedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "chatConversationHistory",
      JSON.stringify(conversationHistory)
    );
  }, [conversationHistory]);

  const getCategoryForQuery = useCallback(
    (query) => {
      if (!query) return null;
      let bestCategory = null,
        bestScore = 0;
      Object.keys(suggestionsData).forEach((category) => {
        const score = similarityScore(
          query.toLowerCase(),
          category.toLowerCase()
        );
        if (score > bestScore) {
          bestScore = score;
          bestCategory = category;
        }
      });
      return bestScore > 0.3 ? bestCategory : null;
    },
    [suggestionsData]
  );

  const updateSuggestions = useCallback(
    (lastInput) => {
      if (!suggestionsData || Object.keys(suggestionsData).length === 0) {
        setSuggestions([]);
        return;
      }
      if (!lastInput && conversationHistory.length === 0) {
        const general = Object.keys(suggestionsData).map(
          (cat) => suggestionsData[cat][0]
        );
        setSuggestions(general);
        return;
      }
      const category = getCategoryForQuery(lastInput);
      if (category && suggestionsData[category]) {
        setSuggestions(suggestionsData[category]);
      } else {
        const fallback = Object.keys(suggestionsData).map(
          (cat) => suggestionsData[cat][0]
        );
        setSuggestions(fallback);
      }
    },
    [suggestionsData, conversationHistory, getCategoryForQuery]
  );

  useEffect(() => {
    fetch("http://localhost:3000/Chatbot/chatbot_dataset.json")
      .then((response) => response.json())
      .then((data) => {
        setChatbotData(data);
        console.log("Chatbot dataset loaded!", data);
        updateSuggestions("");
      })
      .catch((error) => console.error("Error loading chatbot dataset:", error));
  }, [updateSuggestions]);

  useEffect(() => {
    fetch("http://localhost:3000/Chatbot/Suggestions.json")
      .then((response) => response.json())
      .then((data) => {
        setSuggestionsData(data);
        console.log("Suggestions data loaded!", data);
        updateSuggestions("");
      })
      .catch((error) =>
        console.error("Error loading Suggestions.json:", error)
      );
  }, [updateSuggestions]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && Object.keys(chatbotData).length > 0) {
      updateSuggestions(input);
    }
  };

  // Define the missing function for rules-based response.
  const get_rules_based_response = (question) => {
    const lowerQuestion = question.toLowerCase().trim();
    return chatbotData[lowerQuestion] || null;
  };

  const handleSendMessage = async () => {
    if (botTyping || !input.trim()) return;
    // Trim input to MAX_INPUT_WORDS
    const words = input.trim().split(/\s+/);
    const trimmedInput = words.slice(0, MAX_INPUT_WORDS).join(" ");

    const userMsg = { text: trimmedInput, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    const userQuery = trimmedInput;
    setInput("");
    setBotTyping(true);

    // Try to get a rules-based answer
    const rulesResponse = get_rules_based_response(userQuery);
    const bestMatchResponse = getBestMatch(userQuery);

    if (rulesResponse || bestMatchResponse) {
      const responseText = rulesResponse || bestMatchResponse;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: formatResponse(responseText), sender: "bot" },
        ]);
        setBotTyping(false);
        updateSuggestions(userQuery);
        updateConversationHistory(userQuery);
      }, 1000);
    } else {
      // If no high-confidence rules-based answer, call the backend
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userQuery }),
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
    }
  };

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
    // Only return a rules-based answer if the similarity is above threshold
    if (highestScore > 0.6) {
      return chatbotData[bestMatch];
    }
    // Otherwise, return null so that the backend model is used
    return null;
  };

  const updateConversationHistory = (newMessage) => {
    setConversationHistory((prev) => {
      const updated = [...prev, newMessage];
      return updated.length > 3 ? updated.slice(1) : updated;
    });
  };

  // (Optional) Remove or comment out handleContextualQuestions if not used.
  // const handleContextualQuestions = (input) => {
  //   let lastQuestion = conversationHistory.length > 0 ? conversationHistory[conversationHistory.length - 1] : "";
  //   if (input === "yes" || input === "tell me more")
  //     return chatbotData[lastQuestion] || "Can you clarify what you want to know more about?";
  //   if (input.includes("help") || input.includes("assist"))
  //     return "I'm here to help! Ask me about online scams, cybercrime laws, or how to report fraud.";
  //   if (input.includes("example") || input.includes("like what"))
  //     return "You can ask me things like 'What is phishing?', 'How do I report a scam?', or 'What are the signs of fraud?'";
  //   if (input.includes("explain") && lastQuestion)
  //     return `Sure! Let me explain '${lastQuestion}' in a simpler way: ${chatbotData[lastQuestion]}`;
  //   if (input.includes("joke"))
  //     return "😂 Here's one: Why do hackers love dark mode? Because the light theme exposes too much data!";
  //   if (input.includes("insight") || input.includes("tip"))
  //     return "💡 Cybersecurity Tip: Always use multi-factor authentication (MFA) to secure your accounts.";
  //   return "❓ I didn't quite get that. Could you try rephrasing your question? 😊";
  // };

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
        <div className="chatbot-suggestions-container">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
      {isOpen && (
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
              onChange={(e) => {
                const newInput = e.target.value;
                const words = newInput.trim().split(/\s+/);
                // Only update the input if the word count is within the limit
                if (words.length <= MAX_INPUT_WORDS) {
                  setInput(newInput);
                  updateSuggestions(newInput);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={botTyping}
            />
            <button onClick={handleSendMessage} disabled={botTyping}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
