// src/components/NewsCard.jsx

import React from 'react';
import './NewsCard.css';

const NewsCard = ({ article }) => {
  // A simple helper to format the date if it exists
  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-card">
      <div className="card-content">
        <h5 className="news-title">{article.title || 'Untitled Article'}</h5>
        <p className="news-summary">{article.summary || 'No summary available.'}</p>
        <div className="news-footer">
          <span className="news-source">{article.source || 'Unknown Source'}</span>
          {formattedDate && <span className="news-date">{formattedDate}</span>}
        </div>
      </div>
    </a>
  );
};

export default NewsCard;