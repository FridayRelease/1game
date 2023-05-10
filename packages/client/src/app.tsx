import { Route, Routes } from 'react-router-dom';
import { routes } from './router';
import './app.scss';

function App() {
  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route path={path} element={element} key={path} />
      ))}
    </Routes>
  );
}

export default App;
