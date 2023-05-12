import React, { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IUserDTO } from '@/api/types';
import UserAvatar from '@/components/user-avatar';
import Menu from '@/components/profile/menu';
import useForm from '@/features/authentication/hooks/use-validate';
import Input from '@/components/input/input';
import { MenuState, MenuType } from '@/components/profile/menu/menu.interface';
import { updatePassword } from '@/controllers/user-controllers';
import { IUserUpdatePasswordRequest } from '@/types/user';
import { LoadingSelectors } from '@/store/slices/loading-slice';
import { errorSelectors } from '@/store/slices/error-slice';
import { userSelectors } from '@/features/authentication';
import useResetState from '@/hooks/use-reset-state';
import IMenuEditProfilePassword from './password.interface';
import './password.scss';
import { passwordSchema } from '@/components/profile/edit/password/password.contants';

const userMenuData: IMenuEditProfilePassword[] = [
  { label: 'Старый пароль', name: 'old_password' },
  { label: 'Новый пароль', name: 'new_password' },
  { label: 'Повторите пароль', name: 'new_password_extra' },
];

const EditPassword: FC = () => {
  const { values, hasError, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    validationSchema: passwordSchema,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useResetState();

  const userState = useSelector(userSelectors.user);
  const { isLoading } = useSelector(LoadingSelectors.all);
  const { error } = useSelector(errorSelectors.all);

  const { first_name, second_name } = userState.info as IUserDTO;

  const onSubmitForm = async (evt: FormEvent) => {
    evt.preventDefault();

    const data: IUserUpdatePasswordRequest = { oldPassword: values.old_password, newPassword: values.new_password };

    await updatePassword({ data, navigate, dispatch });
  };

  return (
    <div className="profile-password">
      <UserAvatar>{`${first_name} ${second_name}`}</UserAvatar>

      <div className="profile-password__content">
        <form onChange={onChangeForm} onSubmit={onSubmitForm} autoComplete="off">
          <Menu
            className="profile-password__menu"
            title={isLoading ? 'Загрузка...' : 'Сохранить'}
            state={hasError || error.title.length ? MenuState.ERROR : MenuState.SUCCESS}
            type={MenuType.SUBMIT}
            disabled={hasError || isLoading}>
            <div className="profile-password__menu-content">
              {userMenuData.map(({ label, name }) => (
                <React.Fragment key={label}>
                  <label className="profile-password__label">
                    {label}
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
