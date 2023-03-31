import { FC } from 'react';
import EditProfile from '@/components/profile/edit/profile';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './edit-profile.scss';

const EditProfilePage: FC = () => {
  return (
    <div className="profile-edit-page">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <main className="container">
        <EditProfile />
      </main>
    </div>
  );
};

export default withLayoutMain(EditProfilePage);
