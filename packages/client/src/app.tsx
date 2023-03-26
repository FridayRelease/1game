import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './app.scss';

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

  return <RouterProvider router={router} />;
}

export default App;
