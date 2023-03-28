import { userApi } from '@/api';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';

const userFullInfo = async () => {
  const user = await userApi.userInfo();

  const avatar = await userApi.userAvatar(user.avatar);
  return { ...user, avatar };
};

const signin = async (info: IUserSigninRequest) => {
  const res = await userApi.signin(info);

  if (res === 'OK') {
    return res;
  }

  throw new Error('Произошла ошибка при авторизации');
};

const signup = async (info: IUserSignupRequest) => {
  const res = await userApi.signup(info);

  if (res.id) {
    const user = await userApi.userInfo();

    const avatar = await userApi.userAvatar(user.avatar);
    return { ...user, avatar };
  }

  throw new Error('Произошла ошибка при регистрации');
};

export { signup, userFullInfo, signin };
