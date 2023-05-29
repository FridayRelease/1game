import express from 'express';
import type { Express } from 'express';
import { topicCreate, topicRead, topicGet, topicUpdate, topicDelete } from '../controllers/topic';
import { PREFIX } from '../config/contants';

const topicRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${PREFIX}/topics`, [topicCreate]);
  app.get(`${PREFIX}/topics`, [topicGet]);
  app.get(`${PREFIX}/topics/:id`, [topicRead]);
  app.put(`${PREFIX}/topics/:id`, [topicUpdate]);
  app.delete(`${PREFIX}/topics/:id`, [topicDelete]);
};

export default topicRoutes;
