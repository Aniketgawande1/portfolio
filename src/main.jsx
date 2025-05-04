import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  try {
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Error rendering the app:", error);
    rootElement.innerHTML = '<div>Error loading the application. Check the console for details.</div>';
  }
} else {
  console.error("Root element not found");
}
