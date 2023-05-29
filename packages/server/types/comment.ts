import type { IUser } from 'user';

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

export {
  type IComment
}
