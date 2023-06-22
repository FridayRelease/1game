import { GameApi } from './game';
import { UserApi } from './user';
import { LeaderApi } from '@/api/leader';
import { ForumTopicApi } from './forum-topic';
import { ForumCommentApi } from './forum-comment';
import { OAuth } from './o-auth';

const assetsApi =
  process.env.NODE_ENV === 'development' ? import.meta.env.VITE_DEV_ASSETS_API : import.meta.env.VITE_ASSETS_API;

const userApi = new UserApi(import.meta.env.VITE_BASE_API || '/api/v2/');
const gameApi = new GameApi(assetsApi);
const leaderApi = new LeaderApi(import.meta.env.VITE_BASE_API || '/api/v2/');
const oauthApi = new OAuth(import.meta.env.VITE_BASE_API || '/api/v2/');
const forumTopicAPI = new ForumTopicApi('/api/v1/');
const forumCommentAPI = new ForumCommentApi('/api/v1/');

export { userApi, gameApi, leaderApi, oauthApi, forumTopicAPI, forumCommentAPI };
