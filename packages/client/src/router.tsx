import { RequireAuth } from '@/features/authentication';
import { RouteObject } from 'react-router-dom';
import GamePage from './pages/game';
import ErrorPage from './pages/error-page';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import EditRouter from './pages/edit-router';
import EditProfile from './pages/edit-profile';
import EditPassword from './pages/edit-password';
import GameOver from './pages/game-over';
import {
  MainUrl,
  LoginUrl,
  GameUrl,
  SignupUrl,
  ProfileUrl,
  GameoverUrl,
  ForumUrl,
  LeaderboardUrl, ControlUrl
} from './constant/router'
import ErrorBoundary from '@/features/error-boundary/ErrorBoundary';
import Forum from '@/features/forum/forum';
import ForumUser from '@/features/forum-user/forum-user';
import Leaderboard from './pages/leaderboard';
import Controls from '@/pages/controls'

export const routes: RouteObject[] = [
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
    path: GameUrl,
    element: <GamePage />,
  },
  {
    path: SignupUrl,
    element: <Signup />,
  },
  {
    path: ControlUrl,
    element: <Controls />,
  },
  {
    path: ProfileUrl,
    element: (
      <RequireAuth>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: 'edit',
    element: <EditRouter />,
    children: [
      {
        path: 'profile',
        element: (
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        ),
      },
      {
        path: 'password',
        element: (
          <RequireAuth>
            <EditPassword />
          </RequireAuth>
        ),
      },
    ],
  },
  {
    path: GameoverUrl,
    element: <GameOver />,
  },
  {
    path: ForumUrl,
    element: (
      <ErrorBoundary>
        <Forum />
      </ErrorBoundary>
    ),
  },
  {
    path: `${ForumUrl}/:id`,
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
];
