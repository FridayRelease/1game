import { FC } from 'react';
import EditProfile from '@/features/profile/edit/profile';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './edit-profile.scss';

const EditProfilePage: FC = () => {
  return (
    <div className="profile-page">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <main className="container profile__container">
        <EditProfile />
      </main>
    </div>
  );
};

export default withLayoutMain(EditProfilePage);
