import type { Request, Response } from 'express';
import { User } from '../models/user';
import { Comment } from '../models/comment';

/**
 * Пример запроса
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":2,"topic_id":2}' http://localhost:3001/api/v1/comments
 * curl -X POST -H "Content-Type: application/json" -d '{"message":"message 1","user_id":1,"topic_id":2,"comment_id":1}' http://localhost:3001/api/v1/comments
 * message | user_id | topic_id | comment_id
 */
export const commentCreate = async (req: Request, res: Response) => {
  const comment = await Comment.create(req.body);
  res.status(200).send(comment.id);
};

/*
export const commentGet = async (req: Request, res: Response) => {
  console.log('commentGet: get all comments');
};
*/

interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  display_name: string;
  avatar: string;
}

interface IComment {
  id: number;
  message: string;
  user_id: number;
  user: IUser;
  topic_id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
  comments?: IComment[];
}

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
  const user = (await User.findByPk((comment as IComment).user_id))?.toJSON();
  comment.user = user;

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
      const childrenUser = (await User.findByPk((childrenComment as IComment).user_id))?.toJSON();
      childrenComment.user = childrenUser;

      comment.comments.push(await expandSubcomments(childrenComment, childrenComment.id));
    }

    return comment;
  };

  const result = await expandSubcomments(comment, Number(req.params.id));
  res.send(result);
};

/*
export const commentUpdate = async (req: Request, res: Response) => {
  console.log('commentUpdate');
};

export const commentDelete = async (req: Request, res: Response) => {
  console.log('commentDelete');
};
*/
