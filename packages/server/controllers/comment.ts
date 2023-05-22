import type { Request, Response } from 'express';
import { Comment } from '../models/comment';

export const commentCreate = async (req: Request, res: Response) => {
  console.log('commentInsert req.body: ', req.body);

  const comment = await Comment.create(req.body);
  console.log('comment.id: ', comment.id);

  res.status(200).send(req.body); // вместо req.body возвращать comment.id
};

/*
export const commentGet = async (req: Request, res: Response) => {
  console.log('commentGet: get all comments');
};

export const commentRead = async (req: Request, res: Response) => {
  console.log('commentRead: get comment by PK');
  console.log('req.params.id: ', req.params.id);
};

export const commentUpdate = async (req: Request, res: Response) => {
  console.log('commentUpdate');
};

export const commentDelete = async (req: Request, res: Response) => {
  console.log('commentDelete');
};
*/
