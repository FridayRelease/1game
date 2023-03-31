import { UserApi } from './user';

const userApi = new UserApi(import.meta.env.VITE_AUTH_API || '/');

export { userApi };
