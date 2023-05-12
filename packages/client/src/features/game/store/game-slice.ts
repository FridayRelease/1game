import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { GameState } from './types';

const initialState: GameState = {
  score: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setScore: (state, { payload }: PayloadAction<number>) => {
      state.score = payload;
    },
  },
});

export const gameSelectors = {
  game: (state: RootState) => state.game,
};

export const gameActions = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
