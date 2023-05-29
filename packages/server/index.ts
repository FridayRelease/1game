import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import * as path from 'path';
import { initDB } from './config/db';
import cookieParser from 'cookie-parser';
import topicRoutes from './routes/topic';
import userRoutes from './routes/user';
import commentRoutes from './routes/comment';

dotenv.config();
initDB();

dotenv.config();

import { isDev } from './src/constants/env';
import { ssrMiddleware, proxyMiddleware } from './src/modules';
import { v2 } from './src/constants/api';

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());
  app.disable('x-powered-by');

  // VITE SERVER
  let vite: ViteDevServer | undefined;
  const distPath = path.dirname(require.resolve('client/dist/client/index.html'));
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
  app.use(cors());
  app.use(v2, proxyMiddleware());

  app.use('/assets', express.static(path.resolve(distPath, 'assets')));

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

startServer();
