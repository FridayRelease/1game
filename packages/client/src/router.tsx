import { RequireAuth } from '@/features/authentication';
import { RouteObject } from 'react-router-dom';
import GamePage from './pages/game';
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
  LeaderboardUrl,
  Page404Url,
} from './constant/router';
import ErrorBoundary from '@/features/error-boundary/ErrorBoundary';
import Leaderboard from './pages/leaderboard';
import Page404 from './pages/page-404';
import ForumTopic from './features/forum/topic/forum-topic';
import ForumTopicDetailed from './features/forum/topic/components/forum-topic-detailed';

export const routes: RouteObject[] = [
  {
    path: MainUrl,
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
  },
  {
    path: LoginUrl,
    element: <Login />,
  },
  {
    path: GameUrl,
    element: (
      <RequireAuth>
        <GamePage />
      </RequireAuth>
    ),
  },
  {
    path: SignupUrl,
    element: <Signup />,
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
      <RequireAuth>
        <ErrorBoundary>
          <ForumTopic />
        </ErrorBoundary>
      </RequireAuth>
    ),
  },

  {
    path: `${ForumUrl}/:id`,
    element: (
      <RequireAuth>
        <ErrorBoundary>
          <ForumTopicDetailed />
        </ErrorBoundary>
      </RequireAuth>
    ),
  },

  {
    path: LeaderboardUrl,
    element: (
      <ErrorBoundary>
        <Leaderboard />
      </ErrorBoundary>
    ),
  },
  {
    path: Page404Url,
    element: <Page404 />,
  },
];
