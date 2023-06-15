import { IComment } from '@/api/types';
import { CreateMessage } from '@/features/forum-topic/components/create-message';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ForumActions, ForumSelectors } from '@/store/slices/forum-slice';
import { addCommentToServer, deleteComment, getCommentsByTopicId } from '@/controllers/forum-comments-controller';

interface CommentType {
  children: IComment[];
}


export const Comments = ({ children }: CommentType) => {
  const dispatch = useDispatch();
  const space = 10;
  const [show, setShow] = useState(false);

  const onSubmit = (e: FormEvent, id: number) => {
    e.preventDefault();
    deleteComment(id)
      .then(res => dispatch(ForumActions.setCommentUpdate(true)));
  };

  return (
    <div className='comments' style={{ marginLeft: `${space}em` }}>
      {children.map(comment => (
        <div key={comment.id} className='comment border-grey'>
          <span>{comment.message}</span>
          <button className='button-delete' onClick={() => setShow(!show)}>Ответить</button>
          <button className={'button-delete'} onClick={(e) => onSubmit(e, comment.id)}>Удалить</button>
          {comment.comments && <Comments key={comment.message} children={comment.comments} />}
          {show === true ? <CreateMessage commentId={Number(comment.id)} /> : ''}

        </div>
      ))}
    </div>
  );
};
