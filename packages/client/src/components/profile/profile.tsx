import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Avatar from '@/components/avatar';
import Button from '@/components/button/button';
import { userSelectors } from '@/features/authentication';
import { IMenuData, IMenuItem } from './profile.interface';
import Menu from './menu';
import './profile.scss';
import { IUserDTO } from '@/api/types';

const Profile: FC = () => {
  const navigate = useNavigate();
  const userState = useSelector(userSelectors.user);
  const { first_name, second_name, login, phone, display_name } = userState.info as IUserDTO;

  const userMenuData: IMenuData[] = [
    { key: 'Имя', value: first_name },
    { key: 'Фамилия', value: second_name },
    { key: 'Логин', value: login },
    { key: 'Телефон', value: phone },
    { key: 'Имя в чате', value: display_name },
  ];

  const userMenuPassword: IMenuData[] = [{ key: 'Пароль', value: '********' }];

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
      <Avatar>{`${first_name} ${second_name}`}</Avatar>

      <div className="profile__content">
        {menus.map(({ className, title, data, onClick }) => (
          <Menu key={title} className={className} title={title} onClick={onClick}>
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
