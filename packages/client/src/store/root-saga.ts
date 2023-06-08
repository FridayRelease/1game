import { all } from 'redux-saga/effects';
import { themeSaga } from '@/store/saga';
import { userSage } from '@/features/authentication';
import { leaderboardSaga } from '@/features/leaderboard';
import forumTopicSaga from '@/features/forum/topic/store/forum-topic-saga';

export default function* rootSaga() {
  yield all([userSage(), themeSaga(), leaderboardSaga(), forumTopicSaga()]);
}
