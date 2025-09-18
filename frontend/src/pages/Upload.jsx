import { useState } from "react";
import uploadimg from "../assets/uploadimg.png";
export default function Upload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    setLoading(true);
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to upload or analyze document." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="text-center mb-3">
                <img 
                  src={uploadimg} 
                  alt="Upload" 
                  className="img-fluid" 
                  style={{ maxWidth: "300px" }} 
                />
              </div>
              <h2 className="card-title mb-4 text-center">Upload Document</h2>

              {/* File Upload Input */}
              <div className="mb-3">
                <label className="form-label">Choose a document (PDF)</label>
                <input 
                  type="file" 
                  className="form-control" 
                  onChange={handleFileChange} 
                />
              </div>

              {/* Upload Button */}
              <div className="d-grid">
                <button 
                  className={`btn ${loading ? "btn-secondary" : "btn-primary"}`} 
                  onClick={handleUpload} 
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="text-center mt-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Analyzing...</span>
                  </div>
                  <p className="mt-2">Analyzing document, please wait...</p>
                </div>
              )}

              {/* Response Section */}
              {response && !response.error && (
                <div className="mt-4">
                  <div className="card border-primary shadow-sm">
                    <div className="card-header bg-primary text-white">
                      📄 {response.filename || "Uploaded Document"}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Summary</h5>
                      <p className="card-text">{response.summary}</p>

                      <h5 className="mt-4">🚩 Potential Risks</h5>
                      <ul className="list-group">
                        {response.red_flags && response.red_flags.length > 0 ? (
                          response.red_flags.map((flag, i) => (
                            <li 
                              key={i} 
                              className="list-group-item list-group-item-danger"
                            >
                              {flag}
                            </li>
                          ))
                        ) : (
                          <li className="list-group-item">
                            ✅ No risks identified.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Response */}
              {response && response.error && (
                <div className="alert alert-danger mt-4">
                  {response.error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
