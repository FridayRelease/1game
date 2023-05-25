import type { NextFunction, Request, Response } from 'express';
import type { ViteDevServer } from 'vite';
import type { Store } from '@reduxjs/toolkit';
import type { Task } from 'redux-saga';
import * as path from 'path';
import * as fs from 'fs';
import { isDev } from '../../constants/env';

interface SagaStore extends Store {
  rootSaga: Task;
  close: () => void;
}

async function ssrMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.url.startsWith('/api')) {
    next();
    return;
  }

  const cookie = req.headers.cookie;
  const vite = req.app.locals.settings.vite as ViteDevServer;

  const distPath = path.dirname(require.resolve('client/dist/client/index.html'));
  const srcPath = path.dirname(require.resolve('client/index.html'));
  const ssrClientPath = require.resolve('client/dist/ssr/entry-ssr.cjs');

  const url = req.originalUrl;

  try {
    let template: string;
    let render: (url: string, cookie: string | undefined) => Promise<[string, SagaStore]>;

    if (!isDev()) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      render = (await import(ssrClientPath)).render;
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
      template = await vite!.transformIndexHtml(url, template);
      render = (await vite!.ssrLoadModule(path.resolve(srcPath, './src/entry-ssr.tsx'))).render;
    }

    const [appHtml, initialState] = await render(url, cookie);

    initialState.rootSaga.toPromise().then(() => {
      const state = initialState.getState();
      console.warn({ state });

      const initialStateHtml = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )}</script>`;
      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace('<!--init-state-->', initialStateHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    });
  } catch (e) {
    if (isDev()) {
      vite!.ssrFixStacktrace(e as Error);
    }
    next(e);
  }
}

export default ssrMiddleware;
