import { initDB } from './src/db';

import dotenv from 'dotenv';
import { startServer } from './src/start-server';

dotenv.config();

initDB()
  .then(() => {
    startServer();
  })
  .catch(err => {
    console.warn(err);
  });
