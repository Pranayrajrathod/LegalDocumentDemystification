import { createContext, useState } from "react";

// Create Context
export const DocumentContext = createContext();

// Provider Component
export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  // Add a new document
  const addDocument = (doc) => {
    setDocuments((prev) => [...prev, doc]);
  };

  // Replace entire list (e.g., after fetching from backend)
  const setAllDocuments = (docs) => {
    setDocuments(docs);
  };

  // Clear history (optional helper)
  const clearDocuments = () => {
    setDocuments([]);
  };

  return (
    <DocumentContext.Provider
      value={{ documents, addDocument, setAllDocuments, clearDocuments }}
    >
      {children}
    </DocumentContext.Provider>
  );
}
