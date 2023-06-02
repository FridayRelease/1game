import './topic-comment.scss';
import React, { FormEvent, useState} from 'react';
import {ICommentCreate} from '@/api/types';
import { useSelector} from 'react-redux';
import {userSelectors} from '@/features/authentication';

import {addCommentToServer} from '@/controllers/forum-comments-controller';
import {ForumSelectors} from '@/store/slices/forum-slice';

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
interface TypeCreateMessage {
    commentId?: number;
}

export const CreateMessage = ({commentId}: TypeCreateMessage) => {
    const [text, setText] = useState('');
    const user = useSelector(userSelectors.user);
    const data: ICommentCreate = {
        message: text,
        user_id: user.info!.id,
        comment_id: commentId, //useSelector(ForumSelectors.commentId),
        topic_id: useSelector(ForumSelectors.id),
    };
        const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        addToServer(data).then(res => console.log('addToServer result = ', res));

    };

    async function addToServer(data: ICommentCreate) {
        await addCommentToServer(data).then(res => console.log('res = ', res));
    }

    return (
        <div className={'create-comment'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName1">Написать сообщение:</label>
                    <input id="InputName1" type="text" value={text} onChange={event => setText(event.target.value)}/>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};
