import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import bodyParser from 'body-parser';
import express from 'express';
import * as path from 'path';
import cookieParser from 'cookie-parser';

import { isDev } from './constants/env';
import { ssrMiddleware, proxyMiddleware } from './modules';
import { v2 } from './constants/api';
import commentRoutes from './routes/comment';
import topicRoutes from './routes/topic';
import userRoutes from './routes/user';
import staticMiddleware from './modules/middlewares/static.middleware';
import securityMiddleware from './modules/middlewares/security.middleware';

async function startServer() {
  const app = express();
  app.use(cookieParser());
  securityMiddleware(app, { enableNonce: true, enableCSP: !isDev() });

  // VITE SERVER
  let vite: ViteDevServer | undefined;
  const srcPath = path.dirname(require.resolve('client/index.html'));

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    });

    app.set('vite', vite);
    app.use(vite.middlewares);
  }
  // * MIDDLEWARES
  app.use(v2, proxyMiddleware());
  app.use('/assets', staticMiddleware());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(ssrMiddleware);

  // * ENDPOINTS
  userRoutes(app);
  topicRoutes(app);
  commentRoutes(app);

  const port = Number(process.env.SERVER_PORT) || 3001;

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
}

export { startServer };
