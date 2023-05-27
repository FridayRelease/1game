import express from 'express';
import type { Express } from 'express';
import { userCreate, userGet, userRead, userUpdate, userDelete } from '../controllers/user';
import { PREFIX } from '../config/contants';

const userRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${PREFIX}/users`, [userCreate]);
  app.get(`${PREFIX}/users`, [userGet]);
  app.get(`${PREFIX}/users/:id`, [userRead]);
  app.put(`${PREFIX}/users/:id`, [userUpdate]);
  app.delete(`${PREFIX}/users/:id`, [userDelete]);
};

export default userRoutes;
