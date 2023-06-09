import { FC, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Button from '@/components/button/button';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import Input from '@/components/input/input';
import { userActions, useForm } from '@/features/authentication';
import { IUserSigninRequest } from '@/types/user';
import { initValues, loginSchema } from './login.constants';
import Logotype from '@/components/logotype';
import './login.scss';
import { cn } from '@/utils/cn';
import { OAuth } from '@/features/authentication';

/**
 * Страница аутентификации пользователя
 *
 * @category page
 */
const Login: FC = () => {
  const { values, hasError, onChangeForm, getFieldProps, getFieldError, onBlurInput } = useForm({
    initValues,
    validationSchema: loginSchema,
  });
  const dispatch = useDispatch();

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    dispatch(userActions.signin(values as IUserSigninRequest));
  };

  return (
    <div className="login">
      <main className={cn('main', 'container', 'login__container')}>
        <div className="login__box">
          <Logotype className="login__logotype" />

          <form onChange={onChangeForm} onSubmit={onSubmitForm} className="login-form" autoComplete="off">
            <div className="content-box login-form__box">
              <h1 className="login__title">Войдите в аккаунт</h1>
              <Input
                {...getFieldProps('login')}
                error={getFieldError('login')}
                placeholder={'Логин'}
                onBlur={onBlurInput}
                className="login-form__input-box"
              />
              <Input
                {...getFieldProps('password')}
                error={getFieldError('password')}
                type={'password'}
                placeholder={'Пароль'}
                onBlur={onBlurInput}
                className="login-form__input-box"
              />
              <Button disabled={hasError} type="submit" view="primary" className="login-form__button">
                Войти
              </Button>
              <Link to="/signup" className="login-form__registration">
                Регистрация
              </Link>
            </div>
          </form>
          <OAuth />
        </div>
      </main>
    </div>
  );
};

Login.displayName = 'Login';

export default withLayoutMain(Login);
