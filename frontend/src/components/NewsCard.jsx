// src/components/NewsCard.jsx
import React from 'react';

const NewsCard = ({ article }) => {
  const formatDate = (dateObj) => {
    if (!dateObj || !dateObj.$date) return 'Date not available';
    return new Date(dateObj.$date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  const summaryText = article?.summary ? article.summary.substring(0, 150) + '...' : 'No summary available.';

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{article?.title || 'Untitled Article'}</h5>
        <p className="card-text text-muted flex-grow-1">{summaryText}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
            <small className="text-muted">{formatDate(article?.published)}</small>
            <a href={article?.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline-primary">
                Read More
            </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;