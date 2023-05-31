import express from 'express';
import type { Express } from 'express';
import {
  userConfigCreate,
  userConfigGet,
  userConfigRead,
  userConfigUpdate,
  userConfigDelete,
} from '../controllers/user-config';
import { v1 } from '../constants/api';

const userConfigRoutes = function (app: Express) {
  app.use(express.json());

  app.post(`${v1}/user-configs`, [userConfigCreate]);
  app.get(`${v1}/user-configs`, [userConfigGet]);
  app.get(`${v1}/user-configs/:id`, [userConfigRead]);
  app.put(`${v1}/user-configs/:id`, [userConfigUpdate]);
  app.delete(`${v1}/user-configs/:id`, [userConfigDelete]);
};

export default userConfigRoutes;
