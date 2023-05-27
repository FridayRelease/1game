import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';
import type { RequestWithId } from 'request';
import { errorMessage } from '../utils/messageHelper';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"subject":"First topic","user_id":123}' http://localhost:3001/api/v1/topics
 */
export const topicCreate = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.create(req.body);
    return res.status(201).send(topic.dataValues.id);
  } catch (error) {
    return res.status(500).json(errorMessage(error))
  }
};

export const topicGet = async (_req: Request, res: Response) => {
  try {
    const topics = await Topic.findAll();
    // TODO: сделать пагинацию
    return res.status(200).json(topics)
  }
  catch (error) {
    return res.status(500).json(errorMessage(error))
  }
};

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


export const topicUpdate = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const topicUpdated = await Topic.update(req.body, {
      where: { id }
    });

    if (topicUpdated) {
      const topic = await Topic.findByPk(id);
      return res.status(200).json(topic);
    }

    return res.status(404).json(errorMessage('Topic not found'))
  } catch (error) {
    return res.status(500).json(errorMessage(error))
  }
};

export const topicDelete = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await Topic.destroy({
      where: { id }
    });

    if (topic) {
      return res.status(204).json({ message: 'Topic deleted' })
    }

    return res.status(404).json(errorMessage('Topic not found'))
  } catch (error) {
    return res.status(500).json(errorMessage(error))
  }
};
