import { userApi } from '@/api';
import {
  IUserSigninRequest,
  IUserSignupRequest,
  IUserUpdateDataRequest,
  IUserUpdatePasswordRequest,
} from '@/types/user';
import { LoadingActions } from '@/store/slices/loading-slice';
import { IErrorState, errorActions } from '@/store/slices/error-slice';
import { userActions } from '@/features/authentication';

const request = async (req: () => Promise<void>, error: IErrorState) => {
  LoadingActions.setIsLoading(true);
  errorActions.resetError();

  try {
    await req();
  } catch {
    errorActions.setError(error);
  } finally {
    LoadingActions.setIsLoading(false);
  }
};

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

const updateData = (data: IUserUpdateDataRequest) => {
  const req = async () => {
    const res = await userApi.updateData(data);
    userActions.setUser(res.data);
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить данные еще раз',
  };

  return request(req, error);
};

const updatePassword = async (data: IUserUpdatePasswordRequest) => {
  const req = async () => {
    await userApi.updatePassword(data);
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить пароль еще раз',
  };

  return request(req, error);
};

const updateAvatar = async (file: File) => {
  const req = async () => {
    const res = await userApi.updateAvatar(file);
    userActions.setUser(res.data);
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить аватар еще раз',
  };

  return request(req, error);
};

const { signout } = userActions;

export { signup, userFullInfo, signin, updateData, updatePassword, updateAvatar, signout };
