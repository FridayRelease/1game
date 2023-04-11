import { themeActions } from '@/store/slices/theme-slice';
import { store } from '@/store/store';
import { useEffect } from 'react';

const useTheme = () => {
  useEffect(() => {
    let theme = JSON.parse(localStorage.getItem('theme') || '{}');
    if (!theme.value) {
      const stateTheme = store.getState().theme;
      localStorage.setItem('theme', JSON.stringify({ value: stateTheme.value }));
      theme = stateTheme;
    }

    store.dispatch(themeActions.setTheme(theme.value));
  }, []);
};

export default useTheme;
