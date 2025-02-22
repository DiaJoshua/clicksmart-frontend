import { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import bot from "../../assets/icons/bot.png";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [botTyping, setBotTyping] = useState(false);
  const [chatbotData, setChatbotData] = useState({});
  const [conversationHistory, setConversationHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([
    "What is phishing?",
    "How do I report a scam?",
    "What are the signs of fraud?",
    "Give me cybersecurity tips"
  ]);

  // Load the rules-based chatbot dataset
  useEffect(() => {
    fetch("../../../../Server/Chatbot/chatbot_dataset.json")
      .then(response => response.json())
      .then(data => {
        setChatbotData(data);
        console.log("✅ Chatbot dataset successfully loaded!");
      })
      .catch(error => {
        console.error("❌ Error loading chatbot dataset:", error);
      });
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    console.log("User message:", input);  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    // Check for rules-based response
    const botResponse = getBestMatch(input) || chatbotData["default"];

    if (botResponse) {
      // If a predefined response exists, use it
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: formatResponse(botResponse), sender: "bot" },
        ]);
        setBotTyping(false);
        updateSuggestions(userInput);
        updateConversationHistory(userInput);
      }, 1000);
    } else {
      // If no match, call the AI model via Flask API
      try {
        const response = await fetch("http://localhost:3000/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
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

    // **Return exact match if confidence is high enough**
    if (highestScore > 0.60) return chatbotData[bestMatch];

    // **Return related topic suggestions if available**
    if (relatedTopics.length > 0) {
        return `Did you mean:\n` + relatedTopics.map(topic => `✅ ${topic}`).join("\n") + `\nPlease be more specific!`;
    }

    // **If no close match, check for context-based answers**
    return handleContextualQuestions(input);
  };


  function updateConversationHistory(newMessage) {
    setConversationHistory(prev => {
      const updatedHistory = [...prev, newMessage];
      return updatedHistory.length > 3 ? updatedHistory.slice(1) : updatedHistory;
    });
  }

  function updateSuggestions(lastInput) {
    let newSuggestions = [
      "What is social engineering?",
      "How to secure my bank account?",
      "Tell me about malware scams",
      "How do I verify a website?"
    ];
    
    if (lastInput.includes("scam") || lastInput.includes("fraud")) {
      newSuggestions = [
        "How do I report a scam?",
        "What are common fraud tactics?",
        "How can I avoid online scams?",
        "Give me fraud prevention tips"
      ];
    } else if (lastInput.includes("cybersecurity")) {
      newSuggestions = [
        "How do I protect my data?",
        "Best cybersecurity practices?",
        "How do hackers attack?",
        "Tell me about online privacy"
      ];
    }

    setSuggestions(newSuggestions);
  }

  const handleContextualQuestions = (input) => {
    let lastQuestion = conversationHistory.length > 0 ? conversationHistory[conversationHistory.length - 1] : "";

    if (input === "yes" || input === "tell me more") {
      return chatbotData[lastQuestion] || "Can you clarify what you want to know more about?";
    }
    if (input.includes("help") || input.includes("assist")) {
      return "I'm here to help! Ask me about online scams, cybercrime laws, or how to report fraud.";
    }
    if (input.includes("example") || input.includes("like what")) {
      return "You can ask me things like 'What is phishing?', 'How do I report a scam?', or 'What are the signs of a fraudulent website?'";
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

  const similarityScore = (str1, str2) => {
    let longer = str1.length > str2.length ? str1 : str2;
    let shorter = str1.length > str2.length ? str2 : str1;
    let longerLength = longer.length;
    if (longerLength === 0) return 1.0;
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  };

  const editDistance = (s1, s2) => {
    let costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else if (j > 0) {
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


  
  return (
    <>
      {/* Floating Chatbot Button */}
      <button className="chatbot-widget" onClick={toggleChatbox} aria-label="Open chatbot">
        <img src={bot} alt="Chatbot" />
      </button>
  
      {/* Floating Suggestions (Always Visible) */}
      <div className={`chatbot-suggestions-container ${isOpen ? "shifted" : ""}`}>
        {suggestions.map((suggestion, index) => (
          <button key={index} className="suggestion-button" onClick={() => setInput(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
  
      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header" onClick={toggleChatbox} role="button" tabIndex={0}>
            ClickSmart Chatbot
            <button className="chatbox-close" aria-label="Close chatbot">✖</button>
          </div>
  
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
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
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
  
  
};

export default Chatbot;
