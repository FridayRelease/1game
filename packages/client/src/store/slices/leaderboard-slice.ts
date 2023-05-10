import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {LeaderboardListDTO} from "@/api/types";
/*
interface ILeaderboardState {
  id?:number,
  name: string;
  score:number;
}*/

const LeaderboardState: LeaderboardListDTO = [
  { name: 'Papa', score: 1000 },
  { name: 'Mama', score: 900 },
  { name: 'Alex', score: 800 },
  { name: 'Max', score: 1700 },
  { name: 'Sergey', score: 600 },
  { name: 'Masha', score: 500 },
  { name: 'Petr', score: 400 },
  ]
;

export const LeaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState:LeaderboardState,
  reducers: {
    setLeaderboard: (state, { payload }: PayloadAction<LeaderboardListDTO>) => {
      // eslint-disable-line
      //state.leaderboard.push(payload);//ищу ошибку здесь!!! - ужно раскомментировать
      //ошибка - TS2339: Property 'leaderboard' does not exist on type 'WritableDraft<{ id?: number | undefined; name: string; score: string | number; }>[]'.
    },
  },
});

export const LeaderboardSelectors = {
  all: (state: RootState) => state.leaderboard,
};

export const LeaderboardActions = LeaderboardSlice.actions;
export const LeaderboardReducer = LeaderboardSlice.reducer;
