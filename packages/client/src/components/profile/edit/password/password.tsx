import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IUserDTO } from '@/api/types';
import Avatar from '@/components/avatar/avatar';
import Menu from '@/components/profile/menu';
import useForm from '@/features/authentication/hooks/use-validate';
import Input from '@/components/input/input';
import { ValidationProps } from '@/features/validation/validator';
import { MenuState, MenuType } from '@/components/profile/menu/menu.interface';
import { updatePassword } from '@/controllers/user-controllers';
import { IUserUpdatePasswordRequest } from '@/types/user';
import { LoadingSelectors } from '@/store/slices/loading-slice';
import { errorSelectors } from '@/store/slices/error-slice';
import { userSelectors } from '@/features/authentication';
import useResetState from '@/hooks/use-reset-state';
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
  const { values, hasError, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({ validationSchema });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useResetState();

  const userState = useSelector(userSelectors.user);
  const { isLoading } = useSelector(LoadingSelectors.all);
  const { error } = useSelector(errorSelectors.all);

  const { first_name, second_name } = userState.info as IUserDTO;

  const onSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    await updatePassword({ data: values as IUserUpdatePasswordRequest, navigate, dispatch });
  };

  return (
    <div className="profile-password">
      <Avatar>{`${first_name} ${second_name}`}</Avatar>

      <div className="profile-password__content">
        <form onChange={onChangeForm} onSubmit={onSubmitForm} autoComplete="off">
          <Menu
            className="profile-password__menu"
            title={isLoading ? 'Загрузка...' : 'Сохранить'}
            state={hasError || error.title.length ? MenuState.ERROR : MenuState.SUCCESS}
            type={MenuType.SUBMIT}
            disabled={hasError || isLoading}>
            <div className="profile-password__menu-content">
              {userMenuData.map(({ key, name }) => (
                <React.Fragment key={key}>
                  <label className="profile-password__label">
                    {key}
                    <Input {...getFieldProps(name)} error={getFieldError(name)} onBlur={onBlurInput} />
                  </label>
                </React.Fragment>
              ))}
              {!!error.title.length && <p className="profile-password__upload-error">{error.title}</p>}
            </div>
          </Menu>
        </form>
      </div>
    </div>
  );
};

export default EditPassword;
