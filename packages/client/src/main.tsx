import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import registerServiceWorker from '../sw-registration';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (import.meta.env.PROD) {
  registerServiceWorker();
}
