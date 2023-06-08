import './forum-topic.scss';
import React from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import { useSelector } from 'react-redux';
import { userSelectors } from '@/features/authentication';
import ForumTopicList from './components/forum-topic-list';
import Button from '@/components/button/button';
import Modal from '@/components/modal';
import ForumTopicCreate from './components/forum-topic-create';

const ForumTopic = () => {
  const user = useSelector(userSelectors.user);
  const avatar = `${import.meta.env.VITE_BASE_API}/resources${user.info?.avatar}`;

  const [isShow, setIsShow] = React.useState(false);
  const setShow = () => setIsShow(true);
  const setNotShow = () => setIsShow(false);

  return (
    <div className="forum-topic">
      <div className="forum-topic__user">
        <img
          className="user-avatar"
          src={avatar || ''}
          onError={event => (event.currentTarget.onerror = null)}
          alt="Пользователь"
        />
        <div className="user-name">{user.info?.first_name}</div>
      </div>

      <div className="forum-topic__title">форум</div>

      <div className="forum-topic__button-wrapper">
        <Button type="button" view="primary" className="forum-topic__button" onClick={setShow}>
          добавить топик
        </Button>

        <Modal handleClose={setNotShow} isShow={isShow}>
          <ForumTopicCreate />
        </Modal>
      </div>

      <ForumTopicList />
    </div>
  );
};

ForumTopic.displayName = 'ForumTopic';

export default withLayoutMain(ForumTopic);
