import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ForumTopicDTO, ForumTopicsDTO } from '@/api/types';
import { ITopicCreateRequest, ITopicUpdateRequest } from '@/types/forum';

export interface ForumTopicState {
  topic: ForumTopicDTO | null;
  topics: ForumTopicsDTO | null;
}

const initialState: ForumTopicState = {
  topic: null,
  topics: null,
};

export const forumTopicSlice = createSlice({
  name: 'forum-topic',
  initialState,
  reducers: {
    topic: state => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: (state, { payload }: PayloadAction<ITopicCreateRequest>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    read: (state, { payload }: PayloadAction<number>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (state, { payload }: PayloadAction<ITopicUpdateRequest>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: (state, { payload }: PayloadAction<number>) => {
      return state;
    },

    setTopic: (state, { payload }: PayloadAction<ForumTopicDTO | null>) => {
      state.topic = payload;
    },

    setTopics: (state, { payload }: PayloadAction<ForumTopicsDTO | null>) => {
      state.topics = payload;
    },
  },
});

export const forumTopicSelectors = {
  topic: (state: RootState) => state['forum-topic'].topic,
  topics: (state: RootState) => state['forum-topic'].topics,
};

export const forumTopicActions = forumTopicSlice.actions;
export const forumTopicReducer = forumTopicSlice.reducer;
