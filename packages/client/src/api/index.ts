import { GameApi } from './game';
import { UserApi } from './user';
import { LeaderApi } from '@/api/leader';

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/api/v2/');
const gameApi = new GameApi('/');
const leaderApi = new LeaderApi(import.meta.env.VITE_AUTH_API || '/');

export { userApi, gameApi, leaderApi };
