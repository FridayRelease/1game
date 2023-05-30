import {FC, useEffect, useState} from "react";
import './topic-comment.scss';
import TopicCommentItem from "@/features/forum-topic/components/topic-comment-item";
import { getCommentsByTopicId} from "@/controllers/forum-comments-controller";
import {useSelector} from "react-redux";
import {ForumSelectors} from "@/store/slices/forum-slice";


const TopicCommentList = () => {
    const list = useSelector(ForumSelectors.forum);
    const id = useSelector(ForumSelectors.id);
    //@ts-ignore
    const topicById = list.map(li => li.topic_id===id)

    return (
        <ul className="comment-list column">
            {topicById.map(( data : any, index: number) => (
                <TopicCommentItem key={index} comment={data} />
            ))}
        </ul>
    );
};

export default TopicCommentList;