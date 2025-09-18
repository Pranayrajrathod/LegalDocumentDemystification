import React from 'react';

const DocumentCard = ({ document }) => {
  if (!document) return null;

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
        {document.red_flags && document.red_flags.filter(flag => flag).length > 0 ? (
          <ul className="list-group list-group-flush">
            {document.red_flags.map((flag, index) => (
              flag && <li key={index} className="list-group-item list-group-item-warning">⚠️ {flag}</li>
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