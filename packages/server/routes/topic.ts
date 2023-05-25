import express from 'express';
import type { Express } from 'express';
import { topicCreate, topicRead } from '../controllers/topic';

const topicRoutes = function (app: Express) {
  app.use(express.json());

  app.post('/api/v1/topics', [topicCreate]);
  // app.get('/api/v1/topics', [topicGet]);
  app.get('/api/v1/topics/:id', [topicRead]);
  // app.put('/api/v1/topics/:id', [topicUpdate]);
  // app.delete('/api/v1/topics/:id', [topicDelete]);
};

export default topicRoutes;
