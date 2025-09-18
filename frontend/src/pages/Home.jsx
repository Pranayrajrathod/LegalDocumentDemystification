import React from 'react';
import { Link } from 'react-router-dom';
import homeImage1 from '../assets/home1.png';

const Home = () => {
  return (
    <div className="container my-5">
      <div className="row align-items-center">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold text-primary">Demystify Legal Jargon Instantly</h1>
          <p className="lead my-4">
            Upload your Terms of Service, Privacy Policies, or any legal document,
            and get a simple, easy-to-understand summary and potential red flags.
          </p>
          <Link to="/upload" className="btn btn-primary btn-lg">
            Get Started
          </Link>
        </div>
        <div className="col-lg-6 text-center">
          <img src={homeImage1} alt="Document Analysis" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Home;