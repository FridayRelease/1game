import { createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from '@/features/authentication';
import ErrorPage from './pages/error-page';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import EditRouter from './pages/edit-router';
import EditProfile from './pages/edit-profile';
import EditPassword from './pages/edit-password';
import GameOver from './pages/game-over';
import { MainUrl, LoginUrl, SignupUrl, ProfileUrl } from './constant/router';

const router = createBrowserRouter([
  {
    path: MainUrl,
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: LoginUrl,
    element: <Login />,
  },
  {
    path: SignupUrl,
    element: <Signup />,
  },
  {
    path: ProfileUrl,
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
  {
    path: 'gameover',
    element: <GameOver />,
  },
]);

export default router;
