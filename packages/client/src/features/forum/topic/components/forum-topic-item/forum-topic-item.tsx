import { ForumTopicDTO } from '@/api/types';
import './forum-topic-item.scss';

const ForumTopicItem = ({ topic }: { topic: ForumTopicDTO }) => {
  const { subject, user, created_at } = topic;

  return (
    <li className="forum-topic-item">
      <div className="forum-topic-item__subject">{subject}</div>
      <div className="forum-topic-item__user">{user.first_name}</div>
      <div className="forum-topic-item__date">{created_at}</div>
    </li>
  );
};

export default ForumTopicItem;
