import './forum-topic-list.scss';
import { useDispatch, useSelector } from 'react-redux';
import { forumTopicActions, forumTopicSelectors } from '../../store';
import { useEffect } from 'react';
import ForumTopicItem from '../forum-topic-item';

function ForumTopicList() {
  const dispatch = useDispatch();
  const topics = useSelector(forumTopicSelectors.topics);

  useEffect(() => {
    dispatch(forumTopicActions.topic());
  }, []);

  return (
    <ul className="forum-topic-list">
      {topics && topics.rows.length > 0 ? (
        topics.rows.map(topic => <ForumTopicItem topic={topic} key={topic.id} />)
      ) : (
        <></>
      )}
    </ul>
  );
}

export default ForumTopicList;
