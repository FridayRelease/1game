import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IComment, ITopic, IUser } from '@/api/types';
import { Users } from '@/mock/mockUsers';
import { mockComments } from '@/mock/mockComments';

export interface IForumState {
  isLoaded: boolean;
  topics: ITopic[] | [];
  comments: IComment[];
  friends?: IUser[] | [];
  activeTopicId: number | undefined;
  commentId: number;
  requireTopicUpdate:boolean;
  requireCommentUpdate:boolean;
  noComments:boolean;
}

const ForumState = {
  isLoaded: false,
  topics: [],
  comments:[],
  friends: Users,
  activeTopicId: 1,
  commentId: 1,
  requireTopicUpdate:false,
  requireCommentUpdate:false,
  noComments:false
};
export const ForumSlice = createSlice({
  name: 'forum',
  initialState: ForumState,
  reducers: {
    setAllTopicsToStore: (state, { payload }: PayloadAction<ITopic[]>) => {
      //@ts-ignore
      state.topics = payload;
      state.isLoaded = true;
    },
    addTopicToStore: (state, { payload }: PayloadAction<ITopic>) => {
      // @ts-ignore
      state.topics.push(payload);
    },

    setCommentsFromServerToStore: (state, { payload }: PayloadAction<IComment[]>) => {
      //@ts-ignore
      state.comments = payload;
    },

    setActiveTopicIdToStore: (state, { payload }: PayloadAction<number>) => {
      state.activeTopicId = payload;
    },
    setCommentIdToStore: (state, { payload }: PayloadAction<number>) => {
      state.commentId = payload;
    },
    setUsersFromServerToStore: (state, { payload }: PayloadAction<IUser[]>) => {
      // @ts-ignore
      state.friends = payload;
    },
    setTopicUpdate: (state, { payload }: PayloadAction<boolean>) => {
      state.requireTopicUpdate = payload;
    },
    setCommentUpdate: (state, { payload }: PayloadAction<boolean>) => {
      state.requireCommentUpdate = payload;
    },
    setNoComments: (state, { payload }: PayloadAction<boolean>) => {
      state.noComments = payload;
    },
  },
});

export const ForumSelectors = {
  all: (state: RootState) => state,
  topics: (state: RootState) => state.forum.topics,
  topicId: (state: RootState) => state.forum.activeTopicId,
  friends: (state: RootState) => state.forum.friends,
  comments: (state: RootState) => state.forum.comments,
  commentId: (state: RootState) => state.forum.commentId,
  requireTopicUpdate:(state: RootState) => state.forum.requireTopicUpdate,
  requireCommentUpdate:(state: RootState) => state.forum.requireCommentUpdate,
  noComments:(state: RootState) => state.forum.noComments,
};

export const ForumActions = ForumSlice.actions;
export const ForumReducer = ForumSlice.reducer;
