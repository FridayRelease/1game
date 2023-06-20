import { Router } from 'express';
import { reactionCreate, reactionDelete, reactionUpdate } from '../controllers/reaction';
import { authMiddleware } from '../modules';

const reactionRoutes = function () {
  const routerReaction = Router();

  routerReaction.use(authMiddleware);

  routerReaction.post(`/reaction/`, [reactionCreate]);
  routerReaction.put(`/reaction/:id`, [reactionUpdate]);
  routerReaction.delete(`/reaction`, [reactionDelete]);

  return routerReaction;
};

export default reactionRoutes;
