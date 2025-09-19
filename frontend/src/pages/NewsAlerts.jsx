// src/pages/NewsAlerts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';

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

  if (isLoading) {
  return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h4 className="mt-2">Loading...</h4>
    </div>
  );
  }
  if (error) return <div className="alert alert-danger"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2 className="mb-4">Latest Fraud & Scam Alerts</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {articles.map((article) => (
          <div key={article.link} className="col">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAlerts;