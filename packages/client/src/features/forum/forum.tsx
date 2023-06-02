import './forum.scss';
import { FC} from 'react';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import ForumTopicList from '@/features/forum/components/forum-topic-list';
import { HeaderUserForum } from '@/features/forum/components/forum-header-user';
import { TitleForum } from '@/features/forum/components/forum-title';
import { CreateTopic } from '@/features/forum/components/forum-create-topic';
/**
 Список чатов форума
 @category page
 */
const Forum: FC = () => {
  return (
    <div className="forum column">
      <HeaderUserForum />
      <TitleForum />
      <ForumTopicList />
      <CreateTopic />
    </div>
  );
};

Forum.displayName = 'Forum';

export default withLayoutMain(Forum);
