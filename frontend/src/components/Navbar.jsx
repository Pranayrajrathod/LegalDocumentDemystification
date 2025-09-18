import React from 'react';
import { NavLink } from 'react-router-dom';
import reactLogo from '../assets/react.svg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center" to="/">
          <img src={reactLogo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
          TOS Analyzer
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/upload">Analyze</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/history">History</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/chatbot">Chatbot</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;