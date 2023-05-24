import createSagaMiddleware, { Task } from 'redux-saga';
import { configureStore, Store } from '@reduxjs/toolkit';
import rootSaga from './root-saga';
import { errorReducer } from './slices/error-slice';
import { userSlice } from '@/features/authentication';
import { LoadingReducer } from './slices/loading-slice';
import { themeReducer } from './slices/theme-slice';
import { gameReducer } from '@/features/game';

export interface SagaStore extends Store {
  rootSaga: Task;
}

export default function createReduxStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = configureStore({
    preloadedState: initialState,
    reducer: {
      user: userSlice.reducer,
      error: errorReducer,
      loading: LoadingReducer,
      theme: themeReducer,
      game: gameReducer,
    },
    middleware: [sagaMiddleware],
  });

  (store as SagaStore).rootSaga = sagaMiddleware.run(rootSaga);

  return store as SagaStore;
}

export type ReduxStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<ReduxStore['getState']>;
export type AppDispatch = ReturnType<ReduxStore['dispatch']>;
