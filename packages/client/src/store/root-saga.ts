import { all } from 'redux-saga/effects';
import { themeSaga } from '@/store/saga';
import { userSaga } from '@/features/authentication';
import { leaderboardSaga } from '@/features/leaderboard';

export default function* rootSaga() {
  yield all([userSaga(), themeSaga(), leaderboardSaga()]);
}
