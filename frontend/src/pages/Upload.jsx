import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '../context/DocumentContext';
import uploadImage from '../assets/uploadimg.png';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Upload = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('file');
  const navigate = useNavigate();
  const { setAnalysisResult, setIsLoading, setError, isLoading, error } = useDocuments();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear previous errors
    setAnalysisResult(null);

    try {
      let response;
      if (activeTab === 'file' && file) {
        const formData = new FormData();
        formData.append('file', file);
        response = await axios.post(`${API_URL}/api/analyze`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else if (activeTab === 'text' && text) {
        response = await axios.post(`${API_URL}/api/analyze`, { text });
      } else {
        setError('Please select a file or paste some text.');
        setIsLoading(false);
        return;
      }
      setAnalysisResult(response.data);
      navigate('/dashboard');
    } catch (err) {
      // ** THE FIX IS HERE **
      // Display the specific error message from the backend response
      setError(err.response?.data?.error || 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="row align-items-center">
        <div className="col-lg-7">
            <h2>Analyze a New Document</h2>
            <p className="text-muted">Choose to upload a file (PDF/Image) or paste text directly.</p>
            
            <ul className="nav nav-tabs mb-3">
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'file' ? 'active' : ''}`} onClick={() => setActiveTab('file')}>Upload File</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === 'text' ? 'active' : ''}`} onClick={() => setActiveTab('text')}>Paste Text</button>
                </li>
            </ul>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    {activeTab === 'file' ? (
                        <input className="form-control" type="file" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.png,.jpg,.jpeg" />
                    ) : (
                        <textarea className="form-control" value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste your document text here..." rows="10" />
                    )}
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="ms-2">Analyzing...</span>
                        </>
                    ) : 'Analyze Now'}
                </button>
            </form>
            {error && <p className="alert alert-danger mt-3">{error}</p>}
        </div>
        <div className="col-lg-5 text-center d-none d-lg-block">
            <img src={uploadImage} alt="Upload Illustration" className="img-fluid" />
        </div>
    </div>
  );
};

export default Upload;