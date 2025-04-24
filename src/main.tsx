
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
  
  // Display error message on screen for better debugging
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.margin = '20px';
  errorDiv.style.backgroundColor = '#ffeeee';
  errorDiv.style.border = '1px solid red';
  errorDiv.style.borderRadius = '5px';
  errorDiv.innerHTML = `<h2>Error loading application</h2><pre>${error instanceof Error ? error.message : 'Unknown error'}</pre>`;
  document.body.appendChild(errorDiv);
}
