import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import App from './app';

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
}
