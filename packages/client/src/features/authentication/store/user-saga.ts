import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { userActions } from './user-slice';
import { Effect, takeEvery, put, call, takeLatest } from 'redux-saga/effects';
import { signin, signout, signup, userFullInfo } from '@/controllers/user-controllers';
import { UserResponseInfo } from './types';

function* userInfoSaga({ payload }: Effect<string, string | undefined>) {
  try {
    yield put(LoadingActions.setIsLoading(true));

    console.warn('payload (cookie): ', payload);
    const user: UserResponseInfo = yield call(userFullInfo, payload);

    yield put(userActions.setUser(user));
  } catch (error) {
    yield put(userActions.setUser(null));

    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте авторизоваться еще раз',
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* signinSaga({ payload }: Effect<string, IUserSigninRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(signin, payload);

    const user: UserResponseInfo = yield call(userFullInfo);

    yield put(userActions.setUser(user));
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

function* signupSaga({ payload }: Effect<string, IUserSignupRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    const user: UserResponseInfo = yield call(signup, payload);

    yield put(userActions.setUser(user));
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

function* signoutSaga() {
  try {
    yield call(signout);
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
  }
}

export default function* userSaga() {
  yield takeLatest('user/auth', userInfoSaga);
  yield takeEvery('user/signup', signupSaga);
  yield takeEvery('user/signin', signinSaga);
  yield takeEvery(userActions.signout.type, signoutSaga);
}
