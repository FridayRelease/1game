//import './topic-comment.scss';
import {FC, useEffect, useState} from "react";
import {getTopicsAll} from "@/controllers/forum-controller";
import ForumTopicItem from "@/features/forum/components/forum-topic-item";
import {MockTopics} from "@/mock/mockTopics";

/**
 Компонент Страницы одного Топика с Сообщениями
 @category page
 */
export const TopicList: FC = () => {
    const [list, setData] = useState<any>([]);

    useEffect(() => {

        (async () => {
            const res = await getTopicsAll();

            setData(MockTopics);
            //console.warn(res);
        })();
    }, []);
    return (
        <div className="topic-list column">
            <ul className="leaderboard__data">
                {list.map(( data : any, index: number) => (
                    <ForumTopicItem key={index} topic_id={data.topic_id} user={data.user} subject={data.subject} user_id={data.user_id} comment_id={data.comment_id} id={data.id} created_at={data.created_at} comments={data.comments} updated_at={data.updated_at}/>
                ))}
            </ul>
        </div>
    );
};