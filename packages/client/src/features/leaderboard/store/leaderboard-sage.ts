import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { leaderboardActions, leaderboardSelectors } from './leaderboard-slice';
import { Effect, put, call, takeLatest } from 'redux-saga/effects';
import { IPlayerInfo, ILeaderboardAddUser, IQuery, LeaderboardListDTO } from '@/api/types';
import { select } from 'redux-saga/effects';
import { addUserInfoToServer, getLeaderboardList } from '@/controllers/leaderboard-controller';
import { ratingFieldName, teamName } from '../constants';

function* updateScoreSaga({ payload }: Effect<string, IPlayerInfo>) {
  try {
    yield put(LoadingActions.setIsLoading(true));

    const addScoreQuery: ILeaderboardAddUser = {
      data: payload,
      ratingFieldName,
      teamName,
    };

    yield call(addUserInfoToServer, addScoreQuery);

    yield call(getScoreSaga);
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Не удалось сохранить ваш результат',
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* getScoreSaga() {
  try {
    yield put(LoadingActions.setIsLoading(true));

    const cursor: number = yield select(leaderboardSelectors.cursor);
    const limit: number = yield select(leaderboardSelectors.limit);

    const query: IQuery = {
      // сортировка score, 1 страница на 10 записей
      ratingFieldName,
      cursor: cursor,
      limit,
    };

    const liderboardList: LeaderboardListDTO[] = yield call(getLeaderboardList, query);

    yield put(leaderboardActions.setLeaderboard(liderboardList));
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Не удалось получить данные с бэка',
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

export default function* liSaga() {
  yield takeLatest('leaderboard/auth', updateScoreSaga);
  yield takeLatest('leaderboard/getScore', getScoreSaga);
}
