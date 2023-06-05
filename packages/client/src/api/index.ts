import { GameApi } from './game';
import { UserApi } from './user';
import { LeaderApi } from '@/api/leader';

const assetsApi =
  process.env.NODE_ENV === 'development' ? import.meta.env.VITE_DEV_ASSETS_API : import.meta.env.VITE_BASE_API;

const userApi = new UserApi(import.meta.env.VITE_BASE_API || '/api/v2/');
const gameApi = new GameApi(assetsApi);
const leaderApi = new LeaderApi(import.meta.env.VITE_BASE_API || '/');

export { userApi, gameApi, leaderApi };
