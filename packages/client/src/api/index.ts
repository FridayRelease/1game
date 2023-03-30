import { UserApi } from './user';

const userApi = new UserApi(process.env.AUTH_API || '/');

export { userApi };
