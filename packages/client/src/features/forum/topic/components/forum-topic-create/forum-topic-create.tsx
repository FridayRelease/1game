import './forum-topic-create.scss';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useForm, userSelectors } from '@/features/authentication';
import { errorSelectors } from '@/store/slices/error-slice';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topicSchema } from './topic.contents';
import { forumTopicActions } from '../../store';
import { ITopicCreateRequest } from '@/types/forum';

const ForumTopicCreate = () => {
  const user = useSelector(userSelectors.user);
  const { error } = useSelector(errorSelectors.all);
  const dispatch = useDispatch();
  const { values, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    validationSchema: topicSchema,
  });

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const data: ITopicCreateRequest = { subject: values.subject, user_id: user.info!.id };
    dispatch(forumTopicActions.create(data));
  };

  return (
    <div className="forum-topic-create">
      <div className="forum-topic-create__title">создать новый топик</div>
      <form onChange={onChangeForm} onSubmit={onSubmitForm}>
        <label className="forum-topic-create__label">
          тема
          <Input {...getFieldProps('subject')} error={getFieldError('subject')} onBlur={onBlurInput} />
        </label>
        {!!error.description.length && <p className="forum-topic-create__error">{error.description}</p>}
        <div className="forum-topic-create__button-wrapper">
          <Button type="submit" view="primary" className="forum-topic-create__button">
            создать
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForumTopicCreate;
