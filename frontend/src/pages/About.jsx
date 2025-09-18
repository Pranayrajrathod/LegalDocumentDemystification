import React from 'react';
import anantaLogo from '../assets/ananta.jpg';

const About = () => {
  return (
    <div className="text-center my-5">
      <img src={anantaLogo} alt="Team Ananta" className="img-fluid rounded-circle mb-4 about-logo" />
      <h1 className="display-5">About This Project</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          This TOS Analyzer was built by <strong>Team Ananta</strong> to help users
          understand complex legal documents with ease.
        </p>
        <p>
          Using advanced AI models, our application provides quick summaries and highlights
          potential areas of concern, empowering you to make more informed decisions when
          agreeing to terms and conditions.
        </p>
      </div>
    </div>
  );
};

export default About;