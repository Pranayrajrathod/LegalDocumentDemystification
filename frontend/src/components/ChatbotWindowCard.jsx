// src/components/ChatbotWindowCard.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatbotWindowCard.css';

const ChatbotWindowCard = ({ messages, input, setInput, handleSend, isLoading, messagesEndRef }) => {

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-window">
      <div className="messages-container">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`message-row ${msg.sender}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
            >
              <div className="avatar">{msg.sender === 'bot' ? '🤖' : '👤'}</div>
              <div className="message-bubble">{msg.text}</div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            className="message-row bot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="avatar">🤖</div>
            <div className="message-bubble typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <form className="input-area" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
        <input
          type="text"
          className="chat-input"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button type="submit" className="send-button" disabled={isLoading || !input.trim()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatbotWindowCard;