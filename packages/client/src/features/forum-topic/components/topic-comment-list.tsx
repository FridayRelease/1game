import {FC, useEffect, useState} from "react";
import './topic-comment.scss';
import TopicCommentItem from "@/features/forum-topic/components/topic-comment-item";
import { getCommentsByTopicId} from "@/controllers/forum-comments-controller";
import {ActiveTopicIdSelectors} from "@/store/slices/forum-slice";
import {getActiveTopicId} from "@/controllers/forum-controller";

const TopicCommentList: FC=()=> {
    const [list, setData] = useState<any>([]);

    useEffect(() => {
        const id = getActiveTopicId();
        (async () => {
            const res = await getCommentsByTopicId(id);

            setData(res);
            console.warn(res);
        })();
    }, []);

    return (
        <ul className="comment-list column">
            {list.map(( data : any, index: number) => (
                <TopicCommentItem key={index}  topic_id={data.topic_id} user={data.user} message={data.message} user_id={data.user_id} comment_id={data.comment_id} id={data.id} created_at={data.created_at} comments={data.comments} updated_at={data.updated_at}/>
            ))}
        </ul>
    );
};

export default TopicCommentList;