import { FC, FormEvent } from 'react';
import useForm from '@/hook/useValidate';
import Button from '@/components/button/button';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import Input from '@/components/input/input';
import { initValues, validationSchema } from './Signup';
import Logotype from '../../assets/images/logotype.png';
import './Signup.scss';

/**
 * Страница регистрации пользователя
 *
 * @category page
 */
const Signup: FC = () => {
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
  };

  return (
    <div className="registration">
      <main className="main container registration__container">
        <div className="registration__box">
          <img
            src={Logotype}
            alt="Battle city"
            className="registration__logotype"
          />

          <form
            onChange={onChangeForm}
            onSubmit={onSubmitForm}
            className="registration-form"
            autoComplete="off">
            <div className="content-box registration-form__box">
              <h1 className="registration__title">Регистрация</h1>
              <div className="registration-form__row">
                <Input
                  {...getFieldProps('first_name')}
                  error={getFieldError('first_name')}
                  placeholder={'Введите имя'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('second_name')}
                  error={getFieldError('second_name')}
                  placeholder={'Введите фамилию'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('email')}
                  error={getFieldError('email')}
                  placeholder={'Введите почту'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('login')}
                  error={getFieldError('login')}
                  placeholder={'Введите юзернейм'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('phone')}
                  error={getFieldError('phone')}
                  placeholder={'Введите телефон'}
                  onBlur={onBlurInput}
                />
              </div>
            </div>
            <div className="content-box">
              <div className="registration-form__row">
                <Input
                  {...getFieldProps('password')}
                  error={getFieldError('password')}
                  type={'password'}
                  placeholder={'Введите пароль'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('passwordSecond')}
                  error={getFieldError('passwordSecond')}
                  type={'password'}
                  placeholder={'Повторите пароль'}
                  onBlur={onBlurInput}
                />
                <a href="" className="registration-form__remember-password">
                  Забыли пароль?
                </a>
              </div>
            </div>
            <Button
              disabled={hasError}
              type="submit"
              view="primary"
              className="registration-form__button">
              Отправить
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

Signup.displayName = 'Signup';

export default withLayoutMain(Signup);
