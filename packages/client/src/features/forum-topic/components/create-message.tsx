import './topic-comment.scss';
import React, { FormEvent, useState } from 'react';
import { ICommentCreate } from '@/api/types';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/features/authentication';

import { addCommentToServer, getCommentsByTopicId } from '@/controllers/forum-comments-controller';
import { ForumActions, ForumSelectors } from '@/store/slices/forum-slice';

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
interface TypeCreateMessage {
  commentId?: number;

}

export const CreateMessage = ({ commentId }: TypeCreateMessage) => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const user = useSelector(userSelectors.user);
  const data: ICommentCreate = {
    message: text,
    user_id: user.info!.id,
    comment_id: commentId,
    topic_id: useSelector(ForumSelectors.topicId)
  };

  const topicId = useSelector(ForumSelectors.topicId);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addCommentToServer(data)
      .then(data => getCommentsByTopicId(topicId))// @ts-ignore
      .then(result => dispatch(ForumActions.setCommentsFromServerToStore(result)))
      .then(res => dispatch(ForumActions.setCommentUpdate(true)));
  };

  return (
    <div className={'create-comment'}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor='InputName1'>Написать сообщение:</label>
          <input id='InputName1' type='text' value={text} onChange={event => setText(event.target.value)} />
        </div>
        <button type='submit'>Отправить</button>
      </form>
    </div>
  );
};
