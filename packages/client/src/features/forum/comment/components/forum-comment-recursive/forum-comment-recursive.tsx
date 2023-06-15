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
import ForumCommentUpdate from '../forum-comment-update';
import './forum-comment-recursive.scss';

type StateModalReply = { [key: number]: boolean };
type StateModalEdit = { [key: number]: boolean };

const ForumCommentRecursive = ({ topic, comments }: { topic: ForumTopicDTO; comments: ForumCommentsDTO }) => {
  const authUser = useSelector(userSelectors.user);
  const dispatch = useDispatch();

  const [isShowReply, setIsShowReply] = useState<StateModalReply>({});
  const setShowReply = (commentId: number) => setIsShowReply({ [commentId]: true });
  const setNotShowReply = (commentId: number) => setIsShowReply({ [commentId]: false });

  const [isShowEdit, setIsShowEdit] = useState<StateModalEdit>({});
  const setShowEdit = (commentId: number) => setIsShowEdit({ [commentId]: true });
  const setNotShowEdit = (commentId: number) => setIsShowEdit({ [commentId]: false });

  const handleRemoveComment = (commentId: number, topicId: number) => {
    dispatch(forumCommentActions.delete({ id: commentId, topic_id: topicId }));
  };

  return (
    <div className="forum-comment-recursive">
      {comments.map(comment => {
        return (
          <div className="forum-comment-recursive__message-wrapper" key={comment.id}>
            <div className="forum-comment-recursive__message-data">
              <div className="forum-comment-recursive__author">
                {authUser.info!.id === comment.user_id ? `(я) ${comment.user.first_name}` : comment.user.first_name}
              </div>
              <div className="forum-comment-recursive__date">{comment.updated_at}</div>
              <div className="forum-comment-recursive__message">{comment.message}</div>
            </div>
            <div className="forum-comment-recursive__actions">
              <Button
                type="button"
                view="secondary"
                size="small"
                className={cn('forum-topic-item__button', 'button__change')}
                onClick={() => setShowReply(comment.id)}>
                ответить
              </Button>

              <Modal handleClose={() => setNotShowReply(comment.id)} isShow={isShowReply[comment.id]}>
                <ForumCommentCreate topic={topic} comment={comment} />
              </Modal>

              {authUser.info!.id === comment.user_id ? (
                <>
                  <Button
                    type="button"
                    view="secondary"
                    size="small"
                    className={cn('forum-topic-item__button', 'button__change')}
                    onClick={() => setShowEdit(comment.id)}>
                    изменить
                  </Button>

                  <Modal handleClose={() => setNotShowEdit(comment.id)} isShow={isShowEdit[comment.id]}>
                    <ForumCommentUpdate comment={comment} />
                  </Modal>

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
