import createSagaMiddleware, { END, Task } from 'redux-saga';
import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import rootSaga from './root-saga';
import { errorReducer } from './slices/error-slice';
import { userReducer } from '@/features/authentication';
import { leaderboardReducer } from '@/features/leaderboard';
import { LoadingReducer } from './slices/loading-slice';
import { themeReducer } from './slices/theme-slice';
import { ForumReducer } from './slices/forum-slice'

export interface SagaStore extends Store {
  rootSaga: Task;
  close: () => void;
}

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
  loading: LoadingReducer,
  theme: themeReducer,
  leaderboard: leaderboardReducer,
  forum:ForumReducer
});

export default function createReduxStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    preloadedState: initialState,
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });

  (store as SagaStore).rootSaga = sagaMiddleware.run(rootSaga);
  (store as SagaStore).close = () => store.dispatch(END);

  return store as SagaStore;
}

export type ReduxStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<ReduxStore['dispatch']>;
