import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import { motion, AnimatePresence } from 'framer-motion';
import uploadImage from '../assets/uploadimg.png';
import './Upload.css'; // We'll create this new CSS file

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Upload = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [activeTab, setActiveTab] = useState('file');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { setAnalysisResult, setIsLoading, setError, isLoading, error } = useDocuments();

    const handleFileChange = (selectedFile) => {
        if (selectedFile) {
            // You can add file type/size validation here if needed
            setFile(selectedFile);
        }
    };

    const handleDragEvents = (e, dragging) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(dragging);
    };

    const handleDrop = (e) => {
        handleDragEvents(e, false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setAnalysisResult(null);

        try {
            let response;
            if (activeTab === 'file' && file) {
                const formData = new FormData();
                formData.append('file', file);
                response = await axios.post(`${API_URL}/api/analyze`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else if (activeTab === 'text' && text.trim()) {
                response = await axios.post(`${API_URL}/api/analyze`, { text });
            } else {
                setError('Please provide a file or some text to analyze.');
                setIsLoading(false);
                return;
            }
            setAnalysisResult(response.data);
            navigate('/dashboard'); // Assuming you have a results/dashboard page
        } catch (err) {
            setError(err.response?.data?.error || 'An unknown error occurred during analysis.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-7">
                    <div className="upload-container">
                        <h2 className="upload-title">Analyze a New Document</h2>
                        <p className="upload-subtitle">Upload a PDF/Image or paste text to instantly reveal key insights and potential risks.</p>

                        {/* Custom Tab Switcher */}
                        <div className="tab-switcher">
                            {['file', 'text'].map(tab => (
                                <button
                                    key={tab}
                                    className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab === 'file' ? 'Upload File' : 'Paste Text'}
                                    {activeTab === tab && <motion.div className="tab-active-indicator" layoutId="activeTabIndicator" />}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {activeTab === 'file' ? (
                                        <div
                                            className={`dropzone ${isDragging ? 'dragging-over' : ''}`}
                                            onClick={() => fileInputRef.current.click()}
                                            onDragEnter={(e) => handleDragEvents(e, true)}
                                            onDragLeave={(e) => handleDragEvents(e, false)}
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={handleDrop}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={(e) => handleFileChange(e.target.files[0])}
                                                accept=".pdf,.png,.jpg,.jpeg"
                                                style={{ display: 'none' }}
                                            />
                                            {file ? (
                                                <div className="file-preview">
                                                    <span className="file-icon">📄</span>
                                                    <span className="file-name">{file.name}</span>
                                                    <button type="button" className="remove-file-btn" onClick={(e) => { e.stopPropagation(); setFile(null); }}>&times;</button>
                                                </div>
                                            ) : (
                                                <div className="dropzone-prompt">
                                                    <span className="upload-icon">☁️</span>
                                                    <p><b>Drag & drop your file here</b></p>
                                                    <p className="small-text">or click to browse (PDF, PNG, JPG)</p>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <textarea
                                            className="text-input-area"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Paste your document text here..."
                                            rows="10"
                                        />
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            <button type="submit" className="btn btn-custom-primary w-100 mt-4" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <span className="spinner"></span> Analyzing...
                                    </>
                                ) : 'Analyze Now'}
                            </button>
                        </form>
                        {error && <div className="alert alert-custom-error mt-3">{error}</div>}
                    </div>
                </div>
                {/* <div className="col-lg-5 text-center d-none d-lg-block">
                    <motion.img 
                        src={uploadImage} 
                        alt="Upload Illustration" 
                        className="img-fluid"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default Upload;