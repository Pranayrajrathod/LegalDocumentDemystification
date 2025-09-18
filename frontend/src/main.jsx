import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Find the container <div> in the HTML
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app into the container
root.render(
  <StrictMode>
    {/* Wrap App with BrowserRouter to enable routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
