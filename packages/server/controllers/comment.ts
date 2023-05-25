import type { Request, Response } from 'express';
// import { User } from '../models/user';
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

interface IComment {
  id: number;
  message: string;
  user_id: number;
  topic_id: number;
  comment_id: number;
  created_at: string;
  updated_at: string;
  comments: IComment[] | [];
}

/**
 * Пример запроса
 * curl -X GET -H "Content-Type: application/json" http://localhost:3001/api/v1/comments/7
 */
export const commentRead = async (req: Request, res: Response) => {
  console.log('commentRead: get comment by PK');
  console.log('req.params.id: ', req.params.id);

  /*
  const comment = await Comment.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'display_name', 'email', 'avatar'],
      },
      {
        model: Comment,
        attributes: ['id', 'message', 'user_id', 'topic_id', 'comment_id', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['first_name', 'last_name', 'display_name', 'email', 'avatar'],
          },
          {
            model: Comment,
            attributes: ['id', 'message', 'user_id', 'topic_id', 'comment_id', 'created_at'],
            include: [
              //...
            ]
          },
        ],
      },
    ],
  });
  */

  const comment = await Comment.findByPk(req.params.id); // возвращает null если ничего не находит
  // console.log('comment: ', typeof comment, comment); // возаращает object Comment

  if (!comment) {
    res.send(comment);
    return;
  }
  // console.log('comment.toJSON(): ', typeof comment.toJSON(), comment.toJSON()); // возаращает object {...} - это IComment без comments

  const expandSubcomments = async (comment: IComment, comment_id: number) => {
    console.log(' !!! comment_id: ', comment_id);
    const childrenComment = await Comment.findAll({ where: { comment_id: comment_id } }); // возвращает [] если ничего не находит

    // comment.comments.push(childrenComment)
    if (childrenComment.length === 0) {
      return comment;
    }

    for (let i = 0; i < childrenComment.length; i++) {
      const res = await expandSubcomments(comment, childrenComment[i].id);
      console.log('res: ', res);
      // comment.comments.push(res);
    }

    return comment;
  };

  const result = await expandSubcomments(comment.toJSON(), Number(req.params.id));
  console.log('result: ', typeof result, result);

  res.send(comment);
  // res.send(comment?.toJSON()); //.sendStatus(200);
};

/*
export const commentUpdate = async (req: Request, res: Response) => {
  console.log('commentUpdate');
};

export const commentDelete = async (req: Request, res: Response) => {
  console.log('commentDelete');
};
*/
