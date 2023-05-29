import { Themes } from '@/components/toggle-theme/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface IThemeState {
  value: Themes;
}

const ThemeState: IThemeState = { value: Themes.Dark };

export const themeSlice = createSlice({
  name: 'theme',
  initialState: ThemeState,
  reducers: {
    initialTheme: state => {
      return state;
    },
    updateTheme: (state, { payload }: PayloadAction<string>) => {
      return state;
    },

    setTheme: (state, { payload }: PayloadAction<Themes>) => {
      state.value = payload;
    },
  },
});

export const themeSelectors = {
  theme: (state: RootState) => state.theme,
};

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
