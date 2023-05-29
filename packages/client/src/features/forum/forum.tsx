import './forum.scss';
import {FC, useEffect, useState} from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import ForumTopicList from "@/features/forum/components/forum-topic-list";
import ForumTopic from "@/features/forum-topic/forum-topic";
import {getTopicsAll} from "@/controllers/forum-controller";
import {userFullInfo} from "@/controllers/user-controllers";
import {HeaderUserForum} from "@/features/forum/components/forum-header-user";
import {TitleCreateForum} from "@/features/forum/components/forum-title-create";
/**
 Список чатов форума
 @category page
 */
const Forum: FC = () => {

  return (
    <div className="forum column">
        <HeaderUserForum />
        <TitleCreateForum />
        <ForumTopicList />
    </div>
  );
};

Forum.displayName = 'Forum';

export default withLayoutMain(Forum);
