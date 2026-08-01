import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SchoolProvider } from './context/SchoolContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>
);