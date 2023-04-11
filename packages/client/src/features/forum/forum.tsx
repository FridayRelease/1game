import './forum.scss';
import ForumComp from './components/forum-comp';
import ButtonNew from '../../components/button-new/button-new';
import { Messages, currentUser } from '../../mock/mock-data-forum';
import foto from '../../mock/currentUser.jpg';
import { ReactComponent as PlusInRing } from '@/assets/images/icons/create.svg';
import { FC } from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
/**
 Список чатов форума
 @category page
 */
const Forum: FC = () => {
  const listItems = Messages.map((message, index) => (
    <ForumComp
      key={index}
      chatId={message.chatId}
      message={message.message}
      user={message.user}
      quantity={message.quantity}
      data={message.data}
    />
  )); //onClick={setItem(message.chatId)}

  function createChat() {
    console.log('Функция CreateChat будет реализована, когда будет API');
    alert('Функция CreateChat будет реализована, когда будет API');
  }

  const children = (
    <div className="forum-create-module">
      <PlusInRing className="ring" fill="var(--base-bg-white)" />
      <label>Создать</label>{' '}
    </div>
  );

  return (
    <div className="forum column">
      <div className="forum-current-user row ">
        <div className="current-user-img">
          <img className="current-user-foto" src={foto} alt="Пользователь" />{' '}
        </div>
        <label className="label-user">{currentUser}</label>
      </div>
      <div className="forum-title-create row ">
        <div className="forum-title left">
          <label className="red">Ф</label>
          <label className="white">ОРУМ</label>
        </div>
        <ButtonNew className="forum-button right" children={children} onClick={createChat} />
      </div>
      <div className="forum-messages row">{listItems}</div>
    </div>
  );
};

Forum.displayName = 'Forum';

export default withLayoutMain(Forum);
