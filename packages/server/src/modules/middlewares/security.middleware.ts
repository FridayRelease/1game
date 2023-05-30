import type { Express, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import ms from 'ms';
import { isDev } from '../../constants/env';

const securityMiddleware = async (
  app: Express,
  { enableNonce = true, enableCSP, hstsMA = '90 days' }: { enableNonce: boolean; enableCSP: boolean; hstsMA?: string }
) => {
  // Don't expose any software information to hackers.
  app.disable('x-powered-by');

  // enable CORS - Cross Origin Resource Sharing
  // allow for sending credentials (auth token) in the headers.
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  if (enableNonce) {
    app.use((_, response, next) => {
      response.locals.nonce = uuidv4();
      next();
    });
  }

  if (enableCSP) {
    app.use(
      helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
          'default-src': ["'self'"],
          'script-src': [
            // Allow scripts hosted from our application.
            "'self'",
            (_: Request, response: Response) => `'nonce-${response.locals.nonce}'`,
            // Required for eval-source-maps (devtool in webpack)
            isDev() ? "'unsafe-eval'" : '',
          ].filter(value => value !== '') as any,
          imgSrc: ["'self'", 'https: data: blob:'],
          fontSrc: ["'self'", 'data:', 'fonts.gstatic.com'],
          // Note: Setting this to stricter than * breaks the service worker. :(
          // I can't figure out how to get around this, so if you know of a safer
          // implementation that is kinder to service workers please let me know.
          // ["'self'", 'ws:'],
          connectSrc: ['*'],
          childSrc: ["'self'"],
        },
      })
    );
  }

  // The xssFilter middleware sets the X-XSS-Protection header to prevent
  // reflected XSS attacks.
  // @see https://helmetjs.github.io/docs/xss-filter/
  app.use(helmet.xssFilter());

  // Sets the X-Download-Options to prevent Internet Explorer from executing
  // downloads in your site’s context.
  // @see https://helmetjs.github.io/docs/ienoopen/
  app.use(helmet.ieNoOpen());

  // Strict-Transport-Security: https://github.com/helmetjs/hsts
  app.use(
    helmet.hsts({
      maxAge: ms(hstsMA) / 1000,
      includeSubDomains: true,
      preload: true,
    })
  );
};

export default securityMiddleware;
