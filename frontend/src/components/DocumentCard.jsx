// src/components/DocumentCard.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DocumentCard.css';

const getRiskDetails = (riskFactor) => {
  // ... (keep the existing getRiskDetails logic) ...
  if (riskFactor >= 0.8) return 'risk-high';
  if (riskFactor >= 0.5) return 'risk-medium';
  if (riskFactor > 0) return 'risk-low';
  return 'risk-neutral';
};

const DocumentCard = ({ document, isExpanded, onToggle }) => { // NEW: Accept props
  if (!document) return null;

//   const analyzedDate = document.analyzed_at?.$date 
//     ? new Date(document.analyzed_at.$date).toLocaleString() 
//     : 'Date not available';

  return (
    // NEW: The entire card is now clickable
    <motion.div className="document-card" onClick={onToggle} layout>
      <motion.div className="card-header" layout>
        <h3 className="filename">{document.filename || 'Untitled Document'}</h3>
        {/* <p className="timestamp">{analyzedDate}</p> */}
      </motion.div>
      
      {/* NEW: Collapsible content with animation */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="card-collapsible-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="card-section">
              <h4 className="section-title">Summary</h4>
              <p className="summary-text">{document.summary || 'No summary was generated.'}</p>
            </div>
            
            <div className="card-section">
              <h4 className="section-title">Potential Red Flags</h4>
              {document.red_flags && document.red_flags.length > 0 ? (
                <ul className="key-points-list">
                  {document.red_flags.map((flag, index) => {
                    const riskClassName = getRiskDetails(flag.risk_factor);
                    return <li key={index} className={`key-point ${riskClassName}`}>{flag.clause}</li>;
                  })}
                </ul>
              ) : (
                <p className="text-muted">No specific red flags were detected.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentCard;