import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import type { IComment } from 'comment';
import { errorMessage } from '../../utils/messageHelper';
import { Op } from 'sequelize';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":2,"topic_id":2}' http://localhost:3001/api/v1/comments
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":1,"topic_id":2,"comment_id":1}' http://localhost:3001/api/v1/comments
 * message | user_id | topic_id | comment_id
 */
export const commentCreate = async (req: Request, res: Response) => {
  try {
    const { comment_id } = req.body;
    const comment = await Comment.create(req.body);

    /** Если у созданного комментария есть родительский коммент,
     * то увеличеваем у нгео счетчик вложенных комментариев */
    if (comment_id) {
      const findParentComment = await Comment.findByPk(comment_id);

      if (!findParentComment) {
        return res.status(404).json(errorMessage(`Комментария с id ${comment_id} не найдено`));
      }

      const updateObj = {
        nested_comment_count: findParentComment?.nested_comment_count + 1,
      };

      await Comment.update(updateObj, {
        where: { id: comment_id },
      });
    }

    return res.status(200).json(comment.dataValues);
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

export const commentGet = async (req: Request<{ topic_id: number }>, res: Response) => {
  try {
    const { topic_id } = req.params;
    const comments = await Comment.findAll({
      where: {
        topic_id,
        comment_id: {
          [Op.not]: null,
        },
      },
    });

    if (topic_id) {
      return res.status(200).json(comments);
    }

    return res.status(200).json({ message: 'error', error: 'topic not found' });
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error });
  }
};

/**
 * Пример запроса
 * curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/comments/7
 */
export const commentRead = async (req: Request, res: Response) => {
  const findComment = await Comment.findByPk(req.params.id, { include: User });
  const comment = findComment?.toJSON();

  if (!comment) {
    res.send('comment is not found');
    return;
  }

  // Получаем все комментарии на комментарии
  const expandSubcomments = async (comment: IComment, comment_id: number) => {
    const childrenComments = await Comment.findAll({ where: { comment_id: comment_id }, include: User });

    if (childrenComments.length === 0) {
      return comment;
    }

    if (!comment.comments) {
      comment.comments = [];
    }

    for (let i = 0; i < childrenComments.length; i++) {
      const childrenComment = childrenComments[i].toJSON();

      comment.comments.push(await expandSubcomments(childrenComment, childrenComment.id));
    }

    return comment;
  };

  const result = await expandSubcomments(comment, Number(req.params.id));
  res.send(result);
};

export const commentUpdate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const commentUpdated = await Comment.update(req.body, {
      where: { id },
    });

    if (commentUpdated) {
      const comment = await Comment.findByPk(id);
      return res.status(200).json(comment);
    }

    return res.status(404).json(errorMessage('Comment not found'));
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};

export const commentDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);

    /** Если у удаленного комментария есть родительский коммент,
     * то уменьшаем у нгео счетчик вложенных комментариев */
    if (comment?.comment_id) {
      const findParentComment = await Comment.findByPk(comment?.comment_id);

      if (!findParentComment) {
        return res.status(404).json(errorMessage(`Комментария с id ${comment?.comment_id} не найдено`));
      }

      const updateObj = {
        nested_comment_count: findParentComment?.nested_comment_count - 1,
      };

      await Comment.update(updateObj, {
        where: { id: comment?.comment_id },
      });
    }

    if (!comment) {
      return res.status(404).json(errorMessage('Comment not found'));
    }

    if (comment.comment_id === null) {
      await Comment.destroy({
        where: {
          comment_id: comment.id,
        },
      });
      await comment.destroy();
    } else {
      await comment.destroy();
    }

    if (comment) {
      return res.status(200).json({ message: 'Comment deleted' });
    }

    return res.status(404).json(errorMessage('Comment not found'));
  } catch (error) {
    return res.status(500).json(errorMessage(error));
  }
};
