import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@/components/avatar/avatar';
import Menu from '@/features/profile/menu';
import mockUser from '@/features/profile/mock';
import useForm from '@/hook/useValidate';
import Input from '@/components/input/input';
import { ValidationProps } from '@/features/validation/validator';
import { MenuState, MenuType } from '@/features/profile/menu/menu.interface';
import IMenuEditProfilePassword from './password.interface';
import './password.scss';

const userMenuData: IMenuEditProfilePassword[] = [
  { key: 'Старый пароль', name: 'old_password' },
  { key: 'Новый пароль', name: 'new_password' },
  { key: 'Повторите пароль', name: 'new_password_extra' },
];

const validationSchema: Record<string, ValidationProps> = {
  old_password: {
    required: true,
  },
  new_password: {
    required: true,
    isPassword: true,
  },
  new_password_extra: {
    required: true,
    isRetryPassword: 'new_password',
  },
};

const EditPassword: FC = () => {
  const {
    values,
    hasError,
    onChangeForm,
    getFieldProps,
    getFieldError,
    onBlurInput,
  } = useForm({ validationSchema });

  const navigate = useNavigate();

  const onSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();
    console.log(values);

    navigate('/profile');
  };

  return (
    <div className="profile-password">
      <Avatar>{`${mockUser.name} ${mockUser.secondName}`}</Avatar>

      <div className="profile-password__content">
        <form
          onChange={onChangeForm}
          onSubmit={onSubmitForm}
          autoComplete="off">
          <Menu
            className="profile-password__menu"
            title="Сохранить"
            state={hasError ? MenuState.ERROR : MenuState.SUCCESS}
            type={MenuType.SUBMIT}>
            <div className="profile-password__menu-content">
              {userMenuData.map(({ key, name }) => (
                <React.Fragment key={key}>
                  <label className="profile-password__label">
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

export default EditPassword;
