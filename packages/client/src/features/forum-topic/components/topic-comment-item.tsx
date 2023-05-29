import './topic-comment.scss';
import {IComment} from "@/api/types";
import './topic-comment.scss';

/**
 Компонент для отрисовки одного сообщения пользователя
 @category component
 */
interface CommentItemType{
    comment:any
}

function TopicCommentItem({comment}: CommentItemType) {
    console.log('TopicCommentItem data = ', comment)
  //const { message, user, created_at,updated_at } = comment;

    const time = updated_at !== undefined ? updated_at : created_at
    const d = new Date(Date.parse(time!)).toLocaleTimeString().slice(0, -3);
  return (
    <div className="comment border-yellow">
      <div className="forum-info row">
        <div className="forum-user">{user.first_name}</div>
        <div className="forum-data">{d}</div>
      </div>
      <div className="forum-message">{message}</div>
    </div>
  );
}

export default TopicCommentItem;
