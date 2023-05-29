import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import createReduxStore, { RootState } from './store/store';
import { routes } from './router';
import { matchRoutes } from 'react-router-dom';
import { END } from 'redux-saga';
import { Themes } from './components/toggle-theme/types';
import { userActions } from './features/authentication';
import { themeActions } from './store/slices/theme-slice';

const renderAppToString = (state: RootState, url: string) => {
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={state}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );
};

interface IResponse {
  html?: string;
  error?: string;
  redirectLocation?: string;
  state?: string;
}

const render = (url: string, callback: (response: IResponse) => void, cookie?: string) => {
  const initialStore = createReduxStore();

  initialStore.dispatch(userActions.auth(cookie));

  initialStore.dispatch(themeActions.initialTheme());
  initialStore.dispatch(END);

  const match = matchRoutes(routes, url);
  if (!match) {
    callback({ redirectLocation: '/' });
  } else if (match.length > 0) {
    initialStore.rootSaga
      .toPromise()
      .then(() => {
        const state = initialStore.getState();

        const appHtml = renderAppToString(initialStore, url);

        callback({ state: JSON.stringify(state).replace(/</g, '\\u003c'), html: appHtml });
      })
      .catch(e => {
        callback({ error: e });

        initialStore.close();
      });
  } else {
    callback({ error: 'Unknown error' });
  }
};

export { renderAppToString, render };
