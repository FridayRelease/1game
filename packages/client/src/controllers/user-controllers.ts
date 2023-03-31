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
import { NavigateFunction } from 'react-router-dom';
import { NavigateSagaProps } from '@/features/authentication/store/types';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { ProfileUrl } from '@/constant/router';

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

const updateProfileData = ({
  data,
  dispatch,
  navigate,
}: {
  data: IUserUpdateDataRequest;
  navigate: NavigateFunction;
  dispatch: Dispatch<AnyAction>;
}) => {
  const req = async () => {
    const response = await userApi.updateData(data);

    if (response.status === 200) {
      dispatch(userActions.setUser(response.data));
      navigate(ProfileUrl);
    }
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить данные еще раз',
  };

  return request(req, error);
};

const updatePassword = async ({ data, navigate }: { data: IUserUpdatePasswordRequest; navigate: NavigateFunction }) => {
  const req = async () => {
    const response = await userApi.updatePassword(data);

    if (response.status === 200) {
      navigate(ProfileUrl);
    }
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить пароль еще раз',
  };

  return request(req, error);
};

const updateAvatar = async (file: File, dispatch: Dispatch<AnyAction>) => {
  const req = async () => {
    const res = await userApi.updateAvatar(file);
    dispatch(userActions.setUser(res.data));
  };

  const error = {
    title: 'Что-то пошло не так...',
    description: 'Попробуйте обновить аватар еще раз',
  };

  return request(req, error);
};

const signout = (navigate: NavigateFunction, dispatch: Dispatch<AnyAction>) => {
  dispatch(userActions.signout({ navigate }));
};

export { signup, userFullInfo, signin, updateProfileData, updatePassword, updateAvatar, signout };
