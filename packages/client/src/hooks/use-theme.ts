import { themeActions } from '@/store/slices/theme-slice';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';
import { useEffect } from 'react';
import { useStore } from 'react-redux';

const useTheme = () => {
  const store = useStore();
  const theme = getLocalStorage('theme');

  useEffect(() => {
    if (!theme.value) {
      // theme = store.theme;
      setLocalStorage('theme', JSON.stringify({ value: theme.value }));
    }

    store.dispatch(themeActions.setTheme(theme.value));
  }, [theme.value]);
};

export default useTheme;
