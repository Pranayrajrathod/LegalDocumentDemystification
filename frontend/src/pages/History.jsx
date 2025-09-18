import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentCard from '../components/DocumentCard';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const History = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_URL}/history`);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch analysis history.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

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
      <h2 className="mb-4">Analysis History</h2>
      {history.length > 0 ? (
        <div>
          {history.map((doc) => (
            <DocumentCard key={doc._id} document={doc} />
          ))}
        </div>
      ) : (
        <p className="lead text-muted text-center my-5">You have no past analyses.</p>
      )}
    </div>
  );
};

export default History;