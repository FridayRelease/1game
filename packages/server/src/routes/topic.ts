import { topicCreate, topicRead, topicGet, topicUpdate, topicDelete, topicReadReactions } from '../controllers/topic';
import { Router } from 'express';
import { authMiddleware } from '../modules';

const userRoutes = function () {
  const routerTopics = Router();

  routerTopics.use(authMiddleware);

  routerTopics.post('/topics', [topicCreate]);
  routerTopics.get('/topics', [topicGet]);
  routerTopics.get('/topics/:id', [topicRead]);
  routerTopics.put('/topics/:id', [topicUpdate]);
  routerTopics.delete('/topics/:id', [topicDelete]);
  routerTopics.delete('/topics/:id/reactions', [topicReadReactions]);

  return routerTopics;
};

export default userRoutes;
