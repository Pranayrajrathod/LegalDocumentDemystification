import React from 'react';
import anantaLogo from '../assets/ananta.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">&copy; {currentYear} TOS Analyzer. All Rights Reserved.</p>
        <div className="d-flex align-items-center justify-content-center gap-2">
          <span>Developed by Team</span>
          <img src={anantaLogo} alt="Team Ananta" className="team-logo" />
          <strong>Ananta</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;