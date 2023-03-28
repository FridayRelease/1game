import React, { FC } from 'react';
import Avatar from '@/components/avatar/avatar';
import Menu from '@/features/profile/menu';
import mockUser from '@/features/profile/mock';
import { IMenuData } from '@/features/profile/profile.interface';
import './profile.scss';

const userMenuData: IMenuData[] = [
  { key: 'Имя', value: mockUser.name },
  { key: 'Фамилия', value: mockUser.secondName },
  { key: 'Логин', value: mockUser.login },
  { key: 'Телефон', value: mockUser.phone },
  { key: 'Имя в чате', value: mockUser.chatName },
];

const EditProfile: FC = () => {
  return (
    <div className="profile-edit">
      <Avatar>{`${mockUser.name} ${mockUser.secondName}`}</Avatar>

      <div className="profile-edit__content">
        <Menu className="profile-edit__menu" title="Сохранить">
          <div className="profile-edit__menu-content">
            <dl>
              {userMenuData.map(({ key, value }) => (
                <React.Fragment key={key}>
                  <dt className="profile__label">{key}</dt>
                  <dd className="profile__value">{value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default EditProfile;
