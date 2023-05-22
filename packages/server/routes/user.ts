import express from 'express';
import type { Express } from 'express';
import { userCreate } from '../controllers/user';

const userRoutes = function (app: Express) {
  app.use(express.json());

  app.post('/api/v1/users', [userCreate]);
  // app.get('/api/v1/users', [userGet]);
  // app.get('/api/v1/users/:id', [userRead]);
  // app.put('/api/v1/users/:id', [userUpdate]);
  // app.delete('/api/v1/users/:id', [userDelete]);
};

export default userRoutes;
