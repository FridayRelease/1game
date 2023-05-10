import { GameApi } from './game';
import { UserApi } from './user';
import {LiderApi} from "@/api/lider";

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/');
const gameApi = new GameApi('/');
const liderApi = new LiderApi('/');

export { userApi, gameApi, liderApi };
