import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import React from 'react';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routes } from './src/router';

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <Routes>
          {routes.map(({ element, path }) => (
            <Route element={element} path={path} key={path} />
          ))}
        </Routes>
      </StaticRouter>
    </Provider>
  );
}
