// ============================================================
// main.jsx – React entry point
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        {/* Toast notifications appear in the top-right corner */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            className: 'font-sans text-sm',
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
