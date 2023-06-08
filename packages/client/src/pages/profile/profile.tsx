import { FC } from 'react';
import Profile from '@/components/profile';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './profile.scss';
import { RequireAuth } from '@/features/authentication';

const ProfilePage: FC = () => {
  return (
    <RequireAuth>
      <div className="profile-page">
        <h1 className="visually-hidden">Профиль пользователя</h1>
        <main className="container">
          <Profile />
        </main>
      </div>
    </RequireAuth>
  );
};

export default withLayoutMain(ProfilePage);
