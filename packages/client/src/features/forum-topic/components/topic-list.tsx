import './topic-comment.scss';

import ForumTopicItem from '@/features/forum/components/forum-topic-item';

import { useSelector } from 'react-redux';
import { ForumSelectors } from '@/store/slices/forum-slice';

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const TopicList = () => {
  const list = useSelector(ForumSelectors.topics);
  return (
    <div className="topic-list column">
      <ul className="leaderboard__data">
        {list.map((data: any, index: number) => (
          <ForumTopicItem key={index} topic={data} />
        ))}
      </ul>
    </div>
  );
};
