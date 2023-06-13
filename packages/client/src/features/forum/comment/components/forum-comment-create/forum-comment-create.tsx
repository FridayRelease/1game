import './forum-comment-create.scss';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useForm, userSelectors } from '@/features/authentication';
import { errorSelectors } from '@/store/slices/error-slice';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentSchema } from './comment.contents';
import { forumCommentActions } from '../../store';
import { ICommentCreateRequest } from '@/types/forum';
import { ForumTopicDTO, ForumCommentDTO } from '@/api/types';

const ForumCommentCreate = ({ topic, comment = undefined }: { topic: ForumTopicDTO; comment?: ForumCommentDTO }) => {
  console.log('comment: ', comment);

  const user = useSelector(userSelectors.user);
  const { error } = useSelector(errorSelectors.all);
  const dispatch = useDispatch();
  const { values, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    validationSchema: commentSchema,
  });

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const data: ICommentCreateRequest = {
      message: values.message,
      topic_id: topic.id,
      user_id: user.info!.id,
      comment_id: comment ? comment.id : undefined,
    };

    dispatch(forumCommentActions.create(data));
  };

  return (
    <div className="forum-comment-create">
      <div className="forum-comment-create__title">создать комментарий</div>
      <form onChange={onChangeForm} onSubmit={onSubmitForm}>
        <label className="forum-comment-create__label">
          комментарий
          <Input {...getFieldProps('message')} error={getFieldError('message')} onBlur={onBlurInput} />
        </label>
        {!!error.description.length && <p className="forum-comment-create__error">{error.description}</p>}
        <div className="forum-comment-create__button-wrapper">
          <Button type="submit" view="primary" className="forum-comment-create__button">
            создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForumCommentCreate;
