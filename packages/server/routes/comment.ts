import express from 'express';
import type { Express } from 'express';
import { commentCreate } from '../controllers/comment';

const commentRoutes = function (app: Express) {
  app.use(express.json());

  app.post('/api/v1/comments', [commentCreate]);
  // app.get('/api/v1/comments', [commentGet]);
  // app.get('/api/v1/comments/:id', [commentRead]);
  // app.put('/api/v1/comments/:id', [commentUpdate]);
  // app.delete('/api/v1/comments/:id', [commentDelete]);
};

export default commentRoutes;
