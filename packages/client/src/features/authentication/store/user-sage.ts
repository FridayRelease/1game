import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { userActions } from './user-slice';
import { Effect, takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import { signin, signup, userFullInfo } from '@/controllers/user-controllers';
import {
  UserResponseInfo,
  NavigateSagaProps,
  PropsWithNavigator,
} from './types';
import { LoginUrl, MainUrl } from '@/constant/router';

function* userInfoSaga({ payload }: Effect<string, NavigateSagaProps>) {
  const { navigate } = payload;
  try {
    yield put(LoadingActions.setIsLoading(true));

    const user: UserResponseInfo = yield call(userFullInfo);

    yield put(userActions.setUser(user));
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте авторизоваться еще раз',
      })
    );

    navigate(LoginUrl);
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* signinSage({
  payload,
}: Effect<string, PropsWithNavigator<IUserSigninRequest>>) {
  const { props, navigate } = payload;
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(signin, props);

    const user: UserResponseInfo = yield call(userFullInfo);

    yield put(userActions.setUser(user));

    navigate(MainUrl);
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте еще раз.',
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* signupSage({
  payload,
}: Effect<string, PropsWithNavigator<IUserSignupRequest>>) {
  const { props, navigate } = payload;

  yield put(LoadingActions.setIsLoading(true));

  try {
    const user: UserResponseInfo = yield call(signup, props);

    yield put(userActions.setUser(user));

    navigate(MainUrl);
  } catch (error) {
    if (error instanceof Error) {
      yield put(
        errorActions.setError({
          title: error.message,
          description: 'Попробуйте еще раз.',
        })
      );
    } else {
      yield put(
        errorActions.setError({
          title: 'Что-то пошло не так...',
          description: 'Попробуйте еще раз.',
        })
      );
    }
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

export default function* userSaga() {
  yield takeLatest('user/auth', userInfoSaga);
  yield takeEvery('user/signup', signupSage);
  yield takeEvery('user/signin', signinSage);
}
