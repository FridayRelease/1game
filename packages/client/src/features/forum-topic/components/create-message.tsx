import './topic-comment.scss';
import React, {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import {ICommentCreate,} from "@/api/types";
import {useDispatch, useSelector} from "react-redux";
import {userSelectors} from "@/features/authentication";
import {addTopicToServer} from "@/controllers/forum-topic-controller";
import {addCommentToServer} from "@/controllers/forum-comments-controller";
import {ForumSelectors} from "@/store/slices/forum-slice";
/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */

export const CreateMessage = () => {
        const [text, setText] = useState('');
        const user = useSelector(userSelectors.user)
        //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        const data:ICommentCreate = {
            message:text,
            user_id:user.info!.id,
            comment_id:useSelector(ForumSelectors.commentId),
            topic_id:useSelector(ForumSelectors.id),
            created_at:today.toLocaleDateString("en-US"),
            updated_at:today.toLocaleDateString("en-US"),

        }
        const dispatch = useDispatch()
        const onSubmit  = (e:FormEvent) =>  {
            e.preventDefault();
            console.log('datas for create new comment = ', data)
            const result = addCommentToServer(data);
            console.log('result of add comment to Server', result)
            //dispatch(ForumActions.setTopicsFromServerToStore(data));
            //
        };

        return(
            <div className={'create-comment'}>
                <form onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="InputName1">Написать сообщение:</label>
                        <input id="InputName1" type="text" defaultValue={'Привет !'} value={text} onChange={event => setText(event.target.value)} />
                    </div>
                    <button type="submit">Отправить</button>
                </form>
            </div>

        );
    }