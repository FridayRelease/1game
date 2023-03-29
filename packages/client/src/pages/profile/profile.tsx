import { FC } from 'react';
import Profile from '@/features/profile';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './profile.scss';

const ProfilePage: FC = () => {
  return (
    <div className="profile-page">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <main className="container">
        <Profile />
      </main>
    </div>
  );
};

export default withLayoutMain(ProfilePage);
