import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { Effect, takeEvery, put, takeLatest } from 'redux-saga/effects';
import { Themes } from '@/components/toggle-theme/types';
import { setLocalStorage } from '@/utils/local-storage';
import { themeActions } from '@/store/slices/theme-slice';
import { DEFAULT_THEME } from '@/constant/default';

function* updateThemeSaga({ payload }: Effect<string, string | undefined>) {
  try {
    const themeKey = Object.keys(Themes)[Object.values(Themes).indexOf(payload as Themes)] as Themes;
    let theme = DEFAULT_THEME;

    if (themeKey) {
      theme = payload as Themes;
    }

    setLocalStorage('theme', JSON.stringify({ value: theme }));
    yield put(themeActions.setTheme(theme));
    globalThis.document.documentElement.dataset.theme = theme;
    // после реализации на бэке апи темы добавить изменения сюда yield call(updateTheme, theme);
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте выбрать тему еще раз',
      })
    );
  }
}

function* initialTheme() {
  yield put(LoadingActions.setIsLoading(true));

  try {
    const theme = DEFAULT_THEME;
    // const theme = yield call(signin, payload);
    yield put(themeActions.setTheme(theme));
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте еще раз.',
      })
    );
  }
}

export default function* themeSaga() {
  yield takeLatest('theme/updateTheme', updateThemeSaga);
  yield takeEvery('theme/initialTheme', initialTheme);
}
