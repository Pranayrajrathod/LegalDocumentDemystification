import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import homeImage1 from '../assets/home1.png';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// This sub-component for displaying a single news item doesn't need to be changed.
const VerticalNewsCard = ({ article, isFaded = false }) => (
    <div className={`news-stack-item ${isFaded ? 'faded' : ''}`}>
        <h6 className="mb-1">{article?.title || 'Untitled Article'}</h6>
        <p className="mb-0 text-muted small">{article?.summary?.substring(0, 80)}...</p>
    </div>
);

const Home = () => {
  const [latestNews, setLatestNews] = useState([]);
  const [error, setError] = useState('');

  // This data fetching logic remains the same.
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/news?limit=5`);
        if (Array.isArray(response.data)) {
            setLatestNews(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch latest news:", err);
        setError('Could not load news alerts.');
      }
    };
    fetchLatestNews();
  }, []);

  return (
    <div className="container my-5">
      {/* --- TOP HERO SECTION --- */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 fw-bold text-primary">Demystify Legal Jargon Instantly</h1>
          <p className="lead my-4">
            Upload your Terms of Service, Privacy Policies, or any legal document,
            and get a simple, easy-to-understand summary and potential red flags.
          </p>
          <Link to="/upload" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
      </div>

      {/* --- BOTTOM IMAGE & NEWS SECTION --- */}
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center mb-5">
  <h1 className="display-5 fw-bold text-info position-relative d-inline-block">
    Latest News
    <span 
      className="d-block mx-auto mt-2" 
      style={{ 
        width: '60px', 
        height: '4px', 
        background: 'linear-gradient(90deg, #0dcaf0, #6610f2)', 
        borderRadius: '2px',
        animation: 'pulse 1.5s infinite'
      }}
    ></span>
  </h1>
</div>

        {/* This column holds the centered news stack */}
        <div className="col-lg-6">
            {latestNews.length > 0 && (
                <div className="vertical-news-stack card shadow-sm">
                    {latestNews.map((article, index) => (
                        <VerticalNewsCard key={article.link} article={article} isFaded={index > 0} />
                    ))}
                    <div className="p-3">
                        <Link to="/alerts" className="btn btn-secondary w-100">
                            Read Latest News
                        </Link>
                    </div>
                </div>
            )}
            {error && <div className="alert alert-warning mt-3 text-center">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Home;