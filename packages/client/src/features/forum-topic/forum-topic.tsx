import './forum-topic.scss';
import React from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

import {HeaderSeachLeft} from '@/features/forum-topic/components/header-seach-left';
import {Friends} from '@/features/forum-topic/components/friends-left';
import {TopicListLeft} from '@/features/forum-topic/components/topic-list-left';
import {HeaderUserRight} from '@/features/forum-topic/components/header-user-right';
import {CreateMessage} from '@/features/forum-topic/components/create-message';
import TopicCommentList from '@/features/forum-topic/components/topic-comment-list';
import {CreateTopic} from "@/features/forum/components/forum-create-topic";

/**
 Страница одного Топика с Сообщениями
 @category page
 */
const ForumTopic = () => {
    return (
        <div className="forum-comments-page row">
            <div className="forum-topic-left column width40 border-blue">
                <HeaderSeachLeft/>
                <Friends/>
                <TopicListLeft/>
                <CreateTopic/>
            </div>

            <div className="forum-topic-right column width60 border-blue">
                <HeaderUserRight/>
                <TopicCommentList/>
                <CreateMessage/>
            </div>
        </div>
    );
};

ForumTopic.displayName = 'Forum';

export default withLayoutMain(ForumTopic);
