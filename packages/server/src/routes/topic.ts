import express from 'express';
import type { Express } from 'express';
import { topicCreate, topicRead, topicGet, topicUpdate, topicDelete, topicReadReactions } from '../controllers/topic';
import { v1 } from '../constants/api';

const topicRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${v1}/topics`, [topicCreate]);
  app.get(`${v1}/topics`, [topicGet]);
  app.get(`${v1}/topics/:id`, [topicRead]);
  app.put(`${v1}/topics/:id`, [topicUpdate]);
  app.delete(`${v1}/topics/:id`, [topicDelete]);
  app.post(`${v1}/topics/:id/reactions`, [topicReadReactions]);
};

export default topicRoutes;
