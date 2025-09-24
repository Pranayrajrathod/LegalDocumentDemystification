// src/pages/History.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';
import './History.css';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/history`);
        const sortedHistory = response.data.sort((a, b) => {
          const dateA = new Date(a.analyzed_at?.$date || 0);
          const dateB = new Date(b.analyzed_at?.$date || 0);
          return dateB - dateA;
        });
        setHistory(sortedHistory);
      } catch (err) {
        setError('Failed to fetch analysis history. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleCardClick = (docId) => {
    setExpandedId(expandedId === docId ? null : docId);
  };
  
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  if (isLoading) { /* ... (No changes here) ... */ }
  if (error) { /* ... (No changes here) ... */ }

  return (
    <div className="history-page">
      <h2 className="page-title">Analysis History</h2>

      {/* --- FIX: The legend content is now restored --- */}
      <div className="risk-legend">
        <div className="legend-item">
          <span className="legend-dot dot-high"></span> High Risk
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-medium"></span> Medium Risk
        </div>
        <div className="legend-item">
          <span className="legend-dot dot-low"></span> Low Risk
        </div>
      </div>
      {/* --- End of Fix --- */}

      {history.length > 0 ? (
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {history.map((doc) => (
            <motion.div variants={itemVariants} key={doc._id}>
              <DocumentCard
                document={doc}
                isExpanded={expandedId === doc._id}
                onToggle={() => handleCardClick(doc._id)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="status-container">
          <p className="status-text">You have no past analyses.</p>
        </div>
      )}
    </div>
  );
};

export default History;