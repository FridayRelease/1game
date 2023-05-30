import './forum-topic.scss';
import { useParams } from 'react-router-dom';
import React, {FC, useEffect, useState} from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

import TopicCommentList from "@/features/forum-topic/components/topic-comment-list";

import {HeaderSeachLeft} from "@/features/forum-topic/components/header-seach-left";
import {Friends} from "@/features/forum-topic/components/friends-left";
import {TopicList} from "@/features/forum-topic/components/topic-list";
import {HeaderUserRight} from "@/features/forum-topic/components/header-user-right";
import {MessageSenderBottom} from "@/features/forum-topic/components/message-sender-bottom";
import TopicCommentList2 from "@/features/forum-topic/components/topic-comment-list2";
/**
 Страница одного Топика с Сообщениями
 @category page
 */
const ForumTopic: FC = () => {
    const { id } = useParams();

    return (
        <div className="forum-user-page row">
            <div className='forum-topic-left column width40 border-blue'>
                <HeaderSeachLeft />
                <Friends />
                <TopicList />
            </div>

            <div className="forum-topic-right column width60 border-blue">
                <HeaderUserRight />
                <TopicCommentList2 key={id}/>
                <MessageSenderBottom />
            </div>

        </div>
    );
};

ForumTopic.displayName = 'Forum';

export default withLayoutMain(ForumTopic);