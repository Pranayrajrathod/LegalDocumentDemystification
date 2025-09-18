import { useState } from "react";

export default function ChatbotWindow() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I’m your ToS helper 🤖. Ask me about your uploaded documents." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      // Call backend chatbot API
      const res = await fetch("http://localhost:5000/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
      });

      const data = await res.json();

      // Add bot reply
      setMessages((prev) => [...prev, { from: "bot", text: data.reply || "Sorry, I didn’t get that." }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [...prev, { from: "bot", text: "⚠️ Backend not reachable." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          Chatbot – ToS Awareness
        </div>
        <div
          className="card-body"
          style={{ height: "400px", overflowY: "auto", backgroundColor: "#f8f9fa" }}
        >
          {messages.map((msg, i) => (
            <div key={i} className="mb-2">
              <span
                className={`badge ${msg.from === "bot" ? "bg-info text-dark" : "bg-secondary"}`}
              >
                {msg.from === "bot" ? "Bot" : "You"}
              </span>
              <p className="d-inline-block ms-2">{msg.text}</p>
            </div>
          ))}
          {loading && <p className="text-muted">Bot is typing...</p>}
        </div>
        <div className="card-footer">
          <div className="input-group">
            <textarea
              className="form-control"
              rows="2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
            />
            <button className="btn btn-success" onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
