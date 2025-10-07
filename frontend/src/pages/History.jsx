import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/history`);
        setHistory(response.data);
        
        // --- THE FIX IS HERE ---
        // If we received data, automatically open the first item in the list.
        if (response.data && response.data.length > 0) {
          setExpandedCardId(response.data[0]._id);
        }
        // --- END FIX ---

      } catch (err) {
        setError('Failed to fetch analysis history.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []); // This effect runs only once when the page loads

  const handleToggle = (docId) => {
    setExpandedCardId(expandedCardId === docId ? null : docId);
  };

  if (isLoading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h4 className="mt-2">Loading History...</h4>
      </div>
    );
  }

  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2 className="mb-4 text-center">Analysis History</h2>
      {history.length > 0 ? (
        <div className="history-list">
          {history.map((doc) => (
            <DocumentCard 
              key={doc._id} 
              document={doc}
              isExpanded={expandedCardId === doc._id}
              onToggle={() => handleToggle(doc._id)}
            />
          ))}
        </div>
      ) : (
        <p className="lead text-muted text-center my-5">You have no past analyses.</p>
      )}
    </div>
  );
};

export default History;