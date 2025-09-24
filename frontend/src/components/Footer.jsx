import React from 'react';
import anantaLogo from '../assets/ananta.jpg'; // Assuming the logo path is correct
import './Footer.css'; // We will create this stylesheet next

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container">
        <p className="mb-1">&copy; {currentYear} TOS Analyzer. All Rights Reserved.</p>
        <div className="team-credit">
          <span>Developed by Team</span>
          <img src={anantaLogo} alt="Team Anantam Logo" className="team-logo" />
          <strong>Anantam</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
