import express from 'express';
import type { Express } from 'express';
import { commentCreate, commentGet, commentUpdate, commentDelete, commentRead } from '../controllers/comment';
import { v1 } from '../constants/api';

const commentRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${v1}/comments`, [commentCreate]);
  app.get(`${v1}/comments/:id`, [commentRead]);
  app.get(`${v1}/comments/topic/:topic_id`, [commentGet]);
  app.put(`${v1}/comments/:id`, [commentUpdate]);
  app.delete(`${v1}/comments/:id`, [commentDelete]);
};

export default commentRoutes;
