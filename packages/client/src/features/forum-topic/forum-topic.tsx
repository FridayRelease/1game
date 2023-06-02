import './forum-topic.scss';
import React from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';

import { HeaderSeachLeft } from '@/features/forum-topic/components/header-seach-left';
import { Friends } from '@/features/forum-topic/components/friends-left';
import { TopicList } from '@/features/forum-topic/components/topic-list';
import { HeaderUserRight } from '@/features/forum-topic/components/header-user-right';
import { CreateMessage } from '@/features/forum-topic/components/create-message';
import TopicCommentList2 from '@/features/forum-topic/components/topic-comment-list2';
/**
 Страница одного Топика с Сообщениями
 @category page
 */
const ForumTopic = () => {
  return (
    <div className="forum-user-page row">
      <div className="forum-topic-left column width40 border-blue">
        <HeaderSeachLeft />
        <Friends />
        <TopicList />
      </div>

      <div className="forum-topic-right column width60 border-blue">
        <HeaderUserRight />
        <TopicCommentList2 />
        <CreateMessage  />
      </div>
    </div>
  );
};

ForumTopic.displayName = 'Forum';

export default withLayoutMain(ForumTopic);
