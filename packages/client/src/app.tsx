import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { themeActions } from './store/slices/theme-slice';

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

  // Switching theme.
  useEffect(() => {
    let theme = JSON.parse(localStorage.getItem('theme') || '{}');
    if (!theme.value) {
      const stateTheme = store.getState().theme;
      localStorage.setItem('theme', JSON.stringify({ value: stateTheme.value }));
      theme = stateTheme;
    }

    store.dispatch(themeActions.setTheme(theme.value));

    // Handling the storage event is necessary to switch the theme in multiple tabs.
    const handler = () => {
      const theme = JSON.parse(localStorage.getItem('theme') || '{}');
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
