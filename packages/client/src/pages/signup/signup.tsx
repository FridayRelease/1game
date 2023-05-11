import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useForm, userActions } from '@/features/authentication';
import Button from '@/components/button/button';
import withLayoutMain from '@/layout/layoutMain/layoutMain';
import Input from '@/components/input/input';
import { initValues, singSchema } from './signup.constants';
import Logotype from '@/components/logotype';
import './Signup.scss';
import { IUserSignupRequest } from '@/types/user';

/**
 * Страница регистрации пользователя
 *
 * @category page
 */
const Signup: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, hasError, onChangeForm, getFieldProps, onBlurInput } = useForm({
    initValues,
    validationSchema: singSchema,
  });

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.signup({ props: values as IUserSignupRequest, navigate }));
  };

  return (
    <div className="registration">
      <main className="main container registration__container">
        <div className="registration__box">
          <Logotype className="registration__logotype" />

          <form onChange={onChangeForm} onSubmit={onSubmitForm} className="registration-form" autoComplete="off">
            <div className="content-box registration-form__box">
              <h1 className="registration__title">Регистрация</h1>
              <div className="registration-form__row">
                <Input {...getFieldProps('first_name')} placeholder={'Введите имя'} onBlur={onBlurInput} />
                <Input {...getFieldProps('second_name')} placeholder={'Введите фамилию'} onBlur={onBlurInput} />
                <Input {...getFieldProps('email')} placeholder={'Введите почту'} onBlur={onBlurInput} />
                <Input {...getFieldProps('login')} placeholder={'Введите юзернейм'} onBlur={onBlurInput} />
                <Input {...getFieldProps('phone')} placeholder={'Введите телефон'} onBlur={onBlurInput} />
              </div>
            </div>
            <div className="content-box">
              <div className="registration-form__row">
                <Input
                  {...getFieldProps('password')}
                  type={'password'}
                  placeholder={'Введите пароль'}
                  onBlur={onBlurInput}
                />
                <Input
                  {...getFieldProps('passwordSecond')}
                  type={'password'}
                  placeholder={'Повторите пароль'}
                  onBlur={onBlurInput}
                />
                <a href="" className="registration-form__remember-password">
                  Забыли пароль?
                </a>
              </div>
            </div>
            <Button disabled={hasError} type="submit" view="primary" className="registration-form__button">
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
