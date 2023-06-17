import { Router } from 'express';
import { commentCreate, commentGet, commentUpdate, commentDelete, commentRead } from '../controllers/comment';
import { authMiddleware } from '../modules';

const commentRoutes = function () {
  const routerComment = Router();

  routerComment.use(authMiddleware);

  routerComment.post('/comments', [commentCreate]);
  routerComment.get('/comments/:id', [commentRead]);
  routerComment.get('/comments/topic/:topic_id', [commentGet]);
  routerComment.put('/comments/:id', [commentUpdate]);
  routerComment.delete('/comments/:id', [commentDelete]);
  return routerComment;
};

export default commentRoutes;
