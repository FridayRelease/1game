import { Router } from 'express';
import { userCreate, userGet, userRead, userUpdate, userDelete } from '../controllers/user';
import { authMiddleware } from '../modules';

const userRoutes = function () {
  const routerUser = Router();

  routerUser.use(authMiddleware);

  routerUser.post('/users', [userCreate]);
  routerUser.get('/users', [userGet]);
  routerUser.get('/users/:id', [userRead]);
  routerUser.put('/users/:id', [userUpdate]);
  routerUser.delete('/users/:id', [userDelete]);

  return routerUser;
};

export default userRoutes;
