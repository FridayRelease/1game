import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { IOAuthGetCodeRequest, IOAuthRequest, IUserSigninRequest, IUserSignupRequest } from '@/types/user';
import { userActions } from './user-slice';
import { Effect, takeEvery, put, call, takeLatest, cancel } from 'redux-saga/effects';
import { signin, signup, userFullInfo } from '@/controllers/user-controllers';
import { getServiceIDInfo, getServiceInfo } from '@/controllers/oauth-controller';
import { UserResponseInfo, NavigateSagaProps, PropsWithNavigator } from './types';
import { LoginUrl, MainUrl } from '@/constant/router';
import { IOAuthYandexResponse } from '@/api/types';

function* userInfoSaga({ payload }: Effect<string, string | undefined>) {
  try {
    yield put(LoadingActions.setIsLoading(true));

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

function* signinSage({ payload }: Effect<string, IUserSigninRequest>) {
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

function* signupSage({ payload }: Effect<string, PropsWithNavigator<IUserSignupRequest>>) {
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

function* signoutSaga({ payload }: Effect<string, NavigateSagaProps>) {
  yield payload.navigate(LoginUrl);
}

function* oauthYandexGetServiceId({ payload }: Effect<string, PropsWithNavigator<IOAuthGetCodeRequest>>) {
  const { props } = payload;

  yield put(LoadingActions.setIsLoading(true));

  try {
    const obj: IOAuthYandexResponse = yield call(getServiceIDInfo, props.redirect_uri);

    yield put(userActions.oauthYandexGetServiceId(obj?.service_id));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* oauthYandexGetUser({ payload }: Effect<string, PropsWithNavigator<IOAuthRequest>>) {
  const { props } = payload;

  yield put(LoadingActions.setIsLoading(true));

  try {
    const obj: unknown = yield call(getServiceInfo, props);
    console.log(obj);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

export default function* userSaga() {
  yield takeLatest('user/auth', userInfoSaga);
  yield takeEvery('user/signup', signupSage);
  yield takeEvery('user/signin', signinSage);
  yield takeEvery('user/oauthYandexGetServiceId', oauthYandexGetServiceId);
  yield takeEvery('user/oauthYandexGetUser', oauthYandexGetUser);
  yield takeEvery(userActions.signout.type, signoutSaga);
}
