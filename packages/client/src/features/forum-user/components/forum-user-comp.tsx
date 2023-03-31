import './forum-user-comp.scss';
import { chatMessage } from '../../../mock/mock-data-chat';

function ForumUserComp(mess: chatMessage) {
  const { message, user, data } = mess;

  return (
    <div className="forum-user-comp">
      <div className="forum-info row">
        <div className="forum-user">{user}</div>
        <div className="forum-data">{data}</div>
      </div>
      <div className="forum-message">{message}</div>
    </div>
  );
}

export default ForumUserComp;
