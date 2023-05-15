import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './app';

export function render(url: string) {
  const initialStore = store.getState();

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  return [appHtml, initialStore];
}
