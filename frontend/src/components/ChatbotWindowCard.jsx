import React from 'react';

const ChatbotWindowCard = ({ messages, input, setInput, handleSend, isLoading }) => {
  return (
    <div className="card shadow-sm">
        <div className="card-header">AI Assistant</div>
        <div className="card-body chatbot-messages">
        {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}`}>
            {msg.text}
            </div>
        ))}
        {isLoading && <div className="message-bubble bot">...</div>}
        </div>
        <div className="card-footer">
        <div className="input-group">
            <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the latest document..."
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={isLoading}>Send</button>
        </div>
        </div>
  </div>
  )
}

export default ChatbotWindowCard