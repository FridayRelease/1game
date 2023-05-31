import { GameApi } from './game';
import { UserApi } from './user';
import { LeaderApi } from '@/api/leader';
import { ForumApi} from "@/api/forum";

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/api/v2/');
const gameApi = new GameApi('/assets/');
const leaderApi = new LeaderApi(import.meta.env.VITE_AUTH_API || '/');

const forumApi = new ForumApi(import.meta.env.VITE_FORUM_API || '/');

export { userApi, gameApi, leaderApi, forumApi };
