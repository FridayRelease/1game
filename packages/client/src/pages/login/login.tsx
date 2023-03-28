import { FC, FormEvent } from 'react';
import useForm from '@/hook/useValidate';
import Button from '@/components/button/button';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import Input from '@/components/input/input';
import { initValues, validationSchema } from './login.constants';
import Logotype from '../../assets/images/logotype.png';
import './login.scss';
import { Link } from 'react-router-dom';

/**
 * Страница аутентификации пользователя
 *
 * @category page
 */
const Login: FC = () => {
  const {
    hasError,
    onChangeForm,
    getFieldProps,
    getFieldError,
    onBlurInput,
    validate,
  } = useForm({
    initValues,
    validationSchema,
  });

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const valid = validate();
    console.log('valid: ', valid)
  };

  return (
    <div className="login">
      <main className="main container login__container">
        <div className="login__box">
          <img
            src={Logotype}
            alt="Battle city"
            className="login__logotype"
          />

          <form
            onChange={onChangeForm}
            onSubmit={onSubmitForm}
            className="login-form"
            autoComplete="off">
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
                <Button
                  disabled={hasError}
                  type="submit"
                  view="primary"
                  className="login-form__button">
                  Войти
                </Button>
                <Link to="/registration" className="login-form__registration">
                  Регистрация
                </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

Login.displayName = 'Login';

export default withLayoutMain(Login);
