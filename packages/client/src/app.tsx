import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './router';
import { useStore } from 'react-redux';

import { themeActions } from './store/slices/theme-slice';
import { getLocalStorage } from './utils/local-storage';
import useTheme from './hooks/use-theme';
import './app.scss';

function App() {
  const store = useStore();
  useTheme();

  // Switching theme.
  useEffect(() => {
    // Handling the storage event is necessary to switch the theme in multiple tabs.
    const handler = () => {
      const theme = getLocalStorage('theme');
      store.dispatch(themeActions.setTheme(theme.value));
    };

    globalThis.addEventListener('storage', handler);

    return () => globalThis.removeEventListener('storage', handler);
  }, []);

  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
}

export default App;
