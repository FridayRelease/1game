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
    setTheme: (state, { payload }: PayloadAction<string>) => {
      const themeKey = Object.keys(Themes)[Object.values(Themes).indexOf(payload as Themes)] as Themes;

      if (themeKey) {
        state.value = payload as Themes;
        // setLocalStorage('theme', JSON.stringify({ value: payload }));

        document.documentElement.dataset.theme = state.value;
      } else {
        state.value = Themes.Dark;
        // setLocalStorage('theme', JSON.stringify({ value: Themes.Dark }));
        document.documentElement.dataset.theme = state.value;
      }
    },
  },
});

export const themeSelectors = {
  theme: (state: RootState) => state.theme,
};

export const themeActions = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
