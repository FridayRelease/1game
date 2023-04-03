import './forum-comp.scss';
import { forumMessage } from '../../../mock/mock-data-forum';
import { useNavigate } from 'react-router-dom';
/**
 Компонент форума c последним сообщением
 @category component
 */

function ForumComp(mess: forumMessage) {
  const { chatId, message, user, data, quantity } = mess;
  const navigate = useNavigate();
  function goForum(chatId: string | number) {
    navigate(`/forum/${chatId}`);
  }

  return (
    <div className="forum-comp forum-comp-column" onClick={() => goForum(chatId)}>
      <div className="forum-message">{message}</div>
      <div className="forum-info row">
        <div className="forum-user">{user}</div>
        <div className="forum-data">{data}</div>
        <div className="forum-quantity">{quantity}</div>
      </div>
    </div>
  );
}

export default ForumComp;
