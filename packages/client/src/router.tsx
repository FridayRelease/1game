import { createBrowserRouter } from 'react-router-dom';
import { RequireAuth } from '@/features/authentication';
import ErrorPage from './pages/error-page';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import { MainUrl, LoginUrl, SignupUrl, LeaderboardUrl } from './constant/router';
import ErrorBoundary from '@/features/error-boundary/ErrorBoundary';
import Forum from '@/features/forum/forum';
import ForumUser from '@/features/forum-user/forum-user';
import Leaderboard from './pages/leaderboard';

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
    path: 'Forum',
    element: (
      <ErrorBoundary>
        <Forum />
      </ErrorBoundary>
    ),
  },
  {
    path: 'forum/:id',
    element: (
      <ErrorBoundary>
        <ForumUser />
      </ErrorBoundary>
    ),
  },
  {
    path: LeaderboardUrl,
    element: <Leaderboard />,
  },
]);

export default router;
