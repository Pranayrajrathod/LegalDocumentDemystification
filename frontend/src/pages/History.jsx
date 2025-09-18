import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch history from backend
    fetch("http://localhost:5000/history")
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading history...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="fw-bold mb-4 text-center">History</h1>

      {history.length === 0 ? (
        <div className="text-center">
          <div className="alert alert-warning" role="alert">
            No history found. You haven’t uploaded any documents yet.
          </div>
          <Link to="/upload" className="btn btn-primary">
            Upload a Document
          </Link>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Filename</th>
                <th>Summary</th>
                <th>Red Flags</th>
              </tr>
            </thead>
            <tbody>
              {history.map((doc, idx) => (
                <tr key={idx}>
                  <td>{doc.filename}</td>
                  <td>{doc.summary}</td>
                  <td>
                    <ul className="mb-0">
                      {doc.red_flags.map((flag, i) => (
                        <li key={i}>{flag}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
