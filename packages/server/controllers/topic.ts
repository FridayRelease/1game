import type { Request, Response } from 'express';
import { Topic } from '../models/topic';

export const topicCreate = async (req: Request, res: Response) => {
  console.log('topicInsert req.body: ', req.body);

  const topic = await Topic.create(req.body);
  console.log('topic.id: ', topic.id);

  res.status(200).send(req.body); // вместо req.body возвращать topic.id
};

/*
export const topicGet = async (req: Request, res: Response) => {
  console.log('topicGet: get all topics');
};

export const topicRead = async (req: Request, res: Response) => {
  console.log('topicRead: get topic by PK');
  console.log('req.params.id: ', req.params.id);
};

export const topicUpdate = async (req: Request, res: Response) => {
  console.log('topicUpdate');
};

export const topicDelete = async (req: Request, res: Response) => {
  console.log('topicDelete');
};
*/
