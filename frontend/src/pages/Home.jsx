import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import homeImage1 from '../assets/home1.png'; // Make sure this path is correct
import './Home.css'; 

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// Sub-component for the animated news ticker item
const NewsTickerCard = ({ article }) => (
    <motion.div
        key={article.link}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="news-ticker-item"
    >
        <h5 className="mb-2 fw-bold">{article?.title || 'Untitled Article'}</h5>
        <p className="mb-0 small">{article?.summary?.substring(0, 120)}...</p>
    </motion.div>
);

const Home = () => {
    const [latestNews, setLatestNews] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLatestNews = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/news?limit=5`);
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setLatestNews(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch latest news:", err);
                setError('Could not load news alerts.');
            }
        };
        fetchLatestNews();
    }, []);

    useEffect(() => {
        if (latestNews.length > 1) {
            const timer = setInterval(() => {
                setCurrentNewsIndex(prevIndex => (prevIndex + 1) % latestNews.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [latestNews]);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    return (
        <div className="container my-5 py-5 home-container">
            {/* --- HERO SECTION --- */}
            <motion.div
                className="row mb-5 pb-5 align-items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="col-lg-7 text-center text-lg-start">
                    <motion.h1 className="display-3 fw-bold gradient-text" variants={itemVariants}>
                        Demystify Legal Jargon Instantly
                    </motion.h1>
                    <motion.p className="lead my-4 text-subtle" variants={itemVariants}>
                        Stop guessing. Upload your Terms of Service or Privacy Policies and get simple summaries with clear red flags in seconds.
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Link to="/upload" className="btn btn-custom-primary btn-lg">
                            Analyze Document Now
                        </Link>
                    </motion.div>
                </div>

                <div className="col-lg-5 d-none d-lg-block text-center">
                   <motion.img 
                        src={homeImage1} 
                        alt="Legal document analysis illustration" 
                        className="img-fluid hero-image"
                        variants={itemVariants}
                    />
                </div>
            </motion.div>

            {/* --- NEWS & ALERTS SECTION --- */}
            <div className="row justify-content-center mt-5">
                <div className="col-12 text-center mb-4">
                    <h2 className="display-5 fw-bold heading-bright">Stay Informed</h2>
                    <p className="section-subtitle">Latest alerts on digital privacy and online scams</p>
                </div>

                <div className="col-lg-8">
                    {error && <div className="alert alert-custom-error">{error}</div>}
                    {latestNews.length > 0 && (
                        <div className="glass-card p-4">
                            <AnimatePresence mode="wait">
                               <NewsTickerCard article={latestNews[currentNewsIndex]} />
                            </AnimatePresence>
                             <div className="mt-4">
                                <Link to="/alerts" className="btn btn-custom-outline w-100">
                                    View All Alerts
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;