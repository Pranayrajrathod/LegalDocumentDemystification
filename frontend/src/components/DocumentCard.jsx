export default function DocumentCard({ title, description }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title text-primary">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
}
