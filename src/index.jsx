import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjusted to import the main App component
import './index.css'; // Import global CSS styles if needed

// Create the root element for rendering React
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
