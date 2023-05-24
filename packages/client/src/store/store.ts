import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './root-saga';
import { errorReducer } from './slices/error-slice';
import { userSlice } from '@/features/authentication';
import { LoadingReducer } from './slices/loading-slice';
import { themeReducer } from './slices/theme-slice';
import { LeaderboardReducer } from './slices/leaderboard-slice';
import { gameReducer } from '@/features/game';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    error: errorReducer,
    loading: LoadingReducer,
    theme: themeReducer,
    leaderboard: LeaderboardReducer,
    game: gameReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
