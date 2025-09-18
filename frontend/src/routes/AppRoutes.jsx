import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import Upload from "../pages/Upload";
import Chatbot from "../pages/Chatbot";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import About from "../pages/About";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Upload Document Page */}
      <Route path="/upload" element={<Upload />} />

      {/* Chatbot Page */}
      <Route path="/chat" element={<Chatbot />} />

      {/* Dashboard Page */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* History Page */}
      <Route path="/history" element={<History />} />

      {/* About Us Page */}
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
