import {RequireAuth} from '@/features/authentication';
import {RouteObject} from 'react-router-dom';
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
    LeaderboardUrl,
} from './constant/router';
import ErrorBoundary from '@/features/error-boundary/ErrorBoundary';
import Forum from '@/features/forum/forum';
import ForumUser from '@/features/forum-topic/forum-topic';
import Leaderboard from './pages/leaderboard';
import ForumTopic from '@/features/forum-topic/forum-topic';

export const routes: RouteObject[] = [
    {
        path: MainUrl,
        element: (
            <RequireAuth>
                <Home/>
            </RequireAuth>
        ),
        errorElement: <ErrorPage/>,
    },
    {
        path: LoginUrl,
        element: <Login/>,
    },
    {
        path: GameUrl,
        element: (
            <RequireAuth>
                <GamePage/>
            </RequireAuth>
        ),
    },
    {
        path: SignupUrl,
        element: <Signup/>,
    },
    {
        path: ProfileUrl,
        element: (
            <RequireAuth>
                <Profile/>
            </RequireAuth>
        ),
    },
    {
        path: 'edit',
        element: <EditRouter/>,
        children: [
            {
                path: 'profile',
                element: (
                    <RequireAuth>
                        <EditProfile/>
                    </RequireAuth>
                ),
            },
            {
                path: 'password',
                element: (
                    <RequireAuth>
                        <EditPassword/>
                    </RequireAuth>
                ),
            },
        ],
    },
    {
        path: GameoverUrl,
        element: <GameOver/>,
    },
    {
        path: ForumUrl,
        element: (
            <ErrorBoundary>
                <RequireAuth>
                    <Forum/>
                </RequireAuth>
            </ErrorBoundary>
        ),
    },
    {
        path: `/forum/topic`,
        element: (
            <ErrorBoundary>
                <RequireAuth>
                    <ForumTopic />
                </RequireAuth>
            </ErrorBoundary>
        ),
    },
    {
        path: LeaderboardUrl,
        element: (
            <ErrorBoundary>
                <Leaderboard/>
            </ErrorBoundary>
        ),
    },
];
