import { GameApi } from './game';
import { UserApi } from './user';
import { LiderApi } from '@/api/lider';
import { ForumApi } from '@/api/forum';

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/');
const gameApi = new GameApi('/');
const liderApi = new LiderApi(import.meta.env.VITE_AUTH_API || '/');
const forumApi = new ForumApi(import.meta.env.VITE_FORUM_API || '/');

export { userApi, gameApi, liderApi, forumApi };
