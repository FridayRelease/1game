import { create, getTopicList, read, remove, update } from '@/controllers/forum-topic-controller';
import { errorActions } from '@/store/slices/error-slice';
import { LoadingActions } from '@/store/slices/loading-slice';
import { ITopicCreateRequest, ITopicUpdateRequest } from '@/types/forum';
import { call, Effect, put, takeEvery } from 'redux-saga/effects';
import { forumTopicActions } from './forum-topic-slice';
import { ForumTopicResponseInfo, ForumTopicsResponseInfo } from './types';

function* topicsSaga() {
  try {
    yield put(LoadingActions.setIsLoading(true));

    const topics: ForumTopicsResponseInfo = yield call(getTopicList);
    yield put(forumTopicActions.setTopics(topics));
  } catch (error) {
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

function* createTopicsSaga({ payload }: Effect<string, ITopicCreateRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(create, payload);

    const topics: ForumTopicsResponseInfo = yield call(getTopicList);
    yield put(forumTopicActions.setTopics(topics));
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

function* readTopicsSaga({ payload }: Effect<string, number>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    const topic: ForumTopicResponseInfo = yield call(read, payload);

    yield put(forumTopicActions.setTopic(topic));
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

function* updateTopicsSaga({ payload }: Effect<string, ITopicUpdateRequest>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(update, payload);

    const topics: ForumTopicsResponseInfo = yield call(getTopicList);
    yield put(forumTopicActions.setTopics(topics));
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

function* deleteTopicsSaga({ payload }: Effect<string, number>) {
  yield put(LoadingActions.setIsLoading(true));

  try {
    yield call(remove, payload);

    const topics: ForumTopicsResponseInfo = yield call(getTopicList);
    yield put(forumTopicActions.setTopics(topics));
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

export default function* forumTopicSaga() {
  yield takeEvery('forum-topic/topic', topicsSaga);
  yield takeEvery('forum-topic/create', createTopicsSaga);
  yield takeEvery('forum-topic/read', readTopicsSaga);
  yield takeEvery('forum-topic/update', updateTopicsSaga);
  yield takeEvery('forum-topic/delete', deleteTopicsSaga);
}
