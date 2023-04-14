import { GameApi } from './game';
import { UserApi } from './user';

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/');
const gameApi = new GameApi('/');

export { userApi, gameApi };
