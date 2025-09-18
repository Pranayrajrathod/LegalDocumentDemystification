import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes';
import { DocumentProvider } from './context/DocumentContext';
import './App.css';

function App() {
  return (
    <DocumentProvider>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="container flex-grow-1 my-4">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </DocumentProvider>
  );
}

export default App;