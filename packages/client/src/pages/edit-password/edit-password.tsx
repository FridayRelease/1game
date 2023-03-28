import { FC } from 'react';
import EditPassword from '@/features/profile/edit/password';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './edit-password.scss';

const EditPasswordPage: FC = () => {
  return (
    <div className="profile-page">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <main className="container profile__container">
        <EditPassword />
      </main>
    </div>
  );
};

export default withLayoutMain(EditPasswordPage);
