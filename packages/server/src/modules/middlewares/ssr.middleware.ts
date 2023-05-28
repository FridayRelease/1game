import type { NextFunction, Request, Response } from 'express';
import type { ViteDevServer } from 'vite';
import * as path from 'path';
import * as fs from 'fs';
import { isDev } from '../../constants/env';

interface IResponse {
  error: string;
  redirectLocation: string;
  html: string;
  state: string;
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
    let render: (url: string, callback: (response: IResponse) => void, cookie?: string) => Promise<void>;

    if (!isDev()) {
      template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
      render = (await import(ssrClientPath)).render;
    } else {
      template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
      template = await vite!.transformIndexHtml(url, template);
      render = (await vite!.ssrLoadModule(path.resolve(srcPath, './src/entry-ssr.tsx'))).render;
    }

    render(
      req.url,
      (response: IResponse) => {
        if (response.error) {
          res.status(500).send(response.error);
        } else if (response.redirectLocation) {
          res.redirect(302, response.redirectLocation);
        } else {
          const html = template
            .replace(`<!--ssr-outlet-->`, response.html)
            .replace('<!--init-state-->', response.state);

          res.status(200).send(html);
        }
      },
      cookie
    );
  } catch (e) {
    if (isDev()) {
      vite!.ssrFixStacktrace(e as Error);
    }
    next(e);
  }
}

export default ssrMiddleware;
