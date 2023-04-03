import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserAvatar from '@/components/user-avatar';
import Button from '@/components/button/button';
import { userSelectors } from '@/features/authentication';
import { IUserDTO } from '@/api/types';
import { signout } from '@/controllers/user-controllers';
import useResetState from '@/hooks/use-reset-state';
import { IMenuData, IMenuItem } from './profile.interface';
import Menu from './menu';
import './profile.scss';


const Profile: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector(userSelectors.user);

  const { first_name, second_name, login, phone, display_name, email } = userState.info as IUserDTO;

  useResetState();

  const userMenuData: IMenuData[] = [
    { key: 'Имя', value: first_name },
    { key: 'Фамилия', value: second_name },
    { key: 'Логин', value: login },
    { key: 'Email', value: email },
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

  const onClick = useCallback(() => {
    signout(navigate, dispatch);
  }, []);

  return (
    <div className="profile">
      <UserAvatar>{`${first_name} ${second_name}`}</UserAvatar>

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

      <Button type="submit" view="primary" onClick={onClick}>
        Выйти
      </Button>
    </div>
  );
};

export default Profile;
