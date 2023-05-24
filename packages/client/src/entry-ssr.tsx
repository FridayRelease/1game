import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import createReduxStore from './store/store';
import { userActions } from './features/authentication';
import { themeActions } from './store/slices/theme-slice';
import { Themes } from './components/toggle-theme/types';

export function render(url: string) {
  const initialStore = createReduxStore();

  initialStore.dispatch(userActions.auth());

  initialStore.dispatch(themeActions.setTheme(Themes.Light));

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={initialStore}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  );

  return [appHtml, initialStore.getState()];
}
