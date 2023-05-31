import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {IComment, ITopic, IUser} from "../../api/types";
import {Users} from "@/mock/mockUsers";
import {mockComments} from "@/mock/mockComments";


export interface IForumState {
  isLoaded: boolean;
  topics: ITopic[] | [];
  comments: IComment[];
  friends?: IUser[] | [];
  topic_id: number | undefined;
}

const ForumState = {
  isLoaded: false,
  topics: [],
  comments: mockComments,
  friends: Users,
  id: 1
}
export const ForumSlice = createSlice({
  name: 'forum',
  initialState: ForumState,
  reducers: {
    setTopicsFromServerToStore: (state, {payload}: PayloadAction<ITopic[]>) => {
      //@ts-ignore
      state.topics = payload;
      state.isLoaded = true;
    },
    setCommentsFromServerToStore: (state, {payload}: PayloadAction<IComment[]>) => {
      //@ts-ignore
      state.comments = payload;
      },
    //addTopicToStore: (state, {payload}: PayloadAction<ITopic>) => {
    //  state.topics.push(payload);
    //},
    setActiveTopicIdToStore: (state, {payload}: PayloadAction<number>) => {
      //@ts-ignore
      state.id = payload;
    },
    setUsersFromServerToStore: (state, {payload}: PayloadAction<IUser[]>) => {
      // @ts-ignore
      state.friends = payload;
    },
  },

});

export const ForumSelectors = {
  all: (state: RootState) => state,
  topics: (state: RootState) => state.forum.topics,
  id: (state: RootState) => state.forum.id,
  friends: (state: RootState) => state.forum.friends,
  comments: (state: RootState) => state.forum.comments,
};


export const ForumActions = ForumSlice.actions;
export const ForumReducer = ForumSlice.reducer;