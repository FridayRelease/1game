import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { themeActions } from './store/slices/theme-slice';
import useTheme from './hooks/use-theme';
import { getLocalStorage } from './utils/localStorage';

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

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
