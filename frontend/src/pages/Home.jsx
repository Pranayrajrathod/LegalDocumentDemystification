import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";

export default function Home() {
  return (
    <div className="container mt-5">
      {/* Welcome Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="mb-4">Take the Guesswork Out of Legal Documents</h1>
            <p >
              Stop scrolling past dense legal documents. Our platform <strong>empowers you</strong> by translating complex legal jargon into simple, clear language you can actually use.
            </p>
            <p>
              Instantly receive a straightforward summary, identify potential red flags, and grasp the key points of any agreement. Know your rights, see the risks, and make informed decisions with confidence.
            </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={home1}
            alt="Legal document awareness"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '350px' }}
          />
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="row align-items-center flex-md-row-reverse">
        <div className="col-md-6">
          <h2 className="mb-4">Real-World Case Studies</h2>
          <p>
            Explore situations where companies used complex legal jargon in 
            their Terms of Service that impacted users significantly. 
            Our goal is to build awareness and empower you to make 
            <strong> informed decisions</strong>.
          </p>
          <p>
            From social media platforms to banking apps, ToS Analyzer helps 
            uncover hidden clauses that could affect your privacy, data rights, 
            or finances.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={home2}
            alt="Case study illustration"
            className="img-fluid rounded shadow"
            style={{ maxWidth: '350px' }}
          />
        </div>
      </div>
    </div>
  );
}
