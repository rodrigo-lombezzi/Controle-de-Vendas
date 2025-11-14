import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';


const rootEl = document.getElementById('root');
if (!rootEl) {
  document.body.innerHTML = '<div style="padding:20px;font-family:system-ui, sans-serif;color:#b91c1c">Missing root element (#root). Check your index.html</div>';
  throw new Error('Missing #root element in index.html');
}

const root = createRoot(rootEl as HTMLElement);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
