import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"subject":"First topic","user_id":123}' http://localhost:3001/api/v1/topics
 */
export const topicCreate = async (req: Request, res: Response) => {
  const topic = await Topic.create(req.body);
  res.status(200).send(topic.id);
};

/*
export const topicGet = async (req: Request, res: Response) => {
  console.log('topicGet: get all topics');
};
*/

/**
 * Пример запроса
 * curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/topics/5
 */
export const topicRead = async (req: Request, res: Response) => {
  const topic = await Topic.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'display_name', 'email', 'avatar'],
      },
      {
        model: Comment,
        attributes: ['id', 'message', 'user_id', 'topic_id', 'comment_id', 'created_at'],
      },
    ],
  });

  res.send(topic?.toJSON()); //.sendStatus(200);
};

/*
export const topicUpdate = async (req: Request, res: Response) => {
  console.log('topicUpdate');
};

export const topicDelete = async (req: Request, res: Response) => {
  console.log('topicDelete');
};
*/
