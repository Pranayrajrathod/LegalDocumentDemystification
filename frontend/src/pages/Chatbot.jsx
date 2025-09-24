// src/pages/Chatbot.jsx

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatbotWindowCard from '../components/ChatbotWindowCard';
import './Chatbot.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm the AI Assistant for the TOS Analyzer." },
    { sender: 'bot', text: "After you analyze a document, you can ask me questions about it right here." },
    { sender: 'bot', text: "For example, try asking 'What are the risks?' or 'Give me a summary'." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/chatbot`, { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = { sender: 'bot', text: 'Sorry, I encountered an error and could not get a response.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-page-container">
      <h2 className="page-title">Chat with the AI Assistant</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <ChatbotWindowCard
            messages={messages}
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;