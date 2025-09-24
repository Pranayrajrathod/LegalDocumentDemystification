// src/pages/NewsAlerts.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';
import './NewsAlerts.css';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const NewsAlerts = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/news`);
        setArticles(response.data);
      } catch (err) {
        setError('Failed to fetch news alerts.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Animation variants for the container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="status-container">
        <div className="loader-spinner"></div>
        <h4 className="status-text">Loading News...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <div className="alert-custom-error">{error}</div>
      </div>
    );
  }

  return (
    <div className="news-alerts-page">
      <h2 className="page-title">Latest Fraud & Scam Alerts</h2>
      <motion.div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {articles.map((article) => (
          <motion.div key={article.link} className="col" variants={itemVariants}>
            <NewsCard article={article} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default NewsAlerts;