import * as yup from 'yup';
import { ERROR_MESSAGES } from '@/constant/messages';
import { PASSWORD_SPEC, PHONE_SPEC } from '@/constant/spec';

const initValues: Record<string, string> = {};

const singSchema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, 'Имя должно содержать от 2 символов')
    .max(20, 'Имя не может быть больше 20 символов')
    .required(ERROR_MESSAGES.REQUIRED),
  second_name: yup
    .string()
    .min(2, 'Фамилия должна содержать от 2 символов')
    .max(20, 'Фамилия не может быть больше 20 символов')
    .required(ERROR_MESSAGES.REQUIRED),
  email: yup
    .string()
    .email(ERROR_MESSAGES.INCORRECT_EMAIL)
    .required(ERROR_MESSAGES.REQUIRED),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать от 8 символов')
    .max(40, 'Пароль не может быть больше 40 символов')
    .matches(PASSWORD_SPEC, 'Пароль должен содержать хотя бы одну заглавную букву и цифру')
    .required(ERROR_MESSAGES.REQUIRED)
    .test("is-unique-login-password", ERROR_MESSAGES.UNIQUE_VALUES, function(password) {
        const { login } = this.parent;
        return !(password === login)
      }),
  passwordSecond: yup
    .string()
    .required(ERROR_MESSAGES.REQUIRED)
    .oneOf([yup.ref("password")], ERROR_MESSAGES.INCORRECT_CONFIRM_PASSWORD),
  phone: yup
    .string()
    .min(10, `Номер телефона должен содержать от 10 символов`)
    .max(15, `Номер телефона не может быть больше 15 символов`)
    .matches(PHONE_SPEC, {
      message: ERROR_MESSAGES.INCORRECT_PHONE,
      excludeEmptyString: false
    })
    .required(ERROR_MESSAGES.REQUIRED),
  login: yup
    .string()
    .min(3, 'Логин должен содержать от 3 символов')
    .max(20, 'Логин не может быть больше 20 символов')
    .required(ERROR_MESSAGES.REQUIRED),
});

export { initValues, singSchema };
