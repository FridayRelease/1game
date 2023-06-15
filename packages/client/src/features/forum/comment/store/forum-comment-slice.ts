import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';
import { ForumCommentDTO, ForumCommentsDTO } from '@/api/types';
import { ICommentCreateRequest, ICommentDeleteRequest, ICommentUpdateRequest } from '@/types/forum';

export interface ForumCommentState {
  comment: ForumCommentDTO | null;
  comments: ForumCommentsDTO | null;
}

const initialState: ForumCommentState = {
  comment: null,
  comments: null,
};

export const forumCommentSlice = createSlice({
  name: 'forum-comment',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    comment: (state, { payload }: PayloadAction<number>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    create: (state, { payload }: PayloadAction<ICommentCreateRequest>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    update: (state, { payload }: PayloadAction<ICommentUpdateRequest>) => {
      return state;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delete: (state, { payload }: PayloadAction<ICommentDeleteRequest>) => {
      return state;
    },

    setComment: (state, { payload }: PayloadAction<ForumCommentDTO | null>) => {
      state.comment = payload;
    },

    setComments: (state, { payload }: PayloadAction<ForumCommentsDTO | null>) => {
      state.comments = payload;
    },
  },
});

export const forumCommentSelectors = {
  comment: (state: RootState) => state['forum-comment'].comment,
  comments: (state: RootState) => state['forum-comment'].comments,
};

export const forumCommentActions = forumCommentSlice.actions;
export const forumCommentReducer = forumCommentSlice.reducer;
