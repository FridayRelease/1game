import Button from '@/components/button/button';
import Modal from '@/components/modal';
import { ForumUrl } from '@/constant/router';
import ForumCommentCreate from '@/features/forum/comment/components/forum-comment-create';
import ForumCommentRecursive from '@/features/forum/comment/components/forum-comment-recursive';
import { forumCommentActions, forumCommentSelectors } from '@/features/forum/comment/store';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { forumTopicActions, forumTopicSelectors } from '../../store';
import './forum-topic-detailed.scss';

const ForumTopicDetailed = () => {
  const params = useParams();
  const topic_id = Number(params.id);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topic = useSelector(forumTopicSelectors.topic);
  const comments = useSelector(forumCommentSelectors.comments);

  useEffect(() => {
    if (topic_id) {
      dispatch(forumTopicActions.read(topic_id)); // topic - здесь все комменты (всех уровней) для топика
      dispatch(forumCommentActions.comment(topic_id)); // comments - здесь сообщения на 1-ом уровне вложенности от Топика
    } else {
      navigate(ForumUrl);
    }
  }, []);

  const [isShow, setIsShow] = useState(false);
  const setShow = () => setIsShow(true);
  const setNotShow = () => setIsShow(false);

  return (
    <div className="forum-topic-detailed">
      <div className="forum-topic-detailed__header">
        <div className="forum-topic-detailed__info">
          <div className="forum-topic-detailed__author">{topic?.user.first_name}</div>
          <div className="forum-topic-detailed__date">{topic?.updated_at}</div>
        </div>
        <div className="forum-topic-detailed__subject">{topic?.subject}</div>
      </div>

      <hr className="forum-topic-detailed__hr" />

      <div className="forum-topic__button-wrapper">
        <Button type="button" view="primary" className="forum-topic__button" onClick={setShow}>
          добавить комментарий
        </Button>

        <Modal handleClose={setNotShow} isShow={isShow}>
          {topic ? <ForumCommentCreate topic={topic} /> : <></>}
        </Modal>
      </div>

      <hr className="forum-topic-detailed__hr" />

      {topic && comments && comments.length > 0 ? (
        <ForumCommentRecursive topic={topic} comments={comments} />
      ) : (
        <div className="forum-topic-detailed__no-message">no messages</div>
      )}
    </div>
  );
};

ForumTopicDetailed.displayName = 'ForumTopicDetailed';

export default withLayoutMain(ForumTopicDetailed);
