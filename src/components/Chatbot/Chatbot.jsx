import React, { useState, useEffect, useRef } from "react";
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

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbox = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setBotTyping(true);

    // Simulated bot response after delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm just a simple chatbot! 😊", sender: "bot" },
      ]);
      setBotTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chatbot Button */}
      <button className="chatbot-widget" onClick={toggleChatbox} aria-label="Open chatbot">
        <img src={bot} alt="Chatbot" />
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header" onClick={toggleChatbox} role="button" tabIndex={0}>
            ClickSmart Chatbot
            <button className="chatbox-close" aria-label="Close chatbot">✖</button>
          </div>

          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
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
