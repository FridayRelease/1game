import { NavigateFunction } from 'react-router-dom';
import { IUserDTO } from '@/api/types';

type UserResponseInfo = IUserDTO;

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
