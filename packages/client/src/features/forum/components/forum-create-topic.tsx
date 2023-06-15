import {FormEvent, useState} from 'react';
import {ITopicCreate} from '@/api/types';
import {addTopicToServer, getTopicsAll} from '@/controllers/forum-topic-controller';
import {useDispatch, useSelector} from 'react-redux';
import {userSelectors} from '@/features/authentication';
import {ForumActions, ForumReducer} from "@/store/slices/forum-slice";

export const CreateTopic = () => {
    const dispatch = useDispatch()

    const [text, setText] = useState('');
    const user = useSelector(userSelectors.user);

    const data: ITopicCreate = {
        subject: text,
        user_id: user.info!.id,
    };
    const onSubmit = (e: FormEvent) => {

        e.preventDefault();

        addTopicToServer(data)
            .then(data => getTopicsAll())// @ts-ignore
            .then(result => dispatch(ForumActions.setAllTopicsToStore(result)))
            .then(res => dispatch(ForumActions.setTopicUpdate(true)));

    };

    return (
        <div className={'create-topic'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName">Создать Тему:</label>
                    <input id="InputName" type="text" value={text} onChange={event => setText(event.target.value)}/>
                </div>
            </form>
            <button type="submit">Создать</button>
        </div>
    );
};
