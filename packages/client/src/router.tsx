import { RequireAuth } from '@/features/authentication';
import { RouteObject } from 'react-router-dom';
import GamePage from './pages/game';
import ProfilePage from './pages/profile';
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
  VerificationCodeUrl,
} from './constant/router';
import ErrorBoundary from '@/features/error-boundary/ErrorBoundary';
import Forum from '@/features/forum/forum';
import ForumUser from '@/features/forum-user/forum-user';
import Leaderboard from './pages/leaderboard';
import Page404 from './pages/page-404';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import VerificationCodePage from './pages/verification-code/verification-code-page';
import Home from './pages/home';
import { RedirectToMain } from './features/authentication';

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
    element: (
      <RedirectToMain>
        <LoginPage />
      </RedirectToMain>
    ),
  },
  {
    path: SignupUrl,
    element: (
      <RedirectToMain>
        <SignupPage />
      </RedirectToMain>
    ),
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
    path: ProfileUrl,
    element: (
      <RequireAuth>
        <ProfilePage />
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
  {
    path: VerificationCodeUrl,
    element: (
      <ErrorBoundary>
        <RedirectToMain>
          <VerificationCodePage />
        </RedirectToMain>
      </ErrorBoundary>
    ),
  },
];
