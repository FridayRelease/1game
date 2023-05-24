import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import createReduxStore from './store/store';
import { userActions } from './features/authentication';

export function render(url: string) {
  const initialStore = createReduxStore({ test: 'hello' });

  initialStore.dispatch(userActions.auth());

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={initialStore}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  return [appHtml, initialStore];
}
