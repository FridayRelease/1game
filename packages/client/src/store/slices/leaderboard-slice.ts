import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { LeaderboardListDTO } from '@/api/types';

export interface ILeaderboardState {
  leaderboard: {
    id?: number;
    name: string;
    score: number;
  }[];
}
export interface ILeader {
  name: string;
  score: number;
}

const LeaderboardState: ILeaderboardState = {
  leaderboard: [],
};
export const LeaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: LeaderboardState,
  reducers: {
    setLeaderboard: (state, { payload }: PayloadAction<ILeader>) => {
      state.leaderboard.push(payload);
    },
  },
});

export const LeaderboardSelectors = {
  all: (state: RootState) => state.leaderboard,
};

export const LeaderboardActions = LeaderboardSlice.actions;
export const LeaderboardReducer = LeaderboardSlice.reducer;
