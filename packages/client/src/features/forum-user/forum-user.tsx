import './forum-user.scss';
import ForumUserComp from './components/forum-user-comp';
import { Chats } from '../../mock/mock-data-chat';
import foto from '../../mock/currentUser.jpg';
import { currentUser } from '../../mock/mock-data-forum';
import { useParams } from 'react-router-dom';
import { FC } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
/**
 Чат одного пользователя
 @category page
 */
const ForumUser: FC = () => {
  const { id } = useParams();
  console.log('userId = ', id);

  const results = Chats.filter(chat => chat.chatId === Number(id));

  const listItems = results.map(res => (
    <ForumUserComp
      key={res.data + res.user}
      chatId={res.chatId}
      id={res.chatId}
      message={res.message}
      user={res.user}
      data={res.data}
    />
  ));

  function onClick() {
    console.log('Функция отправки сообщений будет реализована вместе с API');
    alert('Функция отправки сообщений будет реализована вместе с API');
  }

  return (
    <div className="forum-user-page column">
      <div className="forum-user-current-user row ">
        <div className="current-user-img">
          <img className="current-user-foto" src={foto} alt="Пользователь" />
        </div>
        <label className="label-user">{currentUser}</label>
      </div>
      <div className="forum-user-messages column">{listItems}</div>
      <div className="forum-user-message row">
        <input placeholder="Оставить сообщение" className="forum-user-input" />
        <button className="forum-user-button" onClick={onClick}>
          Отправить
        </button>
      </div>
    </div>
  );
};

ForumUser.displayName = 'Forum';

export default withLayoutMain(ForumUser);
