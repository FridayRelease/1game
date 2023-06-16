import express from 'express';
import type { Express } from 'express';
import { reactionCreate, reactionDelete, reactionUpdate } from '../controllers/reaction';
import { v1 } from '../constants/api';

const reactionRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${v1}/reaction`, [reactionCreate]);
  app.put(`${v1}/reaction/:id`, [reactionUpdate]);
  app.delete(`${v1}/reaction`, [reactionDelete]);
};

export default reactionRoutes;
