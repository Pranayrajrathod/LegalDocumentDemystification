import anantam from "../assets/ananta.jpg";

export default function About() {
  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">About Us</h1>
        <p className="text-muted">Demystifying Legal Documents for Everyone</p>
        <img src={anantam} alt="Anantam Logo" className="img-fluid my-3" style={{ maxWidth: '200px' }} />
      </div>

      <div className="row">
        {/* Mission Section */}
        <div className="col-md-6 mb-4">
          <h3 className="text-primary">Our Mission</h3>
          <p>
            ToS Analyzer was created with a simple but powerful goal:
            to help everyday users understand the complex and often confusing
            legal language hidden in Terms of Service, contracts, and other
            digital agreements.
          </p>
          <p>
            We believe that transparency and clarity should not be a privilege
            but a right. By using AI-powered analysis, we bring fairness,
            awareness, and user empowerment to the digital world.
          </p>
        </div>

        {/* Vision Section */}
        <div className="col-md-6 mb-4">
          <h3 className="text-primary">Our Vision</h3>
          <p>
            We envision a future where no one blindly clicks “I Agree”
            without understanding what they are signing up for. Through
            cutting-edge AI and user-friendly tools, ToS Analyzer aims to
            create a digital environment where users feel safe, informed,
            and in control.
          </p>
          <p>
            Beyond Terms of Service, our platform is designed to scale for
            contracts, financial documents, and regulatory paperwork, making
            legal literacy accessible to all.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-5">
        <h3 className="text-primary">Our Core Values</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">⚖️ Transparency in every agreement</li>
          <li className="list-group-item">🤝 Empowerment of digital citizens</li>
          <li className="list-group-item">🔍 Simplifying legal jargon</li>
          <li className="list-group-item">🚀 Innovation through AI</li>
          <li className="list-group-item">🌍 Accessibility for all users</li>
        </ul>
      </div>
    </div>
  );
}
