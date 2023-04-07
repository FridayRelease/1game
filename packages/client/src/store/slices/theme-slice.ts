import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isLightTheme: false,
    value: 'dark',
  },
  reducers: {
    toggleTheme: state => {
      state.isLightTheme = !state.isLightTheme;
      state.value = state.isLightTheme ? 'light' : 'dark';

      localStorage.setItem('theme', JSON.stringify({ value: state.value }));
      document.documentElement.dataset.theme = state.value;
    },

    setTheme: (state, { payload }: PayloadAction<string>) => {
      if (payload === 'dark') {
        state.isLightTheme = false;
        state.value = payload;
      } else {
        state.isLightTheme = true;
        state.value = 'light';
      }

      document.documentElement.dataset.theme = state.value;
    },
  },
});

export const themeSelectors = {
  theme: (state: RootState) => state.theme,
};

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
