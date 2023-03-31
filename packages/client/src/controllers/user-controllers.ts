import { userApi } from '@/api';
import {
  IUserSigninRequest,
  IUserSignupRequest,
  IUserUpdateDataRequest,
  IUserUpdatePasswordRequest,
} from '@/types/user';

const userFullInfo = async () => {
  const user = await userApi.userInfo();

  return user.data;
};

const signin = async (info: IUserSigninRequest) => {
  const { data } = await userApi.signin(info);

  if (data === 'OK') {
    return data;
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

const updateData = async (data: IUserUpdateDataRequest) => {
  const res = await userApi.updateData(data);

  if (res.status === 200) {
    return res.data;
  }

  throw new Error('Произошла ошибка при обновлении данных');
};

const updatePassword = async (data: IUserUpdatePasswordRequest) => {
  return userApi.updatePassword(data);
};

const updateAvatar = async (file: File) => {
  const res = await userApi.updateAvatar(file);

  if (res.status === 200) {
    return res.data;
  }

  throw new Error('Произошла ошибка при обновлении пароля');
};

export { signup, userFullInfo, signin, updateData, updatePassword, updateAvatar };
