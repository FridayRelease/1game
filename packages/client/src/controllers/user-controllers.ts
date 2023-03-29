import { userApi } from '@/api';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';

const userFullInfo = async () => {
  const user = await userApi.userInfo();

  return user.data;
};

const signin = async (info: IUserSigninRequest) => {
  const res = await userApi.signin(info);

  if (res.data === 'OK') {
    return res.data;
  }

  throw new Error('Произошла ошибка при авторизации');
};

const signup = async (info: IUserSignupRequest) => {
  const res = await userApi.signup(info);

  if (res.data.id) {
    const user = await userApi.userInfo();

    return user.data;
  }

  throw new Error('Произошла ошибка при регистрации');
};

export { signup, userFullInfo, signin };
