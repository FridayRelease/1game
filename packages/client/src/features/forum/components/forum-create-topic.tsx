import {  FormEvent,  useState } from 'react';
import { ITopicCreate } from '@/api/types';
import { addTopicToServer } from '@/controllers/forum-topic-controller';
import {useSelector } from 'react-redux';
import { userSelectors } from '@/features/authentication';

export const CreateTopic = () => {
  const [text, setText] = useState('');
  const user = useSelector(userSelectors.user);

 const data: ITopicCreate = {
    subject: text,
    user_id: user.info!.id,
  };
   const onSubmit = (e: FormEvent) => {

    e.preventDefault();
    console.log('e.target = ', e.target);

    addToServer(data);
  };

  async function addToServer(data: ITopicCreate) {
    await addTopicToServer(data).then(res => console.log('res = ', res));
  }

  return (
    <div className={'create-topic'}>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="InputName">Создать Тему:</label>
          <input id="InputName" type="text" value={text} onChange={event => setText(event.target.value)} />
        </div>
      </form>
      <button type="submit">Создать</button>
    </div>
  );
};
