import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { themeActions } from './store/slices/theme-slice';
import { getLocalStorage } from './utils/local-storage';
import useTheme from './hooks/use-theme';

function App() {
  useTheme();

  // Switching theme.
  useEffect(() => {
    // Handling the storage event is necessary to switch the theme in multiple tabs.
    const handler = () => {
      const theme = getLocalStorage('theme');
      store.dispatch(themeActions.setTheme(theme.value));
    };

    window.addEventListener('storage', handler);

    return () => window.removeEventListener('storage', handler);
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
