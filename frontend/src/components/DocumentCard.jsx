import React from 'react';

const DocumentCard = ({ document }) => {
  if (!document) return null;

  // Helper function to get a color based on the risk factor
  const getRiskColor = (factor) => {
    if (factor >= 0.8) return '#d9534f'; // Dark Red (High Risk)
    if (factor >= 0.5) return '#f0ad4e'; // Orange (Medium Risk)
    if (factor > 0) return '#ffd700';   // Yellow (Low Risk)
    return '#6c757d';                   // Grey (Informational)
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">{document.filename}</h5>
      </div>
      <div className="card-body">
        <h6 className="card-title">Summary</h6>
        <p className="card-text">{document.summary || 'No summary available.'}</p>
        <hr />
        <h6 className="card-title">Potential Red Flags</h6>
        {document.red_flags && document.red_flags.length > 0 ? (
          <ul className="list-group list-group-flush">
            {document.red_flags.map((flag, index) => (
              <li key={index} className="list-group-item d-flex align-items-center">
                <span 
                  className="risk-indicator" 
                  style={{ backgroundColor: getRiskColor(flag.risk_factor) }}
                  title={`Risk Factor: ${flag.risk_factor}`}
                ></span>
                {flag.clause}
              </li>
            ))}
          </ul>
        ) : (
          <p className="card-text">No specific red flags were detected.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;