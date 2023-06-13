import './forum-comment-update.scss';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useForm } from '@/features/authentication';
import { errorSelectors } from '@/store/slices/error-slice';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentSchema } from './comment.contents';
import { forumCommentActions } from '../../store';
import { ICommentUpdateRequest } from '@/types/forum';
import { ForumCommentDTO } from '@/api/types';

const ForumCommentUpdate = ({ comment }: { comment: ForumCommentDTO }) => {
  const { error } = useSelector(errorSelectors.all);
  const dispatch = useDispatch();
  const { values, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    validationSchema: commentSchema,
    initValues: { message: comment.message },
  });

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const data: ICommentUpdateRequest = { id: comment.id, message: values.message };
    dispatch(forumCommentActions.update(data));
  };

  return (
    <div className="forum-comment-update">
      <div className="forum-comment-update__title">изменить комментарий</div>
      <form onChange={onChangeForm} onSubmit={onSubmitForm}>
        <label className="forum-comment-update__label">
          комментарий
          <Input {...getFieldProps('message')} error={getFieldError('message')} onBlur={onBlurInput} />
        </label>
        {!!error.description.length && <p className="forum-comment-update__error">{error.description}</p>}
        <div className="forum-comment-update__button-wrapper">
          <Button type="submit" view="primary" className="forum-comment-update__button">
            изменить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForumCommentUpdate;
