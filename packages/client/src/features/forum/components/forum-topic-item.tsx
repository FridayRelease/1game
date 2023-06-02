import './forum-comp.scss';
import { useNavigate } from 'react-router-dom';
import { ITopic } from '@/api/types';
import { useDispatch } from 'react-redux';
import { ForumActions } from '@/store/slices/forum-slice';

/**
 Компонент Топика форума c первым сообщением
 @category component
 */
interface TypeTopic {
  topic: ITopic;
}

function ForumTopicItem({ topic }: TypeTopic) {
  //переделаю, когда будут другие данные Users с сервера приходить !!!
  const { id, subject, user_id } = topic;

  const time = topic.updated_at;
  const d = new Date(Date.parse(time!)).toLocaleTimeString().slice(0, -3);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToTopic(id: number) {
    dispatch(ForumActions.setActiveTopicIdToStore(id));
    navigate(`/forum/topic`);
    console.log('topicId = ', id);
  }

  return (
    <div className="forum-comp forum-comp-column" onClick={() => goToTopic(id!)}>
      <div className="forum-message">{subject}</div>
      <div className="forum-info row">
        <div className="forum-user">
          <span>User:{user_id}</span>
        </div>
        <div className="forum-data">{d}</div>
      </div>
    </div>
  );
}

export default ForumTopicItem;
