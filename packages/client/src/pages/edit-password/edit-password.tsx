import { FC } from 'react';
import EditPassword from '@/components/profile/edit/password';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import './edit-password.scss';

const EditPasswordPage: FC = () => {
  return (
    <div className="profile-password-page">
      <h1 className="visually-hidden">Профиль пользователя</h1>
      <main className="container">
        <EditPassword />
      </main>
    </div>
  );
};

export default withLayoutMain(EditPasswordPage);
