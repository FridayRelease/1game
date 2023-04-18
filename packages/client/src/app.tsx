import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './app.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('./service-worker/sw.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }

  useEffect(() => {
    if (window.Worker) {
      const fetchServerData = async () => {
        const url = `http://localhost:${__SERVER_PORT__}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

      };

      fetchServerData();
    }
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
