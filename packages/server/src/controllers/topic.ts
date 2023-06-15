import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';
import type { IQueryPagination, RequestWithId } from 'request';
import { errorMessage } from '../../utils/messageHelper';
import { paginateResponse } from '../../utils/data';
import { Op } from 'sequelize';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"subject":"First topic","user_id":123}' http://localhost:3001/api/v1/topics
 */
export const topicCreate = async (req: Request, res: Response) => {
  try {
    const topic = await Topic.create(req.body);
    return res.status(201).json(topic.dataValues);
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

export const topicGet = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query as unknown as IQueryPagination;
    const { limit = 100, offset = 0, textSearch = '' } = queryParams;

    if (Number(queryParams.limit) === 0) {
      const topics = await Topic.findAll({
        where: {
          subject: { [Op.like]: '%' + textSearch + '%' },
        },
      });
      return res.status(200).json(paginateResponse(topics.length, topics, offset, limit));
    }

    const { count, rows } = await Topic.findAndCountAll({
      limit: limit,
      offset: offset * limit,
      include: {
        model: User,
        attributes: ['id', 'first_name', 'second_name', 'display_name', 'email', 'avatar'],
      },
      where: {
        subject: { [Op.like]: '%' + textSearch + '%' },
      },
    });

    return res.status(200).json(paginateResponse(count, rows, offset, limit));
  } catch (error) {
    return res.status(500).json(errorMessage(error));
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
        attributes: ['id', 'first_name', 'second_name', 'display_name', 'email', 'avatar'],
      },
      {
        model: Comment,
        attributes: ['id', 'message', 'user_id', 'topic_id', 'comment_id', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'second_name', 'display_name', 'email', 'avatar'],
          },
        ],
      },
    ],
  });

  res.send(topic?.toJSON()); //.sendStatus(200);
};

export const topicUpdate = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const topicUpdated = await Topic.update(req.body, {
      where: { id },
    });

    if (topicUpdated) {
      const topic = await Topic.findByPk(id);
      return res.status(200).json(topic);
    }

    return res.status(404).json(errorMessage('Topic not found'));
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

export const topicDelete = async (req: Request<RequestWithId>, res: Response) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findByPk(id);

    if (!topic) {
      return res.status(204).json(errorMessage('Topic not found'));
    }

    await Comment.destroy({
      where: {
        topic_id: topic?.id,
      },
    });

    await topic.destroy();
    return res.status(200).json({ message: 'Topic deleted' });
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};
