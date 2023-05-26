import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import createReduxStore from './store/store';

let preloadedState;

if (typeof window !== 'undefined') {
  preloadedState = window.__PRELOADED_STATE__;
  delete window?.__PRELOADED_STATE__;
}

const store = createReduxStore(preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
