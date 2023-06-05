import express from 'express';
import path from 'path';

import { isDev } from '../../constants/env';
import { distPath } from '../../constants/path';

const staticMiddleware = () => {
  if (isDev()) {
    return () => undefined;
  }
  return express.static(path.resolve(distPath), {
    setHeaders: res => {
      res.setHeader('Service-Worker-Allowed', '/');
    },
  });
};
export default staticMiddleware;
