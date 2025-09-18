import ChatbotWindow from "../components/ChatbotWindow";

export default function Chatbot() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Chat with ToS Helper</h1>
        <p className="text-muted">
          Ask questions and explore how Terms of Service and other legal documents
          can affect your rights. Our chatbot helps make sense of the fine print.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <ChatbotWindow />
        </div>
      </div>
    </div>
  );
}
