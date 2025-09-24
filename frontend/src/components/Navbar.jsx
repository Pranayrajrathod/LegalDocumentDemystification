// src/components/Navbar.jsx

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import anantam from '../assets/ananta.jpg';
import './Navbar.css'; // We will create this CSS file

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const links = [
    { to: "/upload", name: "Analyze" },
    { to: "/history", name: "History" },
    { to: "/chatbot", name: "Chatbot" },
    { to: "/alerts", name: "News Alerts" },
    { to: "/about", name: "About" },
  ];

  return (
    <nav className="app-navbar">
      <div className="container">
        <NavLink className="nav-brand" to="/" onClick={() => setIsNavCollapsed(true)}>
          <img src={anantam} alt="Logo" className="nav-logo" />
          <span>Anantam</span>
        </NavLink>

        <button className="nav-toggler" onClick={handleNavCollapse}>
          <div className={`hamburger ${!isNavCollapsed ? "is-active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>

        <div className={`nav-collapse ${isNavCollapsed ? 'collapsed' : ''}`}>
          <ul className="nav-links">
            {links.map(link => (
              <li key={link.name} className="nav-item">
                <NavLink 
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} 
                  to={link.to}
                  onClick={() => setIsNavCollapsed(true)}
                >
                  {link.name}
                  {/* The animated underline */}
                  {({ isActive }) => isActive && <motion.div className="active-link-indicator" layoutId="activeLink" />}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;