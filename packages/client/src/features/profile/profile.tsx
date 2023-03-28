import React, { FC } from 'react';
import Avatar from '@/components/avatar';
import Menu from './menu';
import Button from '@/components/button/button';
import { useNavigate } from 'react-router-dom';
import { IMenuData, IMenuItem } from './profile.interface';
import mockUser from './mock';
import './profile.scss';

const userMenuData: IMenuData[] = [
  { key: 'Имя', value: mockUser.name },
  { key: 'Фамилия', value: mockUser.secondName },
  { key: 'Логин', value: mockUser.login },
  { key: 'Телефон', value: mockUser.phone },
  { key: 'Имя в чате', value: mockUser.chatName },
];

const userMenuPassword: IMenuData[] = [
  { key: 'Пароль', value: mockUser.password.replace(/./g, '*') },
];

const Profile: FC = () => {
  const navigate = useNavigate();

  const menus: IMenuItem[] = [
    {
      className: 'profile__menu profile__data',
      title: 'Редактировать профиль',
      data: userMenuData,
      onClick: () => navigate('/edit/profile'),
    },
    {
      className: 'profile__menu profile__password',
      title: 'Редактировать пароль',
      data: userMenuPassword,
      onClick: () => navigate('/edit/password'),
    },
  ];

  return (
    <div className="profile">
      <Avatar>{`${mockUser.name} ${mockUser.secondName}`}</Avatar>

      <div className="profile__content">
        {menus.map(({ className, title, data, onClick }) => (
          <Menu
            key={title}
            className={className}
            title={title}
            onClick={onClick}>
            <div className="profile__menu-content">
              <dl>
                {data.map(({ key, value }) => (
                  <React.Fragment key={key}>
                    <dt className="profile__label">{key}</dt>
                    <dd className="profile__value">{value}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </div>
          </Menu>
        ))}
      </div>

      <Button type="submit" view="primary">
        Выйти
      </Button>
    </div>
  );
};

export default Profile;
