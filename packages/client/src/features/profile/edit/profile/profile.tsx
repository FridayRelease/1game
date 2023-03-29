import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/avatar/avatar';
import Menu from '@/features/profile/menu';
import mockUser from '@/features/profile/mock';
import useForm from '@/hook/useValidate';
import Input from '@/components/input/input';
import IMenuEditProfileData from './profile.interface';
import { ValidationProps } from '@/features/validation/validator';
import { MenuState, MenuType } from '@/features/profile/menu/menu.interface';
import './profile.scss';

const userMenuData: IMenuEditProfileData[] = [
  { key: 'Имя', name: 'first_name', value: mockUser.name },
  { key: 'Фамилия', name: 'second_name', value: mockUser.secondName },
  { key: 'Логин', name: 'login', value: mockUser.login },
  { key: 'Телефон', name: 'phone', value: mockUser.phone },
  { key: 'Имя в чате', name: 'display_name', value: mockUser.chatName },
];

const initValues = userMenuData.reduce((acc, { name, value }) => {
  acc[name] = value;

  return acc;
}, {} as Record<string, string>);

const validationSchema: Record<string, ValidationProps> = {
  first_name: {
    required: true,
  },
  second_name: {
    required: true,
  },
  login: {
    required: true,
  },
  phone: {
    required: true,
    isPhone: true,
  },
  display_name: {
    required: true,
  },
};

const EditProfile: FC = () => {
  const {
    values,
    hasError,
    onChangeForm,
    getFieldProps,
    getFieldError,
    onBlurInput,
  } = useForm({ initValues, validationSchema });

  const navigate = useNavigate();

  const onSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();
    console.log(values);

    navigate('/profile');
  };

  return (
    <div className="profile-edit">
      <Avatar editable>{`${mockUser.name} ${mockUser.secondName}`}</Avatar>

      <div className="profile-edit__content">
        <form
          onChange={onChangeForm}
          onSubmit={onSubmitForm}
          autoComplete="off">
          <Menu
            className="profile-edit__menu"
            title="Сохранить"
            state={hasError ? MenuState.ERROR : MenuState.SUCCESS}
            type={MenuType.SUBMIT}>
            <div className="profile-edit__menu-content">
              {userMenuData.map(({ key, name }) => (
                <React.Fragment key={key}>
                  <label className="profile-edit__label">
                    {key}
                    <Input
                      {...getFieldProps(name)}
                      error={getFieldError(name)}
                      onBlur={onBlurInput}
                    />
                  </label>
                </React.Fragment>
              ))}
            </div>
          </Menu>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
