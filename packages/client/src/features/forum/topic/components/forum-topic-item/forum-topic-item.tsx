import { ForumTopicDTO } from '@/api/types';
import Button from '@/components/button/button';
import Modal from '@/components/modal';
import { userSelectors } from '@/features/authentication';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { forumTopicActions } from '../../store';
import ForumTopicUpdate from '../forum-topic-update';
import './forum-topic-item.scss';

const ForumTopicItem = ({ topic }: { topic: ForumTopicDTO }) => {
  const { id, subject, user, created_at } = topic;
  const dispatch = useDispatch();
  const authUser = useSelector(userSelectors.user);

  const [isShow, setIsShow] = useState(false);
  const setShow = () => setIsShow(true);
  const setNotShow = () => setIsShow(false);

  const handleRemove = (topicId: number) => {
    dispatch(forumTopicActions.delete(topicId));
  };

  return (
    <li className="forum-topic-item">
      <div className="forum-topic-item__subject">
        <Link to={`/forum/${id}`} className="login-form__registration">
          {subject}
        </Link>
      </div>
      <div className="forum-topic-item__additional">
        <div className="forum-topic-item__action">
          {authUser.info!.id === user.id ? (
            <>
              <Button
                type="button"
                view="secondary"
                size="small"
                className={cn('forum-topic-item__button', 'button__change')}
                onClick={setShow}>
                изменить
              </Button>

              <Modal handleClose={setNotShow} isShow={isShow}>
                <ForumTopicUpdate topic={topic} />
              </Modal>

              <Button
                type="button"
                view="secondary"
                size="small"
                className={cn('forum-topic-item__button', 'button__remove')}
                onClick={() => handleRemove(id)}>
                удалить
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="forum-topic-item__info">
          <div className="forum-topic-item__user">{user.first_name}</div>
          <div className="forum-topic-item__date">{created_at}</div>
        </div>
      </div>
    </li>
  );
};

export default ForumTopicItem;
