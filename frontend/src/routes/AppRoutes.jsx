import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Upload from '../pages/Upload';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Chatbot from '../pages/Chatbot';
import About from '../pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/history" element={<History />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;