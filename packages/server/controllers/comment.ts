import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Comment } from '../models/comment';
import type { IComment } from 'comment';
import { errorMessage } from '../utils/messageHelper';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":2,"topic_id":2}' http://localhost:3001/api/v1/comments
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":1,"topic_id":2,"comment_id":1}' http://localhost:3001/api/v1/comments
 * message | user_id | topic_id | comment_id
 */
export const commentCreate = async (req: Request, res: Response) => {
  try {
    const comment = await Comment.create(req.body);
    console.log(comment, 'commentcommentcommentcommentcommentcomment')
    return res.status(200).json(comment.dataValues);
  } catch (error) {
    return res.status(500).json({ message: 'error', error: error })
  }
};

export const commentGet = async (req: Request<{ topic_id: number }>, res: Response) => {
  try {
    console.log('commentGet: get all comments');
    const { topic_id } = req.params;
    const comments = await Comment.findAll({
      where: {
        topic_id
      }
    })

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
  const comment = (await Comment.findByPk(req.params.id))?.toJSON();

  if (!comment) {
    res.send('comment is not found');
    return;
  }

  // Добавляем в коммент полную инфу о пользователе (так же в комментрии есть свойство user_id)
  comment.user = (await User.findByPk((comment as IComment).user_id))?.toJSON();

  // Получаем все комментарии на комментарии
  const expandSubcomments = async (comment: IComment, comment_id: number) => {
    const childrenComments = await Comment.findAll({ where: { comment_id: comment_id } });

    if (childrenComments.length === 0) {
      return comment;
    }

    if (!comment.comments) {
      comment.comments = [];
    }

    for (let i = 0; i < childrenComments.length; i++) {
      const childrenComment = childrenComments[i].toJSON();

      // Добавляем в коммент полную инфу о пользователе (так же в комментрии есть свойство user_id)
      childrenComment.user = (await User.findByPk((childrenComment as IComment).user_id))?.toJSON();

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
      where: { id }
    });

    if (commentUpdated) {
      const comment = await Comment.findByPk(id);
      return res.status(200).json(comment);
    }

    return res.status(404).json(errorMessage('Comment not found'))
  } catch (error) {

    return res.status(500).json(errorMessage(error))
  }
};

export const commentDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await Comment.destroy({
      where: { id }
    });

    if (comment) {
      return res.status(204).json({ message: 'Comment deleted' })
    }

    return res.status(404).json(errorMessage('User not found'))
  } catch (error) {
    return res.status(500).json(errorMessage(error))
  }
};
