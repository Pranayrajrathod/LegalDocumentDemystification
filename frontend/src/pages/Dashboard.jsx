import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      {/* <h1 className="mb-4 text-center">📊 Dashboard</h1> */}

      {/* Section 1: Popular Legal Documents */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary text-white">
          Popular Legal Documents & Risks
        </div>
        <div className="card-body">
          <h5>1. Twitter Terms of Service</h5>
          <p>
            Twitter can suspend your account anytime, and your data may be used 
            for advertising without compensation.
          </p>
          <ul className="list-group mb-3">
            <li className="list-group-item list-group-item-danger">
              🚩 Twitter may terminate services without notice
            </li>
            <li className="list-group-item list-group-item-danger">
              🚩 You grant Twitter broad license over your content
            </li>
          </ul>

          <h5>2. Banking Loan Agreement</h5>
          <p>
            Loan documents often contain hidden clauses like penalty charges, 
            foreclosure restrictions, and binding arbitration.
          </p>
          <ul className="list-group">
            <li className="list-group-item list-group-item-danger">
              🚩 High prepayment penalties
            </li>
            <li className="list-group-item list-group-item-danger">
              🚩 Mandatory arbitration, limiting legal options
            </li>
          </ul>
        </div>
      </div>

      {/* Section 2: Awareness */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-warning">
          Awareness: Identifying Illegal / Shady Documents
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              ⚠️ Documents with missing signatures or seals.
            </li>
            <li className="list-group-item">
              ⚠️ Agreements that demand advance payments without receipts.
            </li>
            <li className="list-group-item">
              ⚠️ Unclear or deliberately confusing terms and clauses.
            </li>
            <li className="list-group-item">
              ⚠️ No mention of dispute resolution or governing law.
            </li>
          </ul>
        </div>
      </div>

      {/* Section 3: Call-to-Action */}
      <div className="text-center">
        <button
          className="btn btn-success btn-lg"
          onClick={() => navigate("/upload")}
        >
          🔍 Find risks in a document
        </button>
      </div>
    </div>
  );
}
