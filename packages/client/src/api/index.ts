import { GameApi } from './game';
import { UserApi } from './user';

const userApi = new UserApi('http://localhost:3001/api/v2/');
const gameApi = new GameApi('/');

export { userApi, gameApi };
