import { SagaReturnType } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router-dom';
import { userApi } from '@/api';

type UserResponseInfo = SagaReturnType<typeof userApi.userInfo>;

type NavigateSagaProps = {
  navigate: NavigateFunction;
};

type PropsWithNavigator<T> = {
  props: T;
  navigate: NavigateFunction;
};

export {
  type NavigateSagaProps,
  type PropsWithNavigator,
  type UserResponseInfo,
};
