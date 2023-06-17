import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IConfigState {
  value: boolean;
}

const ConfigState: IConfigState = { value: false };

export const configSlice = createSlice({
  name: 'config',
  initialState: ConfigState,
  reducers: {
    initialTheme: state => {
      return state;
    },

    setTheme: (state, { payload }: PayloadAction<boolean>) => {
      state.value = payload;
    },
  },
});

export const configSelectors = {
  isFullScreen: (state: RootState) => state.config,
};

export const configActions = configSlice.actions;
export const configReducer = configSlice.reducer;
