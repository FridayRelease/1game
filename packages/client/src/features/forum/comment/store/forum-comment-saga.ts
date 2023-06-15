import { create, getCommentList, remove, update } from '@/controllers/forum-comment-controller';
import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { ICommentCreateRequest, ICommentDeleteRequest, ICommentUpdateRequest } from '@/types/forum';
import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { forumCommentActions } from './forum-comment-slice';
import { ForumCommentsResponseInfo } from './types';

function* commentsSaga({ payload }: Effect<string, number>) {
  try {
    yield put(LoadingActions.setIsLoading(true));

    const comments: ForumCommentsResponseInfo = yield call(getCommentList, payload);
    yield put(forumCommentActions.setComments(comments));
  } catch (error) {
    yield put(
      errorActions.setError({
        title: 'Что-то пошло не так...',
        description: 'Попробуйте ... еще раз',
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* createCommentsSaga({ payload }: Effect<string, ICommentCreateRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(create, payload);

    const comments: ForumCommentsResponseInfo = yield call(getCommentList, payload.topic_id);
    yield put(forumCommentActions.setComments(comments));
  } catch (error: any) {
    yield put(
      errorActions.setError({
        title: error.response.data.error.name,
        description: error.response.data.error.parent.detail,
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* updateCommentsSaga({ payload }: Effect<string, ICommentUpdateRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(update, { id: payload.id, message: payload.message });

    const comments: ForumCommentsResponseInfo = yield call(getCommentList, payload.topic_id);
    yield put(forumCommentActions.setComments(comments));
  } catch (error: any) {
    yield put(
      errorActions.setError({
        title: error.response.data.error.name,
        description: error.response.data.error.parent.detail,
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

function* deleteCommentsSaga({ payload }: Effect<string, ICommentDeleteRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(remove, payload.id);

    const comments: ForumCommentsResponseInfo = yield call(getCommentList, payload.topic_id);
    yield put(forumCommentActions.setComments(comments));
  } catch (error: any) {
    yield put(
      errorActions.setError({
        title: error.response.data.error.name,
        description: error.response.data.error.parent.detail,
      })
    );
  } finally {
    yield put(LoadingActions.setIsLoading(false));
  }
}

export default function* forumCommentSaga() {
  yield takeEvery('forum-comment/comment', commentsSaga);
  yield takeEvery('forum-comment/create', createCommentsSaga);
  yield takeEvery('forum-comment/update', updateCommentsSaga);
  yield takeEvery('forum-comment/delete', deleteCommentsSaga);
}
