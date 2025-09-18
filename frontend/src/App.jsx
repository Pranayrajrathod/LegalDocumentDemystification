import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow-1 container my-4">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
