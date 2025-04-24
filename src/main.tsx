
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create root and render with error handling
try {
  const rootElement = document.getElementById("root");
  
  if (!rootElement) {
    throw new Error("Failed to find the root element");
  }
  
  const root = createRoot(rootElement);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log("Application rendered successfully");
} catch (error) {
  console.error("Failed to render application:", error);
}
