import { all } from 'redux-saga/effects';
import { themeSaga } from '@/store/saga';
import { userSaga } from '@/features/authentication';
import { leaderboardSaga } from '@/features/leaderboard';
import forumTopicSaga from '@/features/forum/topic/store/forum-topic-saga';
import forumCommentSaga from '@/features/forum/comment/store/forum-comment-saga';

export default function* rootSaga() {
  yield all([userSaga(), themeSaga(), leaderboardSaga(), forumTopicSaga(), forumCommentSaga()]);
}
