import './topic-comment.scss';
import {FC, useEffect, useState} from "react";
import {Ring} from "@/features/forum-topic/components/ring";
import {Users} from "@/mock/mockUsers";
import { ForumActions, ForumSelectors } from '../../../store/slices/forum-slice';
import { useSelector, useDispatch } from 'react-redux';


/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const Friends: FC = () => {
    const dispatch = useDispatch();
    const list = useSelector(ForumSelectors.friends);

    useEffect(() => {
        dispatch(ForumActions.getFriends);
    }, []);


    return (
        <div className="friends row ">
            {list.map(( li : any, index: number) => (
                <Ring key={index} avatar={li.avatar} name={li.display_name}/>

            ))}
        </div>
    );
};