import { themeActions } from '@/store/slices/theme-slice';
import { store } from '@/store/store';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import { useEffect } from 'react';

const useTheme = () => {
  let theme = getLocalStorage('theme');

  useEffect(() => {
    if (!theme.value) {
      theme = store.getState().theme;
      setLocalStorage('theme', JSON.stringify({ value: theme.value }));
    }

    store.dispatch(themeActions.setTheme(theme.value));
  }, [theme.value]);
};

export default useTheme;
