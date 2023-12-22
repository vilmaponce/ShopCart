import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@mui/material/styles';

const root = document.getElementById('root') || document.createElement('div');
document.body.appendChild(root);

const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const appRoot = createRoot(root);
appRoot.render(app);

