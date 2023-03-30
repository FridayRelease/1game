import { createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from '@/features/authentication';
import ErrorPage from './pages/error-page';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { MainUrl, SigninUrl, SignupUrl } from './constant/router';

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
    path: SigninUrl,
    element: <Login />,
  },
  {
    path: SignupUrl,
    element: <Signup />,
  },
]);

export default router;
