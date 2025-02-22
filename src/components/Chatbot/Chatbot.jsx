// Chatbot.jsx
// =============================================================================
// Chatbot Component - Enhanced Version with Dynamic Suggestions,
// Conversation History, and Input Locking until the current question is answered.
// =============================================================================

import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import bot from "../../assets/icons/bot.png";

// =============================================================================
// Helper functions: similarity score and edit distance calculations
// =============================================================================

/**
 * Compute the edit (Levenshtein) distance between two strings.
 * @param {string} s1
 * @param {string} s2
 * @returns {number} edit distance
 */
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

/**
 * Compute similarity score between two strings based on edit distance.
 * @param {string} str1
 * @param {string} str2
 * @returns {number} similarity score (0 to 1)
 */
const similarityScore = (str1, str2) => {
  let longer = str1.length > str2.length ? str1 : str2;
  let shorter = str1.length > str2.length ? str2 : str1;
  let longerLength = longer.length;
  if (longerLength === 0) return 1.0;
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
};

// =============================================================================
// Chatbot Component
// =============================================================================

const Chatbot = () => {
  // State variables for UI, data, and conversation
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "🔹Hello there! I’m your cybercrime awareness assistant.🔹", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const [chatbotData, setChatbotData] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // dynamically computed suggestions

  // =============================================================================
  // Local Storage Backup (persist conversation history across sessions)
  // =============================================================================
  useEffect(() => {
    const storedHistory = localStorage.getItem("chatConversationHistory");
    if (storedHistory) {
      setConversationHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatConversationHistory", JSON.stringify(conversationHistory));
  }, [conversationHistory]);

  // =============================================================================
  // Load the rules-based chatbot dataset from the server
  // =============================================================================
  useEffect(() => {
    fetch("../../../../Server/Chatbot/chatbot_dataset.json")
      .then((response) => response.json())
      .then((data) => {
        setChatbotData(data);
        console.log("✅ Chatbot dataset successfully loaded!");
        // Initialize suggestions with default keys from dataset
        updateSuggestions("");
      })
      .catch((error) => {
        console.error("❌ Error loading chatbot dataset:", error);
      });
  }, []);

  // =============================================================================
  // Auto-scroll to the latest message
  // =============================================================================
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // =============================================================================
  // Toggle the chatbox open/closed and update suggestions when opening
  // =============================================================================
  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
    // When opening the chatbot, update suggestions from dataset if available
    if (!isOpen && Object.keys(chatbotData).length > 0) {
      updateSuggestions(input);
    }
  };

  // =============================================================================
  // Handle sending a message; lock further input until a response is received.
  // =============================================================================
  const handleSendMessage = async () => {
    // Prevent sending if bot is still processing a message
    if (botTyping) return;
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    console.log("User message:", input);
    setMessages((prev) => [...prev, userMessage]);
    const userQuery = input;
    setInput(""); // Clear input field
    setBotTyping(true); // Disable further input

    // Check for a rules-based response
    const botResponse = getBestMatch(userQuery) || chatbotData["default"];
    if (botResponse) {
      setTimeout(() => {
        // Add the bot response message with formatting
        setMessages((prev) => [
          ...prev,
          { text: formatResponse(botResponse), sender: "bot" },
        ]);
        setBotTyping(false);
        updateSuggestions(userQuery);
        updateConversationHistory(userQuery);
      }, 1000);
    } else {
      // Fallback: call the AI model via Flask API
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
          { text: "Sorry, there was an error. Please try again.", sender: "bot" },
        ]);
      }
      setBotTyping(false);
    }
  };

  // =============================================================================
  // Dynamically compute suggestions from the dataset keys.
  // Exclude keys containing "total" or "unknown" (case-insensitive),
  // sort by similarity to the current input, and take the top 3.
  // =============================================================================
  const updateSuggestions = (lastInput) => {
    if (!chatbotData || Object.keys(chatbotData).length === 0) {
      setSuggestions([]);
      return;
    }
    const threshold = 0.3; // minimum similarity to consider
    const candidates = Object.keys(chatbotData)
      .filter((key) => {
        const lowerKey = key.toLowerCase();
        return (
          key !== "default" &&
          !lowerKey.includes("total") &&
          !lowerKey.includes("unknown")
        );
      })
      .map((key) => ({
        key,
        score: similarityScore(lastInput.toLowerCase(), key.toLowerCase()),
      }))
      .filter((item) => item.score >= threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.key);
    setSuggestions(candidates);
  };

  // =============================================================================
  // Get the best matching answer from the dataset based on similarity score.
  // =============================================================================
  const getBestMatch = (input) => {
    input = input.toLowerCase().trim();
    if (!chatbotData || Object.keys(chatbotData).length === 0) return null;

    let bestMatch = null;
    let highestScore = 0;
    let relatedTopics = [];

    Object.keys(chatbotData).forEach((question) => {
      let score = similarityScore(input, question.toLowerCase());
      if (score > highestScore) {
        highestScore = score;
        bestMatch = question;
      }
      if (score > 0.40 && score < 0.60) {
        relatedTopics.push(question);
      }
    });

    // Return an exact match if confidence is high enough.
    if (highestScore > 0.60) return chatbotData[bestMatch];
    // Otherwise, return suggestions if available.
    if (relatedTopics.length > 0) {
      return (
        "Did you mean:\n" +
        relatedTopics.map((topic) => `✅ ${topic}`).join("\n") +
        "\nPlease be more specific!"
      );
    }
    // Fallback: handle contextual questions.
    return handleContextualQuestions(input);
  };

  // =============================================================================
  // Update conversation history (keeping only the last three messages)
  // =============================================================================
  const updateConversationHistory = (newMessage) => {
    setConversationHistory((prev) => {
      const updatedHistory = [...prev, newMessage];
      return updatedHistory.length > 3 ? updatedHistory.slice(1) : updatedHistory;
    });
  };

  // =============================================================================
  // Handle contextual questions if no close match is found.
  // =============================================================================
  const handleContextualQuestions = (input) => {
    let lastQuestion =
      conversationHistory.length > 0
        ? conversationHistory[conversationHistory.length - 1]
        : "";
    if (input === "yes" || input === "tell me more") {
      return (
        chatbotData[lastQuestion] ||
        "Can you clarify what you want to know more about?"
      );
    }
    if (input.includes("help") || input.includes("assist")) {
      return "I'm here to help! Ask me about online scams, cybercrime laws, or how to report fraud.";
    }
    if (input.includes("example") || input.includes("like what")) {
      return "You can ask me things like 'What is phishing?', 'How do I report a scam?', or 'What are the signs of fraud?'";
    }
    if (input.includes("explain") && lastQuestion) {
      return `Sure! Let me explain '${lastQuestion}' in a simpler way: ${chatbotData[lastQuestion]}`;
    }
    if (input.includes("joke")) {
      return "😂 Here's one: Why do hackers love dark mode? Because the light theme exposes too much data!";
    }
    if (input.includes("insight") || input.includes("tip")) {
      return "💡 Cybersecurity Tip: Always use multi-factor authentication (MFA) to secure your accounts.";
    }
    return "❓ I didn't quite get that. Could you try rephrasing your question? 😊";
  };

  // =============================================================================
  // Format the response for better appearance using HTML formatting
  // =============================================================================
  const formatResponse = (response) => {
    return response
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
  };

  // =============================================================================
  // Main similarity functions using edit distance.
  // =============================================================================
  const similarityScore = (str1, str2) => {
    let longer = str1.length > str2.length ? str1 : str2;
    let shorter = str1.length > str2.length ? str2 : str1;
    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  };

  // =============================================================================
  // Render the Chatbot Component
  // =============================================================================
  return (
    <>
      {/* Floating Chatbot Button */}
      <button className="chatbot-widget" onClick={toggleChatbox} aria-label="Open chatbot">
        <img src={bot} alt="Chatbot" />
      </button>

      {/* Floating Suggestions Container (only visible when chatbox is open) */}
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

      {/* Chatbox Container */}
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
                setInput(e.target.value);
                updateSuggestions(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              disabled={botTyping} // Disable input if bot is still processing
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
