import './topic-comment.scss';
import React, {ChangeEvent, ChangeEventHandler, FormEvent, useState} from "react";
import {ICommentCreate, ITopicCreate,} from "@/api/types";
import {useDispatch, useSelector} from "react-redux";
import {userSelectors} from "@/features/authentication";
import {addTopicToServer} from "@/controllers/forum-topic-controller";
import {addCommentToServer, getCommentsById} from "@/controllers/forum-comments-controller";
import {ForumSelectors} from "@/store/slices/forum-slice";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
interface TypeCreateMessage{
    commentId:number|string|undefined
}
export const CreateMessage = ({commentId}:TypeCreateMessage) => {
    const [text, setText] = useState('');
    const user = useSelector(userSelectors.user)
    //const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const data: ICommentCreate = {
        message: text,
        user_id: user.info!.id,
        comment_id: commentId,//useSelector(ForumSelectors.commentId),
        topic_id: useSelector(ForumSelectors.id),
     }
    const dispatch = useDispatch()
    const onSubmit = (e: FormEvent) => {//
        e.preventDefault();
        console.log('datas for create new comment = ', data)
        addToServer(data);
        //@ts-ignore
        getCommentsById(commentId!)
    };

    async function addToServer(data: ICommentCreate) {
        await addCommentToServer(data).then(res => console.log('res = ', res))
    }




    return (
        <div className={'create-comment'}>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="InputName1">Написать сообщение:</label>
                    <input id="InputName1" type="text" value={text} onChange={(event) => setText(event.target.value)}/>
                </div>
                <button type="submit">Отправить</button>
            </form>
        </div>

    );
}