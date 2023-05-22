import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {LeaderboardListDTO} from "@/api/types";

export interface ILeaderboardState {
  leaderboard:{
  id?:number,
  name: string;
  score:number;
}[]};
export interface ILeader{
  name: string;
  score:number
}

const LeaderboardState: ILeaderboardState = {
  leaderboard : [
  { name: 'Papa', score: 100 },
  { name: 'Mama', score: 90 },
  { name: 'Alex', score: 80 },
  { name: 'Max', score: 170 },
  { name: 'Sergey', score: 60 },
  { name: 'Masha', score: 50 },
  { name: 'Petr', score: 40 },
  ]}
;

export const LeaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState:LeaderboardState,
  reducers: {
    setLeaderboard: (state, { payload }: PayloadAction<ILeader>) => {
      state.leaderboard.push(payload); },
  },
});

export const LeaderboardSelectors = {
  all: (state: RootState) => state.leaderboard,
};

export const LeaderboardActions = LeaderboardSlice.actions;
export const LeaderboardReducer = LeaderboardSlice.reducer;
