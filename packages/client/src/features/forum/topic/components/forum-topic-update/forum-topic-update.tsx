import './forum-topic-update.scss';
import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useForm } from '@/features/authentication';
import { errorSelectors } from '@/store/slices/error-slice';
import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { topicSchema } from './topic.contents';
import { forumTopicActions } from '../../store';
import { ITopicUpdateRequest } from '@/types/forum';
import { ForumTopicDTO } from '@/api/types';

const ForumTopicUpdate = ({ topic }: { topic: ForumTopicDTO }) => {
  const { error } = useSelector(errorSelectors.all);
  const dispatch = useDispatch();
  const { values, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    validationSchema: topicSchema,
    initValues: { subject: topic.subject },
  });

  const onSubmitForm = async (event: FormEvent) => {
    event.preventDefault();

    const data: ITopicUpdateRequest = { id: topic.id, subject: values.subject };
    dispatch(forumTopicActions.update(data));
  };

  return (
    <div className="forum-topic-update">
      <div className="forum-topic-update__title">изменить топик</div>
      <form onChange={onChangeForm} onSubmit={onSubmitForm}>
        <label className="forum-topic-update__label">
          тема
          <Input {...getFieldProps('subject')} error={getFieldError('subject')} onBlur={onBlurInput} />
        </label>
        {!!error.description.length && <p className="forum-topic-update__error">{error.description}</p>}
        <div className="forum-topic-update__button-wrapper">
          <Button type="submit" view="primary" className="forum-topic-update__button">
            изменить
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ForumTopicUpdate;
