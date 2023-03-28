import { IUserLoginRequest } from '@/types/user';
import { auth, IUserDTO } from '@/features/user/user-slice';
import { AppDispatch } from '@/store';
import { NavigateFunction } from 'react-router-dom';

export const login =
  (dispatch: AppDispatch, navigate: NavigateFunction) =>
  (userInfo: IUserLoginRequest) => {
    (async function f() {
      const res1 = await fetch('https://ya-praktikum.tech/api/v2/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
        mode: 'cors', // same-origin, no-cors, cors
        credentials: 'include', // omit, include, same-origin
      });

      console.warn(res1);

      const user = await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // same-origin, no-cors, cors
        credentials: 'include', // omit, include, same-origin
      }).then(res => res.json());

      dispatch(auth(user as IUserDTO));

      if (user) {
        navigate('/', { replace: true });
      }
    })();
  };
