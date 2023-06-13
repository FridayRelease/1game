import { ForumCommentsDTO } from '@/api/types';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '@/features/authentication';
import Button from '@/components/button/button';
import Modal from '@/components/modal';
import { cn } from '@/utils/cn';
import { forumCommentActions } from '../../store';
import ForumCommentCreate from '../forum-comment-create';
import { ForumTopicDTO } from '@/api/types';
import { useState } from 'react';
// import ForumCommentUpdate from '../forum-comment-update';
import './forum-comment-recursive.scss';

const ForumCommentRecursive = ({ topic, comments }: { topic: ForumTopicDTO; comments: ForumCommentsDTO }) => {
  const authUser = useSelector(userSelectors.user);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const setShow = () => setIsShow(true);
  const setNotShow = () => setIsShow(false);

  const handleRemoveComment = (commentId: number, topicId: number) => {
    dispatch(forumCommentActions.delete({ id: commentId, topic_id: topicId }));
  };

  return (
    <div className="forum-comment-recursive">
      {comments.map(comment => {
        return (
          <div className="forum-comment-recursive__message-wrapper" key={comment.id}>
            <div className="forum-comment-recursive__message">{comment.message}</div>
            <div className="forum-comment-recursive__actions">
              <Button
                type="button"
                view="secondary"
                size="small"
                className={cn('forum-topic-item__button', 'button__change')}
                onClick={setShow}>
                ответить
              </Button>

              <Modal handleClose={setNotShow} isShow={isShow}>
                <ForumCommentCreate topic={topic} comment={comment} />
              </Modal>

              {authUser.info!.id === comment.user_id ? (
                <>
                  {/* <Button
                    type="button"
                    view="secondary"
                    size="small"
                    className={cn('forum-topic-item__button', 'button__change')}
                    onClick={setShow}>
                    изменить
                  </Button>

                  <Modal handleClose={setNotShow} isShow={isShow}>
                    <ForumCommentUpdate comment={comment} />
                  </Modal> */}

                  <Button
                    type="button"
                    view="secondary"
                    size="small"
                    className={cn('forum-topic-item__button', 'button__remove')}
                    onClick={() => handleRemoveComment(comment.id, comment.topic_id)}>
                    удалить
                  </Button>
                </>
              ) : (
                <></>
              )}
            </div>
            {comment.comments && <ForumCommentRecursive topic={topic} comments={comment.comments} />}
          </div>
        );
      })}
    </div>
  );
};

export default ForumCommentRecursive;
