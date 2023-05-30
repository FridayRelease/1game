import { IPlayerInfo, LeaderboardListDTO } from '@/api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

export interface ILeaderboardState {
  leaderboard: LeaderboardListDTO[];
  cursor: number;
  limit: number;
}

const LeaderboardState: ILeaderboardState = {
  leaderboard: [],
  cursor: 0,
  limit: 10,
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: LeaderboardState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateScore: (state, { payload }: PayloadAction<IPlayerInfo>) => {
      return state;
    },
    getScore: state => {
      return state;
    },
    setLeaderboard: (state, { payload }: PayloadAction<LeaderboardListDTO[]>) => {
      state.leaderboard = payload;
    },
  },
});

export const leaderboardSelectors = {
  all: (state: RootState) => state.leaderboard.leaderboard,
  cursor: (state: RootState) => state.leaderboard.cursor,
  limit: (state: RootState) => state.leaderboard.limit,
};

export const leaderboardActions = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
