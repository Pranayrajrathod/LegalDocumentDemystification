import React from 'react';
import { useDocuments } from '../context/DocumentContext';
import { Link } from 'react-router-dom';
import DocumentCard from '../components/DocumentCard';

const Dashboard = () => {
  const { analysisResult, isLoading, error } = useDocuments();

  if (isLoading) {
    return <h2 className="text-center my-5">Analyzing your document...</h2>;
  }
  if (error) {
    return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;
  }

  if (!analysisResult) {
    return (
      <div className="text-center my-5">
        <h2>No Analysis Result</h2>
        <p className="lead text-muted">It looks like you haven't analyzed a document yet.</p>
        <Link to="/upload" className="btn btn-primary">Analyze a Document</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Analysis Complete</h2>
      <DocumentCard document={analysisResult} />
    </div>
  );
};

export default Dashboard;