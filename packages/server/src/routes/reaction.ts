import { Router } from 'express';
import { reactionCreate, reactionDelete, reactionUpdate } from '../controllers/reaction';
import { v1 } from '../constants/api';
import { authMiddleware } from '../modules';

const reactionRoutes = function () {
  const routerUser = Router();

  routerUser.use(authMiddleware);

  routerUser.post(`${v1}/reaction`, [reactionCreate]);
  routerUser.put(`${v1}/reaction/:id`, [reactionUpdate]);
  routerUser.delete(`${v1}/reaction`, [reactionDelete]);

  return routerUser;
};

export default reactionRoutes;
