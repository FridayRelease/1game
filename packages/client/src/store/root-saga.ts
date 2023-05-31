import { all } from 'redux-saga/effects';
import { themeSaga } from '@/store/saga';
import { userSage } from '@/features/authentication';
import { leaderboardSaga } from '@/features/leaderboard';

export default function* rootSaga() {
  yield all([userSage(), themeSaga(), leaderboardSaga()]);
}
