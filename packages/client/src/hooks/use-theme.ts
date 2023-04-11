import { themeActions } from '@/store/slices/theme-slice';
import { store } from '@/store/store';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { useEffect } from 'react';

const useTheme = () => {
  useEffect(() => {
    let theme = getLocalStorage('theme');
    if (!theme.value) {
      const stateTheme = store.getState().theme;
      setLocalStorage('theme', JSON.stringify({ value: stateTheme.value }));
      theme = stateTheme;
    }

    store.dispatch(themeActions.setTheme(theme.value));
  }, []);
};

export default useTheme;
