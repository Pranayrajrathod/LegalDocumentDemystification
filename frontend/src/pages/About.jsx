// src/pages/About.jsx

import React from 'react';
import { motion } from 'framer-motion';
import anantaLogo from '../assets/ananta.jpg';
import './About.css'; // We will create this CSS file

const About = () => {
  // Animation variants for a staggered fade-in effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="about-page-container">
      <motion.div 
        className="about-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img 
          src={anantaLogo} 
          alt="Team Ananta" 
          className="about-logo" 
          variants={itemVariants}
        />
        <motion.h1 className="page-title" variants={itemVariants}>
          About This Project
        </motion.h1>
        
        <motion.div className="about-content" variants={itemVariants}>
          <p className="lead-text">
            This TOS Analyzer was built by <strong>Team Anantam</strong> to help users
            understand complex legal documents with ease.
          </p>
          <p>
            Using advanced AI models, our application provides quick summaries and highlights
            potential areas of concern, empowering you to make more informed decisions when
            agreeing to terms and conditions.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;