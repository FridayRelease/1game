import './topic-comment.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ForumActions, ForumSelectors } from '@/store/slices/forum-slice';
import { Comments } from '@/features/forum-topic/components/comments';

import { useEffect, useState } from 'react';

import {  getCommentsByTopicId } from '@/controllers/forum-comments-controller';

import { Loading } from '@/features/forum/components/loading';

import { NoComments } from '@/features/forum-topic/components/no-comments';
import { arrayToObject } from '@/utils/array-to-object1';

const TopicCommentList = () => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const requireCommentUpdate = useSelector(ForumSelectors.requireCommentUpdate);
  const topicId = useSelector(ForumSelectors.topicId);
  const noComments = useSelector(ForumSelectors.noComments);

  async function fetchData() {

    const response: any = await getCommentsByTopicId(topicId);
    if (response.length > 0) {
      dispatch(ForumActions.setNoComments(false));
      dispatch(ForumActions.setCommentUpdate(false));
      const comments = arrayToObject(response);
      //@ts-ignore
      setList(comments)
    } else {
      dispatch(ForumActions.setNoComments(true));
    }
  }


useEffect(() => {
  fetchData();
}, [topicId, requireCommentUpdate]);

{
  if (noComments) {
    return <NoComments />;
  } else if (list.length > 0) {
    return (
      <ul className='comment-list column'>
        <div>
          <h1 className='topic-list-title'>Сообщения </h1>
          <Comments children={list} />
        </div>
      </ul>
    );
  } else {
    return (<Loading />);
  }

}
}
;

export default TopicCommentList;
