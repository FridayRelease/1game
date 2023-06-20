import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Topic } from '../models/topic';
import { Comment } from '../models/comment';
import type { IQueryPagination, RequestWithId } from 'request';
import { errorMessage } from '../../utils/messageHelper';
import { Op } from 'sequelize';
import { groupingReaction, paginateResponse } from '../../utils/data';
import { Reaction } from '../models/reaction';
import { ReactionType } from '../models/reaction-type';
import { MESSAGE } from '../constants/message';

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
    const { limit = 100, offset = 0, textSearch = '', user_id } = queryParams;
    const config: Record<string, number> = {};
    const newTopicArray = [];

    // if (Number(queryParams.limit) !== 0) {
    //   config.limit = Number(queryParams.limit);
    // }

    if (queryParams.offset) {
      config.offset = offset * limit;
    }

    const { count, rows } = await Topic.findAndCountAll({
      ...config,
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'second_name', 'display_name', 'email', 'avatar'],
        }
      ],
      where: {
        subject: { [Op.like]: '%' + textSearch + '%' },
      },
      order: [
        ['id', 'ASC']
      ]
    });

    for (const row of rows) {
      const obj = {...row.dataValues}
      const reactionRows = await Reaction.findAll({
        include: [{
          model: ReactionType
        }],
        where: {
          topic_id: row.id,
        }
      });

      const reactions = reactionRows
        .filter(item => item.dataValues.reaction_id)
        .map(item => ({ ...item.dataValues, count: Number(item.dataValues.count)}));

      obj.reactions = groupingReaction(reactions, Number(user_id))
      newTopicArray.push(obj)
    }

    return res.status(200).json(paginateResponse(count, newTopicArray, offset, limit));
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
    await Reaction.destroy({
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

export const topicReadReactions = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!id) {
    res.status(500).json(errorMessage(MESSAGE.ID_NOT_PASSED));
  }

  const reaction = await Reaction.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'first_name', 'second_name', 'display_name', 'email', 'avatar'],
      },
      {
        model: ReactionType
      }
    ],
    where: {
      topic_id: id
    }
  });

  const reactions = reaction
    .filter(item => item.dataValues.reaction_id)
    .map(item => ({ ...item.dataValues, count: Number(item.dataValues.count)}));

  const mergeArray = groupingReaction(reactions, Number(user_id));

  return res.status(200).json(mergeArray)
};
