import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const LoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
});

export const LoadingSelectors = {
  all: (state: RootState) => state.loading,
};

export const LoadingActions = LoadingSlice.actions;
export const LoadingReducer = LoadingSlice.reducer;
