import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/error-page';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import EditRouter from './pages/edit-router';
import EditProfile from './pages/edit-profile';
import EditPassword from './pages/edit-password';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'edit',
    element: <EditRouter />,
    children: [
      {
        path: 'profile',
        element: <EditProfile />,
      },
      {
        path: 'password',
        element: <EditPassword />,
      },
    ],
  },
]);

export default router;
