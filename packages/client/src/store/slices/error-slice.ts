import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IErrorState {
  title: string;
  description: string;
}

export const initialState: IErrorState = { title: '', description: '' };

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    error: initialState,
  },
  reducers: {
    setError: (state, { payload }: PayloadAction<IErrorState>) => {
      state.error = payload;
    },
    resetError: state => {
      state.error = initialState;
    },
  },
});

export const errorSelectors = {
  all: (state: RootState) => state.error,
};

export const errorActions = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
