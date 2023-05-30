import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import {ITopic, IUserDTO} from "@/api/types";
import {MockTopics} from "@/mock/mockTopics";
import {Users} from "@/mock/mockUsers";


export interface IForumState {
  serverData:string;
  isLoaded:boolean;
  forum: ITopic[];
  id:number | null;
  friends:IUserDTO[];
}

const ForumState = {
  serverData:'',
  isLoaded:false,
  forum : MockTopics,
  id:1,
  friends:Users
}
export const ForumSlice = createSlice({
  name: 'forum',
  initialState: ForumState,
  reducers: {
    setForumDataFromServerToStore: (state, { payload }: PayloadAction<string>) => {
      state.serverData = payload;
      state.isLoaded = true;
    },
    setPreparedDataToStore: (state, { payload }: PayloadAction<ITopic[]>) => {
      state.forum = payload;
    },
    setActiveTopicIdToStore: (state, { payload }: PayloadAction<number>) => {
      state.id = payload;
    },
    getFriends: state => {
      return state;
    },
  },

});

export const ForumSelectors = {
  all: (state: RootState) => state.forum,
  forum: (state: RootState) => state.forum.forum,
  id: (state: RootState) => state.forum.id,
  friends:(state: RootState) => state.forum.friends,
};


export const ForumActions = ForumSlice.actions;
export const ForumReducer = ForumSlice.reducer;