import './topic-comment.scss';

import ForumTopicItem from '@/features/forum/components/forum-topic-item';

import {useDispatch, useSelector} from 'react-redux';
import {ForumActions, ForumSelectors} from '@/store/slices/forum-slice';
import {Loading} from "@/features/forum/components/loading";
import {useEffect, useState} from "react";
import {getTopicsAll} from "@/controllers/forum-topic-controller";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const TopicListLeft = () => {

    const dispatch = useDispatch();
    const [list, setList] = useState([]);
    const requireTopicUpdate = useSelector(ForumSelectors.requireTopicUpdate);

    async function fetchData() {
        getTopicsAll()
            //@ts-ignore
            .then(result => (setList(result.rows)));
        dispatch(ForumActions.setTopicUpdate(false));
    }

    useEffect(
        () => {
            fetchData();
        }, [requireTopicUpdate]);

    {
        if (list.length > 0) {
            return (
                <div className="topic-list column">
                    <ul className="">
                        {list.map((data: any, index: number) => (
                            <ForumTopicItem key={index} topic={data}/>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (<Loading/>)
        }

    }
}
