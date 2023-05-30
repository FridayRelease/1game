import express from 'express';
import type { Express } from 'express';
import { userCreate, userGet, userRead, userUpdate, userDelete } from '../controllers/user';
import { v1 } from '../constants/api';

const userRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${v1}/users`, [userCreate]);
  app.get(`${v1}/users`, [userGet]);
  app.get(`${v1}/users/:id`, [userRead]);
  app.put(`${v1}/users/:id`, [userUpdate]);
  app.delete(`${v1}/users/:id`, [userDelete]);
};

export default userRoutes;
