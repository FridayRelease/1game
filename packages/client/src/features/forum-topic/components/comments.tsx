import { IComment } from '@/api/types';
import { CreateMessage } from '@/features/forum-topic/components/create-message';

interface CommentType {
  children: IComment[];
}

export const Comments = ({ children }: CommentType) => {
  const space = 10;

  return (
    <div className="comments border-red" style={{ marginLeft: `${space}em` }}>
      {children.map(comment => (
        <div key={comment.id} className="comment border-yellow">
          <span>{comment.message}</span>
          {comment.comments && <Comments key={comment.message} children={comment.comments} />}
          <CreateMessage commentId={Number(comment.id)} />
        </div>
      ))}
    </div>
  );
};
